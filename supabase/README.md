# BekasiGo — Supabase Schema

## Layout

```
supabase/
  migrations/
    0001_init.sql           → all tables, enums, indexes, triggers, RLS
    0002_seed_baseline.sql  → default categories, homepage sections, nav
```

## Deploying

```bash
# Using Supabase CLI (recommended)
supabase link --project-ref <YOUR_PROJECT_REF>
supabase db push

# Or via Studio: SQL Editor → paste each file in order.
```

## Extensions required

- `pgcrypto` (default UUID generator)
- `pg_trgm`  (trigram search on titles/tags for CMS)
- `postgis`  (optional — the schema currently uses `lat`/`lng` numeric)

## Table overview

| Table                    | Purpose |
|--------------------------|---------|
| `roles`, `user_profiles` | Auth roles + profile records tied to `auth.users.id` |
| `destination_categories`, `blog_categories`, `tags` | Taxonomies |
| `media_assets` (+ junctions) | Cloudinary asset index |
| `destinations`           | Places to visit (24 seeded in mock data) |
| `events`                 | Festivals, markets, concerts |
| `restaurants`            | F&B directory |
| `hotels`                 | Accommodations |
| `transport_nodes`        | LRT/KRL/terminals |
| `stories`                | Editorial magazine |
| `blogs`                  | SEO-focused posts + cross-link junctions |
| `homepage_sections` (+ items) | Dynamic homepage layout |
| `navigation_items`       | Header, footer, mega menu |
| `site_settings`          | Global key/value store |
| `trip_plans` (+ items + refinements) | AI Smart Trip Planner state |

## Design decisions

1. **Enums for status/type** so DB rejects invalid states at write time.
2. **`body jsonb`** on content tables — stores rich editor blocks (`[{type, text}, …]`) matching the mock schema exactly.
3. **Soft polymorphism** on `homepage_section_items.entity_id` and `trip_plan_items.entity_id` — no hard FK; resolved by `entity_type` in app.
4. **SEO fields inline** on every content table — `seo_title / seo_description / seo_canonical / seo_og_image_id`.
5. **`planner_priority`** on destinations gives the AI trip planner deterministic ranking.
6. **`updated_at` trigger** attached via helper function — no more forgetting to write it.
7. **RLS enabled by default** on every content table; policies live in a follow-up migration once we wire the actual auth flow (E-32).

## Not yet in this migration

- RLS policies (e.g. `public read where status = 'published'`, `admin full-access`) — will land in `0003_rls_policies.sql`
- Full-text search indexes on `body` — will land when we do search UX
- PostGIS geography columns — will land when we do the interactive map
