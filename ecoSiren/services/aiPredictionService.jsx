import React, { useState, useEffect } from 'react';

// Interfaces
const InfestationPoint = ({ id, lat, lng, level, location, reports, lastReportDate, spreadRate }) => ({
  id, lat, lng, level, location, reports, lastReportDate, spreadRate
});

const PredictionZone = ({ id, lat, lng, riskLevel, predictedLevel, confidence, timeframe }) => ({
  id, lat, lng, riskLevel, predictedLevel, confidence, timeframe
});

const AIInsights = ({ overallTrend, highRiskAreas, recommendedActions, predictedSpread, affectedAreaKm2, monthlyGrowthRate }) => ({
  overallTrend, highRiskAreas, recommendedActions, predictedSpread, affectedAreaKm2, monthlyGrowthRate
});

const StatisticsData = ({ totalInfested, clearZones, averageSpreadRate, criticalAreas, communityEngagement, predictionAccuracy }) => ({
  totalInfested, clearZones, averageSpreadRate, criticalAreas, communityEngagement, predictionAccuracy
});

// AI Prediction Service as React Hook
const useAIPrediction = () => {
  const calculateRiskLevel = (point, spreadFactor, reportWeight, zoneIndex) => {
    const baseRisk = point.level === "high" ? 75 : 55;
    const reportInfluence = reportWeight * 10;
    const distanceDecay = (4 - zoneIndex) * 5;
    const randomVariation = Math.random() * 10;
    
    return Math.min(
      100,
      Math.round(baseRisk * spreadFactor + reportInfluence + distanceDecay + randomVariation)
    );
  };

  const getRiskCategory = (risk) => {
    if (risk >= 70) return "high";
    if (risk >= 45) return "medium";
    return "low";
  };

  const calculateConfidence = (reports, riskLevel) => {
    const dataQuality = Math.min(reports / 20, 1) * 40;
    const baseConfidence = 45;
    const riskFactor = riskLevel > 60 ? 15 : 10;
    
    return Math.min(100, Math.round(baseConfidence + dataQuality + riskFactor));
  };

  const getTimeframe = (risk) => {
    if (risk >= 75) return "1-2 months";
    if (risk >= 60) return "2-4 months";
    if (risk >= 45) return "4-6 months";
    return "6-12 months";
  };

  const generatePredictions = (currentData) => {
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
          const riskLevel = calculateRiskLevel(point, spreadFactor, reportWeight, idx);
          
          if (riskLevel > 30) {
            predictions.push({
              id: predictionId++,
              lat: point.lat + zone.latOffset,
              lng: point.lng + zone.lngOffset,
              riskLevel,
              predictedLevel: getRiskCategory(riskLevel),
              confidence: calculateConfidence(point.reports, riskLevel),
              timeframe: getTimeframe(riskLevel)
            });
          }
        });
      }
    });

    return predictions;
  };

  const calculateTrendScore = (data) => {
    const highWeight = data.filter(d => d.level === "high").length * 0.5;
    const mediumWeight = data.filter(d => d.level === "medium").length * 0.3;
    const totalPoints = data.length;
    
    return (highWeight + mediumWeight) / totalPoints;
  };

  const calculateSpreadRate = (high, medium) => {
    const highImpact = high * 8;
    const mediumImpact = medium * 4;
    
    return Math.round(highImpact + mediumImpact);
  };

  const generateRecommendations = (data, trend) => {
    const recommendations = [];
    const highRisk = data.filter(d => d.level === "high").length;
    const clearZones = data.filter(d => d.level === "none").length;

    if (trend === "increasing") {
      recommendations.push("Urgent: Deploy eradication teams to high-risk zones immediately");
      recommendations.push("Increase community awareness campaigns in buffer zones");
    }

    if (highRisk >= 3) {
      recommendations.push("Prioritize coordinated action in the most affected regions");
      recommendations.push("Request additional resources for large-scale intervention");
    }

    if (clearZones > 0) {
      recommendations.push("Establish monitoring systems in clear zones to prevent spread");
      recommendations.push("Initiate native tree planting programs in protected areas");
    }

    recommendations.push("Continue regular community reporting to track spread patterns");

    return recommendations;
  };

  const generateInsights = (data) => {
    const highRisk = data.filter(d => d.level === "high").length;
    const mediumRisk = data.filter(d => d.level === "medium").length;
    const totalReports = data.reduce((sum, d) => sum + d.reports, 0);
    
    const trendScore = calculateTrendScore(data);
    const overallTrend = trendScore > 0.2 ? "increasing" : 
                        trendScore < -0.1 ? "decreasing" : "stable";

    const highRiskAreas = data
      .filter(d => d.level === "high")
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 3)
      .map(d => d.location);

    const recommendedActions = generateRecommendations(data, overallTrend);
    const predictedSpread = calculateSpreadRate(highRisk, mediumRisk);
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
  };

  const computeStatistics = (data) => {
    const totalInfested = data.filter(d => d.level !== "none").length;
    const clearZones = data.filter(d => d.level === "none").length;
    const totalReports = data.reduce((sum, d) => sum + d.reports, 0);
    const criticalAreas = data.filter(d => d.level === "high").length;

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
  };

  const analyzeLocationRisk = (targetLat, targetLng, data) => {
    let riskScore = 0;
    let nearbyThreats = 0;

    data.forEach(point => {
      if (point.level !== "none") {
        const distance = Math.sqrt(
          Math.pow(point.lat - targetLat, 2) + Math.pow(point.lng - targetLng, 2)
        );
        
        if (distance < 20) {
          const threatLevel = point.level === "high" ? 30 : 
                             point.level === "medium" ? 20 : 10;
          const proximityFactor = 1 - (distance / 20);
          riskScore += threatLevel * proximityFactor;
          nearbyThreats++;
        }
      }
    });

    riskScore = Math.min(100, Math.round(riskScore));

    let recommendation;
    if (riskScore > 70) {
      recommendation = "High risk area - immediate monitoring required";
    } else if (riskScore > 40) {
      recommendation = "Moderate risk - establish regular surveillance";
    } else {
      recommendation = "Low risk - suitable for tree planting initiatives";
    }

    return { riskScore, nearbyThreats, recommendation };
  };

  return {
    generatePredictions,
    generateInsights,
    computeStatistics,
    analyzeLocationRisk
  };
};

// Map Component
const MapComponent = () => {
  const [infestationData, setInfestationData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [insights, setInsights] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationAnalysis, setLocationAnalysis] = useState(null);

  const predictionService = useAIPrediction();

  // Mock data
  const mockInfestationData = [
    { id: 1, lat: 35, lng: 45, level: "high", location: "Baringo County", reports: 24, lastReportDate: new Date(2024, 10, 15) },
    { id: 2, lat: 55, lng: 30, level: "high", location: "Turkana Region", reports: 18, lastReportDate: new Date(2024, 10, 18) },
    { id: 3, lat: 70, lng: 65, level: "medium", location: "Samburu Area", reports: 12, lastReportDate: new Date(2024, 10, 20) },
    { id: 4, lat: 25, lng: 70, level: "medium", location: "Tana River", reports: 9, lastReportDate: new Date(2024, 10, 12) },
    { id: 5, lat: 45, lng: 80, level: "low", location: "Garissa Region", reports: 5, lastReportDate: new Date(2024, 10, 10) },
    { id: 6, lat: 80, lng: 40, level: "low", location: "Isiolo County", reports: 3, lastReportDate: new Date(2024, 10, 8) },
    { id: 7, lat: 60, lng: 50, level: "none", location: "Marsabit Safe Zone", reports: 0 },
    { id: 8, lat: 40, lng: 25, level: "none", location: "Laikipia Restoration", reports: 0 },
  ];

  useEffect(() => {
    setInfestationData(mockInfestationData);
    setPredictions(predictionService.generatePredictions(mockInfestationData));
    setInsights(predictionService.generateInsights(mockInfestationData));
    setStatistics(predictionService.computeStatistics(mockInfestationData));
  }, []);

  const handleLocationClick = (lat, lng) => {
    setSelectedLocation({ lat, lng });
    const analysis = predictionService.analyzeLocationRisk(lat, lng, mockInfestationData);
    setLocationAnalysis(analysis);
  };

  const getInfestationColor = (level) => {
    switch (level) {
      case 'high': return '#dc2626';
      case 'medium': return '#ea580c';
      case 'low': return '#ca8a04';
      case 'none': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#84cc16';
      default: return '#6b7280';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Prosopis Infestation Map</h2>
      
      {/* Map Visualization (Simplified) */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6 h-96 relative border-2 border-gray-300">
        <div className="absolute inset-4 bg-green-50 rounded-md border border-green-200">
          {/* Mock Map Points */}
          {infestationData.map(point => (
            <div
              key={point.id}
              className="absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2"
              style={{
                left: `${point.lng}%`,
                top: `${point.lat}%`,
                backgroundColor: getInfestationColor(point.level),
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
              onClick={() => handleLocationClick(point.lat, point.lng)}
              title={`${point.location} - ${point.level} risk`}
            />
          ))}
          
          {/* Prediction Zones */}
          {predictions.map(prediction => (
            <div
              key={prediction.id}
              className="absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-3 -translate-y-3 opacity-70"
              style={{
                left: `${prediction.lng}%`,
                top: `${prediction.lat}%`,
                backgroundColor: getRiskColor(prediction.predictedLevel),
                border: '2px dashed white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
              title={`Predicted ${prediction.predictedLevel} risk - ${prediction.timeframe}`}
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span>Current Infestation</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-1 border-2 border-white"></div>
              <span>Predicted Spread</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Analysis */}
      {locationAnalysis && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Location Analysis</h3>
          <p><strong>Risk Score:</strong> {locationAnalysis.riskScore}/100</p>
          <p><strong>Nearby Threats:</strong> {locationAnalysis.nearbyThreats}</p>
          <p><strong>Recommendation:</strong> {locationAnalysis.recommendation}</p>
        </div>
      )}

      {/* Statistics Grid */}
      {statistics && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-700">Total Infested Areas</h3>
            <p className="text-2xl font-bold text-red-800">{statistics.totalInfested}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-700">Clear Zones</h3>
            <p className="text-2xl font-bold text-green-800">{statistics.clearZones}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-700">Critical Areas</h3>
            <p className="text-2xl font-bold text-orange-800">{statistics.criticalAreas}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-700">Avg Spread Rate</h3>
            <p className="text-2xl font-bold text-blue-800">{statistics.averageSpreadRate}x</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-700">Community Engagement</h3>
            <p className="text-2xl font-bold text-purple-800">{statistics.communityEngagement}%</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h3 className="font-semibold text-indigo-700">Prediction Accuracy</h3>
            <p className="text-2xl font-bold text-indigo-800">{statistics.predictionAccuracy}%</p>
          </div>
        </div>
      )}

      {/* AI Insights */}
      {insights && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4">AI Insights & Predictions</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-purple-700 mb-2">Current Situation</h4>
              <div className="space-y-2">
                <p><strong>Overall Trend:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                    insights.overallTrend === 'increasing' ? 'bg-red-100 text-red-800' :
                    insights.overallTrend === 'decreasing' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {insights.overallTrend}
                  </span>
                </p>
                <p><strong>Predicted Spread:</strong> {insights.predictedSpread}% next quarter</p>
                <p><strong>Affected Area:</strong> {insights.affectedAreaKm2} km²</p>
                <p><strong>Monthly Growth:</strong> {insights.monthlyGrowthRate}%</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-purple-700 mb-2">High Risk Areas</h4>
              <ul className="list-disc list-inside space-y-1">
                {insights.highRiskAreas.map((area, index) => (
                  <li key={index} className="text-red-700">{area}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-purple-700 mb-2">Recommended Actions</h4>
            <ul className="space-y-2">
              {insights.recommendedActions.map((action, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;