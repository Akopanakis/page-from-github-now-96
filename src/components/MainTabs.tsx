import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Fish,
  Calculator,
  BarChart3,
  Crown,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductBasics from "@/components/ProductBasics";
import ProcessingPhases from "@/components/ProcessingPhases";
import AdvancedDashboard from "@/components/AdvancedDashboard";
import ScenarioAnalysis from "@/components/ScenarioAnalysis";
import RevenueForecast from "@/components/RevenueForecast";
import FinancialModels from "@/components/FinancialModels";
import AnalysisTab from "@/components/AnalysisTab";
import AdvancedAnalysisTab from "@/components/AdvancedAnalysisTab";

interface MainTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  formData: any;
  updateFormData: (updates: any) => void;
  results: any;
  directCosts?: any[];
  indirectCosts?: any[];
  transportLegs?: any[];
  onUpdateCost?: (id: string, field: string, value: any) => void;
  onAddCost?: (category: string) => void;
  onRemoveCost?: (id: string) => void;
  onUpdateTransport?: (id: string, field: string, value: any) => void;
  onAddTransport?: () => void;
  onRemoveTransport?: (id: string) => void;
}

const MainTabs: React.FC<MainTabsProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  setIsPremium,
  formData,
  updateFormData,
  results,
  directCosts = [],
  indirectCosts = [],
  transportLegs = [],
  onUpdateCost,
  onAddCost,
  onRemoveCost,
  onUpdateTransport,
  onAddTransport,
  onRemoveTransport,
}) => {
  const { language } = useLanguage();

  const tabs = [
    {
      id: "basics",
      label: language === "el" ? "Βασικά" : "Basics",
      icon: Fish,
      description: language === "el" ? "Στοιχεία προϊόντος" : "Product details",
      premium: false,
    },
    {
      id: "costs",
      label: language === "el" ? "Κόστη" : "Costs",
      icon: Calculator,
      description:
        language === "el"
          ? "Ανάλυση κόστους & μεταφορικά"
          : "Cost analysis & transport",
      premium: false,
    },
    {
      id: "analysis",
      label: language === "el" ? "Ανάλυση" : "Analysis",
      icon: BarChart3,
      description:
        language === "el" ? "Γραφήματα & insights" : "Charts & insights",
      premium: false,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Target,
      description:
        language === "el"
          ? "Επαγγελματικό dashboard"
          : "Professional dashboard",
      premium: true,
    },
    {
      id: "advanced",
      label: language === "el" ? "Προχωρημένα" : "Advanced",
      icon: Zap,
      description:
        language === "el"
          ? "Σενάρια, πρόβλεψη, χρηματοοικονομικά"
          : "Scenarios, forecast, financial",
      premium: true,
    },
  ];

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 gap-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-2 rounded-xl shadow-inner border border-gray-200 dark:border-gray-600">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isDisabled = tab.premium && !isPremium;

            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                disabled={isDisabled}
                className={`
                  relative flex flex-col items-center gap-1.5 px-3 py-3 text-xs font-medium
                  transition-all duration-300 ease-in-out
                  ${index === 0 ? "rounded-l-lg" : index === tabs.length - 1 ? "rounded-r-lg" : ""}
                  ${
                    isDisabled
                      ? "opacity-40 cursor-not-allowed bg-gray-200/50 dark:bg-gray-700/50"
                      : "hover:bg-white/80 dark:hover:bg-gray-600/80 hover:shadow-md hover:scale-105"
                  }
                  ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-gray-600 shadow-lg border border-gray-300 dark:border-gray-500 scale-105 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300"
                  }
                `}
                title={tab.description}
              >
                <div className="flex items-center gap-1">
                  <Icon className="w-4 h-4" />
                  {tab.premium && <Crown className="w-3 h-3 text-purple-500" />}
                </div>
                <span className="hidden sm:block">{tab.label}</span>

                {isDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded-md">
                    <div className="w-full h-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-purple-500" />
                    </div>
                  </div>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Premium Upgrade Banner */}
        {!isPremium && (
          <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-purple-900/30 rounded-2xl border-2 border-purple-200 dark:border-purple-700 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-purple-800 dark:text-purple-200">
                    {language === "el"
                      ? "Αναβάθμιση σε Premium"
                      : "Upgrade to Premium"}
                  </h4>
                  <p className="text-purple-600 dark:text-purple-300">
                    {language === "el"
                      ? "Ξεκλειδώστε προχωρημένες αναλύσεις και εργαλεία επαγγελματικής κοστολόγησης"
                      : "Unlock advanced analytics and professional costing tools"}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsPremium(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white px-6 py-3"
                size="lg"
              >
                <Crown className="w-5 h-5 mr-2" />
                {language === "el" ? "Αναβάθμιση Τώρα" : "Upgrade Now"}
              </Button>
            </div>
          </div>
        )}

        {/* Tab Contents */}
        <div className="mt-8 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl p-6 min-h-[600px]">
          {/* Basics Tab */}
          <TabsContent value="basics" className="space-y-6">
            <ProductBasics
              formData={formData}
              updateFormData={updateFormData}
            />
            {isPremium && (
              <ProcessingPhases
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
          </TabsContent>

          {/* Costs Tab */}
          <TabsContent value="costs" className="space-y-6">
            <CostsSection
              directCosts={directCosts}
              indirectCosts={indirectCosts}
              transportLegs={transportLegs}
              onUpdateCost={onUpdateCost}
              onAddCost={onAddCost}
              onRemoveCost={onRemoveCost}
              onUpdateTransport={onUpdateTransport}
              onAddTransport={onAddTransport}
              onRemoveTransport={onRemoveTransport}
              isPremium={isPremium}
            />
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <AnalysisTab results={results} formData={formData} />
            {isPremium && (
              <AdvancedAnalysisTab results={results} formData={formData} />
            )}
          </TabsContent>

          {/* Dashboard Tab - Premium Only */}
          <TabsContent value="dashboard" className="space-y-6">
            {isPremium ? (
              <AdvancedDashboard data={results} formData={formData} />
            ) : (
              <PremiumFeatureMessage feature="Dashboard" />
            )}
          </TabsContent>

          {/* Advanced Tab - Premium Only */}
          <TabsContent value="advanced" className="space-y-6">
            {isPremium ? (
              <AdvancedFeaturesSection results={results} formData={formData} />
            ) : (
              <PremiumFeatureMessage feature="Advanced Features" />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

// Enhanced Costs Section Component
const CostsSection: React.FC<{
  directCosts: any[];
  indirectCosts: any[];
  transportLegs: any[];
  onUpdateCost?: (id: string, field: string, value: any) => void;
  onAddCost?: (category: string) => void;
  onRemoveCost?: (id: string) => void;
  onUpdateTransport?: (id: string, field: string, value: any) => void;
  onAddTransport?: () => void;
  onRemoveTransport?: (id: string) => void;
  isPremium: boolean;
}> = ({
  directCosts,
  indirectCosts,
  transportLegs,
  onUpdateCost,
  onAddCost,
  onRemoveCost,
  onUpdateTransport,
  onAddTransport,
  onRemoveTransport,
  isPremium,
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Direct Costs */}
      <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          {language === "el" ? "Άμεσα Κόστη" : "Direct Costs"}
        </h3>
        <div className="space-y-3">
          {directCosts.map((cost, index) => (
            <div key={cost.id || index} className="flex items-center gap-3">
              <Input
                placeholder="Όνομα κόστους"
                value={cost.name || ""}
                onChange={(e) =>
                  onUpdateCost?.(
                    cost.id || index.toString(),
                    "name",
                    e.target.value,
                  )
                }
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="0.00"
                value={cost.value || ""}
                onChange={(e) =>
                  onUpdateCost?.(
                    cost.id || index.toString(),
                    "value",
                    Number(e.target.value),
                  )
                }
                className="w-32"
                step="0.01"
                min="0"
              />
              <Button
                onClick={() => onRemoveCost?.(cost.id || index.toString())}
                variant="outline"
                size="sm"
                className="text-red-600"
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            onClick={() => onAddCost?.("direct")}
            variant="outline"
            className="w-full"
          >
            +{" "}
            {language === "el" ? "Προσθήκη Άμεσου Κόστους" : "Add Direct Cost"}
          </Button>
        </div>
      </div>

      {/* Indirect Costs */}
      <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          {language === "el" ? "Έμμεσα Κόστη" : "Indirect Costs"}
        </h3>
        <div className="space-y-3">
          {indirectCosts.map((cost, index) => (
            <div key={cost.id || index} className="flex items-center gap-3">
              <Input
                placeholder="Όνομα κόστους"
                value={cost.name || ""}
                onChange={(e) =>
                  onUpdateCost?.(
                    cost.id || index.toString(),
                    "name",
                    e.target.value,
                  )
                }
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="0.00"
                value={cost.value || ""}
                onChange={(e) =>
                  onUpdateCost?.(
                    cost.id || index.toString(),
                    "value",
                    Number(e.target.value),
                  )
                }
                className="w-32"
                step="0.01"
                min="0"
              />
              <Button
                onClick={() => onRemoveCost?.(cost.id || index.toString())}
                variant="outline"
                size="sm"
                className="text-red-600"
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            onClick={() => onAddCost?.("indirect")}
            variant="outline"
            className="w-full"
          >
            +{" "}
            {language === "el"
              ? "Προσθήκη Έμμεσου Κόστους"
              : "Add Indirect Cost"}
          </Button>
        </div>
      </div>

      {/* Transport Section */}
      <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {language === "el" ? "Μεταφορικά Κόστη" : "Transport Costs"}
        </h3>
        <div className="space-y-4">
          {transportLegs.map((leg, index) => (
            <div
              key={leg.id || index}
              className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 border rounded-lg"
            >
              <Input
                placeholder="Α��ό"
                value={leg.from || ""}
                onChange={(e) =>
                  onUpdateTransport?.(
                    leg.id || index.toString(),
                    "from",
                    e.target.value,
                  )
                }
              />
              <Input
                placeholder="Προς"
                value={leg.to || ""}
                onChange={(e) =>
                  onUpdateTransport?.(
                    leg.id || index.toString(),
                    "to",
                    e.target.value,
                  )
                }
              />
              <Input
                type="number"
                placeholder="Απόσταση (km)"
                value={leg.distance || ""}
                onChange={(e) =>
                  onUpdateTransport?.(
                    leg.id || index.toString(),
                    "distance",
                    Number(e.target.value),
                  )
                }
              />
              <Input
                type="number"
                placeholder="Κόστος (€)"
                value={leg.cost || ""}
                onChange={(e) =>
                  onUpdateTransport?.(
                    leg.id || index.toString(),
                    "cost",
                    Number(e.target.value),
                  )
                }
              />
              <Button
                onClick={() => onRemoveTransport?.(leg.id || index.toString())}
                variant="outline"
                size="sm"
                className="text-red-600"
                disabled={transportLegs.length === 1}
              >
                Αφαίρεση
              </Button>
            </div>
          ))}
          <Button onClick={onAddTransport} variant="outline" className="w-full">
            + {language === "el" ? "Προσθήκη Διαδρομής" : "Add Transport Leg"}
          </Button>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h4 className="font-medium mb-4">
          {language === "el" ? "Σύνοψη Κόστους" : "Cost Summary"}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {language === "el" ? "Άμεσα" : "Direct"}
            </div>
            <div id="direct-total" className="text-xl font-bold">
              €
              {directCosts
                .reduce((sum, cost) => sum + (cost.value || 0), 0)
                .toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {language === "el" ? "Έμμεσα" : "Indirect"}
            </div>
            <div id="indirect-total" className="text-xl font-bold">
              €
              {indirectCosts
                .reduce((sum, cost) => sum + (cost.value || 0), 0)
                .toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {language === "el" ? "Μεταφορικά" : "Transport"}
            </div>
            <div id="transport-total" className="text-xl font-bold">
              €
              {transportLegs
                .reduce((sum, leg) => sum + (leg.cost || 0), 0)
                .toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {language === "el" ? "Σύνολο" : "Total"}
            </div>
            <div id="total-cost" className="text-xl font-bold text-blue-600">
              €
              {(
                directCosts.reduce((sum, cost) => sum + (cost.value || 0), 0) +
                indirectCosts.reduce(
                  (sum, cost) => sum + (cost.value || 0),
                  0,
                ) +
                transportLegs.reduce((sum, leg) => sum + (leg.cost || 0), 0)
              ).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Advanced Features Section
const AdvancedFeaturesSection: React.FC<{
  results: any;
  formData: any;
}> = ({ results, formData }) => {
  const [activeAdvanced, setActiveAdvanced] = React.useState("scenarios");
  const { language } = useLanguage();

  const advancedTabs = [
    {
      id: "scenarios",
      label: language === "el" ? "Σενάρια" : "Scenarios",
      component: ScenarioAnalysis,
    },
    {
      id: "forecast",
      label: language === "el" ? "Πρόβλεψη" : "Forecast",
      component: RevenueForecast,
    },
    {
      id: "financial",
      label: language === "el" ? "Χρηματοοικονομικά" : "Financial",
      component: FinancialModels,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Advanced Sub-Navigation */}
      <div className="flex flex-wrap gap-2">
        {advancedTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdvanced(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 border-transparent cursor-pointer ${
              activeAdvanced === tab.id
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Advanced Content */}
      <div>
        {advancedTabs.map((tab) => {
          const Component = tab.component;
          return (
            <div
              key={tab.id}
              className={activeAdvanced === tab.id ? "block" : "hidden"}
            >
              <Component data={results} formData={formData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PremiumFeatureMessage: React.FC<{ feature: string }> = ({ feature }) => {
  const { language } = useLanguage();

  return (
    <div className="text-center py-12">
      <Crown className="w-16 h-16 text-purple-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">
        {language === "el"
          ? `${feature} - Premium Δυνατότητα`
          : `${feature} - Premium Feature`}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {language === "el"
          ? "Αναβαθμίστε σε Premium για να ξεκλειδώσετε αυτή την προχωρημένη δυνατότητα"
          : "Upgrade to Premium to unlock this advanced feature"}
      </p>
      <div className="space-y-2 text-sm text-gray-500">
        <p>
          ✓{" "}
          {language === "el"
            ? "Επαγγελματικό Dashboard"
            : "Professional Dashboard"}
        </p>
        <p>✓ {language === "el" ? "Ανάλυση Σεναρίων" : "Scenario Analysis"}</p>
        <p>✓ {language === "el" ? "Πρόβλεψη Εσόδων" : "Revenue Forecasting"}</p>
        <p>
          ✓{" "}
          {language === "el" ? "Χρηματοοικονομικά Μοντέλα" : "Financial Models"}
        </p>
      </div>
    </div>
  );
};

export default MainTabs;
