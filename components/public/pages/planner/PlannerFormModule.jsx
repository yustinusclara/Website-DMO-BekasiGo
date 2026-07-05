'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, ArrowLeft, ArrowRight, Compass, MapPin, Users, Baby,
  Wallet, Star, Home, Trees, Circle, Check,
  Landmark, UtensilsCrossed, Moon, TreePine, Building2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const DURATIONS = [
  { id: 1, label: 'Half day',   hint: '4–6 hrs' },
  { id: 2, label: '1 day',      hint: 'Morning → sunset' },
  { id: 3, label: '2 days',     hint: 'Weekend trip' },
  { id: 4, label: '3 days',     hint: 'Long weekend' },
  { id: 5, label: '4+ days',    hint: 'Deep dive' },
]

const STYLES = [
  { id: 'heritage',  label: 'Heritage',   icon: Landmark },
  { id: 'family',    label: 'Family',     icon: Users },
  { id: 'foodie',    label: 'Foodie',     icon: UtensilsCrossed },
  { id: 'nightlife', label: 'Nightlife',  icon: Moon },
  { id: 'nature',    label: 'Nature',     icon: TreePine },
  { id: 'shopping',  label: 'Shopping',   icon: Building2 },
  { id: 'mixed',     label: 'A mix',      icon: Compass },
]

const INTERESTS = [
  'Peranakan heritage', 'Sundanese ritual', 'Craft coffee', 'Weekend markets',
  'Street food', 'Instagrammable', 'Family + kids', 'Quiet nature',
  'Modern architecture', 'Sunset views', 'Live music', 'Museums',
]

const BUDGETS = [
  { id: 1, label: 'Cozy',      hint: '< Rp 300k/day' },
  { id: 2, label: 'Balanced',  hint: 'Rp 300k–700k' },
  { id: 3, label: 'Elevated',  hint: 'Rp 700k–1.5M' },
  { id: 4, label: 'Signature', hint: '> Rp 1.5M/day' },
]

const START_POINTS = [
  { id: 'stasiun_bekasi',        label: 'Stasiun Bekasi',        hint: 'KRL Commuter · Bekasi Timur' },
  { id: 'lrt_bekasi_timur',      label: 'LRT Bekasi Timur',      hint: 'LRT Jabodebek · Bekasi Timur' },
  { id: 'summarecon',            label: 'Summarecon Mall',       hint: 'Bekasi Utara' },
  { id: 'grand_metropolitan',    label: 'Grand Metropolitan',    hint: 'Pekayon · Bekasi Selatan' },
  { id: 'alun_alun',             label: 'Alun-Alun Bekasi',      hint: 'City centre · Bekasi Timur' },
  { id: 'jakarta',               label: "I'm coming from Jakarta", hint: 'Start from a Jakarta connector' },
  { id: 'anywhere',              label: "Surprise me",            hint: 'Let BekasiGo pick a start' },
]

const ENV_MODES = [
  { id: 'any',     label: 'Any',            icon: Circle,  description: 'Mix indoor and outdoor.' },
  { id: 'indoor',  label: 'Prefer indoor',  icon: Home,    description: 'Rainy day, air-conditioned, museums.' },
  { id: 'outdoor', label: 'Prefer outdoor', icon: Trees,   description: 'Parks, walking, open-air markets.' },
]

const DEFAULTS = {
  duration: 2,
  style: 'mixed',
  interests: [],
  budget: 2,
  startingPoint: 'stasiun_bekasi',
  familyMode: false,
  environment: 'any',
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------
export default function PlannerFormModule({ initial, onGenerate }) {
  const [state, setState] = useState({ ...DEFAULTS, ...(initial ?? {}) })
  const [step, setStep]   = useState(0)   // 0..2

  const set   = (patch) => setState((s) => ({ ...s, ...patch }))
  const toggleInterest = (i) => set({
    interests: state.interests.includes(i)
      ? state.interests.filter((x) => x !== i)
      : [...state.interests, i],
  })

  const STEPS = [
    { id: 'basics',    label: 'Basics',    hint: 'Duration & style'   },
    { id: 'interests', label: 'Interests', hint: 'What excites you'   },
    { id: 'fine',      label: 'Fine-tune', hint: 'Budget · start · extras' },
  ]

  // Per-step validators — determine if Next/Generate is enabled
  const stepValid = [
    Boolean(state.duration && state.style),
    true, // interests optional
    Boolean(state.budget && state.startingPoint),
  ]

  const goNext = () => (step < STEPS.length - 1 ? setStep(step + 1) : onGenerate?.(state))
  const goBack = () => step > 0 && setStep(step - 1)

  return (
    <section className="container">
      <div className="rounded-2xl bg-white border border-bekasi-emerald-900/8 shadow-sm overflow-hidden">
        {/* Header + progress */}
        <div className="px-5 md:px-7 pt-6 pb-4 border-b border-bekasi-emerald-900/8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="eyebrow text-bekasi-gold-600">Step {step + 1} of {STEPS.length} · {STEPS[step].hint}</div>
              <h2 className="mt-1 font-sans font-semibold text-xl md:text-2xl text-bekasi-emerald-900">
                {step === 0 && 'How should we shape your trip?'}
                {step === 1 && 'Pick the moments that excite you.'}
                {step === 2 && 'Almost there — a few final touches.'}
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-bekasi-emerald-900/8 text-bekasi-emerald-900 px-3 py-1.5 text-[11.5px] font-medium">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-2">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={cn(
                  'group flex-1 text-left transition-opacity',
                  i > step && 'cursor-not-allowed',
                )}
              >
                <div className={cn(
                  'h-1.5 rounded-full transition-colors',
                  i < step  && 'bg-bekasi-emerald-900',
                  i === step && 'bg-bekasi-gold-500',
                  i > step  && 'bg-bekasi-emerald-900/10',
                )} />
                <div className="mt-2 flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.22em]">
                  <span className={cn(
                    'inline-flex items-center justify-center h-4 w-4 rounded-full text-[9.5px] font-semibold',
                    i < step  && 'bg-bekasi-emerald-900 text-white',
                    i === step && 'bg-bekasi-gold-500 text-bekasi-emerald-900',
                    i > step  && 'bg-bekasi-emerald-900/8 text-bekasi-ink/45',
                  )}>
                    {i < step ? <Check className="h-2.5 w-2.5" /> : i + 1}
                  </span>
                  <span className={cn(
                    i <= step ? 'text-bekasi-ink/70' : 'text-bekasi-ink/35',
                  )}>{s.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="px-5 md:px-7 py-6 min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
              className="space-y-8"
            >
              {step === 0 && (
                <>
                  <FieldGroup label="How long do you have?" icon={MapPin}>
                    <div className="flex flex-wrap gap-2">
                      {DURATIONS.map((d) => (
                        <Pill key={d.id} active={state.duration === d.id} onClick={() => set({ duration: d.id })}>
                          <div className="text-left">
                            <div className="text-[13px] font-medium">{d.label}</div>
                            <div className={cn('text-[10.5px] uppercase tracking-[0.16em] mt-0.5',
                              state.duration === d.id ? 'text-white/70' : 'text-bekasi-ink/45')}>{d.hint}</div>
                          </div>
                        </Pill>
                      ))}
                    </div>
                  </FieldGroup>

                  <FieldGroup label="Travel style" icon={Compass}>
                    <div className="flex flex-wrap gap-2">
                      {STYLES.map((s) => {
                        const Icon = s.icon
                        const active = state.style === s.id
                        return (
                          <Pill key={s.id} active={active} onClick={() => set({ style: s.id })}>
                            <span className="inline-flex items-center gap-2">
                              <Icon className="h-3.5 w-3.5" />
                              <span className="text-[13px] font-medium">{s.label}</span>
                            </span>
                          </Pill>
                        )
                      })}
                    </div>
                  </FieldGroup>
                </>
              )}

              {step === 1 && (
                <>
                  <FieldGroup label={`Pick as many as you like (${state.interests.length}/12)`} icon={Star}>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((i) => (
                        <Pill key={i} active={state.interests.includes(i)} onClick={() => toggleInterest(i)}>
                          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium">
                            {state.interests.includes(i) && <Check className="h-3 w-3" />}
                            {i}
                          </span>
                        </Pill>
                      ))}
                    </div>
                    <p className="mt-3 text-[12px] text-bekasi-ink/55">
                      Skip if you want BekasiGo to surprise you — the AI will pick based on your travel style.
                    </p>
                  </FieldGroup>
                </>
              )}

              {step === 2 && (
                <>
                  <FieldGroup label="Budget level" icon={Wallet}>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <Pill key={b.id} active={state.budget === b.id} onClick={() => set({ budget: b.id })}>
                          <div className="text-left">
                            <div className="text-[13px] font-medium">{b.label}</div>
                            <div className={cn('text-[10.5px] uppercase tracking-[0.16em] mt-0.5',
                              state.budget === b.id ? 'text-white/70' : 'text-bekasi-ink/45')}>{b.hint}</div>
                          </div>
                        </Pill>
                      ))}
                    </div>
                  </FieldGroup>

                  <FieldGroup label="Starting point" icon={MapPin}>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {START_POINTS.map((sp) => {
                        const active = state.startingPoint === sp.id
                        return (
                          <button key={sp.id} type="button" onClick={() => set({ startingPoint: sp.id })}
                            className={cn(
                              'text-left rounded-lg border p-3 transition-colors flex items-start gap-3',
                              active
                                ? 'border-bekasi-emerald-900 bg-bekasi-emerald-900/[0.04]'
                                : 'border-bekasi-emerald-900/10 hover:border-bekasi-emerald-900/25')}>
                            <span className={cn(
                              'h-8 w-8 rounded-md inline-flex items-center justify-center shrink-0',
                              active ? 'bg-bekasi-emerald-900 text-white' : 'bg-bekasi-cream text-bekasi-emerald-700')}>
                              <MapPin className="h-3.5 w-3.5" />
                            </span>
                            <div className="min-w-0">
                              <div className="font-medium text-[13.5px] text-bekasi-emerald-900">{sp.label}</div>
                              <div className="text-[11.5px] text-bekasi-ink/55 mt-0.5">{sp.hint}</div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </FieldGroup>

                  {/* Optional pair — kept in one visual row on desktop, stacked on mobile */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <FieldGroup label="Family mode" icon={Baby} optional>
                      <button type="button" onClick={() => set({ familyMode: !state.familyMode })}
                        className={cn(
                          'w-full rounded-lg border p-3 flex items-center justify-between gap-3 text-left transition-colors',
                          state.familyMode
                            ? 'border-bekasi-emerald-900 bg-bekasi-emerald-900/[0.04]'
                            : 'border-bekasi-emerald-900/10 hover:border-bekasi-emerald-900/25')}>
                        <div className="min-w-0">
                          <div className="font-medium text-[13.5px] text-bekasi-emerald-900">Traveling with kids</div>
                          <div className="text-[11.5px] text-bekasi-ink/55 mt-0.5">Prioritises safer, kid-friendly stops with breaks.</div>
                        </div>
                        <span className={cn(
                          'relative h-6 w-11 rounded-full transition-colors shrink-0',
                          state.familyMode ? 'bg-bekasi-emerald-900' : 'bg-bekasi-emerald-900/15',
                        )}>
                          <span className={cn(
                            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
                            state.familyMode ? 'left-[22px]' : 'left-0.5',
                          )} />
                        </span>
                      </button>
                    </FieldGroup>

                    <FieldGroup label="Environment preference" icon={Trees} optional>
                      <div className="flex flex-wrap gap-2">
                        {ENV_MODES.map((m) => {
                          const Icon = m.icon
                          const active = state.environment === m.id
                          return (
                            <Pill key={m.id} active={active} onClick={() => set({ environment: m.id })}>
                              <span className="inline-flex items-center gap-2">
                                <Icon className="h-3.5 w-3.5" />
                                <span className="text-[13px] font-medium">{m.label}</span>
                              </span>
                            </Pill>
                          )
                        })}
                      </div>
                    </FieldGroup>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        <div className="px-5 md:px-7 py-4 bg-bekasi-cream/60 border-t border-bekasi-emerald-900/8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className={cn(
              'h-11 rounded-md px-4 text-[13px] font-medium inline-flex items-center gap-2 transition-colors',
              step === 0
                ? 'text-bekasi-ink/30 cursor-not-allowed'
                : 'text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06]',
            )}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {/* Live summary chip on desktop */}
          <div className="hidden md:flex items-center gap-2 text-[11.5px] text-bekasi-ink/55">
            {state.duration && <SummaryChip>{DURATIONS.find((d) => d.id === state.duration)?.label}</SummaryChip>}
            {state.style    && <SummaryChip>{STYLES.find((s) => s.id === state.style)?.label}</SummaryChip>}
            {state.interests.length > 0 && <SummaryChip>{state.interests.length} interest{state.interests.length === 1 ? '' : 's'}</SummaryChip>}
            {step >= 2 && <SummaryChip>{BUDGETS.find((b) => b.id === state.budget)?.label}</SummaryChip>}
          </div>

          <Button
            onClick={goNext}
            disabled={!stepValid[step]}
            className={cn(
              'h-11 rounded-md px-6 gap-2 font-semibold shadow-sm',
              step === STEPS.length - 1
                ? 'bg-bekasi-gold-500 hover:bg-bekasi-gold-600 text-bekasi-emerald-900'
                : 'bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white',
              !stepValid[step] && 'opacity-50 cursor-not-allowed',
            )}
          >
            {step === STEPS.length - 1
              ? <><Sparkles className="h-4 w-4" /> Generate my plan <ArrowRight className="h-4 w-4" /></>
              : <>Continue <ArrowRight className="h-4 w-4" /></>}
          </Button>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Small reusable UI
// ---------------------------------------------------------------------------
function FieldGroup({ label, icon: Icon, optional, children }) {
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bekasi-ink/55">
        {Icon && <Icon className="h-3.5 w-3.5" />} {label}
        {optional && <span className="ml-1 text-[10px] text-bekasi-ink/40 normal-case tracking-normal">optional</span>}
      </div>
      {children}
    </div>
  )
}

function Pill({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3.5 py-2 transition-colors min-h-[40px]',
        active
          ? 'bg-bekasi-emerald-900 text-white border-bekasi-emerald-900'
          : 'bg-white text-bekasi-ink/80 border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30',
      )}
    >
      {children}
    </button>
  )
}

function SummaryChip({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white border border-bekasi-emerald-900/10 text-bekasi-ink/75 px-2.5 py-1 text-[11px] font-medium">
      {children}
    </span>
  )
}
