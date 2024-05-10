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

export async function createSlot () {
  prisma.$transaction(async (tx) => {
    const devices = await prisma.Device.findMany({
      select: {
        id: true,
        name: true,
        viewPort: true,
      },
    })

    const data = {
      'slots': [
        {
          'name': 'name',
          'adUnit': 'df',
          'sizeMapping': {
            'sm': [
              '1x4','2x4', '3x4'
            ],
            'md': [
              '2x4',
            ],
            'lg': [
              '3x5',
            ],
          },
        },
        {
          'name': 'name2',
          'adUnit': 'ad3',
          'sizeMapping': {
            'sm': [
              '3x4',
            ],
            'md': [
              '3x5',
            ],
            'lg': [
              '3x6',
            ],
          },
        },
      ],
    }
    const slots = data.slots

    const getIdByName = (name) => {
      return devices.find((item) => item.name = 'sm').id
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
        const deviceId = getIdByName(prop)
        const sizes = sizeMapping[prop]
        sizesData.push(sizes.map((size) => ({size, deviceId,  slotId: createMany.id,})))
      }

     const sizesDataFlatted = sizesData.flat()

      await prisma.SlotSizeMapping.createMany({
          data: sizesDataFlatted
        },
      )
    }

  })

}
