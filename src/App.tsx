import React from "react";
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
import BusinessIntelligence from "./pages/analytics/BusinessIntelligence";
import FinancialAnalytics from "./pages/analytics/FinancialAnalytics";
import HACCPPage from "./pages/compliance/HACCPPage";
import ISOPage from "./pages/compliance/ISOPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

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
                <Route path="/expenses" component={Expenses} />
                <Route
                  path="/analytics/business-intelligence"
                  component={BusinessIntelligence}
                />
                <Route
                  path="/analytics/financial"
                  component={FinancialAnalytics}
                />
                <Route path="/compliance/haccp" component={HACCPPage} />
                <Route path="/compliance/iso" component={ISOPage} />
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
