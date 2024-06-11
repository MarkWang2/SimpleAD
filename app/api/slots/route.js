import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET () {
  const slots = await prisma.AdSlot.findMany({
    select: {
      name: true,
      pageName: true,
      adUnit: true,
      SlotTargeting: {
        select: {
          name: true,
          value: true,
        }
      },
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
      slots,
    },
    {
      status: 200,
    },
  )
}