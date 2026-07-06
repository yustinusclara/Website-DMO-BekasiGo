import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { generateItinerary, refineItinerary } from '@/lib/ai/planner'

// Detect if MongoDB configuration is missing -> fallback to mock in-memory store
const isMock = !process.env.MONGO_URL || !process.env.DB_NAME

// Simple in-memory mock store for subscribers when DB not configured
const mockSubscribers = []
const mockDB = {
  collection: (name) => {
    if (name === 'subscribers') {
      return {
        async createIndex() {}, // no-op for mock
        async findOne(filter) {
          return mockSubscribers.find((s) => s.email === filter.email) || null
        },
        async insertOne(doc) {
          mockSubscribers.push(doc)
          return { insertedId: mockSubscribers.length - 1 }
        },
      }
    }
    // Return a generic mock collection with no-ops for other collections
    return {
      async createIndex() {},
      async findOne() { return null },
      async insertOne() { return { insertedId: null } },
      async find() { return { limit: () => ({ toArray: async () => [] }) } }
    }
  },
}

// MongoDB connection
let client
let db

async function connectToMongo() {
  if (isMock) {
    // Return mock DB when configuration is absent
    return mockDB
  }
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    // Root endpoint - GET /api/root (since /api/ is not accessible with catch-all)
    if (route === '/root' && method === 'GET') {
      return handleCORS(NextResponse.json({ message: "Hello World" }))
    }
    // Root endpoint - GET /api/root (since /api/ is not accessible with catch-all)
    if (route === '/' && method === 'GET') {
      return handleCORS(NextResponse.json({ message: "Hello World" }))
    }

    // Status endpoints - POST /api/status
    if (route === '/status' && method === 'POST') {
      const body = await request.json()
      
      if (!body.client_name) {
        return handleCORS(NextResponse.json(
          { error: "client_name is required" }, 
          { status: 400 }
        ))
      }

      const statusObj = {
        id: uuidv4(),
        client_name: body.client_name,
        timestamp: new Date()
      }

      const db = await connectToMongo()
      await db.collection('status_checks').insertOne(statusObj)
      return handleCORS(NextResponse.json(statusObj))
    }

    // Status endpoints - GET /api/status
    if (route === '/status' && method === 'GET') {
      const db = await connectToMongo()
      const statusChecks = await db.collection('status_checks')
        .find({})
        .limit(1000)
        .toArray()

      // Remove MongoDB's _id field from response
      const cleanedStatusChecks = statusChecks.map(({ _id, ...rest }) => rest)
      
      return handleCORS(NextResponse.json(cleanedStatusChecks))
    }

    // Smart Planner — POST /api/planner/generate
    if (route === '/planner/generate' && method === 'POST') {
      const body = await request.json()
      try {
        const plan = await generateItinerary(body || {})
        return handleCORS(NextResponse.json({ data: plan }))
      } catch (err) {
        console.error('[planner/generate] Gemini error:', err)
        return handleCORS(NextResponse.json({ error: { code: 'planner_generate_failed', message: err.message || 'Failed to generate itinerary.' } }, { status: 502 }))
      }
    }

    // Smart Planner — POST /api/planner/refine
    if (route === '/planner/refine' && method === 'POST') {
      const body = await request.json()
      const { plan, instruction, input } = body || {}
      if (!plan || !instruction) {
        return handleCORS(NextResponse.json({ error: { code: 'bad_request', message: 'plan and instruction are required.' } }, { status: 400 }))
      }
      try {
        const updated = await refineItinerary({ plan, instruction, input })
        return handleCORS(NextResponse.json({ data: updated }))
      } catch (err) {
        console.error('[planner/refine] Gemini error:', err)
        return handleCORS(NextResponse.json({ error: { code: 'planner_refine_failed', message: err.message || 'Failed to refine itinerary.' } }, { status: 502 }))
      }
    }

    // Newsletter Subscription — POST /api/newsletter/subscribe
    if (route === '/newsletter/subscribe' && method === 'POST') {
      const body = await request.json()
      const { email } = body || {}

      if (!email) {
        return handleCORS(NextResponse.json(
          { error: "Email is required" }, 
          { status: 400 }
        ))
      }

      // Basic regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return handleCORS(NextResponse.json(
          { error: "Invalid email format" }, 
          { status: 400 }
        ))
      }

      const db = await connectToMongo()
      const collection = db.collection('subscribers')

      // Ensure unique index on email (noop for mock)
      await collection.createIndex({ email: 1 }, { unique: true })

      // Check if email already exists
      const existing = await collection.findOne({ email })
      if (existing) {
        return handleCORS(NextResponse.json(
          { error: "Email is already subscribed" }, 
          { status: 409 }
        ))
      }

      const subscriber = {
        email,
        subscribedAt: new Date()
      }

      await collection.insertOne(subscriber)
      return handleCORS(NextResponse.json(
        { message: "Successfully subscribed" },
        { status: 201 }
      ))
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` }, 
      { status: 404 }
    ))

  } catch (error) {
    console.error('API Error:', error)
    // Provide more detailed error for missing DB config
    if (error.message && error.message.includes('MONGO_URL')) {
      return handleCORS(NextResponse.json(
        { error: 'Database configuration missing. Newsletter subscription unavailable.' },
        { status: 500 }
      ))
    }
    return handleCORS(NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute