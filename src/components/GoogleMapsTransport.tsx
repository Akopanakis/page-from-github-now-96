
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Route, Navigation } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface GoogleMapsTransportProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const GoogleMapsTransport: React.FC<GoogleMapsTransportProps> = ({ formData, updateFormData }) => {
  const { t } = useLanguage();
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateRoute = async () => {
    if (!formData.originAddress || !formData.destinationAddress) {
      toast.error('Παρακαλώ εισάγετε και τις δύο διευθύνσεις');
      return;
    }

    setIsCalculating(true);
    
    try {
      // Simulate API call for route calculation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data - in real implementation, this would come from Google Maps API
      const mockDistance = 150; // km
      const mockTolls = 8.50; // euros
      
      updateFormData({
        distance: mockDistance,
        tolls: mockTolls,
        routeCalculated: true
      });
      
      toast.success('Η διαδρομή υπολογίστηκε επιτυχώς!');
    } catch (error) {
      toast.error('Σφάλμα στον υπολογισμό της διαδρομής');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>{t('transport.details')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="flex items-center space-x-2">
              <Navigation className="w-4 h-4" />
              <span>{t('origin.address')}</span>
            </Label>
            <Input
              type="text"
              placeholder="π.χ. Καβάλα, Ελλάδα"
              value={formData.originAddress || ''}
              onChange={(e) => updateFormData({ originAddress: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{t('destination.address')}</span>
            </Label>
            <Input
              type="text"
              placeholder="π.χ. Θεσσαλονίκη, Ελλάδα"
              value={formData.destinationAddress || ''}
              onChange={(e) => updateFormData({ destinationAddress: e.target.value })}
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={calculateRoute}
            disabled={isCalculating || !formData.originAddress || !formData.destinationAddress}
            className="flex items-center space-x-2"
          >
            <Route className="w-4 h-4" />
            <span>{isCalculating ? 'Υπολογισμός...' : t('calculate.route')}</span>
          </Button>
        </div>

        {formData.routeCalculated && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Αποτελέσματα Διαδρομής</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-600">Απόσταση:</span>
                <span className="font-semibold ml-2">{formData.distance} km</span>
              </div>
              <div>
                <span className="text-green-600">Διόδια:</span>
                <span className="font-semibold ml-2">{formData.tolls}€</span>
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
            <Label>{t('tolls.cost')}</Label>
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
