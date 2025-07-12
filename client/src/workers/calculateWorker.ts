
import { calculateResults, FormData, CalculationResults } from '@/utils/calc';

self.onmessage = (e: MessageEvent<FormData>) => {
  try {
    const results: CalculationResults = calculateResults(e.data);
    (self as any).postMessage(results);
  } catch (error) {
    console.error('Worker calculation error:', error);
    (self as any).postMessage(null);
  }
};

export {};
