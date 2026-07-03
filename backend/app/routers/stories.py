"""Stories router."""
from typing import Optional

from fastapi import APIRouter, Depends, Query

from app.core.pagination import PaginationParams, pagination
from app.core.response import item_response, list_response
from app.dependencies import get_db
from app.services import stories_service

router = APIRouter(prefix="/stories", tags=["stories"])


@router.get("")
def list_stories(
    p: PaginationParams = Depends(pagination),
    column: Optional[str] = Query(None, description="Story column: heritage/voices/places/people/kitchen"),
    q: Optional[str] = Query(None),
    featured: Optional[bool] = Query(None),
    db=Depends(get_db),
):
    rows, total = stories_service.list_stories(
        db, limit=p.limit, offset=p.offset, column=column, q=q, featured=featured,
    )
    return list_response(rows, total=total, limit=p.limit, offset=p.offset)


@router.get("/{slug}")
def get_story(slug: str, db=Depends(get_db)):
    return item_response(stories_service.get_story_by_slug(db, slug))
