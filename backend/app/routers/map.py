from fastapi import APIRouter, HTTPException
from app.services.gee import get_prosopis_layer

router = APIRouter()

@router.get("/tile-url")
async def get_map_tile_url():
    try:
        map_data = get_prosopis_layer()
        return {
            "urlFormat": map_data["tile_fetcher"].url_format,
            "mapId": map_data["mapid"],
            "token": map_data["token"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
