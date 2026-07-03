"""Homepage aggregator service."""
from typing import Any, Dict, Optional

from app.db.supabase_client import SupabaseClient


def get_homepage_payload(db: Optional[SupabaseClient]) -> Dict[str, Any]:
    """Return the composed homepage payload (sections + items + settings).

    Real query pattern (once wired):
        1. Fetch enabled homepage_sections ordered by sort_order.
        2. For each, fetch homepage_section_items ordered.
        3. Resolve polymorphic entity_id into destination/event/story/blog rows.
        4. Fetch site_settings (site_name, tagline, cloudinary_base).

    Currently returns a sample-shaped payload so the frontend can integrate now.
    """
    return {
        "site_name": "BekasiGo",
        "tagline": "Official City Guide of Kota Bekasi",
        "hero_video_url": None,
        "sections": [
            {
                "id": "sample-hero",
                "key": "hero",
                "label": "Hero video",
                "kind": "hero_video",
                "sort_order": 10,
                "is_enabled": True,
                "settings": {"autoplay": True, "muted": True},
                "items": [],
            }
        ],
    }
