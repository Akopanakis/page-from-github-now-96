import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Route, Navigation, Clock, Euro } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface GoogleMapsTransportProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const GoogleMapsTransport: React.FC<GoogleMapsTransportProps> = ({ formData, updateFormData }) => {
  const { t, language } = useLanguage();
  const [isCalculating, setIsCalculating] = useState(false);
  const [suggestions, setSuggestions] = useState<{origin: string[], destination: string[]}>({
    origin: [],
    destination: []
  });

  // Greek cities for autocomplete suggestions
  const greekCities = [
    'Αθήνα, Ελλάδα', 'Θεσσαλονίκη, Ελλάδα', 'Πάτρα, Ελλάδα', 'Ηράκλειο, Ελλάδα',
    'Λάρισα, Ελλάδα', 'Βόλος, Ελλάδα', 'Ιωάννινα, Ελλάδα', 'Καβάλα, Ελλάδα',
    'Χανιά, Ελλάδα', 'Αγρίνιο, Ελλάδα', 'Νίκαια, Ελλάδα', 'Καλαμάτα, Ελλάδα',
    'Βέροια, Ελλάδα', 'Κομοτηνή, Ελλάδα', 'Σέρρες, Ελλάδα', 'Κοζάνη, Ελλάδα'
  ];

  const handleAddressChange = useCallback((field: 'origin' | 'destination', value: string) => {
    const fieldName = field === 'origin' ? 'originAddress' : 'destinationAddress';
    updateFormData({ [fieldName]: value });

    // Show suggestions
    if (value.length > 2) {
      const filtered = greekCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(prev => ({ ...prev, [field]: filtered }));
    } else {
      setSuggestions(prev => ({ ...prev, [field]: [] }));
    }
  }, [updateFormData]);

  const selectSuggestion = (field: 'origin' | 'destination', address: string) => {
    const fieldName = field === 'origin' ? 'originAddress' : 'destinationAddress';
    updateFormData({ [fieldName]: address });
    setSuggestions(prev => ({ ...prev, [field]: [] }));
  };

  const calculateRoute = async () => {
    if (!formData.originAddress || !formData.destinationAddress) {
      toast.error(
        language === 'el' 
          ? 'Παρακαλώ εισάγετε και τις δύο διευθύνσεις' 
          : 'Please enter both addresses'
      );
      return;
    }

    setIsCalculating(true);
    
    try {
      // Simulate more realistic route calculation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate distance based on common Greek routes
      const routes = {
        'Καβάλα-Θεσσαλονίκη': { distance: 162, tolls: 8.50, duration: '1.5 ώρες' },
        'Αθήνα-Θεσσαλονίκη': { distance: 502, tolls: 22.40, duration: '5 ώρες' },
        'Αθήνα-Πάτρα': { distance: 215, tolls: 12.20, duration: '2.5 ώρες' },
        'Θεσσαλονίκη-Λάρισα': { distance: 155, tolls: 6.80, duration: '1.5 ώρες' },
        'default': { distance: 180, tolls: 9.50, duration: '2 ώρες' }
      };

      // Simple route matching
      const origin = formData.originAddress.split(',')[0];
      const destination = formData.destinationAddress.split(',')[0];
      const routeKey = `${origin}-${destination}`;
      const reverseRouteKey = `${destination}-${origin}`;
      
      const routeData = routes[routeKey as keyof typeof routes] || 
                      routes[reverseRouteKey as keyof typeof routes] || 
                      routes.default;
      
      updateFormData({
        distance: routeData.distance,
        tolls: routeData.tolls,
        routeCalculated: true,
        estimatedDuration: routeData.duration
      });
      
      toast.success(
        language === 'el' 
          ? 'Η διαδρομή υπολογίστηκε επιτυχώς!' 
          : 'Route calculated successfully!'
      );
    } catch (error) {
      toast.error(
        language === 'el' 
          ? 'Σφάλμα στον υπολογισμό της διαδρομής' 
          : 'Error calculating route'
      );
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>{language === 'el' ? 'Στοιχεία Μεταφοράς' : 'Transport Details'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Label className="flex items-center space-x-2">
              <Navigation className="w-4 h-4" />
              <span>{t('origin.address')}</span>
            </Label>
            <Input
              type="text"
              placeholder={language === 'el' ? 'π.χ. Καβάλα, Ελλάδα' : 'e.g. Kavala, Greece'}
              value={formData.originAddress || ''}
              onChange={(e) => handleAddressChange('origin', e.target.value)}
              className="mt-2"
            />
            {suggestions.origin.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-slate-200 rounded-md shadow-lg mt-1">
                {suggestions.origin.map((address, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                    onClick={() => selectSuggestion('origin', address)}
                  >
                    {address}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <Label className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{t('destination.address')}</span>
            </Label>
            <Input
              type="text"
              placeholder={language === 'el' ? 'π.χ. Θεσσαλονίκη, Ελλάδα' : 'e.g. Thessaloniki, Greece'}
              value={formData.destinationAddress || ''}
              onChange={(e) => handleAddressChange('destination', e.target.value)}
              className="mt-2"
            />
            {suggestions.destination.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-slate-200 rounded-md shadow-lg mt-1">
                {suggestions.destination.map((address, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                    onClick={() => selectSuggestion('destination', address)}
                  >
                    {address}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={calculateRoute}
            disabled={isCalculating || !formData.originAddress || !formData.destinationAddress}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <Route className="w-4 h-4" />
            <span>
              {isCalculating 
                ? (language === 'el' ? 'Υπολογισμός...' : 'Calculating...') 
                : t('calculate.route')
              }
            </span>
          </Button>
        </div>

        {formData.routeCalculated && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
              <Route className="w-4 h-4" />
              <span>{language === 'el' ? 'Αποτελέσματα Διαδρομής' : 'Route Results'}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <div>
                  <span className="text-green-600">{language === 'el' ? 'Απόσταση:' : 'Distance:'}</span>
                  <span className="font-semibold ml-2">{formData.distance} km</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Euro className="w-4 h-4 text-green-600" />
                <div>
                  <span className="text-green-600">{language === 'el' ? 'Διόδια:' : 'Tolls:'}</span>
                  <span className="font-semibold ml-2">{formData.tolls}€</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-600" />
                <div>
                  <span className="text-green-600">{language === 'el' ? 'Διάρκεια:' : 'Duration:'}</span>
                  <span className="font-semibold ml-2">{formData.estimatedDuration}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>{t('distance')}</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="0.0"
              value={formData.distance || ''}
              onChange={(e) => updateFormData({ distance: parseFloat(e.target.value) || 0 })}
              className="mt-2"
            />
          </div>

          <div>
            <Label>{t('fuel.cost')}</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.fuelCost || ''}
              onChange={(e) => updateFormData({ fuelCost: parseFloat(e.target.value) || 0 })}
              className="mt-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>{language === 'el' ? 'Διόδια (€)' : 'Tolls (€)'}</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.tolls || ''}
              onChange={(e) => updateFormData({ tolls: parseFloat(e.target.value) || 0 })}
              className="mt-2"
            />
          </div>

          <div>
            <Label>{t('parking.cost')}</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.parkingCost || ''}
              onChange={(e) => updateFormData({ parkingCost: parseFloat(e.target.value) || 0 })}
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMapsTransport;
