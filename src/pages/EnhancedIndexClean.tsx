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
import { FormData, CalculationResults } from "@/utils/calc";
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

// Create complete default form data with all required properties
const createDefaultFormData = (): FormData => ({
  // Basic Product Info
  productName: "",
  productType: "fish",
  weight: 0,
  quantity: 1,
  origin: "",
  quality: "A",
  notes: "",
  certifications: [],

  // Pricing
  purchasePrice: 0,
  targetSellingPrice: 0,
  profitMargin: 20,
  vatRate: 0,

  // Processing
  processingPhases: [],
  totalLossPercentage: 5,
  glazingPercentage: 0,
  glazingType: "none",

  // Costs
  directCosts: [
    { id: "1", name: "Πρώτες Ύλες", value: 0, category: "direct" },
    { id: "2", name: "Εργατικά", value: 0, category: "direct" },
    { id: "3", name: "Ενέργεια", value: 0, category: "direct" },
  ],
  indirectCosts: [
    { id: "4", name: "Γενικά Έξοδα", value: 0, category: "indirect" },
    { id: "5", name: "Αποσβέσεις", value: 0, category: "indirect" },
    { id: "6", name: "Ασφάλιστρα", value: 0, category: "indirect" },
  ],
  transportLegs: [
    {
      id: "1",
      from: "Αθήνα",
      to: "Θεσσαλονίκη",
      distance: 500,
      cost: 150,
      type: "Οδικό",
    },
  ],

  // Legacy compatibility fields
  waste: 0,
  glazingPercent: 0,
  vatPercent: 0,
  workers: [{ id: "1", hourlyRate: 4.5, hours: 1 }],
  boxCost: 0,
  bagCost: 0,
  distance: 0,
  fuelCost: 0,
  tolls: 0,
  parkingCost: 0,
  driverSalary: 0,
  profitTarget: 0,
  competitor1: 0,
  competitor2: 0,
  electricityCost: 0,
  equipmentCost: 0,
  insuranceCost: 0,
  rentCost: 0,
  communicationCost: 0,
  otherCosts: 0,
  originAddress: "",
  destinationAddress: "",
  routeCalculated: false,
  estimatedDuration: "",
  batchNumber: "",
  supplierName: "",
  minimumMargin: 15,
  storageTemperature: -18,
  shelfLife: 365,
  customerPrice: 0,
  seasonalMultiplier: 1
});

// Create complete default results with all required properties
const createDefaultResults = (): CalculationResults => ({
  // Raw calculations
  rawWeight: 0,
  netWeight: 0,
  totalDirectCosts: 0,
  totalIndirectCosts: 0,
  totalTransportCosts: 0,
  totalProcessingCosts: 0,
  finalProcessedWeight: 0,
  totalWastePercentage: 0,

  // Price calculations
  totalCost: 0,
  totalCostWithVat: 0,
  costPerKg: 0,
  costPerUnit: 0,

  // VAT calculations
  netPrice: 0,
  vatAmount: 0,
  finalPrice: 0,

  // Profit calculations
  grossProfit: 0,
  netProfit: 0,
  profitMargin: 0,
  profitPerKg: 0,
  sellingPrice: 0,

  // Analysis
  breakEvenPrice: 0,
  recommendedSellingPrice: 0,
  competitivePosition: "Average",

  // Efficiency metrics
  efficiencyScore: 0,

  // Detailed breakdown
  breakdown: {
    materials: 0,
    labor: 0,
    processing: 0,
    transport: 0,
    overhead: 0,
    packaging: 0,
  },

  costBreakdown: [],

  competitorAnalysis: {
    ourPrice: 0,
    competitor1Diff: 0,
    competitor2Diff: 0,
    marketPosition: 'competitive'
  },

  profitAnalysis: {
    breakEvenPrice: 0,
    marginAtCurrentPrice: 0,
    recommendedMargin: 0
  },

  // Legacy fields for compatibility
  purchaseCost: 0,
  laborCost: 0,
  packagingCost: 0,
  transportCost: 0,
  additionalCosts: 0,
});

const EnhancedIndexClean = () => {
  const {
    formData: rawFormData,
    updateFormData,
    calculate,
    resetForm,
    results: rawResults,
    isCalculating,
  } = useCalculation();

  // Ensure we have complete data types
  const formData = { ...createDefaultFormData(), ...rawFormData };
  const results = rawResults || createDefaultResults();

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
    setShowExampleData(false);
  };

  const handleFileUpload = (data: any) => {
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
            <ScenarioAnalysisEnhanced 
              formData={formData}
              results={results}
            />
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
              hasResults={!!rawResults}
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
                  results={rawResults}
                  formData={formData}
                  isCalculating={isCalculating}
                  onCalculate={calculate}
                  onReset={resetForm}
                />

                {/* Export Tools */}
                {rawResults && (
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
