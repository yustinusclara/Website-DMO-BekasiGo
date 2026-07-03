"""Pagination helpers (limit/offset + page/size dual support)."""
from fastapi import Query
from pydantic import BaseModel, Field


class PaginationParams(BaseModel):
    limit: int = Field(20, ge=1, le=100)
    offset: int = Field(0, ge=0)


def pagination(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    page: int | None = Query(None, ge=1),
    size: int | None = Query(None, ge=1, le=100),
) -> PaginationParams:
    """Support both limit/offset and page/size."""
    if page is not None and size is not None:
        return PaginationParams(limit=size, offset=(page - 1) * size)
    return PaginationParams(limit=limit, offset=offset)
