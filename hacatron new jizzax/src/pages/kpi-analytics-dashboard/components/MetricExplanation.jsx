import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MetricExplanation = ({ metrics = [] }) => {
  const [expandedMetric, setExpandedMetric] = useState(null);

  const toggleExpanded = (metricId) => {
    setExpandedMetric(expandedMetric === metricId ? null : metricId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Metric Explanations</h3>
      <div className="space-y-4">
        {metrics?.map((metric) => (
          <div key={metric?.id} className="border border-border rounded-lg">
            <button
              onClick={() => toggleExpanded(metric?.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${metric?.color || 'bg-primary/10 text-primary'}`}>
                  <Icon name={metric?.icon} size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{metric?.name}</h4>
                  <p className="text-sm text-muted-foreground">{metric?.shortDescription}</p>
                </div>
              </div>
              <Icon 
                name={expandedMetric === metric?.id ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                className="text-muted-foreground"
              />
            </button>
            
            {expandedMetric === metric?.id && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="pt-4 space-y-4">
                  <div>
                    <h5 className="font-medium text-foreground mb-2">What it measures:</h5>
                    <p className="text-sm text-muted-foreground">{metric?.fullDescription}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-foreground mb-2">How it's calculated:</h5>
                    <div className="bg-muted rounded-lg p-3">
                      <code className="text-sm text-data text-foreground">{metric?.formula}</code>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Why it matters:</h5>
                    <p className="text-sm text-muted-foreground">{metric?.importance}</p>
                  </div>
                  
                  {metric?.benchmarks && (
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Industry Benchmarks:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                          <div className="text-xs text-success font-medium mb-1">Good</div>
                          <div className="text-sm font-semibold text-foreground">{metric?.benchmarks?.good}</div>
                        </div>
                        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                          <div className="text-xs text-warning font-medium mb-1">Average</div>
                          <div className="text-sm font-semibold text-foreground">{metric?.benchmarks?.average}</div>
                        </div>
                        <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                          <div className="text-xs text-error font-medium mb-1">Poor</div>
                          <div className="text-sm font-semibold text-foreground">{metric?.benchmarks?.poor}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {metric?.tips && (
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Improvement Tips:</h5>
                      <ul className="space-y-1">
                        {metric?.tips?.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {metric?.relatedActions && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {metric?.relatedActions?.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={action?.onClick}
                          iconName={action?.icon}
                        >
                          {action?.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricExplanation;