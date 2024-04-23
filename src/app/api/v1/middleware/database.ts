import { NextApiRequest, NextApiResponse } from 'next'
import { Pool, PoolClient } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

interface CustomNextApiRequest extends NextApiRequest {
  db: PoolClient
  prisma: PrismaClient
}

export async function withDatabase(req: CustomNextApiRequest, res: NextApiResponse, next: () => void) {
  try {
    req.db = await pool.connect()
    req.prisma = prisma
    next()
  } catch (error) {
    console.error('Error connecting to database:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export function releaseDatabase(req: CustomNextApiRequest, _res: NextApiResponse, next: () => void) {
  if (req.db) {
    req.db.release()
  }
  next()
}
