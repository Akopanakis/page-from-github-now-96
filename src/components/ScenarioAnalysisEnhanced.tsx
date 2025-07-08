
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  Cell,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  Area,
  AreaChart,
  ComposedChart
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Calculator,
  Shuffle,
  Play,
  Pause,
  RotateCcw,
  Save,
  Download,
  Upload,
  Share2,
  Settings,
  Filter,
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Percent,
  Activity,
  Zap,
  Layers,
  Box,
  Package,
  Truck,
  Ship,
  Plane,
  Car,
  Bike,
  Anchor,
  Compass,
  Globe,
  Map,
  Navigation,
  Route,
  Gauge,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Snowflake,
  Umbrella,
  Eye,
  EyeOff,
  Heart,
  Star,
  Flag,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Home,
  Building,
  Factory,
  Store,
  Warehouse,
  ShoppingCart,
  CreditCard,
  Banknote,
  Coins,
  Receipt,
  FileText,
  File,
  Folder,
  FolderOpen,
  Archive,
  Inbox,
  Mail,
  Send,
  Reply,
  Forward,
  Phone,
  Smartphone,
  Tablet,
  Monitor,
  Laptop,
  Keyboard,
  Mouse,
  Printer,
  Camera,
  Video,
  Music,
  Headphones,
  Speaker,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Repeat,
  Radio,
  Tv,
  Wifi,
  Bluetooth,
  Battery,
  BatteryLow,
  Plug,
  Power,
  PowerOff,
  Lightbulb,
  Flashlight,
  Flame,
  TreePine,
  Trees,
  Leaf,
  Flower,
  Flower2,
  Cherry,
  Apple,
  Grape,
  Banana,
  Carrot,
  Fish,
  Bird,
  Cat,
  Dog,
  Rabbit,
  Squirrel,
  Turtle,
  Bug,
  Shell,
  Feather,
  Bone,
  Egg,
  Milk,
  Cake,
  Cookie,
  Pizza,
  Sandwich,
  Salad,
  Soup,
  Coffee,
  Beer,
  Wine,
  Utensils,
  ChefHat,
  Scale,
  Timer,
  AlarmClock,
  Hourglass,
  Watch,
  Sunrise,
  Sunset,
  Stars,
  Sparkles,
  Bolt,
  Rainbow,
  Palette,
  Brush,
  Pen,
  Pencil,
  PenTool,
  Ruler,
  Triangle,
  Square,
  Circle,
  Diamond,
  Pentagon,
  Hexagon,
  Octagon,
  Plus,
  Minus,
  X,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  ArrowLeftRight,
  CornerDownLeft,
  CornerDownRight,
  CornerUpLeft,
  CornerUpRight,
  Move,
  Maximize,
  Minimize,
  Expand,
  Shrink,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Image,
  ImageOff,
  Aperture,
  Focus,
  ZoomIn,
  ZoomOut,
  ScanLine,
  QrCode,
  Barcode,
  Lock,
  Unlock,
  Key,
  Shield,
  ShieldCheck,
  UserCheck,
  UserX,
  User,
  UserPlus,
  UserMinus,
  Crown,
  Award,
  Medal,
  Trophy,
  Gift,
  PartyPopper,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Angry,
  Laugh,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Mic,
  MicOff,
  Volume,
  VolumeOff,
  FastForward,
  Rewind
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ScenarioResults {
  totalCost: number;
  profitMargin: number;
  revenue: number;
  profit: number;
  roi: number;
  breakEvenPoint: number;
  costPerUnit: number;
  efficiency: number;
  riskScore: number;
  sustainabilityScore: number;
}

interface SensitivityResults {
  parameter: string;
  impact: number;
  correlation: number;
  ranking: number;
}

interface MonteCarloResults {
  mean: number;
  median: number;
  standardDeviation: number;
  confidenceInterval: [number, number];
  worstCase: number;
  bestCase: number;
  probability: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, number>;
  results?: ScenarioResults;
  sensitivity?: SensitivityResults;
  monteCarlo?: MonteCarloResults;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'running' | 'completed' | 'error';
  tags: string[];
  category: 'optimistic' | 'pessimistic' | 'realistic' | 'stress' | 'custom';
}

interface ScenarioAnalysisEnhancedProps {
  formData: any;
  results?: any;
}

const ScenarioAnalysisEnhanced: React.FC<ScenarioAnalysisEnhancedProps> = ({
  formData,
  results
}) => {
  const { language } = useLanguage();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);

  useEffect(() => {
    const initialScenarios: Scenario[] = [
      {
        id: 'optimistic',
        name: language === 'el' ? 'Αισιόδοξο' : 'Optimistic',
        description: language === 'el' ? 'Το καλύτερο δυνατό σενάριο' : 'The best-case scenario',
        parameters: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
        tags: ['positive', 'best'],
        category: 'optimistic'
      },
      {
        id: 'pessimistic',
        name: language === 'el' ? 'Απαισιόδοξο' : 'Pessimistic',
        description: language === 'el' ? 'Το χειρότερο δυνατό σενάριο' : 'The worst-case scenario',
        parameters: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
        tags: ['negative', 'worst'],
        category: 'pessimistic'
      },
      {
        id: 'realistic',
        name: language === 'el' ? 'Ρεαλιστικό' : 'Realistic',
        description: language === 'el' ? 'Ένα ρεαλιστικό σενάριο' : 'A realistic scenario',
        parameters: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
        tags: ['normal', 'average'],
        category: 'realistic'
      },
      {
        id: 'stress',
        name: language === 'el' ? 'Στρες' : 'Stress',
        description: language === 'el' ? 'Σενάριο υπό πίεση' : 'Scenario under stress',
        parameters: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
        tags: ['high', 'pressure'],
        category: 'stress'
      }
    ];
    setScenarios(initialScenarios);
  }, [language]);

  const handleParameterSelect = (parameter: string) => {
    setSelectedParameters(prev =>
      prev.includes(parameter)
        ? prev.filter(p => p !== parameter)
        : [...prev, parameter]
    );
  };

  const createNewScenario = useCallback(() => {
    const newScenario: Scenario = {
      id: `custom-${Date.now()}`,
      name: language === 'el' ? 'Νέο Σενάριο' : 'New Scenario',
      description: language === 'el' ? 'Προσαρμοσμένο σενάριο' : 'Custom scenario',
      parameters: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
      tags: ['custom'],
      category: 'custom'
    };
    setScenarios(prev => [...prev, newScenario]);
  }, [language]);

  const updateScenario = useCallback((id: string, updates: Partial<Scenario>) => {
    setScenarios(prev =>
      prev.map(scenario =>
        scenario.id === id ? { ...scenario, ...updates, updatedAt: new Date() } : scenario
      )
    );
  }, []);

  const deleteScenario = useCallback((id: string) => {
    setScenarios(prev => prev.filter(scenario => scenario.id !== id));
  }, []);

  const runScenarioAnalysis = useCallback(async (scenarioId: string) => {
    setIsRunning(true);
    
    try {
      const scenario = scenarios.find(s => s.id === scenarioId);
      if (!scenario) return;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockResults: ScenarioResults = {
        totalCost: Math.random() * 10000 + 5000,
        profitMargin: Math.random() * 30 + 10,
        revenue: Math.random() * 15000 + 8000,
        profit: Math.random() * 5000 + 1000,
        roi: Math.random() * 25 + 5,
        breakEvenPoint: Math.random() * 1000 + 500,
        costPerUnit: Math.random() * 50 + 20,
        efficiency: Math.random() * 30 + 70,
        riskScore: Math.random() * 40 + 30,
        sustainabilityScore: Math.random() * 50 + 50
      };

      const mockSensitivity: SensitivityResults = {
        parameter: 'Labor Cost',
        impact: Math.random() * 0.8 + 0.2,
        correlation: Math.random() * 0.6 + 0.4,
        ranking: Math.floor(Math.random() * 5) + 1
      };

      const mockMonteCarlo: MonteCarloResults = {
        mean: mockResults.totalCost,
        median: mockResults.totalCost * 0.98,
        standardDeviation: mockResults.totalCost * 0.15,
        confidenceInterval: [mockResults.totalCost * 0.85, mockResults.totalCost * 1.15],
        worstCase: mockResults.totalCost * 1.3,
        bestCase: mockResults.totalCost * 0.7,
        probability: Math.random() * 0.3 + 0.7
      };

      setScenarios(prev => prev.map(s => 
        s.id === scenarioId 
          ? { 
              ...s, 
              results: mockResults, 
              sensitivity: mockSensitivity, 
              monteCarlo: mockMonteCarlo,
              status: 'completed' as const,
              updatedAt: new Date()
            }
          : s
      ));
    } catch (error) {
      console.error('Scenario analysis failed:', error);
      setScenarios(prev => prev.map(s => 
        s.id === scenarioId 
          ? { ...s, status: 'error' as const }
          : s
      ));
    } finally {
      setIsRunning(false);
    }
  }, [scenarios]);

  const handleSetActiveScenario = (scenarioId: string) => {
    setActiveScenario(scenarioId);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          {language === 'el' ? 'Ανάλυση Σεναρίων' : 'Scenario Analysis'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>
              {language === 'el' ? 'Προχωρημένη Ανάλυση' : 'Advanced Analysis'}
            </AlertTitle>
            <AlertDescription>
              {language === 'el' 
                ? 'Δημιουργήστε και αναλύστε διαφορετικά σενάρια κοστολόγησης'
                : 'Create and analyze different costing scenarios'
              }
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <h4 className="font-medium">
                  {language === 'el' ? 'Βέλτιστο Σενάριο' : 'Best Case'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Ιδανικές συνθήκες' : 'Optimal conditions'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Activity className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <h4 className="font-medium">
                  {language === 'el' ? 'Ρεαλιστικό Σενάριο' : 'Realistic Case'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Κανονικές συνθήκες' : 'Normal conditions'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingDown className="w-8 h-8 mx-auto text-red-600 mb-2" />
                <h4 className="font-medium">
                  {language === 'el' ? 'Χειρότερο Σενάριο' : 'Worst Case'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Δυσμενείς συνθήκες' : 'Adverse conditions'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioAnalysisEnhanced;
