"""FastAPI app factory.

Mounts every domain router under `settings.api_prefix` (default `/api`).
"""
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse

from app.core.errors import install_error_handlers
from app.routers import (
    blogs,
    destinations,
    events,
    health,
    homepage,
    media,
    stories,
    trip_planner,
)
from app.settings import get_settings

settings = get_settings()

logging.basicConfig(level=getattr(logging, settings.log_level.upper(), logging.INFO))
logger = logging.getLogger("bekasigo")


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        default_response_class=ORJSONResponse,
        docs_url=f"{settings.api_prefix}/docs",
        redoc_url=f"{settings.api_prefix}/redoc",
        openapi_url=f"{settings.api_prefix}/openapi.json",
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Error handlers
    install_error_handlers(app)

    # Routers — mount under /api
    p = settings.api_prefix
    app.include_router(health.router,       prefix=p)
    app.include_router(homepage.router,     prefix=p)
    app.include_router(destinations.router, prefix=p)
    app.include_router(events.router,       prefix=p)
    app.include_router(stories.router,      prefix=p)
    app.include_router(blogs.router,        prefix=p)
    app.include_router(media.router,        prefix=p)
    app.include_router(trip_planner.router, prefix=p)

    if not settings.supabase_configured:
        logger.warning(
            "Supabase env not configured — services will return sample-shaped payloads."
        )

    return app


app = create_app()
