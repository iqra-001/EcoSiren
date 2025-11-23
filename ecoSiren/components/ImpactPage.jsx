import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Users, TreePine, Award, Heart, Sparkles, BarChart3, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { DataService } from "../services/dataService";
import { ImpactAnalyticsService } from "../services/impactAnalyticsService";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { TrendVisualization } from "./TrendVisualization";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ImpactPage({ onNavigate }) {
  const [impactMetrics, setImpactMetrics] = useState(null);
  const [predictiveInsights, setPredictiveInsights] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [summaryStats, setSummaryStats] = useState(null);

  // Load AI-powered analytics on mount
  useEffect(() => {
    const metrics = ImpactAnalyticsService.computeImpactMetrics();
    const predictions = ImpactAnalyticsService.generatePredictiveInsights();
    const historical = DataService.getHistoricalData();
    const stats = DataService.getSummaryStats();
    
    setImpactMetrics(metrics);
    setPredictiveInsights(predictions);
    setHistoricalData(historical);
    setSummaryStats(stats);
  }, []);

  if (!impactMetrics || !predictiveInsights) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-[#2d4a2b] animate-pulse mx-auto mb-4" />
          <p className="text-stone-600">Loading AI analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with AI Badge */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[#2d4a2b]">Data-Driven Conservation Dashboard</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#2d4a2b] to-[#3a5a38] rounded-full">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs text-white">AI-Powered Analytics</span>
            </div>
          </div>
          <p className="text-stone-600">
            Real-time insights and predictive analytics drawn from environmental monitoring data
          </p>
        </div>

        {/* Key Metrics - Updated from DataService */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#e8f1e8] rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#2d4a2b]" />
              </div>
              <div>
                <p className="text-2xl text-[#2d4a2b]">{summaryStats.totalReports}</p>
              </div>
            </div>
            <p className="text-sm text-stone-600">Total Community Reports</p>
            <p className="text-xs text-[#3a5a38] mt-1">↑ From map data</p>
          </Card>

          <Card className="p-6 border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#f4d7c3] rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#c19a6b]" />
              </div>
              <div>
                <p className="text-2xl text-[#c19a6b]">{summaryStats.areasReported}</p>
              </div>
            </div>
            <p className="text-sm text-stone-600">Areas Monitored</p>
            <p className="text-xs text-[#3a5a38] mt-1">↑ Active regions</p>
          </Card>

          <Card className="p-6 border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#f4d7c3] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#a0522d]" />
              </div>
              <div>
                <p className="text-2xl text-[#a0522d]">{summaryStats.hectaresCleared}</p>
              </div>
            </div>
            <p className="text-sm text-stone-600">Hectares Cleared</p>
            <p className="text-xs text-[#3a5a38] mt-1">↑ AI computed</p>
          </Card>

          <Card className="p-6 border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#e8f1e8] rounded-lg flex items-center justify-center">
                <TreePine className="w-5 h-5 text-[#3a5a38]" />
              </div>
              <div>
                <p className="text-2xl text-[#3a5a38]">{summaryStats.treesPlanted.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-sm text-stone-600">Native Trees Planted</p>
            <p className="text-xs text-[#3a5a38] mt-1">↑ Ecosystem restoration</p>
          </Card>
        </div>

        {/* Tabbed Analytics Interface */}
        <Tabs defaultValue="analytics" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="trends">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsDashboard metrics={impactMetrics} />
          </TabsContent>

          <TabsContent value="trends">
            <TrendVisualization 
              historicalData={historicalData} 
              predictions={predictiveInsights}
            />
          </TabsContent>
        </Tabs>

        {/* AI Recommendations */}
        <Card className="p-6 mb-8 border-stone-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2d4a2b] to-[#3a5a38] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-stone-900">AI-Generated Recommendations</h3>
          </div>

          <div className="space-y-3">
            {predictiveInsights.recommendations.map((rec, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  rec.priority === "high" 
                    ? "bg-[#f4d7c3]/30 border-[#a0522d]/30" 
                    : rec.priority === "medium"
                    ? "bg-[#ebe6dd] border-stone-300"
                    : "bg-[#e8f1e8] border-[#3a5a38]/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`px-2 py-1 rounded text-xs ${
                    rec.priority === "high"
                      ? "bg-[#a0522d] text-white"
                      : rec.priority === "medium"
                      ? "bg-[#c19a6b] text-white"
                      : "bg-[#3a5a38] text-white"
                  }`}>
                    {rec.priority.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-stone-900 mb-1">{rec.action}</p>
                    <p className="text-xs text-stone-600">
                      Expected Impact: {rec.expectedImpact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Wangari Maathai Section */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-[#ebe6dd] to-[#e8f1e8] border-stone-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-[#2d4a2b]" />
                <h2 className="text-[#2d4a2b]">Honoring Wangari Maathai's Legacy</h2>
              </div>
              <p className="text-stone-700 mb-4">
                Professor Wangari Maathai, Kenya's first female Nobel laureate, founded the Green Belt Movement 
                and inspired millions to take action for environmental conservation. Through grassroots efforts, 
                she demonstrated that ordinary citizens could make extraordinary impacts.
              </p>
              <p className="text-stone-700 mb-4">
                Ecosiren continues her vision by empowering communities to protect their environment, 
                combat invasive species, and restore native ecosystems through collective action.
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-[#2d4a2b]">
                <p className="text-sm italic text-stone-700">
                  "It's the little things citizens do. That's what will make the difference. 
                  My little thing is planting trees."
                </p>
                <p className="text-sm text-[#3a5a38] mt-2">— Wangari Maathai</p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600"
                alt="Community tree planting"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </Card>

        {/* Success Stories */}
        <div className="mb-8">
          <h2 className="text-[#2d4a2b] mb-6">Recent Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-stone-200">
              <div className="w-12 h-12 bg-[#e8f1e8] rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#2d4a2b]" />
              </div>
              <h3 className="text-stone-900 mb-2">Baringo Community Action</h3>
              <p className="text-sm text-stone-600 mb-3">
                Local community successfully cleared 15 hectares of Prosopis infestation, 
                restoring grazing land for livestock.
              </p>
              <p className="text-xs text-stone-500">3 weeks ago</p>
            </Card>

            <Card className="p-6 border-stone-200">
              <div className="w-12 h-12 bg-[#e8f1e8] rounded-full flex items-center justify-center mb-4">
                <TreePine className="w-6 h-6 text-[#3a5a38]" />
              </div>
              <h3 className="text-stone-900 mb-2">Laikipia Restoration Project</h3>
              <p className="text-sm text-stone-600 mb-3">
                Over 2,000 native trees planted in cleared areas, creating new habitat 
                for local wildlife and improving water retention.
              </p>
              <p className="text-xs text-stone-500">1 month ago</p>
            </Card>

            <Card className="p-6 border-stone-200">
              <div className="w-12 h-12 bg-[#f4d7c3] rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#c19a6b]" />
              </div>
              <h3 className="text-stone-900 mb-2">Youth Engagement Initiative</h3>
              <p className="text-sm text-stone-600 mb-3">
                150 young people trained in identification and management of invasive species, 
                expanding community monitoring capacity.
              </p>
              <p className="text-xs text-stone-500">2 months ago</p>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-8 bg-[#2d4a2b] text-white text-center border-[#2d4a2b]">
          <h2 className="mb-4">Explore Data-Driven Insights</h2>
          <p className="text-[#f5f0e8] mb-6 max-w-2xl mx-auto">
            Leverage AI-powered analytics and environmental monitoring data to make informed conservation decisions
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate("map")} className="bg-white text-[#2d4a2b] hover:bg-[#f5f0e8]">
              View Map Data
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate("home")} className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}