
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Truck, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TransportData {
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  fuelCost: number;
  tolls: number;
}

const GoogleMapsTransport: React.FC = () => {
  const { language } = useLanguage();
  const [transportData, setTransportData] = useState<TransportData>({
    origin: '',
    destination: '',
    distance: 0,
    duration: 0,
    fuelCost: 0,
    tolls: 0
  });

  const calculateTransportCost = () => {
    // Mock calculation - in real implementation would use Google Maps API
    const mockDistance = Math.random() * 500 + 50; // 50-550 km
    const mockDuration = mockDistance * 1.2; // roughly 1.2 hours per 100km
    const mockFuelCost = mockDistance * 0.15; // €0.15 per km
    const mockTolls = mockDistance > 200 ? mockDistance * 0.05 : 0; // tolls for long distances

    setTransportData(prev => ({
      ...prev,
      distance: mockDistance,
      duration: mockDuration,
      fuelCost: mockFuelCost,
      tolls: mockTolls
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="w-5 h-5" />
          <span>
            {language === 'el' ? 'Υπολογισμός Μεταφοράς' : 'Transport Calculation'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="origin">
              {language === 'el' ? 'Σημείο Αναχώρησης' : 'Origin'}
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="origin"
                placeholder={language === 'el' ? 'π.χ. Αθήνα, Ελλάδα' : 'e.g. Athens, Greece'}
                value={transportData.origin}
                onChange={(e) => setTransportData(prev => ({ ...prev, origin: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">
              {language === 'el' ? 'Προορισμός' : 'Destination'}
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="destination"
                placeholder={language === 'el' ? 'π.χ. Θεσσαλονίκη, Ελλάδα' : 'e.g. Thessaloniki, Greece'}
                value={transportData.destination}
                onChange={(e) => setTransportData(prev => ({ ...prev, destination: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={calculateTransportCost} 
          className="w-full"
          disabled={!transportData.origin || !transportData.destination}
        >
          <Calculator className="w-4 h-4 mr-2" />
          {language === 'el' ? 'Υπολογισμός Διαδρομής' : 'Calculate Route'}
        </Button>

        {transportData.distance > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {transportData.distance.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'el' ? 'Χιλιόμετρα' : 'Kilometers'}
              </div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {(transportData.duration / 60).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'el' ? 'Ώρες' : 'Hours'}
              </div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                €{transportData.fuelCost.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'el' ? 'Καύσιμα' : 'Fuel'}
              </div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                €{transportData.tolls.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'el' ? 'Διόδια' : 'Tolls'}
              </div>
            </div>
          </div>
        )}

        {transportData.distance > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                {language === 'el' ? 'Συνολικό Κόστος Μεταφοράς:' : 'Total Transport Cost:'}
              </span>
              <span className="text-xl font-bold text-blue-600">
                €{(transportData.fuelCost + transportData.tolls).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleMapsTransport;
