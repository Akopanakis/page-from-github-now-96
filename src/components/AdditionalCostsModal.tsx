
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Zap, Wrench, Shield, Home, Phone, FileText } from 'lucide-react';

interface AdditionalCostsModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  updateFormData: (updates: any) => void;
}

const AdditionalCostsModal: React.FC<AdditionalCostsModalProps> = ({
  isOpen,
  onClose,
  formData,
  updateFormData
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Επιπλέον Κόστη</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Ηλεκτρικό Ρεύμα (€)</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.electricityCost || ''}
              onChange={(e) => updateFormData({ electricityCost: parseFloat(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2">
              <Wrench className="w-4 h-4" />
              <span>Εξοπλισμός/Συντήρηση (€)</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.equipmentCost || ''}
              onChange={(e) => updateFormData({ equipmentCost: parseFloat(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Ασφάλιστρα (€)</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.insuranceCost || ''}
              onChange={(e) => updateFormData({ insuranceCost: parseFloat(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Ενοίκιο/Στέγαση (€)</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.rentCost || ''}
              onChange={(e) => updateFormData({ rentCost: parseFloat(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Τηλεπικοινωνίες (€)</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.communicationCost || ''}
              onChange={(e) => updateFormData({ communicationCost: parseFloat(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Άλλα Κόστη (€)</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.otherCosts || ''}
              onChange={(e) => updateFormData({ otherCosts: parseFloat(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>
            <Plus className="w-4 h-4 mr-2" />
            Εφαρμογή
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdditionalCostsModal;
