"""Homepage router."""
from fastapi import APIRouter, Depends

from app.core.response import item_response
from app.dependencies import get_db
from app.services import homepage_service

router = APIRouter(prefix="/homepage", tags=["homepage"])


@router.get("")
def get_homepage(db=Depends(get_db)):
    return item_response(homepage_service.get_homepage_payload(db))
