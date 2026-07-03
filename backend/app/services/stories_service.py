"""Stories service."""
from typing import Any, Dict, List, Optional, Tuple

from app.core.errors import NotFoundError
from app.db.supabase_client import SupabaseClient


def list_stories(
    db: Optional[SupabaseClient],
    *,
    limit: int,
    offset: int,
    column: Optional[str] = None,   # heritage/voices/places/people/kitchen
    q: Optional[str] = None,
    featured: Optional[bool] = None,
) -> Tuple[List[Dict[str, Any]], int]:
    return [], 0


def get_story_by_slug(db: Optional[SupabaseClient], slug: str) -> Dict[str, Any]:
    if not db:
        raise NotFoundError(f"Story '{slug}' not found.")
    raise NotFoundError(f"Story '{slug}' not found.")
