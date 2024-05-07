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
