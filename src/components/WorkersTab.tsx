import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Users, Plus, Trash2, Info, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Worker {
  id: string;
  hourlyRate: number;
  hours: number;
}

interface WorkersTabProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const WorkersTab: React.FC<WorkersTabProps> = ({ formData, updateFormData }) => {
  const { language } = useLanguage();
  const workers = formData.workers || [{ id: '1', hourlyRate: 4.5, hours: 1 }];
  const processingPhases = formData.processingPhases || [];

  // Check if any processing phases have their own workers
  const hasPhaseSpecificWorkers = processingPhases.some((phase: any) =>
    phase.workers && phase.workers.length > 0
  );

  const addWorker = () => {
    const newWorker = {
      id: Date.now().toString(),
      hourlyRate: 4.5,
      hours: 1
    };
    updateFormData({ workers: [...workers, newWorker] });
  };

  const removeWorker = (id: string) => {
    const updatedWorkers = workers.filter((worker: Worker) => worker.id !== id);
    updateFormData({ workers: updatedWorkers });
  };

  const updateWorker = (id: string, field: keyof Worker, value: number) => {
    const updatedWorkers = workers.map((worker: Worker) =>
      worker.id === id ? { ...worker, [field]: value } : worker
    );
    updateFormData({ workers: updatedWorkers });
  };

  const totalLaborCost = workers.reduce((total: number, worker: Worker) =>
    total + (worker.hourlyRate * worker.hours), 0
  );

  // Calculate total cost from phase-specific workers
  const phaseSpecificLaborCost = processingPhases.reduce((total: number, phase: any) => {
    if (phase.workers && phase.workers.length > 0) {
      return total + phase.workers.reduce((phaseTotal: number, worker: any) =>
        phaseTotal + (worker.hourlyRate * worker.hours), 0
      );
    }
    return total;
  }, 0);

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>{language === 'el' ? 'Γενικευμένοι Εργάτες' : 'General Workers'}</span>
              {hasPhaseSpecificWorkers && (
                <Badge variant="secondary">
                  {language === 'el' ? 'Συμπληρωματικό' : 'Supplementary'}
                </Badge>
              )}
            </div>
            <Button onClick={addWorker} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Προσθήκη Εργάτη' : 'Add Worker'}
            </Button>
          </CardTitle>
          {hasPhaseSpecificWorkers && (
            <div className="text-sm text-muted-foreground flex items-center space-x-2">
              <Info className="w-4 h-4" />
              <span>
                {language === 'el'
                  ? 'Κάποιες φάσεις επεξεργασίας έχουν δικούς τους εργάτες.'
                  : 'Some processing phases have their own workers.'}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {workers.map((worker: Worker, index: number) => (
            <div key={worker.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label>{language === 'el' ? `Εργάτης ${index + 1}` : `Worker ${index + 1}`}</Label>
              </div>
              
              <div>
                <Label htmlFor={`hourlyRate-${worker.id}`}>
                  {language === 'el' ? 'Ωριαίος Μισθός (€)' : 'Hourly Rate (€)'}
                </Label>
                <Input
                  id={`hourlyRate-${worker.id}`}
                  type="number"
                  step="0.01"
                  value={worker.hourlyRate}
                  onChange={(e) => updateWorker(worker.id, 'hourlyRate', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor={`hours-${worker.id}`}>
                  {language === 'el' ? 'Ώρες Εργασίας' : 'Hours Worked'}
                </Label>
                <Input
                  id={`hours-${worker.id}`}
                  type="number"
                  step="0.1"
                  value={worker.hours}
                  onChange={(e) => updateWorker(worker.id, 'hours', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="flex items-end">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => removeWorker(worker.id)}
                  disabled={workers.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  {language === 'el' ? 'Γενικευμένοι Εργάτες:' : 'General Workers:'}
                </span>
                <span className="text-xl font-bold text-blue-600">
                  €{totalLaborCost.toFixed(2)}
                </span>
              </div>
            </div>

            {hasPhaseSpecificWorkers && (
              <>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {language === 'el' ? 'Εργάτες Φάσεων:' : 'Phase Workers:'}
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      €{phaseSpecificLaborCost.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">
                      {language === 'el' ? 'Συνολικό Εργατικό Κόστος:' : 'Total Labor Cost:'}
                    </span>
                    <span className="text-2xl font-bold text-gray-800">
                      €{(totalLaborCost + phaseSpecificLaborCost).toFixed(2)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Phase-Specific Workers Summary */}
      {hasPhaseSpecificWorkers && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>{language === 'el' ? 'Εργάτες ανά Φάση Επεξεργασίας' : 'Workers by Processing Phase'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processingPhases.map((phase: any, index: number) => {
                if (!phase.workers || phase.workers.length === 0) return null;

                const phaseCost = phase.workers.reduce((total: number, worker: any) =>
                  total + (worker.hourlyRate * worker.hours), 0
                );

                return (
                  <div key={phase.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">{phase.name || `Φάση ${index + 1}`}</h4>
                      <Badge variant="outline">€{phaseCost.toFixed(2)}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {phase.workers.map((worker: any, workerIndex: number) => (
                        <div key={worker.id} className="text-sm bg-gray-50 p-2 rounded">
                          <div className="font-medium">
                            {language === 'el' ? `Εργάτης ${workerIndex + 1}` : `Worker ${workerIndex + 1}`}
                          </div>
                          <div className="text-muted-foreground">
                            €{worker.hourlyRate}/h × {worker.hours}h = €{(worker.hourlyRate * worker.hours).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkersTab;
