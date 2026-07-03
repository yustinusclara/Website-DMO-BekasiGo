'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * PillNav — premium pill navigation with an animated background indicator.
 * Inspired by GSAP pill navigation patterns: the active pill's bg smoothly
 * morphs between items using framer-motion's shared layout (layoutId).
 *
 * items: Array<{ id, label, icon?: LucideIcon, href?: string }>
 * activeId: currently active pill id
 * onHover(id): called when user hovers a pill (useful for reactive previews)
 * onSelect(id): called when user clicks (for tab-like usage)
 * variant: 'light' | 'dark'
 * as: render pills as buttons ('button') or links ('link') if href present
 */
export default function PillNav({
  items,
  activeId,
  onHover,
  onSelect,
  variant = 'light',
  size = 'md',
  className,
  layoutId = 'pillnav-bg',
  scroll = true,
}) {
  const [hoverId, setHoverId] = useState(null)
  const currentId = hoverId ?? activeId ?? items?.[0]?.id

  const track = variant === 'dark'
    ? 'bg-white/[0.06] border border-white/10'
    : 'bg-black/[0.04] border border-black/[0.05]'

  const inactiveText = variant === 'dark' ? 'text-white/70 hover:text-white' : 'text-bekasi-ink/70 hover:text-bekasi-emerald-900'
  const activeText   = variant === 'dark' ? 'text-bekasi-emerald-900' : 'text-white'
  const activeBg     = variant === 'dark' ? 'bg-bekasi-gold-500' : 'bg-bekasi-emerald-900'

  const sizes = {
    sm: 'h-9 text-xs px-4 gap-1.5',
    md: 'h-11 text-sm px-5 gap-2',
    lg: 'h-12 text-sm px-6 gap-2',
  }

  return (
    <div
      className={cn(
        'relative inline-flex max-w-full rounded-full p-1',
        scroll && 'overflow-x-auto no-scrollbar',
        track,
        className,
      )}
      role="tablist"
    >
      <div className="relative flex gap-0.5">
        {items.map((item) => {
          const isActive = currentId === item.id
          const Icon = item.icon
          const inner = (
            <>
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  className={cn('absolute inset-0 rounded-full', activeBg)}
                  transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.6 }}
                />
              )}
              <span className={cn('relative z-10 inline-flex items-center', sizes[size], 'gap-2 font-medium transition-colors',
                isActive ? activeText : inactiveText)}>
                {Icon && <Icon className="h-4 w-4" />}
                <span className="whitespace-nowrap">{item.label}</span>
              </span>
            </>
          )

          const commonProps = {
            role: 'tab',
            'aria-selected': isActive,
            onMouseEnter: () => { setHoverId(item.id); onHover?.(item.id) },
            onFocus:      () => { setHoverId(item.id); onHover?.(item.id) },
            onMouseLeave: () => { setHoverId(null) },
            onBlur:       () => { setHoverId(null) },
            className: 'relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-bekasi-gold-400',
          }

          if (item.href && !onSelect) {
            return (
              <Link key={item.id} href={item.href} {...commonProps}>
                {inner}
              </Link>
            )
          }
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect?.(item.id)}
              {...commonProps}
            >
              {inner}
            </button>
          )
        })}
      </div>
    </div>
  )
}
