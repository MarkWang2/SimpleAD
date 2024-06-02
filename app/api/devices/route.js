import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET () {
  const devices = await prisma.Device.findMany({
    select: {
      name: true,
      viewPort: true,
    },
  })
  return NextResponse.json(
    {
      devices
    },
    {
      status: 200,
    },
  )
}