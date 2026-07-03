'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Globe, MapPin, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { NAV } from '@/lib/content/homepage'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bekasi-emerald-900/85 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent',
      )}
    >
      {/* Top utility bar */}
      <div
        className={cn(
          'hidden md:flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/70 border-b border-white/10',
          scrolled ? 'py-1.5' : 'py-2',
        )}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Kota Bekasi · Indonesia</span>
            <span className="opacity-40">|</span>
            <span>28°C · Sunny</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe className="h-3 w-3" /> EN / ID
            </button>
            <span className="opacity-40">|</span>
            <Link href="/press" className="hover:text-white transition-colors">Press</Link>
            <Link href="/partners" className="hover:text-white transition-colors">Partners</Link>
            <Link href="/admin" className="hover:text-white transition-colors">CMS</Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 rounded-full bg-bekasi-gold-500 flex items-center justify-center shadow-lg shadow-bekasi-gold-500/20 transition-transform group-hover:scale-105">
            <span className="font-display text-bekasi-emerald-900 text-lg leading-none">B</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-white text-xl tracking-tight">BekasiGo</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/60">Destination Guide</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-white/80 hover:text-white transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-bekasi-gold-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link href={NAV.cta.href} className="hidden md:block">
            <Button className="h-10 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 font-medium px-5 shadow-lg shadow-bekasi-gold-500/20">
              <Sparkles className="h-4 w-4 mr-2" /> {NAV.cta.label}
            </Button>
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 bg-bekasi-emerald-900/95 backdrop-blur-xl border-t border-white/10',
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="container py-6 flex flex-col gap-1">
          {NAV.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 border-b border-white/10 text-white/90 hover:text-bekasi-gold-400 flex items-center justify-between"
            >
              <span className="font-display text-2xl">{item.label}</span>
              <span className="text-white/40">→</span>
            </Link>
          ))}
          <Link href={NAV.cta.href} onClick={() => setOpen(false)}>
            <Button className="mt-6 w-full h-12 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900">
              <Sparkles className="h-4 w-4 mr-2" /> {NAV.cta.label}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
