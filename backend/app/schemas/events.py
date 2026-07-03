"""Event schemas."""
from datetime import date
from typing import Any, Dict, List, Optional

from pydantic import BaseModel

from app.schemas.common import Coords, MediaRef, SEO, Status, Timestamps


class Event(BaseModel):
    id: str
    slug: str
    title: str
    summary: Optional[str] = None
    content: Optional[str] = None
    body: List[Dict[str, Any]] = []
    category: Optional[str] = None
    venue_name: str
    venue_address: Optional[str] = None
    district: Optional[str] = None
    coords: Optional[Coords] = None
    start_date: date
    end_date: Optional[date] = None
    time_display: Optional[str] = None
    price: Optional[str] = None
    organizer: Optional[str] = None
    capacity: Optional[str] = None
    cta_label: Optional[str] = None
    cta_url: Optional[str] = None
    featured: bool = False
    status: Status = "draft"
    featured_image: Optional[MediaRef] = None
    tags: List[str] = []
    seo: Optional[SEO] = None
    timestamps: Optional[Timestamps] = None
