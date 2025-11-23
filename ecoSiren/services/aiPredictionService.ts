// AI-powered prediction service for Prosopis juliflora infestation analysis

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

export interface PredictionZone {
  id: number;
  lat: number;
  lng: number;
  riskLevel: number; // 0-100
  predictedLevel: "high" | "medium" | "low";
  confidence: number; // 0-100
  timeframe: string;
}

export interface AIInsights {
  overallTrend: "increasing" | "stable" | "decreasing";
  highRiskAreas: string[];
  recommendedActions: string[];
  predictedSpread: number; // percentage
  affectedAreaKm2: number;
  monthlyGrowthRate: number;
}

export interface StatisticsData {
  totalInfested: number;
  clearZones: number;
  averageSpreadRate: number;
  criticalAreas: number;
  communityEngagement: number;
  predictionAccuracy: number;
}

/**
 * Simulates AI-powered infestation spread prediction
 * Uses mock algorithms based on proximity, report density, and environmental factors
 */
export class AIPredictionService {
  
  /**
   * Analyzes current infestation data and generates predictions
   */
  static generatePredictions(currentData: InfestationPoint[]): PredictionZone[] {
    const predictions: PredictionZone[] = [];
    let predictionId = 1000;

    // Algorithm: Predict spread around high and medium infestation areas
    currentData.forEach(point => {
      if (point.level === "high" || point.level === "medium") {
        const spreadFactor = point.level === "high" ? 1.5 : 1.0;
        const reportWeight = Math.min(point.reports / 10, 2);
        
        // Generate prediction zones around infested areas
        const zones = [
          { latOffset: 8, lngOffset: 10 },
          { latOffset: -8, lngOffset: 10 },
          { latOffset: 10, lngOffset: -8 },
          { latOffset: -5, lngOffset: 15 }
        ];

        zones.forEach((zone, idx) => {
          const riskLevel = this.calculateRiskLevel(
            point,
            spreadFactor,
            reportWeight,
            idx
          );
          
          if (riskLevel > 30) { // Only show significant risks
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

  /**
   * Calculates risk level using multiple factors
   */
  private static calculateRiskLevel(
    point: InfestationPoint,
    spreadFactor: number,
    reportWeight: number,
    zoneIndex: number
  ): number {
    const baseRisk = point.level === "high" ? 75 : 55;
    const reportInfluence = reportWeight * 10;
    const distanceDecay = (4 - zoneIndex) * 5; // Closer zones = higher risk
    const randomVariation = Math.random() * 10;
    
    return Math.min(
      100,
      Math.round(baseRisk * spreadFactor + reportInfluence + distanceDecay + randomVariation)
    );
  }

  /**
   * Converts numeric risk to category
   */
  private static getRiskCategory(risk: number): "high" | "medium" | "low" {
    if (risk >= 70) return "high";
    if (risk >= 45) return "medium";
    return "low";
  }

  /**
   * Calculates prediction confidence based on data quality
   */
  private static calculateConfidence(reports: number, riskLevel: number): number {
    const dataQuality = Math.min(reports / 20, 1) * 40; // More reports = higher confidence
    const baseConfidence = 45;
    const riskFactor = riskLevel > 60 ? 15 : 10;
    
    return Math.min(100, Math.round(baseConfidence + dataQuality + riskFactor));
  }

  /**
   * Estimates timeframe for predicted infestation
   */
  private static getTimeframe(risk: number): string {
    if (risk >= 75) return "1-2 months";
    if (risk >= 60) return "2-4 months";
    if (risk >= 45) return "4-6 months";
    return "6-12 months";
  }

  /**
   * Generates AI insights from data analysis
   */
  static generateInsights(data: InfestationPoint[]): AIInsights {
    const highRisk = data.filter(d => d.level === "high").length;
    const mediumRisk = data.filter(d => d.level === "medium").length;
    const totalReports = data.reduce((sum, d) => sum + d.reports, 0);
    
    // Simulate trend analysis
    const trendScore = this.calculateTrendScore(data);
    const overallTrend = trendScore > 0.2 ? "increasing" : 
                        trendScore < -0.1 ? "decreasing" : "stable";

    // Identify high-risk areas
    const highRiskAreas = data
      .filter(d => d.level === "high")
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 3)
      .map(d => d.location);

    // Generate recommendations
    const recommendedActions = this.generateRecommendations(data, overallTrend);

    // Calculate metrics
    const predictedSpread = this.calculateSpreadRate(highRisk, mediumRisk);
    const affectedAreaKm2 = (highRisk * 15 + mediumRisk * 8) * 1.5; // Simulated area calculation
    const monthlyGrowthRate = predictedSpread / 4; // Quarterly to monthly

    return {
      overallTrend,
      highRiskAreas,
      recommendedActions,
      predictedSpread,
      affectedAreaKm2,
      monthlyGrowthRate
    };
  }

  /**
   * Calculates trend score from historical patterns
   */
  private static calculateTrendScore(data: InfestationPoint[]): number {
    const highWeight = data.filter(d => d.level === "high").length * 0.5;
    const mediumWeight = data.filter(d => d.level === "medium").length * 0.3;
    const totalPoints = data.length;
    
    return (highWeight + mediumWeight) / totalPoints;
  }

  /**
   * Calculates predicted spread rate
   */
  private static calculateSpreadRate(high: number, medium: number): number {
    const highImpact = high * 8; // High areas spread 8% per quarter
    const mediumImpact = medium * 4; // Medium areas spread 4% per quarter
    
    return Math.round(highImpact + mediumImpact);
  }

  /**
   * Generates actionable recommendations
   */
  private static generateRecommendations(
    data: InfestationPoint[],
    trend: "increasing" | "stable" | "decreasing"
  ): string[] {
    const recommendations: string[] = [];
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
  }

  /**
   * Computes comprehensive statistics
   */
  static computeStatistics(data: InfestationPoint[]): StatisticsData {
    const totalInfested = data.filter(d => d.level !== "none").length;
    const clearZones = data.filter(d => d.level === "none").length;
    const totalReports = data.reduce((sum, d) => sum + d.reports, 0);
    const criticalAreas = data.filter(d => d.level === "high").length;

    // Calculate average spread rate
    const averageSpreadRate = data
      .filter(d => d.level !== "none")
      .reduce((sum, d) => {
        const rate = d.level === "high" ? 2.5 : d.level === "medium" ? 1.5 : 0.8;
        return sum + rate;
      }, 0) / Math.max(totalInfested, 1);

    // Community engagement score
    const communityEngagement = Math.min(100, Math.round((totalReports / data.length) * 3.5));

    // Prediction accuracy (simulated based on report density)
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

  /**
   * Analyzes risk factors for a specific location
   */
  static analyzeLocationRisk(
    targetLat: number,
    targetLng: number,
    data: InfestationPoint[]
  ): {
    riskScore: number;
    nearbyThreats: number;
    recommendation: string;
  } {
    let riskScore = 0;
    let nearbyThreats = 0;

    // Check proximity to infested areas
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

    let recommendation: string;
    if (riskScore > 70) {
      recommendation = "High risk area - immediate monitoring required";
    } else if (riskScore > 40) {
      recommendation = "Moderate risk - establish regular surveillance";
    } else {
      recommendation = "Low risk - suitable for tree planting initiatives";
    }

    return { riskScore, nearbyThreats, recommendation };
  }
};

