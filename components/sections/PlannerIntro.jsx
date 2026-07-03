'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, ArrowUpRight, MapPin, MessageSquare, Send,
  LockOpen, Map, Wand2, Route, Clock, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ChapterMarker from '@/components/ds/ChapterMarker'
import Tag from '@/components/ds/Tag'
import { PLANNER } from '@/lib/content/homepage'

const PILLAR_ICON = {
  'lock-open':      LockOpen,
  'sparkles':       Wand2,
  'message-square': MessageSquare,
  'map':            Map,
}

export default function PlannerIntro() {
  const [days, setDays]           = useState('2')
  const [interests, setInterests] = useState(['heritage', 'food'])
  const [style, setStyle]         = useState('balanced')
  const [activeDay, setActiveDay] = useState('Day 1')

  const toggleInterest = (id) => {
    setInterests((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])
  }

  const activeStops = PLANNER.mock.stops[activeDay] ?? []

  return (
    <section id="planner" className="relative overflow-hidden text-white gradient-emerald">
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
      <div aria-hidden className="absolute -top-40 right-1/3 h-[400px] w-[600px] rounded-full blur-[140px] bg-bekasi-gold-500/[0.10]" />
      <div aria-hidden className="absolute -bottom-20 left-1/4 h-[300px] w-[500px] rounded-full blur-[140px] bg-bekasi-emerald-500/[0.10]" />

      <div className="relative container py-24 md:py-32 lg:py-40">
        <ChapterMarker text={PLANNER.chapter} variant="dark" />

        {/* Editorial header */}
        <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="eyebrow eyebrow-dot text-bekasi-gold-400">{PLANNER.eyebrow}</span>
            <h2 className="mt-6 heading-display text-display-xl leading-[1.02] text-white text-balance whitespace-pre-line">
              {PLANNER.title}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="body-lg text-white/75 max-w-lg">{PLANNER.kicker}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-bekasi-gold-400 mono">
              <Sparkles className="h-3.5 w-3.5" /> {PLANNER.poweredBy}
            </div>
          </motion.div>
        </div>

        {/* Main showcase split */}
        <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-6 lg:gap-8">

          {/* LEFT — Quick input teaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 flex items-center justify-center">
                    <Wand2 className="h-4 w-4" />
                  </div>
                  <span className="font-display text-white text-lg">Plan in seconds</span>
                </div>
                <span className="chip-gold">Interactive</span>
              </div>

              {/* Step 1: Days */}
              <StepBlock number="01" label="How many days?">
                <div className="flex flex-wrap gap-2">
                  {PLANNER.quickInputs.days.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDays(d.id)}
                      className={cn(
                        'h-10 px-4 rounded-full text-sm font-medium transition-all',
                        days === d.id
                          ? 'bg-bekasi-gold-500 text-bekasi-emerald-900 shadow-gold-sm'
                          : 'bg-white/5 text-white/70 border border-white/15 hover:bg-white/10 hover:text-white',
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </StepBlock>

              {/* Step 2: Interests */}
              <StepBlock number="02" label="What interests you?">
                <div className="flex flex-wrap gap-2">
                  {PLANNER.quickInputs.interests.map((i) => {
                    const on = interests.includes(i.id)
                    return (
                      <button
                        key={i.id}
                        onClick={() => toggleInterest(i.id)}
                        className={cn(
                          'h-8 px-3.5 rounded-full text-xs font-medium transition-all inline-flex items-center gap-1.5',
                          on
                            ? 'bg-bekasi-emerald-700 text-white border border-bekasi-gold-500/40'
                            : 'bg-white/5 text-white/60 border border-white/15 hover:bg-white/10',
                        )}
                      >
                        <span className={cn('h-1.5 w-1.5 rounded-full transition-colors', on ? 'bg-bekasi-gold-400' : 'bg-white/40')} />
                        {i.label}
                      </button>
                    )
                  })}
                </div>
              </StepBlock>

              {/* Step 3: Style */}
              <StepBlock number="03" label="Your travel style">
                <div className="grid grid-cols-3 gap-2">
                  {PLANNER.quickInputs.styles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={cn(
                        'h-10 rounded-lg text-sm font-medium transition-all',
                        style === s.id
                          ? 'bg-bekasi-emerald-700 text-white border border-bekasi-gold-500/40'
                          : 'bg-white/5 text-white/60 border border-white/15 hover:bg-white/10 hover:text-white',
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </StepBlock>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link href={`${PLANNER.cta.href}?days=${days}&interests=${interests.join(',')}&style=${style}`}>
                  <button className="btn-primary btn-lg w-full group">
                    <Sparkles className="h-4 w-4" /> Generate my itinerary
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Link>
                <p className="mt-3 text-center text-xs text-white/45">
                  No account needed · 30 seconds · Refine anytime
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Mock itinerary preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-black/40 overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="chip-dark"><Sparkles className="h-3 w-3" /> Sample itinerary</span>
                    <span className="chip-gold">{PLANNER.mock.tag}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-white">Your Bekasi Itinerary</h3>
                </div>
                <div className="mono text-bekasi-gold-400 hidden md:block">AI Draft</div>
              </div>

              {/* Day tabs */}
              <div className="inline-flex p-1 rounded-full bg-white/[0.06] border border-white/10 mb-6">
                {PLANNER.mock.dayLabels.map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveDay(d)}
                    className={cn(
                      'relative h-9 px-5 rounded-full text-sm font-medium transition-colors',
                      activeDay === d ? 'text-bekasi-emerald-900' : 'text-white/70 hover:text-white',
                    )}
                  >
                    {activeDay === d && (
                      <motion.span layoutId="planner-day-bg" className="absolute inset-0 bg-bekasi-gold-500 rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                    <span className="relative z-10">{d}</span>
                  </button>
                ))}
              </div>

              {/* Timeline stops */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  {activeStops.map((s, i) => (
                    <div key={s.time} className="relative flex items-start gap-4 p-3 rounded-xl bg-black/25 border border-white/5">
                      {i < activeStops.length - 1 && (
                        <span aria-hidden className="absolute left-[3rem] top-14 bottom-[-16px] w-px bg-white/10" />
                      )}
                      <span className="font-mono text-xs text-bekasi-gold-400 w-14 pt-2.5 flex-shrink-0">{s.time}</span>
                      <div className="h-10 w-10 rounded-lg bg-bekasi-emerald-700 text-bekasi-gold-400 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-medium leading-tight">{s.place}</div>
                        <div className="mt-1.5 flex items-center gap-3">
                          <Tag category={s.tag.toLowerCase()} variant="dot" className="text-white/75" />
                          <span className="inline-flex items-center gap-1 text-[11px] text-white/50">
                            <Clock className="h-3 w-3" /> {s.duration}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/30 flex-shrink-0 mt-3" />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Chat refine mock */}
              <div className="mt-6 rounded-2xl border border-bekasi-gold-500/30 bg-bekasi-gold-500/[0.06] p-3 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-bekasi-gold-500/20 border border-bekasi-gold-500/40 text-bekasi-gold-400 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1 relative">
                    <input
                      readOnly
                      value={PLANNER.refineHint}
                      className="w-full bg-transparent text-sm text-white/70 outline-none placeholder:text-white/40"
                    />
                  </div>
                  <button className="h-9 w-9 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 flex items-center justify-center flex-shrink-0 hover:bg-bekasi-gold-400 transition-colors">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/40 pl-12">
                  Refine with a message
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
          className="mt-16 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {PLANNER.pillars.map((p) => {
            const Icon = PILLAR_ICON[p.icon] ?? Sparkles
            return (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 md:p-6 hover:bg-white/[0.05] transition-colors"
              >
                <div className="h-11 w-11 rounded-full bg-bekasi-gold-500/15 border border-bekasi-gold-500/30 text-bekasi-gold-400 flex items-center justify-center mb-4">
                  <Icon className="h-4 w-4" />
                </div>
                <h4 className="font-display text-lg text-white mb-1.5">{p.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer strip */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Route className="h-4 w-4 text-bekasi-gold-400" />
            <span className="text-sm text-white/70">Ready when you are — free forever, no signup required.</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={PLANNER.secondaryCta.href} className="btn-ghost-invert btn-md">
              {PLANNER.secondaryCta.label}
            </Link>
            <Link href={PLANNER.cta.href}>
              <button className="btn-primary btn-md">
                <Sparkles className="h-4 w-4" /> {PLANNER.cta.label}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepBlock({ number, label, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="mono text-bekasi-gold-400">{number}</span>
        <span className="text-eyebrow uppercase text-white/60">{label}</span>
      </div>
      {children}
    </div>
  )
}
