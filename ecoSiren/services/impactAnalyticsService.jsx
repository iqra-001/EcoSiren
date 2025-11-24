import React, { useState, useEffect } from 'react';

// Impact Metrics Display Component
const ImpactMetricsCard = ({ metrics }) => {
  if (!metrics) return <div>Loading impact metrics...</div>;

  return (
    <div className="impact-metrics">
      <h3>Impact Metrics</h3>
      
      <div className="metrics-grid">
        <div className="metric-category">
          <h4>Environmental Impact</h4>
          <div className="metric-item">
            <span>CO2 Offset:</span>
            <strong>{metrics.environmentalImpact.co2Offset} tons</strong>
          </div>
          <div className="metric-item">
            <span>Water Saved:</span>
            <strong>{metrics.environmentalImpact.waterSaved.toLocaleString()} liters</strong>
          </div>
          <div className="metric-item">
            <span>Biodiversity Score:</span>
            <strong>{metrics.environmentalImpact.biodiversityScore}/100</strong>
          </div>
          <div className="metric-item">
            <span>Ecosystem Health:</span>
            <strong>{metrics.environmentalImpact.ecosystemHealth}/100</strong>
          </div>
        </div>

        <div className="metric-category">
          <h4>Community Impact</h4>
          <div className="metric-item">
            <span>Livelihoods:</span>
            <strong>{metrics.communityImpact.livelihoods} families</strong>
          </div>
          <div className="metric-item">
            <span>Grazing Land Restored:</span>
            <strong>{metrics.communityImpact.grazingLandRestored} hectares</strong>
          </div>
          <div className="metric-item">
            <span>Water Access Improved:</span>
            <strong>{metrics.communityImpact.waterAccessImproved} communities</strong>
          </div>
          <div className="metric-item">
            <span>Economic Value:</span>
            <strong>${metrics.communityImpact.economicValue.toLocaleString()}</strong>
          </div>
        </div>

        <div className="metric-category">
          <h4>Performance Metrics</h4>
          <div className="metric-item">
            <span>Response Time:</span>
            <strong>{metrics.performanceMetrics.responseTime} days</strong>
          </div>
          <div className="metric-item">
            <span>Success Rate:</span>
            <strong>{metrics.performanceMetrics.successRate}%</strong>
          </div>
          <div className="metric-item">
            <span>Efficiency:</span>
            <strong>{metrics.performanceMetrics.efficiency}/100</strong>
          </div>
          <div className="metric-item">
            <span>Momentum:</span>
            <strong className={`momentum-${metrics.performanceMetrics.momentum}`}>
              {metrics.performanceMetrics.momentum}
            </strong>
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
    <div className="predictive-insights">
      <h3>Predictive Insights</h3>
      
      <div className="insight-section">
        <h4>Next Month Projection</h4>
        <div className="projection-grid">
          <div className="projection-item">
            <span>Expected Reports:</span>
            <strong>{insights.nextMonthProjection.expectedReports}</strong>
          </div>
          <div className="projection-item">
            <span>Projected Cleared:</span>
            <strong>{insights.nextMonthProjection.projectedCleared} ha</strong>
          </div>
          <div className="projection-item">
            <span>Projected Planted:</span>
            <strong>{insights.nextMonthProjection.projectedPlanted}</strong>
          </div>
          <div className="projection-item">
            <span>Confidence:</span>
            <strong>{insights.nextMonthProjection.confidence}%</strong>
          </div>
        </div>
      </div>

      <div className="insight-section">
        <h4>Quarterly Forecast</h4>
        <div className="forecast-info">
          <div className="forecast-item">
            <span>Total Impact:</span>
            <strong>${insights.quarterlyForecast.totalImpact.toLocaleString()}</strong>
          </div>
          <div className="forecast-item">
            <span>Risk Level:</span>
            <strong className={`risk-${insights.quarterlyForecast.riskLevel}`}>
              {insights.quarterlyForecast.riskLevel}
            </strong>
          </div>
        </div>
        <div className="opportunities">
          <h5>Opportunities:</h5>
          <ul>
            {insights.quarterlyForecast.opportunities.map((opportunity, index) => (
              <li key={index}>{opportunity}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="insight-section">
        <h4>Recommendations</h4>
        <div className="recommendations-list">
          {insights.recommendations.map((rec, index) => (
            <div key={index} className={`recommendation priority-${rec.priority}`}>
              <div className="rec-header">
                <span className={`priority-badge ${rec.priority}`}>
                  {rec.priority}
                </span>
                <span className="rec-action">{rec.action}</span>
              </div>
              <div className="rec-impact">Expected: {rec.expectedImpact}</div>
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
    <div className="engagement-analytics">
      <h3>Community Engagement</h3>
      
      <div className="engagement-metrics">
        <div className="engagement-item">
          <span>Participation Trend:</span>
          <strong className={`trend-${engagement.participationTrend}`}>
            {engagement.participationTrend}
          </strong>
        </div>
        <div className="engagement-item">
          <span>Activation Rate:</span>
          <strong>{engagement.activationRate}%</strong>
        </div>
        <div className="engagement-item">
          <span>Retention Rate:</span>
          <strong>{engagement.retentionRate}%</strong>
        </div>
        <div className="engagement-item">
          <span>Virality Score:</span>
          <strong>{engagement.viralityScore}/100</strong>
        </div>
      </div>

      <div className="top-performers">
        <h4>Top Performers</h4>
        <div className="performers-list">
          {engagement.topPerformers.map((performer, index) => (
            <div key={index} className="performer-card">
              <div className="performer-region">{performer.region}</div>
              <div className="performer-score">{performer.score}/100</div>
              <div className="performer-achievement">{performer.achievement}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Impact Analytics Dashboard
const ImpactAnalyticsDashboard = () => {
  const [impactMetrics, setImpactMetrics] = useState(null);
  const [predictiveInsights, setPredictiveInsights] = useState(null);
  const [engagementAnalytics, setEngagementAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      
      // In a real app, these would be API calls
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
    return <div className="loading">Loading analytics data...</div>;
  }

  return (
    <div className="impact-analytics-dashboard">
      <h2>Impact Analytics Dashboard</h2>
      
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <ImpactMetricsCard metrics={impactMetrics} />
        </div>
        
        <div className="dashboard-section">
          <PredictiveInsightsCard insights={predictiveInsights} />
        </div>
        
        <div className="dashboard-section">
          <EngagementAnalyticsCard engagement={engagementAnalytics} />
        </div>
      </div>
    </div>
  );
};

export default ImpactAnalyticsDashboard;