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
import Breadcrumbs from "@/components/Breadcrumbs";
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
import BusinessIntelligenceDashboard from "@/components/BusinessIntelligenceDashboard";
import RealTimeOperationsCenter from "@/components/RealTimeOperationsCenter";
import AdvancedFinancialAnalytics from "@/components/AdvancedFinancialAnalytics";
import QualityComplianceCenter from "@/components/QualityComplianceCenter";
import HACCPPage from "@/pages/compliance/HACCPPage";
import ISOPage from "@/pages/compliance/ISOPage";
import FinancialAnalyticsPage from "@/pages/analytics/FinancialAnalytics";
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
    { id: "4", name: "Γενικά Έξοδα", value: 0, category: "indirect" },
    { id: "5", name: "Αποσβέσ��ις", value: 0, category: "indirect" },
    { id: "6", name: "Ασφάλιστρα", value: 0, category: "indirect" },
  ]);
  const [transportLegs, setTransportLegs] = useState<TransportLeg[]>([
    {
      id: "1",
      from: "Αθήνα",
      to: "Θεσσαλονίκη",
      distance: 500,
      cost: 150,
      type: "Οδικό",
    },
  ]);

  // UI state
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);
  const [showExampleData, setShowExampleData] = useState(false);
  const [hasLoadedExample, setHasLoadedExample] = useState(false);
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Refs
  const backToTopRef = useRef<HTMLButtonElement>(null);

  // Initialize libraries and setup
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
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  };

  const setupTooltips = () => {
    if (!showTooltips) return;

    const elements = document.querySelectorAll("[data-tooltip]");
    elements.forEach((element) => {
      const tooltip = element.getAttribute("data-tooltip");
      if (tooltip) {
        element.setAttribute("title", tooltip);
        element.classList.add("has-tooltip");
      }
    });
  };

  const setupGuidedTour = async () => {
    await libraryLoader.waitForLibrary("introjs");

    const tourShown = safeGetItem("guidedTourShown");
    if (!tourShown && window.introJs) {
      setTimeout(() => {
        startGuidedTour();
      }, 2000);
    }
  };

  const startGuidedTour = () => {
    if (window.introJs) {
      window.introJs().start();
      safeSetItem("guidedTourShown", "true");
    }
  };

  const checkPWASupport = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered:", registration);
        })
        .catch((error) => {
          console.log("SW registration failed:", error);
        });
    }
  };

  const updateCostCalculations = () => {
    const totalDirectCosts = directCosts.reduce(
      (sum, cost) => sum + cost.value,
      0,
    );
    const totalIndirectCosts = indirectCosts.reduce(
      (sum, cost) => sum + cost.value,
      0,
    );
    const totalCosts = totalDirectCosts + totalIndirectCosts;

    const totalCostElement = document.getElementById("total-cost");
    if (totalCostElement) {
      totalCostElement.textContent = `€${totalCosts.toLocaleString("el-GR")}`;
    }

    const quantity = formData.quantity || 1;
    const costPerUnit = quantity > 0 ? totalCosts / quantity : 0;

    const costPerUnitElement = document.getElementById("cost-per-unit");
    if (costPerUnitElement) {
      costPerUnitElement.textContent = `€${costPerUnit.toLocaleString("el-GR")}`;
    }

    checkCostThresholds(totalCosts);
  };

  const updateTransportCalculations = () => {
    const totalTransportCost = transportLegs.reduce(
      (sum, leg) => sum + leg.cost,
      0,
    );
    const totalDistance = transportLegs.reduce(
      (sum, leg) => sum + leg.distance,
      0,
    );

    const transportSummaryElement =
      document.getElementById("transport-summary");
    if (transportSummaryElement) {
      transportSummaryElement.innerHTML = `
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="text-sm text-gray-600">Συνολικό Κόστος:</span>
            <span class="font-bold">€${totalTransportCost.toLocaleString("el-GR")}</span>
          </div>
          <div>
            <span class="text-sm text-gray-600">Συνολική Απόσταση:</span>
            <span class="font-bold">${totalDistance.toLocaleString("el-GR")} km</span>
          </div>
        </div>
      `;
    }
  };

  const checkCostThresholds = (totalCosts: number) => {
    const alertsPanel = document.getElementById("cost-alerts");
    if (!alertsPanel) return;

    const alerts = [];

    if (totalCosts > 10000) {
      alerts.push({
        type: "warning",
        message: "Το συνολικό κόστος υπερβαίνει τα €10,000",
      });
    }

    if (totalCosts > 50000) {
      alerts.push({
        type: "error",
        message: "Πολύ υψηλό κόστος! Εξετάστε τις επιλογές βελτιστοποίησης",
      });
    }

    alertsPanel.innerHTML = alerts
      .map(
        (alert) => `
      <div class="alert-item ${alert.type}">
        ${alert.message}
      </div>
    `,
      )
      .join("");
  };

  // Event handlers
  const addCostItem = (category: "direct" | "indirect") => {
    const newItem: CostItem = {
      id: Date.now().toString(),
      name: "Νέο Κόστος",
      value: 0,
      category,
    };

    if (category === "direct") {
      setDirectCosts([...directCosts, newItem]);
    } else {
      setIndirectCosts([...indirectCosts, newItem]);
    }
  };

  const updateCostItem = (
    id: string,
    field: keyof CostItem,
    value: string | number,
  ) => {
    const updateCosts = (costs: CostItem[]) =>
      costs.map((cost) =>
        cost.id === id ? { ...cost, [field]: value } : cost,
      );

    setDirectCosts((prev) => updateCosts(prev));
    setIndirectCosts((prev) => updateCosts(prev));
  };

  const removeCostItem = (id: string) => {
    setDirectCosts((prev) => prev.filter((cost) => cost.id !== id));
    setIndirectCosts((prev) => prev.filter((cost) => cost.id !== id));
  };

  const addTransportLeg = () => {
    const newLeg: TransportLeg = {
      id: Date.now().toString(),
      from: "",
      to: "",
      distance: 0,
      cost: 0,
      type: "Οδικό",
    };
    setTransportLegs([...transportLegs, newLeg]);
  };

  const updateTransportLeg = (
    id: string,
    field: keyof TransportLeg,
    value: string | number,
  ) => {
    setTransportLegs((prev) =>
      prev.map((leg) => (leg.id === id ? { ...leg, [field]: value } : leg)),
    );
  };

  const removeTransportLeg = (id: string) => {
    if (transportLegs.length > 1) {
      setTransportLegs((prev) => prev.filter((leg) => leg.id !== id));
    }
  };

  const loadExampleData = () => {
    const exampleFormData = {
      productName: "Θράψαλο Block Αργεντίνης",
      productType: "fish",
      weight: 10,
      quantity: 200,
      purchasePrice: 4.5,
      targetSellingPrice: 12.0,
      origin: "Αργεντίνη",
      quality: "A",
      notes: "Premium θράψαλο block, κατάψυξη στη θάλασσα",
      profitMargin: 25,
      vatRate: 0,
      processingPhases: [
        {
          id: "1",
          name: "Καθάρισμα",
          lossPercentage: 20,
          costPerKg: 0.3,
          duration: 0.5,
          temperature: 4,
          description: "Αφαίρεση κεφ��λιού, εντόσθιων και πτερυγίων",
        },
      ],
      totalLossPercentage: 0,
      glazingPercentage: 15,
      glazingType: "ice",
      directCosts: [
        { id: "1", name: "Πρώτες Ύλες", value: 9000, category: "direct" },
        {
          id: "2",
          name: "Εργατικά Καθαρίσματος",
          value: 600,
          category: "direct",
        },
        { id: "3", name: "Ενέργεια Κατάψυξης", value: 200, category: "direct" },
      ],
      indirectCosts: [
        { id: "4", name: "Γε��ικά Έξοδα", value: 300, category: "indirect" },
        { id: "5", name: "Αποθήκευση", value: 150, category: "indirect" },
        { id: "6", name: "Ασφάλιστρα", value: 100, category: "indirect" },
      ],
      transportLegs: [
        {
          id: "1",
          from: "Αργεντίνη",
          to: "Πειραιάς",
          distance: 12000,
          cost: 800,
          type: "Ναυτιλιακό",
        },
        {
          id: "2",
          from: "Πειραιάς",
          to: "Κέντρο Διανομής",
          distance: 25,
          cost: 120,
          type: "Οδικό",
        },
      ],
      supplierName: "��οπανάκης",
      batchNumber: "TH-ARG-2024-001",
    };

    updateFormData(exampleFormData);
    setDirectCosts(exampleFormData.directCosts);
    setIndirectCosts(exampleFormData.indirectCosts);
    setTransportLegs(exampleFormData.transportLegs);
    setShowExampleData(false);
    setHasLoadedExample(true);

    setTimeout(() => {
      calculate();
    }, 500);
  };

  const handleCompanyChange = React.useCallback((info: CompanyInfo) => {
    setCompanyInfo(info);
    safeSetJSON("companyInfo", info);
  }, []);

  const handleFileUpload = React.useCallback(
    (data: any) => {
      updateFormData(data);
      setShowFileUpload(false);
    },
    [updateFormData],
  );

  // Global keyboard shortcuts
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
      case "business-intelligence":
        return <BusinessIntelligenceDashboard />;
      case "operations-center":
        return <RealTimeOperationsCenter />;
      case "financial-analytics":
        return <AdvancedFinancialAnalytics />;
      case "quality-compliance":
        return <QualityComplianceCenter />;
      case "haccp-module":
        return <HACCPPage />;
      case "iso-standards":
        return <ISOPage />;
      case "executive-dashboard":
        return <ExecutiveDashboard results={results} formData={formData} />;
      case "financial-ratios":
        return <FinancialRatios results={results} formData={formData} />;
      case "market-trends":
        return <EconomicTrends productType={formData.productType} />;
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Enhanced Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating particles */}
          <div
            className="absolute top-20 left-20 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-40 right-32 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce"
            style={{ animationDelay: "1.2s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-indigo-400/35 rounded-full animate-bounce"
            style={{ animationDelay: "2.1s" }}
          ></div>
        </div>

        <Header
          isPremium={isPremium}
          setIsPremium={setIsPremium}
          showFileUpload={showFileUpload}
          setShowFileUpload={setShowFileUpload}
          onShowGuide={() => setShowUserGuide(true)}
          onOpenCommandPalette={() => setShowCommandPalette(true)}
        />

        <div id="start-tour">
          <OnboardingTour />
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div
            className={`transition-all duration-300 ${isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"} ${
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
              <QuickAccessCard />

              {/* Example Data Banner */}
              {!hasLoadedExample && (
                <Card className="mb-6 lg:mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-lg">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                          <PlayCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-green-800">
                            Δοκιμάστε με Παράδειγμα
                          </h3>
                          <p className="text-green-600 text-sm">
                            Φορτώστε δεδομένα θράψαλου Αργεντίνης για να δείτε
                            πως λειτουργεί η εφαρμογή
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setShowExampleData(true)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Προβολή Παραδείγματος
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Example Loaded Banner */}
              {hasLoadedExample && (
                <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Calculator className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800">
                            Παράδειγμα Φορτωμένο
                          </h4>
                          <p className="text-blue-600 text-sm">
                            Δεδομένα θράψαλου Αργεντίνης - 2 τόνοι
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setHasLoadedExample(false);
                          resetForm();
                        }}
                        variant="outline"
                        size="sm"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Εκκαθάριση
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* File Upload Section */}
              {showFileUpload && (
                <div className="mb-8">
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
              )}

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
                          <span className="text-xl font-semibold">
                            {[
                              "executive-dashboard",
                              "financial-ratios",
                              "market-trends",
                            ].includes(activeTab)
                              ? "Προχωρημένη Ανάλυση"
                              : "Στοιχεία Κοστολόγησης"}
                          </span>
                        </div>
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
          className="fixed bottom-6 left-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center opacity-0 translate-y-4 pointer-events-none"
          aria-label="Επιστροφή στην κορυφή"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default EnhancedIndex;
