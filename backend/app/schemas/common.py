"""Shared / reusable schemas."""
from datetime import date, datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, Field

Status = Literal["draft", "published", "scheduled", "archived"]


class MediaRef(BaseModel):
    id: Optional[str] = None
    url: str
    type: Literal["image", "video"] = "image"
    alt_text: Optional[str] = None
    width: Optional[int] = None
    height: Optional[int] = None


class Author(BaseModel):
    name: str
    role: Optional[str] = None
    avatar: Optional[MediaRef] = None


class Coords(BaseModel):
    lat: float
    lng: float


class Tag(BaseModel):
    slug: str
    label: str


class CategoryRef(BaseModel):
    id: Optional[str] = None
    slug: str
    label: str
    color: Optional[str] = None


class SEO(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    canonical: Optional[str] = None
    og_image: Optional[MediaRef] = None


class Timestamps(BaseModel):
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    published_at: Optional[date | datetime] = None
