'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Landmark, Utensils, Bed, TrainFront, X, ChevronLeft, ChevronRight,
  Maximize2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PLANNER_SAMPLE } from '@/lib/content/planner-sample'
import { adaptApiPlan } from '@/lib/planner/adapt'
import LeafletMap from '@/components/map/LeafletMap'
import { normalizedToLatLng, KOTA_BEKASI_CENTER } from '@/lib/map/positions'

// Legend-only style map (icons for kind chips).
const KIND_STYLE = {
  destination: { fill: '#B48A2D', ring: '#0B3D3A', Icon: Landmark,   label: 'Destination' },
  restaurant:  { fill: '#A34E2B', ring: '#ffffff', Icon: Utensils,   label: 'Restaurant'  },
  hotel:       { fill: '#1E7A72', ring: '#ffffff', Icon: Bed,        label: 'Hotel'       },
  transport:   { fill: '#334155', ring: '#E1B547', Icon: TrainFront, label: 'Transport'   },
}

// Convert a marker with normalized pos {x, y} into a Leaflet point.
function toPoint(m) {
  const ll = normalizedToLatLng(m.pos)
  return {
    id: m.id,
    lat: ll.lat,
    lng: ll.lng,
    category: m.kind || 'destination',
    title: m.title || m.name,
    kicker: m.kicker,
    order: m.order,
  }
}

export default function PlannerMapPanel({ plan: planProp }) {
  // If a real API plan is supplied, adapt it to the map shape.
  // Otherwise fall back to the design-time SAMPLE_PLAN.
  const plan = useMemo(() => {
    if (!planProp) return PLANNER_SAMPLE
    return adaptApiPlan(planProp)
  }, [planProp])

  const [dayIndex, setDayIndex]     = useState(0)
  const [selectedId, setSelectedId] = useState(null)

  const day = plan.days[dayIndex] || plan.days[0]

  // Aggregate all markers for the current day + hotel + transport hubs.
  const markers = useMemo(() => {
    const stops = day.stops.map((s, i) => ({ ...s, order: i + 1 }))
    const hotelMarker = plan.hotel ? { ...plan.hotel, kind: 'hotel', order: null } : null
    const transportMarkers = (plan.transportHubs || []).map((h) => ({
      ...h, kind: 'transport', order: null,
    }))
    return {
      stops,
      hotel: hotelMarker,
      transport: transportMarkers,
      all: [...stops, ...(hotelMarker ? [hotelMarker] : []), ...transportMarkers],
    }
  }, [day, plan])

  const points = useMemo(
    () => markers.all.filter((m) => m.pos).map(toPoint),
    [markers],
  )
  const route = useMemo(
    () => markers.stops.filter((s) => s.pos).map((s) => {
      const ll = normalizedToLatLng(s.pos)
      return [ll.lat, ll.lng]
    }),
    [markers.stops],
  )

  const selected = markers.all.find((m) => m.id === selectedId)

  return (
    <div className="rounded-xl bg-white border border-bekasi-emerald-900/8 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-bekasi-emerald-900/8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-8 w-8 rounded-md bg-bekasi-emerald-900/8 text-bekasi-emerald-800 inline-flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900 truncate">Live route</div>
            <div className="text-[11.5px] text-bekasi-ink/55 truncate">Day {day.day} · {day.stops.length} stops</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setDayIndex((i) => Math.max(0, i - 1))} disabled={dayIndex === 0}
            className={cn('h-7 w-7 rounded-md inline-flex items-center justify-center',
              dayIndex === 0 ? 'text-bekasi-ink/25 cursor-not-allowed' : 'text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06]')}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/55">Day {dayIndex + 1}/{plan.days.length}</span>
          <button onClick={() => setDayIndex((i) => Math.min(plan.days.length - 1, i + 1))} disabled={dayIndex === plan.days.length - 1}
            className={cn('h-7 w-7 rounded-md inline-flex items-center justify-center',
              dayIndex === plan.days.length - 1 ? 'text-bekasi-ink/25 cursor-not-allowed' : 'text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06]')}>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button title="Expand" className="ml-1 h-7 w-7 rounded-md inline-flex items-center justify-center text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06]">
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Map canvas — real Leaflet + OSM */}
      <div className="relative">
        <LeafletMap
          points={points}
          route={route}
          center={KOTA_BEKASI_CENTER}
          zoom={12}
          selectedId={selectedId}
          onMarkerClick={setSelectedId}
          heightClass="aspect-[4/3]"
          interactive
        />

        {/* Selected marker tooltip */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute top-3 left-3 right-3 md:right-auto md:max-w-xs z-[900] rounded-lg bg-white/95 backdrop-blur border border-white/20 shadow-lg overflow-hidden"
            >
              <SelectedCard marker={selected} onClose={() => setSelectedId(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <Legend />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tooltip / selected marker card
// ---------------------------------------------------------------------------
function SelectedCard({ marker, onClose }) {
  const style = KIND_STYLE[marker.kind] || KIND_STYLE.destination
  const Icon = style.Icon
  return (
    <div className="flex items-start gap-2.5 p-3">
      <span className="h-8 w-8 rounded-md inline-flex items-center justify-center shrink-0"
        style={{ background: `${style.fill}20`, color: style.fill }}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: style.fill }}>{style.label}</span>
          {marker.order != null && (
            <span className="text-[10px] font-semibold rounded-full bg-bekasi-emerald-900 text-white px-1.5 py-0.5">
              Stop {marker.order}
            </span>
          )}
        </div>
        <div className="mt-0.5 font-medium text-[13.5px] text-bekasi-emerald-900 truncate">
          {marker.title || marker.name}
        </div>
        {marker.kicker && (
          <div className="text-[11px] uppercase tracking-[0.18em] text-bekasi-ink/55 truncate">{marker.kicker}</div>
        )}
        {marker.district && (
          <div className="text-[11px] text-bekasi-ink/55 truncate">{marker.district}</div>
        )}
        {marker.time && (
          <div className="mt-1 inline-flex items-center gap-2 text-[11.5px] text-bekasi-ink/70">
            <span className="font-medium text-bekasi-emerald-900">{marker.time}</span>
            <span className="opacity-40">·</span>
            <span>{marker.duration}</span>
          </div>
        )}
      </div>
      <button onClick={onClose} className="h-6 w-6 rounded-md text-bekasi-ink/40 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06] inline-flex items-center justify-center shrink-0">
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------
function Legend() {
  return (
    <div className="px-5 py-3 border-t border-bekasi-emerald-900/8 bg-bekasi-cream/40 flex flex-wrap gap-x-4 gap-y-2">
      {Object.entries(KIND_STYLE).map(([id, s]) => {
        const Icon = s.Icon
        return (
          <div key={id} className="inline-flex items-center gap-1.5 text-[11.5px] text-bekasi-ink/70">
            <span className="h-4 w-4 rounded-full inline-flex items-center justify-center" style={{ background: s.fill, color: '#fff' }}>
              <Icon className="h-2.5 w-2.5" />
            </span>
            <span className="font-medium">{s.label}</span>
          </div>
        )
      })}
      <div className="inline-flex items-center gap-1.5 text-[11.5px] text-bekasi-ink/60 ml-auto">
        <span className="inline-block w-6 h-0 border-t-2 border-dashed border-bekasi-gold-500" />
        <span>Route order</span>
      </div>
    </div>
  )
}
