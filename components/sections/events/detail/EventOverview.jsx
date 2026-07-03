'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CalendarDays, Clock, MapPin, Ticket, Users, User, CheckCircle2, ExternalLink,
  Sparkles, Navigation,
} from 'lucide-react'
import { EVENT_CATEGORIES, formatEventDate } from '@/lib/content/events'
import { Button } from '@/components/ui/button'

export default function EventOverview({ evt }) {
  const cat = EVENT_CATEGORIES.find((c) => c.id === evt.category) ?? { color: '#155F58' }

  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-16 md:py-24">
        <div className="grid gap-10 md:gap-14 lg:grid-cols-12">
          {/* Left — description + program + tips */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-bekasi-gold-500" />
              About the event
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-tight tracking-tight text-bekasi-emerald-900 text-balance">
              A closer look at {evt.title}.
            </h2>

            <div className="mt-6 space-y-5 text-[15px] md:text-base leading-relaxed text-bekasi-ink/75 max-w-2xl">
              {evt.description.map((p, i) => (
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
              <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 mb-4">What to expect</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {evt.highlights.map((h, i) => (
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

            {/* Program timeline */}
            {evt.schedule?.length > 0 && (
              <div className="mt-10">
                <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 mb-4">Program</div>
                <ol className="relative border-l border-bekasi-emerald-900/15 pl-6 space-y-6">
                  {evt.schedule.map((s, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      className="relative"
                    >
                      <span
                        className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full ring-4 ring-bekasi-cream"
                        style={{ background: cat.color }}
                      />
                      <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600">{s.time}</div>
                      <div className="mt-1 text-[15px] text-bekasi-ink/85">{s.item}</div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            )}

            {/* Tips */}
            <div className="mt-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 mb-4">Insider tips</div>
              <ol className="space-y-4">
                {evt.tips.map((t, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="relative pl-10"
                  >
                    <span className="absolute left-0 top-0.5 h-7 w-7 rounded-full bg-bekasi-emerald-900 text-white font-display text-sm inline-flex items-center justify-center">{i + 1}</span>
                    <span className="text-[15px] text-bekasi-ink/80 leading-relaxed">{t}</span>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Tags */}
            {evt.tags?.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {evt.tags.map((t) => (
                  <span key={t} className="rounded-full border border-bekasi-emerald-900/12 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-bekasi-ink/65">
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
                <div
                  className="px-5 md:px-6 py-5 border-b border-bekasi-emerald-900/8"
                  style={{ backgroundImage: `linear-gradient(90deg, ${cat.color}15, transparent)` }}
                >
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">Practical info</div>
                  <div className="mt-1 font-display text-xl text-bekasi-emerald-900">Plan your visit</div>
                </div>

                <div className="px-5 md:px-6 py-5 space-y-5">
                  <InfoRow icon={CalendarDays} label="Date"  value={formatEventDate(evt)} />
                  <InfoRow icon={Clock}        label="Time"  value={evt.time} />
                  <InfoRow icon={MapPin}       label="Venue" value={evt.venue.name} sub={`${evt.venue.address}, ${evt.venue.district}`} />
                  <InfoRow icon={Ticket}       label="Ticket" value={evt.price} />
                  {evt.capacity && <InfoRow icon={Users} label="Capacity" value={evt.capacity} />}
                  {evt.organizer && <InfoRow icon={User}   label="Organized by" value={evt.organizer} />}
                  {evt.website && (
                    <InfoRow icon={ExternalLink} label="Website">
                      <a href={evt.website} target="_blank" rel="noreferrer" className="text-sm font-medium text-bekasi-emerald-900 hover:text-bekasi-gold-600">
                        Open link ↗
                      </a>
                    </InfoRow>
                  )}
                </div>

                <div className="px-5 md:px-6 pb-5 pt-1 space-y-2.5">
                  <Link href={`/planner?seed=event:${evt.slug}`} className="block">
                    <Button className="w-full h-11 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 font-medium gap-2">
                      <Sparkles className="h-4 w-4" />
                      Plan a day around this
                    </Button>
                  </Link>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${evt.venue.coords.lat},${evt.venue.coords.lng}`}
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

              <div className="rounded-2xl border border-bekasi-emerald-900/10 bg-bekasi-emerald-900 text-white p-5 md:p-6">
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-400">
                  <Sparkles className="h-3.5 w-3.5" /> Editor’s note
                </div>
                <div className="mt-1.5 font-display text-lg">Bring cash + comfy shoes.</div>
                <div className="mt-1 text-sm text-white/60">
                  Small tenants often prefer cash. Wear comfortable shoes—the venue is spread out.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon: Icon, label, value, sub, children }) {
  return (
    <div className="flex gap-3">
      <div className="h-9 w-9 rounded-full bg-bekasi-emerald-900/[0.04] flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-bekasi-emerald-900" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50">{label}</div>
        {value && <div className="mt-1 text-sm text-bekasi-ink/85 leading-relaxed">{value}</div>}
        {sub && <div className="mt-1 text-xs text-bekasi-ink/55 leading-relaxed">{sub}</div>}
        {children && <div className="mt-1">{children}</div>}
      </div>
    </div>
  )
}
