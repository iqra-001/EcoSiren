import React from 'react';
import { useDataService } from './DataServiceHook';

// Impact Analytics Component
const ImpactAnalytics = () => {
  const data = useDataService();

  const calculateImpactMetrics = () => {
    if (!data.summaryStats) return null;
    
    const stats = data.summaryStats;
    const regionalData = data.regionalData;
    const historical = data.historicalData;

    // Environmental Impact Calculations
    const treesPlanted = stats.treesPlanted;
    const hectaresCleared = stats.hectaresCleared;
    
    const co2Offset = Math.round((treesPlanted * 21) / 1000 * 10) / 10;
    const waterSaved = Math.round(hectaresCleared * 100 * 200 * 365);
    const biodiversityScore = Math.min(100, Math.round(
      (stats.safeZones / stats.areasReported) * 100 * 0.7 + 
      (treesPlanted / 10000) * 30
    ));
    const ecosystemHealth = Math.round(
      100 - (stats.highRiskAreas / stats.areasReported) * 50 - 
      ((stats.areasReported - stats.safeZones - stats.highRiskAreas) / stats.areasReported) * 25
    );

    // Community Impact Calculations
    const livelihoods = Math.round(hectaresCleared * 4.5);
    const grazingLandRestored = Math.round(hectaresCleared * 0.85 * 10) / 10;
    const waterAccessImproved = Math.floor(stats.safeZones * 1.5);
    const economicValue = Math.round(hectaresCleared * 500);

    // Performance Metrics
    const responseTime = calculateAverageResponseTime(historical);
    const successRate = calculateSuccessRate(regionalData);
    const efficiency = calculateEfficiency(stats, historical);
    const momentum = calculateMomentum(historical);

    return {
      environmentalImpact: {
        co2Offset,
        waterSaved,
        biodiversityScore,
        ecosystemHealth
      },
      communityImpact: {
        livelihoods,
        grazingLandRestored,
        waterAccessImproved,
        economicValue
      },
      performanceMetrics: {
        responseTime,
        successRate,
        efficiency,
        momentum
      }
    };
  };

  const calculateAverageResponseTime = (historical) => {
    if (!historical || historical.length === 0) return 10;
    const improvement = historical.length * 0.5;
    return Math.max(5, Math.round(14 - improvement));
  };

  const calculateSuccessRate = (regionalData) => {
    if (!regionalData) return 75;
    const successful = regionalData.filter(r => 
      r.trend === "improving" || (r.trend === "stable" && r.infestationLevel === "low")
    ).length;
    
    return Math.round((successful / regionalData.length) * 100);
  };

  const calculateEfficiency = (stats, historical) => {
    if (!stats || !historical || historical.length === 0) return 70;
    const reportsPerArea = stats.totalReports / stats.areasReported;
    const growthRate = (historical[historical.length - 1].areasCleared - 
                       historical[0].areasCleared) / historical[0].areasCleared;
    
    return Math.min(100, Math.round((reportsPerArea * 5 + growthRate * 100) * 0.7));
  };

  const calculateMomentum = (historical) => {
    if (!historical || historical.length < 3) return "steady";
    
    const recent = historical.slice(-3);
    const growth1 = recent[1].areasCleared - recent[0].areasCleared;
    const growth2 = recent[2].areasCleared - recent[1].areasCleared;
    
    if (growth2 > growth1 * 1.1) return "accelerating";
    if (growth2 < growth1 * 0.9) return "slowing";
    return "steady";
  };

  const generatePredictiveInsights = () => {
    if (!data.historicalData || !data.summaryStats || !data.monthlyComparison) return null;

    const historical = data.historicalData;
    const stats = data.summaryStats;
    const comparison = data.monthlyComparison;
    
    const trend = calculateTrendLine(historical);
    const nextMonthProjection = {
      expectedReports: Math.round(trend.reports * 1.15),
      projectedCleared: Math.round(trend.cleared * 1.22),
      projectedPlanted: Math.round(trend.planted * 1.18),
      confidence: calculateProjectionConfidence(historical)
    };

    const quarterlyImpact = calculateQuarterlyImpact(nextMonthProjection);
    const riskLevel = assessQuarterlyRisk(stats, trend);
    const opportunities = identifyOpportunities(stats, trend);
    const recommendations = generateRecommendations(stats, trend, comparison);

    return {
      nextMonthProjection,
      quarterlyForecast: {
        totalImpact: quarterlyImpact,
        riskLevel,
        opportunities
      },
      recommendations
    };
  };

  const calculateTrendLine = (historical) => {
    if (!historical || historical.length === 0) return { reports: 50, cleared: 20, planted: 6000 };
    const latest = historical[historical.length - 1];
    return {
      reports: latest.reports,
      cleared: latest.areasCleared,
      planted: latest.treesPlanted
    };
  };

  const calculateProjectionConfidence = (historical) => {
    if (!historical || historical.length < 2) return 65;
    const consistency = calculateConsistency(historical);
    const dataPoints = historical.length;
    
    return Math.min(95, Math.round(60 + consistency * 20 + dataPoints * 3));
  };

  const calculateConsistency = (historical) => {
    if (historical.length < 2) return 0.5;
    
    let variance = 0;
    for (let i = 1; i < historical.length; i++) {
      const change = Math.abs(historical[i].reports - historical[i - 1].reports) / 
                     historical[i - 1].reports;
      variance += change;
    }
    
    return Math.max(0, 1 - (variance / historical.length));
  };

  const calculateQuarterlyImpact = (projection) => {
    return Math.round(
      projection.projectedCleared * 3 * 500 +
      projection.projectedPlanted * 3 * 5
    );
  };

  const assessQuarterlyRisk = (stats, trend) => {
    const riskScore = stats.highRiskAreas / stats.areasReported;
    
    if (riskScore > 0.4) return "high";
    if (riskScore > 0.2) return "medium";
    return "low";
  };

  const identifyOpportunities = (stats, trend) => {
    const opportunities = [];
    
    if (stats.safeZones >= 2) {
      opportunities.push("Expand tree planting programs in safe zones");
    }
    
    if (trend.reports > 50) {
      opportunities.push("Leverage community momentum for large-scale interventions");
    }
    
    if (stats.treesPlanted > 5000) {
      opportunities.push("Document success stories for awareness campaigns");
    }
    
    opportunities.push("Partner with local organizations for resource mobilization");
    
    return opportunities;
  };

  const generateRecommendations = (stats, trend, comparison) => {
    const recommendations = [];
    
    if (stats.highRiskAreas > 0) {
      recommendations.push({
        priority: "high",
        action: "Deploy rapid response teams to high-risk areas",
        expectedImpact: `Could prevent ${Math.round(stats.highRiskAreas * 5)}+ hectares of spread`
      });
    }
    
    if (comparison.changes.reports > 10) {
      recommendations.push({
        priority: "medium",
        action: "Scale up verification and response capacity",
        expectedImpact: "Maintain rapid response to increased reporting"
      });
    }
    
    recommendations.push({
      priority: "medium",
      action: "Launch community training programs in underserved regions",
      expectedImpact: "Expand monitoring coverage by 30%"
    });
    
    if (stats.treesPlanted > 3000) {
      recommendations.push({
        priority: "low",
        action: "Establish tree nurseries in successful regions",
        expectedImpact: "Reduce planting costs by 40%"
      });
    }
    
    return recommendations;
  };

  const analyzeEngagement = () => {
    if (!data.engagement || !data.historicalData) return null;

    const engagement = data.engagement;
    const historical = data.historicalData;
    
    const recentGrowth = (historical[historical.length - 1].activeMembers - 
                         historical[historical.length - 2].activeMembers) / 
                         historical[historical.length - 2].activeMembers;
    
    const participationTrend = recentGrowth > 0.05 ? "rising" : 
                              recentGrowth < -0.05 ? "declining" : "stable";

    const activationRate = Math.round((engagement.activeMembers / engagement.totalMembers) * 100);
    const retentionRate = Math.round(activationRate * 0.85);
    const viralityScore = Math.min(100, Math.round(
      activationRate * 0.4 + 
      (engagement.averageReportsPerMember * 10) * 0.3 +
      (recentGrowth * 100) * 0.3
    ));

    const topPerformers = engagement.topContributors.slice(0, 3).map((contributor, index) => ({
      region: contributor.region,
      score: Math.round(100 - (index * 15) - Math.random() * 10),
      achievement: getAchievement(index)
    }));

    return {
      participationTrend,
      activationRate,
      retentionRate,
      viralityScore,
      topPerformers
    };
  };

  const getAchievement = (rank) => {
    const achievements = [
      "Outstanding Community Champion",
      "Exceptional Environmental Steward",
      "Dedicated Conservation Leader"
    ];
    return achievements[rank] || "Active Contributor";
  };

  const impactMetrics = calculateImpactMetrics();
  const predictiveInsights = generatePredictiveInsights();
  const engagementAnalytics = analyzeEngagement();

  if (!impactMetrics || !predictiveInsights || !engagementAnalytics) {
    return <div className="p-6">Loading impact analytics...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Impact Analytics Dashboard</h2>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4">🌿 Environmental Impact</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-green-700">CO₂ Offset</h4>
            <p className="text-2xl font-bold text-green-800">{impactMetrics.environmentalImpact.co2Offset} tons</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-blue-700">Water Saved</h4>
            <p className="text-2xl font-bold text-blue-800">
              {(impactMetrics.environmentalImpact.waterSaved / 1000000).toFixed(1)}M L
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-purple-700">Biodiversity Score</h4>
            <p className="text-2xl font-bold text-purple-800">{impactMetrics.environmentalImpact.biodiversityScore}/100</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-teal-700">Ecosystem Health</h4>
            <p className="text-2xl font-bold text-teal-800">{impactMetrics.environmentalImpact.ecosystemHealth}/100</p>
          </div>
        </div>
      </div>

      {/* Community Impact */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
        <h3 className="text-xl font-bold text-orange-800 mb-4">👥 Community Impact</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-orange-700">Livelihoods Improved</h4>
            <p className="text-2xl font-bold text-orange-800">{impactMetrics.communityImpact.livelihoods} families</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-amber-700">Grazing Land Restored</h4>
            <p className="text-2xl font-bold text-amber-800">{impactMetrics.communityImpact.grazingLandRestored} ha</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-yellow-700">Water Access Improved</h4>
            <p className="text-2xl font-bold text-yellow-800">{impactMetrics.communityImpact.waterAccessImproved} communities</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-lime-700">Economic Value</h4>
            <p className="text-2xl font-bold text-lime-800">${impactMetrics.communityImpact.economicValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4">📊 Performance Metrics</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-blue-700">Response Time</h4>
            <p className="text-2xl font-bold text-blue-800">{impactMetrics.performanceMetrics.responseTime} days</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-green-700">Success Rate</h4>
            <p className="text-2xl font-bold text-green-800">{impactMetrics.performanceMetrics.successRate}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-purple-700">Efficiency</h4>
            <p className="text-2xl font-bold text-purple-800">{impactMetrics.performanceMetrics.efficiency}/100</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-orange-700">Momentum</h4>
            <p className={`text-2xl font-bold ${
              impactMetrics.performanceMetrics.momentum === 'accelerating' ? 'text-green-600' :
              impactMetrics.performanceMetrics.momentum === 'slowing' ? 'text-red-600' :
              'text-yellow-600'
            }`}>
              {impactMetrics.performanceMetrics.momentum}
            </p>
          </div>
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4">🔮 AI Predictive Insights</h3>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-700 mb-3">Next Month Projection</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Expected Reports:</span>
                <span className="font-bold">{predictiveInsights.nextMonthProjection.expectedReports}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Projected Cleared:</span>
                <span className="font-bold">{predictiveInsights.nextMonthProjection.projectedCleared} ha</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Projected Planted:</span>
                <span className="font-bold">{predictiveInsights.nextMonthProjection.projectedPlanted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Confidence:</span>
                <span className="font-bold">{predictiveInsights.nextMonthProjection.confidence}%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-700 mb-3">Quarterly Forecast</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Total Impact Value:</span>
                <span className="font-bold">${predictiveInsights.quarterlyForecast.totalImpact.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Risk Level:</span>
                <span className={`font-bold px-2 py-1 rounded ${
                  predictiveInsights.quarterlyForecast.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                  predictiveInsights.quarterlyForecast.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {predictiveInsights.quarterlyForecast.riskLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6">
          <h4 className="font-semibold text-purple-700 mb-3">AI Recommendations</h4>
          <div className="space-y-2">
            {predictiveInsights.recommendations.map((rec, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                rec.priority === 'high' ? 'bg-red-50 border-red-400' :
                rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                'bg-green-50 border-green-400'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{rec.action}</p>
                    <p className="text-sm text-gray-600">{rec.expectedImpact}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    rec.priority === 'high' ? 'bg-red-200 text-red-800' :
                    rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Analytics */}
      {engagementAnalytics && (
        <div className="bg-gradient-to-r from-cyan-50 to-sky-50 p-6 rounded-xl border border-cyan-200">
          <h3 className="text-xl font-bold text-cyan-800 mb-4">👥 Community Engagement Analytics</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h4 className="font-semibold text-cyan-700">Participation Trend</h4>
              <p className={`text-2xl font-bold ${
                engagementAnalytics.participationTrend === 'rising' ? 'text-green-600' :
                engagementAnalytics.participationTrend === 'declining' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {engagementAnalytics.participationTrend}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h4 className="font-semibold text-sky-700">Activation Rate</h4>
              <p className="text-2xl font-bold text-sky-800">{engagementAnalytics.activationRate}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h4 className="font-semibold text-blue-700">Retention Rate</h4>
              <p className="text-2xl font-bold text-blue-800">{engagementAnalytics.retentionRate}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h4 className="font-semibold text-indigo-700">Virality Score</h4>
              <p className="text-2xl font-bold text-indigo-800">{engagementAnalytics.viralityScore}/100</p>
            </div>
          </div>

          <h4 className="font-semibold text-cyan-700 mb-3">Top Performing Regions</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {engagementAnalytics.topPerformers.map((performer, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                <h5 className="font-semibold text-gray-800">{performer.region}</h5>
                <p className="text-2xl font-bold text-cyan-800">{performer.score}/100</p>
                <p className="text-sm text-gray-600">{performer.achievement}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpactAnalytics;