import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Calculator,
  Users,
  BarChart2,
  Factory,
  FileText,
  Settings,
  Target,
  Home
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  setActiveTab,
  isPremium
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      id: "basics",
      label: language === "el" ? "Στοιχεία" : "Batch Info",
      icon: Calculator,
      premium: false,
    },
    {
      id: "workers",
      label: language === "el" ? "Εργάτες" : "Workers",
      icon: Users,
      premium: false,
    },
    {
      id: "batch-analysis",
      label: language === "el" ? "Ανάλυση" : "Analysis",
      icon: BarChart2,
      premium: false,
    },
    {
      id: "final-products",
      label: language === "el" ? "Προϊόντα" : "Products",
      icon: Factory,
      premium: false,
    },
    {
      id: "reports",
      label: language === "el" ? "Αναφορές" : "Reports",
      icon: FileText,
      premium: false,
    },
    {
      id: "advanced-analysis",
      label: language === "el" ? "Προχωρημένη" : "Advanced",
      icon: Target,
      premium: true,
    },
    {
      id: "settings",
      label: language === "el" ? "Ρυθμίσεις" : "Settings",
      icon: Settings,
      premium: false,
    },
  ];

  const availableItems = navigationItems.filter(item => !item.premium || isPremium);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-lg border-2"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span className="ml-2 text-xs">Menu</span>
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar-mobile ${isOpen ? 'open' : ''}`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">KostoPro</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {isPremium && (
            <Badge className="bg-yellow-500 text-yellow-900 mt-2">
              Premium
            </Badge>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {availableItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 text-left touch-target ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.premium && !isPremium && (
                    <Badge variant="outline" className="ml-auto text-xs">
                      Pro
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      <div 
        className={`sidebar-backdrop ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-horizontal">
        <div className="grid grid-cols-4 px-2 py-1">
          {availableItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-200 touch-target ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 active:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
