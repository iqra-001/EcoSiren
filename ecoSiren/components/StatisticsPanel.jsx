import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { BarChart3, Activity, Target, Users } from "lucide-react";

export function StatisticsPanel({ statistics }) {
  const getEngagementColor = (score) => {
    if (score >= 75) return "text-[#3a5a38]";
    if (score >= 50) return "text-[#c19a6b]";
    return "text-[#a0522d]";
  };

  const getAccuracyColor = (score) => {
    if (score >= 80) return "text-[#3a5a38]";
    if (score >= 60) return "text-[#c19a6b]";
    return "text-[#a0522d]";
  };

  return (
    <Card className="p-6 border-stone-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-[#c19a6b] to-[#d4a574] rounded-lg flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-stone-900">Live Statistics</h3>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#f4d7c3]/20 rounded-lg p-3 border border-[#c19a6b]/20">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-[#a0522d]" />
            <p className="text-xs text-stone-600">Infested Zones</p>
          </div>
          <p className="text-xl text-stone-900">{statistics.totalInfested}</p>
          <p className="text-xs text-stone-500 mt-1">
            {statistics.criticalAreas} critical
          </p>
        </div>

        <div className="bg-[#e8f1e8] rounded-lg p-3 border border-[#3a5a38]/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-[#3a5a38]" />
            <p className="text-xs text-stone-600">Clear Zones</p>
          </div>
          <p className="text-xl text-stone-900">{statistics.clearZones}</p>
          <p className="text-xs text-stone-500 mt-1">
            Safe for planting
          </p>
        </div>
      </div>

      {/* Spread Rate */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-stone-700">Avg. Spread Rate</span>
          <span className="text-sm text-[#a0522d]">
            {statistics.averageSpreadRate} km²/month
          </span>
        </div>
        <Progress 
          value={Math.min(statistics.averageSpreadRate * 20, 100)} 
          className="h-2"
        />
        <p className="text-xs text-stone-500 mt-1">
          Based on current infestation patterns
        </p>
      </div>

      {/* Community Engagement */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-[#2d4a2b]" />
          <span className="text-sm text-stone-700">Community Engagement</span>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className={`text-2xl ${getEngagementColor(statistics.communityEngagement)}`}>
            {statistics.communityEngagement}%
          </span>
          <span className="text-sm text-stone-500 mb-1">participation score</span>
        </div>
        <Progress 
          value={statistics.communityEngagement} 
          className="h-2 mb-1"
        />
        <p className="text-xs text-stone-500">
          {statistics.communityEngagement >= 75 
            ? "Excellent community involvement"
            : statistics.communityEngagement >= 50
            ? "Good participation levels"
            : "Needs more community engagement"}
        </p>
      </div>

      {/* AI Prediction Accuracy */}
      <div className="bg-gradient-to-br from-[#ebe6dd] to-[#f5f0e8] rounded-lg p-4 border border-stone-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-stone-700">AI Model Accuracy</span>
          <span className={`${getAccuracyColor(statistics.predictionAccuracy)}`}>
            {statistics.predictionAccuracy}%
          </span>
        </div>
        <Progress 
          value={statistics.predictionAccuracy} 
          className="h-2 mb-2"
        />
        <p className="text-xs text-stone-600">
          Prediction model trained on {statistics.totalInfested + statistics.clearZones} data points
        </p>
      </div>

      {/* Data Summary */}
      <div className="mt-6 pt-4 border-t border-stone-200">
        <p className="text-xs text-stone-500 text-center">
          Statistics updated in real-time based on community reports
        </p>
      </div>
    </Card>
  );
}