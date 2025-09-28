import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


const FilterPanel = ({ 
  selectedPeriod, 
  onPeriodChange, 
  selectedStartup, 
  onStartupChange, 
  selectedMetrics, 
  onMetricsChange,
  onExportPDF,
  onRefresh,
  startupOptions = [],
  metricOptions = []
}) => {
  const periodOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="min-w-0 flex-1">
            <Select
              label="Time Period"
              options={periodOptions}
              value={selectedPeriod}
              onChange={onPeriodChange}
              className="w-full"
            />
          </div>
          
          {startupOptions?.length > 0 && (
            <div className="min-w-0 flex-1">
              <Select
                label="Startup"
                options={startupOptions}
                value={selectedStartup}
                onChange={onStartupChange}
                searchable
                clearable
                placeholder="All Startups"
                className="w-full"
              />
            </div>
          )}
          
          <div className="min-w-0 flex-1">
            <Select
              label="Metrics"
              options={metricOptions}
              value={selectedMetrics}
              onChange={onMetricsChange}
              multiple
              searchable
              placeholder="Select metrics to display"
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onRefresh}
            iconName="RefreshCw"
            className="whitespace-nowrap"
          >
            Refresh
          </Button>
          <Button
            variant="default"
            onClick={onExportPDF}
            iconName="Download"
            className="whitespace-nowrap"
          >
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;