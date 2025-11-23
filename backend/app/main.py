from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import home, map, impact
from app.core.config import settings

app = FastAPI(
    title="EcoSiren API",
    description="Backend for EcoSiren - Prosopis Juliflora Detection System",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:3000",  # React default port
    "*" # Allow all for development convenience
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(home.router, tags=["Home"])
app.include_router(map.router, prefix="/api/map", tags=["Map"])
app.include_router(impact.router, prefix="/api/impact", tags=["Impact"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
