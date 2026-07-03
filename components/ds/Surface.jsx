'use client'
import { cn } from '@/lib/utils'

const BASE = {
  default:  'surface',
  elevated: 'surface-elevated',
  flat:     'surface-flat',
  invert:   'surface-invert',
  cream:    'surface-cream',
  cms:      'surface-cms',
}

export default function Surface({
  variant = 'default',
  padding = 'md',
  as: Tag = 'div',
  className,
  children,
  ...rest
}) {
  const pads = {
    none: '',
    sm:   'p-4',
    md:   'p-5 md:p-6',
    lg:   'p-6 md:p-8',
    xl:   'p-8 md:p-10',
  }
  return (
    <Tag className={cn(BASE[variant], pads[padding], className)} {...rest}>
      {children}
    </Tag>
  )
}
