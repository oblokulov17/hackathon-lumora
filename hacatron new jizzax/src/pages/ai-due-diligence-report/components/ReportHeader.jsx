import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportHeader = ({ 
  startupName, 
  analysisDate, 
  overallRiskScore, 
  executiveSummary,
  onExportPDF,
  onShareAnalysis,
  onScheduleFollowup 
}) => {
  const getRiskColor = (score) => {
    if (score <= 30) return 'text-success bg-green-50 border-green-200';
    if (score <= 60) return 'text-warning bg-yellow-50 border-yellow-200';
    return 'text-error bg-red-50 border-red-200';
  };

  const getRiskLabel = (score) => {
    if (score <= 30) return 'Low Risk';
    if (score <= 60) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Left Section - Company Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Building2" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{startupName}</h1>
              <p className="text-sm text-muted-foreground">AI Due Diligence Report</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} />
              <span>Generated: {analysisDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Bot" size={16} />
              <span>AI Analysis v2.1</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Icon name="FileText" size={16} />
              Executive Summary
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{executiveSummary}</p>
          </div>
        </div>

        {/* Right Section - Risk Score & Actions */}
        <div className="lg:w-80">
          {/* Risk Score */}
          <div className={`border rounded-lg p-4 mb-4 ${getRiskColor(overallRiskScore)}`}>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{overallRiskScore}%</div>
              <div className="text-sm font-medium mb-3">{getRiskLabel(overallRiskScore)}</div>
              
              {/* Risk Score Bar */}
              <div className="w-full bg-white bg-opacity-50 rounded-full h-2 mb-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${overallRiskScore}%`,
                    backgroundColor: overallRiskScore <= 30 ? '#10B981' : overallRiskScore <= 60 ? '#F59E0B' : '#EF4444'
                  }}
                />
              </div>
              <p className="text-xs opacity-80">Overall Investment Risk</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              variant="default" 
              fullWidth 
              iconName="Download" 
              iconPosition="left"
              onClick={onExportPDF}
            >
              Export PDF Report
            </Button>
            <Button 
              variant="outline" 
              fullWidth 
              iconName="Share2" 
              iconPosition="left"
              onClick={onShareAnalysis}
            >
              Share Analysis
            </Button>
            <Button 
              variant="ghost" 
              fullWidth 
              iconName="Calendar" 
              iconPosition="left"
              onClick={onScheduleFollowup}
            >
              Schedule Follow-up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;