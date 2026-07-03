"""Events router."""
from typing import Literal, Optional

from fastapi import APIRouter, Depends, Query

from app.core.pagination import PaginationParams, pagination
from app.core.response import item_response, list_response
from app.dependencies import get_db
from app.services import events_service

router = APIRouter(prefix="/events", tags=["events"])


@router.get("")
def list_events(
    p: PaginationParams = Depends(pagination),
    category: Optional[str] = Query(None),
    when: Optional[Literal["upcoming", "ongoing", "past"]] = Query(None),
    q: Optional[str] = Query(None),
    featured: Optional[bool] = Query(None),
    db=Depends(get_db),
):
    rows, total = events_service.list_events(
        db, limit=p.limit, offset=p.offset,
        category=category, when=when, q=q, featured=featured,
    )
    return list_response(rows, total=total, limit=p.limit, offset=p.offset)


@router.get("/{slug}")
def get_event(slug: str, db=Depends(get_db)):
    return item_response(events_service.get_event_by_slug(db, slug))
