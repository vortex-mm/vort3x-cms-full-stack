import { NextResponse } from 'next/server'
import prisma from '~/prisma';

export async function GET() {
  try {
    const types = await prisma.type.findMany({
      include: {
        forms: true,
      },
    })
    
    return NextResponse.json(types)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' })
  }
}
