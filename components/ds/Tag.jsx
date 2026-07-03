'use client'
import { cn } from '@/lib/utils'
import { categories as CATS } from '@/lib/design/tokens'

/**
 * Tag — category badge. Uses the shared category token palette so map pins,
 * planner activities and destination cards stay in sync.
 */
export default function Tag({ category = 'urban', variant = 'chip', className, children }) {
  const c = CATS[category] || CATS.urban
  if (variant === 'dot') {
    return (
      <span className={cn('inline-flex items-center gap-2 text-xs font-medium', className)}>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
        {children ?? c.label}
      </span>
    )
  }
  if (variant === 'solid') {
    return (
      <span
        className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] font-medium text-white', className)}
        style={{ backgroundColor: c.color }}
      >
        {children ?? c.label}
      </span>
    )
  }
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] font-medium border', className)}
      style={{
        color: c.dark,
        backgroundColor: `${c.color}1A`,   // ~10% alpha
        borderColor:     `${c.color}55`,   // ~33% alpha
      }}
    >
      {children ?? c.label}
    </span>
  )
}
