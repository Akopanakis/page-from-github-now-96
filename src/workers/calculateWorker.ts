import { calculateResults, FormData, CalculationResults } from '@/utils/calc';

self.onmessage = (e: MessageEvent<FormData>) => {
  const results: CalculationResults = calculateResults(e.data);
  (self as any).postMessage(results);
};

export {};
