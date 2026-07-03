"""Destinations router."""
from typing import Optional

from fastapi import APIRouter, Depends, Query

from app.core.pagination import PaginationParams, pagination
from app.core.response import item_response, list_response
from app.dependencies import get_db
from app.services import destinations_service

router = APIRouter(prefix="/destinations", tags=["destinations"])


@router.get("")
def list_destinations(
    p: PaginationParams = Depends(pagination),
    category: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    q: Optional[str] = Query(None, description="Full-text search on title"),
    featured: Optional[bool] = Query(None),
    db=Depends(get_db),
):
    rows, total = destinations_service.list_destinations(
        db, limit=p.limit, offset=p.offset,
        category=category, district=district, q=q, featured=featured,
    )
    return list_response(rows, total=total, limit=p.limit, offset=p.offset)


@router.get("/{slug}")
def get_destination(slug: str, db=Depends(get_db)):
    return item_response(destinations_service.get_destination_by_slug(db, slug))
