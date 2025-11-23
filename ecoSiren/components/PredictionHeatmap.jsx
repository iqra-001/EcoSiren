import { Zap } from "lucide-react";

export function PredictionHeatmap({ 
  predictions, 
  zoom, 
  showPredictions,
  onPredictionClick 
}) {
  if (!showPredictions) return null;

  const getPredictionColor = (level, riskLevel) => {
    const opacity = Math.min(riskLevel / 100, 0.8);
    
    switch (level) {
      case "high":
        return `rgba(239, 68, 68, ${opacity})`; // Red
      case "medium":
        return `rgba(251, 146, 60, ${opacity})`; // Orange
      case "low":
        return `rgba(250, 204, 21, ${opacity})`; // Yellow
      default:
        return `rgba(156, 163, 175, ${opacity})`; // Gray
    }
  };

  const getBorderColor = (level) => {
    switch (level) {
      case "high":
        return "#dc2626";
      case "medium":
        return "#ea580c";
      case "low":
        return "#ca8a04";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
      {predictions.map((prediction) => (
        <div
          key={prediction.id}
          className="absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
          style={{
            left: `${prediction.lng}%`,
            top: `${prediction.lat}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => onPredictionClick(prediction)}
        >
          {/* Prediction circle with pulsing effect */}
          <div className="relative">
            {/* Pulsing outer ring */}
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: getPredictionColor(prediction.predictedLevel, prediction.riskLevel / 2),
                border: `2px dashed ${getBorderColor(prediction.predictedLevel)}`,
              }}
            />
            
            {/* Main prediction marker */}
            <div
              className="relative w-8 h-8 rounded-full border-2 shadow-lg flex items-center justify-center"
              style={{
                backgroundColor: getPredictionColor(prediction.predictedLevel, prediction.riskLevel),
                borderColor: getBorderColor(prediction.predictedLevel),
              }}
            >
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Hover tooltip */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none z-10">
            <div className="bg-white rounded-lg shadow-lg p-3 border border-stone-200 whitespace-nowrap">
              <p className="text-xs text-stone-900 mb-1">
                AI Prediction
              </p>
              <p className="text-xs text-stone-600">
                Risk: <span className="text-[#a0522d]">{prediction.riskLevel}%</span>
              </p>
              <p className="text-xs text-stone-600">
                Confidence: {prediction.confidence}%
              </p>
              <p className="text-xs text-stone-600">
                Timeframe: {prediction.timeframe}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}