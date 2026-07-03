"""Trip planner router."""
from fastapi import APIRouter, Depends

from app.core.response import item_response
from app.dependencies import get_db
from app.schemas.trip_planner import RefineRequest, TripPlanRequest
from app.services import trip_planner_service

router = APIRouter(prefix="/trip-planner", tags=["trip-planner"])


@router.post("/generate")
def generate(req: TripPlanRequest, db=Depends(get_db)):
    return item_response(trip_planner_service.generate_plan(db, req))


@router.post("/refine")
def refine(req: RefineRequest, db=Depends(get_db)):
    return item_response(trip_planner_service.refine_plan(db, req))
