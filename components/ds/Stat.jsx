'use client'
import { cn } from '@/lib/utils'

/**
 * Stat — display metric used in hero, footer strip, floating city section.
 */
export default function Stat({ value, label, size = 'md', invert = false, className }) {
  const sizes = {
    sm: { val: 'text-2xl', gap: 'mt-1' },
    md: { val: 'text-3xl md:text-4xl', gap: 'mt-1' },
    lg: { val: 'text-4xl md:text-5xl', gap: 'mt-2' },
  }[size]
  return (
    <div className={className}>
      <div className={cn('font-display leading-none', sizes.val, invert ? 'text-bekasi-gold-400' : 'text-bekasi-emerald-800')}>
        {value}
      </div>
      <div className={cn(sizes.gap, 'text-eyebrow uppercase', invert ? 'text-white/60' : 'text-bekasi-ink/55')}>
        {label}
      </div>
    </div>
  )
}
