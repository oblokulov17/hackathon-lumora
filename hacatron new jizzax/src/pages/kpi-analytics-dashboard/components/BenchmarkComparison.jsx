import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const BenchmarkComparison = ({ title, data, height = 300 }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-muted-foreground">{entry?.name}:</span>
              </div>
              <span className="font-medium text-foreground">
                {typeof entry?.value === 'number' ? `${entry?.value}%` : entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getBenchmarkStatus = (yourValue, industryAverage) => {
    const difference = yourValue - industryAverage;
    if (difference > 10) return { status: 'excellent', color: 'text-success', icon: 'TrendingUp' };
    if (difference > 0) return { status: 'good', color: 'text-primary', icon: 'ArrowUp' };
    if (difference > -10) return { status: 'average', color: 'text-warning', icon: 'Minus' };
    return { status: 'below', color: 'text-error', icon: 'TrendingDown' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Your Performance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-muted-foreground">Industry Average</span>
          </div>
        </div>
      </div>
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="metric" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="yourValue" 
              fill="var(--color-primary)" 
              name="Your Performance"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="industryAverage" 
              fill="var(--color-secondary)" 
              name="Industry Average"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.map((item, index) => {
          const benchmark = getBenchmarkStatus(item?.yourValue, item?.industryAverage);
          return (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{item?.metric}</span>
                <Icon name={benchmark?.icon} size={16} className={benchmark?.color} />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You:</span>
                  <span className="font-medium text-foreground">{item?.yourValue}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="font-medium text-foreground">{item?.industryAverage}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Difference:</span>
                  <span className={`font-medium ${benchmark?.color}`}>
                    {item?.yourValue - item?.industryAverage > 0 ? '+' : ''}
                    {item?.yourValue - item?.industryAverage}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BenchmarkComparison;