import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { withDatabase, releaseDatabase } from '@/app/api/v1/middleware/database'
import { PoolClient } from '@neondatabase/serverless'

export default async function GET(req: CustomNextApiRequest) {
  try {
    // Execute a query using the database client attached to the request object
    const queryResult = await req.db.query('SELECT * FROM your_table')

    // Return the query result as JSON response
    return NextResponse.json(queryResult.rows)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' })
  }
}

export const middleware = [withDatabase, releaseDatabase]

interface CustomNextApiRequest extends NextApiRequest {
  db: PoolClient
}
