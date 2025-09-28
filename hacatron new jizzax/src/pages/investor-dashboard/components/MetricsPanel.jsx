import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsPanel = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Total Investments',
      value: metrics?.totalInvestments,
      change: '+12%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Active Deals',
      value: metrics?.activeDeals,
      change: '+5',
      changeType: 'positive',
      icon: 'Briefcase',
      color: 'text-success bg-success/10'
    },
    {
      title: 'Avg Risk Score',
      value: `${metrics?.avgRiskScore}%`,
      change: '-3%',
      changeType: 'positive',
      icon: 'Shield',
      color: 'text-warning bg-warning/10'
    },
    {
      title: 'Pending Reviews',
      value: metrics?.pendingReviews,
      change: '+2',
      changeType: 'neutral',
      icon: 'Clock',
      color: 'text-error bg-error/10'
    },
    {
      title: 'Portfolio Value',
      value: `$${metrics?.portfolioValue}M`,
      change: '+18%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Success Rate',
      value: `${metrics?.successRate}%`,
      change: '+2%',
      changeType: 'positive',
      icon: 'Target',
      color: 'text-success bg-success/10'
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {metricCards?.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${metric?.color}`}>
              <Icon name={metric?.icon} size={20} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(metric?.changeType)}`}>
              <Icon name={getChangeIcon(metric?.changeType)} size={14} />
              <span>{metric?.change}</span>
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {metric?.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {metric?.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsPanel;
