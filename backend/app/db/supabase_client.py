"""Supabase client factory (lazy).

Returns None if env vars are not configured yet — the services must handle
the None case and fall back to sample data so the API stays functional
during scaffolding.
"""
from functools import lru_cache
from typing import Optional

from app.settings import get_settings

try:
    from supabase import Client, create_client

    SupabaseClient = Client
except ImportError:  # pragma: no cover — dep will be installed via requirements.txt
    SupabaseClient = object  # type: ignore
    create_client = None  # type: ignore


@lru_cache(maxsize=1)
def get_supabase() -> Optional["SupabaseClient"]:
    settings = get_settings()
    if not settings.supabase_configured or create_client is None:
        return None
    # Anon key: RLS-enforced. Use service key only in admin-only code paths.
    return create_client(settings.supabase_url, settings.supabase_anon_key)


def get_supabase_admin() -> Optional["SupabaseClient"]:
    """Bypasses RLS. Use only from server-side admin flows."""
    settings = get_settings()
    if not (settings.supabase_url and settings.supabase_service_key) or create_client is None:
        return None
    return create_client(settings.supabase_url, settings.supabase_service_key)
