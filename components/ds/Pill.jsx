'use client'
import { cn } from '@/lib/utils'

const BASE = {
  light:   'pill-light',
  dark:    'pill-dark',
  gold:    'pill-gold',
  emerald: 'pill-emerald',
}

export default function Pill({
  children,
  variant = 'light',
  size = 'md',
  as: Tag = 'span',
  className,
  icon: Icon,
  ...rest
}) {
  return (
    <Tag
      className={cn(BASE[variant], size === 'sm' && 'text-[11px] px-3 py-1', className)}
      {...rest}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </Tag>
  )
}
