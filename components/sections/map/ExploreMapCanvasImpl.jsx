'use client'

// Real Leaflet + OpenStreetMap implementation. Client-only
// (dynamically imported by ExploreMapCanvas.jsx).

import { useEffect, useMemo, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { KOTA_BEKASI_CENTER } from '@/lib/map/positions'

// -----------------------------------------------------------------------------
// Category → marker style. Colors match the rest of the BekasiGo brand.
// The `svg` field is a raw <svg> string that renders inside the divIcon HTML.
// -----------------------------------------------------------------------------
const STROKE = 'stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"'

const CATEGORY_STYLE = {
  heritage:  { fill: '#B48A2D', ring: '#0B3D3A', label: 'Heritage',  svg: `<path d="M4 22V10l8-6 8 6v12"/><path d="M9 22V12h6v10"/><path d="M2 22h20"/>` },
  urban:     { fill: '#0B3D3A', ring: '#E1B547', label: 'Urban',     svg: `<path d="M12 3v3M3 12H0M24 12h-3M12 24v-3M4 4l2 2M18 18l2 2M20 4l-2 2M6 18l-2 2"/><circle cx="12" cy="12" r="5"/>` },
  culinary:  { fill: '#A34E2B', ring: '#ffffff', label: 'Culinary',  svg: `<path d="M3 2v7c0 1.1.9 2 2 2h4V2M11 2v20M17 2c-1.5 0-3 1-3 4v6c0 1 .5 2 2 2h1v8"/>` },
  nature:    { fill: '#1E7A72', ring: '#ffffff', label: 'Nature',    svg: `<path d="M12 2l3 5-2 1 3 5-2 1 4 6H8l-4 0 4-6-2-1 3-5-2-1 3-5zM12 22v-4"/>` },
  family:    { fill: '#5B8A3A', ring: '#ffffff', label: 'Family',    svg: `<circle cx="12" cy="6" r="3"/><path d="M9 10h6M9 22v-6a3 3 0 0 1 6 0v6"/>` },
  shopping:  { fill: '#8B5CF6', ring: '#ffffff', label: 'Shopping',  svg: `<path d="M3 9h18l-2 12H5L3 9zM8 9V6a4 4 0 0 1 8 0v3"/>` },
  wellness:  { fill: '#0EA5E9', ring: '#ffffff', label: 'Wellness',  svg: `<path d="M12 2v20M2 12h20"/>` },
  nightlife: { fill: '#7C1D6F', ring: '#E1B547', label: 'Nightlife', svg: `<path d="M12 3l2 6 6 1-4.5 4 1.5 6-5-3-5 3 1.5-6L4 10l6-1 2-6z"/>` },
  religious: { fill: '#6B7280', ring: '#ffffff', label: 'Religious', svg: `<path d="M4 22V10l8-6 8 6v12"/><path d="M9 22V12h6v10"/><path d="M2 22h20"/>` },
  transport: { fill: '#334155', ring: '#E1B547', label: 'Transport', svg: `<rect x="5" y="3" width="14" height="16" rx="2"/><path d="M9 19l-2 3M15 19l2 3M9 8h6"/>` },
  transit:   { fill: '#334155', ring: '#E1B547', label: 'Transit',   svg: `<rect x="5" y="3" width="14" height="16" rx="2"/><path d="M9 19l-2 3M15 19l2 3M9 8h6"/>` },
  sport:     { fill: '#059669', ring: '#ffffff', label: 'Sport',     svg: `<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>` },
  default:   { fill: '#0B3D3A', ring: '#B48A2D', label: 'Place',     svg: `<path d="M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>` },
}

function styleFor(category) {
  return CATEGORY_STYLE[category] || CATEGORY_STYLE.default
}

// Build a Leaflet divIcon per category (+ active state for the selected pin).
function buildIcon(category, active) {
  const st = styleFor(category)
  const size = active ? 40 : 32
  const html = `
    <div class="bekasigo-pin-inner${active ? ' bekasigo-pin-active' : ''}" style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${st.fill};
      outline:${active ? 3 : 2}px solid ${active ? '#ffffff' : st.ring};
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 4px 12px rgba(0,0,0,0.35);
    ">
      <svg width="${active ? 20 : 16}" height="${active ? 20 : 16}" viewBox="0 0 24 24" ${STROKE}>${st.svg}</svg>
    </div>
  `
  return L.divIcon({
    html,
    className: 'bekasigo-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

// Fly the map to the selected pin when the parent selects it (e.g. from side
// panel). Also gently zoom back out to the whole city when nothing is selected.
function MapFlyTo({ selected, defaultCenter }) {
  const map = useMap()
  useEffect(() => {
    if (selected?.pos) {
      map.flyTo([selected.pos.lat, selected.pos.lng], 15, { duration: 0.9 })
    } else {
      map.flyTo([defaultCenter.lat, defaultCenter.lng], 12, { duration: 0.9 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id])
  return null
}

export default function ExploreMapCanvasImpl({ items, selectedId, onSelect }) {
  const selected = useMemo(() => items.find((i) => i.id === selectedId) || null, [items, selectedId])
  const visibleCats = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items])

  // Mount guard: prevents React 18 StrictMode double-invoke from tripping
  // Leaflet's "Map container is already initialized" error, and cleans up the
  // DOM node's internal Leaflet id on unmount so HMR re-mounts work too.
  const containerRef = useRef(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line no-underscore-dangle
        containerRef.current._leaflet_id = null
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[color:var(--ink-forest,#0B3D3A)]/12 shadow-xl">
      {ready ? (
      <MapContainer
        center={[KOTA_BEKASI_CENTER.lat, KOTA_BEKASI_CENTER.lng]}
        zoom={12}
        minZoom={11}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
        zoomControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items.map((d) => (
          <Marker
            key={d.id}
            position={[d.pos.lat, d.pos.lng]}
            icon={buildIcon(d.category, d.id === selectedId)}
            eventHandlers={{
              click: () => onSelect(d.id),
            }}
          >
            <Popup>
              <div style={{ maxWidth: 220 }}>
                <p style={{ margin: 0, fontFamily: 'ui-serif, Georgia, serif', fontSize: 15, fontWeight: 600, color: '#0B3D3A' }}>
                  {d.title}
                </p>
                <p style={{ margin: '4px 0 0', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6B7280' }}>
                  {styleFor(d.category).label} · {d.district?.replace(/-/g, ' ')}
                </p>
                {d.excerpt ? (
                  <p style={{ margin: '6px 0 0', fontSize: 12, color: '#475569', lineHeight: 1.4 }}>{d.excerpt.slice(0, 120)}</p>
                ) : null}
              </div>
            </Popup>
          </Marker>
        ))}

        <MapFlyTo selected={selected} defaultCenter={KOTA_BEKASI_CENTER} />
      </MapContainer>
      ) : null}

      {/* Legend overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[500] flex flex-wrap items-center justify-center gap-2 border-t border-white/20 bg-black/45 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur">
        {visibleCats.slice(0, 6).map((cat) => {
          const st = styleFor(cat)
          return (
            <span key={cat} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: st.fill, outline: `1.5px solid ${st.ring}` }} />
              {st.label}
            </span>
          )
        })}
        {visibleCats.length > 6 && <span className="opacity-70">+{visibleCats.length - 6}</span>}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="absolute inset-0 z-[600] flex items-center justify-center bg-black/40">
          <div className="rounded-2xl bg-white/95 px-6 py-4 text-center text-sm text-[color:var(--ink-forest,#0B3D3A)] shadow-2xl backdrop-blur">
            No places match your filters.
          </div>
        </div>
      )}
    </div>
  )
}
