import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { PoolClient } from '@neondatabase/serverless'

export async function GET(req: CustomNextApiRequest) {
  try {
    console.log({ req })
    // prisma.ty
    // Execute a query using the database client attached to the request object
    // const queryResult = await req.db.query('SELECT * FROM types')

    // Return the query result as JSON response
    return NextResponse.json({})
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' })
  }
}

interface CustomNextApiRequest extends NextApiRequest {
  db: PoolClient
}
