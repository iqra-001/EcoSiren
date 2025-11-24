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
    <div className="ai-insights-panel p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">AI Analysis & Insights</h3>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2">Overall Trend</h4>
        <div className={`trend-indicator ${insights.overallTrend} inline-block px-3 py-1 rounded-full text-white ${
          insights.overallTrend === 'increasing' ? 'bg-red-500' : 
          insights.overallTrend === 'decreasing' ? 'bg-green-500' : 'bg-yellow-500'
        }`}>
          {insights.overallTrend}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">High Risk Areas</h4>
        <ul className="risk-areas list-disc list-inside">
          {insights.highRiskAreas.map((area, index) => (
            <li key={index} className="text-sm">{area}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Statistics</h4>
        <div className="stats-grid grid grid-cols-2 gap-2 text-sm">
          <div className="stat-item">
            <span>Total Infested:</span>
            <strong className="ml-1">{statistics.totalInfested}</strong>
          </div>
          <div className="stat-item">
            <span>Clear Zones:</span>
            <strong className="ml-1">{statistics.clearZones}</strong>
          </div>
          <div className="stat-item">
            <span>Critical Areas:</span>
            <strong className="ml-1">{statistics.criticalAreas}</strong>
          </div>
          <div className="stat-item">
            <span>Avg Spread Rate:</span>
            <strong className="ml-1">{statistics.averageSpreadRate}</strong>
          </div>
          <div className="stat-item">
            <span>Community Engagement:</span>
            <strong className="ml-1">{statistics.communityEngagement}%</strong>
          </div>
          <div className="stat-item">
            <span>Prediction Accuracy:</span>
            <strong className="ml-1">{statistics.predictionAccuracy}%</strong>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Recommended Actions</h4>
        <ul className="recommendations list-disc list-inside">
          {insights.recommendedActions.map((action, index) => (
            <li key={index} className="text-sm">{action}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const MapPage = ({ onNavigate }) => {
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
      const points = [
        { id: 1, lat: 35, lng: 45, level: "high", location: "Baringo County", reports: 24, lastReportDate: new Date(2024, 10, 15) },
        { id: 2, lat: 55, lng: 30, level: "high", location: "Turkana Region", reports: 18, lastReportDate: new Date(2024, 10, 18) },
        { id: 3, lat: 70, lng: 65, level: "medium", location: "Samburu Area", reports: 12, lastReportDate: new Date(2024, 10, 20) },
        { id: 4, lat: 25, lng: 70, level: "medium", location: "Tana River", reports: 9, lastReportDate: new Date(2024, 10, 12) },
        { id: 5, lat: 45, lng: 80, level: "low", location: "Garissa Region", reports: 5, lastReportDate: new Date(2024, 10, 10) },
        { id: 6, lat: 80, lng: 40, level: "low", location: "Isiolo County", reports: 3, lastReportDate: new Date(2024, 10, 8) },
        { id: 7, lat: 60, lng: 50, level: "none", location: "Marsabit Safe Zone", reports: 0 },
        { id: 8, lat: 40, lng: 25, level: "none", location: "Laikipia Restoration", reports: 0 },
      ];
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading prediction data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">AI-Powered Infestation Prediction Map</h1>
          <p className="text-gray-600 mt-2">Real-time monitoring and predictive analysis of Prosopis juliflora spread</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="map-visualization relative h-96 bg-blue-50 rounded-lg border-2 border-gray-200">
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
                
                <div className="map-background absolute inset-0 flex items-center justify-center text-gray-500">
                  Interactive Map Visualization
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span>High Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Medium Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>Low Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span>Prediction Zone</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {selectedPoint && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Selected Point Details</h3>
                <div className="space-y-2">
                  <p><strong className="text-gray-700">Location:</strong> {selectedPoint.location}</p>
                  <p><strong className="text-gray-700">Risk Level:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedPoint.level === 'high' ? 'bg-red-100 text-red-800' :
                      selectedPoint.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      selectedPoint.level === 'low' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedPoint.level}
                    </span>
                  </p>
                  <p><strong className="text-gray-700">Reports:</strong> {selectedPoint.reports}</p>
                  {selectedPoint.lastReportDate && (
                    <p><strong className="text-gray-700">Last Report:</strong> {selectedPoint.lastReportDate.toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            )}

            {selectedZone && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Prediction Zone Details</h3>
                <div className="space-y-2">
                  <p><strong className="text-gray-700">Predicted Level:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedZone.predictedLevel === 'high' ? 'bg-red-100 text-red-800' :
                      selectedZone.predictedLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedZone.predictedLevel}
                    </span>
                  </p>
                  <p><strong className="text-gray-700">Risk Score:</strong> {selectedZone.riskLevel}/100</p>
                  <p><strong className="text-gray-700">Confidence:</strong> {selectedZone.confidence}%</p>
                  <p><strong className="text-gray-700">Timeframe:</strong> {selectedZone.timeframe}</p>
                </div>
              </div>
            )}

            {!selectedPoint && !selectedZone && (
              <AIInsightsPanel insights={aiInsights} statistics={statistics} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// AI Prediction Service (simplified for React)
class AIPredictionService {
  static generatePredictions(currentData) {
    const predictions = [];
    let predictionId = 1000;

    currentData.forEach(point => {
      if (point.level === "high" || point.level === "medium") {
        const spreadFactor = point.level === "high" ? 1.5 : 1.0;
        const reportWeight = Math.min(point.reports / 10, 2);
        
        const zones = [
          { latOffset: 8, lngOffset: 10 },
          { latOffset: -8, lngOffset: 10 },
          { latOffset: 10, lngOffset: -8 },
          { latOffset: -5, lngOffset: 15 }
        ];

        zones.forEach((zone, idx) => {
          const riskLevel = this.calculateRiskLevel(point, spreadFactor, reportWeight, idx);
          
          if (riskLevel > 30) {
            predictions.push({
              id: predictionId++,
              lat: point.lat + zone.latOffset,
              lng: point.lng + zone.lngOffset,
              riskLevel,
              predictedLevel: this.getRiskCategory(riskLevel),
              confidence: this.calculateConfidence(point.reports, riskLevel),
              timeframe: this.getTimeframe(riskLevel)
            });
          }
        });
      }
    });

    return predictions;
  }

  static calculateRiskLevel(point, spreadFactor, reportWeight, zoneIndex) {
    const baseRisk = point.level === "high" ? 75 : 55;
    const reportInfluence = reportWeight * 10;
    const distanceDecay = (4 - zoneIndex) * 5;
    const randomVariation = Math.random() * 10;
    
    return Math.min(100, Math.round(baseRisk * spreadFactor + reportInfluence + distanceDecay + randomVariation));
  }

  static getRiskCategory(risk) {
    if (risk >= 70) return "high";
    if (risk >= 45) return "medium";
    return "low";
  }

  static calculateConfidence(reports, riskLevel) {
    const dataQuality = Math.min(reports / 20, 1) * 40;
    const baseConfidence = 45;
    const riskFactor = riskLevel > 60 ? 15 : 10;
    
    return Math.min(100, Math.round(baseConfidence + dataQuality + riskFactor));
  }

  static getTimeframe(risk) {
    if (risk >= 75) return "1-2 months";
    if (risk >= 60) return "2-4 months";
    if (risk >= 45) return "4-6 months";
    return "6-12 months";
  }

  static generateInsights(data) {
    const highRisk = data.filter(d => d.level === "high").length;
    const mediumRisk = data.filter(d => d.level === "medium").length;
    
    const trendScore = (highRisk * 0.5 + mediumRisk * 0.3) / data.length;
    const overallTrend = trendScore > 0.2 ? "increasing" : trendScore < -0.1 ? "decreasing" : "stable";

    const highRiskAreas = data
      .filter(d => d.level === "high")
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 3)
      .map(d => d.location);

    const recommendedActions = [];
    if (trend === "increasing") {
      recommendedActions.push("Urgent: Deploy eradication teams to high-risk zones immediately");
      recommendedActions.push("Increase community awareness campaigns in buffer zones");
    }
    if (highRisk >= 3) {
      recommendedActions.push("Prioritize coordinated action in the most affected regions");
    }
    recommendedActions.push("Continue regular community reporting to track spread patterns");

    const predictedSpread = Math.round(highRisk * 8 + mediumRisk * 4);
    const affectedAreaKm2 = (highRisk * 15 + mediumRisk * 8) * 1.5;
    const monthlyGrowthRate = predictedSpread / 4;

    return {
      overallTrend,
      highRiskAreas,
      recommendedActions,
      predictedSpread,
      affectedAreaKm2,
      monthlyGrowthRate
    };
  }

  static computeStatistics(data) {
    const totalInfested = data.filter(d => d.level !== "none").length;
    const clearZones = data.filter(d => d.level === "none").length;
    const criticalAreas = data.filter(d => d.level === "high").length;
    const totalReports = data.reduce((sum, d) => sum + d.reports, 0);

    const averageSpreadRate = data
      .filter(d => d.level !== "none")
      .reduce((sum, d) => {
        const rate = d.level === "high" ? 2.5 : d.level === "medium" ? 1.5 : 0.8;
        return sum + rate;
      }, 0) / Math.max(totalInfested, 1);

    const communityEngagement = Math.min(100, Math.round((totalReports / data.length) * 3.5));
    const predictionAccuracy = Math.min(95, 65 + Math.round(totalReports / 3));

    return {
      totalInfested,
      clearZones,
      averageSpreadRate: Math.round(averageSpreadRate * 100) / 100,
      criticalAreas,
      communityEngagement,
      predictionAccuracy
    };
  }
}