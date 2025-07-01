import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductBasics from "./ProductBasics";
import ProcessingPhases from "./ProcessingPhases";
import CostsTab from "./CostsTab";
import TransportTab from "./TransportTab";
import AnalysisTab from "./AnalysisTab";
import AdvancedAnalysisTab from "./AdvancedAnalysisTab";
import AdvancedCostOptimization from "./AdvancedCostOptimization";
import Dashboard from "./Dashboard";
import ExecutiveDashboard from "./ExecutiveDashboard";
import FinancialRatios from "./FinancialRatios";
import EconomicTrends from "./EconomicTrends";
import InventoryTrackingSystem from "./InventoryTrackingSystem";
import MarketIntelligenceSystem from "./MarketIntelligenceSystem";
import ScenarioAnalysis from "./ScenarioAnalysis";
import RevenueForecast from "./RevenueForecast";
import AdvancedFinancialModels from "./AdvancedFinancialModels";
import {
  Fish,
  Settings,
  Calculator,
  Truck,
  BarChart3,
  PieChart,
  TrendingDown,
  LineChart,
  Crown,
  Activity,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Boxes,
  Globe,
  Target,
  Briefcase,
  Factory,
} from "lucide-react";

interface MainTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  formData: any;
  updateFormData: (updates: any) => void;
  results: any;
  calculate?: () => void;
  resetForm?: () => void;
  isCalculating?: boolean;
  isPremium: boolean;
  directCosts?: any[];
  indirectCosts?: any[];
  transportLegs?: any[];
  onUpdateCost?: (id: string, field: string, value: string | number) => void;
  onAddCost?: (category: "direct" | "indirect") => void;
  onRemoveCost?: (id: string) => void;
  onUpdateTransport?: (
    id: string,
    field: string,
    value: string | number,
  ) => void;
  onAddTransport?: () => void;
  onRemoveTransport?: (id: string) => void;
}

const MainTabs: React.FC<MainTabsProps> = ({
  activeTab,
  setActiveTab,
  formData,
  updateFormData,
  results,
  calculate,
  resetForm,
  isCalculating,
  isPremium,
}) => {
  const { language, t } = useLanguage();

  // Define all available tabs with their configurations
  const tabs = [
    {
      id: "basics",
      label: t("nav.basics"),
      icon: Fish,
      component: ProductBasics,
      category: "main",
      isPremium: false,
    },
    {
      id: "processing",
      label: t("processing.phases"),
      icon: Settings,
      component: ProcessingPhases,
      category: "main",
      isPremium: false,
    },
    {
      id: "costs",
      label: t("nav.costs"),
      icon: Calculator,
      component: CostsTab,
      category: "main",
      isPremium: false,
    },
    {
      id: "transport",
      label: t("nav.transport"),
      icon: Truck,
      component: TransportTab,
      category: "main",
      isPremium: false,
    },
    {
      id: "analysis",
      label: t("nav.analysis"),
      icon: BarChart3,
      component: AnalysisTab,
      category: "analysis",
      isPremium: false,
    },
    {
      id: "advanced-analysis",
      label: language === "el" ? "Προχωρημένη Ανάλυση" : "Advanced Analysis",
      icon: PieChart,
      component: AdvancedAnalysisTab,
      category: "analysis",
      isPremium: true,
    },
    {
      id: "cost-optimization",
      label: language === "el" ? "Βελτιστοποίηση Κόστους" : "Cost Optimization",
      icon: TrendingDown,
      component: AdvancedCostOptimization,
      category: "analysis",
      isPremium: true,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LineChart,
      component: Dashboard,
      category: "dashboard",
      isPremium: true,
    },
    {
      id: "executive-dashboard",
      label: language === "el" ? "Executive Dashboard" : "Executive Dashboard",
      icon: Crown,
      component: ExecutiveDashboard,
      category: "dashboard",
      isPremium: true,
    },
    {
      id: "financial-ratios",
      label: t("financial.ratios"),
      icon: Activity,
      component: FinancialRatios,
      category: "analysis",
      isPremium: true,
    },
    {
      id: "market-trends",
      label: t("market.trends"),
      icon: TrendingUp,
      component: EconomicTrends,
      category: "analysis",
      isPremium: true,
    },
    {
      id: "pricing-models",
      label: language === "el" ? "Μοντέλα Τιμολόγησης" : "Pricing Models",
      icon: DollarSign,
      component: AdvancedCostOptimization, // Reuse with different view
      category: "premium",
      isPremium: true,
    },
    {
      id: "risk-analysis",
      label: language === "el" ? "Ανάλυση Κινδύνου" : "Risk Analysis",
      icon: AlertTriangle,
      component: AdvancedAnalysisTab, // Extended with risk features
      category: "premium",
      isPremium: true,
    },
    {
      id: "inventory",
      label: t("inventory.management"),
      icon: Boxes,
      component: InventoryTrackingSystem,
      category: "premium",
      isPremium: true,
    },
    {
      id: "market",
      label: t("market.intelligence"),
      icon: Globe,
      component: MarketIntelligenceSystem,
      category: "premium",
      isPremium: true,
    },
    {
      id: "scenario",
      label: t("scenario.analysis"),
      icon: Target,
      component: ScenarioAnalysis,
      category: "premium",
      isPremium: true,
    },
    {
      id: "forecast",
      label: t("forecast.revenue"),
      icon: TrendingUp,
      component: RevenueForecast,
      category: "premium",
      isPremium: true,
    },
    {
      id: "financial",
      label: language === "el" ? "Χρηματοοικονομικά" : "Financial Models",
      icon: Briefcase,
      component: AdvancedFinancialModels,
      category: "premium",
      isPremium: true,
    },
    {
      id: "production-economics",
      label: language === "el" ? "Οικονομία Παραγωγής" : "Production Economics",
      icon: Factory,
      component: AdvancedFinancialModels, // Will show production tab
      category: "premium",
      isPremium: true,
    },
    {
      id: "cost-theory",
      label: language === "el" ? "Θεωρία Κόστους" : "Cost Theory",
      icon: TrendingDown,
      component: AdvancedFinancialModels, // Will show cost theory tab
      category: "premium",
      isPremium: true,
    },
  ];

  // Filter tabs based on premium status and active tab
  const availableTabs = tabs.filter((tab) =>
    tab.isPremium ? isPremium : true,
  );

  // Find the current tab configuration
  const currentTab = tabs.find((tab) => tab.id === activeTab);

  // If current tab is premium and user is not premium, redirect to basics
  React.useEffect(() => {
    if (currentTab?.isPremium && !isPremium) {
      setActiveTab("basics");
    }
  }, [currentTab, isPremium, setActiveTab]);

  // Get the component to render
  const getCurrentComponent = () => {
    const tab = tabs.find((t) => t.id === activeTab);
    if (!tab) return null;

    // Check if user has access to premium features
    if (tab.isPremium && !isPremium) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="text-center max-w-md">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {language === "el" ? "Premium Χαρακτηριστικό" : "Premium Feature"}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === "el"
                ? "Αυτή η λειτουργία είναι διαθέσιμη μόνο για Premium χρήστες. Αναβαθμίστε για πρόσβαση σε προχωρημένα εργαλεία ανάλυσης."
                : "This feature is available only for Premium users. Upgrade to access advanced analysis tools."}
            </p>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">
                {language === "el"
                  ? "Αναβάθμιση σε Premium"
                  : "Upgrade to Premium"}
              </h4>
              <ul className="text-sm space-y-1">
                <li>
                  •{" "}
                  {language === "el"
                    ? "Προχωρημένη ανάλυση"
                    : "Advanced analytics"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Executive Dashboard"
                    : "Executive Dashboard"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Διαχείριση αποθεμάτων"
                    : "Inventory management"}
                </li>
                <li>
                  •{" "}
                  {language === "el" ? "Ανάλυση αγοράς" : "Market intelligence"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Χρηματοοικονομικά μοντέλα"
                    : "Financial models"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    const Component = tab.component;
    return (
      <Component
        formData={formData}
        updateFormData={updateFormData}
        results={results}
        calculate={calculate}
        resetForm={resetForm}
        isCalculating={isCalculating}
        onUpdateFormData={updateFormData}
        isPremium={isPremium}
        directCosts={directCosts}
        indirectCosts={indirectCosts}
        transportLegs={transportLegs}
        onUpdateCost={onUpdateCost}
        onAddCost={onAddCost}
        onRemoveCost={onRemoveCost}
        onUpdateTransport={onUpdateTransport}
        onAddTransport={onAddTransport}
        onRemoveTransport={onRemoveTransport}
        productType={formData.productType}
      />
    );
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Tab Navigation - Hidden since we use Sidebar */}
        <TabsList className="hidden">
          {availableTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        <div className="mt-0">
          {availableTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              {activeTab === tab.id && getCurrentComponent()}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default MainTabs;
