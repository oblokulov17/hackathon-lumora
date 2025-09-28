import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import ChartContainer from './components/ChartContainer';
import FilterPanel from './components/FilterPanel';
import ForecastChart from './components/ForecastChart';
import BenchmarkComparison from './components/BenchmarkComparison';
import AlertNotifications from './components/AlertNotifications';
import MetricExplanation from './components/MetricExplanation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const KPIAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('investor');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedStartup, setSelectedStartup] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState(['mrr', 'users', 'churn']);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for metrics cards
  const metricsData = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$124,500',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'success'
    },
    {
      title: 'Active Users',
      value: '8,432',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Churn Rate',
      value: '3.2%',
      change: '-0.8%',
      changeType: 'positive',
      icon: 'TrendingDown',
      color: 'warning'
    },
    {
      title: 'Customer Acquisition Cost',
      value: '$89',
      change: '+5.1%',
      changeType: 'negative',
      icon: 'Target',
      color: 'error'
    },
    {
      title: 'Lifetime Value',
      value: '$2,840',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'accent'
    },
    {
      title: 'Burn Rate',
      value: '$45,000',
      change: '-2.1%',
      changeType: 'positive',
      icon: 'Flame',
      color: 'warning'
    }
  ];

  // Mock data for MRR growth chart
  const mrrData = [
    { name: 'Jan', mrr: 85000, forecast: null, confidence: null },
    { name: 'Feb', mrr: 92000, forecast: null, confidence: null },
    { name: 'Mar', mrr: 98000, forecast: null, confidence: null },
    { name: 'Apr', mrr: 105000, forecast: null, confidence: null },
    { name: 'May', mrr: 112000, forecast: null, confidence: null },
    { name: 'Jun', mrr: 118000, forecast: null, confidence: null },
    { name: 'Jul', mrr: 124500, forecast: null, confidence: null },
    { name: 'Aug', mrr: null, forecast: 132000, confidence: 128000 },
    { name: 'Sep', mrr: null, forecast: 140000, confidence: 135000 },
    { name: 'Oct', mrr: null, forecast: 148000, confidence: 142000 },
    { name: 'Nov', mrr: null, forecast: 156000, confidence: 149000 },
    { name: 'Dec', mrr: null, forecast: 165000, confidence: 157000 }
  ];

  // Mock data for user acquisition chart
  const userAcquisitionData = [
    { name: 'Week 1', organic: 120, paid: 80, referral: 45 },
    { name: 'Week 2', organic: 135, paid: 95, referral: 52 },
    { name: 'Week 3', organic: 142, paid: 88, referral: 48 },
    { name: 'Week 4', organic: 158, paid: 102, referral: 61 }
  ];

  // Mock data for churn analysis
  const churnData = [
    { name: 'Jan', churnRate: 4.2, newSignups: 245 },
    { name: 'Feb', churnRate: 3.8, newSignups: 289 },
    { name: 'Mar', churnRate: 3.5, newSignups: 312 },
    { name: 'Apr', churnRate: 3.1, newSignups: 298 },
    { name: 'May', churnRate: 3.4, newSignups: 334 },
    { name: 'Jun', churnRate: 3.2, newSignups: 356 },
    { name: 'Jul', churnRate: 3.2, newSignups: 378 }
  ];

  // Mock data for benchmark comparison
  const benchmarkData = [
    { metric: 'MRR Growth', yourValue: 12.5, industryAverage: 8.3 },
    { metric: 'Churn Rate', yourValue: 3.2, industryAverage: 5.1 },
    { metric: 'CAC Payback', yourValue: 8.2, industryAverage: 12.4 },
    { metric: 'NPS Score', yourValue: 67, industryAverage: 52 }
  ];

  // Mock startup options for investors
  const startupOptions = userRole === 'investor' ? [
    { value: 'techflow', label: 'TechFlow Solutions' },
    { value: 'datawise', label: 'DataWise Analytics' },
    { value: 'cloudnext', label: 'CloudNext Platform' },
    { value: 'aiventure', label: 'AI Venture Labs' }
  ] : [];

  // Mock metric options
  const metricOptions = [
    { value: 'mrr', label: 'Monthly Recurring Revenue' },
    { value: 'users', label: 'Active Users' },
    { value: 'churn', label: 'Churn Rate' },
    { value: 'cac', label: 'Customer Acquisition Cost' },
    { value: 'ltv', label: 'Lifetime Value' },
    { value: 'burn', label: 'Burn Rate' },
    { value: 'runway', label: 'Runway' },
    { value: 'nps', label: 'Net Promoter Score' }
  ];

  // Mock alerts
  const alerts = [
    {
      id: 1,
      severity: 'warning',
      title: 'Churn Rate Increase',
      message: 'Customer churn has increased by 0.3% this week. Consider reviewing customer satisfaction metrics.',
      timestamp: '2 hours ago',
      category: 'retention',
      action: {
        label: 'View Details',
        icon: 'ArrowRight',
        onClick: () => console.log('View churn details')
      }
    },
    {
      id: 2,
      severity: 'info',
      title: 'MRR Milestone Achieved',
      message: 'Congratulations! You\'ve reached $125K in monthly recurring revenue.',
      timestamp: '1 day ago',
      category: 'growth'
    }
  ];

  // Mock metric explanations
  const metricExplanations = [
    {
      id: 'mrr',
      name: 'Monthly Recurring Revenue (MRR)',
      icon: 'DollarSign',
      color: 'bg-success/10 text-success',
      shortDescription: 'Predictable monthly revenue from subscriptions',
      fullDescription: 'MRR represents the predictable revenue that a company expects to receive every month from its subscription-based customers. It\'s a key metric for SaaS businesses to track growth and forecast future revenue.',
      formula: 'MRR = Number of Customers × Average Revenue Per Customer',
      importance: 'MRR provides a clear picture of business growth trajectory and helps in making informed decisions about scaling, hiring, and investment.',
      benchmarks: {
        good: '>15% growth',
        average: '5-15% growth',
        poor: '<5% growth'
      },
      tips: [
        'Focus on reducing churn to maintain steady MRR growth',
        'Implement upselling strategies to increase ARPU',
        'Track MRR cohorts to understand customer behavior patterns'
      ],
      relatedActions: [
        {
          label: 'View Revenue Report',
          icon: 'FileText',
          onClick: () => navigate('/ai-due-diligence-report')
        }
      ]
    },
    {
      id: 'churn',
      name: 'Churn Rate',
      icon: 'TrendingDown',
      color: 'bg-warning/10 text-warning',
      shortDescription: 'Percentage of customers who cancel subscriptions',
      fullDescription: 'Churn rate measures the percentage of customers who stop using your service during a given time period. It\'s crucial for understanding customer retention and predicting future revenue.',
      formula: 'Churn Rate = (Customers Lost / Total Customers at Start) × 100',
      importance: 'Lower churn rates indicate better customer satisfaction and product-market fit, leading to more predictable revenue and higher customer lifetime value.',
      benchmarks: {
        good: '<3% monthly',
        average: '3-7% monthly',
        poor: '>7% monthly'
      },
      tips: [
        'Implement proactive customer success programs',
        'Analyze churn reasons through exit interviews',
        'Improve onboarding to reduce early-stage churn'
      ]
    }
  ];

  const handleRoleSwitch = () => {
    setUserRole(userRole === 'investor' ? 'startup' : 'investor');
  };

  const handleExportPDF = () => {
    setIsLoading(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsLoading(false);
      console.log('PDF exported successfully');
    }, 2000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      console.log('Data refreshed');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole}
        onRoleSwitch={handleRoleSwitch}
        notifications={3}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">KPI Analytics Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                  {userRole === 'investor' ?'Monitor portfolio performance and growth trends across your investments' :'Track your startup\'s key metrics and performance indicators'
                  }
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/messaging-center')}
                  iconName="MessageSquare"
                >
                  Messages
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate('/ai-due-diligence-report')}
                  iconName="FileText"
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </div>

          {/* Alert Notifications */}
          <AlertNotifications alerts={alerts} />

          {/* Filter Panel */}
          <FilterPanel
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            selectedStartup={selectedStartup}
            onStartupChange={setSelectedStartup}
            selectedMetrics={selectedMetrics}
            onMetricsChange={setSelectedMetrics}
            onExportPDF={handleExportPDF}
            onRefresh={handleRefresh}
            startupOptions={startupOptions}
            metricOptions={metricOptions}
          />

          {/* Metrics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* MRR Forecast Chart */}
            <div className="lg:col-span-2">
              <ForecastChart
                title="MRR Growth & Forecast"
                data={mrrData}
                actualKey="mrr"
                forecastKey="forecast"
                confidenceKey="confidence"
                height={400}
              />
            </div>

            {/* User Acquisition Chart */}
            <ChartContainer
              title="User Acquisition Channels"
              type="bar"
              data={userAcquisitionData}
              dataKeys={['organic', 'paid', 'referral']}
              colors={['var(--color-primary)', 'var(--color-accent)', 'var(--color-success)']}
              height={300}
            />

            {/* Churn Analysis Chart */}
            <ChartContainer
              title="Churn Rate vs New Signups"
              type="line"
              data={churnData}
              dataKeys={['churnRate', 'newSignups']}
              colors={['var(--color-error)', 'var(--color-success)']}
              height={300}
            />
          </div>

          {/* Benchmark Comparison */}
          <div className="mb-8">
            <BenchmarkComparison
              title="Industry Benchmark Comparison"
              data={benchmarkData}
              height={350}
            />
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Metric Explanations */}
            <div className="lg:col-span-2">
              <MetricExplanation metrics={metricExplanations} />
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/startup-profile')}
                  iconName="User"
                >
                  {userRole === 'investor' ? 'View Company Profiles' : 'Update Profile'}
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/messaging-center')}
                  iconName="MessageSquare"
                >
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/ai-due-diligence-report')}
                  iconName="FileText"
                >
                  Generate AI Report
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate(userRole === 'investor' ? '/investor-dashboard' : '/startup-dashboard')}
                  iconName="LayoutDashboard"
                >
                  Back to Dashboard
                </Button>
              </div>

              {/* Performance Summary */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-3">Performance Summary</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Overall Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-success rounded-full" />
                      </div>
                      <span className="font-medium text-foreground">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Growth Trend</span>
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="TrendingUp" size={14} />
                      <span className="font-medium">Positive</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Risk Level</span>
                    <div className="flex items-center space-x-1 text-warning">
                      <Icon name="AlertTriangle" size={14} />
                      <span className="font-medium">Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KPIAnalyticsDashboard;