import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const FinancialAnalysis = ({ financialData, ratios, trends }) => {
  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 48000, expenses: 33000 },
    { month: 'Apr', revenue: 61000, expenses: 38000 },
    { month: 'May', revenue: 55000, expenses: 36000 },
    { month: 'Jun', revenue: 67000, expenses: 41000 }
  ];

  const burnRateData = [
    { month: 'Jan', burnRate: 28000, runway: 18 },
    { month: 'Feb', burnRate: 31000, runway: 16 },
    { month: 'Mar', burnRate: 29000, runway: 17 },
    { month: 'Apr', burnRate: 33000, runway: 15 },
    { month: 'May', burnRate: 30000, runway: 16 },
    { month: 'Jun', burnRate: 35000, runway: 14 }
  ];

  const keyMetrics = [
    { label: 'Current Ratio', value: '2.4', status: 'good', description: 'Strong liquidity position' },
    { label: 'Gross Margin', value: '68%', status: 'excellent', description: 'Above industry average' },
    { label: 'Burn Rate', value: '$35K/mo', status: 'warning', description: 'Increasing trend observed' },
    { label: 'Runway', value: '14 months', status: 'warning', description: 'Consider fundraising soon' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return 'TrendingUp';
      case 'good': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'poor': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
          <Icon name="DollarSign" size={18} color="var(--color-primary)" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Financial Analysis</h3>
      </div>
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {keyMetrics?.map((metric, index) => (
          <div key={index} className={`border rounded-lg p-4 ${getStatusColor(metric?.status)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{metric?.label}</span>
              <Icon name={getStatusIcon(metric?.status)} size={16} />
            </div>
            <div className="text-2xl font-bold mb-1">{metric?.value}</div>
            <p className="text-xs opacity-80">{metric?.description}</p>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <div className="bg-muted bg-opacity-50 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="BarChart3" size={16} />
            Revenue vs Expenses (6 Months)
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Burn Rate & Runway */}
        <div className="bg-muted bg-opacity-50 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="TrendingDown" size={16} />
            Burn Rate & Runway Trend
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={burnRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="burnRate" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Burn Rate ($)"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="runway" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Runway (months)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Financial Highlights */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <Icon name="TrendingUp" size={16} />
            Positive Indicators
          </h4>
          <ul className="space-y-1 text-sm text-green-700">
            <li>• Consistent revenue growth over 6 months</li>
            <li>• Strong gross margins above industry average</li>
            <li>• Healthy current ratio indicating good liquidity</li>
            <li>• Diversified revenue streams reducing risk</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
            <Icon name="AlertTriangle" size={16} />
            Areas for Attention
          </h4>
          <ul className="space-y-1 text-sm text-yellow-700">
            <li>• Increasing burn rate trend needs monitoring</li>
            <li>• Runway of 14 months suggests fundraising urgency</li>
            <li>• Operating expenses growing faster than revenue</li>
            <li>• Customer acquisition costs trending upward</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysis;