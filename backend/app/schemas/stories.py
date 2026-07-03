"""Story schemas."""
from typing import Any, Dict, List, Optional

from pydantic import BaseModel

from app.schemas.common import Author, MediaRef, SEO, Status, Timestamps


class Story(BaseModel):
    id: str
    slug: str
    title: str
    subtitle: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    body: List[Dict[str, Any]] = []
    column_key: str
    featured: bool = False
    status: Status = "draft"
    hero_image: Optional[MediaRef] = None
    read_time: Optional[str] = None
    author: Optional[Author] = None
    tags: List[str] = []
    seo: Optional[SEO] = None
    timestamps: Optional[Timestamps] = None
