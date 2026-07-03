"""Media router."""
from typing import Literal, Optional

from fastapi import APIRouter, Depends, Query

from app.core.pagination import PaginationParams, pagination
from app.core.response import item_response, list_response
from app.dependencies import get_db
from app.services import media_service

router = APIRouter(prefix="/media", tags=["media"])


@router.get("")
def list_media(
    p: PaginationParams = Depends(pagination),
    type: Optional[Literal["image", "video"]] = Query(None),
    category: Optional[str] = Query(None),
    q: Optional[str] = Query(None),
    db=Depends(get_db),
):
    rows, total = media_service.list_media(
        db, limit=p.limit, offset=p.offset, type=type, category=category, q=q,
    )
    return list_response(rows, total=total, limit=p.limit, offset=p.offset)


@router.get("/{media_id}")
def get_media(media_id: str, db=Depends(get_db)):
    return item_response(media_service.get_media_by_id(db, media_id))
