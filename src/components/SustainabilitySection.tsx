
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, 
  Droplets, 
  Zap, 
  Recycle, 
  Fish,
  Truck,
  Factory,
  Award,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Globe,
  Users,
  Heart
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface SustainabilitySectionProps {
  formData?: any;
  results?: any;
}

const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({
  formData = {},
  results = {}
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  // Sustainability metrics calculations
  const sustainabilityMetrics = {
    carbonFootprint: {
      total: 2.4, // kg CO2e per kg product
      transport: 0.8,
      processing: 0.6,
      packaging: 0.4,
      storage: 0.6
    },
    waterUsage: {
      total: 12.5, // liters per kg
      processing: 8.0,
      cleaning: 3.5,
      cooling: 1.0
    },
    energyConsumption: {
      total: 3.2, // kWh per kg
      freezing: 1.5,
      processing: 1.0,
      transport: 0.7
    },
    wasteReduction: {
      current: 12, // percentage
      target: 8,
      improvement: 33
    },
    certifications: [
      { name: "MSC", status: "certified", score: 85 },
      { name: "ASC", status: "pending", score: 72 },
      { name: "ISO 14001", status: "certified", score: 91 },
      { name: "BRC", status: "certified", score: 88 }
    ]
  };

  const carbonData = [
    { category: language === 'el' ? 'Μεταφορά' : 'Transport', value: 0.8, color: '#8884d8' },
    { category: language === 'el' ? 'Επεξεργασία' : 'Processing', value: 0.6, color: '#82ca9d' },
    { category: language === 'el' ? 'Συσκευασία' : 'Packaging', value: 0.4, color: '#ffc658' },
    { category: language === 'el' ? 'Αποθήκευση' : 'Storage', value: 0.6, color: '#ff7300' }
  ];

  const monthlyTrends = [
    { month: 'Ιαν', carbon: 2.8, water: 14.2, energy: 3.8 },
    { month: 'Φεβ', carbon: 2.6, water: 13.1, energy: 3.5 },
    { month: 'Μαρ', carbon: 2.4, water: 12.8, energy: 3.2 },
    { month: 'Απρ', carbon: 2.2, water: 12.0, energy: 2.9 },
    { month: 'Μαΐ', carbon: 2.1, water: 11.5, energy: 2.8 },
    { month: 'Ιουν', carbon: 2.4, water: 12.5, energy: 3.2 }
  ];

  const radarData = [
    { subject: language === 'el' ? 'Άνθρακας' : 'Carbon', A: 85, fullMark: 100 },
    { subject: language === 'el' ? 'Νερό' : 'Water', A: 78, fullMark: 100 },
    { subject: language === 'el' ? 'Ενέργεια' : 'Energy', A: 82, fullMark: 100 },
    { subject: language === 'el' ? 'Απόβλητα' : 'Waste', A: 67, fullMark: 100 },
    { subject: language === 'el' ? 'Πιστοποιήσεις' : 'Certifications', A: 84, fullMark: 100 },
    { subject: language === 'el' ? 'Κοινωνικό' : 'Social', A: 76, fullMark: 100 }
  ];

  const sustainabilityActions = [
    {
      title: language === 'el' ? 'Μείωση Συσκευασίας' : 'Reduce Packaging',
      description: language === 'el' ? 'Χρήση βιοδιασπώμενων υλικών' : 'Use biodegradable materials',
      impact: 'high',
      cost: 'medium',
      timeframe: '3-6 months',
      co2Reduction: 0.3
    },
    {
      title: language === 'el' ? 'Ανανεώσιμη Ενέργεια' : 'Renewable Energy',
      description: language === 'el' ? 'Εγκατάσταση ηλιακών πάνελ' : 'Install solar panels',
      impact: 'high',
      cost: 'high',
      timeframe: '6-12 months',
      co2Reduction: 0.8
    },
    {
      title: language === 'el' ? 'Βελτίωση Logistics' : 'Optimize Logistics',
      description: language === 'el' ? 'Βελτιστοποίηση διαδρομών' : 'Route optimization',
      impact: 'medium',
      cost: 'low',
      timeframe: '1-3 months',
      co2Reduction: 0.2
    },
    {
      title: language === 'el' ? 'Τοπική Προμήθεια' : 'Local Sourcing',
      description: language === 'el' ? 'Προμήθεια από τοπικούς προμηθευτές' : 'Source from local suppliers',
      impact: 'high',
      cost: 'medium',
      timeframe: '3-6 months',
      co2Reduction: 0.5
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Leaf className="w-8 h-8 text-green-600 mr-3" />
          {language === 'el' ? 'Βιωσιμότητα & Περιβαλλοντική Επίδραση' : 'Sustainability & Environmental Impact'}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {language === 'el' 
            ? 'Παρακολουθήστε και βελτιώστε την περιβαλλοντική επίδραση της επιχείρησής σας με προχωρημένες μετρικές και actionable insights.'
            : 'Monitor and improve your business environmental impact with advanced metrics and actionable insights.'
          }
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>{language === 'el' ? 'Επισκόπηση' : 'Overview'}</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>{language === 'el' ? 'Μετρικές' : 'Metrics'}</span>
          </TabsTrigger>
          <TabsTrigger value="certifications" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>{language === 'el' ? 'Πιστοποιήσεις' : 'Certifications'}</span>
          </TabsTrigger>
          <TabsTrigger value="actions" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>{language === 'el' ? 'Δράσεις' : 'Actions'}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-800 flex items-center text-sm">
                  <Leaf className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Αποτύπωμα Άνθρακα' : 'Carbon Footprint'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">
                  {sustainabilityMetrics.carbonFootprint.total} kg
                </div>
                <p className="text-sm text-green-600">CO2e {language === 'el' ? 'ανά κιλό' : 'per kg'}</p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    {language === 'el' ? '15% καλύτερα από μέσο όρο' : '15% better than average'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-800 flex items-center text-sm">
                  <Droplets className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Κατανάλωση Νερού' : 'Water Usage'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">
                  {sustainabilityMetrics.waterUsage.total} L
                </div>
                <p className="text-sm text-blue-600">{language === 'el' ? 'ανά κιλό προϊόντος' : 'per kg product'}</p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-blue-700 border-blue-300">
                    {language === 'el' ? '8% μείωση φέτος' : '8% reduction this year'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-yellow-800 flex items-center text-sm">
                  <Zap className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Ενέργεια' : 'Energy'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-900">
                  {sustainabilityMetrics.energyConsumption.total} kWh
                </div>
                <p className="text-sm text-yellow-600">{language === 'el' ? 'ανά κιλό' : 'per kg'}</p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                    {language === 'el' ? '22% ανανεώσιμη' : '22% renewable'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-800 flex items-center text-sm">
                  <Recycle className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Μείωση Αποβλήτων' : 'Waste Reduction'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">
                  {sustainabilityMetrics.wasteReduction.current}%
                </div>
                <p className="text-sm text-purple-600">{language === 'el' ? 'τρέχον ποσοστό' : 'current rate'}</p>
                <div className="mt-2">
                  <Progress value={sustainabilityMetrics.wasteReduction.improvement} className="h-2" />
                  <p className="text-xs text-purple-600 mt-1">
                    {language === 'el' ? 'Στόχος: 8%' : 'Target: 8%'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sustainability Score Radar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600" />
                {language === 'el' ? 'Βαθμολογία Βιωσιμότητας' : 'Sustainability Score'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          {/* Carbon Footprint Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  {language === 'el' ? 'Κατανομή Αποτυπώματος Άνθρακα' : 'Carbon Footprint Breakdown'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={carbonData}
                        dataKey="value"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {carbonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  {language === 'el' ? 'Μηνιαίες Τάσεις' : 'Monthly Trends'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="carbon" stroke="#8884d8" name="CO2 (kg)" />
                      <Line type="monotone" dataKey="water" stroke="#82ca9d" name="Water (L)" />
                      <Line type="monotone" dataKey="energy" stroke="#ffc658" name="Energy (kWh)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  {language === 'el' ? 'Μεταφορές' : 'Transportation'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'el' ? 'Απόσταση μέσου όρου' : 'Average distance'}:</span>
                  <span className="font-semibold">285 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'el' ? 'Εκπομπές CO2' : 'CO2 emissions'}:</span>
                  <span className="font-semibold">0.8 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'el' ? 'Καύσιμο/100km' : 'Fuel/100km'}:</span>
                  <span className="font-semibold">28L</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center">
                  <Factory className="w-5 h-5 mr-2" />
                  {language === 'el' ? 'Επεξεργασία' : 'Processing'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'el' ? 'Ενέργεια/kg' : 'Energy/kg'}:</span>
                  <span className="font-semibold">1.0 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'el' ? 'Νερό/kg' : 'Water/kg'}:</span>
                  <span className="font-semibold">8.0 L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'el' ? 'Απόβλητα/kg' : 'Waste/kg'}:</span>
                  <span className="font-semibold">0.12 kg</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-700 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {language === 'el' ? 'Κοινωνική Επίδραση' : 'Social Impact'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'el' ? 'Τοπικές θέσεις εργασίας' : 'Local jobs'}:</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'el' ? 'Προμηθευτές' : 'Suppliers'}:</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'el' ? 'Κοινότητες' : 'Communities'}:</span>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sustainabilityMetrics.certifications.map((cert, index) => (
              <Card key={index} className={cert.status === 'certified' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className={`w-5 h-5 mr-2 ${cert.status === 'certified' ? 'text-green-600' : 'text-yellow-600'}`} />
                      {cert.name}
                    </div>
                    {cert.status === 'certified' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{language === 'el' ? 'Βαθμολογία' : 'Score'}</span>
                        <span className="text-sm font-medium">{cert.score}/100</span>
                      </div>
                      <Progress value={cert.score} className="h-2" />
                    </div>
                    <Badge variant={cert.status === 'certified' ? 'default' : 'secondary'}>
                      {cert.status === 'certified' 
                        ? (language === 'el' ? 'Πιστοποιημένο' : 'Certified')
                        : (language === 'el' ? 'Σε εξέλιξη' : 'Pending')
                      }
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Fish className="w-5 h-5 mr-2 text-blue-600" />
                {language === 'el' ? 'Πιστοποιήσεις Αλιείας' : 'Fishing Certifications'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-700">MSC (Marine Stewardship Council)</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {language === 'el' 
                      ? 'Πιστοποίηση βιώσιμης αλιείας για την προστασία των θαλάσσιων οικοσυστημάτων.'
                      : 'Sustainable fishing certification for marine ecosystem protection.'
                    }
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-green-700">ASC (Aquaculture Stewardship Council)</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {language === 'el' 
                      ? 'Υπεύθυνη υδατοκαλλιέργεια με περιβαλλοντική και κοινωνική ευθύνη.'
                      : 'Responsible aquaculture with environmental and social responsibility.'
                    }
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-purple-700">Friend of the Sea</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {language === 'el' 
                      ? 'Πιστοποίηση για προϊόντα θάλασσας που σέβονται το περιβάλλον.'
                      : 'Certification for sea products that respect the environment.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <div className="grid gap-6">
            {sustainabilityActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={`${getImpactColor(action.impact)} text-white`}>
                        {language === 'el' 
                          ? `${action.impact === 'high' ? 'Υψηλή' : action.impact === 'medium' ? 'Μέτρια' : 'Χαμηλή'} Επίδραση`
                          : `${action.impact} Impact`
                        }
                      </Badge>
                      <span className={`text-sm font-medium ${getCostColor(action.cost)}`}>
                        {language === 'el' 
                          ? `${action.cost === 'high' ? 'Υψηλό' : action.cost === 'medium' ? 'Μέτριο' : 'Χαμηλό'} Κόστος`
                          : `${action.cost} Cost`
                        }
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <div>
                        <p className="text-sm font-medium">{language === 'el' ? 'Μείωση CO2' : 'CO2 Reduction'}</p>
                        <p className="text-lg font-bold text-green-600">-{action.co2Reduction} kg</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{language === 'el' ? 'Χρονοδιάγραμμα' : 'Timeframe'}</p>
                        <p className="text-sm font-semibold">{action.timeframe}</p>
                      </div>
                    </div>
                    <div>
                      <Button size="sm" className="w-full">
                        {language === 'el' ? 'Εφαρμογή Δράσης' : 'Implement Action'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                {language === 'el' ? 'Προβλεπόμενα Αποτελέσματα' : 'Projected Results'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">-1.8kg</div>
                  <p className="text-sm text-green-600">{language === 'el' ? 'Συνολική μείωση CO2' : 'Total CO2 reduction'}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-700">€12,500</div>
                  <p className="text-sm text-blue-600">{language === 'el' ? 'Ετήσια εξοικονόμηση' : 'Annual savings'}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-700">75%</div>
                  <p className="text-sm text-purple-600">{language === 'el' ? 'Βελτίωση βαθμολογίας' : 'Score improvement'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SustainabilitySection;
