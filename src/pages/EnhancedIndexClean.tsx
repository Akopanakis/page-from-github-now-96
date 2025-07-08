import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  ChevronUp,
  PlayCircle,
  X,
  Menu,
  LayoutGrid,
} from "lucide-react";
import { useCalculation } from "@/hooks/useCalculation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainTabs from "@/components/MainTabs";
import PremiumInfoCard from "@/components/PremiumInfoCard";
import FileUpload from "@/components/FileUpload";
import OnboardingTour from "@/components/OnboardingTour";
import CompactResultsPanel from "@/components/CompactResultsPanel";
import PDFExport from "@/components/PDFExport";
import DataExport from "@/components/DataExport";
import CompanySettings from "@/components/CompanySettings";
import ExampleData from "@/components/ExampleData";
import UserGuide from "@/components/UserGuide";
import FloatingHelpButton from "@/components/FloatingHelpButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import QuickActions from "@/components/QuickActions";
import QuickAccessCard from "@/components/QuickAccessCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import ResponsiveNavigation from "@/components/layout/ResponsiveNavigation";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CommandPalette from "@/components/layout/CommandPalette";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { CompanyInfo } from "@/types/company";
import { libraryLoader } from "@/utils/libraryLoader";
import {
  safeGetJSON,
  safeSetJSON,
  safeGetItem,
  safeSetItem,
} from "@/utils/safeStorage";

// Lazy load heavy components
const MarketIntelligenceSystemEnhanced = React.lazy(
  () => import("@/components/MarketIntelligenceSystemEnhanced"),
);
const ScenarioAnalysisEnhanced = React.lazy(
  () => import("@/components/ScenarioAnalysisEnhanced"),
);
const RevenueForecastingEnhanced = React.lazy(
  () => import("@/components/RevenueForecastingEnhanced"),
);
const EnhancedNavigationSystem = React.lazy(
  () => import("@/components/EnhancedNavigationSystem"),
);
const TestEnhancedComponents = React.lazy(
  () => import("@/pages/TestEnhancedComponents"),
);

interface CostItem {
  id: string;
  name: string;
  value: number;
  category: "direct" | "indirect";
}

interface TransportLeg {
  id: string;
  from: string;
  to: string;
  distance: number;
  cost: number;
  type: string;
}

const EnhancedIndexClean = () => {
  const {
    formData,
    updateFormData,
    calculate,
    resetForm,
    results,
    isCalculating,
  } = useCalculation();

  // Core state
  const [activeTab, setActiveTab] = useState("comprehensive-dashboard");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showExampleData, setShowExampleData] = useState(false);
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    return safeGetJSON("companyInfo", { logoUrl: "", name: "", address: "" });
  });

  const [directCosts, setDirectCosts] = useState<CostItem[]>([
    { id: "1", name: "Πρώτες Ύλες", value: 0, category: "direct" },
    { id: "2", name: "Εργατικά", value: 0, category: "direct" },
    { id: "3", name: "Ενέργεια", value: 0, category: "direct" },
  ]);

  const [indirectCosts, setIndirectCosts] = useState<CostItem[]>([
    { id: "1", name: "Γενικά Έξοδα", value: 0, category: "indirect" },
    { id: "2", name: "Διοικητικά", value: 0, category: "indirect" },
  ]);

  const [transportLegs, setTransportLegs] = useState<TransportLeg[]>([]);

  const backToTopRef = useRef<HTMLButtonElement>(null);

  // Load saved premium status
  useEffect(() => {
    const savedPremium = safeGetItem("isPremium");
    if (savedPremium === "true") {
      setIsPremium(true);
    }
  }, []);

  // Back to top functionality
  useEffect(() => {
    const handleScroll = () => {
      if (backToTopRef.current) {
        const scrolled = window.scrollY > 300;
        if (scrolled) {
          backToTopRef.current.classList.add(
            "opacity-100",
            "translate-y-0",
            "pointer-events-auto",
          );
          backToTopRef.current.classList.remove(
            "opacity-0",
            "translate-y-4",
            "pointer-events-none",
          );
        } else {
          backToTopRef.current.classList.remove(
            "opacity-100",
            "translate-y-0",
            "pointer-events-auto",
          );
          backToTopRef.current.classList.add(
            "opacity-0",
            "translate-y-4",
            "pointer-events-none",
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCompanyChange = (info: CompanyInfo) => {
    setCompanyInfo(info);
    safeSetJSON("companyInfo", info);
  };

  const loadExampleData = () => {
    // Example data loading logic
    setShowExampleData(false);
  };

  const handleFileUpload = (data: any) => {
    // File upload logic
    setShowFileUpload(false);
  };

  // Render main content based on active tab
  const renderMainContent = () => {
    switch (activeTab) {
      case "market-intelligence":
        return (
          <React.Suspense
            fallback={<div className="p-8 text-center">Loading...</div>}
          >
            <MarketIntelligenceSystemEnhanced />
          </React.Suspense>
        );
      case "scenario-analysis":
        return (
          <React.Suspense
            fallback={<div className="p-8 text-center">Loading...</div>}
          >
            <ScenarioAnalysisEnhanced />
          </React.Suspense>
        );
      case "forecast-revenue":
        return (
          <React.Suspense
            fallback={<div className="p-8 text-center">Loading...</div>}
          >
            <RevenueForecastingEnhanced formData={formData} results={results} />
          </React.Suspense>
        );
      case "enhanced-navigation":
        return (
          <React.Suspense
            fallback={<div className="p-8 text-center">Loading...</div>}
          >
            <EnhancedNavigationSystem
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isPremium={isPremium}
            />
          </React.Suspense>
        );
      case "test":
        return (
          <React.Suspense
            fallback={<div className="p-8 text-center">Loading...</div>}
          >
            <TestEnhancedComponents />
          </React.Suspense>
        );
      default:
        return (
          <MainTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isPremium={isPremium}
            setIsPremium={setIsPremium}
            formData={formData}
            updateFormData={updateFormData}
            results={results}
            directCosts={directCosts}
            indirectCosts={indirectCosts}
            transportLegs={transportLegs}
            onUpdateCost={() => {}}
            onAddCost={() => {}}
            onRemoveCost={() => {}}
            onUpdateTransport={() => {}}
            onAddTransport={() => {}}
            onRemoveTransport={() => {}}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Responsive Navigation */}
        <ResponsiveNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isPremium={isPremium}
        />

        {/* Main Content Container - Properly Centered */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumbs */}
            <div className="mb-6">
              <Breadcrumbs
                items={[{ id: activeTab, label: "", isActive: true }]}
                onNavigate={(path) => setActiveTab(path.replace("/", ""))}
              />
            </div>

            {/* Quick Actions */}
            <QuickActions
              onCalculate={calculate}
              onReset={resetForm}
              onLoadExample={loadExampleData}
              isCalculating={isCalculating}
              hasResults={!!results}
              isPremium={isPremium}
              className="mb-6"
            />

            {/* File Upload Section */}
            {showFileUpload && (
              <div className="mb-8">
                <FileUpload onFileUpload={handleFileUpload} />
              </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="xl:col-span-2">
                <Card className="shadow-lg border-0 overflow-hidden bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <CardTitle className="flex items-center">
                      <div className="p-2 bg-white/20 rounded-lg mr-3">
                        <LayoutGrid className="w-6 h-6" />
                      </div>
                      <span>KostoPro - Ολοκληρωμένο Σύστημα Κοστολόγησης</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {renderMainContent()}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Results & Tools */}
              <div className="space-y-6">
                {/* Results Panel */}
                <CompactResultsPanel
                  results={results}
                  formData={formData}
                  isCalculating={isCalculating}
                  onCalculate={calculate}
                  onReset={resetForm}
                />

                {/* Export Tools */}
                {results && (
                  <div className="space-y-4">
                    <CompanySettings onChange={handleCompanyChange} />
                    <PDFExport
                      formData={formData}
                      results={results}
                      companyInfo={companyInfo}
                    />
                    <DataExport formData={formData} results={results} />
                  </div>
                )}

                {/* Premium Info */}
                {!isPremium && (
                  <PremiumInfoCard onUpgrade={() => setIsPremium(true)} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Modals and Overlays */}
        <ExampleData
          isVisible={showExampleData}
          onLoadExample={loadExampleData}
          onClose={() => setShowExampleData(false)}
        />

        <UserGuide
          isOpen={showUserGuide}
          onClose={() => setShowUserGuide(false)}
        />

        <CommandPalette
          isOpen={showCommandPalette}
          onClose={() => setShowCommandPalette(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isPremium={isPremium}
        />

        {/* Fixed Elements */}
        <FloatingHelpButton onShowGuide={() => setShowUserGuide(true)} />

        <FloatingActionButton
          onCalculate={() => {
            setActiveTab("costs");
            calculate();
          }}
          onOpenHACCP={() => setActiveTab("haccp-module")}
          onOpenCommandPalette={() => setShowCommandPalette(true)}
          setActiveTab={setActiveTab}
        />

        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isPremium={isPremium}
        />

        {/* Back to Top */}
        <button
          ref={backToTopRef}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center opacity-0 translate-y-4 pointer-events-none"
          aria-label="Επιστροφή στην κορυφή"
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        {/* Onboarding Tour */}
        <OnboardingTour />
      </div>
    </ErrorBoundary>
  );
};

export default EnhancedIndexClean;
