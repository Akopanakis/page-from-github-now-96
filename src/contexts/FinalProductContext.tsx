import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  FinalProductBatch, 
  SaleTransaction, 
  FinalProductStock,
  FinalProduct,
  PackagingOption,
  RawMaterialBatch
} from '@/types/finalProduct';
import { finalProductDemoData } from '@/data/finalProductDemo';

interface FinalProductContextType {
  // Data
  batches: FinalProductBatch[];
  sales: SaleTransaction[];
  stock: FinalProductStock[];
  products: FinalProduct[];
  packaging: PackagingOption[];
  rawMaterials: RawMaterialBatch[];
  
  // Actions
  addBatch: (batch: FinalProductBatch) => void;
  addSale: (sale: SaleTransaction) => void;
  updateStock: (stock: FinalProductStock[]) => void;
  updateBatch: (batchId: string, updates: Partial<FinalProductBatch>) => void;
  
  // Utilities
  getBatchById: (id: string) => FinalProductBatch | undefined;
  getStockByBatchId: (batchId: string) => FinalProductStock | undefined;
  getAvailableStock: (productId: string) => FinalProductStock[];
  getTotalStockValue: () => number;
  getTotalProfit: () => number;
}

const FinalProductContext = createContext<FinalProductContextType | undefined>(undefined);

interface FinalProductProviderProps {
  children: ReactNode;
}

export const FinalProductProvider: React.FC<FinalProductProviderProps> = ({ children }) => {
  // State management
  const [batches, setBatches] = useState<FinalProductBatch[]>(finalProductDemoData.batches);
  const [sales, setSales] = useState<SaleTransaction[]>(finalProductDemoData.sales);
  const [stock, setStock] = useState<FinalProductStock[]>(finalProductDemoData.stock);
  const [products] = useState<FinalProduct[]>(finalProductDemoData.finalProducts);
  const [packaging] = useState<PackagingOption[]>(finalProductDemoData.packagingOptions);
  const [rawMaterials] = useState<RawMaterialBatch[]>(finalProductDemoData.rawMaterials);

  // Actions
  const addBatch = (batch: FinalProductBatch) => {
    setBatches(prev => [...prev, batch]);
    
    // Auto-create stock entry
    const stockEntry: FinalProductStock = {
      id: `fps_${Date.now()}`,
      batchId: batch.id,
      batchNumber: batch.batchNumber,
      productId: batch.productId,
      productName: batch.productName,
      productCode: batch.productCode,
      totalKg: batch.finalProductKg,
      remainingKg: batch.finalProductKg,
      soldKg: 0,
      packagingType: batch.packagingType,
      totalUnits: batch.packagingUnits,
      remainingUnits: batch.packagingUnits,
      costPerKg: batch.calculatedCostPerKg,
      productionDate: batch.productionDate,
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setStock(prev => [...prev, stockEntry]);
  };

  const addSale = (sale: SaleTransaction) => {
    setSales(prev => [...prev, sale]);
  };

  const updateStock = (newStock: FinalProductStock[]) => {
    setStock(newStock);
  };

  const updateBatch = (batchId: string, updates: Partial<FinalProductBatch>) => {
    setBatches(prev => prev.map(batch => 
      batch.id === batchId ? { ...batch, ...updates } : batch
    ));
  };

  // Utilities
  const getBatchById = (id: string) => {
    return batches.find(batch => batch.id === id);
  };

  const getStockByBatchId = (batchId: string) => {
    return stock.find(s => s.batchId === batchId);
  };

  const getAvailableStock = (productId: string) => {
    return stock
      .filter(s => s.productId === productId && s.isAvailable && s.remainingKg > 0)
      .sort((a, b) => new Date(a.productionDate).getTime() - new Date(b.productionDate).getTime());
  };

  const getTotalStockValue = () => {
    return stock.reduce((total, s) => total + (s.remainingKg * s.costPerKg), 0);
  };

  const getTotalProfit = () => {
    return sales.reduce((total, sale) => total + sale.totalProfit, 0);
  };

  const value: FinalProductContextType = {
    // Data
    batches,
    sales,
    stock,
    products,
    packaging,
    rawMaterials,
    
    // Actions
    addBatch,
    addSale,
    updateStock,
    updateBatch,
    
    // Utilities
    getBatchById,
    getStockByBatchId,
    getAvailableStock,
    getTotalStockValue,
    getTotalProfit
  };

  return (
    <FinalProductContext.Provider value={value}>
      {children}
    </FinalProductContext.Provider>
  );
};

export const useFinalProduct = () => {
  const context = useContext(FinalProductContext);
  if (context === undefined) {
    throw new Error('useFinalProduct must be used within a FinalProductProvider');
  }
  return context;
};

export default FinalProductContext;
