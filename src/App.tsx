import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Landing
import Landing from "./pages/Landing";

// External Interface (Public)
import Index from "./pages/Index";
import CountryDetail from "./pages/CountryDetail";
import IPTools from "./pages/IPTools";
import IPPolicies from "./pages/IPPolicies";
import PolicyModel from "./pages/PolicyModel";
import PolicyToolkit from "./pages/PolicyToolkit";
import PoliciesDatabase from "./pages/PoliciesDatabase";
import Benchbook from "./pages/Benchbook";

// Internal Interface (WIPO Staff)
import Login from "./pages/internal/Login";
import InternalLayout from "./components/internal/InternalLayout";
import Dashboard from "./pages/internal/Dashboard";
import KnowledgeLibrary from "./pages/internal/KnowledgeLibrary";
import CountryIntelligence from "./pages/internal/CountryIntelligence";
import StakeholderIntelligence from "./pages/internal/StakeholderIntelligence";
import TrendsInsights from "./pages/internal/TrendsInsights";
import ProjectsOperations from "./pages/internal/ProjectsOperations";
import UseCases from "./pages/internal/UseCases";
import Reports from "./pages/Reports";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing - Interface Selector */}
          <Route path="/" element={<Landing />} />

          {/* External Interface (Public) */}
          <Route path="/external" element={<Index />} />
          <Route path="/external/country/:country" element={<CountryDetail />} />
          <Route path="/external/country/:country/reports" element={<Reports />} />
          <Route path="/external/country/:country/ip-tools" element={<IPTools />} />
          <Route path="/external/country/:country/ip-policies" element={<IPPolicies />} />
          <Route path="/external/country/:country/ip-policies/model" element={<PolicyModel />} />
          <Route path="/external/country/:country/ip-policies/toolkit" element={<PolicyToolkit />} />
          <Route path="/external/country/:country/ip-policies/database" element={<PoliciesDatabase />} />
          <Route path="/external/country/:country/benchbook" element={<Benchbook />} />

          {/* Legacy routes redirect to external */}
          <Route path="/country/:country" element={<Navigate to="/external/country/:country" replace />} />
          <Route path="/country/:country/*" element={<Navigate to="/external" replace />} />

          {/* Internal Interface (WIPO Staff) */}
          <Route path="/internal/login" element={<Login />} />
          <Route path="/internal" element={<InternalLayout />}>
            <Route index element={<Navigate to="/internal/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="knowledge-library" element={<KnowledgeLibrary />} />
            <Route path="country-intelligence" element={<CountryIntelligence />} />
            <Route path="stakeholder-intelligence" element={<StakeholderIntelligence />} />
            <Route path="trends-insights" element={<TrendsInsights />} />
            <Route path="projects-operations" element={<ProjectsOperations />} />
            <Route path="use-cases" element={<UseCases />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
