'use client'

import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles, Clock, MapPin, Sunrise, Sun, Sunset, Moon,
  Utensils, Coffee, Bed, TrainFront, Car, Bike, Footprints,
  ArrowRight, Camera, RefreshCcw, Cloud, Info, ChevronRight,
  Landmark, Trees, Building2,
  Bookmark, Download, Share2, Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { IMG } from '@/lib/content/homepage'
import { useAuth, getDeferredAction, clearDeferredAction } from '@/lib/supabase/AuthProvider'
import { getSupabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

// ---------------------------------------------------------------------------
// Sample data — replaced by real Gemini output in a follow-up prompt.
// Structured so the shell mirrors what the AI will produce.
// ---------------------------------------------------------------------------
const SAMPLE_PLAN = {
  title: 'A heritage-then-urban weekend across Kota Bekasi.',
  summary:
    'We open with the temple courtyard while the light is still soft, break for Peranakan coffee, ' +
    'and spend the afternoon in the Summarecon precinct. Day two leans into the kampung heritage ' +
    'and closes at Alun-Alun for the sunset.',
  stats: {
    stops: 9,
    walking_min: 42,
    driving_min: 68,
    photo_windows: 3,
    weather: 'Warm · 28°C · light cloud',
  },
  hotel: {
    name: 'Grand Metropolitan Suites',
    tier: 'Elevated',
    district: 'Bekasi Selatan · 15 min drive from Summarecon',
    image: IMG.grandMetropolitanMall,
    reason: 'Central, family-friendly, and within a short drive of both day-one and day-two anchors.',
  },
  days: [
    {
      day: 1,
      title: 'Heritage morning, urban afternoon.',
      groups: [
        {
          band: 'Morning',
          icon: Sunrise,
          color: '#B48A2D',
          items: [
            {
              kind: 'destination',
              time: '08:30', duration: '90 min',
              title: 'Klenteng Hok Lay Kiong',
              kicker: 'Heritage · Bekasi Timur',
              image: IMG.hokLayKiong,
              reason: 'Best light for the courtyard photos and the quietest crowd of the day.',
              tags: ['Peranakan', 'Temple'],
            },
            {
              kind: 'transport',
              time: '10:00',
              from: 'Klenteng Hok Lay Kiong', to: 'Warung Kopi Aroma',
              mode: 'walk',
              distance: '600 m',
              minutes: 8,
              note: 'A short walk through the market lanes — cash-only warungs on both sides.',
            },
            {
              kind: 'restaurant',
              time: '10:20', duration: '45 min',
              title: 'Warung Kopi Aroma',
              kicker: 'Coffee & breakfast · Bekasi Timur',
              price: '$', dietary: ['Vegetarian friendly'],
              reason: 'Peranakan-style breakfast that matches the temple visit — try the roti bakar.',
            },
          ],
        },
        {
          band: 'Midday',
          icon: Sun,
          color: '#155F58',
          items: [
            {
              kind: 'transport',
              time: '11:20',
              from: 'Warung Kopi Aroma', to: 'Gedung Juang 45',
              mode: 'car',
              distance: '3.4 km',
              minutes: 12,
              note: 'Take the inner Tambun road — avoids the KRL crossing at midday.',
            },
            {
              kind: 'destination',
              time: '11:45', duration: '75 min',
              title: 'Gedung Juang 45',
              kicker: 'Heritage museum · Tambun',
              image: IMG.gedungJuang45,
              reason: 'A curated pause before the afternoon heat — the top-floor gallery is calm.',
              tags: ['Museum', 'History'],
            },
            {
              kind: 'restaurant',
              time: '13:10', duration: '60 min',
              title: 'Nasi Uduk Kang Aep',
              kicker: 'Sundanese · Tambun',
              price: '$$', dietary: ['Halal'],
              reason: 'The pre-afternoon fuel — light enough for the mall visit next.',
            },
          ],
        },
        {
          band: 'Afternoon',
          icon: Sun,
          color: '#1E7A72',
          items: [
            {
              kind: 'transport',
              time: '14:15',
              from: 'Tambun', to: 'Summarecon Bekasi',
              mode: 'car',
              distance: '9.1 km',
              minutes: 22,
              note: 'Skip the tol — arterial road is faster at this hour.',
            },
            {
              kind: 'destination',
              time: '14:40', duration: '2 hrs',
              title: 'Summarecon Mall & Piramida Terbalik',
              kicker: 'Urban · Bekasi Utara',
              image: IMG.piramidaSummarecon,
              reason: 'Cool-off, coffee, and the signature Piramida Terbalik photo — magic hour hits ~ 16:30.',
              tags: ['Signature', 'Photo op'],
              photoTip: 'Piramida shot works best 16:20–16:40.',
            },
          ],
        },
        {
          band: 'Evening',
          icon: Sunset,
          color: '#E27D5A',
          items: [
            {
              kind: 'destination',
              time: '17:30', duration: '75 min',
              title: 'Alun-Alun Kota Bekasi',
              kicker: 'Sunset · Bekasi Timur',
              image: IMG.floatingCity,
              reason: 'Golden hour walk and warung dinner. Try to finish before the 18:45 traffic bloom.',
              tags: ['Sunset', 'Food street'],
            },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Kampung mornings and quieter corners.',
      groups: [
        {
          band: 'Morning',
          icon: Sunrise,
          color: '#B48A2D',
          items: [
            {
              kind: 'destination',
              time: '08:00', duration: '90 min',
              title: 'Kampung Adat Kranggan',
              kicker: 'Heritage community · Jatisampurna',
              image: IMG.kampungAdatKranggan,
              reason: 'Sundanese ritual houses and a soft-lit river bend — the earliest visitors get the guides.',
              tags: ['Ritual', 'Kampung'],
            },
          ],
        },
        {
          band: 'Preview',
          icon: Cloud,
          color: '#6B7280',
          items: [
            {
              kind: 'preview',
              text: 'More Day 2 stops appear once the Gemini engine is wired.',
            },
          ],
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------
export default function PlannerResultsModule({ form, plan: planProp, onRegenerate }) {
  const plan = planProp ?? SAMPLE_PLAN
  return (
    <div className="space-y-4">
      <TripSummary plan={plan} form={form} onRegenerate={onRegenerate} />
      <ItineraryTimeline days={plan.days} />
      {plan.hotel && <HotelSuggestion hotel={plan.hotel} />}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Trip summary strip
// ---------------------------------------------------------------------------
function TripSummary({ plan, form, onRegenerate }) {
  const stats = plan.stats
  const { user, requireAuth } = useAuth()
  const [savedFlash, setSavedFlash] = useState(null) // 'saved' | 'downloaded' | 'shared' | null
  const [submitting, setSubmitting] = useState(false)

  // Actual side-effects — saves real JSON payload to plans table in Supabase
  const doSave = useCallback(async () => {
    if (!user) {
      toast.error('Please sign in to save itineraries.')
      return
    }
    
    setSubmitting(true)
    const supabase = getSupabase()
    
    if (!supabase) {
      // Offline fallback / mock success
      console.info('[planner] fallback mock saving itinerary for', user?.email, plan?.title)
      setTimeout(() => {
        setSavedFlash('saved')
        setSubmitting(false)
        toast.success('Itinerary saved to your local profile (Demo mode)!')
        setTimeout(() => setSavedFlash(null), 2500)
      }, 800)
      return
    }

    try {
      const { error } = await supabase
        .from('plans')
        .insert({
          user_id: user.id,
          title: plan.title || 'My BekasiGo Itinerary',
          plan_json: plan,
          created_at: new Date().toISOString()
        })
      if (error) throw error
      setSavedFlash('saved')
      toast.success('Itinerary saved successfully!')
      setTimeout(() => setSavedFlash(null), 2500)
    } catch (err) {
      console.error('[planner] database save failed:', err)
      toast.error('Failed to save itinerary. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [user, plan])

  const doDownload = useCallback(() => {
    // Simple client-side JSON download until we generate a proper PDF.
    try {
      const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `bekasigo-itinerary-${Date.now()}.json`
      document.body.appendChild(a); a.click(); a.remove()
      URL.revokeObjectURL(url)
      setSavedFlash('downloaded')
      setTimeout(() => setSavedFlash(null), 2500)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[planner] download failed', e)
    }
  }, [plan])

  const doShare = useCallback(async () => {
    const shareData = {
      title: 'My BekasiGo itinerary',
      text:  plan?.title || 'BekasiGo itinerary',
      url:   typeof window !== 'undefined' ? window.location.href : '',
    }
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData)
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url)
      }
      setSavedFlash('shared')
      setTimeout(() => setSavedFlash(null), 2500)
    } catch {
      /* user dismissed */
    }
  }, [plan])

  // Gate handlers — if guest, open the login modal + stash intent. Once the
  // user returns authed, the useEffect below picks up the deferredAction.
  const handleSave     = () => { if (requireAuth('planner:save',     { reason: 'save' }))     doSave() }
  const handleDownload = () => { if (requireAuth('planner:download', { reason: 'download' })) doDownload() }
  const handleShare    = () => { if (requireAuth('planner:share',    { reason: 'share' }))    doShare() }

  // After a successful OAuth roundtrip, `user` flips from null → object.
  // Fire whichever action was stashed.
  useEffect(() => {
    if (!user) return
    const pending = getDeferredAction()
    if (!pending) return
    // Only fire actions that belong to the planner surface.
    if (!String(pending.actionName || '').startsWith('planner:')) return
    clearDeferredAction()
    if (pending.actionName === 'planner:save')     doSave()
    if (pending.actionName === 'planner:download') doDownload()
    if (pending.actionName === 'planner:share')    doShare()
  }, [user, doSave, doDownload, doShare])

  return (
    <div className="rounded-xl bg-white border border-bekasi-emerald-900/8 overflow-hidden">
      <div className="px-5 md:px-6 py-5 border-b border-bekasi-emerald-900/8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="eyebrow text-bekasi-gold-600">Your plan</div>
            <h2 className="mt-1 font-sans font-semibold text-xl md:text-[22px] text-bekasi-emerald-900 leading-tight">
              {plan.title}
            </h2>
            <p className="mt-2 text-[13.5px] text-bekasi-ink/70 max-w-2xl leading-relaxed">
              {plan.summary}
            </p>
          </div>
          <button onClick={onRegenerate}
            className="h-10 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 text-[13px] font-medium inline-flex items-center gap-2 shrink-0">
            <RefreshCcw className="h-3.5 w-3.5" /> Regenerate
          </button>
        </div>

        {/* Save / Download / Share row — gated by Google auth */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <ActionButton
            onClick={handleSave}
            icon={savedFlash === 'saved' ? Check : Bookmark}
            label={savedFlash === 'saved' ? 'Saved to your account' : (submitting ? 'Saving...' : 'Save')}
            variant="primary"
            active={savedFlash === 'saved'}
            loading={submitting}
            disabled={submitting}
          />
          <ActionButton
            onClick={handleDownload}
            icon={savedFlash === 'downloaded' ? Check : Download}
            label={savedFlash === 'downloaded' ? 'Downloaded' : 'Download'}
          />
          <ActionButton
            onClick={handleShare}
            icon={savedFlash === 'shared' ? Check : Share2}
            label={savedFlash === 'shared' ? 'Link copied' : 'Share'}
          />
          {!user && (
            <span className="ml-1 text-[11.5px] text-bekasi-ink/50">
              <Sparkles className="h-3 w-3 inline-block mr-1 -mt-0.5 text-bekasi-gold-500" />
              Sign in required to save or share
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-bekasi-emerald-900/6">
        <Stat icon={MapPin}      label="Stops"           value={stats.stops} />
        <Stat icon={Footprints}  label="Walking"         value={`${stats.walking_min} min`} />
        <Stat icon={Car}         label="Driving"         value={`${stats.driving_min} min`} />
        <Stat icon={Camera}      label="Photo windows"   value={stats.photo_windows} />
        <Stat icon={Cloud}       label="Weather"         value={stats.weather} className="col-span-2 md:col-span-1" />
      </div>
    </div>
  )
}

function ActionButton({ onClick, icon: Icon, label, variant = 'secondary', active = false, disabled = false, loading = false }) {
  const base = 'h-9 rounded-md px-3.5 text-[12.5px] font-medium inline-flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const styles = active
    ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
    : variant === 'primary'
      ? 'bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white'
      : 'border border-bekasi-emerald-900/15 hover:bg-bekasi-cream text-bekasi-emerald-900'
  return (
    <button type="button" onClick={onClick} disabled={disabled || loading} className={cn(base, styles)}>
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Icon className="h-3.5 w-3.5" />} {label}
    </button>
  )
}

function Stat({ icon: Icon, label, value, className }) {
  return (
    <div className={cn('px-4 py-3.5 flex items-center gap-3', className)}>
      <span className="h-8 w-8 rounded-md bg-bekasi-emerald-900/8 text-bekasi-emerald-800 inline-flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="text-[10.5px] uppercase tracking-[0.2em] text-bekasi-ink/50">{label}</div>
        <div className="text-[13px] font-medium text-bekasi-emerald-900 truncate">{value}</div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Itinerary timeline (grouped day/time view)
// ---------------------------------------------------------------------------
function ItineraryTimeline({ days }) {
  return (
    <div className="space-y-4">
      {days.map((d) => (
        <DayCard key={d.day} day={d} />
      ))}
    </div>
  )
}

function bandFromTime(time) {
  const h = parseInt(String(time ?? '').split(':')[0], 10) || 8
  if (h < 11) return { band: 'Morning',   icon: Sunrise, color: '#B48A2D' }
  if (h < 14) return { band: 'Midday',    icon: Sun,     color: '#155F58' }
  if (h < 17) return { band: 'Afternoon', icon: Sun,     color: '#1E7A72' }
  if (h < 20) return { band: 'Evening',   icon: Sunset,  color: '#E27D5A' }
  return             { band: 'Night',     icon: Moon,    color: '#5E4B8B' }
}

function autoGroupStops(stops) {
  // Convert real API shape (flat stops[]) into the same "groups" shape SAMPLE_PLAN uses.
  const buckets = {}
  const order   = []
  for (const s of stops ?? []) {
    const meta = bandFromTime(s.time)
    if (!buckets[meta.band]) {
      buckets[meta.band] = { band: meta.band, icon: meta.icon, color: meta.color, items: [] }
      order.push(meta.band)
    }
    // Map API item.kind → renderer variant.
    buckets[meta.band].items.push({
      kind: s.kind ?? 'destination',
      time: s.time,
      duration: s.duration,
      title: s.title,
      kicker: s.kicker || (s.district ? `Bekasi · ${s.district}` : ''),
      image: s.image ?? undefined,
      reason: s.ai_reason || s.reason,
      tags: s.tags ?? [],
    })
  }
  return order.map((k) => buckets[k])
}

function DayCard({ day }) {
  // Support both shapes: SAMPLE_PLAN.day.groups[] OR real API day.stops[]
  const groups = day.groups ?? autoGroupStops(day.stops ?? [])
  const stopsCount = groups.reduce((n, g) => n + g.items.filter((i) => i.kind !== 'transport' && i.kind !== 'preview').length, 0)
  return (
    <div className="rounded-xl bg-white border border-bekasi-emerald-900/8 overflow-hidden">
      <div className="px-5 md:px-6 py-4 border-b border-bekasi-emerald-900/8 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="eyebrow text-bekasi-gold-600">Day {day.day}</div>
          <div className="font-sans font-semibold text-[15.5px] text-bekasi-emerald-900 truncate">{day.title}</div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-bekasi-ink/55 shrink-0">
          <Clock className="h-3 w-3" /> {stopsCount} stops
        </span>
      </div>

      <div className="divide-y divide-bekasi-emerald-900/6">
        {groups.map((g, i) => (
          <TimeGroup key={i} group={g} />
        ))}
      </div>
    </div>
  )
}

function TimeGroup({ group }) {
  const Icon = group.icon || Sun
  return (
    <div className="px-5 md:px-6 py-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-6 w-6 rounded-md inline-flex items-center justify-center" style={{ background: `${group.color}18`, color: group.color }}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="text-[11px] uppercase tracking-[0.24em] font-medium" style={{ color: group.color }}>{group.band}</span>
      </div>

      <div className="relative pl-4 md:pl-5">
        {/* Vertical timeline line */}
        <span className="absolute left-1 top-1 bottom-1 w-px bg-gradient-to-b from-bekasi-emerald-900/25 via-bekasi-emerald-900/15 to-transparent" />
        <ul className="space-y-3">
          {group.items.map((item, i) => (
            <li key={i} className="relative">
              <span className={cn(
                'absolute -left-[13px] md:-left-[17px] top-2 h-2 w-2 rounded-full ring-2 ring-white',
                item.kind === 'transport' ? 'bg-bekasi-ink/30' : 'bg-bekasi-emerald-900',
              )} />
              {item.kind === 'destination'  && <DestinationCard item={item} />}
              {item.kind === 'restaurant'   && <RestaurantCard item={item} />}
              {item.kind === 'transport'    && <TransportNote item={item} />}
              {item.kind === 'preview'      && <PreviewLine item={item} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Card variants
// ---------------------------------------------------------------------------
function DestinationCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className="group rounded-lg border border-bekasi-emerald-900/8 hover:border-bekasi-emerald-900/25 bg-white overflow-hidden flex gap-3 items-stretch transition-colors"
    >
      <div className="relative h-24 w-32 md:w-36 shrink-0 bg-bekasi-cream">
        {item.image && <Image src={item.image} alt={item.title} fill sizes="150px" className="object-cover group-hover:scale-105 transition-transform duration-500" />}
        <span className="absolute top-1.5 left-1.5 rounded-full bg-black/55 text-white text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 font-medium inline-flex items-center gap-1">
          <Landmark className="h-2.5 w-2.5" /> Stop
        </span>
      </div>
      <div className="flex-1 min-w-0 py-2.5 pr-3">
        <div className="flex items-baseline gap-2">
          <span className="font-sans font-semibold text-bekasi-emerald-900 text-[15px]">{item.time}</span>
          <span className="text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/45">{item.duration}</span>
        </div>
        <div className="mt-0.5 font-medium text-[14px] text-bekasi-emerald-900 truncate">{item.title}</div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-bekasi-gold-600 truncate">{item.kicker}</div>
        {item.reason && (
          <p className="mt-1.5 text-[12.5px] text-bekasi-ink/70 leading-snug line-clamp-2 flex items-start gap-1.5">
            <Sparkles className="h-3 w-3 shrink-0 text-bekasi-gold-500 mt-0.5" />
            {item.reason}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(item.tags ?? []).map((t) => (
            <span key={t} className="inline-flex items-center rounded-full bg-bekasi-emerald-900/8 text-bekasi-emerald-900 px-2 py-0.5 text-[10.5px] font-medium">{t}</span>
          ))}
          {item.photoTip && (
            <span className="inline-flex items-center gap-1 rounded-full bg-bekasi-gold-500/12 text-bekasi-gold-700 px-2 py-0.5 text-[10.5px] font-medium">
              <Camera className="h-2.5 w-2.5" /> {item.photoTip}
            </span>
          )}
        </div>
      </div>
      <button className="self-center pr-3 text-bekasi-ink/40 hover:text-bekasi-emerald-900 shrink-0" title="Details">
        <ChevronRight className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

function RestaurantCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-bekasi-emerald-900/8 bg-bekasi-cream/60 px-3 py-2.5 flex gap-3 items-start"
    >
      <span className="h-10 w-10 rounded-md bg-white text-bekasi-emerald-800 inline-flex items-center justify-center shrink-0 border border-bekasi-emerald-900/10">
        <Utensils className="h-4 w-4" />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-sans font-semibold text-bekasi-emerald-900 text-[14.5px]">{item.time}</span>
          <span className="text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/45">{item.duration}</span>
          <span className="ml-1 text-[10.5px] uppercase tracking-[0.18em] text-bekasi-gold-600 font-medium">Meal</span>
        </div>
        <div className="mt-0.5 font-medium text-[14px] text-bekasi-emerald-900 truncate">{item.title}</div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-bekasi-ink/55 truncate">
          {item.kicker}
          {item.price && <span className="ml-2 text-bekasi-gold-600">{item.price}</span>}
        </div>
        {item.reason && <p className="mt-1 text-[12.5px] text-bekasi-ink/70 leading-snug line-clamp-2">{item.reason}</p>}
        {(item.dietary?.length ?? 0) > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {item.dietary.map((d) => (
              <span key={d} className="inline-flex items-center rounded-full bg-white border border-bekasi-emerald-900/10 text-bekasi-ink/70 px-2 py-0.5 text-[10.5px] font-medium">{d}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function TransportNote({ item }) {
  const Icon = item.mode === 'walk' ? Footprints
             : item.mode === 'train' ? TrainFront
             : item.mode === 'bike'  ? Bike
             : Car
  const modeLabel = { walk: 'Walk', train: 'Train', bike: 'Bike', car: 'Drive' }[item.mode] || 'Move'
  return (
    <div className="flex items-center gap-2.5 rounded-md bg-bekasi-emerald-900/[0.03] px-3 py-2 text-[12px] text-bekasi-ink/70">
      <span className="h-7 w-7 rounded-md bg-white text-bekasi-emerald-800 inline-flex items-center justify-center border border-bekasi-emerald-900/10 shrink-0">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="flex-1 min-w-0">
        <span className="font-medium text-bekasi-emerald-900">{modeLabel}</span>
        <span className="mx-1.5 text-bekasi-ink/40">·</span>
        <span>{item.distance}</span>
        <span className="mx-1.5 text-bekasi-ink/40">·</span>
        <span className="font-medium">{item.minutes} min</span>
        {item.note && <span className="ml-2 text-bekasi-ink/55">{item.note}</span>}
      </div>
      <span className="hidden md:inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/40">
        {item.from?.split(' ')[0]} <ArrowRight className="h-2.5 w-2.5" /> {item.to?.split(' ')[0]}
      </span>
    </div>
  )
}

function PreviewLine({ item }) {
  return (
    <div className="rounded-md bg-bekasi-cream border border-dashed border-bekasi-emerald-900/15 px-3 py-2.5 text-[12.5px] text-bekasi-ink/55 inline-flex items-start gap-2">
      <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
      {item.text}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Hotel suggestion (for multi-day trips)
// ---------------------------------------------------------------------------
function HotelSuggestion({ hotel }) {
  return (
    <div className="rounded-xl bg-white border border-bekasi-emerald-900/8 overflow-hidden">
      <div className="px-5 md:px-6 py-4 border-b border-bekasi-emerald-900/8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-md bg-bekasi-emerald-900/8 text-bekasi-emerald-800 inline-flex items-center justify-center">
            <Bed className="h-4 w-4" />
          </span>
          <div>
            <div className="eyebrow text-bekasi-gold-600">Where to sleep</div>
            <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900">Recommended stay</div>
          </div>
        </div>
        <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-bekasi-gold-500/12 text-bekasi-gold-700 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.18em] font-medium">
          Editor&apos;s pick
        </span>
      </div>
      <div className="flex flex-col md:flex-row items-stretch">
        <div className="relative h-40 md:h-auto md:w-56 shrink-0 bg-bekasi-cream">
          {hotel.image && <Image src={hotel.image} alt={hotel.name} fill sizes="240px" className="object-cover" />}
        </div>
        <div className="p-5 flex-1 min-w-0">
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">{hotel.tier}</div>
          <div className="mt-1 font-sans font-semibold text-lg text-bekasi-emerald-900">{hotel.name}</div>
          <div className="mt-1 text-[12.5px] text-bekasi-ink/60 inline-flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> {hotel.district}
          </div>
          <p className="mt-3 text-[13px] text-bekasi-ink/70 leading-relaxed max-w-2xl">
            <Sparkles className="h-3 w-3 text-bekasi-gold-500 inline mr-1 -mt-0.5" />
            {hotel.reason}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="h-9 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 text-[12.5px] font-medium inline-flex items-center gap-1.5">
              View details <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <button className="h-9 rounded-md border border-bekasi-emerald-900/15 hover:bg-bekasi-cream text-bekasi-emerald-900 px-4 text-[12.5px] font-medium">
              Swap to a different stay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
