import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StartupCard = ({ startup, onViewProfile, onGenerateReport, onMessage, onBookmark }) => {
  const getRiskScoreColor = (score) => {
    if (score <= 30) return 'text-success bg-success/10';
    if (score <= 60) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getStageColor = (stage) => {
    const colors = {
      'Pre-Seed': 'bg-blue-100 text-blue-800',
      'Seed': 'bg-green-100 text-green-800',
      'Series A': 'bg-purple-100 text-purple-800',
      'Series B': 'bg-orange-100 text-orange-800',
      'Series C': 'bg-red-100 text-red-800'
    };
    return colors?.[stage] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <Image
              src={startup?.logo}
              alt={`${startup?.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{startup?.name}</h3>
            <p className="text-muted-foreground text-sm">{startup?.industry}</p>
          </div>
        </div>
        <button
          onClick={() => onBookmark(startup?.id)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            startup?.isBookmarked
              ? 'text-warning bg-warning/10 hover:bg-warning/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <Icon name={startup?.isBookmarked ? 'Star' : 'Star'} size={18} />
        </button>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Funding Stage</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(startup?.stage)}`}>
            {startup?.stage}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">AI Risk Score</span>
          <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium ${getRiskScoreColor(startup?.riskScore)}`}>
            <span>{startup?.riskScore}%</span>
            <Icon name="Info" size={12} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last Activity</span>
          <span className="text-sm text-foreground">{formatDate(startup?.lastActivity)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Funding Goal</span>
          <span className="text-sm font-medium text-foreground">${startup?.fundingGoal}</span>
        </div>
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex flex-col space-y-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={() => onViewProfile(startup?.id)}
            iconName="Eye"
            iconPosition="left"
          >
            View Profile
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onGenerateReport(startup?.id)}
              iconName="FileText"
              iconPosition="left"
              className="flex-1"
            >
              Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMessage(startup?.id)}
              iconName="MessageSquare"
              iconPosition="left"
              className="flex-1"
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;
