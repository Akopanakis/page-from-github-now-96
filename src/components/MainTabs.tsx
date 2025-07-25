import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  TrendingUp,
  Truck,
  Users,
  FileText,
  Settings,
  Leaf,
  BarChart3,
  Target,
  Award,
  Crown,
  BarChart2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BasicInfoTab from "@/components/BasicInfoTab";
import CostsTab from "@/components/CostsTab";
import AnalysisTab from "@/components/AnalysisTab";
import AdvancedAnalysisTab from "@/components/AdvancedAnalysisTab";
import TransportTab from "@/components/TransportTab";
import WorkersTab from "@/components/WorkersTab";
import ReportsTab from "@/components/ReportsTab";
import SettingsTab from "@/components/SettingsTab";
import SustainabilitySection from "@/components/SustainabilitySection";
import AdvancedFinancialModels from "@/components/AdvancedFinancialModels";
import BatchAnalysisSection from "@/components/BatchAnalysisSection";

interface MainTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  setIsPremium: (premium: boolean) => void;
  formData: any;
  updateFormData: (data: any) => void;
  results: any;
  calculate?: () => void;
}

const MainTabs: React.FC<MainTabsProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  setIsPremium,
  formData,
  updateFormData,
  results,
  calculate,
}) => {
  const { language } = useLanguage();

  const tabs = [
    {
      id: "basics",
      label: language === "el" ? "Βασικά Στοιχεία" : "Basic Info",
      icon: Calculator,
      component: BasicInfoTab,
      premium: false,
    },
    {
      id: "costs",
      label: language === "el" ? "Κόστη" : "Costs",
      icon: TrendingUp,
      component: CostsTab,
      premium: false,
    },
    {
      id: "transport",
      label: language === "el" ? "Μεταφορά" : "Transport",
      icon: Truck,
      component: TransportTab,
      premium: false,
    },
    {
      id: "workers",
      label: language === "el" ? "Εργάτες" : "Workers",
      icon: Users,
      component: WorkersTab,
      premium: false,
    },
    {
      id: "analysis",
      label: language === "el" ? "Ανάλυση" : "Analysis",
      icon: BarChart3,
      component: AnalysisTab,
      premium: false,
    },
    {
      id: "batch-analysis",
      label: language === "el" ? "Ανάλυση Παρτίδας" : "Batch Analysis",
      icon: BarChart2,
      component: BatchAnalysisSection,
      premium: false,
    },
    {
      id: "advanced-analysis",
      label: language === "el" ? "Προχωρημένη Ανάλυση" : "Advanced Analysis",
      icon: Target,
      component: AdvancedAnalysisTab,
      premium: true,
    },
    {
      id: "financial-models",
      label: language === "el" ? "Χρηματοοικονομικά Μοντέλα" : "Financial Models",
      icon: Award,
      component: AdvancedFinancialModels,
      premium: true,
    },
    {
      id: "sustainability",
      label: language === "el" ? "Βιωσιμότητα" : "Sustainability",
      icon: Leaf,
      component: SustainabilitySection,
      premium: true,
    },
    {
      id: "reports",
      label: language === "el" ? "Αναφορές" : "Reports",
      icon: FileText,
      component: ReportsTab,
      premium: false,
    },
    {
      id: "settings",
      label: language === "el" ? "Ρυθμίσεις" : "Settings",
      icon: Settings,
      component: SettingsTab,
      premium: false,
    },
  ];

  const availableTabs = tabs.filter(tab => !tab.premium || isPremium);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto p-1 bg-slate-100">
        {availableTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col items-center p-2 min-h-[60px] data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <div className="flex items-center space-x-1">
                <Icon className="w-4 h-4" />
                {tab.premium && (
                  <Crown className="w-3 h-3 text-yellow-500" />
                )}
              </div>
              <span className="text-xs mt-1 leading-none">{tab.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabs.map((tab) => {
        const Component = tab.component;
        return (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            {tab.premium && !isPremium ? (
              <div className="text-center py-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-dashed border-purple-200">
                <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-purple-800 mb-2">
                  {language === "el" ? "Premium Χαρακτηριστικό" : "Premium Feature"}
                </h3>
                <p className="text-purple-600 mb-4">
                  {language === "el"
                    ? "Αυτή η λειτουργία απαιτεί Premium συνδρομή."
                    : "This feature requires Premium subscription."}
                </p>
                <Badge
                  className="bg-purple-600 hover:bg-purple-700 cursor-pointer"
                  onClick={() => setIsPremium(true)}
                >
                  {language === "el" ? "Ενεργοποίηση Premium" : "Activate Premium"}
                </Badge>
              </div>
            ) : (
              <Component
                formData={formData}
                updateFormData={updateFormData}
                results={results}
                isPremium={isPremium}
                onCalculate={calculate}
              />
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default MainTabs;
