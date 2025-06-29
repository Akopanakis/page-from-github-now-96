import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, ChevronUp, PlayCircle, X } from "lucide-react";
import { useCalculation } from "@/hooks/useCalculation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainTabs from "@/components/MainTabs";
import PremiumInfoCard from "@/components/PremiumInfoCard";
import FileUpload from "@/components/FileUpload";
import OnboardingTour from "@/components/OnboardingTour";
import ResultsSection from "@/components/ResultsSection";
import PDFExport from "@/components/PDFExport";
import DataExport from "@/components/DataExport";
import SmartInsightsPanel from "@/components/SmartInsightsPanel";
import CompanySettings from "@/components/CompanySettings";
import ExampleData from "@/components/ExampleData";
import { CompanyInfo } from "@/types/company";
import { libraryLoader } from "@/utils/libraryLoader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    formData,
    updateFormData,
    calculate,
    resetForm,
    results,
    isCalculating,
  } = useCalculation();

  // Core state
  const [activeTab, setActiveTab] = useState("basics");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const stored = localStorage.getItem("companyInfo");
    return stored ? JSON.parse(stored) : { logoUrl: "", name: "", address: "" };
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
    const savedPremium = localStorage.getItem("isPremium");
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
    const tourShown = localStorage.getItem("guidedTourShown");
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
      localStorage.setItem("guidedTourShown", "true");
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
      productType: "fish",
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

      // Costs
      directCosts: [
        { id: "1", name: "Πρώτες Ύλες", value: 9000, category: "direct" }, // 2000kg * 4.5€
        {
          id: "2",
          name: "Εργατικά Καθαρίσματος",
          value: 600,
          category: "direct",
        }, // 2000kg * 0.30€
        { id: "3", name: "Ενέργεια Κατάψυξης", value: 200, category: "direct" },
      ],
      indirectCosts: [
        { id: "4", name: "Γενικά Έξοδα", value: 300, category: "indirect" },
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

      // Additional info
      supplierName: "Κοπανάκης",
      batchNumber: "TH-ARG-2024-001",
    };

    // Update form data
    updateFormData(exampleFormData);

    // Update direct state
    setDirectCosts(exampleFormData.directCosts);
    setIndirectCosts(exampleFormData.indirectCosts);
    setTransportLegs(exampleFormData.transportLegs);

    setShowExampleData(false);
    setHasLoadedExample(true);

    // Auto-calculate after loading
    setTimeout(() => {
      calculate();
    }, 500);
  };

  const handleCompanyChange = React.useCallback((info: CompanyInfo) => {
    setCompanyInfo(info);
    localStorage.setItem("companyInfo", JSON.stringify(info));
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
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>
      <Header
        isPremium={isPremium}
        setIsPremium={setIsPremium}
        showFileUpload={showFileUpload}
        setShowFileUpload={setShowFileUpload}
      />

      <div id="start-tour">
        <OnboardingTour />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Example Data Banner */}
        {!hasLoadedExample && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2" data-tour="form">
            <Card className="shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90"></div>
                <CardTitle className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-semibold">
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
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6" data-tour="results">
            <ResultsSection
              results={results}
              formData={formData}
              isCalculating={isCalculating}
              isPremium={isPremium}
              onCalculate={calculate}
              onReset={resetForm}
            />

            {results && (
              <SmartInsightsPanel results={results} formData={formData} />
            )}

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

      <Footer />

      {/* Back to Top Button */}
      <button
        ref={backToTopRef}
        id="back-to-top"
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center opacity-0 translate-y-4 pointer-events-none"
        aria-label="Επιστροφή στην κορυφή"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Theme Toggle Button */}
      <button
        id="theme-toggle"
        className="fixed bottom-6 left-6 w-12 h-12 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
        onClick={() => {
          document.body.classList.toggle("dark");
          const isDark = document.body.classList.contains("dark");
          localStorage.setItem("theme", isDark ? "dark" : "light");
        }}
        aria-label="Εναλ��αγή θέματος"
      >
        🌙
      </button>

      {/* Service Worker Registration and PWA Support */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Initialize libraries and features when DOM is ready
            document.addEventListener('DOMContentLoaded', function() {
              // Auto-animate counters
              const counters = document.querySelectorAll('.counter');
              const animateCounter = (element) => {
                const target = parseInt(element.textContent) || 0;
                const duration = 1000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                  current += step;
                  if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                  } else {
                    element.textContent = Math.floor(current);
                  }
                }, 16);
              };

              // Intersection Observer for lazy loading
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    if (entry.target.classList.contains('counter')) {
                      animateCounter(entry.target);
                    }
                    if (entry.target.classList.contains('builder-chart')) {
                      // Trigger chart animation
                      entry.target.style.opacity = '1';
                      entry.target.style.transform = 'translateY(0)';
                    }
                    observer.unobserve(entry.target);
                  }
                });
              });

              // Observe elements
              document.querySelectorAll('.counter, .builder-chart').forEach(el => {
                observer.observe(el);
              });

              // Initialize skeleton loaders
              document.querySelectorAll('.skeleton').forEach(el => {
                setTimeout(() => {
                  el.classList.remove('skeleton');
                }, Math.random() * 2000 + 500);
              });
            });
          `,
        }}
      />
    </div>
  );
};

export default Index;
