"""Destination schemas."""
from typing import Any, Dict, List, Optional

from pydantic import BaseModel

from app.schemas.common import Author, CategoryRef, Coords, MediaRef, SEO, Status, Timestamps


class Destination(BaseModel):
    id: str
    slug: str
    title: str
    excerpt: Optional[str] = None
    description: Optional[str] = None
    body: List[Dict[str, Any]] = []
    category: Optional[CategoryRef] = None
    district: Optional[str] = None
    coords: Optional[Coords] = None
    hours: Optional[str] = None
    duration: Optional[str] = None
    best_time: Optional[str] = None
    family_friendly: bool = True
    environment: Optional[str] = None
    planner_priority: int = 50
    rating: Optional[float] = None
    featured: bool = False
    status: Status = "draft"
    featured_image: Optional[MediaRef] = None
    gallery: List[MediaRef] = []
    tags: List[str] = []
    seo: Optional[SEO] = None
    author: Optional[Author] = None
    timestamps: Optional[Timestamps] = None
