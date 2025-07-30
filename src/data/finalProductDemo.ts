import { 
  DemoData, 
  RawMaterialBatch, 
  FinalProduct, 
  PackagingOption, 
  FinalProductBatch, 
  FinalProductStock, 
  SaleTransaction 
} from '@/types/finalProduct';

// Demo Raw Material Batches
export const demoRawMaterials: RawMaterialBatch[] = [
  {
    id: 'rm_001',
    productName: 'Γάμπαρη ΝΖ ολόκληρη',
    batchNumber: 'GAM21125',
    supplierName: 'Marine Supplies',
    totalKg: 132,
    usedKg: 132,
    remainingKg: 0,
    costPerKg: 3.00,
    purchaseDate: '2024-01-15',
    isActive: false
  },
  {
    id: 'rm_002',
    productName: 'Χταπόδι Block M',
    batchNumber: 'OCT24001',
    supplierName: 'Mediterranean Fish',
    totalKg: 100,
    usedKg: 100,
    remainingKg: 0,
    costPerKg: 4.00,
    purchaseDate: '2024-01-20',
    isActive: false
  },
  {
    id: 'rm_003',
    productName: 'Θράψαλο L ολόκληρο',
    batchNumber: 'THR24002',
    supplierName: 'Aegean Fisheries',
    totalKg: 200,
    usedKg: 200,
    remainingKg: 0,
    costPerKg: 3.20,
    purchaseDate: '2024-01-25',
    isActive: false
  },
  {
    id: 'rm_004',
    productName: 'Γάμπαρη ΝΖ ολόκληρη',
    batchNumber: 'GAM24003',
    supplierName: 'Marine Supplies',
    totalKg: 150,
    usedKg: 0,
    remainingKg: 150,
    costPerKg: 3.10,
    purchaseDate: '2024-02-01',
    isActive: true
  },
  {
    id: 'rm_005',
    productName: 'Θράψαλο L ολόκληρο',
    batchNumber: 'THR24004',
    supplierName: 'Aegean Fisheries',
    totalKg: 180,
    usedKg: 0,
    remainingKg: 180,
    costPerKg: 3.15,
    purchaseDate: '2024-02-02',
    isActive: true
  }
];

// Demo Final Products
export const demoFinalProducts: FinalProduct[] = [
  {
    id: 'fp_001',
    code: 'GAM_PROC',
    name: 'Γάμβαρη Καθαρισμένη',
    category: 'seafood',
    description: 'Γάμπαρη καθαρισμένη και έτοιμη για μαγείρεμα',
    defaultPackaging: ['φελιζόλ_5kg', 'φελιζόλ_10kg'],
    isActive: true
  },
  {
    id: 'fp_002',
    code: 'OCT_BLOCK',
    name: 'Χταπόδι Block Κατεψυγμένο',
    category: 'seafood',
    description: 'Χταπόδι σε blocks για επαγγελματική χρήση',
    defaultPackaging: ['κουτί_5kg', 'κιβώτιο_10kg'],
    isActive: true
  },
  {
    id: 'fp_003',
    code: 'THR_CLEAN',
    name: 'Θράψαλο Καθαρισμένο',
    category: 'fish',
    description: 'Θράψαλο καθαρισμένο χωρίς κεφάλι',
    defaultPackaging: ['φελιζόλ_5kg', 'σακούλα_2kg'],
    isActive: true
  }
];

// Demo Packaging Options
export const demoPackagingOptions: PackagingOption[] = [
  {
    id: 'pkg_001',
    name: 'Φελιζόλ 5kg',
    type: 'φελιζόλ',
    capacity: 5,
    unitCost: 0.70,
    description: 'Κουτί φελιζόλ χωρητικότητας 5kg'
  },
  {
    id: 'pkg_002',
    name: 'Φελιζόλ 10kg',
    type: 'φελιζόλ',
    capacity: 10,
    unitCost: 1.00,
    description: 'Κουτί φελιζόλ χωρητικότητας 10kg'
  },
  {
    id: 'pkg_003',
    name: 'Σακούλα 1kg',
    type: 'σακούλα',
    capacity: 1,
    unitCost: 0.15,
    description: 'Σακούλα vacuum χωρητικότητας 1kg'
  },
  {
    id: 'pkg_004',
    name: 'Σακούλα 2kg',
    type: 'σακούλα',
    capacity: 2,
    unitCost: 0.25,
    description: 'Σακούλα vacuum χωρητικότητας 2kg'
  },
  {
    id: 'pkg_005',
    name: 'Κουτί 5kg',
    type: 'κουτί',
    capacity: 5,
    unitCost: 0.80,
    description: 'Κουτί χάρτινο χωρητικότητας 5kg'
  },
  {
    id: 'pkg_006',
    name: 'Κιβώτιο 10kg',
    type: 'κιβώτιο',
    capacity: 10,
    unitCost: 1.20,
    description: 'Κιβώτιο για μεγάλες ποσότητες'
  }
];

// Demo Final Product Batches - Based on your examples
export const demoFinalProductBatches: FinalProductBatch[] = [
  // 🔹 Παράδειγμα 1: Γάμπαρη Lot 21125
  {
    id: 'fpb_001',
    batchNumber: '21125',
    productId: 'fp_001',
    productName: 'Γάμβαρη Καθαρισμένη',
    productCode: 'GAM_PROC',
    
    sourceBatchId: 'rm_001',
    sourceBatchNumber: 'GAM21125',
    rawUsedKg: 132,
    rawCostPerKg: 3.00,
    
    finalProductKg: 160,
    productionDate: '2024-01-16',
    yieldPercentage: 81, // 160/132 = 121% (includes some processing additions)
    
    packagingType: 'Φελιζόλ 5kg',
    packagingUnits: 18, // 90kg sold / 5kg per unit = 18 units
    packagingCostPerUnit: 1.00, // 0.70 + 0.30 handling
    packagingCostTotal: 18.00,
    
    rawMaterialCost: 396.00, // 132 × 3.00
    calculatedCostPerKg: 2.5875, // 414 / 160
    totalCost: 414.00, // 396 + 18
    
    status: 'partial_sold',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  
  // 🔹 Παράδειγμα 2: Χταπόδι Block M
  {
    id: 'fpb_002',
    batchNumber: 'OCT24001',
    productId: 'fp_002',
    productName: 'Χταπόδι Block Κατεψυγμένο',
    productCode: 'OCT_BLOCK',
    
    sourceBatchId: 'rm_002',
    sourceBatchNumber: 'OCT24001',
    rawUsedKg: 100,
    rawCostPerKg: 4.00,
    
    finalProductKg: 80,
    productionDate: '2024-01-21',
    yieldPercentage: 80, // 80/100 = 80%
    
    packagingType: 'Κουτί 5kg',
    packagingUnits: 16, // 80kg / 5kg per unit = 16 units
    packagingCostPerUnit: 0.80,
    packagingCostTotal: 12.80,
    
    rawMaterialCost: 400.00, // 100 × 4.00
    calculatedCostPerKg: 5.16, // 412.80 / 80
    totalCost: 412.80, // 400 + 12.80
    
    status: 'partial_sold',
    createdAt: '2024-01-21T09:00:00Z',
    updatedAt: '2024-01-25T14:20:00Z'
  },
  
  // 🔹 Παράδειγμα 3: Θράψαλο L
  {
    id: 'fpb_003',
    batchNumber: 'THR24002',
    productId: 'fp_003',
    productName: 'Θράψα��ο Καθαρισμένο',
    productCode: 'THR_CLEAN',
    
    sourceBatchId: 'rm_003',
    sourceBatchNumber: 'THR24002',
    rawUsedKg: 200,
    rawCostPerKg: 3.20,
    
    finalProductKg: 180,
    productionDate: '2024-01-26',
    yieldPercentage: 90, // 180/200 = 90%
    
    packagingType: 'Φελιζόλ 5kg',
    packagingUnits: 36, // 180kg / 5kg per unit = 36 units
    packagingCostPerUnit: 1.00, // 0.70 + 0.30 handling
    packagingCostTotal: 36.00,
    
    rawMaterialCost: 640.00, // 200 × 3.20
    calculatedCostPerKg: 3.76, // 676 / 180
    totalCost: 676.00, // 640 + 36
    
    status: 'partial_sold',
    createdAt: '2024-01-26T11:00:00Z',
    updatedAt: '2024-01-30T16:45:00Z'
  }
];

// Demo Stock Entries
export const demoFinalProductStock: FinalProductStock[] = [
  {
    id: 'fps_001',
    batchId: 'fpb_001',
    batchNumber: '21125',
    productId: 'fp_001',
    productName: 'Γάμβαρη Καθαρισμένη',
    productCode: 'GAM_PROC',
    
    totalKg: 160,
    remainingKg: 70, // 160 - 90 sold
    soldKg: 90,
    
    packagingType: 'Φελιζόλ 5kg',
    totalUnits: 32, // 160 / 5
    remainingUnits: 14, // 70 / 5
    
    costPerKg: 2.5875,
    
    productionDate: '2024-01-16',
    
    isAvailable: true,
    
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  
  {
    id: 'fps_002',
    batchId: 'fpb_002',
    batchNumber: 'OCT24001',
    productId: 'fp_002',
    productName: 'Χταπόδι Block Κατεψυγμένο',
    productCode: 'OCT_BLOCK',
    
    totalKg: 80,
    remainingKg: 40, // 80 - 40 sold
    soldKg: 40,
    
    packagingType: 'Κουτί 5kg',
    totalUnits: 16,
    remainingUnits: 8,
    
    costPerKg: 5.16,
    
    productionDate: '2024-01-21',
    
    isAvailable: true,
    
    createdAt: '2024-01-21T09:00:00Z',
    updatedAt: '2024-01-25T14:20:00Z'
  },
  
  {
    id: 'fps_003',
    batchId: 'fpb_003',
    batchNumber: 'THR24002',
    productId: 'fp_003',
    productName: 'Θράψαλο Καθαρισμένο',
    productCode: 'THR_CLEAN',
    
    totalKg: 180,
    remainingKg: 80, // 180 - 100 sold
    soldKg: 100,
    
    packagingType: 'Φελιζόλ 5kg',
    totalUnits: 36,
    remainingUnits: 16,
    
    costPerKg: 3.76,
    
    productionDate: '2024-01-26',
    
    isAvailable: true,
    
    createdAt: '2024-01-26T11:00:00Z',
    updatedAt: '2024-01-30T16:45:00Z'
  }
];

// Demo Sales Transactions
export const demoSaleTransactions: SaleTransaction[] = [
  {
    id: 'sale_001',
    saleDate: '2024-01-20',
    customerName: 'Ταβέρνα Το Λιμάνι',
    
    items: [
      {
        id: 'si_001',
        productId: 'fp_001',
        productName: 'Γάμβαρη Καθαρισμένη',
        batchId: 'fpb_001',
        batchNumber: '21125',
        soldKg: 90,
        pricePerKg: 4.50,
        costPerKg: 2.5875,
        revenue: 405.00, // 90 × 4.50
        cost: 232.875, // 90 × 2.5875
        profit: 172.125 // 405 - 232.875
      }
    ],
    
    totalKg: 90,
    totalRevenue: 405.00,
    totalCost: 232.875,
    totalProfit: 172.125,
    profitMargin: 42.5, // (172.125 / 405) × 100
    
    createdAt: '2024-01-20T15:30:00Z'
  },
  
  {
    id: 'sale_002',
    saleDate: '2024-01-25',
    customerName: 'Εστιατόριο Ποσειδών',
    
    items: [
      {
        id: 'si_002',
        productId: 'fp_002',
        productName: 'Χταπόδι Block Κατεψυγμένο',
        batchId: 'fpb_002',
        batchNumber: 'OCT24001',
        soldKg: 40,
        pricePerKg: 6.50,
        costPerKg: 5.16,
        revenue: 260.00, // 40 × 6.50
        cost: 206.40, // 40 × 5.16
        profit: 53.60 // 260 - 206.40
      }
    ],
    
    totalKg: 40,
    totalRevenue: 260.00,
    totalCost: 206.40,
    totalProfit: 53.60,
    profitMargin: 20.6, // (53.60 / 260) × 100
    
    createdAt: '2024-01-25T14:20:00Z'
  },
  
  {
    id: 'sale_003',
    saleDate: '2024-01-30',
    customerName: 'Κεντρική Αγορά Θεσσαλονίκης',
    
    items: [
      {
        id: 'si_003',
        productId: 'fp_003',
        productName: 'Θράψαλο Καθαρισμένο',
        batchId: 'fpb_003',
        batchNumber: 'THR24002',
        soldKg: 100,
        pricePerKg: 5.20,
        costPerKg: 3.76,
        revenue: 520.00, // 100 × 5.20
        cost: 376.00, // 100 × 3.76
        profit: 144.00 // 520 - 376
      }
    ],
    
    totalKg: 100,
    totalRevenue: 520.00,
    totalCost: 376.00,
    totalProfit: 144.00,
    profitMargin: 27.7, // (144 / 520) × 100
    
    createdAt: '2024-01-30T16:45:00Z'
  }
];

// Complete Demo Data Object
export const finalProductDemoData: DemoData = {
  rawMaterials: demoRawMaterials,
  finalProducts: demoFinalProducts,
  packagingOptions: demoPackagingOptions,
  batches: demoFinalProductBatches,
  stock: demoFinalProductStock,
  sales: demoSaleTransactions
};

// Utility functions for demo data
export const getDemoDataSummary = () => {
  const totalBatches = demoFinalProductBatches.length;
  const totalProducedKg = demoFinalProductBatches.reduce((sum, batch) => sum + batch.finalProductKg, 0);
  const totalSoldKg = demoSaleTransactions.reduce((sum, sale) => sum + sale.totalKg, 0);
  const totalRevenue = demoSaleTransactions.reduce((sum, sale) => sum + sale.totalRevenue, 0);
  const totalCost = demoSaleTransactions.reduce((sum, sale) => sum + sale.totalCost, 0);
  const totalProfit = totalRevenue - totalCost;
  const averageYield = demoFinalProductBatches.reduce((sum, batch) => sum + batch.yieldPercentage, 0) / totalBatches;
  
  return {
    totalBatches,
    totalProducedKg,
    totalSoldKg,
    totalRevenue,
    totalCost,
    totalProfit,
    averageYield: Math.round(averageYield),
    profitMargin: totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0
  };
};

export default finalProductDemoData;
