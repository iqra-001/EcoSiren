from fastapi import APIRouter, HTTPException
from app.services.gee import get_impact_stats

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats():
    try:
        stats = get_impact_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
