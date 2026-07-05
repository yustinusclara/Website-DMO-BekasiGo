'use client'

import Link from 'next/link'
import { ArrowUpRight, Sparkles, Sun, MapPin, Search, ChevronRight, Check } from 'lucide-react'
import Eyebrow from '@/components/shared/Eyebrow'
import Pill from '@/components/shared/Pill'
import Tag from '@/components/shared/Tag'
import Surface from '@/components/shared/Surface'
import Stat from '@/components/shared/Stat'
import tokens from '@/lib/design/tokens'

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-bekasi-cream text-bekasi-ink">
      {/* Header strip */}
      <div className="gradient-emerald text-white">
        <div className="container py-16 md:py-24">
          <Link href="/" className="eyebrow eyebrow-dot text-bekasi-gold-400 hover:text-white">← Back to BekasiGo</Link>
          <h1 className="mt-6 heading-display text-display-xl text-balance max-w-3xl">
            The BekasiGo Design System.
          </h1>
          <p className="mt-6 text-lg text-white/75 max-w-2xl">
            A reusable visual foundation for the public site, the CMS, the Smart Planner, and the Explore Map — tuned for an East-Asian DMO aesthetic with a smart-city and heritage contrast.
          </p>
        </div>
      </div>

      {/* Contents */}
      <div className="container py-14 md:py-20 grid gap-14 md:gap-20">

        {/* COLORS */}
        <DsBlock number="01" title="Color System" kicker="Deep emerald anchors the brand. Warm gold acts as the accent. Cream is the editorial ground.">
          <div className="grid gap-8">
            <SwatchScale name="Emerald" scale={tokens.colors.emerald} anchorKey={800} />
            <SwatchScale name="Gold"    scale={tokens.colors.gold}    anchorKey={500} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Swatch name="Cream" hex={tokens.colors.cream} />
              <Swatch name="Sand"  hex={tokens.colors.sand} />
              <Swatch name="Coral" hex={tokens.colors.coral} light />
              <Swatch name="Sky"   hex={tokens.colors.sky}   light />
            </div>
            <div>
              <h3 className="heading-4 mb-3">Category Tokens</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(tokens.categories).map((k) => (
                  <Tag key={k} category={k} variant="chip" />
                ))}
              </div>
            </div>
          </div>
        </DsBlock>

        {/* TYPOGRAPHY */}
        <DsBlock number="02" title="Typography" kicker="Playfair Display for editorial headlines. Inter for everything else. Mono for coordinates and metadata.">
          <div className="space-y-6">
            <TypeRow label="heading-1 / display-xl" cls="heading-1">A city that remembers.</TypeRow>
            <TypeRow label="heading-2 / display-lg" cls="heading-2">Where heritage meets skyline.</TypeRow>
            <TypeRow label="heading-3 / display-md" cls="heading-3">The signature of Bekasi.</TypeRow>
            <TypeRow label="heading-4 / display-sm" cls="heading-4">Featured icons of Bekasi.</TypeRow>
            <TypeRow label="body-lg"  cls="body-lg">The official destination guide to Kota Bekasi — discover heritage, urban lifestyle, and stories from the city.</TypeRow>
            <TypeRow label="body"     cls="body">A city that fuses centuries of Betawi, Sundanese and Peranakan roots with a future-facing smart-city skyline.</TypeRow>
            <TypeRow label="body-sm"  cls="body-sm text-bekasi-ink/70">Compact supporting copy used in cards, metadata rows, and captions.</TypeRow>
            <TypeRow label="eyebrow"  cls="eyebrow eyebrow-dot text-bekasi-emerald-700">Icons of Bekasi</TypeRow>
            <TypeRow label="mono"     cls="mono text-bekasi-ink/70">N 6°14′ · E 106°59′</TypeRow>
          </div>
        </DsBlock>

        {/* BUTTONS */}
        <DsBlock number="03" title="Buttons" kicker="Pill-shaped on the public site for premium feel. Squared on the CMS for density and clarity.">
          <div className="grid gap-8">
            <PreviewRow title="Public">
              <button className="btn-primary btn-md"><Sparkles className="h-4 w-4" /> Plan my trip</button>
              <button className="btn-secondary btn-md">Explore Bekasi</button>
              <button className="btn-outline btn-md text-bekasi-emerald-900">Learn more</button>
              <button className="btn-ghost btn-md">Ghost <ChevronRight className="h-4 w-4" /></button>
            </PreviewRow>
            <PreviewRow title="Public · Inverted (dark surfaces)" invert>
              <button className="btn-primary btn-md"><Sparkles className="h-4 w-4" /> Plan my trip</button>
              <button className="btn-outline-invert btn-md">Watch the film</button>
              <button className="btn-ghost-invert btn-md">Skip <ChevronRight className="h-4 w-4" /></button>
            </PreviewRow>
            <PreviewRow title="Sizes">
              <button className="btn-primary btn-sm">Small</button>
              <button className="btn-primary btn-md">Medium</button>
              <button className="btn-primary btn-lg">Large</button>
              <button className="btn-primary btn-xl">Extra large</button>
            </PreviewRow>
            <PreviewRow title="CMS">
              <button className="btn-cms">Publish</button>
              <button className="btn-cms-ghost">Save draft</button>
              <button className="btn-cms" disabled>Publishing…</button>
            </PreviewRow>
          </div>
        </DsBlock>

        {/* PILLS / CHIPS / TAGS */}
        <DsBlock number="04" title="Pills, Chips & Tags" kicker="Three tiers: pills for interactive filters, chips for labels, tags for categories with brand color.">
          <div className="grid gap-8">
            <PreviewRow title="Pills">
              <Pill variant="light">Heritage</Pill>
              <Pill variant="gold">Featured</Pill>
              <Pill variant="emerald">Smart Planner</Pill>
            </PreviewRow>
            <PreviewRow title="Pills · Inverted" invert>
              <Pill variant="dark">All</Pill>
              <Pill variant="dark">Heritage</Pill>
              <Pill variant="gold">Featured</Pill>
            </PreviewRow>
            <PreviewRow title="Chips">
              <span className="chip-light">01 / 06</span>
              <span className="chip-gold">Draft</span>
              <span className="chip-solid">Live</span>
            </PreviewRow>
            <PreviewRow title="Category Tags">
              <Tag category="heritage" />
              <Tag category="culinary" />
              <Tag category="urban" />
              <Tag category="nature" />
              <Tag category="events" />
              <Tag category="transit" />
            </PreviewRow>
            <PreviewRow title="Category Tags · Solid + Dot">
              <Tag category="heritage" variant="solid" />
              <Tag category="culinary" variant="solid" />
              <Tag category="urban"    variant="solid" />
              <span className="mx-3 opacity-30">|</span>
              <Tag category="heritage" variant="dot" />
              <Tag category="nature"   variant="dot" />
              <Tag category="transit"  variant="dot" />
            </PreviewRow>
          </div>
        </DsBlock>

        {/* CARDS / SURFACES */}
        <DsBlock number="05" title="Surfaces" kicker="Cards and panels that anchor everything: destinations, planner mocks, CMS tables.">
          <div className="grid md:grid-cols-3 gap-5">
            <Surface variant="default" padding="lg">
              <div className="chip-light">Default</div>
              <h4 className="heading-4 mt-3 text-bekasi-emerald-900">Standard card</h4>
              <p className="body-sm text-bekasi-ink/70 mt-2">Used across destination and story cards. Soft shadow. Cream ground.</p>
            </Surface>
            <Surface variant="elevated" padding="lg">
              <div className="chip-gold">Elevated</div>
              <h4 className="heading-4 mt-3 text-bekasi-emerald-900">Elevated card</h4>
              <p className="body-sm text-bekasi-ink/70 mt-2">CTA blocks, planner cards, feature panels.</p>
            </Surface>
            <Surface variant="cream" padding="lg">
              <div className="chip-light">Cream</div>
              <h4 className="heading-4 mt-3 text-bekasi-emerald-900">Editorial card</h4>
              <p className="body-sm text-bekasi-ink/70 mt-2">Editorial reads and secondary content blocks.</p>
            </Surface>
          </div>
          <div className="mt-5 gradient-emerald rounded-3xl p-5">
            <Surface variant="invert" padding="lg">
              <div className="chip-dark">Invert</div>
              <h4 className="heading-4 mt-3 text-white">Immersive card</h4>
              <p className="body-sm text-white/70 mt-2">Planner mock, hero overlays, dark section cards.</p>
            </Surface>
          </div>
        </DsBlock>

        {/* FORMS */}
        <DsBlock number="06" title="Form Inputs" kicker="Rounded on the public site (search, planner). Squared on the CMS.">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <span className="label-cms">Public · rounded search</span>
              <div className="relative mt-2">
                <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-bekasi-ink/40" />
                <input className="field-round pl-11" placeholder="Search destinations, events…" />
              </div>
            </div>
            <div>
              <span className="label-cms">Public · standard field</span>
              <input className="field mt-2" placeholder="Full name" />
              <p className="helper">Public site inputs share cream ground with subtle border.</p>
            </div>
            <div>
              <span className="label-cms">CMS field</span>
              <input className="field-cms mt-2" placeholder="Destination title" />
              <p className="helper">Denser, squared, focused on editing.</p>
            </div>
          </div>
          <div className="mt-6 gradient-emerald rounded-3xl p-6 md:p-8">
            <span className="label-cms text-white/70">Inverted field</span>
            <input className="field-invert mt-2" placeholder="you@email.com" />
          </div>
        </DsBlock>

        {/* STATS + EYEBROWS */}
        <DsBlock number="07" title="Stats & Eyebrows" kicker="Consistent metric styling and section labels.">
          <div className="grid md:grid-cols-4 gap-6">
            <Stat value="120+" label="Destinations" />
            <Stat value="48"   label="Neighborhoods" />
            <Stat value="365"  label="Days of Culture" />
            <Stat value="2.5M" label="Residents" />
          </div>
          <div className="mt-8 gradient-emerald rounded-3xl p-8 grid md:grid-cols-4 gap-6">
            <Stat value="120+" label="Destinations"    invert />
            <Stat value="48"   label="Neighborhoods"   invert />
            <Stat value="365"  label="Days of Culture" invert />
            <Stat value="2.5M" label="Residents"       invert />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Eyebrow variant="emerald">On cream</Eyebrow>
            <Eyebrow variant="gold">Gold accent</Eyebrow>
            <Eyebrow variant="ink">Ink</Eyebrow>
            <span className="gradient-emerald px-4 py-2 rounded-full">
              <Eyebrow variant="white">On emerald</Eyebrow>
            </span>
          </div>
        </DsBlock>

        {/* SPACING */}
        <DsBlock number="08" title="Section Rhythm" kicker="Three vertical rhythms: sm for utility, base for editorial, xl for statements.">
          <div className="grid gap-4">
            <SpacingRow label=".section-pad-sm" cls="section-pad-sm" />
            <SpacingRow label=".section-pad"    cls="section-pad" />
            <SpacingRow label=".section-pad-xl" cls="section-pad-xl" />
          </div>
        </DsBlock>

        {/* SHADOWS */}
        <DsBlock number="09" title="Shadows & Elevation" kicker="Kept in a single tier to avoid noise. Gold shadow only for primary CTAs.">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {['soft', 'elevated', 'deep', 'gold'].map((s) => (
              <div key={s} className={`aspect-square rounded-2xl bg-white flex items-end p-4 shadow-${s}`}>
                <span className="mono text-bekasi-ink/70">shadow-{s}</span>
              </div>
            ))}
          </div>
        </DsBlock>

        {/* USAGE / RULES */}
        <DsBlock number="10" title="Usage Rules" kicker="Guardrails to keep the system tourism-first and cinematic — not SaaS-y.">
          <div className="grid md:grid-cols-2 gap-5">
            {[
              'Use gold only for the primary action per screen.',
              'Editorial headings always in Playfair Display, tight tracking.',
              'Category color always sourced from the Category Tokens.',
              'Cards never mix multiple shadow tiers in the same grid.',
              'CMS uses squared corners + subtle borders; public uses rounded surfaces.',
              'Hero and Section headers always begin with an Eyebrow.',
              'Motion is slow, cinematic (400–1500ms) and never bouncy.',
              'Body copy sits at max ~65ch, use text-balance for titles.',
            ].map((r) => (
              <div key={r} className="surface-flat p-5 flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-bekasi-emerald-900 text-bekasi-gold-400 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <p className="body-sm text-bekasi-ink/80">{r}</p>
              </div>
            ))}
          </div>
        </DsBlock>
      </div>

      {/* Footer strip */}
      <div className="bg-bekasi-emerald-900 text-white/70 py-10">
        <div className="container flex items-center justify-between text-xs">
          <span>BekasiGo Design System · v0.1</span>
          <Link href="/" className="link-underline text-bekasi-gold-400">
            View homepage <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ------- Local helpers ------- */

function DsBlock({ number, title, kicker, children }) {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-10 mb-8 md:mb-10">
        <div className="flex-1">
          <div className="mono text-bekasi-ink/40">{number}</div>
          <h2 className="heading-3 mt-2 text-bekasi-emerald-900">{title}</h2>
        </div>
        {kicker && <p className="body md:max-w-md text-bekasi-ink/60">{kicker}</p>}
      </div>
      {children}
    </section>
  )
}

function SwatchScale({ name, scale, anchorKey }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="heading-4 text-bekasi-emerald-900">{name}</h3>
        <span className="mono text-bekasi-ink/50">bekasi.{name.toLowerCase()}.*</span>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-9 gap-2">
        {Object.entries(scale).map(([k, hex]) => (
          <div key={k} className="rounded-lg overflow-hidden border border-black/5">
            <div className="h-16" style={{ background: hex }} />
            <div className={`px-2 py-1.5 text-[10px] flex items-center justify-between ${+k === anchorKey ? 'bg-bekasi-emerald-900 text-bekasi-gold-400' : 'bg-white'}`}>
              <span className="mono">{k}</span>
              <span className="font-mono opacity-60">{hex.replace('#','')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Swatch({ name, hex, light }) {
  return (
    <div className="rounded-xl overflow-hidden border border-black/5">
      <div className="h-20" style={{ background: hex }} />
      <div className="bg-white px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-medium text-bekasi-emerald-900">{name}</span>
        <span className="mono text-bekasi-ink/50">{hex}</span>
      </div>
    </div>
  )
}

function TypeRow({ label, cls, children }) {
  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-8 items-baseline border-b border-black/5 pb-6">
      <div className="mono text-bekasi-ink/50">{label}</div>
      <div className={`text-bekasi-emerald-900 ${cls}`}>{children}</div>
    </div>
  )
}

function PreviewRow({ title, children, invert }) {
  return (
    <div>
      <div className="mono text-bekasi-ink/50 mb-3">{title}</div>
      <div className={`flex flex-wrap items-center gap-3 p-5 rounded-2xl ${invert ? 'gradient-emerald' : 'bg-white border border-black/5'}`}>
        {children}
      </div>
    </div>
  )
}

function SpacingRow({ label, cls }) {
  return (
    <div className="rounded-xl overflow-hidden border border-black/5 bg-white">
      <div className="px-4 py-2 flex items-center justify-between border-b border-black/5">
        <span className="mono text-bekasi-ink/60">{label}</span>
        <span className="body-sm text-bekasi-ink/50">vertical section padding</span>
      </div>
      <div className={`${cls} bg-bekasi-cream`}>
        <div className="container">
          <div className="h-16 rounded-lg gradient-emerald flex items-center justify-center text-white/80 mono">
            section content
          </div>
        </div>
      </div>
    </div>
  )
}
