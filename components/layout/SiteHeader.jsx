'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Menu, X, Search, Globe, MapPin, Sparkles, ChevronDown, ChevronRight,
  ArrowUpRight, Sun,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { NAV } from '@/lib/content/homepage'
import { categories as CAT } from '@/lib/design/tokens'

/**
 * SiteHeader
 * ─────────────────────────────────────────────────────────
 * Premium DMO-grade sticky header with:
 *  • Transparent-over-hero → solid-emerald on scroll
 *  • Thin utility bar (location · weather · language · press · CMS)
 *  • Primary nav with mega-menu on "Discover Bekasi"
 *  • Prominent Smart Trip Planner CTA (gold pill)
 *  • Mobile drawer with grouped accordion sections
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)              // mobile drawer
  const [megaOpen, setMegaOpen] = useState(null)       // string id | null
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while mobile drawer open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const openMega = (id) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(id)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(null), 120)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || megaOpen
          ? 'bg-bekasi-emerald-900 border-b border-white/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]'
          : 'bg-bekasi-emerald-900/55 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_18px_-8px_rgba(0,0,0,0.35)]',
      )}
    >
      {/* ─── Utility bar ─────────────────────────────────────────── */}
      <div
        className={cn(
          'hidden md:block text-[11px] uppercase tracking-[0.22em] text-white/80 border-b border-white/10',
        )}
      >
        <div className="container flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> Kota Bekasi · Indonesia
            </span>
            <span className="opacity-30">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Sun className="h-3 w-3 text-bekasi-gold-400" /> 28°C · Sunny
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe className="h-3 w-3" /> EN&nbsp;/&nbsp;ID
            </button>
            <span className="opacity-30">|</span>
            {NAV.utility.map((u, i) => (
              <span key={u.href} className="inline-flex items-center gap-4">
                <Link href={u.href} className="hover:text-white transition-colors">{u.label}</Link>
                {i < NAV.utility.length - 1 && <span className="opacity-30">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main bar ────────────────────────────────────────────── */}
      <div
        className="container flex items-center justify-between h-16 md:h-20"
        onMouseLeave={scheduleClose}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative h-9 w-9 rounded-full bg-bekasi-gold-500 flex items-center justify-center shadow-lg shadow-bekasi-gold-500/25 transition-transform group-hover:scale-105">
            <span className="font-display text-bekasi-emerald-900 text-lg leading-none">B</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-white text-xl tracking-tight">BekasiGo</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 mt-0.5">
              Official City Guide
            </span>
          </div>
        </Link>

        {/* Primary nav — desktop */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV.primary.map((item) => {
            const hasMega = !!item.mega
            const isOpen = megaOpen === item.label
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasMega && openMega(item.label)}
                onFocus={() => hasMega && openMega(item.label)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group inline-flex items-center gap-1 px-3 py-2 rounded-full text-[13px] font-medium transition-colors',
                    'text-white/80 hover:text-white',
                    isOpen && 'text-white bg-white/[0.06]',
                  )}
                >
                  <span>{item.label}</span>
                  {hasMega && (
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 opacity-70 transition-transform duration-200',
                        isOpen && 'rotate-180',
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      'absolute left-3 right-3 -bottom-0.5 h-px bg-bekasi-gold-400 origin-left scale-x-0 transition-transform duration-300',
                      'group-hover:scale-x-100',
                    )}
                  />
                </Link>
              </div>
            )
          })}
        </nav>

        {/* Compact nav for lg (below xl) — hide Food/Stay/Getting/Blog behind mobile menu */}
        <nav className="hidden lg:flex xl:hidden items-center gap-5">
          {NAV.primary
            .filter((i) => ['Discover Bekasi', 'Destinations', 'Events', 'City Stories', 'Explore Map'].includes(i.label))
            .map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-[13px] font-medium text-white/80 hover:text-white transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-bekasi-gold-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          <button
            aria-label="Search"
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link href={NAV.cta.href} className="hidden sm:block">
            <Button className="h-10 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 font-medium px-4 md:px-5 shadow-lg shadow-bekasi-gold-500/20 gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden md:inline">{NAV.cta.label}</span>
              <span className="md:hidden">Plan</span>
            </Button>
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden h-10 w-10 inline-flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* ─── Mega menu ─────────────────────────────────────────── */}
        <AnimatePresence>
          {megaOpen && (
            <MegaPanel
              item={NAV.primary.find((i) => i.label === megaOpen)}
              onClose={() => setMegaOpen(null)}
              onMouseEnter={() => openMega(megaOpen)}
              onMouseLeave={scheduleClose}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ─── Mobile drawer ───────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden fixed inset-0 top-16 md:top-[calc(4.5rem+2.25rem)] bg-bekasi-emerald-900/98 backdrop-blur-xl overflow-y-auto"
          >
            <div className="container py-8 flex flex-col gap-8 pb-24">
              {NAV.mobileGroups.map((group) => (
                <div key={group.title}>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-400 mb-3">
                    {group.title}
                  </div>
                  <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
                    {group.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="py-4 flex items-center justify-between text-white/90 hover:text-bekasi-gold-400 transition-colors"
                      >
                        <span className="font-display text-2xl md:text-3xl">{l.label}</span>
                        <ChevronRight className="h-5 w-5 text-white/40" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link href={NAV.cta.href} onClick={() => setOpen(false)}>
                <Button className="w-full h-14 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 font-medium text-base">
                  <Sparkles className="h-5 w-5 mr-2" /> {NAV.cta.label}
                </Button>
              </Link>

              <div className="pt-4 flex items-center justify-between text-xs text-white/50">
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> EN / ID
                </span>
                <div className="flex items-center gap-4">
                  {NAV.utility.map((u) => (
                    <Link key={u.href} href={u.href} onClick={() => setOpen(false)} className="hover:text-white">
                      {u.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ─────────────────────────────────────────────────────────────── */

function MegaPanel({ item, onClose, onMouseEnter, onMouseLeave }) {
  if (!item?.mega) return null
  const { featured, groups } = item.mega
  return (
    <motion.div
      key={`mega-${item.label}`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-0 right-0 top-full pt-3"
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bekasi-emerald-900/95 backdrop-blur-2xl shadow-2xl shadow-black/40">
          {/* subtle gold ambient */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-bekasi-gold-500/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 right-1/3 h-64 w-64 rounded-full bg-bekasi-emerald-500/20 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_1fr] p-6 md:p-8 lg:p-10">
            {/* Left — grouped links */}
            <div className="grid grid-cols-2 gap-8 md:gap-10">
              {groups.map((g) => (
                <div key={g.title}>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-400 mb-4">
                    {g.title}
                  </div>
                  <ul className="space-y-2.5">
                    {g.links.map((l) => {
                      const c = l.cat ? CAT[l.cat] : null
                      return (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={onClose}
                            className="group flex items-center gap-3 -ml-2 pl-2 pr-3 py-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                          >
                            {c && (
                              <span
                                aria-hidden
                                className="h-1.5 w-1.5 rounded-full shrink-0"
                                style={{ background: c.color }}
                              />
                            )}
                            <span className="text-white text-[15px] font-medium">{l.label}</span>
                            <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-bekasi-gold-400 group-hover:-translate-y-px group-hover:translate-x-px transition-all" />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right — featured card */}
            {featured && (
              <Link
                href={featured.href}
                onClick={onClose}
                className="group relative block overflow-hidden rounded-2xl border border-white/10 min-h-[240px]"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-400">
                    {featured.eyebrow}
                  </span>
                  <h4 className="mt-2 font-display text-2xl md:text-3xl text-white leading-tight">
                    {featured.title}
                  </h4>
                  <p className="mt-2 text-sm text-white/75 max-w-md">{featured.kicker}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-bekasi-gold-400">
                    {featured.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
