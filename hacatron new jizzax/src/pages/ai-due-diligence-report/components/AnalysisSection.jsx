import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisSection = ({ 
  title, 
  icon, 
  insights, 
  strengths, 
  weaknesses, 
  sourceDocuments,
  isExpanded = false 
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden mb-4">
      {/* Section Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted transition-colors duration-200"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={18} color="var(--color-primary)" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <Icon 
          name={expanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground transition-transform duration-200"
        />
      </div>
      {/* Section Content */}
      {expanded && (
        <div className="border-t border-border">
          {/* AI Insights */}
          <div className="p-4 border-b border-border">
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Icon name="Brain" size={16} />
              AI Analysis
            </h4>
            <div className="space-y-3">
              {insights?.map((insight, index) => (
                <div key={index} className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-foreground leading-relaxed">{insight?.text}</p>
                  {insight?.confidence && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">Confidence:</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 bg-border rounded-full h-1">
                          <div 
                            className="h-1 bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${insight?.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">{insight?.confidence}%</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="p-4 grid md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                Strengths
              </h4>
              <div className="space-y-2">
                {strengths?.map((strength, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Icon name="TrendingDown" size={16} className="text-error" />
                Areas of Concern
              </h4>
              <div className="space-y-2">
                {weaknesses?.map((weakness, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{weakness}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Source Documents */}
          {sourceDocuments && sourceDocuments?.length > 0 && (
            <div className="p-4 border-t border-border bg-muted bg-opacity-50">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Icon name="FileText" size={16} />
                Source Documents
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {sourceDocuments?.map((doc, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start h-auto p-2"
                    iconName="ExternalLink"
                    iconPosition="right"
                    iconSize={14}
                  >
                    <div className="text-left">
                      <div className="text-xs font-medium text-foreground truncate">{doc?.name}</div>
                      <div className="text-xs text-muted-foreground">Page {doc?.page}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisSection;