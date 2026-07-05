'use client'
import { cn } from '@/lib/utils'

/**
 * Eyebrow — the small, all-caps, tracked label used above section titles.
 * Variants tune the accent color to sit correctly on dark/light surfaces.
 */
export default function Eyebrow({
  children,
  variant = 'emerald', // 'emerald' | 'gold' | 'ink' | 'white'
  as: Tag = 'span',
  className,
}) {
  const tones = {
    emerald: 'text-bekasi-emerald-700',
    gold:    'text-bekasi-gold-500',
    ink:     'text-bekasi-ink/70',
    white:   'text-white/70',
  }
  return (
    <Tag className={cn('eyebrow eyebrow-dot', tones[variant], className)}>
      {children}
    </Tag>
  )
}
