import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Plus,
  Trash2,
  Snowflake,
  TrendingDown,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProcessingPhasesProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

interface ProcessingPhase {
  id: string;
  name: string;
  lossPercentage: number;
  costPerKg: number;
  duration: number; // in hours
  temperature: number;
  description: string;
}

const ProcessingPhases: React.FC<ProcessingPhasesProps> = ({
  formData,
  updateFormData,
}) => {
  const { language } = useLanguage();

  // Initialize default phases if not set
  React.useEffect(() => {
    if (!formData.processingPhases) {
      const defaultPhases: ProcessingPhase[] = [
        {
          id: "1",
          name: language === "el" ? "Καθάρισμα" : "Cleaning",
          lossPercentage: 15,
          costPerKg: 0.5,
          duration: 0.5,
          temperature: 4,
          description:
            language === "el"
              ? "Αφαίρεση κεφαλιού και εντόσθιων"
              : "Head and gut removal",
        },
        {
          id: "2",
          name: language === "el" ? "Φιλετάρισμα" : "Filleting",
          lossPercentage: 25,
          costPerKg: 1.2,
          duration: 1,
          temperature: 4,
          description: language === "el" ? "Αφαίρεση κοκκάλων" : "Bone removal",
        },
      ];
      updateFormData({
        processingPhases: defaultPhases,
        totalLossPercentage: 5, // General losses
        glazingPercentage: 0, // Default no glazing
      });
    }
  }, [formData.processingPhases, updateFormData, language]);

  const phases = formData.processingPhases || [];

  const addPhase = () => {
    const newPhase: ProcessingPhase = {
      id: Date.now().toString(),
      name: language === "el" ? "Νέα Φάση" : "New Phase",
      lossPercentage: 0,
      costPerKg: 0,
      duration: 0,
      temperature: 4,
      description: "",
    };

    updateFormData({
      processingPhases: [...phases, newPhase],
    });
  };

  const updatePhase = (
    phaseId: string,
    field: keyof ProcessingPhase,
    value: any,
  ) => {
    const updatedPhases = phases.map((phase: ProcessingPhase) =>
      phase.id === phaseId ? { ...phase, [field]: value } : phase,
    );
    updateFormData({ processingPhases: updatedPhases });
  };

  const removePhase = (phaseId: string) => {
    const updatedPhases = phases.filter(
      (phase: ProcessingPhase) => phase.id !== phaseId,
    );
    updateFormData({ processingPhases: updatedPhases });
  };

  const calculateTotalLoss = () => {
    const phaseLoss = phases.reduce((total: number, phase: ProcessingPhase) => {
      return total + phase.lossPercentage;
    }, 0);
    const generalLoss = formData.totalLossPercentage || 0;
    return phaseLoss + generalLoss;
  };

  const calculateTotalCost = () => {
    return phases.reduce((total: number, phase: ProcessingPhase) => {
      return total + phase.costPerKg;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Processing Phases */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-indigo-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Settings className="w-5 h-5 text-indigo-600" />
            </div>
            {language === "el" ? "Φάσεις Επεξεργασίας" : "Processing Phases"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {phases.map((phase: ProcessingPhase, index: number) => (
            <div
              key={phase.id}
              className="p-4 border border-gray-200 rounded-lg bg-white/80"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {language === "el" ? "Φάση" : "Phase"} {index + 1}
                  </Badge>
                  <Input
                    value={phase.name}
                    onChange={(e) =>
                      updatePhase(phase.id, "name", e.target.value)
                    }
                    className="font-medium border-none p-0 h-auto bg-transparent"
                    placeholder={
                      language === "el" ? "Όνομα φάσης" : "Phase name"
                    }
                  />
                </div>
                <Button
                  onClick={() => removePhase(phase.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {language === "el" ? "Απώλειες (%)" : "Loss (%)"}
                  </Label>
                  <div className="relative">
                    <TrendingDown className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={phase.lossPercentage}
                      onChange={(e) =>
                        updatePhase(
                          phase.id,
                          "lossPercentage",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="pl-8 h-9 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {language === "el" ? "Κόστος (€/kg)" : "Cost (€/kg)"}
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={phase.costPerKg}
                    onChange={(e) =>
                      updatePhase(
                        phase.id,
                        "costPerKg",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {language === "el" ? "Διάρκεια (ώρες)" : "Duration (hours)"}
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      value={phase.duration}
                      onChange={(e) =>
                        updatePhase(
                          phase.id,
                          "duration",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="pl-8 h-9 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600">
                    {language === "el"
                      ? "Θερμοκρασία (°C)"
                      : "Temperature (°C)"}
                  </Label>
                  <Input
                    type="number"
                    step="1"
                    value={phase.temperature}
                    onChange={(e) =>
                      updatePhase(
                        phase.id,
                        "temperature",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-xs font-medium text-gray-600">
                  {language === "el" ? "Περιγραφή" : "Description"}
                </Label>
                <Input
                  value={phase.description}
                  onChange={(e) =>
                    updatePhase(phase.id, "description", e.target.value)
                  }
                  placeholder={
                    language === "el"
                      ? "Περιγραφή της φάσης..."
                      : "Phase description..."
                  }
                  className="mt-1 h-9 text-sm"
                />
              </div>
            </div>
          ))}

          <Button
            onClick={addPhase}
            variant="outline"
            className="w-full border-dashed border-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            {language === "el" ? "Προσθήκη Φάσης" : "Add Phase"}
          </Button>
        </CardContent>
      </Card>

      {/* General Losses & Glazing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Losses */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-red-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              {language === "el" ? "Γενικές Απώλειες" : "General Losses"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="totalLossPercentage"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el"
                  ? "Επιπρόσθετες Απώλειες (%)"
                  : "Additional Losses (%)"}
              </Label>
              <Input
                id="totalLossPercentage"
                type="number"
                step="0.1"
                min="0"
                max="50"
                value={formData.totalLossPercentage || 0}
                onChange={(e) =>
                  updateFormData({
                    totalLossPercentage: parseFloat(e.target.value) || 0,
                  })
                }
                className="h-11"
              />
              <p className="text-xs text-gray-500">
                {language === "el"
                  ? "Απώλειες από μεταφορά, αποθήκευση, κ.λπ."
                  : "Losses from transport, storage, etc."}
              </p>
            </div>

            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-sm font-medium text-red-800">
                {language === "el" ? "Συνολικές Απώλειες" : "Total Losses"}
              </div>
              <div className="text-lg font-bold text-red-900">
                {calculateTotalLoss().toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Glazing */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-cyan-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Snowflake className="w-5 h-5 text-cyan-600" />
              </div>
              {language === "el" ? "Παγοστρώματα (Glazing)" : "Glazing"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="glazingPercentage"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el"
                  ? "Ποσοστό Παγοστρώματος (%)"
                  : "Glazing Percentage (%)"}
              </Label>
              <Input
                id="glazingPercentage"
                type="number"
                step="0.1"
                min="0"
                max="30"
                value={formData.glazingPercentage || 0}
                onChange={(e) =>
                  updateFormData({
                    glazingPercentage: parseFloat(e.target.value) || 0,
                  })
                }
                className="h-11"
              />
              <p className="text-xs text-gray-500">
                {language === "el"
                  ? "Ποσοστό βάρους από πάγο/νερό"
                  : "Percentage of weight from ice/water"}
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="glazingType"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el" ? "Τύπος Παγοστρώματος" : "Glazing Type"}
              </Label>
              <Select
                value={formData.glazingType || "none"}
                onValueChange={(value) =>
                  updateFormData({ glazingType: value })
                }
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">
                    {language === "el" ? "Χωρίς παγόστρωμα" : "No glazing"}
                  </SelectItem>
                  <SelectItem value="water">
                    {language === "el" ? "Νερό" : "Water"}
                  </SelectItem>
                  <SelectItem value="ice">
                    {language === "el" ? "Πάγος" : "Ice"}
                  </SelectItem>
                  <SelectItem value="protective">
                    {language === "el" ? "Προστατευτικό" : "Protective"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.glazingPercentage > 0 && (
              <div className="p-3 bg-cyan-50 rounded-lg">
                <div className="text-sm font-medium text-cyan-800">
                  {language === "el" ? "Καθαρό Βάρος" : "Net Weight"}
                </div>
                <div className="text-lg font-bold text-cyan-900">
                  {formData.weight
                    ? (
                        formData.weight *
                        (1 - (formData.glazingPercentage || 0) / 100)
                      ).toFixed(2)
                    : "0.00"}{" "}
                  kg
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Processing Summary */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">
            {language === "el" ? "Σύνοψη Επεξεργασίας" : "Processing Summary"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">
                {language === "el" ? "Φάσεις" : "Phases"}
              </div>
              <div className="text-xl font-bold text-blue-800">
                {phases.length}
              </div>
            </div>

            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-sm text-red-600 font-medium">
                {language === "el" ? "Συνολικές Απώλειες" : "Total Losses"}
              </div>
              <div className="text-xl font-bold text-red-800">
                {calculateTotalLoss().toFixed(1)}%
              </div>
            </div>

            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600 font-medium">
                {language === "el" ? "Κόστος Επεξεργασίας" : "Processing Cost"}
              </div>
              <div className="text-xl font-bold text-green-800">
                €{calculateTotalCost().toFixed(2)}/kg
              </div>
            </div>

            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">
                {language === "el" ? "Συνολικός Χρόνος" : "Total Time"}
              </div>
              <div className="text-xl font-bold text-purple-800">
                {phases
                  .reduce(
                    (total: number, phase: ProcessingPhase) =>
                      total + phase.duration,
                    0,
                  )
                  .toFixed(1)}
                h
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessingPhases;
