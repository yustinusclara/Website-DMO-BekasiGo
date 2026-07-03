# BekasiGo MVP Polish Notes (E-42)

Curated audit + polish decisions after the sprint. Written so the project stays
easy to continue in Antigravity or by a follow-up agent.

---

## 1 — Homepage rhythm

### Reviewed
Hero → Quick Explore → Signature Places → Heritage Chronicles → Map Preview → Editorial CTA → Newsletter → Footer.
Each chapter opens with a `<ChapterMarker>` (Chapter 01 · The Signature, etc.) so scroll flow reads like an editorial magazine.

### Verdict
✅ Good rhythm — no changes needed. The chapter numbering is a strong DMO
signature and should be preserved. Each section already has enough vertical
breathing room (`py-24 md:py-32 lg:py-36`).

### Deferred / nice-to-have (Antigravity backlog)
- Add a subtle scroll-progress rail on the left showing "Chapter N/7".
- Consider a "Skip to Planner" pinned button once the user scrolls past the
  hero (currently the CTA is only in header).

---

## 2 — Section transitions

### Reviewed
All homepage sections use `motion.div` `whileInView` with the same easing
(`[0.16, 1, 0.3, 1]`) and 0.7–0.9s durations. Alternating `bg-bekasi-cream`
and `bg-white` panels give a clean editorial break.

### Verdict
✅ Consistent. No changes.

---

## 3 — Card consistency

### Reviewed
- Homepage cards: `rounded-3xl`, `shadow-soft`, hover-lift, image aspect 4:3.
- Destinations index cards: same treatment.
- Events index cards: same.
- Stories cards: intentionally different (bookish; `rounded-2xl` with serif
  titles + column ribbons).
- Blog cards: different again (magazine strip layout with meta chips).
- Planner stop cards: rounded-md with thin border (inline compact).

### Verdict
✅ Consistency is applied WITHIN a surface, and differentiation is applied
BETWEEN surfaces (Stories vs Blog vs Destinations). This is intentional
per the "editorial magazine" DMO identity. No changes.

---

## 4 — CTA consistency

### Reviewed
| Tier      | Style                                    | Usage                            |
|-----------|------------------------------------------|----------------------------------|
| Primary   | Emerald 900 pill + white text            | Save, Continue, Generate         |
| Accent    | Gold 500 pill + emerald text             | Smart Trip Planner (hero-level)  |
| Secondary | Border emerald + emerald text            | View details, Get directions     |
| Ghost     | Text + underline hover                   | "See full guide", "Read more"    |
| Icon-only | Circular semi-transparent                | Search, mute toggle              |

### Verdict
✅ Consistent across the app. Confirmed on Homepage, Planner, Map, Destination
and Event detail pages.

---

## 5 — Responsive behaviour

### Reviewed
- Homepage hero: `h-[100svh] min-h-[640px]` locks a safe height on iOS.
- All index pages: `pt-32 md:pt-40` gives clear breathing room from the
  fixed SiteHeader (fixed in earlier iteration).
- Planner form: progressive disclosure wizard, stacks cleanly on mobile.
- Explore Map: `md:hidden` tab switcher (Map/List) prevents cramped
  side-by-side on phones.
- Grid patterns use `grid-cols-12` with `md:col-span-*` breakpoints.

### Fixed in this pass
- Nav bar was overflowing to two rows on desktop with 9 primary items.
  Consolidated to 5 items:
    Discover Bekasi ⌄ · Destinations · Events · City Stories · Explore Map
  (Food & Drink / Stay / Getting Around / Journal & News moved into the
  Discover Bekasi mega menu.)

### Deferred
- Fine-tune mobile header (currently uses hamburger + slide-in panel — good
  base but could add sticky bottom action bar for Planner on mobile).

---

## 6 — CMS usability

### Reviewed
- Isolated at `/admin/*` — completely separate layout from the public site.
- Standardised forms via `components/admin/forms/inputs.jsx`:
  TextField, TextAreaField, SelectField, MultiSelectField, MediaField.
- Managers: Destinations, Events, Stories, Blog, Media — same shell pattern.
- Mock login accepts anything except password="wrong" (documented).

### Verdict
✅ CMS is production-ready in scaffolding; only lacks live persistence
(currently mocked). See section 12 for the follow-on DB wiring plan.

### Deferred (Antigravity backlog)
- Wire Supabase RLS + tables for destinations/events/stories/blogs/media.
- Bulk actions (multi-select delete, batch publish).
- Preview mode ("View as published") from within the manager.

---

## 7 — Planner usability

### Reviewed
- 3-step wizard: Basics → Interests → Fine-tune → Generate.
- Progressive disclosure: only one field group at a time.
- Live route panel + timeline on results side.
- Refine chat lets users iterate conversationally.
- Save/Download/Share buttons behind the Google login gate (E-41).

### Verdict
✅ Complete flow. Mock plan (grounded on real destinations) fires in <1s
when live LLM key is not present, so demo never breaks.

### Deferred (Antigravity backlog)
- Persist saved plans to Supabase (needs `plans` table + `user_id` FK).
- Real PDF generation for the Download action (currently JSON blob).
- Public shareable link generator (Base64-encoded plan payload → /planner/shared/[id]).

---

## 8 — Map usability

### Reviewed
- All 5 map surfaces (Homepage MapPreview, Explore Map, Destinations detail,
  Events detail, Planner Live Route) now use the same Leaflet + OSM stack.
- Shared `<LeafletMap>` component with dynamic import (ssr:false) + HMR guard.
- District anchors (WGS84 lat/lng) live in `lib/map/positions.js`.
- Custom category divIcons with per-category color + inline SVG.
- Fly-to on selectedId change works uniformly.

### Verdict
✅ Consistent. Anti-hallucination guard on planner stops is intact.

### Deferred
- Cluster markers when zoomed out on Explore Map (currently all pins visible
  at once — fine for 24 destinations, would matter at 200+).
- Add real routing polylines via a routing API (currently synthetic dashed line
  connects stops in listed order).

---

## 9 — Stories vs Blog differentiation

### Reviewed
The differentiation is explicitly established in three places:

|                | City Stories                        | Blog                                    |
|----------------|-------------------------------------|-----------------------------------------|
| Positioning    | "Editorial from the city itself"    | "Practical writing from the city desk"  |
| Format         | Long-form journalism, features      | Guides, updates, openings               |
| Cadence        | Monthly issue (`Issue N° 24 · June 2026`) | Rolling / weekly                  |
| Typography     | Serif italic display heading        | Sans-serif semibold heading             |
| Icon           | Feather / quill                     | `Newspaper` (lucide)                    |
| Card treatment | Bookish, `rounded-2xl`, column ribbon | Magazine strip, meta chips            |
| Copy metaphor  | "The Bekasi Journal"                | "If Stories is our journal, this is our notebook" |

### Verdict
✅ Very clear differentiation, both editorially and visually. No further
changes needed.

### Deferred
- Cross-link teaser at the bottom of each: on Stories index, a strip
  "Looking for weekly guides? → Read the Blog." (and vice versa).

---

## 10 — Overall DMO identity

The site reads as an OFFICIAL city guide, not a startup. Signals:

- **Wordmark**: `BekasiGo` in Playfair serif + all-caps subline
  "OFFICIAL CITY GUIDE".
- **Utility strip**: `Kota Bekasi · Indonesia · 28°C · Sunny` on top-left
  and Press / Partners / CMS on top-right — echoes newspaper mastheads.
- **Chapter markers**: "Chapter 01 · The Signature" etc. throughout the
  homepage — treating the city as a book.
- **Colour system**: bekasi-emerald (forest 900), bekasi-gold (500 & 400),
  bekasi-cream (page bg), bekasi-ink (body text). All defined as CSS vars.
- **Typography pairing**: Playfair Display (headings) + Inter (body).
- **Iconography**: lucide-react used consistently; no mixed icon sets.

### Verdict
✅ DMO identity is coherent across every touchpoint. This is the strongest
part of the MVP.

---

## Continuity hand-off for Antigravity

Everything is modular:

- `/lib/content/*.js`     — content mocks / structured data (CMS-shaped).
- `/lib/content/homepage.js` — single source of truth for `IMG.*` (all
  cloudinary URLs live here).
- `/lib/map/positions.js` — district anchors + normalized↔lat/lng helpers.
- `/lib/ai/planner.js`    — dispatcher with `PLANNER_USE_MOCK` /
  `GEMINI_API_KEY` / `EMERGENT_LLM_KEY` provider priority.
- `/lib/supabase/*`       — client, AuthProvider, deferred-action helpers.
- `/components/map/LeafletMap.jsx` — reusable OSM canvas (light/dark tiles,
  route polyline, per-category divIcons).
- `/components/auth/*`    — LoginGateModal, AuthAvatar.
- `/components/sections/` — feature surfaces (planner, map, destinations,
  events, stories, blog).
- `/components/admin/`    — CMS shell, managers, and forms.

To activate live AI generation in Antigravity, set `GEMINI_API_KEY` in `.env`
and flip `PLANNER_USE_MOCK=false`. All other integrations (Supabase, OSM)
already run against real production endpoints.
