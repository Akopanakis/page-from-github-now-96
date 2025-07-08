
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  History,
  BarChart3,
  Settings,
  TrendingUp,
  Globe,
  Target,
  Search,
  Plus,
  ChevronLeft,
  Home,
  Shield,
  Building,
  Users,
  Truck,
  FileText,
  Award,
  Brain,
  Sliders
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  route?: string;
  component?: string;
  children?: NavigationItem[];
  position: { x: number; y: number };
  isPremium?: boolean;
  color: string;
}

interface CircularNavigationProps {
  onNavigate: (route: string, component?: string) => void;
  isPremium: boolean;
}

const CircularNavigation: React.FC<CircularNavigationProps> = ({
  onNavigate,
  isPremium
}) => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Main navigation items positioned in a circle
  const navigationItems: NavigationItem[] = [
    {
      id: 'costing',
      label: language === 'el' ? 'Κοστολόγηση' : 'Costing',
      icon: Calculator,
      route: '/costs',
      component: 'costs',
      position: { x: -200, y: -100 },
      color: 'from-blue-500 to-cyan-500',
      children: [
        {
          id: 'basics',
          label: language === 'el' ? 'Βασικά Στοιχεία' : 'Product Basics',
          icon: FileText,
          component: 'basics',
          position: { x: -280, y: -160 },
          color: 'from-blue-400 to-cyan-400'
        },
        {
          id: 'transport',
          label: language === 'el' ? 'Μεταφορά' : 'Transport',
          icon: Truck,
          component: 'transport',
          position: { x: -320, y: -80 },
          color: 'from-blue-400 to-cyan-400'
        }
      ]
    },
    {
      id: 'history',
      label: language === 'el' ? 'Ιστορικό' : 'History',
      icon: History,
      component: 'dashboard',
      position: { x: -100, y: -200 },
      color: 'from-purple-500 to-pink-500',
      children: [
        {
          id: 'audit-trail',
          label: language === 'el' ? 'Ιχνηλάτης Ελέγχου' : 'Audit Trail',
          icon: Shield,
          route: '/compliance/audit',
          position: { x: -160, y: -280 },
          color: 'from-purple-400 to-pink-400'
        }
      ]
    },
    {
      id: 'results',
      label: language === 'el' ? 'Αποτελέσματα' : 'Results',
      icon: BarChart3,
      component: 'analysis',
      position: { x: 100, y: -200 },
      color: 'from-green-500 to-emerald-500',
      children: [
        {
          id: 'advanced-analysis',
          label: language === 'el' ? 'Προχωρημένη Ανάλυση' : 'Advanced Analysis',
          icon: Brain,
          component: 'advanced',
          position: { x: 160, y: -280 },
          color: 'from-green-400 to-emerald-400',
          isPremium: true
        }
      ]
    },
    {
      id: 'customizations',
      label: language === 'el' ? 'Προσαρμογές' : 'Customizations',
      icon: Sliders,
      component: 'processing',
      position: { x: 200, y: -100 },
      color: 'from-orange-500 to-red-500',
      isPremium: true,
      children: [
        {
          id: 'batches',
          label: language === 'el' ? 'Παρτίδες' : 'Batches',
          icon: Building,
          component: 'batches',
          position: { x: 280, y: -160 },
          color: 'from-orange-400 to-red-400',
          isPremium: true
        }
      ]
    },
    {
      id: 'data-analysis',
      label: language === 'el' ? 'Αναλύσεις Δεδομένων' : 'Data Analysis',
      icon: TrendingUp,
      route: '/analytics/financial',
      position: { x: 200, y: 100 },
      color: 'from-indigo-500 to-purple-500',
      children: [
        {
          id: 'business-intelligence',
          label: language === 'el' ? 'Business Intelligence' : 'Business Intelligence',
          icon: Brain,
          route: '/analytics/business-intelligence',
          position: { x: 280, y: 160 },
          color: 'from-indigo-400 to-purple-400'
        }
      ]
    },
    {
      id: 'forecasting',
      label: language === 'el' ? 'Προβλέψεις' : 'Forecasting',
      icon: Target,
      component: 'scenario-analysis',
      position: { x: 100, y: 200 },
      color: 'from-teal-500 to-blue-500',
      isPremium: true
    },
    {
      id: 'market-intelligence',
      label: language === 'el' ? 'Market Intelligence' : 'Market Intelligence',
      icon: Globe,
      component: 'market-intelligence',
      position: { x: -100, y: 200 },
      color: 'from-cyan-500 to-teal-500',
      isPremium: true
    },
    {
      id: 'settings',
      label: language === 'el' ? 'Ρυθμίσεις' : 'Settings',
      icon: Settings,
      component: 'tools',
      position: { x: -200, y: 100 },
      color: 'from-gray-500 to-slate-500',
      children: [
        {
          id: 'compliance',
          label: language === 'el' ? 'Συμμόρφωση' : 'Compliance',
          icon: Shield,
          route: '/compliance/haccp',
          position: { x: -280, y: 160 },
          color: 'from-gray-400 to-slate-400'
        },
        {
          id: 'tutorial',
          label: language === 'el' ? 'Οδηγός' : 'Tutorial',
          icon: Award,
          route: '/tutorial',
          position: { x: -320, y: 80 },
          color: 'from-gray-400 to-slate-400'
        }
      ]
    }
  ];

  // Animation effect for the central logo
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleItemClick = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      setActiveCategory(activeCategory === item.id ? null : item.id);
    } else {
      if (item.route) {
        onNavigate(item.route, item.component);
      } else if (item.component) {
        onNavigate('/', item.component);
      }
    }
  };

  const handleSubItemClick = (item: NavigationItem) => {
    if (item.route) {
      onNavigate(item.route, item.component);
    } else if (item.component) {
      onNavigate('/', item.component);
    }
  };

  const getVisibleItems = () => {
    let items = [...navigationItems];
    
    if (activeCategory) {
      const activeItem = navigationItems.find(item => item.id === activeCategory);
      if (activeItem?.children) {
        items = [...items, ...activeItem.children];
      }
    }
    
    return items;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Search bar */}
      <div className="absolute top-8 left-8 z-20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'el' ? 'Αναζήτηση...' : 'Search...'}
            className="pl-10 pr-4 py-3 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          />
        </div>
      </div>

      {/* Back to home button */}
      <div className="absolute top-8 right-8 z-20">
        <Button
          onClick={() => onNavigate('/', 'comprehensive-dashboard')}
          variant="ghost"
          size="sm"
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
        >
          <Home className="w-4 h-4 mr-2" />
          {language === 'el' ? 'Αρχική' : 'Home'}
        </Button>
      </div>

      {/* Central container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[800px] h-[800px]">
          
          {/* Central logo and title */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-bold text-blue-600">K</span>
                  </div>
                  <h1 className="text-white font-bold text-lg leading-tight">
                    {language === 'el' 
                      ? 'Το πιο εξελιγμένο εργαλείο κοστολόγησης & ανάλυσης αγοράς'
                      : 'The most advanced costing & market analysis tool'
                    }
                  </h1>
                </div>
              </div>
              
              {/* Animated rings around central logo */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[-20px] rounded-full border border-white/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Navigation items */}
          <AnimatePresence>
            {getVisibleItems().map((item, index) => {
              const isSubItem = navigationItems.find(parent => 
                parent.children?.some(child => child.id === item.id)
              );
              const isActive = activeCategory === item.id;
              const isHovered = hoveredItem === item.id;
              const canAccess = !item.isPremium || isPremium;

              return (
                <motion.div
                  key={item.id}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${item.position.x}px), calc(-50% + ${item.position.y}px))`
                  }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 0,
                    y: 0
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: isHovered ? 1.1 : 1,
                    x: 0,
                    y: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0,
                    transition: { duration: 0.2 }
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25,
                    delay: index * 0.1
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => {
                      if (canAccess) {
                        if (isSubItem) {
                          handleSubItemClick(item);
                        } else {
                          handleItemClick(item);
                        }
                      }
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    disabled={!canAccess}
                    className={`
                      relative group transition-all duration-300
                      ${canAccess ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
                    `}
                    aria-label={item.label}
                  >
                    <div className={`
                      w-20 h-20 rounded-full flex items-center justify-center
                      bg-gradient-to-br ${item.color}
                      shadow-lg border-2 border-white/30
                      backdrop-blur-sm
                      ${isActive ? 'ring-4 ring-white/50' : ''}
                      ${isSubItem ? 'w-16 h-16' : ''}
                      ${!canAccess ? 'grayscale' : ''}
                      transition-all duration-300
                    `}>
                      <item.icon className={`${isSubItem ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
                      
                      {item.isPremium && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Award className="w-3 h-3 text-yellow-800" />
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <div className={`
                      absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                      px-3 py-1 bg-black/70 text-white text-sm rounded-lg
                      backdrop-blur-sm border border-white/20
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      whitespace-nowrap z-20
                      ${isSubItem ? 'text-xs' : ''}
                    `}>
                      {item.label}
                      {item.isPremium && !isPremium && (
                        <Badge variant="secondary" className="ml-2 text-xs">Premium</Badge>
                      )}
                    </div>

                    {/* Connection line to parent (for sub-items) */}
                    {isSubItem && (
                      <div className="absolute top-1/2 left-1/2 w-px h-16 bg-white/30 transform -translate-x-1/2 -translate-y-full -z-10" />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Add new item button */}
          <motion.div
            className="absolute bottom-8 right-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 300, damping: 25 }}
          >
            <button className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 hover:scale-110 transition-transform duration-200">
              <Plus className="w-8 h-8 text-white" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-8 text-white/70 text-sm max-w-md">
        <p>
          {language === 'el' 
            ? 'Κάντε κλικ σε μια κατηγορία για να δείτε τις υποκατηγορίες της ή για πλοήγηση.'
            : 'Click on a category to see its subcategories or navigate directly.'
          }
        </p>
      </div>

      {/* Premium badge */}
      {isPremium && (
        <div className="absolute bottom-8 right-8">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            Premium Active
          </Badge>
        </div>
      )}
    </div>
  );
};

export default CircularNavigation;
