import React from "react";
import CostCard from "./CostCard";
import { costThresholds } from "@/config/costThresholds";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import EmptyState from "@/components/ui/empty-state";

export interface CostItem {
  key: string;
  value: number;
}

interface CostAnalysisPanelProps {
  data: CostItem[];
}

const CostAnalysisPanel: React.FC<CostAnalysisPanelProps> = ({ data }) => {
  const mapped = data.map((item) => {
    const threshold = costThresholds[item.key];
    return {
      ...item,
      label: threshold?.label || item.key,
      tooltip: threshold?.tooltip || "",
      minAllowed: threshold?.minAllowed ?? 0,
      maxAllowed: threshold?.maxAllowed ?? Infinity,
    };
  });

  const exceeded = mapped.filter(
    (i) => i.value > i.maxAllowed || i.value < i.minAllowed,
  );

  const withinCount = mapped.filter(
    (i) => i.value >= i.minAllowed && i.value <= i.maxAllowed,
  ).length;

  return (
    <div>
      {exceeded.map((item) => (
        <Alert key={item.key} variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            {item.label} exceeds allowed range (max {item.maxAllowed}€)
          </AlertTitle>
          {item.tooltip && <AlertDescription>{item.tooltip}</AlertDescription>}
        </Alert>
      ))}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mapped.length === 0 && (
          <EmptyState
            messageKey="costs.empty"
            icon={<AlertTriangle className="w-8 h-8 mb-2 text-gray-400" />}
          />
        )}
        {mapped.map((item) => (
          <CostCard
            key={item.key}
            label={item.label}
            value={item.value}
            minAllowed={item.minAllowed}
            maxAllowed={item.maxAllowed}
            tooltip={item.tooltip}
          />
        ))}
      </div>
      <p className="text-sm text-slate-600 mt-4">
        {withinCount}/{mapped.length} within limits.
      </p>
    </div>
  );
};

export default CostAnalysisPanel;
