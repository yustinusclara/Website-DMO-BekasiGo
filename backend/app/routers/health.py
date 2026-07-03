"""Health + version endpoint."""
from fastapi import APIRouter

from app.settings import get_settings

router = APIRouter(tags=["health"])


@router.get("/health")
def health():
    s = get_settings()
    return {
        "data": {
            "status": "ok",
            "app": s.app_name,
            "version": s.app_version,
            "supabase_configured": s.supabase_configured,
        }
    }
