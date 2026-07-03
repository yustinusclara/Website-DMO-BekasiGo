"""Shared FastAPI dependencies.

- `get_db()`   -> Supabase client (or None if not configured)
- `require_admin(user)` -> placeholder for auth check (E-33)
"""
from typing import Optional

from fastapi import Depends, Header, HTTPException, status

from app.db.supabase_client import SupabaseClient, get_supabase
from app.settings import Settings, get_settings


def get_db() -> Optional[SupabaseClient]:
    """Yield the Supabase client (or None if not configured yet).

    Endpoints must handle the None case gracefully during scaffolding.
    """
    return get_supabase()


def get_current_user_id(
    authorization: Optional[str] = Header(default=None),
    settings: Settings = Depends(get_settings),
) -> Optional[str]:
    """Extract user id from Bearer token (Supabase JWT).

    E-33 will replace this stub with proper JWT verification via supabase-py.
    """
    if not authorization or not authorization.lower().startswith("bearer "):
        return None
    token = authorization.split(" ", 1)[1].strip()
    # TODO: verify JWT with supabase in a follow-up prompt.
    return token or None


def require_admin(user_id: Optional[str] = Depends(get_current_user_id)) -> str:
    if not user_id:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Authentication required.")
    # TODO: check role from user_profiles.role_id -> roles.slug == 'admin'.
    return user_id
