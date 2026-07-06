'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Instagram, Youtube, Facebook, Twitter, Music2,
  MapPin, Globe, Mail, Phone, ArrowRight, Sparkles, ShieldCheck,
} from 'lucide-react'
import { FOOTER, NAV } from '@/lib/content/homepage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { toast } from 'sonner'

const ICONS = {
  instagram: Instagram, youtube: Youtube, facebook: Facebook,
  twitter: Twitter, 'music-2': Music2,
}

/**
 * SiteFooter
 * ─────────────────────────────────────────────────────────
 * Premium mega-footer for BekasiGo:
 *  • Newsletter capture strip (city-tone email opt-in)
 *  • Mega grid — 5 grouped nav columns + brand block
 *  • Smart Planner CTA card (secondary conversion)
 *  • Tourism-trust partners row (official DMO signals)
 *  • Bottom bar — legal · social · language
 *  • Oversized wordmark backdrop for cinematic depth
 */
const getTranslationKey = (label) => {
  switch (label?.toLowerCase()) {
    case 'discover': return 'nav.mobile_discover';
    case 'discover bekasi': return 'nav.discover';
    case 'destinations': return 'nav.destinations';
    case 'events': return 'nav.events';
    case 'city stories': return 'nav.stories';
    case 'explore map': return 'nav.map';
    case 'smart trip planner': return 'nav.planner';
    case 'press': return 'nav.press';
    case 'partners': return 'nav.partners';
    case 'by theme': return 'nav.group_theme';
    case 'essentials': return 'nav.group_essential';
    case 'heritage & culture': return 'nav.theme_heritage';
    case 'urban lifestyle': return 'nav.theme_urban';
    case 'nature & waterfront': return 'nav.theme_nature';
    case 'waterfront & nature': return 'nav.theme_nature';
    case 'family friendly': return 'nav.theme_family';
    case 'food & drink': return 'nav.essential_food';
    case 'stay': return 'nav.essential_stay';
    case 'getting around': return 'nav.essential_transit';
    case 'journal & news': return 'nav.essential_journal';
    case 'about bekasigo': return 'nav.mobile_about';
    case 'cms console': return 'nav.mobile_cms';
    case 'explore': return 'footer.col_explore';
    case 'experience': return 'footer.col_experience';
    case 'plan': return 'footer.col_plan';
    case 'read': return 'footer.col_read';
    case 'about': return 'footer.col_about';
    case 'home': return 'footer.lbl_home';
    case 'where to stay': return 'footer.lbl_where_stay';
    case 'weather': return 'footer.lbl_weather';
    case 'currency & tips': return 'footer.lbl_currency';
    case 'press kit': return 'footer.lbl_press_kit';
    case 'newsletter': return 'footer.lbl_newsletter';
    case 'city government': return 'footer.lbl_gov';
    case 'contact': return 'footer.lbl_contact';
    case 'careers': return 'footer.lbl_careers';
    case 'privacy': return 'footer.lbl_privacy';
    case 'terms': return 'footer.lbl_terms';
    case 'accessibility': return 'footer.lbl_access';
    case 'sitemap': return 'footer.lbl_sitemap';
    default: return null;
  }
}

export default function SiteFooter() {
  const { t, locale, changeLocale } = useTranslation()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const translateLabel = (label) => {
    const key = getTranslationKey(label)
    return key ? t(key) : label
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error(locale === 'en' ? 'Please enter your email address.' : 'Silakan masukkan alamat email Anda.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error(locale === 'en' ? 'Please enter a valid email address.' : 'Silakan masukkan alamat email yang valid.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(
          locale === 'en' 
            ? 'Thank you! You have successfully subscribed to the BekasiGo newsletter.' 
            : 'Terima kasih! Anda berhasil berlangganan newsletter BekasiGo.'
        )
        setEmail('')
      } else {
        let msg = data.error
        if (data.error === "Email is already subscribed") {
          msg = locale === 'en' ? 'This email is already subscribed.' : 'Email ini sudah terdaftar sebagai pelanggan.'
        } else if (data.error === "Invalid email format") {
          msg = locale === 'en' ? 'Please enter a valid email address.' : 'Silakan masukkan alamat email yang valid.'
        } else if (!msg) {
          msg = locale === 'en' ? 'Failed to subscribe. Please try again later.' : 'Gagal berlangganan. Silakan coba lagi nanti.'
        }
        toast.error(msg)
      }
    } catch (err) {
      console.error(err)
      toast.error(locale === 'en' ? 'An unexpected error occurred. Please try again later.' : 'Terjadi kesalahan tidak terduga. Silakan coba lagi nanti.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <footer className="relative gradient-emerald text-white overflow-hidden">
      {/* Oversized brand wordmark backdrop */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 pointer-events-none flex items-end justify-center overflow-hidden"
      >
        <span className="font-display text-[22vw] leading-[0.8] tracking-tight text-white/[0.035] select-none whitespace-nowrap translate-y-[10%]">
          BekasiGo
        </span>
      </div>

      {/* ─── Newsletter strip ───────────────────────────────────── */}
      <div className="relative border-b border-white/10">
        <div className="container relative py-14 md:py-20 grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative z-10">
            <span className="eyebrow eyebrow-dot text-bekasi-gold-400">{t('nav.essential_journal')}</span>
            <h3 className="mt-4 heading-display text-3xl md:text-5xl leading-tight text-balance">
              {t('footer.newsletter_title')}
            </h3>
            <p className="mt-4 text-white/70 max-w-md">
              {t('footer.newsletter_subtitle')}
            </p>
          </div>

          {/* Mascot - Two Hands Up (Desktop) */}
          <div className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2 lg:block hidden w-[210px] h-[210px] pointer-events-none z-0">
            <img
              src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1783252332/5._Two_Hands_Up_imxatb.png"
              alt="BekasiGo Mascot - Two Hands Up"
              className="w-full h-full object-contain drop-shadow-[0_12px_28px_rgba(20,50,40,0.22)]"
            />
          </div>

          {/* Mascot - Two Hands Up (Mobile/Tablet) */}
          <div className="lg:hidden flex justify-center w-full pointer-events-none mt-2 -mb-4 z-10">
            <div className="w-[150px] h-[150px]">
              <img
                src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1783252332/5._Two_Hands_Up_imxatb.png"
                alt="BekasiGo Mascot - Two Hands Up"
                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(20,50,40,0.15)]"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 z-10 w-full max-w-md lg:max-w-none">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder={t('footer.newsletter_placeholder')}
              className="h-12 flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-bekasi-gold-400"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 rounded-md bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 font-medium px-6 min-w-[130px] flex items-center justify-center"
            >
              {loading ? (
                <span>{locale === 'en' ? 'Subscribing...' : 'Memproses...'}</span>
              ) : (
                <>
                  {t('footer.newsletter_subscribe')} <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* ─── Mega nav ───────────────────────────────────────────── */}
      <div className="relative container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand block */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative h-10 w-10 transition-transform group-hover:scale-105">
                <Image
                  src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1783252951/3._Logo_SVG_BekasiGo_main_wqr72y.svg"
                  alt="BekasiGo Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl tracking-tight">BekasiGo</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 mt-0.5">
                  City Guide
                </span>
              </div>
            </Link>

            <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>

            <div className="mt-6 space-y-2 text-xs text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <a href="mailto:hello@bekasigo.id" className="hover:text-white transition-colors">
                  hello@bekasigo.id
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                <span>+62 21 8800-8000</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.22em] text-bekasi-gold-400 mb-4">
                {translateLabel(col.title)}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/75 hover:text-white transition-colors"
                    >
                      {translateLabel(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Planner CTA card */}
        <div className="mt-16 rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="h-12 w-12 rounded-full bg-bekasi-gold-500/15 border border-bekasi-gold-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-bekasi-gold-400" />
            </div>
            <div>
              <p className="text-white font-medium">{t('footer.cta_title')}</p>
              <p className="text-sm text-white/60">
                {t('footer.cta_subtitle')}
              </p>
            </div>
          </div>
          <Link href={NAV.cta.href}>
            <Button className="h-11 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 px-6 whitespace-nowrap">
              {t('footer.cta_btn')}
            </Button>
          </Link>
        </div>
      </div>

      {/* ─── Tourism-trust partners strip ───────────────────────── */}
      <div className="relative border-t border-white/10">
        <div className="container py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-px bg-white/10 rounded-lg overflow-hidden border border-white/10">
            {(() => {
              const partnerLinks = {
                'Pemerintah Kota Bekasi': 'https://bekasikota.go.id/',
                'Dinas Pariwisata': 'https://www.instagram.com/disparbudbekasi/?hl=en',
                'Wonderful Indonesia': 'https://www.indonesia.travel/id/id',
                'Bekasi Creative Hub': 'https://www.instagram.com/bekasi.creativehub/?hl=en'
              }
              return FOOTER.trust.partners.map((p) => {
                const href = partnerLinks[p.name]
                const content = (
                  <>
                    <div className="text-[9.5px] uppercase tracking-[0.22em] text-bekasi-gold-400/80 truncate">
                      {p.kicker}
                    </div>
                    <div className="mt-1 font-display text-sm md:text-[15px] leading-tight text-white/90 truncate">
                      {p.name}
                    </div>
                  </>
                )

                if (href) {
                  return (
                    <a
                      key={p.name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex bg-bekasi-emerald-900 px-4 py-3 md:px-5 md:py-4 min-w-0 flex-col justify-center hover:bg-bekasi-emerald-800/60 transition-colors border-r last:border-r-0 border-white/5"
                      title={p.name}
                    >
                      {content}
                    </a>
                  )
                }

                return (
                  <div
                    key={p.name}
                    className="flex bg-bekasi-emerald-900 px-4 py-3 md:px-5 md:py-4 min-w-0 flex-col justify-center hover:bg-bekasi-emerald-800/60 transition-colors"
                    title={p.name}
                  >
                    {content}
                  </div>
                )
              })
            })()}
          </div>
        </div>
      </div>

      {/* ─── Bottom bar ─────────────────────────────────────────── */}
      <div className="relative border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center gap-6 md:gap-4 justify-between text-xs text-white/50">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} BekasiGo. {t('footer.rights')}</span>
            {FOOTER.meta.map((m) => (
              <Link key={m.href} href={m.href} className="hover:text-white transition-colors">
                {translateLabel(m.label)}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              {FOOTER.social.map((s) => {
                const Icon = ICONS[s.icon] ?? Instagram
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="h-8 w-8 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                )
              })}
            </div>
            <button 
              onClick={() => changeLocale(locale === 'en' ? 'id' : 'en')}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/10 hover:border-white/30 transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className={cn(locale === 'en' ? 'text-white font-semibold' : 'text-white/60')}>EN</span>
              <span className="text-white/30">/</span>
              <span className={cn(locale === 'id' ? 'text-white font-semibold' : 'text-white/60')}>ID</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
