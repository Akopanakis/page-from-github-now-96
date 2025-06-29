import { useState, useCallback } from "react";

export interface CostEntry {
  date: string;
  cost: number;
}

export type ForecastMethod = "movingAverage" | "linearRegression";

export interface ForecastEntry {
  index: number;
  value: number;
}

export const useCostForecast = (initial: CostEntry[] = []) => {
  const [history, setHistory] = useState<CostEntry[]>(initial);
  const [forecast, setForecast] = useState<ForecastEntry[]>([]);

  const addEntry = useCallback((entry: CostEntry) => {
    setHistory((prev) => [...prev, entry]);
  }, []);

  const calculateForecast = useCallback(
    (
      months: number,
      method: ForecastMethod = "movingAverage",
      windowSize = 3,
    ): ForecastEntry[] => {
      if (history.length === 0 || months <= 0) {
        setForecast([]);
        return [];
      }

      let predicted: ForecastEntry[] = [];

      if (method === "movingAverage") {
        const costs = history.map((h) => h.cost);
        for (let i = 0; i < months; i++) {
          const start = Math.max(0, costs.length - windowSize);
          const window = costs.slice(start);
          const avg = window.reduce((a, b) => a + b, 0) / window.length;
          predicted.push({ index: i + 1, value: avg });
          costs.push(avg);
        }
      } else {
        const n = history.length;
        const xMean = (n - 1) / 2;
        const yMean = history.reduce((sum, h) => sum + h.cost, 0) / n;
        const denom =
          history.reduce((sum, h, idx) => sum + Math.pow(idx - xMean, 2), 0) ||
          1;
        const numer = history.reduce(
          (sum, h, idx) => sum + (idx - xMean) * (h.cost - yMean),
          0,
        );
        const slope = numer / denom;
        const intercept = yMean - slope * xMean;
        for (let i = 0; i < months; i++) {
          const x = n + i;
          predicted.push({ index: i + 1, value: intercept + slope * x });
        }
      }

      setForecast(predicted);
      return predicted;
    },
    [history],
  );

  return { history, setHistory, addEntry, forecast, calculateForecast };
};
