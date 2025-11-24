import React, { useState, useEffect } from 'react';

// Prediction Zone Component
const PredictionZoneMarker = ({ zone, onClick }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44ff44';
      default: return '#cccccc';
    }
  };

  return (
    <div 
      className="prediction-zone-marker"
      style={{
        backgroundColor: getRiskColor(zone.predictedLevel),
        left: `${zone.lng}%`,
        top: `${zone.lat}%`,
      }}
      onClick={() => onClick(zone)}
      title={`${zone.predictedLevel} risk - ${zone.timeframe}`}
    >
      <div className="risk-level">{zone.riskLevel}</div>
      <div className="confidence">{zone.confidence}%</div>
    </div>
  );
};

// Infestation Point Component
const InfestationPointMarker = ({ point, onClick }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'high': return '#ff0000';
      case 'medium': return '#ff8800';
      case 'low': return '#ffff00';
      case 'none': return '#00ff00';
      default: return '#cccccc';
    }
  };

  return (
    <div 
      className="infestation-point-marker"
      style={{
        backgroundColor: getLevelColor(point.level),
        left: `${point.lng}%`,
        top: `${point.lat}%`,
      }}
      onClick={() => onClick(point)}
      title={`${point.location} - ${point.level} risk`}
    >
      <div className="reports">{point.reports}</div>
    </div>
  );
};

// AI Insights Panel
const AIInsightsPanel = ({ insights, statistics }) => {
  if (!insights || !statistics) return <div>Loading insights...</div>;

  return (
    <div className="ai-insights-panel">
      <h3>AI Analysis & Insights</h3>
      
      <div className="insights-section">
        <h4>Overall Trend</h4>
        <div className={`trend-indicator ${insights.overallTrend}`}>
          {insights.overallTrend}
        </div>
      </div>

      <div className="insights-section">
        <h4>High Risk Areas</h4>
        <ul className="risk-areas">
          {insights.highRiskAreas.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="insights-section">
        <h4>Statistics</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <span>Total Infested:</span>
            <strong>{statistics.totalInfested}</strong>
          </div>
          <div className="stat-item">
            <span>Clear Zones:</span>
            <strong>{statistics.clearZones}</strong>
          </div>
          <div className="stat-item">
            <span>Critical Areas:</span>
            <strong>{statistics.criticalAreas}</strong>
          </div>
          <div className="stat-item">
            <span>Avg Spread Rate:</span>
            <strong>{statistics.averageSpreadRate}</strong>
          </div>
          <div className="stat-item">
            <span>Community Engagement:</span>
            <strong>{statistics.communityEngagement}%</strong>
          </div>
          <div className="stat-item">
            <span>Prediction Accuracy:</span>
            <strong>{statistics.predictionAccuracy}%</strong>
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h4>Recommended Actions</h4>
        <ul className="recommendations">
          {insights.recommendedActions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>

      <div className="insights-section">
        <h4>Spread Prediction</h4>
        <div className="spread-metrics">
          <div className="metric">
            <span>Predicted Spread:</span>
            <strong>{insights.predictedSpread}%</strong>
          </div>
          <div className="metric">
            <span>Affected Area:</span>
            <strong>{insights.affectedAreaKm2} km²</strong>
          </div>
          <div className="metric">
            <span>Monthly Growth:</span>
            <strong>{insights.monthlyGrowthRate}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main AI Prediction Map Component
const AIPredictionMap = () => {
  const [infestationPoints, setInfestationPoints] = useState([]);
  const [predictionZones, setPredictionZones] = useState([]);
  const [aiInsights, setAiInsights] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Load infestation data
      const points = DataService.getInfestationPoints();
      setInfestationPoints(points);
      
      // Generate predictions
      const predictions = AIPredictionService.generatePredictions(points);
      setPredictionZones(predictions);
      
      // Generate insights and statistics
      setAiInsights(AIPredictionService.generateInsights(points));
      setStatistics(AIPredictionService.computeStatistics(points));
      
      setLoading(false);
    };

    loadData();
  }, []);

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setSelectedZone(null);
  };

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    setSelectedPoint(null);
  };

  const analyzeLocationRisk = (lat, lng) => {
    return AIPredictionService.analyzeLocationRisk(lat, lng, infestationPoints);
  };

  if (loading) {
    return <div className="loading">Loading prediction data...</div>;
  }

  return (
    <div className="ai-prediction-map">
      <h2>AI-Powered Infestation Prediction Map</h2>
      
      <div className="map-container">
        <div className="map-visualization">
          {/* Infestation Points */}
          {infestationPoints.map(point => (
            <InfestationPointMarker
              key={point.id}
              point={point}
              onClick={handlePointClick}
            />
          ))}
          
          {/* Prediction Zones */}
          {predictionZones.map(zone => (
            <PredictionZoneMarker
              key={zone.id}
              zone={zone}
              onClick={handleZoneClick}
            />
          ))}
          
          {/* Map background or actual map component would go here */}
          <div className="map-background">
            {/* This would be your actual map component */}
            <div className="map-placeholder">
              Interactive Map Visualization
            </div>
          </div>
        </div>

        <div className="map-sidebar">
          {selectedPoint && (
            <div className="selected-info">
              <h3>Selected Point</h3>
              <div className="point-details">
                <p><strong>Location:</strong> {selectedPoint.location}</p>
                <p><strong>Risk Level:</strong> {selectedPoint.level}</p>
                <p><strong>Reports:</strong> {selectedPoint.reports}</p>
                <p><strong>Last Report:</strong> {selectedPoint.lastReportDate?.toLocaleDateString()}</p>
              </div>
              
              <div className="risk-analysis">
                <h4>Risk Analysis</h4>
                {analyzeLocationRisk(selectedPoint.lat, selectedPoint.lng).recommendation}
              </div>
            </div>
          )}

          {selectedZone && (
            <div className="selected-info">
              <h3>Prediction Zone</h3>
              <div className="zone-details">
                <p><strong>Predicted Level:</strong> {selectedZone.predictedLevel}</p>
                <p><strong>Risk Score:</strong> {selectedZone.riskLevel}/100</p>
                <p><strong>Confidence:</strong> {selectedZone.confidence}%</p>
                <p><strong>Timeframe:</strong> {selectedZone.timeframe}</p>
              </div>
            </div>
          )}

          {!selectedPoint && !selectedZone && (
            <AIInsightsPanel insights={aiInsights} statistics={statistics} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPredictionMap;