
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Ship,
  MapPin,
  Fuel,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Users,
  BarChart3,
  TrendingUp,
  Navigation,
  Anchor,
  Waves,
  Fish,
  Thermometer,
  Battery,
  Radio,
  Shield,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Vessel {
  id: string;
  name: string;
  type: 'trawler' | 'purse_seiner' | 'longline' | 'gillnet';
  status: 'active' | 'maintenance' | 'docked' | 'offline';
  location: { lat: number; lng: number; name: string };
  captain: string;
  crew: number;
  length: number;
  tonnage: number;
  fuelLevel: number;
  lastMaintenance: string;
  nextMaintenance: string;
  catches: { species: string; weight: number; value: number }[];
  equipment: { name: string; status: string; lastCheck: string }[];
}

const FleetManagement: React.FC = () => {
  const { language } = useLanguage();
  const [vessels, setVessels] = useState<Vessel[]>([
    {
      id: 'VS001',
      name: 'Αιγαίο Αστέρι',
      type: 'trawler',
      status: 'active',
      location: { lat: 37.9755, lng: 23.7348, name: 'Σαρωνικός Κόλπος' },
      captain: 'Γιάννης Παπαδόπουλος',
      crew: 8,
      length: 24.5,
      tonnage: 85,
      fuelLevel: 75,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      catches: [
        { species: 'Τσιπούρα', weight: 45, value: 850 },
        { species: 'Λαβράκι', weight: 32, value: 960 },
        { species: 'Μπαρμπούνι', weight: 18, value: 540 }
      ],
      equipment: [
        { name: 'GPS Navigator', status: 'operational', lastCheck: '2024-01-20' },
        { name: 'Fish Finder', status: 'operational', lastCheck: '2024-01-18' },
        { name: 'Radio VHF', status: 'maintenance', lastCheck: '2024-01-10' }
      ]
    },
    {
      id: 'VS002',
      name: 'Ιόνιος Δύναμη',
      type: 'purse_seiner',
      status: 'docked',
      location: { lat: 39.6401, lng: 19.9225, name: 'Κέρκυρα' },
      captain: 'Μιχάλης Κωνσταντίνου',
      crew: 12,
      length: 32.8,
      tonnage: 120,
      fuelLevel: 95,
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01',
      catches: [
        { species: 'Σαρδέλα', weight: 280, value: 1680 },
        { species: 'Γόπα', weight: 150, value: 750 },
        { species: 'Κολιός', weight: 95, value: 570 }
      ],
      equipment: [
        { name: 'Hydraulic Winch', status: 'operational', lastCheck: '2024-02-01' },
        { name: 'Net Sonar', status: 'operational', lastCheck: '2024-01-25' },
        { name: 'Ice Machine', status: 'operational', lastCheck: '2024-01-28' }
      ]
    }
  ]);

  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'docked': return 'bg-blue-100 text-blue-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVesselTypeIcon = (type: string) => {
    switch (type) {
      case 'trawler': return <Ship className="w-5 h-5" />;
      case 'purse_seiner': return <Navigation className="w-5 h-5" />;
      case 'longline': return <Anchor className="w-5 h-5" />;
      case 'gillnet': return <Waves className="w-5 h-5" />;
      default: return <Ship className="w-5 h-5" />;
    }
  };

  const totalFleetValue = vessels.reduce((sum, vessel) => 
    sum + vessel.catches.reduce((catchSum, catch_) => catchSum + catch_.value, 0), 0
  );

  const totalCatches = vessels.reduce((sum, vessel) => 
    sum + vessel.catches.reduce((catchSum, catch_) => catchSum + catch_.weight, 0), 0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Ship className="w-6 h-6" />
            {language === 'el' ? 'Διαχείριση Στόλου' : 'Fleet Management'}
          </h2>
          <p className="text-gray-600 mt-1">
            {language === 'el' 
              ? 'Παρακολούθηση και διαχείριση αλιευτικών σκαφών'
              : 'Track and manage fishing vessels'
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {language === 'el' ? 'Χάρτης' : 'Map View'}
          </Button>
          <Button className="flex items-center gap-2">
            <Ship className="w-4 h-4" />
            {language === 'el' ? 'Προσθήκη Σκάφους' : 'Add Vessel'}
          </Button>
        </div>
      </div>

      {/* Fleet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Ενεργά Σκάφη' : 'Active Vessels'}
                </p>
                <p className="text-2xl font-bold">
                  {vessels.filter(v => v.status === 'active').length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Ship className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Συνολικές Αλιείες' : 'Total Catches'}
                </p>
                <p className="text-2xl font-bold">{totalCatches}kg</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Fish className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Αξία Αλιείας' : 'Catch Value'}
                </p>
                <p className="text-2xl font-bold">€{totalFleetValue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Συντήρηση' : 'Maintenance Due'}
                </p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Wrench className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vessels List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="w-5 h-5" />
            {language === 'el' ? 'Στόλος Σκαφών' : 'Vessel Fleet'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vessels.map((vessel) => (
              <div 
                key={vessel.id}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedVessel(vessel)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getVesselTypeIcon(vessel.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{vessel.name}</h3>
                      <p className="text-sm text-gray-600">
                        {language === 'el' ? 'Καπετάνιος' : 'Captain'}: {vessel.captain}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{vessel.location.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={getStatusColor(vessel.status)}>
                      {vessel.status === 'active' && (language === 'el' ? 'Ενεργό' : 'Active')}
                      {vessel.status === 'docked' && (language === 'el' ? 'Δεμένο' : 'Docked')}
                      {vessel.status === 'maintenance' && (language === 'el' ? 'Συντήρηση' : 'Maintenance')}
                      {vessel.status === 'offline' && (language === 'el' ? 'Εκτός Λειτουργίας' : 'Offline')}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Fuel className="w-4 h-4" />
                      {vessel.fuelLevel}%
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {vessel.crew}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vessel Details Modal */}
      {selectedVessel && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-3">
              {getVesselTypeIcon(selectedVessel.type)}
              <div>
                <CardTitle>{selectedVessel.name}</CardTitle>
                <p className="text-sm text-gray-600">{selectedVessel.id}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedVessel(null)}
            >
              ✕
            </Button>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">
                  {language === 'el' ? 'Επισκόπηση' : 'Overview'}
                </TabsTrigger>
                <TabsTrigger value="catches">
                  {language === 'el' ? 'Αλιείες' : 'Catches'}
                </TabsTrigger>
                <TabsTrigger value="equipment">
                  {language === 'el' ? 'Εξοπλισμός' : 'Equipment'}
                </TabsTrigger>
                <TabsTrigger value="maintenance">
                  {language === 'el' ? 'Συντήρηση' : 'Maintenance'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">
                      {language === 'el' ? 'Στοιχεία Σκάφους' : 'Vessel Information'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {language === 'el' ? 'Μήκος' : 'Length'}:
                        </span>
                        <span>{selectedVessel.length}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {language === 'el' ? 'Χωρητικότητα' : 'Tonnage'}:
                        </span>
                        <span>{selectedVessel.tonnage}t</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {language === 'el' ? 'Πλήρωμα' : 'Crew'}:
                        </span>
                        <span>{selectedVessel.crew} άτομα</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">
                      {language === 'el' ? 'Τρέχουσα Κατάσταση' : 'Current Status'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          {language === 'el' ? 'Καύσιμα' : 'Fuel'}:
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${selectedVessel.fuelLevel}%` }}
                            />
                          </div>
                          <span>{selectedVessel.fuelLevel}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {language === 'el' ? 'Τοποθεσία' : 'Location'}:
                        </span>
                        <span>{selectedVessel.location.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="catches" className="space-y-4">
                <h4 className="font-semibold">
                  {language === 'el' ? 'Πρόσφατες Αλιείες' : 'Recent Catches'}
                </h4>
                <div className="space-y-3">
                  {selectedVessel.catches.map((catch_, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Fish className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{catch_.species}</div>
                          <div className="text-sm text-gray-600">{catch_.weight}kg</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          €{catch_.value.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          €{(catch_.value / catch_.weight).toFixed(2)}/kg
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="equipment" className="space-y-4">
                <h4 className="font-semibold">
                  {language === 'el' ? 'Εξοπλισμός Σκάφους' : 'Vessel Equipment'}
                </h4>
                <div className="space-y-3">
                  {selectedVessel.equipment.map((equipment, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          equipment.status === 'operational' ? 'bg-green-100' : 'bg-orange-100'
                        }`}>
                          {equipment.status === 'operational' ? 
                            <CheckCircle className="w-4 h-4 text-green-600" /> :
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                          }
                        </div>
                        <div>
                          <div className="font-medium">{equipment.name}</div>
                          <div className="text-sm text-gray-600">
                            {language === 'el' ? 'Τελευταίος έλεγχος' : 'Last check'}: {equipment.lastCheck}
                          </div>
                        </div>
                      </div>
                      <Badge className={
                        equipment.status === 'operational' ? 
                        'bg-green-100 text-green-800' : 
                        'bg-orange-100 text-orange-800'
                      }>
                        {equipment.status === 'operational' ? 
                          (language === 'el' ? 'Λειτουργικό' : 'Operational') :
                          (language === 'el' ? 'Συντήρηση' : 'Maintenance')
                        }
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === 'el' ? 'Τελευταία Συντήρηση' : 'Last Maintenance'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-lg font-semibold">
                        <Calendar className="w-5 h-5" />
                        {selectedVessel.lastMaintenance}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === 'el' ? 'Επόμενη Συντήρηση' : 'Next Maintenance'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-lg font-semibold text-orange-600">
                        <Clock className="w-5 h-5" />
                        {selectedVessel.nextMaintenance}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FleetManagement;
