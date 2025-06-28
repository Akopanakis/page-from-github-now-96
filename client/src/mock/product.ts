export interface Product {
  id: string;
  name: string;
  category: "fish" | "shellfish" | "mollusks" | "processed";
  unitCost: number;
  quantity: number;
  supplier: string;
  origin: string;
  seasonalFactor: number;
  qualityGrade: "A" | "B" | "C";
  sustainabilityScore: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Τσιπούρα Ελλάδ��ς",
    category: "fish",
    unitCost: 8.5,
    quantity: 150,
    supplier: "Ιχθυοκαλλιέργειες Κρήτης",
    origin: "Κρήτη",
    seasonalFactor: 1.2,
    qualityGrade: "A",
    sustainabilityScore: 85,
  },
  {
    id: "2",
    name: "Λαβράκι Ελλάδας",
    category: "fish",
    unitCost: 9.2,
    quantity: 120,
    supplier: "Aquatica Holdings",
    origin: "Εύβοια",
    seasonalFactor: 1.1,
    qualityGrade: "A",
    sustainabilityScore: 90,
  },
  {
    id: "3",
    name: "Γαρίδες Τίγρης",
    category: "shellfish",
    unitCost: 15.8,
    quantity: 80,
    supplier: "Seafood Premium",
    origin: "Μαδαγασκάρη",
    seasonalFactor: 0.9,
    qualityGrade: "A",
    sustainabilityScore: 75,
  },
  {
    id: "4",
    name: "Μύδια Θερμαϊκού",
    category: "mollusks",
    unitCost: 3.2,
    quantity: 200,
    supplier: "Θαλάσσια Προϊόντα ΑΕ",
    origin: "Θερμαϊκός",
    seasonalFactor: 1.3,
    qualityGrade: "B",
    sustainabilityScore: 95,
  },
  {
    id: "5",
    name: "Φιλέτο Σολομού",
    category: "processed",
    unitCost: 22.5,
    quantity: 60,
    supplier: "Nordic Fish Co.",
    origin: "Νορβηγία",
    seasonalFactor: 1.0,
    qualityGrade: "A",
    sustainabilityScore: 70,
  },
  {
    id: "6",
    name: "Καλαμάρι Καθαρισμένο",
    category: "mollusks",
    unitCost: 12.3,
    quantity: 90,
    supplier: "Mediterranean Catch",
    origin: "Αιγαίο",
    seasonalFactor: 0.8,
    qualityGrade: "B",
    sustainabilityScore: 80,
  },
];

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 500);
  });
};

export const fetchProductById = (id: string): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === id);
      resolve(product || null);
    }, 300);
  });
};
