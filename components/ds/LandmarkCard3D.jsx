'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * LandmarkCard3D — the reusable landmark showcase card.
 *
 * Presents a 3D isometric-style landmark on a soft cream stage with:
 *  - large Playfair number backdrop (01, 02, …)
 *  - elliptical ground shadow for a floating platform feel
 *  - subtle isometric “grid” floor pattern
 *  - category chip + district meta
 *  - title + CTA arrow
 *  - hover: image lifts, ground shadow expands, card slightly tilts on perspective
 *
 * Props:
 *  - item: { title, category, district, meta, image, href }
 *  - index (1-based) for the numeric backdrop
 *  - variant: 'cream' | 'dark' — stage tone
 *  - feature: boolean — slightly larger / more dramatic
 *  - className
 */
export default function LandmarkCard3D({
  item,
  index = 1,
  variant = 'cream',
  feature = false,
  className,
}) {
  const tone = variant === 'dark'
    ? {
        stage:     'from-bekasi-emerald-800 via-bekasi-emerald-900 to-bekasi-emerald-900',
        number:    'text-white/[0.04]',
        chip:      'chip-dark',
        title:     'text-white',
        meta:      'text-white/60',
        cta:       'text-bekasi-gold-400',
        ground:    'bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.55)_0%,_transparent_70%)]',
        gridLine:  'rgba(255,255,255,0.08)',
      }
    : {
        stage:     'from-bekasi-cream via-white to-bekasi-sand',
        number:    'text-bekasi-emerald-900/[0.05]',
        chip:      'chip-light',
        title:     'text-bekasi-emerald-900',
        meta:      'text-bekasi-ink/55',
        cta:       'text-bekasi-emerald-900',
        ground:    'bg-[radial-gradient(ellipse_at_center,_rgba(11,61,58,0.30)_0%,_transparent_70%)]',
        gridLine:  'rgba(11,61,58,0.08)',
      }

  return (
    <Link
      href={item.href}
      className={cn(
        'group relative block rounded-3xl overflow-hidden border border-black/[0.04] transition-all duration-500 ease-out',
        'bg-gradient-to-b', tone.stage,
        feature ? 'aspect-[4/5]' : 'aspect-[4/5]',
        'hover:-translate-y-1 hover:shadow-elevated',
        className,
      )}
      style={{ perspective: '1200px' }}
    >
      {/* Isometric floor grid (subtle) */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 400 500"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={`iso-grid-${index}`} width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="skewX(-30) scale(1 0.6)">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke={tone.gridLine} strokeWidth="1" />
          </pattern>
          <linearGradient id={`iso-fade-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.55" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id={`iso-mask-${index}`}>
            <rect width="100%" height="100%" fill={`url(#iso-fade-${index})`} />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={`url(#iso-grid-${index})`} mask={`url(#iso-mask-${index})`} />
      </svg>

      {/* Big number backdrop */}
      <span className={cn(
        'absolute -bottom-6 left-4 select-none font-display leading-[0.75] tracking-tighter pointer-events-none',
        tone.number,
        feature ? 'text-[18rem]' : 'text-[14rem]',
      )}>
        {String(index).padStart(2, '0')}
      </span>

      {/* Top row: chip + arrow */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between">
        <span className={cn(tone.chip)}>{item.category}</span>
        <span className="h-8 w-8 rounded-full bg-bekasi-emerald-900 text-bekasi-gold-400 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {/* Ground shadow (behind image) */}
      <div
        aria-hidden
        className={cn(
          'absolute left-1/2 -translate-x-1/2 h-8 w-3/5 rounded-[50%] transition-all duration-500 ease-out',
          tone.ground,
          'group-hover:w-[70%] group-hover:opacity-90',
        )}
        style={{ bottom: '32%', filter: 'blur(4px)' }}
      />

      {/* Landmark image — floats and lifts on hover */}
      <div className="absolute inset-x-0 top-[8%] bottom-[36%] flex items-center justify-center pointer-events-none">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="max-h-full max-w-[82%] object-contain transition-transform duration-700 ease-out drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] group-hover:-translate-y-2 group-hover:scale-[1.04]"
        />
      </div>

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-10">
        <div className={cn('text-[10px] uppercase tracking-[0.25em]', tone.meta)}>
          {item.meta}
        </div>
        <h3 className={cn('mt-2 font-display leading-tight text-balance', tone.title, feature ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl')}>
          {item.title}
        </h3>
        <div className={cn('mt-4 inline-flex items-center gap-1.5 text-sm font-medium', tone.cta)}>
          Visit landmark
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  )
}
