import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const EngagementMetrics = ({ engagementData, timeRange, onTimeRangeChange }) => {
  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const totalViews = engagementData?.profileViews?.reduce((sum, item) => sum + item?.views, 0);
  const totalDownloads = engagementData?.documentDownloads?.reduce((sum, item) => sum + item?.downloads, 0);
  const totalMessages = engagementData?.messageActivity?.reduce((sum, item) => sum + item?.messages, 0);

  const averageViews = totalViews / engagementData?.profileViews?.length || 0;
  const conversionRate = totalViews > 0 ? (totalMessages / totalViews * 100) : 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Investor Engagement</h3>
        <div className="flex space-x-2">
          {timeRanges?.map(range => (
            <button
              key={range?.value}
              onClick={() => onTimeRangeChange(range?.value)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                timeRange === range?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {range?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Eye" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Profile Views</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{totalViews}</div>
          <div className="text-xs text-muted-foreground">
            Avg: {averageViews?.toFixed(1)}/day
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Download" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">Downloads</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{totalDownloads}</div>
          <div className="text-xs text-muted-foreground">
            {totalViews > 0 ? ((totalDownloads / totalViews) * 100)?.toFixed(1) : 0}% of views
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MessageSquare" size={16} className="text-accent" />
            <span className="text-xs text-muted-foreground">Messages</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{totalMessages}</div>
          <div className="text-xs text-muted-foreground">
            {conversionRate?.toFixed(1)}% conversion
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-warning" />
            <span className="text-xs text-muted-foreground">Engagement</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {((totalDownloads + totalMessages) / Math.max(totalViews, 1) * 100)?.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">Overall rate</div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Views Trend */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Profile Views Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData?.profileViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  labelFormatter={(value) => new Date(value)?.toLocaleDateString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Document Downloads */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Document Downloads</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData?.documentDownloads}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  labelFormatter={(value) => new Date(value)?.toLocaleDateString()}
                />
                <Bar 
                  dataKey="downloads" 
                  fill="var(--color-success)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Activity</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {engagementData?.recentActivity?.map(activity => (
            <div key={activity?.id} className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
              <Icon 
                name={activity?.type === 'view' ? 'Eye' : activity?.type === 'download' ? 'Download' : 'MessageSquare'} 
                size={14} 
                className={`${
                  activity?.type === 'view' ? 'text-primary' : 
                  activity?.type === 'download' ? 'text-success' : 'text-accent'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{activity?.description}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(activity.timestamp)?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngagementMetrics;