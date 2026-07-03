'use client'

import Link from 'next/link'
import {
  Landmark, Utensils, Building2, Trees, Baby, Moon,
  ShoppingBag, Ticket, Search, Train,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { QUICK_EXPLORE } from '@/lib/content/homepage'

const ICONS = {
  landmark: Landmark, utensils: Utensils, building: Building2, trees: Trees,
  baby: Baby, moon: Moon, 'shopping-bag': ShoppingBag, ticket: Ticket, train: Train,
}

export default function QuickExplore() {
  return (
    <section id="quick-explore" className="relative -mt-16 md:-mt-24 z-10">
      <div className="container">
        <div className="relative rounded-3xl bg-white shadow-2xl shadow-bekasi-emerald-900/10 border border-black/[0.04] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div>
              <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">{QUICK_EXPLORE.eyebrow}</span>
              <h3 className="mt-2 heading-display text-2xl md:text-3xl text-bekasi-emerald-900">
                {QUICK_EXPLORE.title}
              </h3>
            </div>
            <div className="md:ml-auto md:max-w-md w-full relative">
              <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-bekasi-ink/40" />
              <Input
                placeholder="Search destinations, events, stories…"
                className="h-12 pl-11 rounded-full bg-bekasi-cream border-transparent focus-visible:ring-bekasi-emerald-700"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
            {QUICK_EXPLORE.items.map((item) => {
              const Icon = ICONS[item.icon] ?? Landmark
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-bekasi-cream transition-colors"
                >
                  <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-bekasi-emerald-900/[0.04] group-hover:bg-bekasi-emerald-800 group-hover:text-bekasi-gold-400 flex items-center justify-center text-bekasi-emerald-800 transition-all">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-bekasi-ink/80 group-hover:text-bekasi-emerald-900 text-center">
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
