import { useState, useEffect } from 'react';

// Data Service Hook
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

  const getInfestationPoints = () => [
    { id: 1, lat: 35, lng: 45, level: "high", location: "Baringo County", reports: 24, lastReportDate: new Date(2024, 10, 15) },
    { id: 2, lat: 55, lng: 30, level: "high", location: "Turkana Region", reports: 18, lastReportDate: new Date(2024, 10, 18) },
    { id: 3, lat: 70, lng: 65, level: "medium", location: "Samburu Area", reports: 12, lastReportDate: new Date(2024, 10, 20) },
    { id: 4, lat: 25, lng: 70, level: "medium", location: "Tana River", reports: 9, lastReportDate: new Date(2024, 10, 12) },
    { id: 5, lat: 45, lng: 80, level: "low", location: "Garissa Region", reports: 5, lastReportDate: new Date(2024, 10, 10) },
    { id: 6, lat: 80, lng: 40, level: "low", location: "Isiolo County", reports: 3, lastReportDate: new Date(2024, 10, 8) },
    { id: 7, lat: 60, lng: 50, level: "none", location: "Marsabit Safe Zone", reports: 0 },
    { id: 8, lat: 40, lng: 25, level: "none", location: "Laikipia Restoration", reports: 0 },
  ];

  const calculateAreaCleared = (level, reports) => {
    const baseArea = {
      high: 2.5,
      medium: 4.0,
      low: 3.5,
      none: 0
    };
    
    const multiplier = Math.min(reports / 10, 2);
    return Math.round((baseArea[level] || 0) * multiplier * 10) / 10;
  };

  const calculateTreesPlanted = (level) => {
    const treesPerLevel = {
      high: 150,
      medium: 350,
      low: 500,
      none: 1200
    };
    
    return treesPerLevel[level] || 0;
  };

  const calculateTrend = (level, reports) => {
    if (level === "none") return "improving";
    if (level === "low" && reports < 5) return "stable";
    if (level === "high" && reports > 15) return "worsening";
    if (reports < 10) return "improving";
    return "stable";
  };

  const getRegionalData = () => {
    const points = getInfestationPoints();
    const regionalMap = new Map();
    
    points.forEach(point => {
      if (!regionalMap.has(point.location)) {
        regionalMap.set(point.location, {
          region: point.location,
          reports: point.reports,
          infestationLevel: point.level,
          areaCleared: calculateAreaCleared(point.level, point.reports),
          treesPlanted: calculateTreesPlanted(point.level),
          activeMembers: Math.floor(point.reports * 2.5),
          trend: calculateTrend(point.level, point.reports)
        });
      }
    });

    return Array.from(regionalMap.values()).sort((a, b) => b.reports - a.reports);
  };

  const getHistoricalData = () => {
    const months = ['Aug', 'Sep', 'Oct', 'Nov'];
    const baseDate = new Date(2024, 7, 1);
    
    return months.map((month, index) => {
      const date = new Date(baseDate);
      date.setMonth(baseDate.getMonth() + index);
      
      const progress = index / (months.length - 1);
      
      return {
        date,
        reports: Math.round(45 + (index * 8) + Math.random() * 5),
        areasCleared: Math.round(15 + (index * 10) + Math.random() * 3),
        treesPlanted: Math.round(5000 + (index * 1000) + Math.random() * 200),
        activeMembers: Math.round(800 + (index * 150) + Math.random() * 50),
        infestationScore: Math.round(85 - (progress * 20) + Math.random() * 5)
      };
    });
  };

  const getCommunityMembers = () => {
    const regions = getRegionalData();
    const members = [];
    let memberId = 1;

    regions.forEach(region => {
      const memberCount = region.activeMembers;
      for (let i = 0; i < Math.min(memberCount, 50); i++) {
        members.push({
          id: memberId++,
          region: region.region,
          reportsSubmitted: Math.floor(Math.random() * 8) + 1,
          joinedDate: getRandomDate(new Date(2024, 0, 1), new Date()),
          active: Math.random() > 0.2
        });
      }
    });

    return members;
  };

  const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const getCommunityEngagement = () => {
    const members = getCommunityMembers();
    const regionalData = getRegionalData();
    
    const activeMembers = members.filter(m => m.active).length;
    const totalReports = members.reduce((sum, m) => sum + m.reportsSubmitted, 0);
    
    const topContributors = regionalData
      .sort((a, b) => b.activeMembers - a.activeMembers)
      .slice(0, 5)
      .map(r => ({ region: r.region, members: r.activeMembers }));

    return {
      totalMembers: members.length,
      activeMembers,
      totalReports,
      averageReportsPerMember: totalReports / members.length,
      engagementRate: (activeMembers / members.length) * 100,
      topContributors
    };
  };

  const getSummaryStats = () => {
    const points = getInfestationPoints();
    const regionalData = getRegionalData();
    
    return {
      totalReports: points.reduce((sum, p) => sum + p.reports, 0),
      areasReported: points.length,
      hectaresCleared: regionalData.reduce((sum, r) => sum + r.areaCleared, 0),
      treesPlanted: regionalData.reduce((sum, r) => sum + r.treesPlanted, 0),
      highRiskAreas: points.filter(p => p.level === "high").length,
      safeZones: points.filter(p => p.level === "none").length
    };
  };

  const getMonthlyComparison = () => {
    const historical = getHistoricalData();
    const current = historical[historical.length - 1];
    const last = historical[historical.length - 2];

    return {
      currentMonth: {
        reports: current.reports,
        cleared: current.areasCleared,
        planted: current.treesPlanted
      },
      lastMonth: {
        reports: last.reports,
        cleared: last.areasCleared,
        planted: last.treesPlanted
      },
      changes: {
        reports: ((current.reports - last.reports) / last.reports) * 100,
        cleared: ((current.areasCleared - last.areasCleared) / last.areasCleared) * 100,
        planted: ((current.treesPlanted - last.treesPlanted) / last.treesPlanted) * 100
      }
    };
  };

  useEffect(() => {
    setData({
      infestationPoints: getInfestationPoints(),
      regionalData: getRegionalData(),
      historicalData: getHistoricalData(),
      communityMembers: getCommunityMembers(),
      engagement: getCommunityEngagement(),
      summaryStats: getSummaryStats(),
      monthlyComparison: getMonthlyComparison()
    });
  }, []);

  return data;
};