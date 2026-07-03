'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * HeritageSpotlightCard — dim editorial card with a mouse-follow spotlight
 * that reveals the vibrant image only within a soft circular mask.
 *
 * Two image layers stacked:
 *  1. base:      dim + desaturated — always visible
 *  2. spotlight: full color — masked by radial-gradient centered on cursor
 *
 * Default spotlight is centered so the card still communicates on touch.
 * On hover the spotlight follows the mouse; on leave it returns to center.
 */
export default function HeritageSpotlightCard({ item, className }) {
  const cardRef = useRef(null)

  const onMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width)  * 100
    const y = ((e.clientY - r.top)  / r.height) * 100
    el.style.setProperty('--sx', `${x}%`)
    el.style.setProperty('--sy', `${y}%`)
    el.style.setProperty('--sr', '260px')
  }
  const onMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--sx', '50%')
    el.style.setProperty('--sy', '55%')
    el.style.setProperty('--sr', '160px')
  }

  return (
    <Link
      ref={cardRef}
      href={item.href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        'group relative block aspect-[3/4] rounded-3xl overflow-hidden bg-black',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-bekasi-gold-400',
        className,
      )}
      style={{ '--sx': '50%', '--sy': '55%', '--sr': '160px' }}
    >
      {/* Base: dim + grayscale */}
      <img
        src={item.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="img-cover"
        style={{ filter: 'grayscale(0.85) brightness(0.35) contrast(1.05)' }}
      />

      {/* Spotlight: vibrant image revealed by radial mask that follows cursor */}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="img-cover transition-[mask-image] duration-500 ease-out"
        style={{
          maskImage:        'radial-gradient(circle var(--sr) at var(--sx) var(--sy), black 30%, transparent 72%)',
          WebkitMaskImage:  'radial-gradient(circle var(--sr) at var(--sx) var(--sy), black 30%, transparent 72%)',
        }}
      />

      {/* Subtle gold ring cursor indicator */}
      <span
        aria-hidden
        className="pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bekasi-gold-500/50 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
        style={{ left: 'var(--sx)', top: 'var(--sy)' }}
      />

      {/* Bottom gradient scrim */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Top chip */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
        <span className="chip-dark">{item.category}</span>
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-white/70">
          <MapPin className="h-3 w-3" /> {item.district}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 z-10">
        <h3 className="font-display text-2xl md:text-3xl text-white leading-tight text-balance">
          {item.title}
        </h3>
        <p className="mt-3 text-sm text-white/70 line-clamp-2 max-w-xs">
          {item.excerpt}
        </p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-gold-400">
          Read the story
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  )
}
