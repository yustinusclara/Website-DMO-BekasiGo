'use client'

// LeafletMap — shared thin wrapper around the real Leaflet impl.
// Any caller that used to render a fake SVG map can drop this in as a
// straight replacement. The impl is dynamically imported with `ssr:false`
// so it never runs on the server.
//
// Props (see LeafletMapImpl.jsx for the full contract):
//   points        — array of { id, lat, lng, category, title?, kicker?, image?, order? }
//   center        — { lat, lng }; defaults to KOTA_BEKASI_CENTER
//   zoom          — initial zoom (default 12)
//   minZoom       — default 10
//   selectedId    — which point is "active" (bigger pin + fly-to)
//   onMarkerClick — fn(id) fired when a pin is clicked
//   route         — array of [lat, lng] pairs — draws a dashed polyline
//   interactive   — if false, disables drag/scroll-zoom (for hero previews)
//   tileStyle     — 'light' | 'dark' (dark uses CARTO dark tiles)
//   showLegend    — boolean, appends a category legend overlay
//   heightClass   — tailwind className for the wrapper aspect/height
//   overlays      — extra JSX rendered as absolute overlays on top of the map

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const Impl = dynamic(() => import('./LeafletMapImpl'), {
  ssr: false,
  loading: () => (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-[color:var(--ink-forest,#0B3D3A)]">
      <div className="inline-flex items-center gap-2 text-sm text-white/70">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading map…
      </div>
    </div>
  ),
})

export default function LeafletMap({ heightClass, className, ...props }) {
  return (
    <div className={cn('relative w-full overflow-hidden', heightClass || 'aspect-[4/3]', className)}>
      <Impl {...props} />
    </div>
  )
}
