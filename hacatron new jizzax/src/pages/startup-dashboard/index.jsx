import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProfileStatusCard from './components/ProfileStatusCard';
import DocumentManager from './components/DocumentManager';
import TeamManagement from './components/TeamManagement';
import KPIInputSection from './components/KPIInputSection';
import EngagementMetrics from './components/EngagementMetrics';
import QuickActions from './components/QuickActions';

const StartupDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Profile Status Mock Data
  const [profileData, setProfileData] = useState({
    completionPercentage: 75,
    investorViews: 142,
    documentDownloads: 28,
    missingElements: [
      { name: 'Financial Projections', type: 'financial' },
      { name: 'Team Photos', type: 'team' }
    ]
  });

  // Documents Mock Data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'TechStart_PitchDeck_v3.pdf',
      category: 'Pitch Deck',
      size: 2456789,
      uploadedAt: new Date('2024-09-15')
    },
    {
      id: 2,
      name: 'Financial_Statements_Q3.xlsx',
      category: 'Financial Statements',
      size: 1234567,
      uploadedAt: new Date('2024-09-20')
    },
    {
      id: 3,
      name: 'Legal_Documents_Package.pdf',
      category: 'Legal Documents',
      size: 3456789,
      uploadedAt: new Date('2024-09-10')
    }
  ]);

  // Team Members Mock Data
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      email: 'sarah@techstart.com',
      linkedin: 'https://linkedin.com/in/sarahchen',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      bio: `Former VP of Product at Google with 8+ years in tech. Led product teams of 50+ engineers and launched products used by millions of users worldwide.`
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'CTO & Co-founder',
      email: 'michael@techstart.com',
      linkedin: 'https://linkedin.com/in/michaelrodriguez',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      bio: `Senior Software Engineer at Meta for 6 years. Expert in scalable systems architecture and machine learning infrastructure.`
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Head of Marketing',
      email: 'emily@techstart.com',
      linkedin: 'https://linkedin.com/in/emilywatson',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      bio: `Growth marketing specialist with proven track record of scaling B2B SaaS companies from startup to $10M+ ARR.`
    }
  ]);

  // KPI Data Mock
  const [kpiData, setKpiData] = useState([
    { id: 1, metric: 'mrr', date: '2024-08-01', value: 45000, notes: 'Strong month with 3 enterprise deals' },
    { id: 2, metric: 'mrr', date: '2024-09-01', value: 52000, notes: 'Continued growth momentum' },
    { id: 3, metric: 'users', date: '2024-08-01', value: 1250, notes: 'User acquisition campaign results' },
    { id: 4, metric: 'users', date: '2024-09-01', value: 1420, notes: 'Organic growth + referrals' },
    { id: 5, metric: 'growth', date: '2024-08-01', value: 15.5, notes: 'Month-over-month growth' },
    { id: 6, metric: 'growth', date: '2024-09-01', value: 13.6, notes: 'Slight slowdown but healthy' },
    { id: 7, metric: 'churn', date: '2024-08-01', value: 2.1, notes: 'Below industry average' },
    { id: 8, metric: 'churn', date: '2024-09-01', value: 1.8, notes: 'Improved retention strategies' }
  ]);

  // Engagement Metrics Mock Data
  const [engagementData, setEngagementData] = useState({
    profileViews: [
      { date: '2024-09-22', views: 12 },
      { date: '2024-09-23', views: 8 },
      { date: '2024-09-24', views: 15 },
      { date: '2024-09-25', views: 22 },
      { date: '2024-09-26', views: 18 },
      { date: '2024-09-27', views: 25 },
      { date: '2024-09-28', views: 19 }
    ],
    documentDownloads: [
      { date: '2024-09-22', downloads: 3 },
      { date: '2024-09-23', downloads: 2 },
      { date: '2024-09-24', downloads: 5 },
      { date: '2024-09-25', downloads: 7 },
      { date: '2024-09-26', downloads: 4 },
      { date: '2024-09-27', downloads: 6 },
      { date: '2024-09-28', downloads: 1 }
    ],
    messageActivity: [
      { date: '2024-09-22', messages: 2 },
      { date: '2024-09-23', messages: 1 },
      { date: '2024-09-24', messages: 3 },
      { date: '2024-09-25', messages: 4 },
      { date: '2024-09-26', messages: 2 },
      { date: '2024-09-27', messages: 5 },
      { date: '2024-09-28', messages: 1 }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'view',
        description: 'Investor from Sequoia Capital viewed your profile',
        timestamp: new Date('2024-09-28T10:30:00')
      },
      {
        id: 2,
        type: 'download',
        description: 'Pitch deck downloaded by Andreessen Horowitz',
        timestamp: new Date('2024-09-28T09:15:00')
      },
      {
        id: 3,
        type: 'message',
        description: 'New message from John Smith at Accel Partners',
        timestamp: new Date('2024-09-27T16:45:00')
      },
      {
        id: 4,
        type: 'view',
        description: 'Profile viewed by investor from Kleiner Perkins',
        timestamp: new Date('2024-09-27T14:20:00')
      }
    ]
  });

  const [timeRange, setTimeRange] = useState('7d');

  // Event Handlers
  const handleUpdateProfile = (type) => {
    if (type === 'preview') {
      navigate('/startup-profile');
    } else {
      setActiveTab(type === 'financial' ? 'documents' : 'team');
    }
  };

  const handleUploadDocument = (document) => {
    setDocuments(prev => [...prev, document]);
  };

  const handleDeleteDocument = (documentId) => {
    setDocuments(prev => prev?.filter(doc => doc?.id !== documentId));
  };

  const handleAddTeamMember = (member) => {
    setTeamMembers(prev => [...prev, member]);
  };

  const handleEditTeamMember = (memberId, updatedMember) => {
    setTeamMembers(prev => prev?.map(member => 
      member?.id === memberId ? { ...member, ...updatedMember } : member
    ));
  };

  const handleRemoveTeamMember = (memberId) => {
    setTeamMembers(prev => prev?.filter(member => member?.id !== memberId));
  };

  const handleAddKPI = (kpi) => {
    setKpiData(prev => [...prev, kpi]);
  };

  const handleUpdateKPI = (kpiId, updatedKPI) => {
    setKpiData(prev => prev?.map(kpi => 
      kpi?.id === kpiId ? { ...kpi, ...updatedKPI } : kpi
    ));
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Quick Actions
  const handleUpdatePitchDeck = () => {
    setActiveTab('documents');
  };

  const handleAddTeamMemberAction = () => {
    setActiveTab('team');
  };

  const handleInputKPI = () => {
    setActiveTab('kpis');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'team', label: 'Team', icon: 'Users' },
    { id: 'kpis', label: 'KPIs', icon: 'BarChart3' },
    { id: 'engagement', label: 'Engagement', icon: 'TrendingUp' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="startup" notifications={3} onRoleSwitch={() => {}} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Startup Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your investor profile and track engagement metrics
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">TechStart Inc.</div>
                  <div className="text-xs text-muted-foreground">Last updated: Today</div>
                </div>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">TS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map(tab => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <ProfileStatusCard 
                    profileData={profileData}
                    onUpdateProfile={handleUpdateProfile}
                  />
                </div>
                <div className="lg:col-span-2">
                  <QuickActions
                    onUpdatePitchDeck={handleUpdatePitchDeck}
                    onAddTeamMember={handleAddTeamMemberAction}
                    onInputKPI={handleInputKPI}
                  />
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <DocumentManager
                documents={documents}
                onUpload={handleUploadDocument}
                onDelete={handleDeleteDocument}
              />
            )}

            {activeTab === 'team' && (
              <TeamManagement
                teamMembers={teamMembers}
                onAddMember={handleAddTeamMember}
                onEditMember={handleEditTeamMember}
                onRemoveMember={handleRemoveTeamMember}
              />
            )}

            {activeTab === 'kpis' && (
              <KPIInputSection
                kpiData={kpiData}
                onAddKPI={handleAddKPI}
                onUpdateKPI={handleUpdateKPI}
              />
            )}

            {activeTab === 'engagement' && (
              <EngagementMetrics
                engagementData={engagementData}
                timeRange={timeRange}
                onTimeRangeChange={handleTimeRangeChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDashboard;