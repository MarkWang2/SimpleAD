import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';
import AdModel from '@/app/models/adModel'
export const dynamic = 'force-dynamic'

export async function GET () {
  const notes = await prisma.Device.findMany({
    select: {
      name: true,
      viewPort: true,
    },
  })
   notes.map(({name, viewPort}) => ({name, viewPort: viewPort.split('x').map((str) => Number(str))}))


  return NextResponse.json(
    {
      devices: notes,
    },
    {
      status: 200,
    },
  )
}