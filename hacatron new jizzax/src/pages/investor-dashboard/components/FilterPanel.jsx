import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  searchQuery, 
  onSearchChange,
  viewMode,
  onViewModeChange 
}) => {
  const industryOptions = [
    { value: '', label: 'All Industries' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'healthtech', label: 'HealthTech' },
    { value: 'edtech', label: 'EdTech' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'saas', label: 'SaaS' },
    { value: 'ai', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'iot', label: 'IoT' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'cleantech', label: 'CleanTech' }
  ];

  const stageOptions = [
    { value: '', label: 'All Stages' },
    { value: 'pre-seed', label: 'Pre-Seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series-a', label: 'Series A' },
    { value: 'series-b', label: 'Series B' },
    { value: 'series-c', label: 'Series C' }
  ];

  const riskScoreOptions = [
    { value: '', label: 'All Risk Scores' },
    { value: '0-30', label: 'Low Risk (0-30%)' },
    { value: '31-60', label: 'Medium Risk (31-60%)' },
    { value: '61-100', label: 'High Risk (61-100%)' }
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Company A-Z' },
    { value: 'name-desc', label: 'Company Z-A' },
    { value: 'riskScore-asc', label: 'Risk Score Low-High' },
    { value: 'riskScore-desc', label: 'Risk Score High-Low' },
    { value: 'lastActivity-desc', label: 'Recently Active' },
    { value: 'lastActivity-asc', label: 'Least Active' },
    { value: 'fundingGoal-desc', label: 'Funding Goal High-Low' },
    { value: 'fundingGoal-asc', label: 'Funding Goal Low-High' }
  ];

  const hasActiveFilters = filters?.industry || filters?.stage || filters?.riskScore || filters?.sort || searchQuery;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-foreground">Deal Flow</h2>
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('table')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'table' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Table" size={16} />
              <span>Table</span>
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
              <span>Grid</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search companies, industries, or keywords..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        <Select
          placeholder="Industry"
          options={industryOptions}
          value={filters?.industry}
          onChange={(value) => onFilterChange('industry', value)}
        />

        <Select
          placeholder="Stage"
          options={stageOptions}
          value={filters?.stage}
          onChange={(value) => onFilterChange('stage', value)}
        />

        <Select
          placeholder="Risk Score"
          options={riskScoreOptions}
          value={filters?.riskScore}
          onChange={(value) => onFilterChange('riskScore', value)}
        />

        <Select
          placeholder="Sort by"
          options={sortOptions}
          value={filters?.sort}
          onChange={(value) => onFilterChange('sort', value)}
        />
      </div>
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
              <span>Search: "{searchQuery}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {filters?.industry && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
              <span>Industry: {industryOptions?.find(opt => opt?.value === filters?.industry)?.label}</span>
              <button
                onClick={() => onFilterChange('industry', '')}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {filters?.stage && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
              <span>Stage: {stageOptions?.find(opt => opt?.value === filters?.stage)?.label}</span>
              <button
                onClick={() => onFilterChange('stage', '')}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {filters?.riskScore && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
              <span>Risk: {riskScoreOptions?.find(opt => opt?.value === filters?.riskScore)?.label}</span>
              <button
                onClick={() => onFilterChange('riskScore', '')}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;