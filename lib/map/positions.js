// Shared district → normalized (x, y) anchors used by both the Smart Planner
// map adapter and the Explore Map canvas. When we swap the mock SVG for a
// real Google Maps in a follow-up prompt, only this file needs to change.

export const DISTRICT_ANCHORS = {
  'bekasi-timur':   { x: 0.28, y: 0.68 },
  'bekasi-barat':   { x: 0.68, y: 0.62 },
  'bekasi-utara':   { x: 0.58, y: 0.24 },
  'bekasi-selatan': { x: 0.44, y: 0.82 },
  'medansatria':    { x: 0.72, y: 0.34 },
  'medan-satria':   { x: 0.72, y: 0.34 },
  'jatisampurna':   { x: 0.78, y: 0.72 },
  'pondokgede':     { x: 0.82, y: 0.48 },
  'pondok-gede':    { x: 0.82, y: 0.48 },
  'mustikajaya':    { x: 0.34, y: 0.30 },
  'bantargebang':   { x: 0.24, y: 0.22 },
  'rawalumbu':      { x: 0.36, y: 0.86 },
}
const DEFAULT_ANCHOR = { x: 0.5, y: 0.5 }

export function anchorForDistrict(district) {
  const key = String(district || '').toLowerCase().replace(/\s+/g, '-')
  return DISTRICT_ANCHORS[key] || DEFAULT_ANCHOR
}

// Deterministic spiral so co-located pins don't overlap.
export function spread(base, i) {
  const angle = i * 1.618
  const r = 0.05 + (i % 4) * 0.02
  const x = Math.min(0.94, Math.max(0.06, base.x + r * Math.cos(angle)))
  const y = Math.min(0.94, Math.max(0.06, base.y + r * Math.sin(angle)))
  return { x, y }
}

export function positionFor(dest, index) {
  return spread(anchorForDistrict(dest.district), index)
}

// Human-readable label for a district slug.
export function districtLabel(slug) {
  if (!slug) return ''
  return String(slug)
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}
