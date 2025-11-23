import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImpactMetrics } from "../services/impactAnalyticsService";
import { 
  TrendingUp, 
  Leaf, 
  Droplets, 
  Users, 
  Sprout, 
  DollarSign,
  Activity,
  Zap
} from "lucide-react";
import { Progress } from "./ui/progress";

export function AnalyticsDashboard({ metrics }) {
  const getMomentumColor = () => {
    switch (metrics.performanceMetrics.momentum) {
      case "accelerating":
        return "text-[#3a5a38]";
      case "slowing":
        return "text-[#a0522d]";
      default:
        return "text-[#c19a6b]";
    }
  };

  const getMomentumIcon = () => {
    switch (metrics.performanceMetrics.momentum) {
      case "accelerating":
        return <TrendingUp className="w-4 h-4" />;
      case "slowing":
        return <Activity className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Environmental Impact */}
      <Card className="p-6 border-stone-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#3a5a38] to-[#2d4a2b] rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-stone-900">Environmental Impact</h3>
          <Badge variant="outline" className="ml-auto">
            AI Computed
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#e8f1e8] rounded-lg p-4 border border-[#3a5a38]/20">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-4 h-4 text-[#3a5a38]" />
              <p className="text-sm text-stone-600">CO₂ Offset</p>
            </div>
            <p className="text-2xl text-[#2d4a2b] mb-1">
              {metrics.environmentalImpact.co2Offset} tons
            </p>
            <p className="text-xs text-stone-500">Annual carbon sequestration</p>
          </div>

          <div className="bg-[#e8f1e8] rounded-lg p-4 border border-[#3a5a38]/20">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-[#3a5a38]" />
              <p className="text-sm text-stone-600">Water Saved</p>
            </div>
            <p className="text-2xl text-[#2d4a2b] mb-1">
              {(metrics.environmentalImpact.waterSaved / 1000000).toFixed(1)}M L
            </p>
            <p className="text-xs text-stone-500">Annual water conservation</p>
          </div>

          <div className="bg-gradient-to-br from-[#f5f0e8] to-[#ebe6dd] rounded-lg p-4 border border-stone-200">
            <p className="text-sm text-stone-600 mb-2">Biodiversity Score</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl text-[#2d4a2b]">
                {metrics.environmentalImpact.biodiversityScore}
              </span>
              <span className="text-sm text-stone-500 mb-1">/100</span>
            </div>
            <Progress 
              value={metrics.environmentalImpact.biodiversityScore} 
              className="h-2 mb-1"
            />
            <p className="text-xs text-stone-500">Species habitat restored</p>
          </div>

          <div className="bg-gradient-to-br from-[#f5f0e8] to-[#ebe6dd] rounded-lg p-4 border border-stone-200">
            <p className="text-sm text-stone-600 mb-2">Ecosystem Health</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl text-[#2d4a2b]">
                {metrics.environmentalImpact.ecosystemHealth}
              </span>
              <span className="text-sm text-stone-500 mb-1">/100</span>
            </div>
            <Progress 
              value={metrics.environmentalImpact.ecosystemHealth} 
              className="h-2 mb-1"
            />
            <p className="text-xs text-stone-500">Overall environmental wellness</p>
          </div>
        </div>
      </Card>

      {/* Community Impact */}
      <Card className="p-6 border-stone-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#c19a6b] to-[#d4a574] rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-stone-900">Community Impact</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#f4d7c3]/20 rounded-lg p-4 border border-[#c19a6b]/20">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-[#c19a6b]" />
              <p className="text-sm text-stone-600">Families Impacted</p>
            </div>
            <p className="text-2xl text-[#2d4a2b] mb-1">
              {metrics.communityImpact.livelihoods}+
            </p>
            <p className="text-xs text-stone-500">Livelihoods improved</p>
          </div>

          <div className="bg-[#f4d7c3]/20 rounded-lg p-4 border border-[#c19a6b]/20">
            <div className="flex items-center gap-2 mb-2">
              <Sprout className="w-4 h-4 text-[#c19a6b]" />
              <p className="text-sm text-stone-600">Grazing Land</p>
            </div>
            <p className="text-2xl text-[#2d4a2b] mb-1">
              {metrics.communityImpact.grazingLandRestored} ha
            </p>
            <p className="text-xs text-stone-500">Restored for livestock</p>
          </div>

          <div className="bg-[#f4d7c3]/20 rounded-lg p-4 border border-[#c19a6b]/20">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-[#c19a6b]" />
              <p className="text-sm text-stone-600">Water Access</p>
            </div>
            <p className="text-2xl text-[#2d4a2b] mb-1">
              {metrics.communityImpact.waterAccessImproved}
            </p>
            <p className="text-xs text-stone-500">Communities benefiting</p>
          </div>

          <div className="bg-[#f4d7c3]/20 rounded-lg p-4 border border-[#c19a6b]/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-[#c19a6b]" />
              <p className="text-sm text-stone-600">Economic Value</p>
            </div>
            <p className="text-2xl text-[#2d4a2b] mb-1">
              ${(metrics.communityImpact.economicValue / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-stone-500">Land value restored</p>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card className="p-6 border-stone-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#2d4a2b] to-[#3a5a38] rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-stone-900">Performance Metrics</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#f5f0e8] rounded-lg">
            <div>
              <p className="text-sm text-stone-600 mb-1">Response Time</p>
              <p className="text-lg text-stone-900">
                {metrics.performanceMetrics.responseTime} days
              </p>
            </div>
            <Badge variant="outline">
              {metrics.performanceMetrics.responseTime <= 7 ? "Excellent" : "Good"}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#f5f0e8] rounded-lg">
            <div className="flex-1">
              <p className="text-sm text-stone-600 mb-2">Success Rate</p>
              <Progress 
                value={metrics.performanceMetrics.successRate} 
                className="h-2"
              />
            </div>
            <span className="text-lg text-[#3a5a38] ml-4">
              {metrics.performanceMetrics.successRate}%
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#f5f0e8] rounded-lg">
            <div className="flex-1">
              <p className="text-sm text-stone-600 mb-2">Operational Efficiency</p>
              <Progress 
                value={metrics.performanceMetrics.efficiency} 
                className="h-2"
              />
            </div>
            <span className="text-lg text-[#3a5a38] ml-4">
              {metrics.performanceMetrics.efficiency}%
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#ebe6dd] to-[#e8f1e8] rounded-lg border border-stone-200">
            <div className="flex items-center gap-2">
              {getMomentumIcon()}
              <div>
                <p className="text-sm text-stone-600">Program Momentum</p>
                <p className={`${getMomentumColor()}`}>
                  {metrics.performanceMetrics.momentum}
                </p>
              </div>
            </div>
            <Badge 
              variant={metrics.performanceMetrics.momentum === "accelerating" ? "default" : "outline"}
            >
              {metrics.performanceMetrics.momentum === "accelerating" ? "↗" : 
               metrics.performanceMetrics.momentum === "slowing" ? "↘" : "→"}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}