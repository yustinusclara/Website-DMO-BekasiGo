"""Media asset schemas."""
from typing import List, Optional

from pydantic import BaseModel

from app.schemas.common import MediaRef, Timestamps


class MediaAsset(MediaRef):
    name: str
    category: Optional[str] = None
    aspect_ratio: Optional[str] = None
    bytes: Optional[int] = None
    used_in: Optional[str] = None
    tags: List[str] = []
    timestamps: Optional[Timestamps] = None
