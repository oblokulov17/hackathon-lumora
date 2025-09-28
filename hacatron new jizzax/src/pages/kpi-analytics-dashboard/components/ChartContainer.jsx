import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ChartContainer = ({ title, type = 'line', data, dataKeys, colors, height = 300, showLegend = true }) => {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    if (type === 'bar') {
      return (
        <BarChart {...commonProps}>
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
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px'
            }}
          />
          {showLegend && <Legend />}
          {dataKeys?.map((key, index) => (
            <Bar 
              key={key} 
              dataKey={key} 
              fill={colors?.[index] || 'var(--color-primary)'} 
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      );
    }

    return (
      <LineChart {...commonProps}>
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
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px'
          }}
        />
        {showLegend && <Legend />}
        {dataKeys?.map((key, index) => (
          <Line 
            key={key}
            type="monotone" 
            dataKey={key} 
            stroke={colors?.[index] || 'var(--color-primary)'} 
            strokeWidth={2}
            dot={{ fill: colors?.[index] || 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartContainer;