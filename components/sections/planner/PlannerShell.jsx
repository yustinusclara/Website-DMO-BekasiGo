'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Compass, MapPin, MessageCircle, RefreshCcw,
  Users, Baby, Wallet, Calendar as CalIcon, Clock,
  Bookmark, Download, Share2, Send, ChevronRight, X,
  Building2, UtensilsCrossed, Landmark, TreePine, Moon, Star, ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import PlannerFormModule from './PlannerFormModule'

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------
const TRAVEL_STYLES = [
  { id: 'heritage',  label: 'Heritage',   description: 'Kelenteng, monuments, kampung.', icon: Landmark },
  { id: 'family',    label: 'Family',      description: 'Kid-friendly, safe, comfortable.', icon: Users },
  { id: 'foodie',    label: 'Foodie',      description: 'Warungs, cafes, night bites.',      icon: UtensilsCrossed },
  { id: 'nightlife', label: 'Nightlife',   description: 'Late-night bites and bars.',         icon: Moon },
  { id: 'nature',    label: 'Nature',      description: 'Situ, parks, quiet corners.',        icon: TreePine },
  { id: 'shopping',  label: 'Shopping',    description: 'Malls, markets, boutiques.',         icon: Building2 },
  { id: 'mixed',     label: 'A bit of everything', description: 'Let BekasiGo mix it up.',    icon: Compass },
]

const INTERESTS = [
  'Peranakan heritage', 'Sundanese ritual', 'Craft coffee', 'Weekend markets',
  'Street food', 'Instagrammable', 'Family + kids', 'Quiet nature',
  'Modern architecture', 'Sunset views',
]

const BUDGET_LEVELS = [
  { id: 1, label: 'Cozy',       hint: 'Under Rp 300k / day' },
  { id: 2, label: 'Balanced',   hint: 'Rp 300k – 700k / day' },
  { id: 3, label: 'Elevated',   hint: 'Rp 700k – 1.5M / day' },
  { id: 4, label: 'Signature',  hint: 'Above Rp 1.5M / day' },
]

// Sample day used in the results placeholder so the layout "feels real"
const SAMPLE_DAY = {
  day: 1,
  title: 'Heritage morning, urban afternoon',
  items: [
    { time: '08:30', duration: '90 min', title: 'Klenteng Hok Lay Kiong',        kicker: 'Heritage · Bekasi Timur', reason: 'Best light for the courtyard photos and quietest crowd of the day.' },
    { time: '10:30', duration: '45 min', title: 'Warung Kopi Aroma',              kicker: 'Coffee · Bekasi Timur',  reason: 'Peranakan-style breakfast that matches the temple visit.' },
    { time: '12:00', duration: '75 min', title: 'Gedung Juang 45',                kicker: 'Museum · Tambun',       reason: 'A curated pause before the mid-day heat.' },
    { time: '14:30', duration: '2 hrs',  title: 'Summarecon Mall Bekasi',         kicker: 'Urban · Bekasi Utara',  reason: 'Cool-off, late lunch, and the Piramida photo op.' },
    { time: '18:00', duration: '90 min', title: 'Alun-Alun Bekasi — sunset walk', kicker: 'Sunset · Bekasi Timur', reason: 'Golden hour ends the day on a high note.' },
  ],
}

// -----------------------------------------------------------------------------
// Main shell
// -----------------------------------------------------------------------------
export default function PlannerShell() {
  const [phase, setPhase] = useState('input')  // 'input' | 'generating' | 'ready'
  const [form, setForm]   = useState({
    days: 1,
    style: 'mixed',
    partySize: 2,
    withKids: false,
    budget: 2,
    startDate: '',
    interests: [],
  })
  const [messages, setMessages] = useState([])
  const [chatInput, setChatInput] = useState('')

  const set = (patch) => setForm((s) => ({ ...s, ...patch }))

  const generate = () => {
    setPhase('generating')
    // Simulated latency — real generation lands in a follow-up prompt (Gemini wire).
    setTimeout(() => setPhase('ready'), 1200)
  }

  const resetPlan = () => {
    setPhase('input')
    setMessages([])
  }

  const sendMessage = () => {
    if (!chatInput.trim()) return
    const userMsg = { role: 'user', content: chatInput.trim(), id: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setChatInput('')
    // Placeholder assistant response
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        id: Date.now() + 1,
        content: 'Got it — I’ll adjust the plan. Refinement engine lands in the next prompt (Gemini wire).',
      }])
    }, 700)
  }

  return (
    <div className="space-y-6">
      <PlannerHero />

      {phase === 'input' && (
        <PlannerFormModule
          initial={{
            duration: form.days,
            style: form.style,
            interests: form.interests,
            budget: form.budget,
            familyMode: form.withKids,
          }}
          onGenerate={(next) => {
            setForm({
              days: next.duration,
              style: next.style,
              partySize: form.partySize,
              withKids: next.familyMode,
              budget: next.budget,
              startDate: form.startDate,
              interests: next.interests,
              startingPoint: next.startingPoint,
              environment: next.environment,
            })
            generate()
          }}
        />
      )}

      {phase === 'generating' && <PlannerGenerating form={form} />}

      {phase === 'ready' && (
        <PlannerReady
          form={form}
          messages={messages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          onSend={sendMessage}
          onReset={resetPlan}
        />
      )}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Hero
// -----------------------------------------------------------------------------
function PlannerHero() {
  return (
    <section className="container">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] items-end">
        <div>
          <div className="eyebrow eyebrow-dot text-bekasi-gold-600">Chapter 06 · Smart Trip Planner</div>
          <h1 className="mt-4 heading-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-tight text-bekasi-emerald-900">
            Your city co-pilot,<br />tuned for Bekasi.
          </h1>
          <p className="mt-5 body-lg text-bekasi-ink/75 max-w-2xl">
            Tell us your style, days, and party size. We compose a plan across 24 destinations, 13 events,
            and the F&amp;B directory — and let you refine it in conversation.
          </p>
        </div>
        <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white p-5 space-y-3">
          <div className="eyebrow text-bekasi-gold-600">How it works</div>
          <ul className="space-y-2 text-[13px] text-bekasi-ink/75">
            <Step n="1" title="Set the shape"  text="Days, style, party, budget, interests." />
            <Step n="2" title="See the plan"    text="A day-by-day itinerary with a live map." />
            <Step n="3" title="Refine, refine"  text="Chat with the planner to swap stops or tighten timing." />
            <Step n="4" title="Save or share"   text="Download as PDF or share a public link." />
          </ul>
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, text }) {
  return (
    <li className="flex gap-3">
      <span className="h-5 w-5 shrink-0 rounded-full bg-bekasi-emerald-900 text-white text-[10px] font-semibold inline-flex items-center justify-center">{n}</span>
      <div>
        <div className="font-medium text-bekasi-emerald-900">{title}</div>
        <div className="text-bekasi-ink/60">{text}</div>
      </div>
    </li>
  )
}

// -----------------------------------------------------------------------------
// Initial form
// -----------------------------------------------------------------------------
function PlannerForm({ form, set, onGenerate }) {
  const toggleInterest = (i) => {
    const has = form.interests.includes(i)
    set({ interests: has ? form.interests.filter((x) => x !== i) : [...form.interests, i] })
  }
  return (
    <section className="container">
      <div className="rounded-2xl bg-white border border-bekasi-emerald-900/8 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-bekasi-emerald-900/8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="eyebrow text-bekasi-gold-600">Step 1 · Build the shape</div>
            <h2 className="font-sans font-semibold text-xl text-bekasi-emerald-900 mt-0.5">Tell BekasiGo about your trip.</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-bekasi-emerald-900/8 text-bekasi-emerald-900 px-3 py-1.5 text-[11.5px] font-medium">
            <Sparkles className="h-3.5 w-3.5" /> Powered by AI (Gemini)
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 p-6">
          {/* Left column */}
          <div className="space-y-6">
            <FieldGroup label="How many days?" icon={CalIcon}>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <PillBtn key={n} active={form.days === n} onClick={() => set({ days: n })}>
                    {n} {n === 1 ? 'day' : 'days'}
                  </PillBtn>
                ))}
              </div>
            </FieldGroup>

            <FieldGroup label="Travel style" icon={Compass}>
              <div className="grid gap-2 sm:grid-cols-2">
                {TRAVEL_STYLES.map((s) => {
                  const Icon = s.icon
                  const active = form.style === s.id
                  return (
                    <button key={s.id} type="button" onClick={() => set({ style: s.id })}
                      className={cn('text-left rounded-lg border p-3 flex gap-3 items-start transition-colors',
                        active ? 'border-bekasi-emerald-900 bg-bekasi-emerald-900/[0.04]' : 'border-bekasi-emerald-900/10 hover:border-bekasi-emerald-900/25')}>
                      <span className={cn('h-8 w-8 rounded-md inline-flex items-center justify-center shrink-0',
                        active ? 'bg-bekasi-emerald-900 text-white' : 'bg-bekasi-cream text-bekasi-emerald-700')}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium text-[13.5px] text-bekasi-emerald-900">{s.label}</div>
                        <div className="text-[11.5px] text-bekasi-ink/55 mt-0.5">{s.description}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </FieldGroup>

            <FieldGroup label="Start date" icon={CalIcon} optional>
              <input type="date" value={form.startDate} onChange={(e) => set({ startDate: e.target.value })}
                className="h-11 w-full rounded-md border border-bekasi-emerald-900/15 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500" />
            </FieldGroup>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <FieldGroup label="Party size" icon={Users}>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => set({ partySize: Math.max(1, form.partySize - 1) })}
                  className="h-10 w-10 rounded-md border border-bekasi-emerald-900/15 hover:bg-bekasi-cream text-lg">–</button>
                <div className="h-10 min-w-[64px] rounded-md bg-bekasi-cream inline-flex items-center justify-center font-sans font-semibold text-lg text-bekasi-emerald-900">{form.partySize}</div>
                <button type="button" onClick={() => set({ partySize: Math.min(20, form.partySize + 1) })}
                  className="h-10 w-10 rounded-md border border-bekasi-emerald-900/15 hover:bg-bekasi-cream text-lg">+</button>
                <label className="ml-4 inline-flex items-center gap-2 text-[13px] text-bekasi-ink/75 cursor-pointer">
                  <input type="checkbox" checked={form.withKids} onChange={(e) => set({ withKids: e.target.checked })}
                    className="h-4 w-4 rounded border-bekasi-emerald-900/25 text-bekasi-emerald-900 focus:ring-bekasi-emerald-500/30" />
                  <Baby className="h-3.5 w-3.5" /> Traveling with kids
                </label>
              </div>
            </FieldGroup>

            <FieldGroup label="Budget level" icon={Wallet}>
              <div className="grid grid-cols-2 gap-2">
                {BUDGET_LEVELS.map((b) => {
                  const active = form.budget === b.id
                  return (
                    <button key={b.id} type="button" onClick={() => set({ budget: b.id })}
                      className={cn('text-left rounded-lg border p-3 transition-colors',
                        active ? 'border-bekasi-emerald-900 bg-bekasi-emerald-900/[0.04]' : 'border-bekasi-emerald-900/10 hover:border-bekasi-emerald-900/25')}>
                      <div className="font-medium text-[13.5px] text-bekasi-emerald-900">{b.label}</div>
                      <div className="text-[11.5px] text-bekasi-ink/55 mt-0.5">{b.hint}</div>
                    </button>
                  )
                })}
              </div>
            </FieldGroup>

            <FieldGroup label="Interests" icon={Star} optional>
              <div className="flex flex-wrap gap-1.5">
                {INTERESTS.map((i) => {
                  const on = form.interests.includes(i)
                  return (
                    <button key={i} type="button" onClick={() => toggleInterest(i)}
                      className={cn('rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors border',
                        on
                          ? 'bg-bekasi-emerald-900 text-white border-bekasi-emerald-900'
                          : 'bg-white text-bekasi-ink/70 border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30')}>
                      {on && <span className="mr-1">✓</span>}{i}
                    </button>
                  )
                })}
              </div>
            </FieldGroup>
          </div>
        </div>

        <div className="px-6 py-4 bg-bekasi-cream/60 border-t border-bekasi-emerald-900/8 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[12.5px] text-bekasi-ink/60">
            The plan is generated from your inputs — refine it in conversation after.
          </div>
          <Button onClick={onGenerate}
            className="h-11 rounded-md bg-bekasi-gold-500 hover:bg-bekasi-gold-600 text-bekasi-emerald-900 px-6 gap-2 font-semibold shadow-sm">
            <Sparkles className="h-4 w-4" /> Generate my plan <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function FieldGroup({ label, icon: Icon, optional, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bekasi-ink/55">
        {Icon && <Icon className="h-3.5 w-3.5" />} {label}
        {optional && <span className="ml-1 text-[10px] text-bekasi-ink/40 normal-case tracking-normal">optional</span>}
      </div>
      {children}
    </div>
  )
}

function PillBtn({ children, active, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={cn('h-10 rounded-md border px-4 text-[13px] font-medium transition-colors',
        active
          ? 'bg-bekasi-emerald-900 text-white border-bekasi-emerald-900'
          : 'bg-white text-bekasi-ink/75 border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30')}>
      {children}
    </button>
  )
}

// -----------------------------------------------------------------------------
// Generating (skeleton loader)
// -----------------------------------------------------------------------------
function PlannerGenerating({ form }) {
  return (
    <section className="container">
      <div className="rounded-2xl bg-white border border-bekasi-emerald-900/8 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-bekasi-emerald-900/8 text-bekasi-emerald-800 inline-flex items-center justify-center">
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}>
              <Sparkles className="h-5 w-5" />
            </motion.span>
          </div>
          <div>
            <div className="font-sans font-semibold text-lg text-bekasi-emerald-900">Composing your {form.days}-day plan…</div>
            <div className="text-[13px] text-bekasi-ink/60">Ranking destinations by planner priority and your interests.</div>
          </div>
        </div>
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="animate-pulse rounded-lg border border-bekasi-emerald-900/8 p-4 flex gap-4">
              <div className="h-16 w-24 rounded-md bg-bekasi-cream" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-bekasi-cream rounded" />
                <div className="h-4 w-3/5 bg-bekasi-cream rounded" />
                <div className="h-3 w-2/5 bg-bekasi-cream rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// -----------------------------------------------------------------------------
// Ready state (2-column: itinerary + chat on left, map on right, actions on top)
// -----------------------------------------------------------------------------
function PlannerReady({ form, messages, chatInput, setChatInput, onSend, onReset }) {
  return (
    <div className="container space-y-4">
      <ActionBar form={form} onReset={onReset} />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-4">
          <ItinerarySection />
          <RefineChat messages={messages} chatInput={chatInput} setChatInput={setChatInput} onSend={onSend} />
        </div>
        <div className="space-y-4 lg:sticky lg:top-28 self-start">
          <MapPanel />
          <SaveActions />
        </div>
      </div>
    </div>
  )
}

function ActionBar({ form, onReset }) {
  return (
    <div className="rounded-xl bg-white border border-bekasi-emerald-900/8 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="eyebrow text-bekasi-gold-600">Your plan</div>
        <h2 className="font-sans font-semibold text-lg text-bekasi-emerald-900 mt-0.5">
          A {form.days}-day <span className="capitalize">{form.style}</span> journey through Bekasi.
        </h2>
        <div className="mt-1 text-[12.5px] text-bekasi-ink/60">
          Party of {form.partySize}{form.withKids && ' · with kids'} · budget {['Cozy','Balanced','Elevated','Signature'][form.budget - 1]}
          {form.interests.length > 0 && ` · ${form.interests.length} interest${form.interests.length === 1 ? '' : 's'}`}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onReset} className="h-10 rounded-md border border-bekasi-emerald-900/15 hover:bg-bekasi-cream px-4 text-[13px] font-medium text-bekasi-emerald-900 inline-flex items-center gap-2">
          <RefreshCcw className="h-3.5 w-3.5" /> Start over
        </button>
      </div>
    </div>
  )
}

function ItinerarySection() {
  return (
    <div className="rounded-xl bg-white border border-bekasi-emerald-900/8 overflow-hidden">
      <div className="px-5 py-3 border-b border-bekasi-emerald-900/8 flex items-center justify-between">
        <div>
          <div className="eyebrow text-bekasi-gold-600">Day {SAMPLE_DAY.day}</div>
          <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900">{SAMPLE_DAY.title}</div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11.5px] text-bekasi-ink/55"><Clock className="h-3 w-3" /> ~ 6–8 hrs</span>
      </div>
      <div className="divide-y divide-bekasi-emerald-900/6">
        {SAMPLE_DAY.items.map((it, i) => (
          <div key={i} className="px-5 py-4 flex gap-4 hover:bg-bekasi-cream/40">
            <div className="shrink-0 w-16">
              <div className="font-sans font-semibold text-bekasi-emerald-900 text-[15px]">{it.time}</div>
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/50 mt-0.5">{it.duration}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-bekasi-emerald-900">{it.title}</div>
              <div className="text-[11.5px] uppercase tracking-[0.18em] text-bekasi-gold-600 mt-0.5">{it.kicker}</div>
              <div className="mt-1.5 flex items-start gap-1.5 text-[12.5px] text-bekasi-ink/70">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-bekasi-gold-500 mt-0.5" />
                <p>{it.reason}</p>
              </div>
            </div>
            <button className="self-start text-bekasi-ink/40 hover:text-bekasi-emerald-900" title="Details">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 bg-bekasi-cream/50 border-t border-bekasi-emerald-900/8 text-[11.5px] text-bekasi-ink/55 text-center">
        Additional days will appear here once the Gemini engine is wired.
      </div>
    </div>
  )
}

function RefineChat({ messages, chatInput, setChatInput, onSend }) {
  return (
    <div className="rounded-xl bg-white border border-bekasi-emerald-900/8 overflow-hidden">
      <div className="px-5 py-3 border-b border-bekasi-emerald-900/8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-md bg-bekasi-emerald-900 text-white inline-flex items-center justify-center">
            <MessageCircle className="h-4 w-4" />
          </span>
          <div>
            <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900">Refine in conversation</div>
            <div className="text-[11.5px] text-bekasi-ink/55">Swap stops, tighten timing, add cravings.</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-bekasi-emerald-900/8 text-bekasi-emerald-900 px-2 py-0.5 text-[10.5px] uppercase tracking-[0.18em] font-medium">
          <Sparkles className="h-3 w-3" /> Gemini stub
        </span>
      </div>

      <div className="px-5 py-4 min-h-[220px] space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-[13px] text-bekasi-ink/55 space-y-3">
            <MessageCircle className="h-6 w-6 mx-auto opacity-40" />
            <p>Try: <em>“Replace Summarecon with somewhere quieter”</em> or <em>“Add a Peranakan lunch spot near the temple.”</em></p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={cn('max-w-[85%] rounded-lg px-3 py-2 text-[13px]',
                  m.role === 'user'
                    ? 'ml-auto bg-bekasi-emerald-900 text-white'
                    : 'bg-bekasi-cream text-bekasi-ink')}>
                {m.content}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSend() }}
        className="px-5 py-3 border-t border-bekasi-emerald-900/8 flex items-center gap-2 bg-bekasi-cream/40">
        <input value={chatInput} onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask the planner to swap, add, or shorten anything…"
          className="flex-1 min-w-0 h-10 rounded-md border border-bekasi-emerald-900/15 bg-white px-3 text-sm text-bekasi-ink placeholder:text-bekasi-ink/40 focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500" />
        <button type="submit" className="h-10 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 text-[13px] font-medium inline-flex items-center gap-1.5">
          <Send className="h-3.5 w-3.5" /> Send
        </button>
      </form>
    </div>
  )
}

function MapPanel() {
  return (
    <div className="rounded-xl bg-white border border-bekasi-emerald-900/8 overflow-hidden">
      <div className="px-5 py-3 border-b border-bekasi-emerald-900/8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-md bg-bekasi-emerald-900/8 text-bekasi-emerald-800 inline-flex items-center justify-center">
            <MapPin className="h-4 w-4" />
          </span>
          <div>
            <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900">Live route</div>
            <div className="text-[11.5px] text-bekasi-ink/55">{SAMPLE_DAY.items.length} stops · day {SAMPLE_DAY.day}</div>
          </div>
        </div>
        <button className="text-[11.5px] text-bekasi-ink/55 hover:text-bekasi-emerald-900 uppercase tracking-[0.18em]">Expand</button>
      </div>
      <div className="relative aspect-[4/3] bg-gradient-to-br from-bekasi-emerald-900/80 via-bekasi-emerald-900 to-bekasi-emerald-800 overflow-hidden">
        {/* Mock grid pattern to hint at a map surface */}
        <div className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        {/* Fake route */}
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          <path d="M 60 240 L 130 200 L 200 220 L 260 150 L 320 180 L 350 90"
            stroke="#E1B547" strokeWidth="2.5" strokeDasharray="4 6" fill="none" strokeLinecap="round" />
          {[{ x: 60, y: 240 }, { x: 130, y: 200 }, { x: 200, y: 220 }, { x: 260, y: 150 }, { x: 320, y: 180 }, { x: 350, y: 90 }].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="6" fill="#E1B547" />
              <text x={p.x} y={p.y + 3.5} textAnchor="middle" fill="#0B3D3A" fontSize="9" fontWeight="700">{i + 1}</text>
            </g>
          ))}
        </svg>
        <div className="absolute bottom-3 left-3 right-3 rounded-md bg-black/40 backdrop-blur-sm px-3 py-2 text-[11.5px] text-white/85">
          Interactive Google Map lands with E-34 (Google Maps API + directions).
        </div>
      </div>
    </div>
  )
}

function SaveActions() {
  return (
    <div className="rounded-xl bg-white border border-bekasi-emerald-900/8 overflow-hidden">
      <div className="px-5 py-3 border-b border-bekasi-emerald-900/8">
        <div className="eyebrow text-bekasi-gold-600">Keep this plan</div>
        <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900">Save, download, or share</div>
      </div>
      <div className="p-5 space-y-2">
        <ActionRow icon={Bookmark}  label="Save to my account"      hint="Requires sign-in · lands with auth" />
        <ActionRow icon={Download}  label="Download as PDF"          hint="Print-friendly one-pager" />
        <ActionRow icon={Share2}    label="Share public link"        hint="Read-only URL, no login" />
      </div>
    </div>
  )
}

function ActionRow({ icon: Icon, label, hint }) {
  return (
    <button className="w-full text-left rounded-lg border border-bekasi-emerald-900/8 hover:border-bekasi-emerald-900/25 hover:bg-bekasi-cream px-3 py-3 flex items-center gap-3 transition-colors">
      <span className="h-9 w-9 rounded-md bg-bekasi-emerald-900/8 text-bekasi-emerald-800 inline-flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-medium text-[13px] text-bekasi-emerald-900 truncate">{label}</div>
        <div className="text-[11px] text-bekasi-ink/55 truncate">{hint}</div>
      </div>
      <ChevronRight className="h-3.5 w-3.5 text-bekasi-ink/40" />
    </button>
  )
}
