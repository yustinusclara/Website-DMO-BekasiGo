"""Media service."""
from typing import Any, Dict, List, Optional, Tuple

from app.core.errors import NotFoundError
from app.db.supabase_client import SupabaseClient


def list_media(
    db: Optional[SupabaseClient],
    *,
    limit: int,
    offset: int,
    type: Optional[str] = None,     # 'image' | 'video'
    category: Optional[str] = None,
    q: Optional[str] = None,
) -> Tuple[List[Dict[str, Any]], int]:
    return [], 0


def get_media_by_id(db: Optional[SupabaseClient], media_id: str) -> Dict[str, Any]:
    if not db:
        raise NotFoundError(f"Media '{media_id}' not found.")
    raise NotFoundError(f"Media '{media_id}' not found.")
