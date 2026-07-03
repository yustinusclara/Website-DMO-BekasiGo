'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin, CalendarDays, BookOpen, Newspaper, TrendingUp,
  Plus, Sparkles, Image as ImageIcon, Globe, FileText,
  Clock, ArrowUpRight, CheckCircle2, Edit3, CalendarClock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CONTENT_STATS, CONTENT_TRENDS, RECENT_EDITS,
  UPCOMING_SCHEDULED, TYPE_META,
} from '@/lib/admin/adminData'

const ICONS = {
  destinations: MapPin,
  events:       CalendarDays,
  stories:      BookOpen,
  blog:         Newspaper,
}

/* ------------------------------------------------------------------ */
/* StatCard — 4-up totals grid                                         */
/* ------------------------------------------------------------------ */

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {CONTENT_STATS.map((s, i) => {
        const Icon = ICONS[s.id] ?? MapPin
        const trend = CONTENT_TRENDS[s.id] ?? { delta: 0, unit: '' }
        const meta  = TYPE_META[s.id]
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-xl border border-bekasi-emerald-900/8 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div className="h-9 w-9 rounded-md inline-flex items-center justify-center" style={{ background: `${meta.color}15`, color: meta.color }}>
                <Icon className="h-4 w-4" />
              </div>
              {trend.delta !== 0 && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-700 px-1.5 py-0.5 text-[11px] font-medium">
                  <TrendingUp className="h-3 w-3" /> +{trend.delta}
                </span>
              )}
            </div>
            <div className="mt-4">
              <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-ink/50">{s.label}</div>
              <div className="mt-1 font-sans font-semibold text-3xl leading-none text-bekasi-emerald-900">{s.total}</div>
              <div className="mt-2 text-[11.5px] text-bekasi-ink/55">
                <span className="text-emerald-700 font-medium">{s.published}</span> published ·{' '}
                <span className="text-bekasi-gold-600 font-medium">{s.drafts}</span> drafts
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* PublishStatus — horizontal stacked bars per content type            */
/* ------------------------------------------------------------------ */

export function PublishStatus() {
  return (
    <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">Content status</div>
          <h2 className="mt-1 font-sans font-semibold text-lg text-bekasi-emerald-900">Published vs draft breakdown</h2>
        </div>
        <Legend />
      </div>
      <div className="space-y-4">
        {CONTENT_STATS.map((s) => (
          <StatusBar key={s.id} row={s} />
        ))}
      </div>
    </div>
  )
}

function Legend() {
  return (
    <div className="hidden sm:flex items-center gap-4 text-[11px] text-bekasi-ink/60">
      <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-bekasi-emerald-500" />Published</span>
      <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-bekasi-gold-500" />Draft</span>
      <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-bekasi-emerald-900/40" />Scheduled</span>
    </div>
  )
}

function StatusBar({ row }) {
  const total = row.total || 1
  const pP = (row.published / total) * 100
  const pD = (row.drafts    / total) * 100
  const pS = (row.scheduled / total) * 100

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-bekasi-ink/70 mb-1.5">
        <div className="inline-flex items-center gap-2 font-medium text-bekasi-emerald-900">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: TYPE_META[row.id].color }} />
          {row.label}
        </div>
        <div className="text-bekasi-ink/60">{row.total} total</div>
      </div>
      <div className="relative h-2.5 w-full rounded-full bg-bekasi-emerald-900/[0.05] overflow-hidden flex">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pP}%` }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="h-full bg-bekasi-emerald-500" title={`${row.published} published`} />
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pD}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="h-full bg-bekasi-gold-500" title={`${row.drafts} drafts`} />
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pS}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="h-full bg-bekasi-emerald-900/40" title={`${row.scheduled} scheduled`} />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-bekasi-ink/50">
        <span>{row.published} published · {row.drafts} drafts · {row.scheduled} scheduled</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* QuickActions                                                        */
/* ------------------------------------------------------------------ */

const ACTIONS = [
  { label: 'Destination',   href: '/admin/destinations/new', icon: MapPin,       color: '#155F58' },
  { label: 'Event',         href: '/admin/events/new',       icon: CalendarDays, color: '#E27D5A' },
  { label: 'Story',         href: '/admin/stories/new',      icon: BookOpen,     color: '#B48A2D' },
  { label: 'Blog post',     href: '/admin/blog/new',         icon: Newspaper,    color: '#1E7A72' },
  { label: 'Upload media',  href: '/admin/media/upload',     icon: ImageIcon,    color: '#8C6A20' },
  { label: 'Preview site',  href: '/',                       icon: Globe,        color: '#0B3D3A', external: true },
]

export function QuickActions() {
  return (
    <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">Quick actions</div>
          <h2 className="mt-1 font-sans font-semibold text-lg text-bekasi-emerald-900">Create something new</h2>
        </div>
        <Sparkles className="h-4 w-4 text-bekasi-gold-500" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {ACTIONS.map((a) => {
          const Icon = a.icon
          return (
            <Link
              key={a.href}
              href={a.href}
              target={a.external ? '_blank' : undefined}
              className="group flex items-center gap-3 rounded-md border border-bekasi-emerald-900/8 hover:border-bekasi-emerald-900/25 hover:bg-bekasi-cream px-3 py-3 transition-all min-w-0"
            >
              <span className="h-9 w-9 rounded-md inline-flex items-center justify-center shrink-0" style={{ background: `${a.color}15`, color: a.color }}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium text-bekasi-emerald-900 leading-tight truncate">{a.label}</div>
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/50 mt-0.5">
                  {a.external ? 'Open' : 'Create'}
                </div>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-bekasi-ink/40 group-hover:text-bekasi-emerald-900 group-hover:-translate-y-px group-hover:translate-x-px transition-all" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* RecentEdits                                                         */
/* ------------------------------------------------------------------ */

const STATUS_STYLES = {
  published: { label: 'Published', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  draft:     { label: 'Draft',      chip: 'bg-bekasi-gold-500/12 text-bekasi-gold-700 border-bekasi-gold-500/30', icon: Edit3 },
  scheduled: { label: 'Scheduled',  chip: 'bg-bekasi-emerald-900/8 text-bekasi-emerald-900 border-bekasi-emerald-900/15', icon: CalendarClock },
}

export function RecentEdits() {
  return (
    <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-4">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">Recent activity</div>
          <h2 className="mt-1 font-sans font-semibold text-lg text-bekasi-emerald-900">Recent edits across the site</h2>
        </div>
        <Link href="/admin/activity" className="text-[12.5px] font-medium text-bekasi-emerald-900 hover:text-bekasi-gold-600 inline-flex items-center gap-1">
          View all <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-bekasi-emerald-900/6">
        {RECENT_EDITS.map((e) => {
          const meta = TYPE_META[e.type]
          const st   = STATUS_STYLES[e.status] ?? STATUS_STYLES.published
          const StIcon = st.icon
          return (
            <div key={e.id} className="px-6 py-3.5 grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 hover:bg-bekasi-cream/40 transition-colors">
              <div
                className="h-9 w-9 rounded-md inline-flex items-center justify-center text-[11px] font-medium text-white shrink-0"
                style={{ background: e.editor.color }}
                title={e.editor.name}
              >
                {e.editor.initials}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: meta.color }}>{meta.label}</span>
                  <span className="text-[10px] text-bekasi-ink/40">·</span>
                  <span className="text-[11px] text-bekasi-ink/55">{e.editor.name}</span>
                </div>
                <Link href={e.href} className="mt-0.5 block text-[14px] font-medium text-bekasi-emerald-900 hover:text-bekasi-gold-600 truncate">
                  {e.title}
                </Link>
              </div>

              <span className={cn('inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10.5px] font-medium', st.chip)}>
                <StIcon className="h-3 w-3" /> {st.label}
              </span>

              <span className="inline-flex items-center gap-1 text-[11.5px] text-bekasi-ink/50">
                <Clock className="h-3 w-3" /> {e.ago}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* UpcomingScheduled                                                   */
/* ------------------------------------------------------------------ */

export function UpcomingScheduled() {
  return (
    <div className="rounded-xl border border-bekasi-emerald-900/8 bg-bekasi-emerald-900 text-white p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-400">Publish queue</div>
          <h2 className="mt-1 font-sans font-semibold text-lg">Scheduled to go live</h2>
        </div>
        <CalendarClock className="h-4 w-4 text-bekasi-gold-400" />
      </div>

      {UPCOMING_SCHEDULED.length === 0 ? (
        <div className="text-sm text-white/60">Nothing scheduled. Everything current is live.</div>
      ) : (
        <ul className="space-y-3">
          {UPCOMING_SCHEDULED.map((s) => {
            const meta = TYPE_META[s.type] ?? TYPE_META.blog
            return (
              <li key={s.id} className="flex items-start gap-3 rounded-md bg-white/[0.04] p-3">
                <div
                  className="h-9 w-9 rounded-md inline-flex items-center justify-center text-[10px] uppercase tracking-[0.18em] font-medium shrink-0"
                  style={{ background: `${meta.color}30`, color: '#fff' }}
                >
                  {meta.label.slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10.5px] uppercase tracking-[0.18em] text-bekasi-gold-400">{meta.label}</div>
                  <div className="text-[13.5px] text-white/90 leading-snug line-clamp-2">{s.title}</div>
                </div>
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-white/50 shrink-0">
                  {new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <Link
        href="/admin/scheduled"
        className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-bekasi-gold-400 hover:text-bekasi-gold-300"
      >
        Manage schedule <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Welcome banner (compact)                                            */
/* ------------------------------------------------------------------ */

export function WelcomeBanner() {
  return (
    <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white p-5 md:p-6 flex flex-wrap items-center gap-4 justify-between">
      <div className="flex items-center gap-4">
        <div className="h-11 w-11 rounded-md bg-bekasi-gold-500/15 text-bekasi-gold-600 inline-flex items-center justify-center">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900">Everything is in sync.</div>
          <div className="text-[12.5px] text-bekasi-ink/60">Last deploy to production · 12 min ago · all edits live.</div>
        </div>
      </div>
      <Link href="/" target="_blank">
        <button className="inline-flex items-center gap-2 rounded-md border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900/[0.03] px-4 py-2 text-[13px] font-medium text-bekasi-emerald-900">
          <Globe className="h-4 w-4" /> View public site <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </Link>
    </div>
  )
}
