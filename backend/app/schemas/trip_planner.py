"""Trip planner schemas."""
from datetime import date, time
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field

TravelStyle = Literal["heritage", "family", "foodie", "nightlife", "nature", "shopping", "mixed"]


class TripPlanRequest(BaseModel):
    days: int = Field(1, ge=1, le=14)
    travel_style: TravelStyle = "mixed"
    party_size: int = Field(2, ge=1, le=20)
    with_kids: bool = False
    budget_level: Optional[int] = Field(None, ge=1, le=4)
    start_date: Optional[date] = None
    interests: List[str] = []
    constraints: Dict[str, Any] = {}


class TripPlanItem(BaseModel):
    id: Optional[str] = None
    day_number: int
    slot: int = 0
    entity_type: Literal["destination", "event", "restaurant", "hotel", "transport", "custom"]
    entity_id: Optional[str] = None
    title: str
    kicker: Optional[str] = None
    image_url: Optional[str] = None
    starts_at: Optional[time] = None
    duration_min: Optional[int] = None
    notes: Optional[str] = None
    ai_reason: Optional[str] = None
    data: Dict[str, Any] = {}


class TripPlan(BaseModel):
    id: Optional[str] = None
    title: Optional[str] = None
    ai_model: Optional[str] = None
    ai_summary: Optional[str] = None
    days: int
    travel_style: TravelStyle
    party_size: int
    with_kids: bool
    budget_level: Optional[int] = None
    start_date: Optional[date] = None
    interests: List[str] = []
    items: List[TripPlanItem] = []


class RefineRequest(BaseModel):
    trip_plan_id: str
    instruction: str


class RefineResponse(BaseModel):
    trip_plan: TripPlan
    changes: List[str] = []
