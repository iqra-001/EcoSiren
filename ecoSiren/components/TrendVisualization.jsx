import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar, Sparkles } from "lucide-react";

export function TrendVisualization({ historicalData, predictions }) {
  // Format data for charts
  const chartData = historicalData.map(point => ({
    month: point.date.toLocaleDateString('en-US', { month: 'short' }),
    reports: point.reports,
    cleared: point.areasCleared,
    planted: Math.round(point.treesPlanted / 100) / 10, // Scale down for better visualization
    members: Math.round(point.activeMembers / 10),
    infestation: point.infestationScore
  }));

  // Add prediction to chart data
  const predictionMonth = new Date();
  predictionMonth.setMonth(predictionMonth.getMonth() + 1);
  
  const chartDataWithPrediction = [
    ...chartData,
    {
      month: predictionMonth.toLocaleDateString('en-US', { month: 'short' }) + " (AI)",
      reports: predictions.nextMonthProjection.expectedReports,
      cleared: predictions.nextMonthProjection.projectedCleared,
      planted: Math.round(predictions.nextMonthProjection.projectedPlanted / 100) / 10,
      members: chartData[chartData.length - 1].members * 1.1,
      infestation: chartData[chartData.length - 1].infestation * 0.95,
      predicted: true
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isPredicted = label.includes("(AI)");
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-stone-200">
          <p className="text-sm text-stone-900 mb-2">
            {label}
            {isPredicted && (
              <Badge variant="outline" className="ml-2 text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Predicted
              </Badge>
            )}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs text-stone-600" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === "planted" && " (x100)"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Reports and Cleared Areas Trend */}
      <Card className="p-6 border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2d4a2b] to-[#3a5a38] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-stone-900">Activity Trends</h3>
          </div>
          <Badge variant="outline">
            <Calendar className="w-3 h-3 mr-1" />
            Last 4 Months
          </Badge>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartDataWithPrediction}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5dfd5" />
            <XAxis 
              dataKey="month" 
              stroke="#6b5d52"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b5d52"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line 
              type="monotone" 
              dataKey="reports" 
              stroke="#2d4a2b" 
              strokeWidth={2}
              name="Community Reports"
              dot={{ fill: '#2d4a2b', r: 4 }}
              strokeDasharray={chartDataWithPrediction[chartDataWithPrediction.length - 1].predicted ? "5 5" : "0"}
            />
            <Line 
              type="monotone" 
              dataKey="cleared" 
              stroke="#c19a6b" 
              strokeWidth={2}
              name="Areas Cleared (ha)"
              dot={{ fill: '#c19a6b', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 p-3 bg-[#e8f1e8] rounded-lg border border-[#3a5a38]/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#2d4a2b]" />
            <p className="text-sm text-stone-900">AI Prediction</p>
          </div>
          <p className="text-xs text-stone-700">
            Next month: <span className="text-[#2d4a2b]">
              {predictions.nextMonthProjection.expectedReports} reports
            </span> and <span className="text-[#2d4a2b]">
              {predictions.nextMonthProjection.projectedCleared} hectares cleared
            </span> (
            <span className="text-[#3a5a38]">{predictions.nextMonthProjection.confidence}% confidence</span>
            )
          </p>
        </div>
      </Card>

      {/* Progress Comparison */}
      <Card className="p-6 border-stone-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#c19a6b] to-[#d4a574] rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-stone-900">Monthly Progress</h3>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5dfd5" />
            <XAxis 
              dataKey="month" 
              stroke="#6b5d52"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b5d52"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar 
              dataKey="planted" 
              fill="#3a5a38" 
              name="Trees Planted (x100)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="members" 
              fill="#c19a6b" 
              name="Active Members (x10)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Infestation Score Trend */}
      <Card className="p-6 border-stone-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#a0522d] to-[#c19a6b] rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-stone-900">Infestation Severity Index</h3>
          <Badge variant="outline" className="ml-auto">
            Lower is better
          </Badge>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartDataWithPrediction}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5dfd5" />
            <XAxis 
              dataKey="month" 
              stroke="#6b5d52"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b5d52"
              domain={[0, 100]}
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="infestation" 
              stroke="#a0522d" 
              strokeWidth={3}
              name="Severity Score"
              dot={{ fill: '#a0522d', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-[#e8f1e8] rounded-lg">
            <p className="text-xs text-stone-600 mb-1">Current</p>
            <p className="text-lg text-[#2d4a2b]">
              {chartData[chartData.length - 1].infestation}
            </p>
          </div>
          <div className="text-center p-3 bg-[#f4d7c3]/30 rounded-lg">
            <p className="text-xs text-stone-600 mb-1">Change</p>
            <p className="text-lg text-[#3a5a38]">
              -{Math.round(chartData[0].infestation - chartData[chartData.length - 1].infestation)}
            </p>
          </div>
          <div className="text-center p-3 bg-[#ebe6dd] rounded-lg">
            <p className="text-xs text-stone-600 mb-1">Trend</p>
            <p className="text-lg text-[#3a5a38]">↓ Improving</p>
          </div>
        </div>
      </Card>

      {/* Quarterly Forecast */}
      <Card className="p-6 bg-gradient-to-br from-[#2d4a2b] to-[#3a5a38] text-white border-[#2d4a2b]">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5" />
          <h3>AI Quarterly Forecast</h3>
          <Badge variant="outline" className="ml-auto text-white border-white">
            Next 3 Months
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-sm text-white/80 mb-2">Total Impact Value</p>
            <p className="text-2xl mb-1">
              ${(predictions.quarterlyForecast.totalImpact / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-white/70">Economic & environmental</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-sm text-white/80 mb-2">Risk Level</p>
            <Badge 
              variant={predictions.quarterlyForecast.riskLevel === "low" ? "outline" : "destructive"}
              className="text-white border-white"
            >
              {predictions.quarterlyForecast.riskLevel.toUpperCase()}
            </Badge>
            <p className="text-xs text-white/70 mt-2">Overall assessment</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-white/90 mb-3">Key Opportunities:</p>
          <div className="space-y-2">
            {predictions.quarterlyForecast.opportunities.map((opportunity, index) => (
              <div key={index} className="flex gap-2 text-sm bg-white/10 p-3 rounded-lg backdrop-blur">
                <span className="text-white">•</span>
                <p className="text-white/90">{opportunity}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}