'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Send, Bot, User, ChevronRight, Loader2,
  Users, Utensils, TrainFront, Coffee, Landmark, Sun,
  ArrowUpDown, Check, Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Suggested prompt chips
// ---------------------------------------------------------------------------
const SUGGESTIONS = [
  { id: 'family',   label: 'Make it more family friendly',  icon: Users,      color: '#1E7A72', prompt: 'Adjust the plan to be more family-friendly with kids in mind — shorter stops, safer venues, and more breaks.' },
  { id: 'culinary', label: 'Add more culinary stops',       icon: Utensils,   color: '#A34E2B', prompt: 'Add more culinary stops throughout the day — think local warungs, hidden gems, and iconic Bekasi flavors.' },
  { id: 'station',  label: 'Start from Bekasi Station',     icon: TrainFront, color: '#155F58', prompt: 'Re-route the plan to start from Stasiun Bekasi (KRL Commuter). Optimize the sequence from there.' },
  { id: 'relaxed',  label: 'Make it more relaxed',          icon: Coffee,     color: '#B48A2D', prompt: 'Slow the pacing — longer breaks between stops and fewer must-see locations. Prioritize enjoyment over coverage.' },
  { id: 'heritage', label: 'Focus on heritage',             icon: Landmark,   color: '#8C6A20', prompt: 'Refocus the plan on heritage sites — Peranakan temples, kampung adat, monuments, and historic buildings.' },
  { id: 'sunset',   label: 'End with a sunset',             icon: Sun,        color: '#E27D5A', prompt: 'Restructure the plan so we end the last day with a sunset view — Alun-Alun or a scenic vantage point.' },
]

// Sample structured assistant responses — stub until Gemini wire lands.
function fakeAssistantReply(userPrompt, suggestionId) {
  const CHANGE_TEMPLATES = {
    family: {
      summary: 'I softened the pacing and swapped 2 stops for kid-friendly picks.',
      changes: [
        { type: 'swap',   from: 'Piramida photo op', to: 'Alun-Alun Kota Bekasi (playground)' },
        { type: 'add',    what: 'Warung Es Doger Djoen',   note: 'Kid-favorite dessert stop, air-conditioned.' },
        { type: 'shift',  what: 'Klenteng visit',           note: 'Shortened to 60 min so kids don\'t get restless.' },
      ],
    },
    culinary: {
      summary: 'Layered in 3 more meals + 2 quick snack stops.',
      changes: [
        { type: 'add', what: 'Bakmi GM Bekasi',        note: 'Iconic local noodle house — quick mid-morning stop.' },
        { type: 'add', what: 'Sate Ayam Cak Slamet',   note: 'Legendary sate at midnight — worth the detour.' },
        { type: 'add', what: 'Toko Kopi Djaman Doeloe', note: 'Retro coffee house between temple and lunch.' },
      ],
    },
    station: {
      summary: 'Re-anchored the plan to Stasiun Bekasi — closer stops first.',
      changes: [
        { type: 'shift', what: 'Starting point', note: 'Now anchored to Stasiun Bekasi (KRL).' },
        { type: 'reorder', what: 'Klenteng Hok Lay Kiong → moved earlier', note: '8-min walk from station.' },
        { type: 'add',   what: 'Alun-Alun sunset walk', note: 'Ends day 10-min walk from station for easy return.' },
      ],
    },
    relaxed: {
      summary: 'Cut 2 stops, extended breaks, and added a coffee window.',
      changes: [
        { type: 'remove', what: 'Gedung Juang 45', note: 'Removed for pacing.' },
        { type: 'shift',  what: 'Midday break',    note: 'Extended to 90 min.' },
        { type: 'add',    what: 'Golden Coffee Company', note: 'Slow coffee window before the afternoon walk.' },
      ],
    },
    heritage: {
      summary: 'Refocused entirely on heritage — 5 heritage stops added.',
      changes: [
        { type: 'add', what: 'Monumen Kali Bekasi',     note: 'Historic monument, quick 20-min visit.' },
        { type: 'add', what: 'Kampung Bali Harapan Jaya', note: 'Living Balinese heritage community.' },
        { type: 'remove', what: 'Summarecon Mall',      note: 'Urban stop removed to fit heritage focus.' },
      ],
    },
    sunset: {
      summary: 'Restructured the day to end with the golden hour.',
      changes: [
        { type: 'shift', what: 'Alun-Alun', note: 'Moved to 17:20 for golden-hour arrival.' },
        { type: 'add',   what: 'Kali Malang riverside walk', note: 'Optional 30-min stroll before sunset.' },
      ],
    },
  }
  const preset = CHANGE_TEMPLATES[suggestionId] ?? {
    summary: `I'll interpret "${userPrompt}" and refine the plan accordingly.`,
    changes: [{ type: 'note', what: 'Refinement engine (Gemini) lands in a follow-up prompt.', note: '' }],
  }
  return {
    kind: 'assistant',
    id: `a-${Date.now()}`,
    ...preset,
  }
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------
export default function PlannerRefineModule() {
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [busy, setBusy]         = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  const submitPrompt = (text, suggestionId) => {
    if (!text.trim()) return
    const userMsg = { kind: 'user', id: `u-${Date.now()}`, content: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setBusy(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, fakeAssistantReply(text, suggestionId)])
      setBusy(false)
    }, 900)
  }

  const onSuggestionClick = (s) => submitPrompt(s.prompt, s.id)

  return (
    <div className="rounded-xl bg-white border border-bekasi-emerald-900/8 overflow-hidden">
      {/* Header — copilot, not chatbot */}
      <div className="px-5 py-4 border-b border-bekasi-emerald-900/8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="relative h-10 w-10 rounded-md bg-gradient-to-br from-bekasi-emerald-900 to-bekasi-emerald-700 text-white inline-flex items-center justify-center shrink-0">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-bekasi-gold-500 ring-2 ring-white" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-sans font-semibold text-[15px] text-bekasi-emerald-900">BekasiGo Copilot</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-bekasi-emerald-900/8 text-bekasi-emerald-900 px-2 py-0.5 text-[10.5px] uppercase tracking-[0.18em] font-medium">
                <Sparkles className="h-2.5 w-2.5" /> Active
              </span>
            </div>
            <div className="text-[11.5px] text-bekasi-ink/60">Refine your plan in natural language — swap stops, change pace, adjust focus.</div>
          </div>
        </div>
      </div>

      {/* Suggested chips */}
      <div className="px-5 pt-4 pb-2">
        <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50 mb-2 flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-bekasi-gold-500" /> Try a quick refinement
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSuggestionClick(s)}
                disabled={busy}
                className={cn(
                  'group inline-flex items-center gap-1.5 rounded-full border border-bekasi-emerald-900/12 bg-white hover:bg-bekasi-cream hover:border-bekasi-emerald-900/25 px-3 py-1.5 text-[12px] font-medium text-bekasi-ink/80 transition-colors',
                  busy && 'opacity-40 cursor-not-allowed',
                )}
              >
                <Icon className="h-3 w-3 shrink-0" style={{ color: s.color }} />
                {s.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Message stream */}
      <div
        ref={scrollRef}
        className="px-5 py-3 max-h-[380px] min-h-[160px] overflow-y-auto scroll-smooth"
      >
        {messages.length === 0 && !busy ? (
          <EmptyState />
        ) : (
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {m.kind === 'user' ? <UserBubble content={m.content} /> : <AssistantReply msg={m} />}
                </motion.li>
              ))}
              {busy && (
                <motion.li key="busy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <BusyIndicator />
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); submitPrompt(input) }}
        className="px-5 py-3 border-t border-bekasi-emerald-900/8 bg-bekasi-cream/40 flex items-center gap-2"
      >
        <div className="relative flex-1 min-w-0">
          <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-bekasi-gold-500 pointer-events-none" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
            placeholder="Ask the copilot to swap, add, or reshape anything…"
            className="w-full h-10 rounded-md border border-bekasi-emerald-900/15 bg-white pl-8 pr-3 text-sm text-bekasi-ink placeholder:text-bekasi-ink/40 focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500 disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className={cn(
            'h-10 rounded-md px-4 text-[13px] font-semibold inline-flex items-center gap-1.5 shadow-sm transition-colors',
            busy || !input.trim()
              ? 'bg-bekasi-emerald-900/40 text-white cursor-not-allowed'
              : 'bg-bekasi-gold-500 hover:bg-bekasi-gold-600 text-bekasi-emerald-900',
          )}
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          Refine
        </button>
      </form>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub components
// ---------------------------------------------------------------------------
function EmptyState() {
  return (
    <div className="text-center py-8 space-y-2">
      <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-bekasi-emerald-900/8 text-bekasi-emerald-900 mb-1">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="text-[13.5px] font-medium text-bekasi-emerald-900">
        Tap a suggestion above or type your own refinement.
      </div>
      <div className="text-[12px] text-bekasi-ink/55 max-w-sm mx-auto leading-relaxed">
        The copilot will re-plan only what you ask — the rest of your itinerary stays intact.
      </div>
    </div>
  )
}

function UserBubble({ content }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] flex items-start gap-2">
        <div className="rounded-lg rounded-tr-none bg-bekasi-emerald-900 text-white px-3.5 py-2 text-[13px] leading-relaxed">
          {content}
        </div>
        <span className="h-7 w-7 rounded-md bg-bekasi-emerald-900/8 text-bekasi-emerald-900 inline-flex items-center justify-center shrink-0 mt-0.5">
          <User className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  )
}

function AssistantReply({ msg }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[95%] flex items-start gap-2">
        <span className="h-7 w-7 rounded-md bg-gradient-to-br from-bekasi-emerald-900 to-bekasi-emerald-700 text-white inline-flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 space-y-2">
          {/* Summary bubble */}
          <div className="rounded-lg rounded-tl-none bg-bekasi-cream text-bekasi-ink/85 px-3.5 py-2 text-[13px] leading-relaxed">
            {msg.summary}
          </div>
          {/* Structured changes card */}
          {msg.changes?.length > 0 && (
            <div className="rounded-lg border border-bekasi-emerald-900/10 bg-white overflow-hidden">
              <div className="px-3 py-2 border-b border-bekasi-emerald-900/8 bg-bekasi-emerald-900/[0.03] text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600 font-medium inline-flex items-center gap-1.5">
                <Check className="h-3 w-3 text-bekasi-emerald-700" /> Changes applied
              </div>
              <ul className="divide-y divide-bekasi-emerald-900/6">
                {msg.changes.map((c, i) => (
                  <li key={i} className="px-3 py-2 flex items-start gap-2.5 text-[12.5px]">
                    <ChangeIcon type={c.type} />
                    <div className="flex-1 min-w-0">
                      {c.type === 'swap' && (
                        <div><span className="text-bekasi-ink/60">Swapped </span><strong className="text-bekasi-emerald-900">{c.from}</strong> <span className="text-bekasi-ink/40">→</span> <strong className="text-bekasi-emerald-900">{c.to}</strong></div>
                      )}
                      {c.type === 'add'    && <div><span className="text-bekasi-ink/60">Added </span><strong className="text-bekasi-emerald-900">{c.what}</strong></div>}
                      {c.type === 'remove' && <div><span className="text-bekasi-ink/60">Removed </span><strong className="text-bekasi-emerald-900">{c.what}</strong></div>}
                      {c.type === 'shift'  && <div><span className="text-bekasi-ink/60">Adjusted </span><strong className="text-bekasi-emerald-900">{c.what}</strong></div>}
                      {c.type === 'reorder' && <div><strong className="text-bekasi-emerald-900">{c.what}</strong></div>}
                      {c.type === 'note'   && <div><strong className="text-bekasi-emerald-900">{c.what}</strong></div>}
                      {c.note && <div className="mt-0.5 text-[11.5px] text-bekasi-ink/60">{c.note}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ChangeIcon({ type }) {
  const map = {
    swap:    { Icon: ArrowUpDown, color: '#B48A2D' },
    add:     { Icon: Sparkles,    color: '#1E7A72' },
    remove:  { Icon: ChevronRight, color: '#A34E2B' },
    shift:   { Icon: Sun,          color: '#155F58' },
    reorder: { Icon: ArrowUpDown,  color: '#155F58' },
    note:    { Icon: Sparkles,     color: '#8C6A20' },
  }
  const { Icon, color } = map[type] ?? map.note
  return (
    <span className="h-5 w-5 rounded-md inline-flex items-center justify-center shrink-0 mt-0.5"
      style={{ background: `${color}18`, color }}>
      <Icon className="h-3 w-3" />
    </span>
  )
}

function BusyIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-2">
        <span className="h-7 w-7 rounded-md bg-gradient-to-br from-bekasi-emerald-900 to-bekasi-emerald-700 text-white inline-flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="h-3.5 w-3.5" />
        </span>
        <div className="rounded-lg rounded-tl-none bg-bekasi-cream text-bekasi-ink/75 px-3.5 py-2.5 text-[13px] inline-flex items-center gap-2">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-bekasi-emerald-800" />
          <span>Refining your plan…</span>
        </div>
      </div>
    </div>
  )
}
