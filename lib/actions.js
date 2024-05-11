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
  await prisma.Device.deleteMany({})
  const createMany = await prisma.Device.createMany({
    data: devices,
  })
}

export async function createSlot ({slots}) {
  prisma.$transaction(async (tx) => {
    await prisma.SlotSizeMapping.deleteMany({})
    await prisma.AdSlot.deleteMany({})

    // tmp solution
    const getIdByName =  (name) => {
      return prisma.device.findUnique({
        where: {
          name,
        },
      });
    }

    for (const slot of slots) {
      const createMany = await prisma.AdSlot.create({
          data: {
            name: slot.name,
            adUnit: slot.adUnit,
            page: {
              connect: { id: 1 },
            },
          },
        },
      )
      let sizesData = []
      const sizeMapping = slot.sizeMapping
      for (const prop in sizeMapping) {
        const devicedd = await getIdByName(prop)
        const sizes = sizeMapping[prop]
        sizesData.push(
          sizes.map((size) => ({ size, deviceId: devicedd.id, slotId: createMany.id })))
      }

      const sizesDataFlatted = sizesData.flat()
      await prisma.SlotSizeMapping.createMany({
          data: sizesDataFlatted,
        },
      )
    }

  })

}
