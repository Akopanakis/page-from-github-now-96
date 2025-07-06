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
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import QuickActions from "@/components/QuickActions";
import QuickAccessCard from "@/components/QuickAccessCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import ExecutiveDashboard from "@/components/ExecutiveDashboard";
import FinancialRatios from "@/components/FinancialRatios";
import EconomicTrends from "@/components/EconomicTrends";
import ComprehensiveDashboard from "@/components/ComprehensiveDashboard";
import FleetManagement from "@/components/FleetManagement";
import InventoryManagement from "@/components/InventoryManagement";
import OrderManagement from "@/components/OrderManagement";
import CustomerManagement from "@/components/CustomerManagement";
import NavigationSystem from "@/components/NavigationSystem";
import EnhancedNavigationSystem from "@/components/EnhancedNavigationSystem";
import BusinessIntelligenceDashboard from "@/components/BusinessIntelligenceDashboard";
import RealTimeOperationsCenter from "@/components/RealTimeOperationsCenter";
import AdvancedFinancialAnalytics from "@/components/AdvancedFinancialAnalytics";
import QualityComplianceCenter from "@/components/QualityComplianceCenter";
import MarketIntelligenceSystemEnhanced from "@/components/MarketIntelligenceSystemEnhanced";
import ScenarioAnalysisEnhanced from "@/components/ScenarioAnalysisEnhanced";
import RevenueForecastingEnhanced from "@/components/RevenueForecastingEnhanced";
import HACCPPage from "@/pages/compliance/HACCPPage";
import ISOPage from "@/pages/compliance/ISOPage";
import FinancialAnalyticsPage from "@/pages/analytics/FinancialAnalytics";
import CommandPalette from "@/components/layout/CommandPalette";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { CompanyInfo } from "@/types/company";
import { libraryLoader } from "@/utils/libraryLoader";
import {
  safeGetJSON,
  safeSetJSON,
  safeGetItem,
  safeSetItem,
} from "@/utils/safeStorage";
import ComprehensiveReportingSystem from "@/components/reports/ComprehensiveReportingSystem";

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

const EnhancedIndex = () => {
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
    { id: "2", name: "Διοικητικ��", value: 0, category: "indirect" },
  ]);

  const [transportLegs, setTransportLegs] = useState<TransportLeg[]>([]);

  // UI state
  const [hasScrolled, setHasScrolled] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showExampleData, setShowExampleData] = useState(false);
  const [showUserGuide, setShowUserGuide] = useState(false);

  const backToTopRef = useRef<HTMLButtonElement>(null);

  // Initialize app
  useEffect(() => {
    initializeApp();
    setupScrollHandler();
    setupResponsive();
    setTimeout(setupTooltips, 500);
    setupGuidedTour();
    checkPWASupport();
  }, []);

  // Update calculations when costs change
  useEffect(() => {
    updateCostCalculations();
  }, [directCosts, indirectCosts]);

  // Update transport calculations
  useEffect(() => {
    updateTransportCalculations();
  }, [transportLegs]);

  const initializeApp = async () => {
    await libraryLoader.loadAllLibraries();

    if (backToTopRef.current) {
      const backToTop = backToTopRef.current;
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    const savedPremium = safeGetItem("isPremium");
    if (savedPremium === "true") {
      setIsPremium(true);
    }
  };

  const setupScrollHandler = () => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setHasScrolled(scrolled);

      if (backToTopRef.current) {
        if (scrolled) {
          backToTopRef.current.classList.add("visible");
        } else {
          backToTopRef.current.classList.remove("visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  };

  const setupResponsive = () => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setSidebarCollapsed(width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  };

  const setupTooltips = () => {
    // Tooltip initialization
  };

  const setupGuidedTour = () => {
    // Tour initialization
  };

  const checkPWASupport = () => {
    // PWA support check
  };

  const updateCostCalculations = () => {
    // Cost calculation updates
  };

  const updateTransportCalculations = () => {
    // Transport calculation updates
  };

  // Cost management functions
  const updateCostItem = (id: string, updates: Partial<CostItem>) => {
    setDirectCosts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
    setIndirectCosts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const addCostItem = (category: "direct" | "indirect") => {
    const newItem: CostItem = {
      id: Date.now().toString(),
      name: "Νέο Κόστος",
      value: 0,
      category,
    };

    if (category === "direct") {
      setDirectCosts((prev) => [...prev, newItem]);
    } else {
      setIndirectCosts((prev) => [...prev, newItem]);
    }
  };

  const removeCostItem = (id: string) => {
    setDirectCosts((prev) => prev.filter((item) => item.id !== id));
    setIndirectCosts((prev) => prev.filter((item) => item.id !== id));
  };

  // Transport management functions
  const updateTransportLeg = (id: string, updates: Partial<TransportLeg>) => {
    setTransportLegs((prev) =>
      prev.map((leg) => (leg.id === id ? { ...leg, ...updates } : leg)),
    );
  };

  const addTransportLeg = () => {
    const newLeg: TransportLeg = {
      id: Date.now().toString(),
      from: "",
      to: "",
      distance: 0,
      cost: 0,
      type: "road",
    };
    setTransportLegs((prev) => [...prev, newLeg]);
  };

  const removeTransportLeg = (id: string) => {
    setTransportLegs((prev) => prev.filter((leg) => leg.id !== id));
  };

  const handleCompanyChange = (info: CompanyInfo) => {
    setCompanyInfo(info);
    safeSetJSON("companyInfo", info);
  };

  const loadExampleData = () => {
    // Load example data logic
    setShowExampleData(false);
  };

  const handleFileUpload = (data: any) => {
    // Handle file upload
    setShowFileUpload(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "k":
            e.preventDefault();
            setShowCommandPalette(true);
            break;
          case "d":
            e.preventDefault();
            setActiveTab("comprehensive-dashboard");
            break;
          case "c":
            e.preventDefault();
            setActiveTab("costs");
            break;
          case "h":
            e.preventDefault();
            setActiveTab("haccp-module");
            break;
          case "i":
            e.preventDefault();
            setActiveTab("iso-standards");
            break;
          case "b":
            e.preventDefault();
            setActiveTab("business-intelligence");
            break;
          case ",":
            e.preventDefault();
            setActiveTab("settings");
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderMainContent = () => {
    // Handle new comprehensive components
    switch (activeTab) {
      case "comprehensive-dashboard":
        return <ComprehensiveDashboard />;
      case "fleet-management":
        return <FleetManagement />;
      case "inventory-management":
        return <InventoryManagement />;
      case "order-management":
        return <OrderManagement />;
      case "customer-management":
        return <CustomerManagement />;
      case "navigation-system":
        return (
          <NavigationSystem
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isPremium={isPremium}
          />
        );
      case "enhanced-navigation":
        return (
          <EnhancedNavigationSystem
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isPremium={isPremium}
          />
        );
      case "test":
        return React.createElement(
          React.lazy(() => import("../pages/TestEnhancedComponents")),
        );
      case "business-intelligence":
        return <BusinessIntelligenceDashboard />;
      case "operations-center":
        return <RealTimeOperationsCenter />;
      case "financial-analytics":
        return <FinancialAnalyticsPage />;
      case "quality-compliance":
        return <QualityComplianceCenter />;
      case "haccp-module":
        return <HACCPPage />;
      case "iso-standards":
        return <ISOPage />;
      case "executive-dashboard":
        return <ExecutiveDashboard results={results || {}} formData={formData || {}} />;
      case "financial-ratios":
        return <FinancialRatios results={results} formData={formData} />;
      case "market-trends":
        return <EconomicTrends productType={formData.productType} />;
      case "market-intelligence":
        return <MarketIntelligenceSystemEnhanced />;
      case "scenario-analysis":
        return <ScenarioAnalysisEnhanced />;
      case "forecast-revenue":
        return (
          <RevenueForecastingEnhanced formData={formData} results={results} />
        );
      case "reports-center":
        return <ComprehensiveReportingSystem />;
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
            onUpdateCost={updateCostItem}
            onAddCost={addCostItem}
            onRemoveCost={removeCostItem}
            onUpdateTransport={updateTransportLeg}
            onAddTransport={addTransportLeg}
            onRemoveTransport={removeTransportLeg}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <Header
          isPremium={isPremium}
          setIsPremium={setIsPremium}
          onOpenFileUpload={() => setShowFileUpload(true)}
          setShowFileUpload={setShowFileUpload}
          onShowGuide={() => setShowUserGuide(true)}
          onOpenCommandPalette={() => setShowCommandPalette(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div id="start-tour">
          <OnboardingTour />
        </div>

        {/* Main Layout */}
        <div className="flex">
          {/* Sidebar */}
          <div
            className={`transition-all duration-300 ${
              isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"
            } ${
              sidebarCollapsed
                ? isMobile
                  ? "-translate-x-full"
                  : "w-16"
                : isMobile
                  ? "w-64"
                  : "w-72"
            }`}
          >
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isPremium={isPremium}
              className="h-screen"
            />
          </div>

          {/* Mobile sidebar backdrop */}
          {isMobile && !sidebarCollapsed && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarCollapsed(true)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 min-h-screen">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8">
              {/* Mobile sidebar toggle */}
              {isMobile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="mb-4 md:hidden"
                >
                  <Menu className="w-4 h-4 mr-2" />
                  Menu
                </Button>
              )}

              {/* Breadcrumbs */}
              <div className="mb-4">
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

              {/* Quick Access to Expenses */}
              <QuickAccessCard
                title="Γρήγορη Πρόσβαση"
                subtitle="Συχνά χρησιμοποιούμενες λειτουργίες"
                onNavigate={(route) => setActiveTab(route)}
                className="mb-6"
              />

              {/* File Upload Section */}
              {showFileUpload && (
                <Card className="mb-8 border-2 border-dashed border-blue-300 bg-blue-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-800 flex items-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        Μεταφόρτωση Δεδομένων
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFileUpload(false)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Εκκαθάριση
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <FileUpload onFileUpload={handleFileUpload} />
                  </CardContent>
                </Card>
              )}

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-1 gap-4 md:gap-6 lg:gap-8">
                {/* Left Column - Form */}
                <div
                  className="xl:col-span-2 animate-in slide-in-from-left duration-500"
                  data-tour="form"
                >
                  <Card className="shadow-lg md:shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90"></div>
                      <CardTitle className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white/20 rounded-lg">
                            <LayoutGrid className="w-6 h-6" />
                          </div>
                          <span className="text-lg md:text-xl">
                            KostoPro - Ολοκληρωμένο Σύστημα Κοστολόγησης
                          </span>
                        </div>
                        {isPremium && (
                          <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400">
                            Premium
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {renderMainContent()}
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Results */}
                <div
                  className="space-y-6 animate-in slide-in-from-right duration-500"
                  style={{ animationDelay: "200ms" }}
                  data-tour="results"
                >
                  <CompactResultsPanel
                    results={results}
                    formData={formData}
                    isCalculating={isCalculating}
                    onCalculate={calculate}
                    onReset={resetForm}
                  />

                  <div data-tour="export" className="space-y-4">
                    <CompanySettings onChange={handleCompanyChange} />
                    {results && (
                      <>
                        <PDFExport
                          formData={formData}
                          results={results}
                          companyInfo={companyInfo}
                        />
                        <DataExport formData={formData} results={results} />
                      </>
                    )}
                  </div>

                  {/* Premium Info Card */}
                  {!isPremium && (
                    <PremiumInfoCard onUpgrade={() => setIsPremium(true)} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />

        {/* Modals */}
        <ExampleData
          isVisible={showExampleData}
          onLoadExample={loadExampleData}
          onClose={() => setShowExampleData(false)}
        />

        <UserGuide
          isOpen={showUserGuide}
          onClose={() => setShowUserGuide(false)}
        />

        <FloatingHelpButton onShowGuide={() => setShowUserGuide(true)} />

        {/* Command Palette */}
        <CommandPalette
          isOpen={showCommandPalette}
          onClose={() => setShowCommandPalette(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isPremium={isPremium}
        />

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isPremium={isPremium}
        />

        {/* Floating Action Button */}
        <FloatingActionButton
          onCalculate={() => {
            setActiveTab("costs");
            calculate();
          }}
          onOpenHACCP={() => setActiveTab("haccp-module")}
          onOpenCommandPalette={() => setShowCommandPalette(true)}
          setActiveTab={setActiveTab}
        />

        {/* Back to Top Button */}
        <button
          ref={backToTopRef}
          id="back-to-top"
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center opacity-0 translate-y-4 pointer-events-none"
          aria-label="Επιστροφή στην κορυφή"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default EnhancedIndex;
