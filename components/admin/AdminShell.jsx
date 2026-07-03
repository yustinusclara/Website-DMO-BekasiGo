'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, MapPin, CalendarDays, BookOpen, Newspaper, ImageIcon,
  Settings, Bell, Search, LogOut, Menu, X, Plus, ChevronDown, ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CURRENT_USER } from '@/lib/admin/adminData'

const NAV = [
  { label: 'Dashboard',    href: '/admin',              icon: LayoutDashboard, exact: true },
  { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { label: 'Events',       href: '/admin/events',       icon: CalendarDays },
  { label: 'Stories',      href: '/admin/stories',      icon: BookOpen },
  { label: 'Blog',         href: '/admin/blog',         icon: Newspaper },
  { label: 'Media',        href: '/admin/media',        icon: ImageIcon },
  { label: 'Settings',     href: '/admin/settings',     icon: Settings },
]

/**
 * AdminShell — reusable admin chrome for the entire CMS.
 * Left sidebar + topbar + main content area. Isolated from public site.
 */
export default function AdminShell({ title, kicker, actions, children }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenu, setUserMenu]     = useState(false)

  const active = (item) => item.exact ? pathname === item.href : pathname === item.href || pathname?.startsWith(item.href + '/')

  return (
    <div className="min-h-screen bg-bekasi-cream text-bekasi-ink">
      {/* ---------- Sidebar ---------- */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-bekasi-emerald-900 text-white flex flex-col',
          'transition-transform duration-200',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0',
        )}
      >
        {/* Brand */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/8">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-md bg-bekasi-gold-500 flex items-center justify-center">
              <span className="font-display text-bekasi-emerald-900 text-base leading-none">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base tracking-tight">BekasiGo</span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-white/55 mt-0.5">CMS Console</span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden h-8 w-8 rounded-md text-white/70 hover:bg-white/10 inline-flex items-center justify-center"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 px-3 mb-2">Manage</div>
          {NAV.map((item) => {
            const Icon = item.icon
            const on = active(item)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] transition-colors',
                  on
                    ? 'bg-white/[0.08] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.04]',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
                {on && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-bekasi-gold-500" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer — user card */}
        <div className="p-3 border-t border-white/8">
          <div className="relative">
            <button
              onClick={() => setUserMenu((v) => !v)}
              className="w-full flex items-center gap-3 rounded-md px-2 py-2 hover:bg-white/[0.05] transition-colors"
            >
              <div className="h-9 w-9 rounded-md bg-bekasi-gold-500 text-bekasi-emerald-900 inline-flex items-center justify-center font-medium text-sm">
                {CURRENT_USER.initials}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <div className="text-[13px] font-medium truncate">{CURRENT_USER.name}</div>
                <div className="text-[11px] text-white/55 truncate">{CURRENT_USER.role}</div>
              </div>
              <ChevronDown className={cn('h-4 w-4 text-white/50 transition-transform', userMenu && 'rotate-180')} />
            </button>

            {userMenu && (
              <div className="absolute bottom-full mb-2 left-0 right-0 rounded-md border border-white/10 bg-bekasi-emerald-900/95 backdrop-blur shadow-2xl overflow-hidden">
                <Link href="/admin/settings" className="flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-white/[0.06]">
                  <Settings className="h-3.5 w-3.5" /> Account settings
                </Link>
                <Link href="/" target="_blank" className="flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-white/[0.06]">
                  <ExternalLink className="h-3.5 w-3.5" /> View public site
                </Link>
                <div className="border-t border-white/10" />
                <Link href="/admin/login" className="flex items-center gap-2 px-3 py-2 text-[13px] text-red-300 hover:bg-red-500/10">
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* ---------- Main area ---------- */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-white/95 backdrop-blur-xl border-b border-bekasi-emerald-900/8">
          <div className="h-full px-4 md:px-6 flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden h-9 w-9 rounded-md inline-flex items-center justify-center text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06]"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
              <input
                type="text"
                placeholder="Search destinations, events, posts…"
                className="h-10 w-full rounded-md border border-bekasi-emerald-900/12 bg-bekasi-cream/50 pl-10 pr-16 text-sm placeholder:text-bekasi-ink/40 focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/25 focus:border-bekasi-emerald-500 focus:bg-white transition-all"
              />
              <kbd className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-1 rounded border border-bekasi-emerald-900/12 bg-white px-1.5 py-0.5 text-[10.5px] text-bekasi-ink/50">
                ⌘ K
              </kbd>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button className="h-10 w-10 rounded-md inline-flex items-center justify-center text-bekasi-ink/60 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.04] relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-bekasi-gold-500" />
              </button>
              <Button className="h-10 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2">
                <Plus className="h-4 w-4" /> New
              </Button>
            </div>
          </div>
        </header>

        {/* Page header */}
        {(title || kicker || actions) && (
          <div className="border-b border-bekasi-emerald-900/8 bg-white">
            <div className="px-4 md:px-6 lg:px-8 py-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                {kicker && (
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">{kicker}</div>
                )}
                {title && (
                  <h1 className="mt-1 font-sans font-semibold text-2xl md:text-3xl leading-tight tracking-tight text-bekasi-emerald-900">
                    {title}
                  </h1>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 md:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
