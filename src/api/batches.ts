import { generateBatchData, ProductBatch } from "@/utils/stubData";
import { safeGetJSON, safeSetJSON } from "@/utils/safeStorage";

const STORAGE_KEY = "batches";

// Get batches from storage with stub data initialization
const getBatchesFromStorage = (): ProductBatch[] => {
  try {
    const stored = safeGetJSON<ProductBatch[]>(STORAGE_KEY, null);
    if (!stored) {
      // Initialize with stub data
      const stubData = generateBatchData(35);
      safeSetJSON(STORAGE_KEY, stubData);
      return stubData;
    }
    return stored;
  } catch (error) {
    console.error("Error reading batches from storage:", error);
    return generateBatchData(35);
  }
};

export interface BatchFilter {
  species?: string;
  supplier?: string;
  status?: ProductBatch["status"];
  dateFrom?: string;
  dateTo?: string;
  qualityGrade?: string;
}

export const batchAPI = {
  // Get all batches
  getAll(filter?: BatchFilter): ProductBatch[] {
    let batches = getBatchesFromStorage();

    if (filter) {
      batches = batches.filter((batch) => {
        if (filter.species && batch.species !== filter.species) return false;
        if (filter.supplier && batch.supplier !== filter.supplier) return false;
        if (filter.status && batch.status !== filter.status) return false;
        if (filter.qualityGrade && batch.qualityGrade !== filter.qualityGrade)
          return false;
        if (filter.dateFrom && batch.date < filter.dateFrom) return false;
        if (filter.dateTo && batch.date > filter.dateTo) return false;
        return true;
      });
    }

    return batches.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  },

  // Get batch by ID
  getById(id: string): ProductBatch | undefined {
    const batches = getBatchesFromStorage();
    return batches.find((batch) => batch.id === id);
  },

  // Create new batch
  create(data: Omit<ProductBatch, "id">): ProductBatch {
    const batches = getBatchesFromStorage();
    const newBatch: ProductBatch = {
      ...data,
      id: `BATCH-${String(batches.length + 1).padStart(3, "0")}`,
    };

    const updatedBatches = [...batches, newBatch];
    safeSetJSON(STORAGE_KEY, updatedBatches);

    return newBatch;
  },

  // Update batch
  update(id: string, data: Partial<ProductBatch>): ProductBatch | null {
    const batches = getBatchesFromStorage();
    const index = batches.findIndex((batch) => batch.id === id);

    if (index === -1) return null;

    const updatedBatch: ProductBatch = {
      ...batches[index],
      ...data,
    };

    batches[index] = updatedBatch;
    safeSetJSON(STORAGE_KEY, batches);

    return updatedBatch;
  },

  // Delete batch
  remove(id: string): boolean {
    const batches = getBatchesFromStorage();
    const filteredBatches = batches.filter((batch) => batch.id !== id);

    if (filteredBatches.length === batches.length) {
      return false;
    }

    safeSetJSON(STORAGE_KEY, filteredBatches);
    return true;
  },

  // Get batches by species
  getBySpecies(species: string): ProductBatch[] {
    const batches = getBatchesFromStorage();
    return batches.filter((batch) =>
      batch.species.toLowerCase().includes(species.toLowerCase()),
    );
  },

  // Get batches by supplier
  getBySupplier(supplier: string): ProductBatch[] {
    const batches = getBatchesFromStorage();
    return batches.filter((batch) =>
      batch.supplier.toLowerCase().includes(supplier.toLowerCase()),
    );
  },

  // Get batches statistics
  getStats() {
    const batches = getBatchesFromStorage();
    const totalBatches = batches.length;
    const processingBatches = batches.filter(
      (b) => b.status === "processing",
    ).length;
    const completedBatches = batches.filter(
      (b) => b.status === "completed",
    ).length;
    const shippedBatches = batches.filter((b) => b.status === "shipped").length;

    const totalWeight = batches.reduce((sum, batch) => sum + batch.weight, 0);
    const totalValue = batches.reduce(
      (sum, batch) => sum + batch.weight * batch.purchasePrice,
      0,
    );

    const speciesCount = batches.reduce(
      (acc, batch) => {
        acc[batch.species] = (acc[batch.species] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalBatches,
      processingBatches,
      completedBatches,
      shippedBatches,
      totalWeight: Math.round(totalWeight * 10) / 10,
      totalValue: Math.round(totalValue * 100) / 100,
      speciesCount,
      averagePrice:
        totalWeight > 0
          ? Math.round((totalValue / totalWeight) * 100) / 100
          : 0,
    };
  },
};
