import React from 'react';
import CostCard from './CostCard';
import { costThresholds } from '@/config/costThresholds';

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
      tooltip: threshold?.tooltip || '',
      minAllowed: threshold?.minAllowed ?? 0,
      maxAllowed: threshold?.maxAllowed ?? Infinity,
    };
  });

  const withinCount = mapped.filter(
    (i) => i.value >= i.minAllowed && i.value <= i.maxAllowed
  ).length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
