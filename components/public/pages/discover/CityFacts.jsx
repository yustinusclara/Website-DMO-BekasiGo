'use client'

import { motion } from 'framer-motion'
import { DISCOVER } from '@/lib/content/discover'
import Eyebrow from '@/components/shared/Eyebrow'

export default function CityFacts() {
  const { facts } = DISCOVER
  return (
    <section className="relative bg-bekasi-sand text-bekasi-ink">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl">
          <Eyebrow>{facts.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight tracking-tight text-balance">
            {facts.heading}
          </h2>
          <p className="mt-4 max-w-xl text-bekasi-ink/70 leading-relaxed">{facts.kicker}</p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-px bg-bekasi-emerald-900/10 rounded-2xl overflow-hidden border border-bekasi-emerald-900/10">
          {facts.items.map((f, i) => (
            <motion.div
              key={f.v}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="bg-bekasi-sand p-6 md:p-8 flex flex-col justify-between min-h-[180px] group hover:bg-white transition-colors"
            >
              <div className="font-display text-4xl md:text-5xl lg:text-6xl leading-none text-bekasi-emerald-900">
                {f.k}
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 mt-4">
                  {f.v}
                </div>
                <div className="mt-2 text-[13px] text-bekasi-ink/65 leading-relaxed">{f.kicker}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
