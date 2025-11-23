import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Info, ZoomIn, ZoomOut, Sparkles, X } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { 
  AIPredictionService
} from "../services/aiPredictionService";
import { DataService } from "../services/dataService";
import { AIInsightsPanel } from "./AIInsightsPanel";
import { StatisticsPanel } from "./StatisticsPanel";
import { PredictionHeatmap } from "./PredictionHeatmap";

export function MapPage({ onNavigate }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [showPredictions, setShowPredictions] = useState(true);
  const [predictions, setPredictions] = useState([]);
  const [insights, setInsights] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [infestationPoints, setInfestationPoints] = useState([]);

  // Generate AI predictions and insights on component mount
  useEffect(() => {
    const data = DataService.getInfestationPoints();
    const generatedPredictions = AIPredictionService.generatePredictions(data);
    const generatedInsights = AIPredictionService.generateInsights(data);
    const generatedStatistics = AIPredictionService.computeStatistics(data);
    
    setInfestationPoints(data);
    setPredictions(generatedPredictions);
    setInsights(generatedInsights);
    setStatistics(generatedStatistics);
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-400";
      case "low":
        return "bg-yellow-400";
      case "none":
        return "bg-[#3a5a38]";
      default:
        return "bg-gray-400";
    }
  };

  const getLevelBadgeVariant = (level) => {
    switch (level) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      case "none":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-[#2d4a2b] mb-2">Infestation Map</h1>
          <p className="text-stone-600">
            Interactive map showing Prosopis juliflora infestation levels across regions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-stone-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-stone-900">Regional Map View</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setZoom(Math.min(zoom + 0.2, 2))}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setZoom(Math.max(zoom - 0.2, 0.6))}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Map Canvas */}
              <div className="relative bg-[#ebe6dd] rounded-lg border-2 border-[#c19a6b] overflow-hidden" style={{ height: "500px" }}>
                {/* AI Predictions Toggle */}
                <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-3 border border-stone-200">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#2d4a2b]" />
                    <Label htmlFor="predictions-toggle" className="text-sm text-stone-700 cursor-pointer">
                      AI Predictions
                    </Label>
                    <Switch
                      id="predictions-toggle"
                      checked={showPredictions}
                      onCheckedChange={setShowPredictions}
                    />
                  </div>
                </div>

                {/* Simulated map background */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Infestation Points */}
                <div className="absolute inset-0" style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
                  {infestationPoints.map((point) => (
                    <button
                      key={point.id}
                      onClick={() => { 
                        setSelectedPoint(point);
                        setSelectedPrediction(null);
                      }}
                      className={`absolute w-8 h-8 rounded-full ${getLevelColor(point.level)} 
                        border-2 border-white shadow-lg transition-transform hover:scale-125 
                        flex items-center justify-center cursor-pointer
                        ${selectedPoint?.id === point.id ? "scale-125 ring-4 ring-blue-300" : ""}`}
                      style={{
                        left: `${point.lng}%`,
                        top: `${point.lat}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <MapPin className="w-4 h-4 text-white" />
                    </button>
                  ))}
                </div>

                {/* Prediction Heatmap */}
                <PredictionHeatmap 
                  predictions={predictions} 
                  zoom={zoom} 
                  showPredictions={showPredictions}
                  onPredictionClick={(prediction) => {
                    setSelectedPrediction(prediction);
                    setSelectedPoint(null);
                  }}
                />

                {/* Info overlay for selected point */}
                {selectedPoint && (
                  <div className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-stone-200">
                    <button 
                      onClick={() => setSelectedPoint(null)}
                      className="absolute top-2 right-2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex justify-between items-start mb-2 pr-6">
                      <h4 className="text-stone-900">{selectedPoint.location}</h4>
                      <Badge variant={getLevelBadgeVariant(selectedPoint.level)}>
                        {selectedPoint.level.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-stone-600 mb-2">
                      {selectedPoint.reports} community reports
                    </p>
                    <p className="text-sm text-stone-700">
                      {selectedPoint.level === "none" 
                        ? "This area is clear and suitable for tree planting initiatives"
                        : `This area has ${selectedPoint.level} levels of Prosopis juliflora infestation`}
                    </p>
                  </div>
                )}

                {/* Info overlay for selected prediction */}
                {selectedPrediction && (
                  <div className="absolute top-4 left-4 right-4 bg-gradient-to-br from-[#2d4a2b] to-[#3a5a38] text-white rounded-lg shadow-lg p-4 border-2 border-[#c19a6b]">
                    <button 
                      onClick={() => setSelectedPrediction(null)}
                      className="absolute top-2 right-2 text-white/70 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 mb-3 pr-6">
                      <Sparkles className="w-5 h-5" />
                      <h4>AI Prediction Zone</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-white/70 mb-1">Risk Level</p>
                        <p className="text-lg">{selectedPrediction.riskLevel}%</p>
                      </div>
                      <div>
                        <p className="text-white/70 mb-1">Confidence</p>
                        <p className="text-lg">{selectedPrediction.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-white/70 mb-1">Severity</p>
                        <Badge variant="outline" className="text-white border-white">
                          {selectedPrediction.predictedLevel.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-white/70 mb-1">Timeframe</p>
                        <p>{selectedPrediction.timeframe}</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/90 mt-3">
                      This zone has a {selectedPrediction.riskLevel}% risk of infestation within {selectedPrediction.timeframe}.
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* AI Insights Panel */}
            {insights && (
              <AIInsightsPanel insights={insights} />
            )}

            {/* Statistics Panel */}
            {statistics && (
              <StatisticsPanel statistics={statistics} />
            )}
          </div>

          {/* Legend and Stats */}
          <div className="space-y-6">
            {/* Legend */}
            <Card className="p-6 border-stone-200">
              <h3 className="text-stone-900 mb-4">Map Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow" />
                  <div>
                    <p className="text-stone-900">High Infestation</p>
                    <p className="text-sm text-stone-600">Immediate action needed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-400 border-2 border-white shadow" />
                  <div>
                    <p className="text-stone-900">Medium Infestation</p>
                    <p className="text-sm text-stone-600">Monitor and control</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-white shadow" />
                  <div>
                    <p className="text-stone-900">Low Infestation</p>
                    <p className="text-sm text-stone-600">Early stage detection</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#3a5a38] border-2 border-white shadow" />
                  <div>
                    <p className="text-stone-900">Clear Zone</p>
                    <p className="text-sm text-stone-600">Ideal for tree planting</p>
                  </div>
                </div>
              </div>

              {showPredictions && (
                <>
                  <div className="my-4 border-t border-stone-200" />
                  <h4 className="text-sm text-stone-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#2d4a2b]" />
                    AI Predictions
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-red-500/50 border border-red-500 animate-pulse" />
                      <span className="text-stone-700">High Risk Zone</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-orange-400/50 border border-orange-400" />
                      <span className="text-stone-700">Medium Risk Zone</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-yellow-400/50 border border-yellow-400" />
                      <span className="text-stone-700">Low Risk Zone</span>
                    </div>
                  </div>
                </>
              )}
            </Card>

            {/* Call to Action */}
            <Card className="p-6 bg-[#ebe6dd] border-[#c19a6b]">
              <div className="flex gap-3 mb-3">
                <Info className="w-5 h-5 text-[#2d4a2b] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#2d4a2b] mb-3">
                    See an infestation in your area? Help us keep the map updated.
                  </p>
                  <Button size="sm" onClick={() => onNavigate("report")} className="w-full">
                    Submit Report
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}