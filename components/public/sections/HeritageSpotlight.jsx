'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Quote, Sparkles } from 'lucide-react'
import ChapterMarker from '@/components/shared/ChapterMarker'
import HeritageSpotlightCard from '@/components/shared/HeritageSpotlightCard'
import { HERITAGE } from '@/lib/content/homepage'

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function HeritageSpotlight({ data }) {
  const content = data || HERITAGE;
  return (
    <section
      id="heritage"
      className="relative overflow-hidden bg-bekasi-emerald-900 text-white"
      aria-label={content.chapter}
    >
      {/* Ambient layers */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-bekasi-emerald-900 via-bekasi-emerald-800 to-bekasi-emerald-900" />
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full blur-[140px] bg-bekasi-gold-500/[0.08]"
      />

      <div className="relative container py-24 md:py-36 lg:py-44">
        <ChapterMarker text={content.chapter} />

        {/* Editorial header split */}
        <div className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-7"
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
          >
            <span className="eyebrow eyebrow-dot text-bekasi-gold-400">{content.eyebrow}</span>
            <h2 className="mt-6 heading-display text-display-xl leading-[1.02] text-white text-balance whitespace-pre-line">
              {content.title}
            </h2>
          </motion.div>
          <motion.div
            className="lg:col-span-5 lg:pt-6"
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.15 }}
          >
            <div className="hairline-invert mb-6" />
            <p className="body-lg text-white/75 max-w-lg">{content.kicker}</p>
          </motion.div>
        </div>

        {/* Editorial pull quote */}
        <div className="relative mt-20 md:mt-28">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="relative flex items-start gap-6 md:gap-10 max-w-5xl z-10"
          >
            <div className="flex-shrink-0 pt-2">
              <Quote className="h-8 w-8 md:h-10 md:w-10 text-bekasi-gold-500/70 -scale-x-100" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="heading-display text-2xl md:text-4xl lg:text-[2.5rem] leading-[1.25] text-white/95 text-balance italic">
                {content.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span aria-hidden className="h-px w-10 bg-bekasi-gold-500/60" />
                <span className="mono text-bekasi-gold-400">{content.quoteAttribution}</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Mascot - Tell or Teach (right side) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 lg:flex hidden items-center justify-center w-[300px] h-[300px] z-0 pointer-events-none">
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full"
            >
              <img
                src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1783252386/10._Tell_or_Teach_tjhufg.png"
                alt="BekasiGo Mascot - Tell or Teach"
                className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(212,163,89,0.25)]"
              />
            </motion.div>
          </div>
        </div>

        {/* Mobile/Tablet Mascot - Tell or Teach (centered below quote) */}
        <div className="lg:hidden flex items-center justify-center w-full mt-10 pointer-events-none">
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 1.5, -1.5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[180px] h-[180px]"
          >
            <img
              src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1783252386/10._Tell_or_Teach_tjhufg.png"
              alt="BekasiGo Mascot - Tell or Teach"
              className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(212,163,89,0.2)]"
            />
          </motion.div>
        </div>

        {/* Spotlight cards grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {content.items.map((item) => (
            <motion.div key={item.title} variants={reveal}>
              <HeritageSpotlightCard item={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* Hint row */}
        <div className="mt-6 flex items-center gap-3 text-eyebrow uppercase text-white/45">
          <Sparkles className="h-3.5 w-3.5" /> {content.hint}
        </div>

        {/* CTA row */}
        <div className="mt-16 md:mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8 pt-10 border-t border-white/10">
          <div>
            <div className="mono text-bekasi-gold-400">— 04 stories in this chapter</div>
            <p className="mt-2 heading-4 text-white text-balance">Continue the story of Bekasi.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={content.action.href}>
              <button className="btn-primary btn-md">
                {content.action.label}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href={content.secondaryAction.href} className="btn-ghost-invert btn-md">
              {content.secondaryAction.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
