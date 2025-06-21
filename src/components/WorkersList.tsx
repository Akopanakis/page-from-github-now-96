
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Users, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Worker {
  id: string;
  hourlyRate: number;
  hours: number;
}

interface WorkersListProps {
  workers: Worker[];
  updateWorkers: (workers: Worker[]) => void;
}

const WorkersList: React.FC<WorkersListProps> = ({ workers, updateWorkers }) => {
  const { t } = useLanguage();

  const addWorker = () => {
    const newWorker: Worker = {
      id: Date.now().toString(),
      hourlyRate: 4.5,
      hours: 1
    };
    updateWorkers([...workers, newWorker]);
  };

  const removeWorker = (id: string) => {
    updateWorkers(workers.filter(w => w.id !== id));
  };

  const updateWorker = (id: string, field: keyof Worker, value: number) => {
    updateWorkers(workers.map(w => 
      w.id === id ? { ...w, [field]: value } : w
    ));
  };

  const totalLaborCost = workers.reduce((sum, worker) => 
    sum + (worker.hourlyRate * worker.hours), 0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>{t('workers')}</span>
          </div>
          <Button onClick={addWorker} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {t('add.worker')}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {workers.map((worker, index) => (
          <div key={worker.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
            <div>
              <Label>{t('worker.hourly.rate')} #{index + 1}</Label>
              <Input
                type="number"
                step="0.01"
                value={worker.hourlyRate}
                onChange={(e) => updateWorker(worker.id, 'hourlyRate', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>{t('worker.hours')}</Label>
              <Input
                type="number"
                step="0.1"
                value={worker.hours}
                onChange={(e) => updateWorker(worker.id, 'hours', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => removeWorker(worker.id)}
                disabled={workers.length === 1}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t('remove.worker')}
              </Button>
            </div>
          </div>
        ))}
        
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">Συνολικό Κόστος Εργασίας:</span>
            <span className="text-sm font-bold text-blue-600">{totalLaborCost.toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkersList;
