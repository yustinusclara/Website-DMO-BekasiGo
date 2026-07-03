# BekasiGo — FastAPI Backend Foundation

Production-ready FastAPI scaffold for the BekasiGo CMS-driven public API.
Every domain from the product spec has its own router, service, and Pydantic
schema layer. Ready to plug into Supabase (E-31 schema) once credentials are
wired.

## Layout

```
backend/
  app/
    main.py                 → FastAPI app factory, CORS, router mount
    settings.py             → Pydantic Settings (env-driven)
    dependencies.py         → Shared FastAPI deps (DB client, auth)
    core/
      response.py           → { data, meta } envelope helpers
      pagination.py         → limit/offset + page/size dual support
      errors.py             → custom exceptions + handlers
    db/
      supabase_client.py    → supabase-py client factory (lazy)
    schemas/                → Pydantic request/response models
      common.py, homepage.py, destinations.py, events.py,
      stories.py, blogs.py, media.py, trip_planner.py
    routers/                → One router per domain
      health.py, homepage.py, destinations.py, events.py,
      stories.py, blogs.py, media.py, trip_planner.py
    services/               → Business logic (Supabase queries)
      *_service.py
  requirements.txt
  .env.example
  README.md
```

## Running (locally, outside the Next.js container)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # then fill in SUPABASE_URL / SUPABASE_ANON_KEY
uvicorn app.main:app --reload --port 8000

# Docs at http://localhost:8000/api/docs
```

## Environment

| Var                    | Purpose                                     |
|------------------------|---------------------------------------------|
| `SUPABASE_URL`         | Project URL from Supabase dashboard         |
| `SUPABASE_ANON_KEY`    | Public anon key (RLS enforced)              |
| `SUPABASE_SERVICE_KEY` | Server-side key (bypasses RLS — admin only) |
| `GEMINI_API_KEY`       | For Trip Planner (E-33+)                    |
| `CORS_ALLOWED_ORIGINS` | CSV of frontend origins                     |
| `LOG_LEVEL`            | `info` (default) or `debug`                 |

## API design

- **Base path**: `/api`
- **Docs**: `/api/docs` (Swagger), `/api/redoc`
- **Response envelope**:

```jsonc
{
  "data": [ /* rows */ ],
  "meta": {
    "total": 24,
    "limit": 20,
    "offset": 0,
    "page": 1,
    "size": 20,
    "has_more": true
  }
}
```

- **Errors**: RFC-7807-ish JSON

```jsonc
{ "error": { "code": "not_found", "message": "Destination not found." } }
```

## Domain routes

| Domain         | List                                | Detail                               |
|----------------|-------------------------------------|--------------------------------------|
| Homepage       | `GET /api/homepage`                 | —                                    |
| Destinations   | `GET /api/destinations`             | `GET /api/destinations/{slug}`       |
| Events         | `GET /api/events`                   | `GET /api/events/{slug}`             |
| Stories        | `GET /api/stories`                  | `GET /api/stories/{slug}`            |
| Blogs          | `GET /api/blog`                     | `GET /api/blog/{slug}`               |
| Media          | `GET /api/media`                    | `GET /api/media/{id}`                |
| Trip Planner   | `POST /api/trip-planner/generate`   | `POST /api/trip-planner/refine`      |

## Status of this scaffold

- ✅ Routers, schemas, services, config wired.
- ✅ Response envelope + pagination + error handlers.
- ❌ Not yet: real Supabase queries — services return sample-shaped payloads
  so the frontend can integrate immediately. Once Supabase project ref +
  keys land, swap `services/*.py` internals to real calls.
- ❌ Not yet: FastAPI auth (E-33 will layer Supabase JWT verification).
