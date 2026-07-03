'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { FLOATING_CITY } from '@/lib/content/homepage'

/**
 * Floating City Signature — the visual identity anchor of BekasiGo.
 * - Chapter marker top strip
 * - Left: eyebrow · dramatic title · narrative · CTA
 * - Right: floating city artwork with mouse parallax + orbit chips + rings
 * - Bottom: 4-column stat strip anchoring the story
 * - Scroll-triggered reveals (framer-motion, once)
 * - Performance: parallax via CSS variables (no re-render), lazy image,
 *   respects prefers-reduced-motion.
 */
export default function FloatingCityShowcase() {
  const stageRef = useRef(null)
  const reduce = useReducedMotion()

  const onMouseMove = (e) => {
    if (reduce) return
    const el = stageRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--px', x.toFixed(3))
    el.style.setProperty('--py', y.toFixed(3))
  }
  const onMouseLeave = () => {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--px', '0')
    el.style.setProperty('--py', '0')
  }

  const reveal = {
    hidden: { opacity: 0, y: 28 },
    show:   (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i },
    }),
  }

  return (
    <section
      id="floating-city"
      className="relative overflow-hidden text-white gradient-emerald"
      aria-label={FLOATING_CITY.chapter}
    >
      {/* Top transition from previous cream section */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bekasi-cream to-transparent opacity-[0.06]" />

      {/* Ambient background image (subtle) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `url(${FLOATING_CITY.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-bekasi-emerald-900/60 via-bekasi-emerald-900/85 to-bekasi-emerald-900" />

      {/* Central glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[80vw] w-[80vw] max-h-[900px] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bekasi-gold-500/[0.08] blur-[140px]"
      />
      {/* Faint grid */}
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fc-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fc-grid)" />
      </svg>

      <div className="relative container py-24 md:py-36 lg:py-44">
        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 text-eyebrow uppercase text-white/50 mb-16 md:mb-24"
        >
          <span className="h-px w-12 bg-bekasi-gold-500/50" />
          <span>{FLOATING_CITY.chapter}</span>
          <span className="h-px w-12 bg-bekasi-gold-500/50" />
        </motion.div>

        {/* Main split */}
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* LEFT — narrative */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.span variants={reveal} className="eyebrow eyebrow-dot text-bekasi-gold-400">
                {FLOATING_CITY.eyebrow}
              </motion.span>
              <motion.h2
                variants={reveal}
                className="mt-6 heading-display text-display-lg leading-[1.02] text-white text-balance whitespace-pre-line"
              >
                {FLOATING_CITY.title}
              </motion.h2>
              <motion.p variants={reveal} className="mt-6 body-lg text-white/75 max-w-lg">
                {FLOATING_CITY.kicker}
              </motion.p>
              <motion.div variants={reveal} className="mt-10 flex items-center gap-4">
                <Link href={FLOATING_CITY.cta.href}>
                  <button className="btn-primary btn-lg group">
                    <Sparkles className="h-4 w-4" /> {FLOATING_CITY.cta.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Link>
                <span className="text-xs text-white/40 uppercase tracking-[0.25em] hidden md:inline">
                  — A city rewriting itself
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — artwork stage with mouse parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 order-1 lg:order-2 relative"
            ref={stageRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ '--px': 0, '--py': 0 }}
          >
            <div className="relative aspect-square max-w-[640px] mx-auto">
              {/* Rotating outer ring */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full border border-white/10"
                style={{ animation: reduce ? 'none' : 'spin 60s linear infinite' }}
              />
              {/* Static concentric rings */}
              <div aria-hidden className="absolute inset-6 rounded-full border border-white/[0.06]" />
              <div aria-hidden className="absolute inset-14 rounded-full border border-bekasi-gold-500/20" />
              {/* Dashed gold ring */}
              <div
                aria-hidden
                className="absolute inset-24 rounded-full border-2 border-dashed border-bekasi-gold-500/25"
                style={{ animation: reduce ? 'none' : 'spin 90s linear infinite reverse' }}
              />
              {/* Gold glow behind */}
              <div aria-hidden className="absolute inset-8 rounded-full bg-bekasi-gold-500/12 blur-3xl" />

              {/* Floating city artwork with parallax */}
              <img
                src={FLOATING_CITY.image}
                alt="Kota Bekasi Floating Smart City"
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out"
                loading="lazy"
                style={{
                  transform: 'translate3d(calc(var(--px) * 22px), calc(var(--py) * 22px), 0)',
                }}
              />

              {/* Orbit chips — parallax at different depths */}
              {FLOATING_CITY.orbits.map((c, i) => (
                <span
                  key={c.label}
                  className="absolute z-20 text-[10px] uppercase tracking-[0.25em] text-bekasi-gold-400 bg-bekasi-emerald-900/70 backdrop-blur border border-bekasi-gold-500/30 px-3 py-1.5 rounded-full transition-transform duration-500 ease-out"
                  style={{
                    ...c.pos,
                    transform: `translate3d(calc(var(--px) * ${-14 + i * 4}px), calc(var(--py) * ${-10 + i * 3}px), 0)`,
                  }}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom stats strip */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="mt-24 md:mt-32 lg:mt-40 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {FLOATING_CITY.stats.map((s) => (
            <motion.div key={s.v} variants={reveal}>
              <div className="font-display text-4xl md:text-5xl leading-none text-bekasi-gold-400">{s.k}</div>
              <div className="mt-3 text-sm font-medium text-white">{s.v}</div>
              <div className="mt-1 text-xs text-white/50 leading-relaxed">{s.note}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom transition */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bekasi-cream/10 to-transparent pointer-events-none" />
    </section>
  )
}
