import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Fish,
  Thermometer,
  Shield,
  Clock,
  Scale,
  QrCode,
  Truck,
  Package,
  AlertTriangle,
  CheckCircle,
  Eye,
  Droplets,
  Zap,
  BarChart3,
  Beaker,
  Factory,
  Target,
  Award,
  Snowflake,
  Timer,
  Users,
  FileText,
  TrendingUp,
  Globe,
  Leaf,
  Star,
  Database,
  Settings,
  Bell,
  Activity,
  RefreshCw,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Search,
  Filter,
  Plus,
  Edit,
  Download,
  Upload,
  Clipboard,
  Heart
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SeafoodProcessingFeaturesProps {
  className?: string;
}

const SeafoodProcessingFeatures: React.FC<SeafoodProcessingFeaturesProps> = ({ className = "" }) => {
  const { language } = useLanguage();
  const [activeFeature, setActiveFeature] = useState('quality-control');
  const [realTimeData, setRealTimeData] = useState({
    temperature: -2.1,
    humidity: 82,
    ph: 6.8,
    freshness: 95,
    bacterialCount: 12,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 0.2,
        humidity: Math.max(75, Math.min(90, prev.humidity + (Math.random() - 0.5) * 2)),
        ph: Math.max(6.0, Math.min(7.5, prev.ph + (Math.random() - 0.5) * 0.1)),
        freshness: Math.max(80, Math.min(100, prev.freshness + (Math.random() - 0.5) * 2)),
        bacterialCount: Math.max(5, Math.min(25, prev.bacterialCount + (Math.random() - 0.5) * 2)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 'quality-control',
      title: language === 'el' ? 'Έλεγχος Ποιότητας' : 'Quality Control',
      icon: <Shield className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Αυτοματοποιημένος έλεγχος ποιότητας με αισθητήρες και AI' 
        : 'Automated quality control with sensors and AI',
    },
    {
      id: 'traceability',
      title: language === 'el' ? 'Ιχνηλασιμότητα' : 'Traceability',
      icon: <QrCode className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Πλήρης ιχνηλασιμότητα από το σκάφος στο τραπέζι' 
        : 'Complete traceability from boat to table',
    },
    {
      id: 'cold-chain',
      title: language === 'el' ? 'Ψυχρή Αλυσίδα' : 'Cold Chain',
      icon: <Snowflake className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Διαχείριση και παρακολούθηση ψυχρής αλυσίδας' 
        : 'Cold chain management and monitoring',
    },
    {
      id: 'yield-optimization',
      title: language === 'el' ? 'Βελτιστοποίηση Απόδοσης' : 'Yield Optimization',
      icon: <Target className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Μεγιστοποίηση απόδοσης επεξεργασίας' 
        : 'Maximize processing yield',
    },
    {
      id: 'packaging-automation',
      title: language === 'el' ? 'Αυτοματοποίηση Συσκευασίας' : 'Packaging Automation',
      icon: <Package className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Έξυπνη συσκευασία με αυτοματισμούς' 
        : 'Smart packaging with automation',
    },
    {
      id: 'waste-management',
      title: language === 'el' ? 'Διαχείριση Αποβλήτων' : 'Waste Management',
      icon: <Leaf className="w-5 h-5" />,
      description: language === 'el' 
        ? 'Βιώσιμη διαχείριση αποβλήτων επεξεργασίας' 
        : 'Sustainable processing waste management',
    },
  ];

  const QualityControlPanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">{language === 'el' ? 'Θερμοκρασία' : 'Temperature'}</p>
                <p className="text-2xl font-bold text-blue-800">{realTimeData.temperature.toFixed(1)}°C</p>
              </div>
              <Thermometer className="w-8 h-8 text-blue-600" />
            </div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">{language === 'el' ? 'Φρεσκάδα' : 'Freshness'}</p>
                <p className="text-2xl font-bold text-green-800">{realTimeData.freshness.toFixed(0)}%</p>
              </div>
              <Fish className="w-8 h-8 text-green-600" />
            </div>
            <Progress value={realTimeData.freshness} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">{language === 'el' ? 'pH Επίπεδο' : 'pH Level'}</p>
                <p className="text-2xl font-bold text-purple-800">{realTimeData.ph.toFixed(1)}</p>
              </div>
              <Beaker className="w-8 h-8 text-purple-600" />
            </div>
            <Progress value={(realTimeData.ph - 6) * 100 / 1.5} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            {language === 'el' ? 'Παρακολούθηση Ποιότητας σε Πραγματικό Χρόνο' : 'Real-Time Quality Monitoring'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Παράμετροι Ποιότητας' : 'Quality Parameters'}</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{language === 'el' ? 'Βακτηριακός Φορτίος:' : 'Bacterial Count:'}</span>
                  <Badge className={realTimeData.bacterialCount < 15 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                    {realTimeData.bacterialCount.toFixed(0)} CFU/g
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{language === 'el' ? 'Υγρασία:' : 'Humidity:'}</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {realTimeData.humidity.toFixed(0)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{language === 'el' ? 'Οργανοληπτικό Score:' : 'Sensory Score:'}</span>
                  <Badge className="bg-purple-100 text-purple-800">9.2/10</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Ενέργειες' : 'Actions'}</h4>
              <div className="space-y-2">
                <Button size="sm" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Προβολή Λεπτομερών' : 'View Details'}
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Εξαγωγή Αναφοράς' : 'Export Report'}
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Ρύθμιση Ειδοποιήσεων' : 'Set Alerts'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TraceabilityPanel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <QrCode className="w-5 h-5 mr-2" />
            {language === 'el' ? 'Σύστημα Ιχνηλασιμότητας' : 'Traceability System'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="batch" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="batch">{language === 'el' ? 'Παρτίδα' : 'Batch'}</TabsTrigger>
              <TabsTrigger value="origin">{language === 'el' ? 'Προέλευση' : 'Origin'}</TabsTrigger>
              <TabsTrigger value="processing">{language === 'el' ? 'Επεξεργασία' : 'Processing'}</TabsTrigger>
              <TabsTrigger value="distribution">{language === 'el' ? 'Διανομή' : 'Distribution'}</TabsTrigger>
            </TabsList>

            <TabsContent value="batch" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="batch-id">{language === 'el' ? 'Κωδικός Παρτίδας' : 'Batch ID'}</Label>
                  <Input id="batch-id" placeholder="BTH-2024-001" />
                </div>
                <div>
                  <Label htmlFor="production-date">{language === 'el' ? 'Ημερομηνία Παραγωγής' : 'Production Date'}</Label>
                  <Input id="production-date" type="date" />
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-3">{language === 'el' ? 'Στοιχεία Παρτίδας' : 'Batch Information'}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>{language === 'el' ? 'Ποσότητα:' : 'Quantity:'}</strong> 500kg
                  </div>
                  <div>
                    <strong>{language === 'el' ? 'Είδος:' : 'Species:'}</strong> {language === 'el' ? 'Τσιπούρα' : 'Sea Bream'}
                  </div>
                  <div>
                    <strong>{language === 'el' ? 'Ζώνη:' : 'Zone:'}</strong> FAO 37.2.1
                  </div>
                  <div>
                    <strong>{language === 'el' ? 'Μέθοδος:' : 'Method:'}</strong> {language === 'el' ? 'Τράτα' : 'Trawl'}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="origin" className="space-y-4">
              <div className="space-y-4">
                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="font-semibold">{language === 'el' ? 'Σημείο Αλίευσης' : 'Fishing Location'}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {language === 'el' 
                        ? 'Αιγαίο Πέλαγος - GPS: 37.9755°N, 23.7348°E' 
                        : 'Aegean Sea - GPS: 37.9755°N, 23.7348°E'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 mr-2 text-green-600" />
                      <span className="font-semibold">{language === 'el' ? 'Αλιευτικό Σκάφος' : 'Fishing Vessel'}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {language === 'el' 
                        ? 'Μ/Σ ΠΟΣΕΙΔΩΝ - Αδ. Αλιείας: GR-2024-001' 
                        : 'F/V POSEIDON - License: GR-2024-001'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="processing" className="space-y-4">
              <div className="space-y-3">
                {[
                  { step: language === 'el' ? 'Παραλαβή' : 'Reception', time: '08:30', status: 'completed' },
                  { step: language === 'el' ? 'Ταξινόμηση' : 'Sorting', time: '09:15', status: 'completed' },
                  { step: language === 'el' ? 'Φιλετάρισμα' : 'Filleting', time: '10:00', status: 'in-progress' },
                  { step: language === 'el' ? 'Συσκευασία' : 'Packaging', time: '11:30', status: 'pending' },
                ].map((process, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      {process.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600 mr-2" />}
                      {process.status === 'in-progress' && <Clock className="w-4 h-4 text-blue-600 mr-2" />}
                      {process.status === 'pending' && <Timer className="w-4 h-4 text-gray-400 mr-2" />}
                      <span className="font-medium">{process.step}</span>
                    </div>
                    <div className="text-sm text-gray-500">{process.time}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="distribution" className="space-y-4">
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <Truck className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600">
                  {language === 'el' 
                    ? 'Πληροφορίες διανομής θα εμφανιστούν μετά την ολοκλήρωση της επεξεργασίας'
                    : 'Distribution information will appear after processing completion'}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  const ColdChainPanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-700">{language === 'el' ? 'Ψυγείο A' : 'Cold Room A'}</p>
                <p className="text-2xl font-bold text-cyan-800">-1.8°C</p>
              </div>
              <Snowflake className="w-8 h-8 text-cyan-600" />
            </div>
            <Badge className="bg-green-100 text-green-800 text-xs mt-2">
              <CheckCircle className="w-3 h-3 mr-1" />
              {language === 'el' ? 'Φυσιολογικό' : 'Normal'}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">{language === 'el' ? 'Ψυγείο B' : 'Cold Room B'}</p>
                <p className="text-2xl font-bold text-blue-800">-2.2°C</p>
              </div>
              <Snowflake className="w-8 h-8 text-blue-600" />
            </div>
            <Badge className="bg-green-100 text-green-800 text-xs mt-2">
              <CheckCircle className="w-3 h-3 mr-1" />
              {language === 'el' ? 'Φυσιολογικό' : 'Normal'}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">{language === 'el' ? 'Καταψύκτης' : 'Freezer'}</p>
                <p className="text-2xl font-bold text-orange-800">-18.5°C</p>
              </div>
              <Snowflake className="w-8 h-8 text-orange-600" />
            </div>
            <Badge className="bg-yellow-100 text-yellow-800 text-xs mt-2">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {language === 'el' ? 'Προσοχή' : 'Warning'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            {language === 'el' ? 'Ιστορικό Θερμοκρασίας' : 'Temperature History'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>{language === 'el' ? 'Γράφημα θερμοκρασίας εδώ' : 'Temperature chart here'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="alerts">
          <AccordionTrigger>
            <div className="flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Ειδοποιήσεις Ψυχρής Αλυσίδας' : 'Cold Chain Alerts'}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {language === 'el' 
                    ? 'Καταψύκτης: Θερμοκρασία εκτός ορίων (10:45 AM)'
                    : 'Freezer: Temperature out of range (10:45 AM)'}
                </AlertDescription>
              </Alert>
              <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  {language === 'el' 
                    ? 'Ψυγείο A: Επαναφορά στις φυσιολογικές τιμές (09:30 AM)'
                    : 'Cold Room A: Restored to normal values (09:30 AM)'}
                </AlertDescription>
              </Alert>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  const YieldOptimizationPanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Scale className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">87.5%</div>
            <div className="text-sm text-gray-600">{language === 'el' ? 'Απόδοση Φιλέτου' : 'Fillet Yield'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">2.1%</div>
            <div className="text-sm text-gray-600">{language === 'el' ? 'Απώλειες' : 'Waste'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">+5.2%</div>
            <div className="text-sm text-gray-600">{language === 'el' ? 'Βελτίωση' : 'Improvement'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold">A+</div>
            <div className="text-sm text-gray-600">{language === 'el' ? 'Βαθμολογία' : 'Grade'}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'el' ? 'Ανάλυση Απόδοσης' : 'Yield Analysis'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{language === 'el' ? 'Φιλέτο Grade A' : 'Grade A Fillet'}</span>
                <span className="text-sm">65.2%</span>
              </div>
              <Progress value={65.2} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{language === 'el' ? 'Φιλέτο Grade B' : 'Grade B Fillet'}</span>
                <span className="text-sm">22.3%</span>
              </div>
              <Progress value={22.3} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{language === 'el' ? 'Παραπροϊόντα' : 'By-products'}</span>
                <span className="text-sm">10.4%</span>
              </div>
              <Progress value={10.4} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PackagingAutomationPanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              {language === 'el' ? 'Γραμμές Συσκευασίας' : 'Packaging Lines'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { line: 'Line 1', product: language === 'el' ? 'Φιλέτα Τσιπούρας' : 'Sea Bream Fillets', status: 'active', speed: '120 packs/min' },
                { line: 'Line 2', product: language === 'el' ? 'Ολόκληρα Ψάρια' : 'Whole Fish', status: 'active', speed: '85 packs/min' },
                { line: 'Line 3', product: language === 'el' ? 'Συσκευασία Vacuum' : 'Vacuum Packaging', status: 'maintenance', speed: '0 packs/min' },
              ].map((line, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      line.status === 'active' ? 'bg-green-500' : 
                      line.status === 'maintenance' ? 'bg-orange-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <div className="font-medium">{line.line}</div>
                      <div className="text-sm text-gray-500">{line.product}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{line.speed}</div>
                    <Badge className={
                      line.status === 'active' ? 'bg-green-100 text-green-800' :
                      line.status === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {line.status === 'active' ? (language === 'el' ? 'Ενεργή' : 'Active') :
                       line.status === 'maintenance' ? (language === 'el' ? 'Συντήρηση' : 'Maintenance') :
                       (language === 'el' ? 'Ανενεργή' : 'Inactive')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              {language === 'el' ? 'Αυτοματισμοί' : 'Automation Controls'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start">
                <Zap className="w-4 h-4 mr-2" />
                {language === 'el' ? 'Έναρξη Αυτόματης Συσκευασίας' : 'Start Auto Packaging'}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                {language === 'el' ? 'Ρυθμίσεις Γραμμής' : 'Line Settings'}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                {language === 'el' ? 'Παρακολούθηση Ποιότητας' : 'Quality Monitoring'}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                {language === 'el' ? 'Αναφορά Παραγωγής' : 'Production Report'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'el' ? 'Στατιστικά Παραγωγής' : 'Production Statistics'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">2,450</div>
              <div className="text-sm text-gray-600">{language === 'el' ? 'Πακέτα/Ώρα' : 'Packages/Hour'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">99.2%</div>
              <div className="text-sm text-gray-600">{language === 'el' ? 'Ποιότητα' : 'Quality'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">8.5h</div>
              <div className="text-sm text-gray-600">{language === 'el' ? 'Λειτουργία' : 'Operating'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">94%</div>
              <div className="text-sm text-gray-600">{language === 'el' ? 'Αποδοτικότητα' : 'Efficiency'}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const WasteManagementPanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">{language === 'el' ? 'Ανακύκλωση' : 'Recycled'}</p>
                <p className="text-2xl font-bold text-green-800">89.2%</p>
              </div>
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">{language === 'el' ? 'Βιο-αέριο' : 'Biogas'}</p>
                <p className="text-2xl font-bold text-blue-800">145m³</p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700">{language === 'el' ? 'Εξοικονόμηση' : 'Savings'}</p>
                <p className="text-2xl font-bold text-yellow-800">€3,450</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="w-5 h-5 mr-2" />
            {language === 'el' ? 'Βιώσιμη Διαχείριση Αποβλήτων' : 'Sustainable Waste Management'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Κατηγορίες Αποβλήτων' : 'Waste Categories'}</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{language === 'el' ? 'Οργανικά Απόβλητα' : 'Organic Waste'}</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{language === 'el' ? 'Συσκευασία' : 'Packaging'}</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{language === 'el' ? 'Λάδια & Λίπη' : 'Oils & Fats'}</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'el' ? 'Μέθοδοι Επεξεργασίας' : 'Processing Methods'}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm">{language === 'el' ? 'Κομποστοποίηση' : 'Composting'}</span>
                  <Badge className="bg-green-100 text-green-800">45%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span className="text-sm">{language === 'el' ? 'Βιοαέριο' : 'Biogas'}</span>
                  <Badge className="bg-blue-100 text-blue-800">30%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                  <span className="text-sm">{language === 'el' ? 'Ζωοτροφές' : 'Animal Feed'}</span>
                  <Badge className="bg-purple-100 text-purple-800">25%</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'el' ? 'Περιβαλλοντικές Μετρήσεις' : 'Environmental Metrics'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">-42%</div>
              <div className="text-sm text-gray-600">{language === 'el' ? 'CO₂ Μείωση' : 'CO₂ Reduction'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">2,340L</div>
              <div className="text-sm text-gray-600">{language === 'el' ? 'Νερό Εξοικ.' : 'Water Saved'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">850kWh</div>
              <div className="text-sm text-gray-600">{language === 'el' ? 'Ενέργεια από Βιοαέριο' : 'Biogas Energy'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">A+</div>
              <div className="text-sm text-gray-600">{language === 'el' ? 'Βαθμολογία Βιωσιμότητας' : 'Sustainability Score'}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'quality-control':
        return <QualityControlPanel />;
      case 'traceability':
        return <TraceabilityPanel />;
      case 'cold-chain':
        return <ColdChainPanel />;
      case 'yield-optimization':
        return <YieldOptimizationPanel />;
      case 'packaging-automation':
        return <PackagingAutomationPanel />;
      case 'waste-management':
        return <WasteManagementPanel />;
      default:
        return <QualityControlPanel />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fish className="w-6 h-6 mr-2" />
            {language === 'el' ? 'Προηγμένες Λειτουργίες Επεξεργασίας Θαλασσινών' : 'Advanced Seafood Processing Features'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  activeFeature === feature.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    {feature.icon}
                    <span className="font-semibold ml-2">{feature.title}</span>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="border-t pt-6">
            {renderFeatureContent()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeafoodProcessingFeatures;