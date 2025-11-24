import React, { useState, useEffect } from 'react';

// Impact Metrics Component
const ImpactMetricsCard = ({ metrics }) => {
  if (!metrics) return <div>Loading impact metrics...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-900">Impact Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700 border-b pb-2">Environmental Impact</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CO2 Offset:</span>
              <strong className="text-green-600">{metrics.environmentalImpact.co2Offset} tons</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Water Saved:</span>
              <strong className="text-blue-600">{metrics.environmentalImpact.waterSaved.toLocaleString()} liters</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Biodiversity Score:</span>
              <strong className="text-purple-600">{metrics.environmentalImpact.biodiversityScore}/100</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ecosystem Health:</span>
              <strong className="text-teal-600">{metrics.environmentalImpact.ecosystemHealth}/100</strong>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700 border-b pb-2">Community Impact</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Livelihoods:</span>
              <strong className="text-orange-600">{metrics.communityImpact.livelihoods} families</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Grazing Land Restored:</span>
              <strong className="text-green-600">{metrics.communityImpact.grazingLandRestored} hectares</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Water Access Improved:</span>
              <strong className="text-blue-600">{metrics.communityImpact.waterAccessImproved} communities</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Economic Value:</span>
              <strong className="text-green-600">${metrics.communityImpact.economicValue.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700 border-b pb-2">Performance Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Response Time:</span>
              <strong className="text-gray-700">{metrics.performanceMetrics.responseTime} days</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Success Rate:</span>
              <strong className="text-green-600">{metrics.performanceMetrics.successRate}%</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Efficiency:</span>
              <strong className="text-blue-600">{metrics.performanceMetrics.efficiency}/100</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Momentum:</span>
              <strong className={`${
                metrics.performanceMetrics.momentum === 'accelerating' ? 'text-green-600' :
                metrics.performanceMetrics.momentum === 'slowing' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {metrics.performanceMetrics.momentum}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Predictive Insights Component
const PredictiveInsightsCard = ({ insights }) => {
  if (!insights) return <div>Loading predictive insights...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-900">Predictive Insights</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">Next Month Projection</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{insights.nextMonthProjection.expectedReports}</div>
              <div className="text-sm text-gray-600">Expected Reports</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{insights.nextMonthProjection.projectedCleared}</div>
              <div className="text-sm text-gray-600">Hectares Cleared</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{insights.nextMonthProjection.projectedPlanted}</div>
              <div className="text-sm text-gray-600">Trees Planted</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{insights.nextMonthProjection.confidence}%</div>
              <div className="text-sm text-gray-600">Confidence</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">Quarterly Forecast</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Impact:</span>
              <strong className="text-green-600">${insights.quarterlyForecast.totalImpact.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between">
              <span>Risk Level:</span>
              <strong className={`${
                insights.quarterlyForecast.riskLevel === 'high' ? 'text-red-600' :
                insights.quarterlyForecast.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {insights.quarterlyForecast.riskLevel}
              </strong>
            </div>
            <div>
              <span className="font-medium text-gray-700">Opportunities:</span>
              <ul className="mt-2 space-y-1">
                {insights.quarterlyForecast.opportunities.map((opportunity, index) => (
                  <li key={index} className="text-sm text-gray-600">• {opportunity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-700 mb-4">Recommendations</h4>
        <div className="space-y-3">
          {insights.recommendations.map((rec, index) => (
            <div key={index} className={`p-3 rounded-lg border-l-4 ${
              rec.priority === 'high' ? 'bg-red-50 border-red-400' :
              rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-400' :
              'bg-green-50 border-green-400'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.priority} priority
                </span>
                <span className="text-sm font-medium text-gray-700">{rec.action}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">Expected: {rec.expectedImpact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Engagement Analytics Component
const EngagementAnalyticsCard = ({ engagement }) => {
  if (!engagement) return <div>Loading engagement analytics...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-900">Community Engagement</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{engagement.activationRate}%</div>
          <div className="text-sm text-gray-600">Activation Rate</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{engagement.retentionRate}%</div>
          <div className="text-sm text-gray-600">Retention Rate</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{engagement.viralityScore}/100</div>
          <div className="text-sm text-gray-600">Virality Score</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className={`text-2xl font-bold ${
            engagement.participationTrend === 'rising' ? 'text-green-600' :
            engagement.participationTrend === 'declining' ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {engagement.participationTrend}
          </div>
          <div className="text-sm text-gray-600">Participation Trend</div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-700 mb-4">Top Performers</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {engagement.topPerformers.map((performer, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="font-semibold text-gray-800">{performer.region}</div>
              <div className="text-2xl font-bold text-blue-600 my-2">{performer.score}/100</div>
              <div className="text-sm text-gray-600">{performer.achievement}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ImpactPage = ({ onNavigate }) => {
  const [impactMetrics, setImpactMetrics] = useState(null);
  const [predictiveInsights, setPredictiveInsights] = useState(null);
  const [engagementAnalytics, setEngagementAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      setTimeout(() => {
        setImpactMetrics(ImpactAnalyticsService.computeImpactMetrics());
        setPredictiveInsights(ImpactAnalyticsService.generatePredictiveInsights());
        setEngagementAnalytics(ImpactAnalyticsService.analyzeEngagement());
        setLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading impact analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Impact Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive analysis of environmental and community impact</p>
        </div>
        
        <div className="space-y-6">
          <ImpactMetricsCard metrics={impactMetrics} />
          <PredictiveInsightsCard insights={predictiveInsights} />
          <EngagementAnalyticsCard engagement={engagementAnalytics} />
        </div>
      </div>
    </div>
  );
};

// Impact Analytics Service
class ImpactAnalyticsService {
  static computeImpactMetrics() {
    const stats = {
      treesPlanted: 8500,
      hectaresCleared: 45,
      safeZones: 2,
      areasReported: 8,
      highRiskAreas: 2
    };

    // Environmental Impact Calculations
    const co2Offset = Math.round((stats.treesPlanted * 21) / 1000 * 10) / 10;
    const waterSaved = Math.round(stats.hectaresCleared * 100 * 200 * 365);
    const biodiversityScore = Math.min(100, Math.round(
      (stats.safeZones / stats.areasReported) * 100 * 0.7 + 
      (stats.treesPlanted / 10000) * 30
    ));
    const ecosystemHealth = Math.round(
      100 - (stats.highRiskAreas / stats.areasReported) * 50 - 
      ((stats.areasReported - stats.safeZones - stats.highRiskAreas) / stats.areasReported) * 25
    );

    // Community Impact Calculations
    const livelihoods = Math.round(stats.hectaresCleared * 4.5);
    const grazingLandRestored = Math.round(stats.hectaresCleared * 0.85 * 10) / 10;
    const waterAccessImproved = Math.floor(stats.safeZones * 1.5);
    const economicValue = Math.round(stats.hectaresCleared * 500);

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
        responseTime: 8,
        successRate: 85,
        efficiency: 78,
        momentum: "accelerating"
      }
    };
  }

  static generatePredictiveInsights() {
    return {
      nextMonthProjection: {
        expectedReports: 68,
        projectedCleared: 18,
        projectedPlanted: 1200,
        confidence: 82
      },
      quarterlyForecast: {
        totalImpact: 28500,
        riskLevel: "medium",
        opportunities: [
          "Expand tree planting programs in safe zones",
          "Leverage community momentum for large-scale interventions",
          "Partner with local organizations for resource mobilization"
        ]
      },
      recommendations: [
        {
          priority: "high",
          action: "Deploy rapid response teams to high-risk areas",
          expectedImpact: "Could prevent 10+ hectares of spread"
        },
        {
          priority: "medium",
          action: "Scale up verification and response capacity",
          expectedImpact: "Maintain rapid response to increased reporting"
        },
        {
          priority: "medium",
          action: "Launch community training programs in underserved regions",
          expectedImpact: "Expand monitoring coverage by 30%"
        }
      ]
    };
  }

  static analyzeEngagement() {
    return {
      participationTrend: "rising",
      activationRate: 75,
      retentionRate: 64,
      viralityScore: 82,
      topPerformers: [
        {
          region: "Baringo County",
          score: 92,
          achievement: "Outstanding Community Champion"
        },
        {
          region: "Turkana Region",
          score: 87,
          achievement: "Exceptional Environmental Steward"
        },
        {
          region: "Samburu Area",
          score: 79,
          achievement: "Dedicated Conservation Leader"
        }
      ]
    };
  }
}