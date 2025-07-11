import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, ChevronUp, PlayCircle, X } from "lucide-react";
import { toast } from "sonner";
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
import { CompanyInfo } from "@/types/company";
import { FormData, CalculationResults } from "@/utils/calc";
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

const Index = () => {
  const {
    formData: rawFormData,
    updateFormData,
    calculate,
    resetForm,
    results: rawResults,
    isCalculating,
  } = useCalculation();

  // Create safe defaults
  const formData: FormData = {
    productName: rawFormData?.productName || "",
    productType: rawFormData?.productType || "fish",
    weight: rawFormData?.weight || 0,
    quantity: rawFormData?.quantity || 1,
    origin: rawFormData?.origin || "",
    quality: rawFormData?.quality || "A", 
    notes: rawFormData?.notes || "",
    certifications: rawFormData?.certifications || [],
    purchasePrice: rawFormData?.purchasePrice || 0,
    targetSellingPrice: rawFormData?.targetSellingPrice || 0,
    profitMargin: rawFormData?.profitMargin || 20,
    vatRate: rawFormData?.vatRate || 0,
    processingPhases: rawFormData?.processingPhases || [],
    totalLossPercentage: rawFormData?.totalLossPercentage || 5,
    glazingPercentage: rawFormData?.glazingPercentage || 0,
    glazingType: rawFormData?.glazingType || "none",
    directCosts: rawFormData?.directCosts || [
      { id: "1", name: "Πρώτες Ύλες", value: 0, category: "direct" },
      { id: "2", name: "Εργατικά", value: 0, category: "direct" },
      { id: "3", name: "Ενέργεια", value: 0, category: "direct" },
    ],
    indirectCosts: rawFormData?.indirectCosts || [
      { id: "4", name: "Γενικά Έξοδα", value: 0, category: "indirect" },
      { id: "5", name: "Αποσβέσεις", value: 0, category: "indirect" }, 
      { id: "6", name: "Ασφάλιστρα", value: 0, category: "indirect" },
    ],
    transportLegs: rawFormData?.transportLegs || [
      {
        id: "1",
        from: "Αθήνα",
        to: "Θεσσαλονίκη", 
        distance: 500,
        cost: 150,
        type: "Οδικό",
      },
    ],
    // Legacy fields
    waste: rawFormData?.waste || 0,
    glazingPercent: rawFormData?.glazingPercent || 0,
    vatPercent: rawFormData?.vatPercent || 0,
    workers: rawFormData?.workers || [{ id: "1", hourlyRate: 4.5, hours: 1 }],
    boxCost: rawFormData?.boxCost || 0,
    bagCost: rawFormData?.bagCost || 0,
    distance: rawFormData?.distance || 0,
    fuelCost: rawFormData?.fuelCost || 0,
    tolls: rawFormData?.tolls || 0,
    parkingCost: rawFormData?.parkingCost || 0,
    driverSalary: rawFormData?.driverSalary || 0,
    profitTarget: rawFormData?.profitTarget || 0,
    competitor1: rawFormData?.competitor1 || 0,
    competitor2: rawFormData?.competitor2 || 0,
    electricityCost: rawFormData?.electricityCost || 0,
    equipmentCost: rawFormData?.equipmentCost || 0,
    insuranceCost: rawFormData?.insuranceCost || 0,
    rentCost: rawFormData?.rentCost || 0,
    communicationCost: rawFormData?.communicationCost || 0,
    otherCosts: rawFormData?.otherCosts || 0,
    originAddress: rawFormData?.originAddress || "",
    destinationAddress: rawFormData?.destinationAddress || "",
    routeCalculated: rawFormData?.routeCalculated || false,
    estimatedDuration: rawFormData?.estimatedDuration || "",
    batchNumber: rawFormData?.batchNumber || "",
    supplierName: rawFormData?.supplierName || "",
    minimumMargin: rawFormData?.minimumMargin || 15,
    storageTemperature: rawFormData?.storageTemperature || -18,
    shelfLife: rawFormData?.shelfLife || 365,
    customerPrice: rawFormData?.customerPrice || 0,
    seasonalMultiplier: rawFormData?.seasonalMultiplier || 1
  };

  const results: CalculationResults = rawResults || {
    rawWeight: 0,
    netWeight: 0,
    totalDirectCosts: 0,
    totalIndirectCosts: 0,
    totalTransportCosts: 0,
    totalProcessingCosts: 0,
    finalProcessedWeight: 0,
    totalWastePercentage: 0,
    totalCost: 0,
    totalCostWithVat: 0,
    costPerKg: 0,
    costPerUnit: 0,
    netPrice: 0,
    vatAmount: 0,
    finalPrice: 0,
    grossProfit: 0,
    netProfit: 0,
    profitMargin: 0,
    profitPerKg: 0,
    sellingPrice: 0,
    breakEvenPrice: 0,
    recommendedSellingPrice: 0,
    competitivePosition: "Average",
    efficiencyScore: 0,
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
    purchaseCost: 0,
    laborCost: 0,
    packagingCost: 0,
    transportCost: 0,
    additionalCosts: 0,
  };

  // Core state
  const [activeTab, setActiveTab] = useState("basics");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
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
    { id: "5", name: "Αποσβέσεις", value: 0, category: "indirect" },
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

  // Refs
  const backToTopRef = useRef<HTMLButtonElement>(null);

  // Initialize libraries and setup
  useEffect(() => {
    initializeApp();
    setupScrollHandler();
    setTimeout(setupTooltips, 500); // Delay to ensure DOM is ready
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
    // Load all required libraries
    await libraryLoader.loadAllLibraries();

    // Initialize back to top button
    if (backToTopRef.current) {
      const backToTop = backToTopRef.current;
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Check for premium mode in localStorage
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

  const setupTooltips = () => {
    if (!showTooltips) return;

    // Use native CSS tooltips instead of tippy.js
    const elements = document.querySelectorAll("[data-tooltip]");
    elements.forEach((element) => {
      const tooltip = element.getAttribute("data-tooltip");
      if (tooltip) {
        element.setAttribute("title", tooltip);
        // Add CSS class for enhanced styling
        element.classList.add("has-tooltip");
      }
    });
  };

  const setupGuidedTour = async () => {
    await libraryLoader.waitForLibrary("introjs");

    // Check if tour has been shown before
    const tourShown = safeGetItem("guidedTourShown");
    if (!tourShown && window.introJs) {
      // Auto-start tour after 2 seconds
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

    // Update total cost display
    const totalCostElement = document.getElementById("total-cost");
    if (totalCostElement) {
      totalCostElement.textContent = `€${totalCosts.toLocaleString("el-GR")}`;
    }

    // Update cost per unit if quantity is available
    const quantity = formData.quantity || 1;
    const costPerUnit = quantity > 0 ? totalCosts / quantity : 0;

    const costPerUnitElement = document.getElementById("cost-per-unit");
    if (costPerUnitElement) {
      costPerUnitElement.textContent = `€${costPerUnit.toLocaleString("el-GR")}`;
    }

    // Check cost thresholds and show alerts
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
      // Basic Product Info
      productName: "Θράψαλο Block Αργεντίνης",
      productType: "fish" as const,
      weight: 10, // kg per piece
      quantity: 200, // pieces (2 tons total)
      purchasePrice: 4.5, // €/kg
      targetSellingPrice: 12.0, // €/kg
      origin: "Αργεντίνη",
      quality: "A",
      notes: "Premium θράψαλο block, κατάψυξη στη θάλασσα",

      // Pricing
      profitMargin: 25,
      vatRate: 0, // 0% VAT

      // Processing phases with loss and glazing
      processingPhases: [
        {
          id: "1",
          name: "Καθάρισμα",
          lossPercentage: 20, // από 10kg -> 8kg
          costPerKg: 0.3,
          duration: 0.5,
          temperature: 4,
          description: "Αφαίρεση κεφαλιού, εντόσθιων και πτερυγίων",
        },
      ],
      totalLossPercentage: 0, // General losses (already included in phases)
      glazingPercentage: 15, // από 8kg -> 9.2kg (15% επιπλέον)
      glazingType: "ice",

      // Additional info
      supplierName: "Κοπανάκης",
      batchNumber: "TH-ARG-2024-001",
    };

    // Define properly typed costs
    const typedDirectCosts: CostItem[] = [
      { id: "1", name: "Πρώτες Ύλες", value: 9000, category: "direct" }, // 2000kg * 4.5€
      { id: "2", name: "Εργατικά Καθαρίσματος", value: 600, category: "direct" }, // 2000kg * 0.30€
      { id: "3", name: "Ενέργεια Κατάψυξης", value: 200, category: "direct" },
    ];

    const typedIndirectCosts: CostItem[] = [
      { id: "4", name: "Γενικά Έξοδα", value: 300, category: "indirect" },
      { id: "5", name: "Αποθήκευση", value: 150, category: "indirect" },
      { id: "6", name: "Ασφάλιστρα", value: 100, category: "indirect" },
    ];

    const typedTransportLegs: TransportLeg[] = [
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
    ];

    // Update form data
    updateFormData(exampleFormData);

    // Update direct state
    setDirectCosts(typedDirectCosts);
    setIndirectCosts(typedIndirectCosts);
    setTransportLegs(typedTransportLegs);

    setShowExampleData(false);
    setHasLoadedExample(true);

    // Auto-calculate after loading
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

  return (
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
      />

      <div id="start-tour">
        <OnboardingTour />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 animate-in fade-in duration-700">
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
                      Φορτώστε δεδομένα θράψαλου Αργεντίνης για να δείτε πως
                      λειτουργεί η εφαρμογή
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
                    <h4 className="font-medium text-blue-800">Παράδειγμα Φορτώθηκε</h4>
                    <p className="text-blue-600 text-sm">
                      Δεδομένα θράψαλου Αργεντίνης - Μπορείτε να τα επεξεργαστείτε
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setHasLoadedExample(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2" data-tour="form">
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calculator className="w-6 h-6" />
                    <span className="text-xl">
                      Στοιχεία Κοστολόγησης
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <MainTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isPremium={isPremium}
                  setIsPremium={setIsPremium}
                  formData={formData}
                  updateFormData={updateFormData}
                  results={results}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6" data-tour="results">
            <CompactResultsPanel
              results={rawResults || results}
              formData={formData}
            />

            <div data-tour="export" className="space-y-4">
              <CompanySettings onChange={handleCompanyChange} />
              {rawResults && (
                <>
                  <PDFExport formData={formData} results={results} companyInfo={companyInfo} />
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

      <Footer />
    </div>
  );
};

export default Index;
