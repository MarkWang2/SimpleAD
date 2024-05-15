import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET () {
  const slots = await prisma.AdSlot.findMany({
    select: {
      name: true,
      adUnit: true,
      SlotSizeMapping: {
        select: {
          size: true,
          device: {
            select: {
              name: true,
              viewPort: true,
            },
          },
        }
      },
    },
  })
  return NextResponse.json(
    {
      devices: slots,
    },
    {
      status: 200,
    },
  )
}