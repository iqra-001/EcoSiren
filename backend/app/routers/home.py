from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def root():
    return {
        "message": "Welcome to EcoSiren API",
        "status": "active",
        "version": "1.0.0"
    }
