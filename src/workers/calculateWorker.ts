import { calculateResults } from "../utils/calc";
import type { FormData } from "../utils/calc";

self.onmessage = function (e: MessageEvent<Partial<FormData>>) {
  try {
    const result = calculateResults(e.data);
    self.postMessage(result);
  } catch (error) {
    console.error("Worker calculation error:", error);
    self.postMessage(null);
  }
};
