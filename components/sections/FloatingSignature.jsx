'use client'

import { SIGNATURE } from '@/lib/content/homepage'

export default function FloatingSignature() {
  const words = [...SIGNATURE.words, ...SIGNATURE.words] // duplicate for seamless marquee
  return (
    <section aria-label="City signature" className="relative py-16 md:py-24 bg-bekasi-cream overflow-hidden">
      <div className="container text-center mb-8">
        <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">{SIGNATURE.tag}</span>
      </div>

      {/* Marquee */}
      <div className="relative mask-fade-r">
        <div className="flex w-max animate-marquee gap-14 pr-14">
          {words.map((w, i) => (
            <span
              key={i}
              className="heading-display text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight text-bekasi-emerald-900/10 hover:text-bekasi-emerald-900/70 transition-colors duration-500 select-none"
            >
              {w} <span className="text-bekasi-gold-500">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Floating chips */}
      <div className="container mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { k: '2.5M+', v: 'Residents' },
          { k: '28°C',  v: 'Avg. Climate' },
          { k: '4 Yrs',  v: 'Smart-City Program' },
          { k: '12',    v: 'Cultural Districts' },
        ].map((s, i) => (
          <div
            key={s.v}
            className="group rounded-2xl border border-bekasi-emerald-900/10 bg-white/60 backdrop-blur px-5 py-4 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg hover:shadow-bekasi-emerald-900/5 transition-all"
            style={{ animation: `float-y 6s ease-in-out ${i * 0.4}s infinite` }}
          >
            <div className="font-display text-3xl text-bekasi-emerald-800">{s.k}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-bekasi-ink/60">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
