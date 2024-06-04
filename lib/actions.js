'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from './prisma'
import fs from 'fs'

export async function createDevice (devices) {
  for (const { name, viewPort } of devices) {
    await prisma.Device.upsert({
      where: {
        name,
      },
      update: {
        viewPort,
      },
      create: {
        name,
        viewPort,
      },
    })
  }
  revalidatePath('/devices')
}

const buildConfigJs = async (slots) => {
  const devicesResult = await prisma.Device.findMany({
    select: {
      name: true,
      viewPort: true,
    },
  })
  const devices = devicesResult.reduce(
    (values, { name, viewPort }) => ({
      [name]: viewPort.split('x').
        map(Number), ...values,
    }), {})
  const slotsConfigData = { slots, devices }
  const configData = `window.slotsConfig ||= ${JSON.stringify(slotsConfigData,
    null, 2)}`
  fs.writeFileSync('./public/slotsConfig.js', configData)
}

export async function createSlot ({ slots }) {
  await buildConfigJs(slots)
  prisma.$transaction(async (tx) => {
    await prisma.SlotSizeMapping.deleteMany({})
    await prisma.SlotTargeting.deleteMany({})
    await prisma.AdSlot.deleteMany({})

    const getIdByName = (name) => {
      return prisma.device.findUnique({
        where: {
          name,
        },
        select: {
          id: true,
        },
      })
    }

    for (const slot of slots) {
      const { name, sizeMapping, adUnit } = slot
      if (!name) return

      let sizesData = []
      for (const prop in sizeMapping) {
        const { id } = await getIdByName(prop)
        const sizes = sizeMapping[prop]
        sizesData.push(
          sizes.map(
            (size) => ({ size, deviceId: id })))
      }
      const sizesDataFlatted = sizesData.flat()
      const targetingData = slot?.slotTargeting?.map((item) => ({ ...item }))
      await prisma.AdSlot.create({
          data: {
            name: name,
            adUnit: adUnit,
            page: {
              connect: { id: 1 },
            },
            SlotSizeMapping: {
              create: sizesDataFlatted,
            },
            SlotTargeting: {
              create: targetingData,
            },
          },
          include: {
            SlotSizeMapping: true,
            SlotTargeting: true,
          },
        },
      )
    }

  })

  revalidatePath('/slots')
}
