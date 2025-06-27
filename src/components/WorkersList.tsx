import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Users, Plus, Trash2, TrendingUp } from "lucide-react";
import EmptyState from "@/components/ui/empty-state";
import { useLanguage } from "@/contexts/LanguageContext";

interface Worker {
  id: string;
  hourlyRate: number;
  hours: number;
}

interface WorkersListProps {
  workers: Worker[];
  updateWorkers: (workers: Worker[]) => void;
}

const WorkersList: React.FC<WorkersListProps> = ({
  workers,
  updateWorkers,
}) => {
  const { t } = useLanguage();

  const addWorker = () => {
    const newWorker: Worker = {
      id: Date.now().toString(),
      hourlyRate: 4.5,
      hours: 1,
    };
    updateWorkers([...workers, newWorker]);
  };

  const removeWorker = (id: string) => {
    updateWorkers(workers.filter((w) => w.id !== id));
  };

  const updateWorker = (id: string, field: keyof Worker, value: number) => {
    updateWorkers(
      workers.map((w) => (w.id === id ? { ...w, [field]: value } : w)),
    );
  };

  const totalLaborCost = workers.reduce(
    (sum, worker) => sum + worker.hourlyRate * worker.hours,
    0,
  );

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-slate-800">{t("workers")}</span>
          </div>
          <Button
            onClick={addWorker}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("add.worker")}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {workers.length === 0 && (
          <EmptyState
            message="Ξεκινήστε προσθέτοντας εργαζόμενους"
            icon={<Users className="w-8 h-8 mb-2 text-gray-400" />}
          />
        )}
        {workers.map((worker, index) => (
          <div
            key={worker.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg shadow-sm"
          >
            <div>
              <Label className="text-slate-700 font-medium">
                {t("worker.hourly.rate")} #{index + 1}
              </Label>
              <Input
                type="number"
                step="0.01"
                value={worker.hourlyRate}
                onChange={(e) =>
                  updateWorker(
                    worker.id,
                    "hourlyRate",
                    parseFloat(e.target.value) || 0,
                  )
                }
                className="mt-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="text-slate-700 font-medium">
                {t("worker.hours")}
              </Label>
              <Input
                type="number"
                step="0.1"
                value={worker.hours}
                onChange={(e) =>
                  updateWorker(
                    worker.id,
                    "hours",
                    parseFloat(e.target.value) || 0,
                  )
                }
                className="mt-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeWorker(worker.id)}
                disabled={workers.length === 1}
                className="bg-red-500 hover:bg-red-600 disabled:bg-slate-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t("remove.worker")}
              </Button>
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Συνολικό Κόστος Εργασίας:
              </span>
            </div>
            <span className="text-lg font-bold text-green-700 bg-white px-3 py-1 rounded-md shadow-sm">
              {totalLaborCost.toFixed(2)}€
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkersList;
