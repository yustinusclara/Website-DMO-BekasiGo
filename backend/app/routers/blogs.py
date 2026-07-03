"""Blog router."""
from typing import Optional

from fastapi import APIRouter, Depends, Query

from app.core.pagination import PaginationParams, pagination
from app.core.response import item_response, list_response
from app.dependencies import get_db
from app.services import blogs_service

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("")
def list_posts(
    p: PaginationParams = Depends(pagination),
    category: Optional[str] = Query(None),
    q: Optional[str] = Query(None),
    featured: Optional[bool] = Query(None),
    db=Depends(get_db),
):
    rows, total = blogs_service.list_posts(
        db, limit=p.limit, offset=p.offset, category=category, q=q, featured=featured,
    )
    return list_response(rows, total=total, limit=p.limit, offset=p.offset)


@router.get("/{slug}")
def get_post(slug: str, db=Depends(get_db)):
    return item_response(blogs_service.get_post_by_slug(db, slug))
