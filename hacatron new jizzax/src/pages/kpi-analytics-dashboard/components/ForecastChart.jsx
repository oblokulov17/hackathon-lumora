import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';

const ForecastChart = ({ title, data, actualKey, forecastKey, confidenceKey, height = 350 }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">
                {typeof entry?.value === 'number' ? entry?.value?.toLocaleString() : entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Forecast</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning/50" />
            <span className="text-muted-foreground">Confidence</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} />
          <span>AI-powered forecasting with 85% accuracy based on historical trends</span>
        </div>
      </div>

      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Confidence interval area */}
            <Line
              type="monotone"
              dataKey={confidenceKey}
              stroke="var(--color-warning)"
              strokeWidth={1}
              strokeOpacity={0.3}
              fill="var(--color-warning)"
              fillOpacity={0.1}
              dot={false}
            />
            
            {/* Actual data line */}
            <Line
              type="monotone"
              dataKey={actualKey}
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            
            {/* Forecast line */}
            <Line
              type="monotone"
              dataKey={forecastKey}
              stroke="var(--color-accent)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            
            {/* Reference line to separate actual from forecast */}
            <ReferenceLine 
              x="Sep 2024" 
              stroke="var(--color-border)" 
              strokeDasharray="2 2" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;