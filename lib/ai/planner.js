// Smart Planner AI helpers — grounded on internal BekasiGo data.
// Backend: Emergent Universal LLM Key (OpenAI-compatible proxy) → Gemini 2.5 Flash.
// Never allow free-form hallucinated destinations: the model must pick from
// the whitelist we pass in the context payload.

import { DESTINATIONS } from '@/lib/content/destinations'
import { EVENTS } from '@/lib/content/events'

const ENDPOINT   = 'https://integrations.emergentagent.com/llm/chat/completions'
const MODEL_NAME = 'gemini/gemini-2.5-flash'

// ---------------------------------------------------------------------------
// Grounded context — trim each internal item to just what the AI needs.
// ---------------------------------------------------------------------------
export function buildGroundingContext({ interests = [], style = 'mixed' }) {
  const kw = [style, ...interests].map((s) => String(s).toLowerCase())
  const scored = DESTINATIONS.map((d) => {
    const hay = [d.title, d.excerpt, d.category, d.district, ...(d.tags ?? [])].join(' ').toLowerCase()
    const matches = kw.filter((k) => hay.includes(k)).length
    return { d, score: (d.plannerPriority ?? 50) + matches * 10 }
  }).sort((a, b) => b.score - a.score).slice(0, 24)

  const destinations = scored.map(({ d }) => ({
    id: d.slug,
    name: d.title,
    category: d.category,
    district: d.district,
    kicker: (d.excerpt ?? '').slice(0, 140),
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
    kicker: (e.excerpt ?? '').slice(0, 140),
  }))

  return { destinations, events }
}

// ---------------------------------------------------------------------------
// JSON schema — strict shape the model must return.
// Kept simple to avoid proxy schema-validation errors.
// ---------------------------------------------------------------------------
export const ITINERARY_SCHEMA = {
  name: 'bekasigo_itinerary',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      title:   { type: 'string' },
      summary: { type: 'string' },
      days: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            day:   { type: 'integer' },
            title: { type: 'string' },
            stops: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id:        { type: 'string' },
                  kind:      { type: 'string', enum: ['destination', 'restaurant', 'transport'] },
                  title:     { type: 'string' },
                  kicker:    { type: 'string' },
                  time:      { type: 'string' },
                  duration:  { type: 'string' },
                  ai_reason: { type: 'string' },
                },
                required: ['id', 'kind', 'title', 'kicker', 'time', 'duration', 'ai_reason'],
              },
            },
          },
          required: ['day', 'title', 'stops'],
        },
      },
    },
    required: ['title', 'summary', 'days'],
  },
}

const SYSTEM_INSTRUCTION = `You are BekasiGo Copilot — a warm, editorial travel planner for Kota Bekasi, Indonesia.

STRICT RULES (do not break):
1. You MAY ONLY select destinations and events from the "Available destinations" and "Available events" arrays supplied in the user message. For any stop with kind='destination', the 'id' field MUST equal a real 'id' from those arrays. Never invent a place name, address, or slug.
2. For meals/coffees between stops, use kind='restaurant' and leave 'id' as an empty string "". Pick believable Bekasi warungs/cafes by name (never a global chain that isn't in Bekasi).
3. Sequence stops by local Bekasi geography and time-of-day logic. Respect opening hours, family/environment constraints, and the requested starting point.
4. Output STRICT JSON matching the response schema. No prose outside JSON.
5. Every ai_reason must reference the attribute you relied on (category, family_friendly, environment, tag, hours). Never generic praise.`

// ---------------------------------------------------------------------------
// Low-level: call Emergent proxy with OpenAI-compatible payload.
// ---------------------------------------------------------------------------
async function callGemini({ systemInstruction, userPrompt, temperature = 0.3 }) {
  const key = process.env.EMERGENT_LLM_KEY
  if (!key) throw new Error('EMERGENT_LLM_KEY is not configured in .env')

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user',   content: userPrompt },
      ],
      temperature,
      response_format: {
        type: 'json_schema',
        json_schema: ITINERARY_SCHEMA,
      },
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Emergent LLM ${res.status}: ${errText.slice(0, 400)}`)
  }
  const data = await res.json()
  const raw = data?.choices?.[0]?.message?.content
  if (!raw) throw new Error('Empty LLM response.')

  // The proxy may occasionally wrap JSON in a ```json fence — strip it defensively.
  const clean = raw.trim().replace(/^```json\s*/i, '').replace(/```$/, '').trim()
  return JSON.parse(clean)
}

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

Available destinations (pick 'id' EXACTLY from this list):
${JSON.stringify(ctx.destinations, null, 2)}

Available events (pick only if timing/style matches):
${JSON.stringify(ctx.events, null, 2)}

Return ${daysCount} day(s). Each day ~5 stops: destination + restaurant + optional short transport note. Every destination stop MUST reference an id from Available destinations.`

  const parsed = await callGemini({ systemInstruction: SYSTEM_INSTRUCTION, userPrompt })
  return normalizeItinerary(parsed, ctx)
}

// ---------------------------------------------------------------------------
// Public: refine an existing itinerary
// ---------------------------------------------------------------------------
export async function refineItinerary({ plan, instruction, input }) {
  const ctx = buildGroundingContext({
    interests: input?.interests ?? [],
    style: input?.style ?? 'mixed',
  })

  const userPrompt = `Refine the following BekasiGo plan based on the user's instruction. Preserve the parts they didn't ask to change. Never invent a destination.

Instruction: "${instruction}"

Current plan:
${JSON.stringify(plan, null, 2)}

Available destinations (still your only allowed picks, 'id' must match):
${JSON.stringify(ctx.destinations, null, 2)}

Return the FULL updated plan (same JSON schema).`

  const parsed = await callGemini({ systemInstruction: SYSTEM_INSTRUCTION, userPrompt })
  return normalizeItinerary(parsed, ctx)
}

// ---------------------------------------------------------------------------
// Normalize LLM output → frontend-friendly shape.
// - Merges image/district/kicker from whitelist for every whitelisted stop.
// - Drops or downgrades any stop with an unknown id (anti-hallucination).
// ---------------------------------------------------------------------------
export function normalizeItinerary(plan, ctx) {
  const destIndex = new Map(ctx.destinations.map((d) => [d.id, d]))
  const days = (plan.days ?? []).map((d) => ({
    ...d,
    stops: (d.stops ?? []).map((s) => {
      const src = s.id ? destIndex.get(s.id) : null
      if (s.kind === 'destination' && !src) {
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
      walking_min: 0,
      driving_min: 0,
      photo_windows: days.reduce((n, d) => n + (d.stops?.filter((s) => /sunset|light|photo|golden/i.test(s.ai_reason || '')).length ?? 0), 0),
      weather: 'Warm · 28°C · light cloud',
    },
    hotel: null,
    generatedBy: MODEL_NAME,
  }
}
