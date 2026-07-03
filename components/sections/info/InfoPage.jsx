import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/**
 * InfoPage — shared editorial template used by the corporate/utility pages:
 * /about, /press, /partners, /contact, /careers, /newsletter, /legal/[slug],
 * /sitemap, /stories/submit, /plan/*.
 * Keeps the DMO magazine identity consistent while remaining lightweight.
 */
export default function InfoPage({ kicker, title, lead, breadcrumbs = [], sections = [], cta }) {
  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main className="container pt-32 md:pt-40 pb-24 max-w-5xl">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bekasi-ink/55">
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="inline-flex items-center gap-2">
                {b.href ? <Link href={b.href} className="hover:text-bekasi-emerald-800">{b.label}</Link> : <span className="text-bekasi-gold-600">{b.label}</span>}
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" />}
              </span>
            ))}
          </nav>
        )}
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-bekasi-gold-600">{kicker}</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl leading-tight text-bekasi-emerald-900">{title}</h1>
        {lead && <p className="mt-6 max-w-3xl text-lg text-bekasi-ink/75 leading-relaxed">{lead}</p>}

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <section key={i} className="rounded-2xl bg-white border border-bekasi-emerald-900/10 p-6 md:p-8 shadow-soft">
              {s.eyebrow && <div className="text-[10px] uppercase tracking-[0.22em] text-bekasi-gold-600">{s.eyebrow}</div>}
              {s.heading && <h2 className="mt-2 font-serif text-2xl md:text-3xl text-bekasi-emerald-900">{s.heading}</h2>}
              {s.body && <div className="mt-4 prose prose-neutral max-w-none text-bekasi-ink/75 leading-relaxed">{typeof s.body === 'string' ? <p>{s.body}</p> : s.body}</div>}
              {s.list && (
                <ul className="mt-4 space-y-2">
                  {s.list.map((li) => (
                    <li key={li} className="flex items-start gap-2 text-bekasi-ink/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bekasi-gold-500" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {cta && (
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-bekasi-emerald-900 text-white p-6 md:p-8">
            <div>
              {cta.eyebrow && <div className="text-[10px] uppercase tracking-[0.22em] text-bekasi-gold-400">{cta.eyebrow}</div>}
              {cta.title && <div className="mt-1 font-serif text-2xl md:text-3xl">{cta.title}</div>}
              {cta.body && <p className="mt-2 max-w-xl text-white/75 leading-relaxed">{cta.body}</p>}
            </div>
            {cta.href && (
              <Link href={cta.href} className="inline-flex items-center gap-2 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 px-5 py-2.5 text-sm font-semibold">
                {cta.label || 'Learn more'} <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
