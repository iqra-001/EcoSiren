# EcoSiren Backend

This is the FastAPI backend for EcoSiren, handling Google Earth Engine (GEE) integration and serving data to the frontend.

## 🛠 Tools Used
- **Python 3.9+**
- **FastAPI**: Modern, fast web framework for building APIs.
- **Google Earth Engine API**: For satellite data processing and analysis.
- **Uvicorn**: ASGI server.

## 📂 Project Structure
```
backend/
├── app/
│   ├── core/
│   │   └── config.py       # Configuration settings
│   ├── routers/
│   │   ├── home.py         # Homepage/Health check
│   │   ├── map.py          # Map tile endpoints (GEE)
│   │   └── impact.py       # Impact dashboard stats
│   ├── services/
│   │   └── gee.py          # Google Earth Engine logic
│   └── main.py             # App entry point
├── requirements.txt
└── README.md
```

## 🚀 Getting Started

### 1. Prerequisites
- Python installed.
- Google Earth Engine account active.

### 2. Installation
Navigate to the `backend` directory and install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### 3. Google Earth Engine Authentication
You must authenticate with GEE for the backend to work. Run:
```bash
earthengine authenticate
```
Follow the instructions in the terminal to paste the authorization code.

### 4. Running the Server
Start the development server:
```bash
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`.

### 5. API Documentation
Once running, visit `http://localhost:8000/docs` for the interactive Swagger UI documentation.

## 🌍 Endpoints
- **GET /**: Welcome message.
- **GET /api/map/tile-url**: Returns the tile URL format and map ID for the Prosopis layer.
- **GET /api/impact/stats**: Returns statistical data for the impact dashboard.
