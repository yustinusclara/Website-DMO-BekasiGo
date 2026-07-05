'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin, Clock, Ticket, Sun, Phone, Globe, CalendarCheck, CheckCircle2,
  Navigation, Sparkles, ArrowUpRight,
} from 'lucide-react'
import { categories as CAT } from '@/lib/design/tokens'
import { Button } from '@/components/ui/button'

export default function DestinationOverview({ dest }) {
  const cat = CAT[dest.category] ?? { label: dest.category, color: '#155F58' }

  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-16 md:py-24">
        <div className="grid gap-10 md:gap-14 lg:grid-cols-12">
          {/* Left — overview narrative */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 mb-4 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-bekasi-gold-500" />
              Overview
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight text-bekasi-emerald-900 text-balance">
              A closer look at {dest.title}.
            </h2>

            <div className="mt-6 space-y-5 text-[15px] md:text-base leading-relaxed text-bekasi-ink/75 max-w-2xl">
              {dest.overview.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.05 + i * 0.08 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 mb-4">Highlights</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {dest.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="flex items-start gap-3 rounded-xl border border-bekasi-emerald-900/8 bg-white p-4"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-bekasi-emerald-500 shrink-0" />
                    <span className="text-sm text-bekasi-ink/80">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 mb-4">Insider tips</div>
              <ol className="space-y-4">
                {dest.tips.map((t, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="relative pl-10"
                  >
                    <span className="absolute left-0 top-0.5 h-7 w-7 rounded-full bg-bekasi-emerald-900 text-white font-display text-sm inline-flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-[15px] text-bekasi-ink/80 leading-relaxed">{t}</span>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Tags */}
            {dest.tags?.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {dest.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-bekasi-emerald-900/12 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-bekasi-ink/65"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right — Practical Info Panel (sticky) */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="rounded-2xl border border-bekasi-emerald-900/10 bg-white shadow-elevated overflow-hidden">
                {/* Panel header */}
                <div
                  className="px-5 md:px-6 py-5 border-b border-bekasi-emerald-900/8"
                  style={{ backgroundImage: `linear-gradient(90deg, ${cat.color}15, transparent)` }}
                >
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">Practical info</div>
                  <div className="mt-1 font-display text-xl text-bekasi-emerald-900">Plan your visit</div>
                </div>

                <div className="px-5 md:px-6 py-5 space-y-5">
                  <InfoRow icon={MapPin}       label="Address"       value={dest.address} />
                  <InfoRow icon={Clock}        label="Opening hours">
                    <ul className="space-y-1 text-sm text-bekasi-ink/80">
                      {dest.hours.map((h, i) => (
                        <li key={i} className="flex justify-between gap-3">
                          <span className="text-bekasi-ink/60">{h.day}</span>
                          <span className="font-medium">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </InfoRow>
                  <InfoRow icon={Ticket}       label="Entry"         value={dest.fee} />
                  <InfoRow icon={Clock}        label="Typical time"  value={dest.duration} />
                  <InfoRow icon={Sun}          label="Best time"     value={dest.bestTime} />
                  {dest.contact?.phone && (
                    <InfoRow icon={Phone}      label="Phone"         value={dest.contact.phone} />
                  )}
                  {dest.contact?.website && (
                    <InfoRow icon={Globe}      label="Website">
                      <a
                        href={dest.contact.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-bekasi-emerald-900 hover:text-bekasi-gold-600 inline-flex items-center gap-1"
                      >
                        Open link <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </InfoRow>
                  )}
                </div>

                {/* Actions */}
                <div className="px-5 md:px-6 pb-5 pt-1 space-y-2.5">
                  <Link href="/planner" className="block">
                    <Button className="w-full h-11 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 font-medium gap-2">
                      <Sparkles className="h-4 w-4" />
                      Add to Smart Planner
                    </Button>
                  </Link>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${dest.coords.lat},${dest.coords.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full h-11 rounded-full border-bekasi-emerald-900/20 text-bekasi-emerald-900 hover:bg-bekasi-emerald-900 hover:text-white gap-2">
                      <Navigation className="h-4 w-4" />
                      Get directions
                    </Button>
                  </a>
                </div>
              </div>

              {/* Availability micro-card */}
              <div className="rounded-2xl border border-bekasi-emerald-900/10 bg-bekasi-emerald-900 text-white p-5 md:p-6">
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-400">
                  <CalendarCheck className="h-3.5 w-3.5" /> Open today
                </div>
                <div className="mt-1.5 font-display text-lg">Free to walk in.</div>
                <div className="mt-1 text-sm text-white/60">
                  No booking required for most visitors. Groups over 10 pax—call ahead.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon: Icon, label, value, children }) {
  return (
    <div className="flex gap-3">
      <div className="h-9 w-9 rounded-full bg-bekasi-emerald-900/[0.04] flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-bekasi-emerald-900" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50">{label}</div>
        {value && <div className="mt-1 text-sm text-bekasi-ink/85 leading-relaxed">{value}</div>}
        {children && <div className="mt-1">{children}</div>}
      </div>
    </div>
  )
}
