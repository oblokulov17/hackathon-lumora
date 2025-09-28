import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities, onViewAll }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'pitch_deck': 'FileText',
      'message': 'MessageSquare',
      'investment': 'DollarSign',
      'report': 'BarChart3',
      'meeting': 'Calendar',
      'document': 'File'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      'pitch_deck': 'text-blue-600 bg-blue-100',
      'message': 'text-green-600 bg-green-100',
      'investment': 'text-purple-600 bg-purple-100',
      'report': 'text-orange-600 bg-orange-100',
      'meeting': 'text-red-600 bg-red-100',
      'document': 'text-gray-600 bg-gray-100'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-100';
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="divide-y divide-border">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 hover:bg-muted/30 transition-colors duration-150">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {activity?.startupLogo && (
                    <div className="w-5 h-5 rounded overflow-hidden">
                      <Image
                        src={activity?.startupLogo}
                        alt={`${activity?.startupName} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {activity?.startupName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {activity?.description}
                </p>
                
                {activity?.actionRequired && (
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={14} className="text-warning" />
                    <span className="text-xs text-warning font-medium">
                      Action Required
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                {activity?.priority === 'high' && (
                  <div className="w-2 h-2 bg-error rounded-full"></div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ChevronRight"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;