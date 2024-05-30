'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from './prisma'

export async function insertPage ({ name, adUnit }) {
  await prisma.Page.create({
    data: {
      name,
      adUnit,
    },
  })
  // revalidatePath("/");
}

export async function createDevice (devices) {
  for(const {name, viewPort} of devices) {
    await prisma.Device.upsert({
      where: {
        name
      },
      update: {
        viewPort
      },
      create: {
        name,
        viewPort,
      },
    })
  }
  revalidatePath('/devices')
}

export async function createSlot ({ slots }) {
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
      if (!slot.name) return

      let sizesData = []
      const sizeMapping = slot.sizeMapping
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
            name: slot.name,
            adUnit: slot.adUnit,
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
