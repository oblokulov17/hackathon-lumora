import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CompanyHeader from './components/CompanyHeader';
import TeamSection from './components/TeamSection';
import PitchSection from './components/PitchSection';
import DocumentsSection from './components/DocumentsSection';
import KPIDashboard from './components/KPIDashboard';
import ActionButtons from './components/ActionButtons';
import Icon from '../../components/AppIcon';

const StartupProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('team');
  const [userRole] = useState('investor');

  // Mock company data
  const companyData = {
    id: id || 'techflow-ai',
    name: "TechFlow AI",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=400&fit=crop",
    industry: "Artificial Intelligence",
    location: "San Francisco, CA",
    foundedYear: 2022,
    description: "TechFlow AI is revolutionizing business process automation through advanced machine learning algorithms and natural language processing. Our platform helps enterprises streamline their workflows and make data-driven decisions.",
    fundingStage: "Series A",
    fundingAmount: "5M",
    riskScore: 35,
    employees: 24,
    mrr: 180,
    users: 2.4,
    growthRate: 45
  };

  // Mock team data
  const teamData = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      bio: "Former VP of Engineering at Google with 12+ years of experience in AI/ML. Led teams of 50+ engineers and launched products used by millions.",
      experience: [
        { company: "Google", role: "VP of Engineering", duration: "2018-2022" },
        { company: "Facebook", role: "Senior Engineering Manager", duration: "2015-2018" },
        { company: "Microsoft", role: "Principal Engineer", duration: "2012-2015" }
      ],
      skills: ["Machine Learning", "Team Leadership", "Product Strategy", "Python", "TensorFlow"],
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
      email: "sarah@techflow.ai"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "PhD in Computer Science from Stanford. Previously led AI research at OpenAI and published 20+ papers in top-tier conferences.",
      experience: [
        { company: "OpenAI", role: "Senior Research Scientist", duration: "2019-2022" },
        { company: "DeepMind", role: "Research Scientist", duration: "2017-2019" },
        { company: "Stanford AI Lab", role: "PhD Researcher", duration: "2013-2017" }
      ],
      skills: ["Deep Learning", "NLP", "Research", "PyTorch", "Distributed Systems"],
      linkedin: "https://linkedin.com/in/michaelrodriguez",
      twitter: "https://twitter.com/mrodriguez",
      email: "michael@techflow.ai"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "VP of Sales",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "15+ years of enterprise sales experience with a track record of building sales teams from 0 to $50M+ ARR at multiple startups.",
      experience: [
        { company: "Salesforce", role: "Enterprise Sales Director", duration: "2020-2022" },
        { company: "HubSpot", role: "Senior Sales Manager", duration: "2017-2020" },
        { company: "Zendesk", role: "Account Executive", duration: "2014-2017" }
      ],
      skills: ["Enterprise Sales", "Team Building", "Customer Success", "SaaS", "CRM"],
      linkedin: "https://linkedin.com/in/emilywatson",
      email: "emily@techflow.ai"
    }
  ];

  // Mock pitch data
  const pitchData = {
    title: "TechFlow AI - Series A Pitch Deck",
    lastUpdated: "2 days ago",
    slides: [
      {
        title: "Problem",
        content: "Businesses waste 40% of their time on repetitive manual processes that could be automated with AI."
      },
      {
        title: "Solution",
        content: "TechFlow AI provides an intelligent automation platform that learns from user behavior and automates complex workflows."
      },
      {
        title: "Market Size",
        content: "The global business process automation market is expected to reach $19.6B by 2026, growing at 12.2% CAGR."
      },
      {
        title: "Business Model",
        content: "SaaS subscription model with tiered pricing: Starter ($99/mo), Professional ($299/mo), Enterprise (custom)."
      },
      {
        title: "Traction",
        content: "180k MRR, 2.4k active users, 45% month-over-month growth, 24 enterprise customers including Fortune 500 companies."
      },
      {
        title: "Funding",
        content: "Raising $5M Series A to scale sales team, expand product features, and accelerate market penetration."
      }
    ],
    analysis: {
      score: 78,
      strengths: [
        "Strong technical team with proven track record",
        "Clear market opportunity with validated demand",
        "Impressive early traction and growth metrics",
        "Well-defined go-to-market strategy"
      ],
      improvements: [
        "Competitive landscape analysis could be more detailed",
        "Financial projections need more conservative scenarios",
        "Customer acquisition cost trends should be addressed",
        "Risk mitigation strategies need elaboration"
      ]
    }
  };

  // Mock documents data
  const documentsData = [
    {
      id: 1,
      name: "Financial Statements Q3 2024",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "3 days ago",
      category: "financial",
      riskLevel: "Low",
      description: "Quarterly financial statements including P&L, balance sheet, and cash flow statements.",
      aiSummary: "Strong revenue growth of 45% QoQ with improving unit economics. Burn rate is sustainable with current runway extending to 18 months. Gross margins improved to 78%.",
      keyFindings: [
        { type: "positive", text: "Revenue growth accelerating quarter over quarter" },
        { type: "positive", text: "Improving gross margins indicate strong unit economics" },
        { type: "neutral", text: "Operating expenses scaling appropriately with revenue" }
      ]
    },
    {
      id: 2,
      name: "Cap Table & Equity Structure",
      type: "excel",
      size: "1.8 MB",
      uploadDate: "1 week ago",
      category: "legal",
      riskLevel: "Low",
      description: "Current capitalization table showing all equity holders and option pool allocation.",
      aiSummary: "Clean cap table with appropriate founder equity retention. Employee option pool is competitive at 15%. No concerning liquidation preferences or anti-dilution provisions.",
      keyFindings: [
        { type: "positive", text: "Founders retain significant equity ownership" },
        { type: "positive", text: "Clean cap table structure with standard terms" },
        { type: "positive", text: "Adequate employee option pool for growth" }
      ]
    },
    {
      id: 3,
      name: "Market Research & Analysis",
      type: "word",
      size: "3.2 MB",
      uploadDate: "2 weeks ago",
      category: "business",
      riskLevel: "Medium",
      description: "Comprehensive market analysis including TAM/SAM/SOM calculations and competitive landscape.",
      aiSummary: "Market size estimates appear reasonable but may be optimistic. Competitive analysis is thorough but underestimates potential threats from larger incumbents.",
      keyFindings: [
        { type: "positive", text: "Large addressable market with clear growth trajectory" },
        { type: "negative", text: "Market size projections may be overly optimistic" },
        { type: "neutral", text: "Competitive positioning is well-articulated" }
      ]
    },
    {
      id: 4,
      name: "Product Roadmap 2024-2025",
      type: "powerpoint",
      size: "4.1 MB",
      uploadDate: "1 month ago",
      category: "business",
      riskLevel: "Low",
      description: "Detailed product development roadmap with feature priorities and timeline.",
      aiSummary: "Well-structured roadmap with clear priorities. Timeline appears realistic based on team size and complexity. Strong focus on customer-requested features.",
      keyFindings: [
        { type: "positive", text: "Customer-driven feature prioritization" },
        { type: "positive", text: "Realistic development timeline" },
        { type: "positive", text: "Clear technical architecture vision" }
      ]
    }
  ];

  // Mock KPI data
  const kpiData = {
    metrics: {
      mrr: 180000,
      mrrGrowth: 45,
      activeUsers: 2400,
      userGrowth: 32,
      churnRate: 3.2,
      churnImprovement: 15,
      conversionRate: 12.5,
      conversionImprovement: 8
    },
    revenueData: [
      { month: 'Jan', revenue: 85000 },
      { month: 'Feb', revenue: 92000 },
      { month: 'Mar', revenue: 108000 },
      { month: 'Apr', revenue: 125000 },
      { month: 'May', revenue: 142000 },
      { month: 'Jun', revenue: 158000 },
      { month: 'Jul', revenue: 165000 },
      { month: 'Aug', revenue: 172000 },
      { month: 'Sep', revenue: 180000 },
      { month: 'Oct', revenue: 195000 },
      { month: 'Nov', revenue: 210000 },
      { month: 'Dec', revenue: 225000 }
    ],
    userGrowthData: [
      { month: 'Jul', newUsers: 180 },
      { month: 'Aug', newUsers: 220 },
      { month: 'Sep', newUsers: 280 },
      { month: 'Oct', newUsers: 320 },
      { month: 'Nov', newUsers: 380 },
      { month: 'Dec', newUsers: 420 }
    ],
    churnData: [
      { month: 'Jul', churnRate: 4.8 },
      { month: 'Aug', churnRate: 4.2 },
      { month: 'Sep', churnRate: 3.9 },
      { month: 'Oct', churnRate: 3.5 },
      { month: 'Nov', churnRate: 3.2 },
      { month: 'Dec', churnRate: 3.0 }
    ],
    customerSegments: [
      { name: 'Enterprise', value: 45 },
      { name: 'Mid-Market', value: 35 },
      { name: 'SMB', value: 15 },
      { name: 'Startup', value: 5 }
    ],
    aiInsights: {
      opportunities: [
        "Strong product-market fit indicated by low churn and high NPS scores",
        "Enterprise segment showing highest growth potential with 60% larger deal sizes",
        "International expansion opportunity with 40% of inbound leads from Europe",
        "Upselling potential with current customers using only 30% of available features"
      ],
      risks: [
        "Customer concentration risk with top 5 customers representing 40% of revenue",
        "Increasing customer acquisition costs in competitive market",
        "Technical debt accumulating as team scales rapidly",
        "Dependency on third-party AI APIs for core functionality"
      ]
    }
  };

  const tabs = [
    { id: 'team', label: 'Team Information', icon: 'Users' },
    { id: 'pitch', label: 'Pitch Presentation', icon: 'Presentation' },
    { id: 'documents', label: 'Financial Documents', icon: 'FileText' },
    { id: 'kpi', label: 'KPI Dashboard', icon: 'BarChart3' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'team':
        return <TeamSection team={teamData} />;
      case 'pitch':
        return <PitchSection pitchData={pitchData} />;
      case 'documents':
        return <DocumentsSection documents={documentsData} />;
      case 'kpi':
        return <KPIDashboard kpiData={kpiData} />;
      default:
        return <TeamSection team={teamData} />;
    }
  };

  useEffect(() => {
    document.title = `${companyData?.name} - Startup Profile | InvestorOS`;
  }, [companyData?.name]);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} onRoleSwitch={() => {}} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Company Header */}
          <CompanyHeader company={companyData} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg mb-6">
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab?.id
                            ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ActionButtons companyId={companyData?.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartupProfile;