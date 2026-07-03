// Smart Planner AI helpers — grounded on internal BekasiGo data.
// Never allow free-form hallucinated destinations: the model must pick from
// the whitelist we pass in the context payload.

import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import { DESTINATIONS } from '@/lib/content/destinations'
import { EVENTS } from '@/lib/content/events'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const MODEL_NAME = 'gemini-2.5-flash'

// ---------------------------------------------------------------------------
// Grounded context — trims each internal item to what the AI needs to decide.
// ---------------------------------------------------------------------------
export function buildGroundingContext({ interests = [], style = 'mixed' }) {
  // Rank destinations by a) planner_priority, b) match with interests/style keywords
  const kw = [style, ...interests].map((s) => String(s).toLowerCase())
  const scored = DESTINATIONS.map((d) => {
    const hay = [d.title, d.excerpt, d.category, d.district, ...(d.tags ?? [])].join(' ').toLowerCase()
    const matches = kw.filter((k) => hay.includes(k)).length
    return { d, score: (d.plannerPriority ?? 50) + matches * 10 }
  }).sort((a, b) => b.score - a.score).slice(0, 24) // cap to top 24 to keep prompt tight

  const destinations = scored.map(({ d }) => ({
    id: d.slug,
    name: d.title,
    category: d.category,
    district: d.district,
    kicker: d.excerpt?.slice(0, 140),
    hours: d.hours,
    duration: d.duration,
    familyFriendly: !!d.familyFriendly,
    environment: d.environment ?? 'mixed',
    image: d.image,
    tags: d.tags ?? [],
  }))

  const events = EVENTS.slice(0, 10).map((e) => ({
    id: e.slug,
    name: e.title,
    category: e.category,
    venue: e.venue?.name,
    district: e.venue?.district,
    startDate: e.startDate,
    endDate: e.endDate,
    kicker: e.excerpt?.slice(0, 140),
    image: e.image,
  }))

  return { destinations, events }
}

// ---------------------------------------------------------------------------
// Response schema — Gemini enforces strict JSON.
// ---------------------------------------------------------------------------
export const ITINERARY_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    title:       { type: SchemaType.STRING, description: 'Short editorial title for the whole plan.' },
    summary:     { type: SchemaType.STRING, description: '2–3 sentence overview of the plan.' },
    days: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          day:   { type: SchemaType.INTEGER },
          title: { type: SchemaType.STRING, description: 'Editorial day title.' },
          stops: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                id:            { type: SchemaType.STRING, description: 'The internal destination/event slug when the stop is a real BekasiGo entity. Empty string only for meal/coffee suggestions.' },
                kind:          { type: SchemaType.STRING, description: 'destination | restaurant | transport', enum: ['destination', 'restaurant', 'transport'] },
                title:         { type: SchemaType.STRING },
                kicker:        { type: SchemaType.STRING, description: 'Category · district or short label.' },
                time:          { type: SchemaType.STRING, description: 'Local start time, e.g. "08:30".' },
                duration:      { type: SchemaType.STRING, description: 'e.g. "90 min" or "2 hrs".' },
                ai_reason:     { type: SchemaType.STRING, description: 'One-sentence reason grounded in the item’s attributes.' },
              },
              required: ['id', 'kind', 'title', 'time', 'duration', 'ai_reason'],
            },
          },
        },
        required: ['day', 'title', 'stops'],
      },
    },
  },
  required: ['title', 'summary', 'days'],
}

const SYSTEM_INSTRUCTION = `You are BekasiGo Copilot — a warm, editorial travel planner for Kota Bekasi, Indonesia.

STRICT RULES (do not break):
1. You may ONLY select destinations and events from the "Available destinations" and "Available events" arrays supplied in the user message. For any stop with kind='destination', the 'id' field MUST equal a real 'id' from those arrays. Never invent a place name, address, or slug.
2. For meals/coffees between stops, use kind='restaurant' and leave 'id' empty (""). Pick believable Bekasi warungs/cafes by name (never a global chain that isn't in Bekasi).
3. Sequence stops by the local Bekasi geography and time-of-day logic. Respect opening hours and family/environment constraints.
4. Output STRICT JSON matching the provided response schema. Do not add prose outside JSON.`

// ---------------------------------------------------------------------------
// Public: generate a fresh itinerary
// ---------------------------------------------------------------------------
export async function generateItinerary(input) {
  const {
    duration = 1, style = 'mixed', interests = [], budget = 2,
    startingPoint = 'stasiun_bekasi', familyMode = false, environment = 'any',
  } = input || {}

  const ctx = buildGroundingContext({ interests, style })

  const daysCount = Math.max(1, Math.min(5, Number(duration) || 1))

  const userPrompt = `Plan a ${daysCount}-day itinerary in Kota Bekasi for these constraints:
- travel style: ${style}
- interests: ${interests.length ? interests.join(', ') : '(none — surprise the user based on style)'}
- budget level (1..4): ${budget}
- starting point: ${startingPoint}
- traveling with kids: ${familyMode ? 'yes' : 'no'}
- environment preference: ${environment}

Available destinations (choose from these; use 'id' as the destination slug):
${JSON.stringify(ctx.destinations, null, 2)}

Available events (choose only if timing/style matches):
${JSON.stringify(ctx.events, null, 2)}

Return a plan with ${daysCount} day(s). Each day should have ~5 stops mixing destination + restaurant + optional transport notes. Every 'destination' stop must reference a real 'id' from the Available destinations list above.`

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: ITINERARY_SCHEMA,
      temperature: 0.3,
    },
  })

  const result = await model.generateContent(userPrompt)
  const raw    = result.response.text()
  const parsed = JSON.parse(raw)
  return normalizeItinerary(parsed, ctx)
}

// ---------------------------------------------------------------------------
// Public: refine an existing itinerary
// ---------------------------------------------------------------------------
export async function refineItinerary({ plan, instruction, input }) {
  const ctx = buildGroundingContext({ interests: input?.interests ?? [], style: input?.style ?? 'mixed' })

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: ITINERARY_SCHEMA,
      temperature: 0.3,
    },
  })

  const userPrompt = `Refine the following BekasiGo plan based on the user's instruction. Preserve the parts they didn't ask to change.

Instruction: "${instruction}"

Current plan:
${JSON.stringify(plan, null, 2)}

Available destinations (still your only allowed picks):
${JSON.stringify(ctx.destinations, null, 2)}

Return the FULL updated plan (same JSON schema).`

  const result = await model.generateContent(userPrompt)
  const parsed = JSON.parse(result.response.text())
  return normalizeItinerary(parsed, ctx)
}

// ---------------------------------------------------------------------------
// Normalize LLM output → frontend-friendly shape.
// Merges in image/coords/kicker for any stop whose id is in our whitelist.
// Drops or downgrades stops the AI hallucinated with an unknown id.
// ---------------------------------------------------------------------------
export function normalizeItinerary(plan, ctx) {
  const destIndex = new Map(ctx.destinations.map((d) => [d.id, d]))
  const days = (plan.days ?? []).map((d) => ({
    ...d,
    stops: (d.stops ?? []).map((s) => {
      const src = s.id ? destIndex.get(s.id) : null
      if (s.kind === 'destination' && !src) {
        // AI hallucinated an id → downgrade to a plain restaurant-style entry so we don't fake it.
        return { ...s, kind: 'restaurant', id: '' }
      }
      return {
        ...s,
        image:    src?.image ?? null,
        kicker:   s.kicker || (src ? `${src.category ?? ''} · ${src.district ?? ''}` : ''),
        district: src?.district ?? null,
      }
    }),
  }))
  return {
    title:   plan.title || 'A journey through Kota Bekasi.',
    summary: plan.summary || '',
    days,
    stats: {
      stops: days.reduce((n, d) => n + (d.stops?.length ?? 0), 0),
      walking_min: 0,   // reserved for future ranker
      driving_min: 0,
      photo_windows: days.reduce((n, d) => n + (d.stops?.filter((s) => /sunset|light|photo/i.test(s.ai_reason || '')).length ?? 0), 0),
      weather: 'Warm · 28°C · light cloud',
    },
    hotel: null,        // reserved — will be added by a follow-up ranker
    generatedBy: MODEL_NAME,
  }
}
