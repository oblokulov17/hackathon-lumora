import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import StartupProfile from './pages/startup-profile';
import StartupDashboard from './pages/startup-dashboard';
import InvestorDashboard from './pages/investor-dashboard';
import KPIAnalyticsDashboard from './pages/kpi-analytics-dashboard';
import AIDueDiligenceReport from './pages/ai-due-diligence-report';
import MessagingCenter from './pages/messaging-center';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIDueDiligenceReport />} />
        <Route path="/startup-profile" element={<StartupProfile />} />
        <Route path="/startup-dashboard" element={<StartupDashboard />} />
        <Route path="/investor-dashboard" element={<InvestorDashboard />} />
        <Route path="/kpi-analytics-dashboard" element={<KPIAnalyticsDashboard />} />
        <Route path="/ai-due-diligence-report" element={<AIDueDiligenceReport />} />
        <Route path="/messaging-center" element={<MessagingCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
