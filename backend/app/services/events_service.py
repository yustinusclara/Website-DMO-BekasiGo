"""Events service."""
from typing import Any, Dict, List, Optional, Tuple

from app.core.errors import NotFoundError
from app.db.supabase_client import SupabaseClient


def list_events(
    db: Optional[SupabaseClient],
    *,
    limit: int,
    offset: int,
    category: Optional[str] = None,
    when: Optional[str] = None,   # 'upcoming' | 'ongoing' | 'past'
    q: Optional[str] = None,
    featured: Optional[bool] = None,
) -> Tuple[List[Dict[str, Any]], int]:
    return [], 0


def get_event_by_slug(db: Optional[SupabaseClient], slug: str) -> Dict[str, Any]:
    if not db:
        raise NotFoundError(f"Event '{slug}' not found.")
    raise NotFoundError(f"Event '{slug}' not found.")
