import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic'

export async function GET () {
  const notes = await prisma.Device.findMany({
    select: {
      name: true,
      viewPort: true,
    },
  })

  return NextResponse.json(
    {
      devices: notes,
    },
    {
      status: 200,
    },
  )
}