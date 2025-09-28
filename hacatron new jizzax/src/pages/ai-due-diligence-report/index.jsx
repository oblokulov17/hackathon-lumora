import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ReportHeader from './components/ReportHeader';
import AnalysisSection from './components/AnalysisSection';
import FinancialAnalysis from './components/FinancialAnalysis';
import ScoringMethodology from './components/ScoringMethodology';

import Button from '../../components/ui/Button';

// Add mock financial data for FinancialAnalysis component
const financialData = {
  revenue: [
    { period: 'Q1 2023', value: 150000 },
    { period: 'Q2 2023', value: 220000 },
    { period: 'Q3 2023', value: 310000 },
    { period: 'Q4 2023', value: 420000 },
    { period: 'Q1 2024', value: 580000 }
  ],
  expenses: [
    { period: 'Q1 2023', value: 180000 },
    { period: 'Q2 2023', value: 250000 },
    { period: 'Q3 2023', value: 320000 },
    { period: 'Q4 2023', value: 380000 },
    { period: 'Q1 2024', value: 450000 }
  ],
  cashflow: [
    { period: 'Q1 2023', value: -30000 },
    { period: 'Q2 2023', value: -30000 },
    { period: 'Q3 2023', value: -10000 },
    { period: 'Q4 2023', value: 40000 },
    { period: 'Q1 2024', value: 130000 }
  ]
};

const ratios = {
  burnRate: 75000,
  runway: 18,
  grossMargin: 68,
  ltv: 125000,
  cac: 8500,
  ltvCacRatio: 14.7
};

const trends = {
  revenueGrowth: 23.5,
  expenseGrowth: 15.2,
  customerAcquisition: 35,
  churnRate: 3.2
};

const AIDueDiligenceReport = () => {
  const navigate = useNavigate();
  const [userRole] = useState('investor');
  const [isLoading, setIsLoading] = useState(true);

  // Mock startup data
  const startupData = {
    name: "TechFlow Solutions",
    analysisDate: "September 28, 2024",
    overallRiskScore: 42,
    executiveSummary: `TechFlow Solutions demonstrates strong technical capabilities and market positioning in the B2B SaaS automation space. The founding team brings relevant experience from previous successful exits, and the product shows promising early traction with enterprise clients. However, concerns exist around increasing burn rate and competitive market dynamics that require careful monitoring.`
  };

  // Mock analysis sections data
  const analysisData = [
    {
      title: "Team Assessment",
      icon: "Users",
      insights: [
        {
          text: "The founding team consists of experienced professionals with complementary skills. CEO Sarah Chen has 8+ years in enterprise software, while CTO Michael Rodriguez brings deep technical expertise from Google and Microsoft.",
          confidence: 85
        },
        {
          text: "Advisory board includes notable industry veterans from Salesforce and HubSpot, providing valuable strategic guidance and network access.",
          confidence: 78
        },
        {
          text: "Team composition shows good balance between technical and business expertise, though sales leadership could be strengthened.",
          confidence: 72
        }
      ],
      strengths: [
        "Strong technical leadership with proven track record",
        "Complementary skill sets across founding team",
        "High-quality advisory board with industry connections",
        "Previous startup experience and successful exit"
      ],
      weaknesses: [
        "Limited sales and marketing leadership experience",
        "Small team size may limit execution speed",
        "Lack of domain expertise in target verticals"
      ],
      sourceDocuments: [
        { name: "Team_Bios.pdf", page: 2 },
        { name: "Advisory_Board.pdf", page: 1 },
        { name: "Org_Chart.pdf", page: 1 }
      ]
    },
    {
      title: "Market Analysis",
      icon: "TrendingUp",
      insights: [
        {
          text: "The B2B workflow automation market is experiencing rapid growth, with a projected CAGR of 23% through 2028. Total addressable market estimated at $12.8B.",
          confidence: 91
        },
        {
          text: "Competitive landscape is fragmented with no clear dominant player, presenting opportunity for differentiated solutions.",
          confidence: 76
        },
        {
          text: "Go-to-market strategy focuses on mid-market enterprises, a segment showing strong demand for automation solutions.",
          confidence: 82
        }
      ],
      strengths: [
        "Large and growing total addressable market",
        "Fragmented competitive landscape with opportunity",
        "Strong product-market fit indicators",
        "Clear differentiation from existing solutions"
      ],
      weaknesses: [
        "Intense competition from well-funded incumbents",
        "Long enterprise sales cycles",
        "Market education required for new category"
      ],
      sourceDocuments: [
        { name: "Market_Research.pdf", page: 5 },
        { name: "Competitive_Analysis.pdf", page: 3 },
        { name: "TAM_Analysis.xlsx", page: 1 }
      ]
    },
    {
      title: "Product & Technology",
      icon: "Code",
      insights: [
        {
          text: "The platform demonstrates strong technical architecture with modern cloud-native design and robust API infrastructure.",
          confidence: 88
        },
        {
          text: "Product roadmap shows clear vision for expanding automation capabilities and enterprise features.",
          confidence: 79
        },
        {
          text: "Early customer feedback indicates high satisfaction scores and strong retention rates.",
          confidence: 84
        }
      ],
      strengths: [
        "Modern, scalable technical architecture",
        "Strong API-first design enabling integrations",
        "High customer satisfaction and retention",
        "Clear product differentiation and vision"
      ],
      weaknesses: [
        "Limited intellectual property protection",
        "Dependency on third-party integrations",
        "Resource constraints limiting development speed"
      ],
      sourceDocuments: [
        { name: "Technical_Architecture.pdf", page: 8 },
        { name: "Product_Roadmap.pdf", page: 2 },
        { name: "Customer_Feedback.pdf", page: 4 }
      ]
    },
    {
      title: "Risk Assessment",
      icon: "Shield",
      insights: [
        {
          text: "Primary risks include market competition, execution challenges, and funding requirements for scaling operations.",
          confidence: 86
        },
        {
          text: "Regulatory compliance appears well-managed with SOC2 certification and GDPR compliance measures in place.",
          confidence: 92
        },
        {
          text: "Key person risk exists with heavy dependency on founding team, though retention packages are in place.",
          confidence: 74
        }
      ],
      strengths: [
        "Strong compliance and security posture",
        "Diversified customer base reducing concentration risk",
        "Experienced team with startup expertise",
        "Clear risk mitigation strategies identified"
      ],
      weaknesses: [
        "High dependency on key personnel",
        "Competitive market with well-funded rivals",
        "Execution risk in scaling operations",
        "Funding requirements for growth plans"
      ],
      sourceDocuments: [
        { name: "Risk_Assessment.pdf", page: 6 },
        { name: "Compliance_Report.pdf", page: 2 },
        { name: "Insurance_Coverage.pdf", page: 1 }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleExportPDF = () => {
    console.log('Exporting PDF report...');
    // Mock PDF export functionality
    alert('PDF report exported successfully!');
  };

  const handleShareAnalysis = () => {
    console.log('Sharing analysis...');
    // Mock share functionality
    alert('Analysis shared with team members!');
  };

  const handleScheduleFollowup = () => {
    console.log('Scheduling follow-up...');
    // Mock scheduling functionality
    alert('Follow-up meeting scheduled!');
  };

  const handleRoleSwitch = () => {
    navigate('/startup-dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} onRoleSwitch={handleRoleSwitch} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Generating AI Analysis</h2>
            <p className="text-muted-foreground">Processing startup documentation and generating insights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} onRoleSwitch={handleRoleSwitch} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Report Header */}
          <ReportHeader
            startupName={startupData?.name}
            analysisDate={startupData?.analysisDate}
            overallRiskScore={startupData?.overallRiskScore}
            executiveSummary={startupData?.executiveSummary}
            onExportPDF={handleExportPDF}
            onShareAnalysis={handleShareAnalysis}
            onScheduleFollowup={handleScheduleFollowup}
          />

          {/* Analysis Sections */}
          <div className="space-y-6">
            {analysisData?.map((section, index) => (
              <AnalysisSection
                key={index}
                title={section?.title}
                icon={section?.icon}
                insights={section?.insights}
                strengths={section?.strengths}
                weaknesses={section?.weaknesses}
                sourceDocuments={section?.sourceDocuments}
                isExpanded={index === 0} // First section expanded by default
              />
            ))}

            {/* Financial Analysis */}
            <FinancialAnalysis 
              financialData={financialData}
              ratios={ratios}
              trends={trends}
            />

            {/* Scoring Methodology */}
            <ScoringMethodology />
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="Download"
              iconPosition="left"
              onClick={handleExportPDF}
            >
              Export Complete Report
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => navigate('/investor-dashboard')}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="ghost"
              size="lg"
              iconName="MessageSquare"
              iconPosition="left"
              onClick={() => navigate('/messaging-center')}
            >
              Contact Startup
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIDueDiligenceReport;