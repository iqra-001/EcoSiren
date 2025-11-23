import ee

from app.core.config import settings

# Initialize Earth Engine
try:
    # Try to initialize with the configured project
    ee.Initialize(project=settings.EE_PROJECT_ID)
except Exception as e:
    print(f"GEE Initialization with project failed: {e}")
    try:
        # Fallback to default initialization (relies on local config)
        ee.Initialize()
    except Exception as e2:
        print(f"GEE Default Initialization failed: {e2}")
        try:
            ee.Authenticate()
            ee.Initialize(project=settings.EE_PROJECT_ID)
        except Exception as e3:
            print(f"GEE Authentication/Initialization failed: {e3}")

def get_prosopis_layer():
    """
    Generates the Prosopis infestation map layer.
    Returns the map ID and token for the tile layer.
    """
    # 1. Define Region of Interest (Kenya)
    roi = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017').filter(ee.Filter.eq('country_na', 'Kenya'))

    # 2. Load Datasets
    startDate = '2024-01-01'
    endDate = '2024-03-31'

    # Sentinel-2
    def mask_clouds(image):
        qa = image.select('QA60')
        mask = qa.bitwiseAnd(1 << 10).eq(0).And(qa.bitwiseAnd(1 << 11).eq(0))
        return image.updateMask(mask).divide(10000)

    sentinel = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') \
        .filterBounds(roi) \
        .filterDate(startDate, endDate) \
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) \
        .map(mask_clouds) \
        .median() \
        .clip(roi)

    # Environmental Data
    precip = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY') \
        .filterDate(startDate, endDate) \
        .mean() \
        .clip(roi) \
        .rename('precipitation')

    temp = ee.ImageCollection('MODIS/061/MOD11A2') \
        .filterDate(startDate, endDate) \
        .mean() \
        .select('LST_Day_1km') \
        .multiply(0.02).subtract(273.15) \
        .clip(roi) \
        .rename('temperature')

    clay = ee.Image('OpenLandMap/SOL/SOL_CLAY-WFRACTION_USDA-3A1A1A_M/v02') \
        .select('b0').clip(roi).rename('clay')

    sand = ee.Image('OpenLandMap/SOL/SOL_SAND-WFRACTION_USDA-3A1A1A_M/v02') \
        .select('b0').clip(roi).rename('sand')

    ph = ee.Image('OpenLandMap/SOL/SOL_PH-H2O_USDA-4C1A2A_M/v02') \
        .select('b0').clip(roi).rename('ph')

    # 3. Calculate Indices
    bands = ['B2', 'B3', 'B4', 'B8', 'B11', 'B12']
    image = sentinel.select(bands)

    ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI')
    
    evi = image.expression(
        '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))',
        {
            'NIR': image.select('B8'),
            'RED': image.select('B4'),
            'BLUE': image.select('B2')
        }
    ).rename('EVI')

    savi = image.expression(
        '((NIR - RED) / (NIR + RED + 0.5)) * 1.5',
        {
            'NIR': image.select('B8'),
            'RED': image.select('B4')
        }
    ).rename('SAVI')

    ndwi = image.normalizedDifference(['B8', 'B11']).rename('NDWI')

    composite = image \
        .addBands(ndvi) \
        .addBands(evi) \
        .addBands(savi) \
        .addBands(ndwi) \
        .addBands(precip) \
        .addBands(temp) \
        .addBands(clay) \
        .addBands(sand) \
        .addBands(ph)

    # 4. Training Data (Placeholders - same as JS)
    prosopisSamples = ee.FeatureCollection([
        ee.Feature(ee.Geometry.Point([39.6464, -0.4536]), {'class': 0, 'name': 'prosopis'}),
        ee.Feature(ee.Geometry.Point([36.0, 0.5]), {'class': 0, 'name': 'prosopis'}),
        ee.Feature(ee.Geometry.Point([40.1, -0.2]), {'class': 0, 'name': 'prosopis'})
    ])

    nativeSamples = ee.FeatureCollection([
        ee.Feature(ee.Geometry.Point([37.0, -1.0]), {'class': 1, 'name': 'native'}),
        ee.Feature(ee.Geometry.Point([35.0, 0.0]), {'class': 1, 'name': 'native'}),
        ee.Feature(ee.Geometry.Point([38.0, -3.0]), {'class': 1, 'name': 'native'})
    ])

    bareSamples = ee.FeatureCollection([
        ee.Feature(ee.Geometry.Point([39.0, 2.0]), {'class': 2, 'name': 'bare'}),
        ee.Feature(ee.Geometry.Point([36.0, 2.0]), {'class': 2, 'name': 'bare'}),
        ee.Feature(ee.Geometry.Point([40.0, 3.0]), {'class': 2, 'name': 'bare'})
    ])

    trainingPoints = prosopisSamples.merge(nativeSamples).merge(bareSamples)

    # 5. Train Model
    training = composite.sampleRegions(
        collection=trainingPoints,
        properties=['class'],
        scale=30,
        tileScale=16
    )

    classifier = ee.Classifier.smileRandomForest(
        numberOfTrees=100,
        seed=42
    ).train(
        features=training,
        classProperty='class',
        inputProperties=composite.bandNames()
    )

    classified = composite.classify(classifier)

    # 6. Risk Mapping
    prosopisMask = classified.eq(0)
    infestationDensity = prosopisMask \
        .reduceNeighborhood(
            reducer=ee.Reducer.mean(),
            kernel=ee.Kernel.circle(1000, 'meters'),
        ) \
        .multiply(100) \
        .rename('infestation_percent')

    # Visualization parameters
    vis_params = {
        'min': 0,
        'max': 100,
        'palette': ['#2ecc71', '#f1c40f', '#e67e22', '#e74c3c', '#8e44ad']
    }

    # Get Map ID
    map_id = infestationDensity.getMapId(vis_params)
    return map_id

def get_impact_stats():
    """
    Calculates statistics for the impact dashboard.
    Returns a dictionary of stats.
    """
    # Re-using the logic to get the classified image (simplified for stats)
    # In a production app, we would refactor the common logic into a separate function
    # For now, we'll just return mock data or simple calculations to ensure speed
    # as full GEE computation on every request might be slow.
    
    # Let's do a simple calculation on a smaller region or return cached/pre-calculated values
    # For this demo, we will return the structure the frontend expects.
    
    return {
        "total_infested_area_km2": 12500, # Placeholder or calculate dynamically
        "high_risk_zones_count": 45,
        "safe_planting_zones_km2": 50000,
        "recent_alerts": 12
    }
