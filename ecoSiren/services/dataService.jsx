import { useState, useEffect } from 'react';

// Custom hook for data service
export const useDataService = () => {
  const [data, setData] = useState({
    infestationPoints: [],
    regionalData: [],
    historicalData: [],
    communityMembers: [],
    engagement: null,
    summaryStats: null,
    monthlyComparison: null
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = () => {
      try {
        setLoading(true);
        
        const infestationPoints = DataService.getInfestationPoints();
        const regionalData = DataService.getRegionalData();
        const historicalData = DataService.getHistoricalData();
        const communityMembers = DataService.getCommunityMembers();
        const engagement = DataService.getCommunityEngagement();
        const summaryStats = DataService.getSummaryStats();
        const monthlyComparison = DataService.getMonthlyComparison();

        setData({
          infestationPoints,
          regionalData,
          historicalData,
          communityMembers,
          engagement,
          summaryStats,
          monthlyComparison
        });
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = () => {
    loadData();
  };

  return {
    ...data,
    loading,
    error,
    refreshData
  };
};

// Regional Data Component
const RegionalDataTable = ({ regionalData }) => {
  if (!regionalData || regionalData.length === 0) {
    return <div>No regional data available</div>;
  }

  return (
    <div className="regional-data-table">
      <h3>Regional Breakdown</h3>
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Reports</th>
            <th>Infestation Level</th>
            <th>Area Cleared (ha)</th>
            <th>Trees Planted</th>
            <th>Active Members</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {regionalData.map(region => (
            <tr key={region.region}>
              <td>{region.region}</td>
              <td>{region.reports}</td>
              <td className={`level-${region.infestationLevel}`}>
                {region.infestationLevel}
              </td>
              <td>{region.areaCleared}</td>
              <td>{region.treesPlanted}</td>
              <td>{region.activeMembers}</td>
              <td className={`trend-${region.trend}`}>
                {region.trend}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Historical Trends Chart Component
const HistoricalTrendsChart = ({ historicalData }) => {
  if (!historicalData || historicalData.length === 0) {
    return <div>No historical data available</div>;
  }

  // Simple chart implementation - in real app, use a charting library
  const maxReports = Math.max(...historicalData.map(d => d.reports));
  const maxCleared = Math.max(...historicalData.map(d => d.areasCleared));

  return (
    <div className="historical-trends">
      <h3>Historical Trends</h3>
      <div className="chart-container">
        <div className="chart">
          <h4>Reports Over Time</h4>
          <div className="bars">
            {historicalData.map((point, index) => (
              <div key={index} className="bar-container">
                <div 
                  className="bar reports-bar"
                  style={{ height: `${(point.reports / maxReports) * 100}%` }}
                >
                  <span className="bar-value">{point.reports}</span>
                </div>
                <div className="bar-label">
                  {point.date.toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="chart">
          <h4>Areas Cleared Over Time</h4>
          <div className="bars">
            {historicalData.map((point, index) => (
              <div key={index} className="bar-container">
                <div 
                  className="bar cleared-bar"
                  style={{ height: `${(point.areasCleared / maxCleared) * 100}%` }}
                >
                  <span className="bar-value">{point.areasCleared}</span>
                </div>
                <div className="bar-label">
                  {point.date.toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { RegionalDataTable, HistoricalTrendsChart };