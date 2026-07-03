"""Standardized response envelope.

All list endpoints return `{ data: […], meta: {…} }` so the frontend can trust
a single shape. Detail endpoints return `{ data: {…} }` for consistency.
"""
from typing import Any, Dict, Generic, List, Optional, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class Meta(BaseModel):
    total: int = 0
    limit: int = 20
    offset: int = 0
    page: int = 1
    size: int = 20
    has_more: bool = False
    extras: Dict[str, Any] = {}


class ListResponse(BaseModel, Generic[T]):
    data: List[T]
    meta: Meta


class ItemResponse(BaseModel, Generic[T]):
    data: T
    meta: Optional[Dict[str, Any]] = None


def list_response(rows: List[Any], *, total: int, limit: int, offset: int, **extras: Any) -> Dict[str, Any]:
    size = limit
    page = (offset // limit) + 1 if limit else 1
    return {
        "data": rows,
        "meta": {
            "total": total,
            "limit": limit,
            "offset": offset,
            "page": page,
            "size": size,
            "has_more": offset + limit < total,
            "extras": extras or {},
        },
    }


def item_response(row: Any, **meta_extras: Any) -> Dict[str, Any]:
    return {"data": row, "meta": meta_extras or None}
