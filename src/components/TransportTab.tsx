
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Route, Fuel, Coins, Car } from 'lucide-react';

interface TransportTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const TransportTab: React.FC<TransportTabProps> = ({ formData, updateFormData }) => {
  const totalTransportCost = 
    (formData.distance || 0) * (formData.fuelCost || 0) + 
    (formData.tolls || 0) + 
    (formData.parkingCost || 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Route className="w-5 h-5" />
          <span>Στοιχεία Μεταφοράς</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="flex items-center space-x-2">
              <Route className="w-4 h-4" />
              <span>Απόσταση (km)</span>
            </Label>
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
            <Label className="flex items-center space-x-2">
              <Fuel className="w-4 h-4" />
              <span>Κόστος Καυσίμου (€/km)</span>
            </Label>
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
            <Label className="flex items-center space-x-2">
              <Coins className="w-4 h-4" />
              <span>Κόστος Διοδίων (€)</span>
            </Label>
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
            <Label className="flex items-center space-x-2">
              <Car className="w-4 h-4" />
              <span>Κόστος Στάθμευσης (€)</span>
            </Label>
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

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">Συνολικό Κόστος Μεταφοράς:</span>
            <span className="text-sm font-bold text-blue-600">{totalTransportCost.toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportTab;
