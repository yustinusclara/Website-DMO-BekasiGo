import Link from 'next/link'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import { Home, Compass, Search } from 'lucide-react'

export const metadata = { title: 'Page not found — BekasiGo' }

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main className="container pt-32 md:pt-40 pb-24 flex flex-col items-center text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-bekasi-gold-600">Error · 404</div>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl leading-tight text-bekasi-emerald-900 max-w-3xl">
          You just stepped off the map.
        </h1>
        <p className="mt-6 max-w-lg text-bekasi-ink/70 leading-relaxed">
          The page you were looking for isn’t part of BekasiGo yet. Try one of the routes below — we’ll drop you back on solid ground.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-5 py-2.5 text-sm font-medium">
            <Home className="h-4 w-4" /> Back to homepage
          </Link>
          <Link href="/map" className="inline-flex items-center gap-2 rounded-full border border-bekasi-emerald-900/20 hover:border-bekasi-gold-500 text-bekasi-emerald-900 px-5 py-2.5 text-sm font-medium">
            <Compass className="h-4 w-4" /> Open Explore Map
          </Link>
          <Link href="/planner" className="inline-flex items-center gap-2 rounded-full border border-bekasi-emerald-900/20 hover:border-bekasi-gold-500 text-bekasi-emerald-900 px-5 py-2.5 text-sm font-medium">
            <Search className="h-4 w-4" /> Smart Trip Planner
          </Link>
        </div>
        <div className="mt-16 grid gap-3 md:grid-cols-3 max-w-3xl w-full text-left">
          {[
            { href: '/destinations', label: 'Destinations', hint: '15 hand-picked places' },
            { href: '/food',         label: 'Food & Drink',  hint: '30 restaurants curated' },
            { href: '/stay',         label: 'Stay',          hint: '30 rooms & hotels' },
            { href: '/events',       label: 'Events',        hint: 'Whats on this month' },
            { href: '/stories',      label: 'City Stories',  hint: 'Long-form journalism' },
            { href: '/blog',         label: 'Journal & News',hint: 'Weekly guides & updates' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="rounded-2xl border border-bekasi-emerald-900/10 bg-white p-4 hover:border-bekasi-gold-500 hover:shadow-soft transition-all">
              <div className="font-serif text-lg text-bekasi-emerald-900">{l.label}</div>
              <div className="text-xs text-bekasi-ink/55 mt-1">{l.hint}</div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
