// Smart Planner AI helpers — grounded on internal BekasiGo data.
//
// PROVIDER SELECTION (priority order):
//   1. If GEMINI_API_KEY  is set → call Google Generative AI directly (production path).
//   2. Else if EMERGENT_LLM_KEY is set AND PLANNER_USE_MOCK !== 'true' → try Emergent proxy.
//   3. On any provider failure OR when PLANNER_USE_MOCK === 'true' → return a
//      grounded MOCK itinerary so the UI stays fully demoable.
//
// Never allow free-form hallucinated destinations: the model must pick from
// the whitelist we pass in the context payload.

import { GoogleGenerativeAI } from '@google/generative-ai'
import { DESTINATIONS } from '@/lib/content/destinations'
import { EVENTS } from '@/lib/content/events'
import { logEvent, logError } from '@/lib/analytics'

const EMERGENT_ENDPOINT = 'https://integrations.emergentagent.com/llm/chat/completions'
const EMERGENT_MODEL    = 'gemini/gemini-2.5-flash'
const GEMINI_MODEL      = 'gemini-2.5-flash'

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
// Low-level provider callers.
// ---------------------------------------------------------------------------
async function callEmergent({ systemInstruction, userPrompt, temperature = 0.3 }) {
  const key = process.env.EMERGENT_LLM_KEY
  if (!key) throw new Error('EMERGENT_LLM_KEY is not configured in .env')

  const res = await fetch(EMERGENT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: EMERGENT_MODEL,
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

  const clean = raw.trim().replace(/^```json\s*/i, '').replace(/```$/, '').trim()
  return JSON.parse(clean)
}

// Direct Google Generative AI SDK — used when user provides GEMINI_API_KEY.
async function callGeminiDirect({ systemInstruction, userPrompt, temperature = 0.3 }) {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('GEMINI_API_KEY is not configured in .env')

  const ai = new GoogleGenerativeAI(key)
  const model = ai.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: systemInstruction,
  })

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature,
      responseMimeType: 'application/json',
      responseSchema: ITINERARY_SCHEMA.schema,
    },
  })

  const response = await result.response
  const raw = response.text()
  if (!raw) throw new Error('Empty Gemini response.')

  const clean = raw.trim().replace(/^```json\s*/i, '').replace(/```$/, '').trim()
  return JSON.parse(clean)
}

// Dispatcher — picks the best available provider.
async function callProvider(payload) {
  const forceMock = process.env.PLANNER_USE_MOCK === 'true'
  const hasGemini   = !!process.env.GEMINI_API_KEY
  const hasEmergent = !!process.env.EMERGENT_LLM_KEY

  if (forceMock)  throw new Error('__USE_MOCK__')
  if (hasGemini)  return callGeminiDirect(payload)
  if (hasEmergent) return callEmergent(payload)
  throw new Error('__USE_MOCK__')
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

  try {
    const provider = process.env.GEMINI_API_KEY ? 'gemini-direct' : 'emergent'
    const parsed = await callProvider({ systemInstruction: SYSTEM_INSTRUCTION, userPrompt })
    logEvent('generate_itinerary', { provider, duration, style, familyMode })
    return normalizeItinerary(parsed, ctx, { provider })
  } catch (err) {
    if (err?.message === '__USE_MOCK__') {
      // eslint-disable-next-line no-console
      console.info('[planner] using MOCK provider (no LLM key configured or PLANNER_USE_MOCK=true).')
      logEvent('generate_itinerary', { provider: 'mock', duration, style, familyMode })
    } else {
      // eslint-disable-next-line no-console
      console.warn('[planner] LLM provider failed, falling back to MOCK:', err.message)
      logError(err, { action: 'generate_itinerary', duration, style })
      logEvent('generate_itinerary', { provider: 'mock_fallback', duration, style, familyMode })
    }
    const mockPlan = buildMockPlan({ ctx, daysCount, style, interests, familyMode })
    return normalizeItinerary(mockPlan, ctx, { provider: 'mock' })
  }
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

  try {
    const parsed = await callProvider({ systemInstruction: SYSTEM_INSTRUCTION, userPrompt })
    return normalizeItinerary(parsed, ctx, { provider: process.env.GEMINI_API_KEY ? 'gemini-direct' : 'emergent' })
  } catch (err) {
    if (err?.message !== '__USE_MOCK__') {
      // eslint-disable-next-line no-console
      console.warn('[planner.refine] LLM failed, falling back to MOCK:', err.message)
    }
    const refined = refineMockPlan({ plan, instruction, ctx })
    return normalizeItinerary(refined, ctx, { provider: 'mock' })
  }
}

// ---------------------------------------------------------------------------
// Normalize LLM output → frontend-friendly shape.
// - Merges image/district/kicker from whitelist for every whitelisted stop.
// - Drops or downgrades any stop with an unknown id (anti-hallucination).
// ---------------------------------------------------------------------------
export function normalizeItinerary(plan, ctx, opts = {}) {
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
    generatedBy: opts.provider || 'mock',
  }
}

// ---------------------------------------------------------------------------
// MOCK planner — grounded deterministic itinerary using the same context.
// Used when no LLM key is available or when the live provider fails.
// Output shape is IDENTICAL to the LLM branch, so the UI cannot tell them apart.
// ---------------------------------------------------------------------------
const MOCK_MEALS = [
  { title: 'Bakmi Gang Kelinci', kicker: 'Legendary noodles',   ai_reason: 'Balanced lunch stop between two heritage picks — mid-price, quick service.' },
  { title: 'Warung Kopi Klotok',  kicker: 'Local coffee ritual', ai_reason: 'Coffee break aligns with your requested balanced budget.' },
  { title: 'Sate Khas Bekasi',    kicker: 'Signature street food', ai_reason: 'Dinner tied to your local-flavour interest and evening window.' },
  { title: 'Toko Kue Lawang',     kicker: 'Kue basah heritage',  ai_reason: 'Short pastry stop keeps energy high before the next stop.' },
  { title: 'Kafe Semesta',        kicker: 'Indoor workshop-cafe', ai_reason: 'Indoor break matches your environment preference during peak sun.' },
]

const TIME_SLOTS = ['08:30', '10:30', '12:30', '14:30', '16:30', '19:00']

function buildMockPlan({ ctx, daysCount, style, interests, familyMode }) {
  const pool = [...ctx.destinations]
  if (familyMode) {
    pool.sort((a, b) => Number(b.familyFriendly) - Number(a.familyFriendly))
  }
  // shuffle mildly, but keep top-priority items first
  const perDay = 4 // 3 destinations + 1 meal ≈ 4 stops
  const days = []
  let pi = 0

  for (let d = 1; d <= daysCount; d += 1) {
    const stops = []
    for (let i = 0; i < perDay; i += 1) {
      if (i === 2) {
        // insert a meal stop in the middle
        const meal = MOCK_MEALS[(d + i) % MOCK_MEALS.length]
        stops.push({
          id: '',
          kind: 'restaurant',
          title: meal.title,
          kicker: meal.kicker,
          time: TIME_SLOTS[i] ?? '13:00',
          duration: '60 min',
          ai_reason: meal.ai_reason,
        })
        continue
      }
      const dest = pool[pi % pool.length]; pi += 1
      if (!dest) continue
      const reasonBits = []
      if (interests?.length) reasonBits.push(`Matches your ${interests[0]} interest`)
      if (familyMode && dest.familyFriendly) reasonBits.push('kid-friendly attributes flagged in our directory')
      if (dest.category) reasonBits.push(`category: ${dest.category}`)
      const ai_reason = reasonBits.join('; ') || `Grounded pick from BekasiGo directory — ${dest.district ?? 'central Bekasi'}.`
      stops.push({
        id: dest.id,
        kind: 'destination',
        title: dest.name,
        kicker: dest.kicker || `${dest.category ?? ''} · ${dest.district ?? ''}`,
        time: TIME_SLOTS[i] ?? '10:00',
        duration: dest.duration || '90 min',
        ai_reason,
      })
    }
    days.push({
      day: d,
      title: d === 1 ? 'Anchor day — heritage & pulse' :
             d === 2 ? 'Culinary & neighbourhood loop' :
                       `Day ${d} — deeper cuts`,
      stops,
    })
  }

  const styleWord = style && style !== 'mixed' ? ` ${style}-leaning` : ''
  return {
    title:   `A${styleWord} ${daysCount}-day journey through Kota Bekasi.`,
    summary: `Handcrafted from ${ctx.destinations.length} BekasiGo destinations${interests?.length ? ` around ${interests.join(', ')}` : ''}. Preview generated locally — plug in your GEMINI_API_KEY to unlock live AI generation.`,
    days,
  }
}

// Very lightweight rule-based "refine" — enough to keep the conversational UI
// interactive while running in mock mode.
function refineMockPlan({ plan, instruction, ctx }) {
  const lower = String(instruction || '').toLowerCase()
  const pool = ctx.destinations

  // shortcut: "more foodie" / "less shopping" style refinements
  const nextPlan = JSON.parse(JSON.stringify(plan))
  if (lower.includes('food') || lower.includes('kuliner')) {
    nextPlan.days?.forEach((d) => {
      d.stops = d.stops || []
      d.stops.splice(2, 0, {
        id: '', kind: 'restaurant',
        title: 'Nasi Uduk Ibu Ida',
        kicker: 'Neighbourhood favourite',
        time: '17:30', duration: '45 min',
        ai_reason: 'Added per your request to add a foodie stop.',
      })
    })
  } else if (lower.includes('shorten') || lower.includes('less')) {
    nextPlan.days?.forEach((d) => { d.stops = (d.stops || []).slice(0, 3) })
  } else {
    // default: swap the last destination of day 1 for a fresh one
    const day1 = nextPlan.days?.[0]
    if (day1?.stops?.length) {
      const currentIds = new Set(day1.stops.map((s) => s.id).filter(Boolean))
      const fresh = pool.find((d) => !currentIds.has(d.id))
      if (fresh) {
        const idx = day1.stops.findLastIndex((s) => s.kind === 'destination')
        if (idx >= 0) {
          day1.stops[idx] = {
            id: fresh.id, kind: 'destination',
            title: fresh.name,
            kicker: fresh.kicker || `${fresh.category ?? ''} · ${fresh.district ?? ''}`,
            time: day1.stops[idx].time, duration: fresh.duration || '90 min',
            ai_reason: `Swapped in per your refinement request. Grounded pick from ${fresh.district ?? 'BekasiGo directory'}.`,
          }
        }
      }
    }
  }
  return nextPlan
}
