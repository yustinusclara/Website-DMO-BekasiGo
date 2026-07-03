"""Trip planner service.

This is the AI-facing service. It orchestrates:
  1. Read available destinations/events (filtered by planner_priority + interests).
  2. Call the LLM (Gemini by default) with a structured prompt.
  3. Parse the LLM output into TripPlan + TripPlanItem rows.
  4. Persist to trip_plans + trip_plan_items tables.
  5. Return the composed plan to the client.

Refinement pipeline (chat loop) appends a trip_plan_refinements row per turn
and re-computes items via structured diffs.
"""
from typing import Any, Dict, Optional

from app.db.supabase_client import SupabaseClient
from app.schemas.trip_planner import RefineRequest, TripPlan, TripPlanRequest


def generate_plan(db: Optional[SupabaseClient], req: TripPlanRequest) -> Dict[str, Any]:
    """Generate a new trip plan from user input.

    Sample-shaped output while Gemini is not yet wired (E-33).
    """
    return {
        "id": None,
        "title": f"A {req.days}-day {req.travel_style} plan in Bekasi",
        "ai_model": "scaffold-stub",
        "ai_summary": (
            "This is a scaffold response. Once Gemini is wired the summary"
            " will be a warm editorial paragraph tailored to the requester."
        ),
        "days": req.days,
        "travel_style": req.travel_style,
        "party_size": req.party_size,
        "with_kids": req.with_kids,
        "budget_level": req.budget_level,
        "start_date": req.start_date,
        "interests": req.interests,
        "items": [],
    }


def refine_plan(db: Optional[SupabaseClient], req: RefineRequest) -> Dict[str, Any]:
    """Apply a natural-language refinement to an existing plan."""
    return {
        "trip_plan": {
            "id": req.trip_plan_id,
            "title": "Refined plan (scaffold stub)",
            "ai_model": "scaffold-stub",
            "ai_summary": (
                f"Would apply your instruction: '{req.instruction}'."
            ),
            "days": 1,
            "travel_style": "mixed",
            "party_size": 2,
            "with_kids": False,
            "budget_level": None,
            "start_date": None,
            "interests": [],
            "items": [],
        },
        "changes": ["scaffold: no changes applied"],
    }
