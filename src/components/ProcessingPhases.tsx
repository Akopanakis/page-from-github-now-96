import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Minus, 
  Settings, 
  Users, 
  Clock, 
  Thermometer,
  Scissors,
  Package,
  Trash2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProcessingPhase, Worker } from '@/utils/calc';

interface ProcessingPhasesProps {
  formData: any;
  updateFormData: (data: any) => void;
  isPremium?: boolean;
}

const PHASE_TYPES = [
  { value: 'cleaning', label: 'Καθάρισμα', icon: Scissors, defaultLoss: 10 },
  { value: 'cutting', label: 'Κοπή/Φιλέτο', icon: Scissors, defaultLoss: 5 },
  { value: 'grilling', label: 'Ψήσιμο', icon: Thermometer, defaultLoss: 8 },
  { value: 'freezing', label: 'Κατάψυξη', icon: Thermometer, defaultLoss: 2 },
  { value: 'glazing', label: 'Επίπαγος', icon: Package, defaultLoss: -3 }, // Negative because it adds weight
  { value: 'packaging', label: 'Πακετάρισμα', icon: Package, defaultLoss: 1 },
  { value: 'sorting', label: 'Διαλογή', icon: Settings, defaultLoss: 3 },
];

const ProcessingPhases: React.FC<ProcessingPhasesProps> = ({ formData, updateFormData, isPremium }) => {
  const { language } = useLanguage();
  const [useGeneralizedWorkers, setUseGeneralizedWorkers] = useState(true);

  const processingPhases = formData.processingPhases || [];
  const workers = formData.workers || [{ id: '1', hourlyRate: 5, hours: 1 }];

  const handlePhaseChange = (phaseId: string, field: string, value: any) => {
    const updatedPhases = processingPhases.map((phase: ProcessingPhase) =>
      phase.id === phaseId ? { ...phase, [field]: value } : phase
    );
    updateFormData({ processingPhases: updatedPhases });
  };

  const addPhase = () => {
    const newPhase: ProcessingPhase = {
      id: Date.now().toString(),
      name: 'Νέα Φάση',
      lossPercentage: 0,
      costPerKg: 0,
      duration: 60, // minutes
      temperature: 0,
      description: '',
      workers: useGeneralizedWorkers ? [] : [{ id: Date.now().toString(), hourlyRate: 5, hours: 1 }]
    };
    updateFormData({ processingPhases: [...processingPhases, newPhase] });
  };

  const removePhase = (phaseId: string) => {
    const updatedPhases = processingPhases.filter((phase: ProcessingPhase) => phase.id !== phaseId);
    updateFormData({ processingPhases: updatedPhases });
  };

  const addWorkerToPhase = (phaseId: string) => {
    const updatedPhases = processingPhases.map((phase: ProcessingPhase) => {
      if (phase.id === phaseId) {
        const newWorker = {
          id: Date.now().toString(),
          hourlyRate: 5,
          hours: 1
        };
        return { 
          ...phase, 
          workers: [...(phase.workers || []), newWorker] 
        };
      }
      return phase;
    });
    updateFormData({ processingPhases: updatedPhases });
  };

  const removeWorkerFromPhase = (phaseId: string, workerId: string) => {
    const updatedPhases = processingPhases.map((phase: ProcessingPhase) => {
      if (phase.id === phaseId) {
        return { 
          ...phase, 
          workers: (phase.workers || []).filter((w: Worker) => w.id !== workerId)
        };
      }
      return phase;
    });
    updateFormData({ processingPhases: updatedPhases });
  };

  const updatePhaseWorker = (phaseId: string, workerId: string, field: string, value: any) => {
    const updatedPhases = processingPhases.map((phase: ProcessingPhase) => {
      if (phase.id === phaseId) {
        const updatedWorkers = (phase.workers || []).map((worker: Worker) =>
          worker.id === workerId ? { ...worker, [field]: value } : worker
        );
        return { ...phase, workers: updatedWorkers };
      }
      return phase;
    });
    updateFormData({ processingPhases: updatedPhases });
  };

  const applyPresetPhase = (phaseId: string, preset: typeof PHASE_TYPES[0]) => {
    handlePhaseChange(phaseId, 'name', preset.label);
    handlePhaseChange(phaseId, 'lossPercentage', preset.defaultLoss);
  };

  const calculateTotalLoss = () => {
    return processingPhases.reduce((total: number, phase: ProcessingPhase) => total + (phase.lossPercentage || 0), 0);
  };

  const calculateTotalCost = () => {
    return processingPhases.reduce((total: number, phase: ProcessingPhase) => {
      const phaseCost = (phase.costPerKg || 0) * (formData.weight || 0);
      const workerCosts = useGeneralizedWorkers 
        ? 0 
        : (phase.workers || []).reduce((sum: number, worker: Worker) => 
            sum + (worker.hourlyRate || 0) * (worker.hours || 0), 0);
      return total + phaseCost + workerCosts;
    }, 0);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>{language === 'el' ? 'Φάσεις Επεξεργασίας' : 'Processing Phases'}</span>
            <Badge variant="secondary" className="ml-2">
              {language === 'el' ? 'Προαιρετικό' : 'Optional'}
            </Badge>
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="worker-mode"
                checked={useGeneralizedWorkers}
                onCheckedChange={setUseGeneralizedWorkers}
              />
              <Label htmlFor="worker-mode" className="text-sm">
                {language === 'el' ? 'Γενικευμένοι Εργάτες' : 'General Workers'}
              </Label>
            </div>
            <Button onClick={addPhase} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Προσθήκη Φάσης' : 'Add Phase'}
            </Button>
          </div>
        </div>
        {processingPhases.length > 0 && (
          <div className="text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>
                {language === 'el' ? 'Συνολική Απώλεια:' : 'Total Loss:'} 
                <Badge variant={calculateTotalLoss() < 0 ? "default" : "destructive"} className="ml-2">
                  {calculateTotalLoss().toFixed(1)}%
                </Badge>
              </span>
              <span>
                {language === 'el' ? 'Συνολικό Κόστος:' : 'Total Cost:'} 
                <Badge variant="outline" className="ml-2">
                  €{calculateTotalCost().toFixed(2)}
                </Badge>
              </span>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {processingPhases.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="mb-4">
              {language === 'el' 
                ? 'Δεν έχουν προστεθεί φάσεις επεξεργασίας.'
                : 'No processing phases added.'}
            </p>
            <p className="text-sm">
              {language === 'el'
                ? 'Οι φάσεις επεξεργασίας είναι προαιρετικές και βοηθούν στον ακριβή υπολογισμό των απωλειών και κόστους.'
                : 'Processing phases are optional and help calculate precise losses and costs.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {processingPhases.map((phase: ProcessingPhase, index: number) => (
              <div key={phase.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Φάση {index + 1}</Badge>
                    <Select
                      value=""
                      onValueChange={(value) => {
                        const preset = PHASE_TYPES.find(p => p.value === value);
                        if (preset) applyPresetPhase(phase.id, preset);
                      }}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Επιλογή προτύπου" />
                      </SelectTrigger>
                      <SelectContent>
                        {PHASE_TYPES.map((type) => {
                          const Icon = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center space-x-2">
                                <Icon className="w-4 h-4" />
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removePhase(phase.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`phase-name-${phase.id}`}>
                      {language === 'el' ? 'Όνομα Φάσης' : 'Phase Name'}
                    </Label>
                    <Input
                      id={`phase-name-${phase.id}`}
                      value={phase.name || ''}
                      onChange={(e) => handlePhaseChange(phase.id, 'name', e.target.value)}
                      placeholder={language === 'el' ? 'π.χ. Καθάρισμα' : 'e.g. Cleaning'}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`phase-loss-${phase.id}`}>
                      <div className="flex items-center space-x-1">
                        <span>{language === 'el' ? 'Απώλεια/Κέρδος (%)' : 'Loss/Gain (%)'}</span>
                        <Badge variant="secondary" className="text-xs">
                          {phase.lossPercentage < 0 ? '+' : '-'}{Math.abs(phase.lossPercentage || 0)}%
                        </Badge>
                      </div>
                    </Label>
                    <Input
                      id={`phase-loss-${phase.id}`}
                      type="number"
                      step="0.1"
                      value={phase.lossPercentage || ''}
                      onChange={(e) => handlePhaseChange(phase.id, 'lossPercentage', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`phase-duration-${phase.id}`}>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{language === 'el' ? 'Διάρκεια (λεπτά)' : 'Duration (minutes)'}</span>
                      </div>
                    </Label>
                    <Input
                      id={`phase-duration-${phase.id}`}
                      type="number"
                      value={phase.duration || ''}
                      onChange={(e) => handlePhaseChange(phase.id, 'duration', parseInt(e.target.value) || 0)}
                      placeholder="60"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`phase-cost-${phase.id}`}>
                      {language === 'el' ? 'Κόστος/kg (€)' : 'Cost/kg (€)'}
                    </Label>
                    <Input
                      id={`phase-cost-${phase.id}`}
                      type="number"
                      step="0.01"
                      value={phase.costPerKg || ''}
                      onChange={(e) => handlePhaseChange(phase.id, 'costPerKg', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Workers section */}
                {!useGeneralizedWorkers && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{language === 'el' ? 'Εργάτες Φάσης' : 'Phase Workers'}</span>
                        </Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addWorkerToPhase(phase.id)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {language === 'el' ? 'Εργάτης' : 'Worker'}
                        </Button>
                      </div>
                      
                      {(phase.workers || []).map((worker: Worker, workerIndex: number) => (
                        <div key={worker.id} className="grid grid-cols-3 gap-2 items-end bg-gray-50 p-3 rounded">
                          <div>
                            <Label className="text-xs">
                              {language === 'el' ? 'Ωρομίσθιο (€)' : 'Hourly Rate (€)'}
                            </Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={worker.hourlyRate || ''}
                              onChange={(e) => updatePhaseWorker(phase.id, worker.id, 'hourlyRate', parseFloat(e.target.value) || 0)}
                              placeholder="5.0"
                              className="h-8"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">
                              {language === 'el' ? 'Ώρες' : 'Hours'}
                            </Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={worker.hours || ''}
                              onChange={(e) => updatePhaseWorker(phase.id, worker.id, 'hours', parseFloat(e.target.value) || 0)}
                              placeholder="1"
                              className="h-8"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeWorkerFromPhase(phase.id, worker.id)}
                            className="text-red-600 hover:text-red-700 h-8"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Example explanation */}
        {processingPhases.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">
              {language === 'el' ? '💡 Παράδειγμα Υπολογισμού' : '💡 Calculation Example'}
            </h4>
            <p className="text-sm text-blue-700">
              {language === 'el'
                ? 'Στο θράψαλο: Καθάρισμα -10% αλλά Επίπαγος +3% = Συνολική απώλεια -7%. Η επίπαγος καλύπτει τις απώλειες!'
                : 'For sea bream: Cleaning -10% but Glazing +3% = Total loss -7%. Glazing covers the losses!'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProcessingPhases;
