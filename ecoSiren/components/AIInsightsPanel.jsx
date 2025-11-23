import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AIInsights } from "../services/aiPredictionService";
import { TrendingUp, TrendingDown, Minus, Brain, AlertTriangle, CheckCircle } from "lucide-react";

export function AIInsightsPanel({ insights }) {
  const getTrendIcon = () => {
    switch (insights.overallTrend) {
      case "increasing":
        return <TrendingUp className="w-5 h-5 text-[#a0522d]" />;
      case "decreasing":
        return <TrendingDown className="w-5 h-5 text-[#3a5a38]" />;
      default:
        return <Minus className="w-5 h-5 text-[#c19a6b]" />;
    }
  };

  const getTrendColor = () => {
    switch (insights.overallTrend) {
      case "increasing":
        return "text-[#a0522d]";
      case "decreasing":
        return "text-[#3a5a38]";
      default:
        return "text-[#c19a6b]";
    }
  };

  const getTrendBadge = () => {
    switch (insights.overallTrend) {
      case "increasing":
        return "destructive";
      case "decreasing":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="p-6 border-stone-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-[#2d4a2b] to-[#3a5a38] rounded-lg flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-stone-900">AI Insights</h3>
        <Badge variant="outline" className="ml-auto text-xs">
          Real-time
        </Badge>
      </div>

      {/* Trend Analysis */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-stone-600">Infestation Trend</span>
          <Badge variant={getTrendBadge()}>
            {insights.overallTrend}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <div className="flex-1">
            <p className={`text-sm ${getTrendColor()}`}>
              {insights.overallTrend === "increasing" 
                ? "Spreading at concerning rate"
                : insights.overallTrend === "decreasing"
                ? "Containment efforts showing results"
                : "Situation is under control"}
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#f5f0e8] rounded-lg p-3">
          <p className="text-xs text-stone-600 mb-1">Predicted Spread</p>
          <p className="text-stone-900">+{insights.predictedSpread}%</p>
          <p className="text-xs text-stone-500">next quarter</p>
        </div>
        <div className="bg-[#f5f0e8] rounded-lg p-3">
          <p className="text-xs text-stone-600 mb-1">Affected Area</p>
          <p className="text-stone-900">{insights.affectedAreaKm2} km²</p>
          <p className="text-xs text-stone-500">estimated</p>
        </div>
        <div className="bg-[#f5f0e8] rounded-lg p-3">
          <p className="text-xs text-stone-600 mb-1">Monthly Growth</p>
          <p className="text-stone-900">{insights.monthlyGrowthRate}%</p>
          <p className="text-xs text-stone-500">average rate</p>
        </div>
        <div className="bg-[#f5f0e8] rounded-lg p-3">
          <p className="text-xs text-stone-600 mb-1">High Risk Areas</p>
          <p className="text-stone-900">{insights.highRiskAreas.length}</p>
          <p className="text-xs text-stone-500">require action</p>
        </div>
      </div>

      {/* High Risk Areas */}
      {insights.highRiskAreas.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[#a0522d]" />
            <span className="text-sm text-stone-900">Priority Regions</span>
          </div>
          <div className="space-y-2">
            {insights.highRiskAreas.map((area, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2 px-3 bg-[#f4d7c3]/30 rounded-lg border border-[#c19a6b]/20"
              >
                <span className="text-sm text-stone-700">{area}</span>
                <Badge variant="destructive" className="text-xs">
                  Critical
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-4 h-4 text-[#2d4a2b]" />
          <span className="text-sm text-stone-900">Recommended Actions</span>
        </div>
        <div className="space-y-2">
          {insights.recommendedActions.map((action, index) => (
            <div 
              key={index}
              className="flex gap-2 text-sm text-stone-700 py-2 px-3 bg-[#e8f1e8] rounded-lg"
            >
              <span className="text-[#2d4a2b] flex-shrink-0">•</span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}