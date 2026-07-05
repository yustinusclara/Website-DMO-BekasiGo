'use client'

// Thin wrapper: Leaflet needs `window`, so the real map impl is dynamically
// imported with SSR disabled. Public API + props remain unchanged, so the
// parent shell doesn't have to know we swapped SVG → Leaflet.

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const MapImpl = dynamic(() => import('./ExploreMapCanvasImpl'), {
  ssr: false,
  loading: () => (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--ink-forest,#0B3D3A)]/12 bg-[color:var(--ink-forest,#0B3D3A)] shadow-xl">
      <div className="inline-flex items-center gap-2 text-sm text-white/70">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading interactive map…
      </div>
    </div>
  ),
})

export default function ExploreMapCanvas(props) {
  return <MapImpl {...props} />
}
