// Shared data service for synchronizing map and impact page data

export interface InfestationPoint {
  id: number;
  lat: number;
  lng: number;
  level: "high" | "medium" | "low" | "none";
  location: string;
  reports: number;
  lastReportDate?: Date;
  spreadRate?: number;
}

export interface CommunityMember {
  id: number;
  region: string;
  reportsSubmitted: number;
  joinedDate: Date;
  active: boolean;
}

export interface RegionalData {
  region: string;
  reports: number;
  infestationLevel: "high" | "medium" | "low" | "none";
  areaCleared: number; // in hectares
  treesPlanted: number;
  activeMembers: number;
  trend: "improving" | "stable" | "worsening";
}

export interface HistoricalDataPoint {
  date: Date;
  reports: number;
  areasCleared: number;
  treesPlanted: number;
  activeMembers: number;
  infestationScore: number; // 0-100
}

/**
 * Central data service for Ecosiren
 * Provides unified data access across map and impact pages
 */
export class DataService {
  
  /**
   * Get all infestation points (used by Map page)
   */
  static getInfestationPoints(): InfestationPoint[] {
    return [
      { id: 1, lat: 35, lng: 45, level: "high", location: "Baringo County", reports: 24, lastReportDate: new Date(2024, 10, 15) },
      { id: 2, lat: 55, lng: 30, level: "high", location: "Turkana Region", reports: 18, lastReportDate: new Date(2024, 10, 18) },
      { id: 3, lat: 70, lng: 65, level: "medium", location: "Samburu Area", reports: 12, lastReportDate: new Date(2024, 10, 20) },
      { id: 4, lat: 25, lng: 70, level: "medium", location: "Tana River", reports: 9, lastReportDate: new Date(2024, 10, 12) },
      { id: 5, lat: 45, lng: 80, level: "low", location: "Garissa Region", reports: 5, lastReportDate: new Date(2024, 10, 10) },
      { id: 6, lat: 80, lng: 40, level: "low", location: "Isiolo County", reports: 3, lastReportDate: new Date(2024, 10, 8) },
      { id: 7, lat: 60, lng: 50, level: "none", location: "Marsabit Safe Zone", reports: 0 },
      { id: 8, lat: 40, lng: 25, level: "none", location: "Laikipia Restoration", reports: 0 },
    ];
  }

  /**
   * Get regional breakdown data
   */
  static getRegionalData(): RegionalData[] {
    const points = this.getInfestationPoints();
    
    // Group by location and calculate metrics
    const regionalMap = new Map<string, RegionalData>();
    
    points.forEach(point => {
      if (!regionalMap.has(point.location)) {
        regionalMap.set(point.location, {
          region: point.location,
          reports: point.reports,
          infestationLevel: point.level,
          areaCleared: this.calculateAreaCleared(point.level, point.reports),
          treesPlanted: this.calculateTreesPlanted(point.level),
          activeMembers: Math.floor(point.reports * 2.5),
          trend: this.calculateTrend(point.level, point.reports)
        });
      }
    });

    return Array.from(regionalMap.values()).sort((a, b) => b.reports - a.reports);
  }

  /**
   * Calculate cleared area based on infestation level and reports
   */
  private static calculateAreaCleared(level: string, reports: number): number {
    const baseArea = {
      high: 2.5,
      medium: 4.0,
      low: 3.5,
      none: 0
    };
    
    const multiplier = Math.min(reports / 10, 2);
    return Math.round((baseArea[level as keyof typeof baseArea] || 0) * multiplier * 10) / 10;
  }

  /**
   * Calculate trees planted based on cleared areas
   */
  private static calculateTreesPlanted(level: string): number {
    const treesPerLevel = {
      high: 150,
      medium: 350,
      low: 500,
      none: 1200
    };
    
    return treesPerLevel[level as keyof typeof treesPerLevel] || 0;
  }

  /**
   * Calculate trend based on current state
   */
  private static calculateTrend(level: string, reports: number): "improving" | "stable" | "worsening" {
    if (level === "none") return "improving";
    if (level === "low" && reports < 5) return "stable";
    if (level === "high" && reports > 15) return "worsening";
    if (reports < 10) return "improving";
    return "stable";
  }

  /**
   * Get historical data for trend analysis (simulated)
   */
  static getHistoricalData(): HistoricalDataPoint[] {
    const months = ['Aug', 'Sep', 'Oct', 'Nov'];
    const baseDate = new Date(2024, 7, 1); // August 2024
    
    return months.map((month, index) => {
      const date = new Date(baseDate);
      date.setMonth(baseDate.getMonth() + index);
      
      // Simulate data showing improvement over time
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
  }

  /**
   * Get community members data
   */
  static getCommunityMembers(): CommunityMember[] {
    const regions = this.getRegionalData();
    const members: CommunityMember[] = [];
    let memberId = 1;

    regions.forEach(region => {
      const memberCount = region.activeMembers;
      for (let i = 0; i < Math.min(memberCount, 50); i++) {
        members.push({
          id: memberId++,
          region: region.region,
          reportsSubmitted: Math.floor(Math.random() * 8) + 1,
          joinedDate: this.getRandomDate(new Date(2024, 0, 1), new Date()),
          active: Math.random() > 0.2 // 80% active rate
        });
      }
    });

    return members;
  }

  /**
   * Get community engagement metrics
   */
  static getCommunityEngagement(): {
    totalMembers: number;
    activeMembers: number;
    totalReports: number;
    averageReportsPerMember: number;
    engagementRate: number;
    topContributors: { region: string; members: number }[];
  } {
    const members = this.getCommunityMembers();
    const regionalData = this.getRegionalData();
    
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
  }

  /**
   * Get summary statistics
   */
  static getSummaryStats(): {
    totalReports: number;
    areasReported: number;
    hectaresCleared: number;
    treesPlanted: number;
    highRiskAreas: number;
    safeZones: number;
  } {
    const points = this.getInfestationPoints();
    const regionalData = this.getRegionalData();
    
    return {
      totalReports: points.reduce((sum, p) => sum + p.reports, 0),
      areasReported: points.length,
      hectaresCleared: regionalData.reduce((sum, r) => sum + r.areaCleared, 0),
      treesPlanted: regionalData.reduce((sum, r) => sum + r.treesPlanted, 0),
      highRiskAreas: points.filter(p => p.level === "high").length,
      safeZones: points.filter(p => p.level === "none").length
    };
  }

  /**
   * Utility: Generate random date between two dates
   */
  private static getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  /**
   * Get monthly comparison data
   */
  static getMonthlyComparison(): {
    currentMonth: { reports: number; cleared: number; planted: number };
    lastMonth: { reports: number; cleared: number; planted: number };
    changes: { reports: number; cleared: number; planted: number };
  } {
    const historical = this.getHistoricalData();
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
  }
}
