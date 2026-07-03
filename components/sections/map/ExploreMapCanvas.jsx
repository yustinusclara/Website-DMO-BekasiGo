'use client'

import { useMemo } from 'react'
import { Landmark, Utensils, Store, TreePine, Baby, Sparkles, MapPin, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORY_STYLE = {
  heritage:  { fill: '#B48A2D', ring: '#0B3D3A', Icon: Landmark,  label: 'Heritage'  },
  urban:     { fill: '#0B3D3A', ring: '#E1B547', Icon: Sparkles,  label: 'Urban'     },
  culinary:  { fill: '#A34E2B', ring: '#ffffff', Icon: Utensils,  label: 'Culinary'  },
  nature:    { fill: '#1E7A72', ring: '#ffffff', Icon: TreePine,  label: 'Nature'    },
  family:    { fill: '#5B8A3A', ring: '#ffffff', Icon: Baby,      label: 'Family'    },
  shopping:  { fill: '#8B5CF6', ring: '#ffffff', Icon: Store,     label: 'Shopping'  },
  wellness:  { fill: '#0EA5E9', ring: '#ffffff', Icon: Sparkles,  label: 'Wellness'  },
  nightlife: { fill: '#7C1D6F', ring: '#E1B547', Icon: Sparkles,  label: 'Nightlife' },
  religious: { fill: '#6B7280', ring: '#ffffff', Icon: Landmark,  label: 'Religious' },
  transport: { fill: '#334155', ring: '#E1B547', Icon: MapPin,    label: 'Transport' },
  default:   { fill: '#0B3D3A', ring: '#B48A2D', Icon: MapPin,    label: 'Place'     },
}

function styleFor(cat) {
  return CATEGORY_STYLE[cat] || CATEGORY_STYLE.default
}

export default function ExploreMapCanvas({ items, selectedId, onSelect }) {
  const visibleCats = useMemo(() => {
    const set = new Set(items.map((i) => i.category))
    return Array.from(set)
  }, [items])

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[color:var(--ink-forest,#0B3D3A)]/12 bg-[color:var(--ink-forest,#0B3D3A)] shadow-xl">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_10%,rgba(30,122,114,0.35),transparent_60%),radial-gradient(90%_70%_at_80%_90%,rgba(180,138,45,0.28),transparent_65%)]" />

      {/* Grid overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.14]" viewBox="0 0 100 75" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="exploreGrid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#E1B547" strokeWidth="0.15" />
          </pattern>
        </defs>
        <rect width="100" height="75" fill="url(#exploreGrid)" />
      </svg>

      {/* District labels (subtle) */}
      <div className="pointer-events-none absolute inset-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">
        <span className="absolute" style={{ left: '28%', top: '68%', transform: 'translate(-50%, 24px)' }}>Bekasi Timur</span>
        <span className="absolute" style={{ left: '58%', top: '24%', transform: 'translate(-50%, 24px)' }}>Bekasi Utara</span>
        <span className="absolute" style={{ left: '44%', top: '82%', transform: 'translate(-50%, 24px)' }}>Bekasi Selatan</span>
        <span className="absolute" style={{ left: '68%', top: '62%', transform: 'translate(-50%, 24px)' }}>Bekasi Barat</span>
      </div>

      {/* Header controls */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/85 backdrop-blur">
          <MapPin className="h-3.5 w-3.5" />
          Kota Bekasi
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/85 backdrop-blur hover:bg-black/60"
        >
          <Layers className="h-3.5 w-3.5" /> Layers
        </button>
      </div>

      {/* Markers */}
      {items.map((d) => {
        const st = styleFor(d.category)
        const active = d.id === selectedId
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => onSelect(d.id)}
            className={cn(
              'group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none',
              active ? 'z-30' : 'z-10',
            )}
            style={{ left: `${d.pos.x * 100}%`, top: `${d.pos.y * 100}%` }}
            aria-label={d.title}
          >
            <span
              className={cn(
                'relative flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-transform',
                active ? 'scale-125 ring-4 ring-white/50' : 'hover:scale-110',
              )}
              style={{ backgroundColor: st.fill, outline: `2px solid ${st.ring}` }}
            >
              <st.Icon className="h-4 w-4 text-white" />
              {active && (
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" style={{ backgroundColor: st.fill }} />
              )}
            </span>
          </button>
        )
      })}

      {/* Legend */}
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-2 border-t border-white/10 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/70 backdrop-blur">
        {visibleCats.slice(0, 6).map((cat) => {
          const st = styleFor(cat)
          return (
            <span key={cat} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: st.fill, outline: `1.5px solid ${st.ring}` }} />
              {st.label}
            </span>
          )
        })}
        {visibleCats.length > 6 && <span className="opacity-60">+{visibleCats.length - 6}</span>}
      </div>

      {/* Empty overlay */}
      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl bg-black/50 px-6 py-4 text-center text-sm text-white/90 backdrop-blur">
            No places match your filters.
          </div>
        </div>
      )}
    </div>
  )
}
