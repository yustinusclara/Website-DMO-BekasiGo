'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * ChapterMarker — reusable editorial chapter strip used at the top of
 * major homepage sections. “——  Chapter 02 · The Signature  ——”
 *
 * variant:  'dark'  — white text on dark section (default)
 *           'light' — emerald text on cream section
 */
export default function ChapterMarker({ text, variant = 'dark', className, animate = true }) {
  const tone = variant === 'light'
    ? { line: 'bg-bekasi-emerald-900/25', text: 'text-bekasi-ink/55' }
    : { line: 'bg-bekasi-gold-500/50',    text: 'text-white/50' }

  const Wrap = animate ? motion.div : 'div'
  const motionProps = animate ? {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  } : {}

  return (
    <Wrap
      {...motionProps}
      className={cn(
        'flex items-center justify-center gap-4 text-eyebrow uppercase',
        tone.text,
        className,
      )}
    >
      <span className={cn('h-px w-12', tone.line)} />
      <span>{text}</span>
      <span className={cn('h-px w-12', tone.line)} />
    </Wrap>
  )
}
