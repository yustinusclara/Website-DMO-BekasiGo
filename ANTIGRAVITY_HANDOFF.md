# BekasiGo MVP — Antigravity Handoff

Final state after E-01 → E-42 + route/data enrichment pass on Emergent.
Continue development from here in Antigravity.

---

## What is live and working

### Public site (public.bekasigo)
- **Homepage** — hero video (Cloudinary), chapter-based editorial rhythm, live OSM map preview, all CTAs wired.
- **Discover Bekasi** — mega menu with 5 subcategories, category landing pages (`/discover/heritage|urban|nature|family|shopping`).
- **Directories** —
  - `/destinations` (15 curated) + individual detail pages
  - `/food` (30 restaurants from CSV)
  - `/stay` (30 hotels from CSV)
  - `/getting-around` (12 LRT/KRL/TJ stations from CSV)
  - `/events` (index + detail)
  - `/stories` (long-form editorial index + detail)
  - `/blog` (short-form journal index + detail)
- **Explore Map** `/map` — real Leaflet + OpenStreetMap, filter chips, side-panel sync, floating preview card, mobile tabs.
- **Smart Trip Planner** `/planner` — 3-step wizard, AI generation (mock + optional Gemini/Emergent), map panel with route polyline, refine chat, save/download/share behind auth gate.
- **Auth** — Supabase + Google OAuth, deferred-action pattern, avatar dropdown, callback page.
- **Corporate pages** — About, Government, Partners, Press, Careers, Contact, Newsletter, Legal (privacy/terms/accessibility), Sitemap, Stories Submit, Plan Currency/Weather.
- **Custom 404** — editorial not-found page with 6 recommended routes.

### Admin CMS (`/admin/*`)
- Isolated layout, mock login (any email; password ≠ "wrong").
- Managers for Destinations, Events, Stories, Blog, Media, Homepage settings.
- Shared form primitives (`components/admin/forms/inputs.jsx`).

### Integrations wired
- **Supabase Auth** (Google OAuth) — persistSession + autoRefreshToken + PKCE.
- **OpenStreetMap + Leaflet** — 5 map surfaces sharing `LeafletMap` component.
- **Cloudinary** — 17 hero/landmark images centralised in `IMG` constant.
- **Emergent LLM** — Smart Planner via OpenAI-compatible proxy (currently budget-exhausted; mock takes over).
- **Gemini (direct)** — stub in `lib/ai/planner.js` waiting for `GEMINI_API_KEY`.

---

## Route audit — 0 real 404s

Crawler tested every `<Link href>` and `href:` string in the codebase across
76 unique routes → all return 200 (or 3xx redirect) after dev compile. Remaining
blocks in the crawler output are dev-mode compile timeouts, not real failures.

---

## What is mocked (needs live wiring in Antigravity)

| Feature                        | Current                                    | To activate                                                  |
| ------------------------------ | ------------------------------------------ | ------------------------------------------------------------ |
| Planner AI generation          | Deterministic mock grounded on directory   | Set `GEMINI_API_KEY` in .env, flip `PLANNER_USE_MOCK=false`  |
| Save itinerary                 | Console log + toast flash                  | Create Supabase `plans` table + wire persist in `TripSummary.doSave` |
| Download itinerary             | JSON blob client-side download             | Wire a real PDF generator (react-pdf, playwright, etc.)      |
| CMS content persistence        | Local mock arrays                          | Wire managers to Supabase tables (schema already in `/app/supabase/migrations/0001_init.sql`) |
| Blog / Stories / Events fetch  | Static JS files                            | Wire to Supabase tables + revalidate                         |

---

## Environment variables in `.env`

```
MONGO_URL=…                                # local mongo (unused by public UI)
NEXT_PUBLIC_BASE_URL=…                     # preview URL, do not touch
CORS_ORIGINS=*
EMERGENT_LLM_KEY=sk-emergent-…             # budget exhausted
PLANNER_USE_MOCK=true                      # flip to false once GEMINI_API_KEY is set
# GEMINI_API_KEY=…                          # add in Antigravity to go live
NEXT_PUBLIC_SUPABASE_URL=…                 # already live
NEXT_PUBLIC_SUPABASE_ANON_KEY=…            # already live
```

---

## Module map for Antigravity

```
/app
  /app                           Next.js App Router routes (all pages)
  /components
    /admin                       CMS shell, managers, form primitives
    /auth                        LoginGateModal, AuthAvatar
    /layout                      SiteHeader, SiteFooter
    /map                         LeafletMap + LeafletMapImpl (shared)
    /sections
      /planner                   Smart Trip Planner shell, form, results, refine, map panel
      /map                       Explore Map (Shell, Canvas, Filters, SidePanel, PreviewCard)
      /destinations              Index + detail sections
      /events                    Index + detail sections
      /stories                   Index + detail sections
      /blog                      Index + detail sections
      /directory                 DirectoryIndex — reused by /food, /stay, /getting-around, /discover/*
      /info                      InfoPage — reused by 12 corporate/utility pages
  /lib
    /content                     Static content model (destinations, events, stories, blog, homepage, discover)
      _data_restaurants.json     From 30 Restoran.csv (30 rows)
      _data_hotels.json          From 30 Hotel.csv (30 rows)
      _data_transit.json         From Transportasi.csv (12 rows)
      _data_destinations_extra.json  From Master Destinasi.csv (70 rows)
    /ai/planner.js               3-tier LLM dispatcher (Gemini → Emergent → Mock)
    /supabase                    client, AuthProvider, deferred-action helpers
    /map/positions.js            District anchors + normalized↔lat/lng helpers
    /planner/adapt.js            API-plan → map-shape adapter
  /backend                       (stagnant) FastAPI scaffold for future
  /supabase/migrations           (stagnant) SQL for future DB migration
```

---

## Recommended first Antigravity commits

1. **Add `GEMINI_API_KEY`** to `.env` and flip `PLANNER_USE_MOCK=false` — brings live AI planner in one line.
2. **Wire Supabase persistence** — create `plans` table, save `plan_json` + `user_id`, add `SELECT` policy for owner. Update `TripSummary.doSave` to call `supabase.from('plans').insert(...)`.
3. **Wire CMS to Supabase** — replace local `DESTINATIONS`, `EVENTS`, etc. with `supabase.from(...).select(...)`. Managers already POST/PUT/DELETE-shaped; wire them next.
4. **Real PDF export** — install `@react-pdf/renderer`, render a printable itinerary component, wire `doDownload` to it.
5. **Marker clustering** on Explore Map — install `react-leaflet-cluster` when adding ≥50 pins.

---

## Design system anchors

- **Colours** — `bekasi-emerald-*` (900 = forest ink), `bekasi-gold-*` (500 = accent, 400 = hover), `bekasi-cream` (page bg), `bekasi-ink` (body text). Defined in `tailwind.config.js`.
- **Typography** — Playfair Display (headings) + Inter (body). Serif italic for Stories; sans-serif semibold for Blog.
- **Layout tokens** — `container` (1400 max), `pt-32 md:pt-40` for all index pages, `rounded-2xl` for cards, `shadow-soft` for lifted panels.
- **Icon system** — `lucide-react` only. No other icon library.
- **Chapter markers** — every homepage section opens with `<ChapterMarker text="Chapter 0X · The …" />` — preserve this on any new section.

---

Good luck on Antigravity 🌏
