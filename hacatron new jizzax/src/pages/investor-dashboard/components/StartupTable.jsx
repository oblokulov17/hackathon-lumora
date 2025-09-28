import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StartupTable = ({ startups, sortConfig, onSort, onViewProfile, onGenerateReport, onMessage, onBookmark }) => {
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

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const columns = [
    { key: 'name', label: 'Company', sortable: true },
    { key: 'industry', label: 'Industry', sortable: true },
    { key: 'stage', label: 'Stage', sortable: true },
    { key: 'riskScore', label: 'Risk Score', sortable: true },
    { key: 'fundingGoal', label: 'Funding Goal', sortable: true },
    { key: 'lastActivity', label: 'Last Activity', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-8 px-4 py-3">
                <input
                  type="checkbox"
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground ${
                    column?.sortable ? 'cursor-pointer hover:text-foreground' : ''
                  }`}
                  onClick={column?.sortable ? () => onSort(column?.key) : undefined}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column?.label}</span>
                    {column?.sortable && (
                      <Icon name={getSortIcon(column?.key)} size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {startups?.map((startup) => (
              <tr key={startup?.id} className="hover:bg-muted/30 transition-colors duration-150">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      <Image
                        src={startup?.logo}
                        alt={`${startup?.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{startup?.name}</div>
                      <div className="text-sm text-muted-foreground">{startup?.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-foreground">{startup?.industry}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(startup?.stage)}`}>
                    {startup?.stage}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRiskScoreColor(startup?.riskScore)}`}>
                    <span>{startup?.riskScore}%</span>
                    <Icon name="Info" size={12} />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-foreground">${startup?.fundingGoal}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-muted-foreground">{formatDate(startup?.lastActivity)}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onBookmark(startup?.id)}
                      className={`p-1.5 rounded-lg transition-colors duration-200 ${
                        startup?.isBookmarked
                          ? 'text-warning bg-warning/10 hover:bg-warning/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name="Star" size={16} />
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewProfile(startup?.id)}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onGenerateReport(startup?.id)}
                      iconName="FileText"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMessage(startup?.id)}
                      iconName="MessageSquare"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StartupTable;