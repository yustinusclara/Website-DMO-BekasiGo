"""Blog post schemas."""
from typing import Any, Dict, List, Optional

from pydantic import BaseModel

from app.schemas.common import Author, CategoryRef, MediaRef, SEO, Status, Timestamps


class BlogRelations(BaseModel):
    destinations: List[str] = []
    events: List[str] = []
    restaurants: List[str] = []


class BlogPost(BaseModel):
    id: str
    slug: str
    title: str
    subtitle: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    body: List[Dict[str, Any]] = []
    category: Optional[CategoryRef] = None
    featured: bool = False
    status: Status = "draft"
    cover: Optional[MediaRef] = None
    read_time: Optional[str] = None
    author: Optional[Author] = None
    tags: List[str] = []
    related: BlogRelations = BlogRelations()
    seo: Optional[SEO] = None
    timestamps: Optional[Timestamps] = None
