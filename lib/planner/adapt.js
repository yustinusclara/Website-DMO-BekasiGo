// Adapt a raw API planner response → shape required by the map + results modules.
// The API returns days[].stops[] without map coordinates; we synthesize
// deterministic normalized positions (0..1) so pins land inside the mock
// viewport. When a real Google Map is wired later, this adapter is the only
// place that needs to change.

import { PLANNER_SAMPLE } from '@/lib/content/planner-sample'

// Loose district → normalized (x, y) hint map. Multiple stops per district get
// spread around the base point using a small angular offset.
const DISTRICT_ANCHORS = {
  'bekasi-timur':     { x: 0.28, y: 0.68 },
  'bekasi-barat':     { x: 0.68, y: 0.62 },
  'bekasi-utara':     { x: 0.58, y: 0.24 },
  'bekasi-selatan':   { x: 0.44, y: 0.82 },
  'medansatria':      { x: 0.72, y: 0.34 },
  'medan-satria':     { x: 0.72, y: 0.34 },
  'jatisampurna':     { x: 0.78, y: 0.72 },
  'pondokgede':       { x: 0.82, y: 0.48 },
  'pondok-gede':      { x: 0.82, y: 0.48 },
  'mustikajaya':      { x: 0.34, y: 0.30 },
  'bantargebang':     { x: 0.24, y: 0.22 },
  'rawalumbu':        { x: 0.36, y: 0.86 },
}
const DEFAULT_ANCHOR = { x: 0.5, y: 0.5 }

function anchorFor(district) {
  const key = String(district || '').toLowerCase().replace(/\s+/g, '-')
  return DISTRICT_ANCHORS[key] || DEFAULT_ANCHOR
}

function jitter(base, index) {
  // Deterministic small spiral so stops in same district don't overlap.
  const angle = index * 1.618
  const r = 0.04 + (index % 3) * 0.02
  const x = Math.min(0.95, Math.max(0.05, base.x + r * Math.cos(angle)))
  const y = Math.min(0.95, Math.max(0.05, base.y + r * Math.sin(angle)))
  return { x, y }
}

export function adaptApiPlan(apiPlan) {
  if (!apiPlan) return PLANNER_SAMPLE

  const days = (apiPlan.days ?? []).map((d, dIdx) => {
    let stopIdx = 0
    const stops = (d.stops ?? []).map((s) => {
      const base = anchorFor(s.district)
      const pos = jitter(base, stopIdx + dIdx * 7)
      stopIdx += 1
      return {
        id: s.id || `stop-${dIdx}-${stopIdx}`,
        kind: s.kind || 'destination',
        title: s.title,
        kicker: s.kicker || '',
        time: s.time || '',
        duration: s.duration || '',
        ai_reason: s.ai_reason || '',
        image: s.image || null,
        district: s.district || null,
        pos,
      }
    })
    return {
      day: d.day ?? dIdx + 1,
      title: d.title || `Day ${dIdx + 1}`,
      stops,
      transport: [],
    }
  })

  return {
    title:   apiPlan.title   || PLANNER_SAMPLE.title,
    summary: apiPlan.summary || PLANNER_SAMPLE.summary,
    stats:   apiPlan.stats   || PLANNER_SAMPLE.stats,
    hotel:   apiPlan.hotel   || null,
    days:    days.length ? days : PLANNER_SAMPLE.days,
    transportHubs: PLANNER_SAMPLE.transportHubs,
    generatedBy:   apiPlan.generatedBy || 'mock',
  }
}
