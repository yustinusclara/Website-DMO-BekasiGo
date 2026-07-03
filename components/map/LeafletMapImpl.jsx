'use client'

// Real Leaflet implementation. Client-only; dynamically imported by
// LeafletMap.jsx so it never runs during SSR.

import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { KOTA_BEKASI_CENTER } from '@/lib/map/positions'

const STROKE = 'stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"'

// ---------------------------------------------------------------------------
// Category → marker style. Each entry declares fill+ring colors and a raw
// SVG path snippet drawn inside the pin.
// ---------------------------------------------------------------------------
export const CATEGORY_STYLE = {
  heritage:    { fill: '#B48A2D', ring: '#0B3D3A', label: 'Heritage',    svg: `<path d="M4 22V10l8-6 8 6v12"/><path d="M9 22V12h6v10"/><path d="M2 22h20"/>` },
  urban:       { fill: '#0B3D3A', ring: '#E1B547', label: 'Urban',       svg: `<path d="M12 3v3M3 12H0M24 12h-3M12 24v-3M4 4l2 2M18 18l2 2M20 4l-2 2M6 18l-2 2"/><circle cx="12" cy="12" r="5"/>` },
  culinary:    { fill: '#A34E2B', ring: '#ffffff', label: 'Culinary',    svg: `<path d="M3 2v7c0 1.1.9 2 2 2h4V2M11 2v20M17 2c-1.5 0-3 1-3 4v6c0 1 .5 2 2 2h1v8"/>` },
  nature:      { fill: '#1E7A72', ring: '#ffffff', label: 'Nature',      svg: `<path d="M12 2l3 5-2 1 3 5-2 1 4 6H8l-4 0 4-6-2-1 3-5-2-1 3-5zM12 22v-4"/>` },
  family:      { fill: '#5B8A3A', ring: '#ffffff', label: 'Family',      svg: `<circle cx="12" cy="6" r="3"/><path d="M9 10h6M9 22v-6a3 3 0 0 1 6 0v6"/>` },
  shopping:    { fill: '#8B5CF6', ring: '#ffffff', label: 'Shopping',    svg: `<path d="M3 9h18l-2 12H5L3 9zM8 9V6a4 4 0 0 1 8 0v3"/>` },
  wellness:    { fill: '#0EA5E9', ring: '#ffffff', label: 'Wellness',    svg: `<path d="M12 2v20M2 12h20"/>` },
  nightlife:   { fill: '#7C1D6F', ring: '#E1B547', label: 'Nightlife',   svg: `<path d="M12 3l2 6 6 1-4.5 4 1.5 6-5-3-5 3 1.5-6L4 10l6-1 2-6z"/>` },
  religious:   { fill: '#6B7280', ring: '#ffffff', label: 'Religious',   svg: `<path d="M4 22V10l8-6 8 6v12"/><path d="M9 22V12h6v10"/><path d="M2 22h20"/>` },
  transit:     { fill: '#334155', ring: '#E1B547', label: 'Transit',     svg: `<rect x="5" y="3" width="14" height="16" rx="2"/><path d="M9 19l-2 3M15 19l2 3M9 8h6"/>` },
  transport:   { fill: '#334155', ring: '#E1B547', label: 'Transport',   svg: `<rect x="5" y="3" width="14" height="16" rx="2"/><path d="M9 19l-2 3M15 19l2 3M9 8h6"/>` },
  sport:       { fill: '#059669', ring: '#ffffff', label: 'Sport',       svg: `<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>` },
  events:      { fill: '#D48A2D', ring: '#0B3D3A', label: 'Events',      svg: `<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>` },
  destination: { fill: '#B48A2D', ring: '#0B3D3A', label: 'Destination', svg: `<path d="M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>` },
  restaurant:  { fill: '#A34E2B', ring: '#ffffff', label: 'Restaurant',  svg: `<path d="M3 2v7c0 1.1.9 2 2 2h4V2M11 2v20M17 2c-1.5 0-3 1-3 4v6c0 1 .5 2 2 2h1v8"/>` },
  hotel:       { fill: '#1E7A72', ring: '#ffffff', label: 'Hotel',       svg: `<path d="M2 20V10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10"/><path d="M2 20h20M7 8V4h10v4"/>` },
  default:     { fill: '#0B3D3A', ring: '#B48A2D', label: 'Place',       svg: `<path d="M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>` },
}

function styleFor(cat) { return CATEGORY_STYLE[cat] || CATEGORY_STYLE.default }

function buildIcon({ category, active, order }) {
  const st = styleFor(category)
  const size = active ? 40 : 32
  const orderBadge = typeof order === 'number' && order > 0
    ? `<span style="position:absolute;top:-6px;right:-6px;background:#0B3D3A;color:#fff;font-size:10px;font-weight:700;border-radius:9999px;padding:1px 5px;box-shadow:0 2px 4px rgba(0,0,0,0.3);">${order}</span>`
    : ''
  const html = `
    <div class="bekasigo-pin-inner${active ? ' bekasigo-pin-active' : ''}" style="position:relative;width:${size}px;height:${size}px;border-radius:50%;
      background:${st.fill};
      outline:${active ? 3 : 2}px solid ${active ? '#ffffff' : st.ring};
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 4px 12px rgba(0,0,0,0.35);">
      <svg width="${active ? 20 : 16}" height="${active ? 20 : 16}" viewBox="0 0 24 24" ${STROKE}>${st.svg}</svg>
      ${orderBadge}
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

// Programmatically fly to selected pin (or back to center) when selectedId
// changes. Also gracefully lock the map when interactive === false.
function MapController({ selected, defaultCenter, defaultZoom, flyZoom, interactive }) {
  const map = useMap()
  useEffect(() => {
    if (!interactive) {
      map.dragging.disable()
      map.scrollWheelZoom.disable()
      map.doubleClickZoom.disable()
      map.boxZoom.disable()
      map.keyboard.disable()
      map.touchZoom.disable()
      if (map.tap) map.tap.disable()
    }
  }, [interactive, map])
  useEffect(() => {
    if (selected?.lat != null && selected?.lng != null) {
      map.flyTo([selected.lat, selected.lng], flyZoom || 15, { duration: 0.9 })
    } else {
      map.flyTo([defaultCenter.lat, defaultCenter.lng], defaultZoom, { duration: 0.9 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id])
  return null
}

const TILE_URLS = {
  light: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
}

export default function LeafletMapImpl({
  points = [],
  center,
  zoom = 12,
  minZoom = 10,
  selectedId = null,
  onMarkerClick,
  route,
  interactive = true,
  tileStyle = 'light',
  showLegend = false,
  showAttribution = true,
  overlays,
}) {
  const resolvedCenter = center || KOTA_BEKASI_CENTER
  const selected = useMemo(
    () => points.find((p) => p.id === selectedId) || null,
    [points, selectedId],
  )
  const visibleCats = useMemo(() => Array.from(new Set(points.map((p) => p.category))), [points])

  // Guard against React 18 StrictMode double-init + HMR remount.
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

  const tile = TILE_URLS[tileStyle] || TILE_URLS.light

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {ready ? (
        <MapContainer
          center={[resolvedCenter.lat, resolvedCenter.lng]}
          zoom={zoom}
          minZoom={minZoom}
          scrollWheelZoom={interactive}
          dragging={interactive}
          doubleClickZoom={interactive}
          zoomControl={interactive}
          attributionControl={showAttribution}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer attribution={tile.attribution} url={tile.url} />

          {points.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={buildIcon({
                category: p.category,
                active: p.id === selectedId || p.active,
                order: p.order,
              })}
              eventHandlers={onMarkerClick ? { click: () => onMarkerClick(p.id) } : undefined}
            >
              {p.title ? (
                <Popup>
                  <div style={{ maxWidth: 220 }}>
                    <p style={{ margin: 0, fontFamily: 'ui-serif, Georgia, serif', fontSize: 15, fontWeight: 600, color: '#0B3D3A' }}>
                      {p.title}
                    </p>
                    {p.kicker ? (
                      <p style={{ margin: '4px 0 0', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6B7280' }}>
                        {p.kicker}
                      </p>
                    ) : null}
                    {p.description ? (
                      <p style={{ margin: '6px 0 0', fontSize: 12, color: '#475569', lineHeight: 1.4 }}>{p.description.slice(0, 140)}</p>
                    ) : null}
                  </div>
                </Popup>
              ) : null}
            </Marker>
          ))}

          {Array.isArray(route) && route.length >= 2 ? (
            <Polyline
              positions={route}
              pathOptions={{ color: '#B48A2D', weight: 3, opacity: 0.85, dashArray: '6 8' }}
            />
          ) : null}

          <MapController
            selected={selected ? { id: selected.id, lat: selected.lat, lng: selected.lng } : null}
            defaultCenter={resolvedCenter}
            defaultZoom={zoom}
            flyZoom={15}
            interactive={interactive}
          />
        </MapContainer>
      ) : null}

      {showLegend ? (
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
      ) : null}

      {overlays}
    </div>
  )
}
