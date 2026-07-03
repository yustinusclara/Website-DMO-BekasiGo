'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Play, ChevronDown, Sparkles, Volume2, VolumeX, ArrowRight,
} from 'lucide-react'
import { HERO } from '@/lib/content/homepage'

/**
 * BekasiGo Hero — cinematic destination-brand opener.
 *
 * Loading strategy:
 *  1. Poster image paints immediately (Cloudinary Floating Smart City).
 *  2. <video> preloads metadata only; starts playing muted on canplay.
 *  3. Ken Burns anim on poster is used while video isn't ready — keeps the
 *     frame alive even on slow networks. Once video plays, poster fades out.
 *  4. Audio is off by default; a discreet mute toggle lets users opt-in.
 */
export default function HeroVideo() {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Kick off playback ASAP (some browsers need explicit .play() even with autoplay)
    const p = v.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }, [])

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    // Retry play in case iOS suspended it
    const p = v.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }

  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden text-white bg-bekasi-emerald-900"
      aria-label="BekasiGo hero"
    >
      {/* --- MEDIA LAYER --- */}
      <div className="absolute inset-0">
        {/* Actual video — plays immediately, no fade gate */}
        {HERO.videoUrl && (
          <video
            ref={videoRef}
            className="img-cover opacity-100"
            src={HERO.videoUrl}
            autoPlay
            loop
            muted={muted}
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}

        {/* --- OVERLAYS for readability --- */}
        {/* vertical top-to-bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-bekasi-emerald-900/70 via-bekasi-emerald-900/30 to-bekasi-emerald-900" />
        {/* left content vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-bekasi-emerald-900/75 via-bekasi-emerald-900/10 to-transparent" />
        {/* radial vignette for corners */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 30%, transparent 40%, rgba(6,46,43,0.55) 100%)',
          }}
        />
        {/* subtle film grain */}
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.07] mix-blend-overlay pointer-events-none" />
      </div>

      {/* --- CENTER CONTENT --- */}
      <div className="relative z-10 h-full container flex flex-col justify-end pt-28 md:pt-32 pb-20 md:pb-28">
        <div className="max-w-3xl">
          {/* Chapter marker — sits INSIDE the content flow so it never collides with the title */}
          <div
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/60 opacity-0 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <span className="inline-block h-px w-8 bg-bekasi-gold-500/70" />
            <span>Chapter 01 · The Signature</span>
          </div>

          <h1
            className="mt-5 heading-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] tracking-tight text-balance opacity-0 animate-fade-up"
            style={{ animationDelay: '550ms' }}
          >
            {HERO.title}
          </h1>

          <p
            className="mt-6 body-lg text-white/80 max-w-2xl opacity-0 animate-fade-up"
            style={{ animationDelay: '750ms' }}
          >
            {HERO.subtitle}
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: '900ms' }}
          >
            <Link href={HERO.primaryCta.href} className="w-full sm:w-auto">
              <button className="btn-primary btn-lg w-full sm:w-auto group">
                <Sparkles className="h-4 w-4" /> {HERO.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <Link href={HERO.secondaryCta.href} className="group inline-flex items-center gap-3 text-white/90 hover:text-white">
              <span className="h-11 w-11 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/70 transition-all">
                <Play className="h-4 w-4 fill-white ml-0.5" />
              </span>
              <span className="text-sm font-medium">{HERO.secondaryCta.label}</span>
            </Link>
          </div>
        </div>

        {/* --- BOTTOM ROW: stats + audio + scroll cue --- */}
        <div
          className="mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 opacity-0 animate-fade-up"
          style={{ animationDelay: '1100ms' }}
        >
          <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-xl">
            {HERO.stats.map((s, i) => (
              <div key={s.v} className="relative">
                {i > 0 && (
                  <span aria-hidden className="absolute -left-4 top-0 bottom-0 w-px bg-white/15 hidden md:block" />
                )}
                <div className="font-display text-3xl md:text-4xl text-bekasi-gold-400 leading-none">{s.k}</div>
                <div className="mt-2 text-eyebrow uppercase text-white/60">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {HERO.videoUrl && (
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors"
              >
                <span className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/10 transition-all">
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </span>
                <span className="hidden md:inline">{muted ? 'Sound off' : 'Sound on'}</span>
              </button>
            )}
            <a
              href="#quick-explore"
              className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 hover:text-white group"
            >
              Scroll to explore
              <ChevronDown className="h-4 w-4 animate-bounce group-hover:text-bekasi-gold-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom hairline into next section — blends into the cream ground */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bekasi-emerald-900/80 pointer-events-none" />
    </section>
  )
}
