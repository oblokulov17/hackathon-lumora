import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import StartupCard from './components/StartupCard';
import StartupTable from './components/StartupTable';
import FilterPanel from './components/FilterPanel';
import MetricsPanel from './components/MetricsPanel';
import RecentActivity from './components/RecentActivity';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'lastActivity', direction: 'desc' });
  const [filters, setFilters] = useState({
    industry: '',
    stage: '',
    riskScore: '',
    sort: 'lastActivity-desc'
  });

  // Mock data for startups
  const mockStartups = [
    {
      id: 1,
      name: "TechFlow AI",
      industry: "AI/ML",
      stage: "Series A",
      riskScore: 25,
      fundingGoal: "5.2M",
      lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      location: "San Francisco, CA",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
      isBookmarked: true,
      description: "AI-powered workflow automation platform for enterprise clients"
    },
    {
      id: 2,
      name: "HealthSync",
      industry: "HealthTech",
      stage: "Seed",
      riskScore: 45,
      fundingGoal: "2.8M",
      lastActivity: new Date(Date.now() - 172800000), // 2 days ago
      location: "Boston, MA",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center",
      isBookmarked: false,
      description: "Digital health platform connecting patients with healthcare providers"
    },
    {
      id: 3,
      name: "EduLearn Pro",
      industry: "EdTech",
      stage: "Pre-Seed",
      riskScore: 65,
      fundingGoal: "1.5M",
      lastActivity: new Date(Date.now() - 259200000), // 3 days ago
      location: "Austin, TX",
      logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop&crop=center",
      isBookmarked: true,
      description: "Personalized learning platform using adaptive AI technology"
    },
    {
      id: 4,
      name: "GreenEnergy Solutions",
      industry: "CleanTech",
      stage: "Series B",
      riskScore: 30,
      fundingGoal: "12.0M",
      lastActivity: new Date(Date.now() - 345600000), // 4 days ago
      location: "Seattle, WA",
      logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop&crop=center",
      isBookmarked: false,
      description: "Renewable energy storage and distribution solutions"
    },
    {
      id: 5,
      name: "CyberShield",
      industry: "Cybersecurity",
      stage: "Series A",
      riskScore: 20,
      fundingGoal: "8.5M",
      lastActivity: new Date(Date.now() - 432000000), // 5 days ago
      location: "New York, NY",
      logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop&crop=center",
      isBookmarked: true,
      description: "Advanced threat detection and response platform for enterprises"
    },
    {
      id: 6,
      name: "FinanceFlow",
      industry: "FinTech",
      stage: "Seed",
      riskScore: 55,
      fundingGoal: "3.2M",
      lastActivity: new Date(Date.now() - 518400000), // 6 days ago
      location: "Chicago, IL",
      logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&crop=center",
      isBookmarked: false,
      description: "Automated financial planning and investment management platform"
    },
    {
      id: 7,
      name: "RetailTech Innovations",
      industry: "E-commerce",
      stage: "Pre-Seed",
      riskScore: 70,
      fundingGoal: "2.1M",
      lastActivity: new Date(Date.now() - 604800000), // 7 days ago
      location: "Los Angeles, CA",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center",
      isBookmarked: false,
      description: "AI-powered retail analytics and customer experience optimization"
    },
    {
      id: 8,
      name: "CloudOps Pro",
      industry: "SaaS",
      stage: "Series A",
      riskScore: 35,
      fundingGoal: "6.8M",
      lastActivity: new Date(Date.now() - 691200000), // 8 days ago
      location: "Denver, CO",
      logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop&crop=center",
      isBookmarked: true,
      description: "Cloud infrastructure management and optimization platform"
    }
  ];

  // Mock metrics data
  const mockMetrics = {
    totalInvestments: 47,
    activeDeals: 12,
    avgRiskScore: 38,
    pendingReviews: 8,
    portfolioValue: 125.4,
    successRate: 73
  };

  // Mock recent activities
  const mockActivities = [
    {
      id: 1,
      type: 'pitch_deck',
      startupName: 'TechFlow AI',
      startupLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      description: 'Uploaded new pitch deck for Series A funding',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      actionRequired: true,
      priority: 'high'
    },
    {
      id: 2,
      type: 'message',
      startupName: 'HealthSync',
      startupLogo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      description: 'Sent a message regarding investment terms',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      actionRequired: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'report',
      startupName: 'CyberShield',
      startupLogo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop&crop=center',
      description: 'AI due diligence report completed',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      actionRequired: true,
      priority: 'high'
    },
    {
      id: 4,
      type: 'investment',
      startupName: 'GreenEnergy Solutions',
      startupLogo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop&crop=center',
      description: 'Investment proposal submitted for review',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      actionRequired: false,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'meeting',
      startupName: 'EduLearn Pro',
      startupLogo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop&crop=center',
      description: 'Scheduled follow-up meeting for next week',
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      actionRequired: false,
      priority: 'low'
    }
  ];

  // Filter and sort startups
  const filteredAndSortedStartups = useMemo(() => {
    let filtered = mockStartups?.filter(startup => {
      const matchesSearch = !searchQuery || 
        startup?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        startup?.industry?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        startup?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      const matchesIndustry = !filters?.industry || 
        startup?.industry?.toLowerCase()?.includes(filters?.industry?.toLowerCase());

      const matchesStage = !filters?.stage || 
        startup?.stage?.toLowerCase()?.replace(/\s+/g, '-') === filters?.stage;

      const matchesRiskScore = !filters?.riskScore || (() => {
        const [min, max] = filters?.riskScore?.split('-')?.map(Number);
        return startup?.riskScore >= min && startup?.riskScore <= max;
      })();

      return matchesSearch && matchesIndustry && matchesStage && matchesRiskScore;
    });

    // Apply sorting
    const [sortKey, sortDirection] = (filters?.sort || 'lastActivity-desc')?.split('-');
    filtered?.sort((a, b) => {
      let aValue = a?.[sortKey];
      let bValue = b?.[sortKey];

      if (sortKey === 'fundingGoal') {
        aValue = parseFloat(aValue?.replace('M', ''));
        bValue = parseFloat(bValue?.replace('M', ''));
      } else if (sortKey === 'lastActivity') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortDirection === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchQuery, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update sort config if sort filter changes
    if (key === 'sort' && value) {
      const [sortKey, direction] = value?.split('-');
      setSortConfig({ key: sortKey, direction });
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    setFilters(prev => ({ ...prev, sort: `${key}-${direction}` }));
  };

  const handleClearFilters = () => {
    setFilters({
      industry: '',
      stage: '',
      riskScore: '',
      sort: 'lastActivity-desc'
    });
    setSearchQuery('');
    setSortConfig({ key: 'lastActivity', direction: 'desc' });
  };

  const handleViewProfile = (startupId) => {
    navigate('/startup-profile', { state: { startupId } });
  };

  const handleGenerateReport = (startupId) => {
    navigate('/ai-due-diligence-report', { state: { startupId } });
  };

  const handleMessage = (startupId) => {
    navigate('/messaging-center', { state: { startupId } });
  };

  const handleBookmark = (startupId) => {
    // In a real app, this would update the backend
    console.log('Bookmark toggled for startup:', startupId);
  };

  const handleViewAllActivities = () => {
    // Navigate to a dedicated activities page or expand the current view
    console.log('View all activities');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="investor" notifications={5} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Investor Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your deal flow, track investments, and discover new opportunities
            </p>
          </div>

          {/* Metrics Panel */}
          <MetricsPanel metrics={mockMetrics} />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              {/* Results Count */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedStartups?.length} of {mockStartups?.length} companies
                </p>
              </div>

              {/* Startup Listings */}
              {viewMode === 'table' ? (
                <StartupTable
                  startups={filteredAndSortedStartups}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  onViewProfile={handleViewProfile}
                  onGenerateReport={handleGenerateReport}
                  onMessage={handleMessage}
                  onBookmark={handleBookmark}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedStartups?.map((startup) => (
                    <StartupCard
                      key={startup?.id}
                      startup={startup}
                      onViewProfile={handleViewProfile}
                      onGenerateReport={handleGenerateReport}
                      onMessage={handleMessage}
                      onBookmark={handleBookmark}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredAndSortedStartups?.length === 0 && (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No startups found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms to find more companies.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <RecentActivity
                activities={mockActivities}
                onViewAll={handleViewAllActivities}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestorDashboard;