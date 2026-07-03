// Shared district → geographic anchors used by both the Smart Planner map
// adapter and the Explore Map canvas.
//
// Coordinates are approximate CENTER points of each kecamatan in Kota Bekasi
// (source: OpenStreetMap / Wikipedia). They are good enough for a directory
// pin overview and can be replaced by exact per-destination lat/lng once the
// content team enters real coords into the CMS.

// ---------------------------------------------------------------------------
// Real geographic anchors (lat, lng) — WGS84.
// ---------------------------------------------------------------------------
export const DISTRICT_LATLNG = {
  'bekasi-timur':   { lat: -6.2350, lng: 107.0090 },
  'bekasi-barat':   { lat: -6.2340, lng: 106.9810 },
  'bekasi-utara':   { lat: -6.2130, lng: 107.0060 },
  'bekasi-selatan': { lat: -6.2570, lng: 106.9985 },
  'medansatria':    { lat: -6.2190, lng: 106.9740 },
  'medan-satria':   { lat: -6.2190, lng: 106.9740 },
  'jatisampurna':   { lat: -6.3390, lng: 106.9120 },
  'pondokgede':     { lat: -6.2710, lng: 106.9050 },
  'pondok-gede':    { lat: -6.2710, lng: 106.9050 },
  'jatiasih':       { lat: -6.2940, lng: 106.9560 },
  'mustikajaya':    { lat: -6.2860, lng: 107.0620 },
  'mustika-jaya':   { lat: -6.2860, lng: 107.0620 },
  'bantargebang':   { lat: -6.3090, lng: 107.0090 },
  'bantar-gebang':  { lat: -6.3090, lng: 107.0090 },
  'rawalumbu':      { lat: -6.2760, lng: 107.0200 },
  'pondokmelati':   { lat: -6.2860, lng: 106.9350 },
  'pondok-melati':  { lat: -6.2860, lng: 106.9350 },
}
const DEFAULT_LATLNG = { lat: -6.2350, lng: 106.9945 } // Kota Bekasi centroid

export const KOTA_BEKASI_CENTER = { lat: -6.2350, lng: 106.9945 }

export function latLngForDistrict(district) {
  const key = String(district || '').toLowerCase().replace(/\s+/g, '-')
  return DISTRICT_LATLNG[key] || DEFAULT_LATLNG
}

// Deterministic small spiral so co-located pins in the same district don't
// stack on top of each other. Radius kept small (~600 m) so pins stay inside
// their district.
export function spread(base, i) {
  const angle = i * 1.618
  const r = 0.006 + (i % 4) * 0.0025 // ~600 m to 1.5 km offset
  return {
    lat: base.lat + r * Math.sin(angle),
    lng: base.lng + r * Math.cos(angle),
  }
}

export function latLngFor(dest, index) {
  return spread(latLngForDistrict(dest.district), index)
}

// Human-readable label for a district slug.
export function districtLabel(slug) {
  if (!slug) return ''
  return String(slug)
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

// -----------------------------------------------------------------------------
// Legacy normalized (x, y) coords — still used by the Smart Planner mock canvas.
// Kept for backward compatibility until the planner map is also migrated to
// Leaflet.
// -----------------------------------------------------------------------------
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

function spreadNormalized(base, i) {
  const angle = i * 1.618
  const r = 0.05 + (i % 4) * 0.02
  const x = Math.min(0.94, Math.max(0.06, base.x + r * Math.cos(angle)))
  const y = Math.min(0.94, Math.max(0.06, base.y + r * Math.sin(angle)))
  return { x, y }
}

export function positionFor(dest, index) {
  return spreadNormalized(anchorForDistrict(dest.district), index)
}
