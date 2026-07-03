"""Homepage schemas."""
from typing import Any, Dict, List, Optional

from pydantic import BaseModel

from app.schemas.common import MediaRef


class HomepageSectionItem(BaseModel):
    id: str
    entity_type: str
    entity_id: Optional[str] = None
    title: Optional[str] = None
    kicker: Optional[str] = None
    image: Optional[MediaRef] = None
    data: Dict[str, Any] = {}
    sort_order: int = 0


class HomepageSection(BaseModel):
    id: str
    key: str
    label: str
    kind: str
    sort_order: int = 0
    is_enabled: bool = True
    settings: Dict[str, Any] = {}
    items: List[HomepageSectionItem] = []


class HomepageResponse(BaseModel):
    site_name: str
    tagline: Optional[str] = None
    hero_video_url: Optional[str] = None
    sections: List[HomepageSection] = []
