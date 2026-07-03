'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/**
 * Reusable Section wrapper for the whole site.
 * variants:
 *  - cream (default light editorial)
 *  - light (pure white card feel)
 *  - dark  (immersive emerald)
 *  - flush (no vertical padding, for full-bleed hero-like sections)
 */
export default function Section({
  id,
  variant = 'cream',
  eyebrow,
  title,
  kicker,
  action,
  align = 'left',      // 'left' | 'center'
  containerClassName,
  className,
  headerClassName,
  children,
  as: Tag = 'section',
}) {
  const variants = {
    cream: 'bg-bekasi-cream text-bekasi-ink',
    light: 'bg-white text-bekasi-ink',
    sand:  'bg-bekasi-sand text-bekasi-ink',
    dark:  'gradient-emerald text-white',
    flush: 'bg-transparent',
  }

  const pad = variant === 'flush' ? '' : 'py-16 md:py-24 lg:py-28'

  return (
    <Tag id={id} className={cn('relative overflow-hidden', variants[variant], pad, className)}>
      <div className={cn('container relative', containerClassName)}>
        {(eyebrow || title || kicker || action) && (
          <header
            className={cn(
              'mb-10 md:mb-14 flex flex-col gap-4',
              align === 'center' && 'items-center text-center max-w-3xl mx-auto',
              headerClassName,
            )}
          >
            {eyebrow && (
              <span className={cn('eyebrow eyebrow-dot',
                variant === 'dark' ? 'text-bekasi-gold-400' : 'text-bekasi-emerald-700')}>
                {eyebrow}
              </span>
            )}
            <div className={cn(
              'flex flex-col md:flex-row md:items-end gap-6 md:gap-10',
              align === 'center' && 'md:flex-col md:items-center'
            )}>
              {title && (
                <h2 className={cn(
                  'heading-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-balance flex-1',
                  variant === 'dark' ? 'text-white' : 'text-bekasi-emerald-900',
                )}>
                  {title}
                </h2>
              )}
              {(kicker || action) && (
                <div className={cn('md:max-w-sm md:pb-2 md:text-right', align === 'center' && 'md:text-center md:max-w-xl')}>
                  {kicker && (
                    <p className={cn('text-base md:text-lg leading-relaxed',
                      variant === 'dark' ? 'text-white/75' : 'text-bekasi-ink/70')}>
                      {kicker}
                    </p>
                  )}
                  {action && (
                    <Link
                      href={action.href}
                      className={cn(
                        'group mt-4 inline-flex items-center gap-2 text-sm font-medium border-b pb-1 transition-colors',
                        variant === 'dark'
                          ? 'border-bekasi-gold-400/60 text-bekasi-gold-400 hover:text-white hover:border-white'
                          : 'border-bekasi-emerald-800/40 text-bekasi-emerald-800 hover:text-bekasi-emerald-900 hover:border-bekasi-emerald-900',
                      )}
                    >
                      {action.label}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </header>
        )}
        {children}
      </div>
    </Tag>
  )
}
