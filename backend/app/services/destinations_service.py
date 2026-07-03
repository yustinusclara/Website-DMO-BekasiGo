"""Destinations service."""
from typing import Any, Dict, List, Optional, Tuple

from app.core.errors import NotFoundError
from app.db.supabase_client import SupabaseClient


def list_destinations(
    db: Optional[SupabaseClient],
    *,
    limit: int,
    offset: int,
    category: Optional[str] = None,
    district: Optional[str] = None,
    q: Optional[str] = None,
    featured: Optional[bool] = None,
) -> Tuple[List[Dict[str, Any]], int]:
    """Return (rows, total) for paginated destinations.

    Real query pattern (once wired):
        table = db.table('destinations')
        query = table.select('*, category:destination_categories(slug,label,color), featured_image:media_assets!featured_image_id(url,alt_text)', count='exact')
              .eq('status', 'published')
        if category:   query = query.eq('category.slug', category)
        if district:   query = query.eq('district', district)
        if featured is not None: query = query.eq('featured', featured)
        if q:          query = query.ilike('title', f'%{q}%')
        res = query.range(offset, offset + limit - 1).order('planner_priority', desc=True)
        return res.data, res.count
    """
    return [], 0


def get_destination_by_slug(db: Optional[SupabaseClient], slug: str) -> Dict[str, Any]:
    if not db:
        raise NotFoundError(f"Destination '{slug}' not found.")
    # res = db.table('destinations').select('*').eq('slug', slug).eq('status', 'published').single().execute()
    # if not res.data: raise NotFoundError(...)
    # return res.data
    raise NotFoundError(f"Destination '{slug}' not found.")
