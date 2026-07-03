"""Blog service."""
from typing import Any, Dict, List, Optional, Tuple

from app.core.errors import NotFoundError
from app.db.supabase_client import SupabaseClient


def list_posts(
    db: Optional[SupabaseClient],
    *,
    limit: int,
    offset: int,
    category: Optional[str] = None,
    q: Optional[str] = None,
    featured: Optional[bool] = None,
) -> Tuple[List[Dict[str, Any]], int]:
    return [], 0


def get_post_by_slug(db: Optional[SupabaseClient], slug: str) -> Dict[str, Any]:
    if not db:
        raise NotFoundError(f"Blog post '{slug}' not found.")
    raise NotFoundError(f"Blog post '{slug}' not found.")
