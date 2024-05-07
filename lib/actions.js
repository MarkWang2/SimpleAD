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

export async function createDevice ({ name, viewPort }) {
  await prisma.Device.upsert({
    create: {
      name: name,
      viewPort: viewPort,
    },
    update: {
      viewPort: viewPort,
    },
    where: {name: name},
  })
  // revalidatePath("/");
}
