import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router } from "wouter";
import Index from "./pages/Index";
import EnhancedIndex from "./pages/EnhancedIndex";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Expenses from "./pages/Expenses";
import NotFound from "./pages/NotFound";
import TestEnhancedComponents from "./pages/TestEnhancedComponents";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load heavy components
const BusinessIntelligence = React.lazy(
  () => import("./pages/analytics/BusinessIntelligence"),
);
const FinancialAnalytics = React.lazy(
  () => import("./pages/analytics/FinancialAnalytics"),
);
const HACCPPage = React.lazy(() => import("./pages/compliance/HACCPPage"));
const ISOPage = React.lazy(() => import("./pages/compliance/ISOPage"));
const Tutorial = React.lazy(() => import("./pages/Tutorial"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <ErrorBoundary>
              <Toaster />
              <Sonner />
              <Router>
                <Route path="/" component={EnhancedIndex} />
                <Route path="/classic" component={Index} />
                <Route path="/test" component={TestEnhancedComponents} />
                <Route path="/expenses" component={Expenses} />
                <Route
                  path="/analytics/business-intelligence"
                  component={() => (
                    <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
                      <BusinessIntelligence />
                    </Suspense>
                  )}
                />
                <Route
                  path="/analytics/financial"
                  component={() => (
                    <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
                      <FinancialAnalytics />
                    </Suspense>
                  )}
                />
                <Route
                  path="/compliance/haccp"
                  component={() => (
                    <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
                      <HACCPPage />
                    </Suspense>
                  )}
                />
                <Route
                  path="/compliance/iso"
                  component={() => (
                    <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
                      <ISOPage />
                    </Suspense>
                  )}
                />
                <Route
                  path="/tutorial"
                  component={() => (
                    <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
                      <Tutorial />
                    </Suspense>
                  )}
                />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/profile" component={Profile} />
                <Route path="/:rest*" component={NotFound} />
              </Router>
            </ErrorBoundary>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
