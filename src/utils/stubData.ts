// Realistic stub data generators for KostoPro Fisheries Management System

interface Expense {
  id: string;
  date: string;
  category: string;
  subcategory: string;
  description: string;
  amount: number;
  currency: string;
  supplier: string;
  vessel?: string;
  batch?: string;
  status: "paid" | "pending" | "overdue";
  paymentMethod: string;
  reference: string;
  tags: string[];
}

interface KPI {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  variance: number;
  trend: "up" | "down" | "stable";
  category: "financial" | "operational" | "quality" | "sustainability";
  period: string;
  benchmark?: number;
}

interface ForecastData {
  month: string;
  actual?: number;
  forecast: number;
  confidence: number;
  category: string;
  variance?: number;
}

interface TableRow {
  id: string;
  [key: string]: any;
}

// Greek fisheries-specific categories and data
const EXPENSE_CATEGORIES = {
  "Πρώτες Ύλες": [
    "Ψάρια Αργεντινής",
    "Τόνος",
    "Γαρίδες",
    "Σολομός",
    "Μπακαλιάρος",
  ],
  Εργατικά: [
    "Καθάρισμα",
    "Φιλετάρισμα",
    "Συσκευασία",
    "Ποιοτικός Έλεγχος",
    "Διοίκηση",
  ],
  Ενέργεια: ["Κατάψυξη", "Ψύξη", "Φωτισμός", "Μηχανήματα", "Κλιματισμός"],
  Μεταφορά: [
    "Καύσιμα Πλοίου",
    "Λιμανικά Τέλη",
    "Οδικός Μεταφορά",
    "Ψυγεία",
    "Ασφάλιση",
  ],
  Συσκευασία: ["Πλαστικά Κιβώτια", "Πάγος", "Ετικέτες", "Κουτιά", "Μεμβράνη"],
  Λειτουργικά: [
    "Συντήρηση",
    "Καθαρισμός",
    "Ποιοτικός Έλεγχος",
    "Πιστοποιήσεις",
    "Έλεγχοι",
  ],
};

const SUPPLIERS = [
  "Κωστόπουλος Αλιεία ΑΕ",
  "Θαλάσσιος Κόσμος ΕΠΕ",
  "Αιγαίο Fisheries",
  "Μεσόγειος Seafood",
  "Ελληνικά Ψάρια ΑΕ",
  "Κρητικό Blue Fish",
  "Ιόνιο Sea Products",
  "Αλιευτικός Συνεταιρισμός Βόλου",
  "Παγκρήτιος Αλιεία",
];

const VESSELS = [
  "Αιγαίο Στάρ",
  "Ποσειδών II",
  "Θαλασσόλυκος",
  "Νηρηίδα",
  "Τρίτων",
  "Αμφιτρίτη",
  "Δελφίνι",
  "Κύμα Β",
];

const PAYMENT_METHODS = [
  "Τραπεζικό Έμβασμα",
  "Πιστωτική Κάρτα",
  "Μετρητά",
  "Επιταγή",
  "Πίστωση",
];

// Generate realistic expenses
export const genExpenses = (count: number = 50): Expense[] => {
  const expenses: Expense[] = [];
  const startDate = new Date("2024-01-01");
  const endDate = new Date();

  for (let i = 0; i < count; i++) {
    const category =
      Object.keys(EXPENSE_CATEGORIES)[
        Math.floor(Math.random() * Object.keys(EXPENSE_CATEGORIES).length)
      ];
    const subcategories =
      EXPENSE_CATEGORIES[category as keyof typeof EXPENSE_CATEGORIES];
    const subcategory =
      subcategories[Math.floor(Math.random() * subcategories.length)];

    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime()),
    );

    const baseAmount =
      category === "Πρώτες Ύλες"
        ? Math.random() * 8000 + 2000 // 2000-10000€ for raw materials
        : Math.random() * 2000 + 100; // 100-2100€ for other expenses

    const expense: Expense = {
      id: `EXP-${String(i + 1).padStart(4, "0")}`,
      date: randomDate.toISOString().split("T")[0],
      category,
      subcategory,
      description: `${subcategory} - ${randomDate.toLocaleDateString("el-GR", { month: "long" })}`,
      amount: Math.round(baseAmount * 100) / 100,
      currency: "EUR",
      supplier: SUPPLIERS[Math.floor(Math.random() * SUPPLIERS.length)],
      vessel:
        Math.random() > 0.6
          ? VESSELS[Math.floor(Math.random() * VESSELS.length)]
          : undefined,
      batch:
        Math.random() > 0.7
          ? `BATCH-${Math.floor(Math.random() * 1000)}`
          : undefined,
      status:
        Math.random() > 0.8
          ? "pending"
          : Math.random() > 0.95
            ? "overdue"
            : "paid",
      paymentMethod:
        PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)],
      reference: `REF-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      tags: [category, subcategory].concat(
        Math.random() > 0.5 ? ["Urgent"] : [],
      ),
    };

    expenses.push(expense);
  }

  return expenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

// Generate realistic KPIs
export const genKPIs = (): KPI[] => {
  const currentMonth = new Date().toLocaleDateString("el-GR", {
    month: "long",
    year: "numeric",
  });

  return [
    {
      id: "revenue",
      name: "Μηνιαία Έσοδα",
      value: 45650,
      unit: "€",
      target: 50000,
      variance: -8.7,
      trend: "down",
      category: "financial",
      period: currentMonth,
      benchmark: 48000,
    },
    {
      id: "profit_margin",
      name: "Περιθώριο Κέρδους",
      value: 23.4,
      unit: "%",
      target: 25.0,
      variance: -6.4,
      trend: "down",
      category: "financial",
      period: currentMonth,
      benchmark: 22.1,
    },
    {
      id: "catch_volume",
      name: "Όγκος Αλιείας",
      value: 12847,
      unit: "kg",
      target: 15000,
      variance: -14.4,
      trend: "down",
      category: "operational",
      period: currentMonth,
      benchmark: 13200,
    },
    {
      id: "vessel_utilization",
      name: "Αξιοποίηση Στόλου",
      value: 87.3,
      unit: "%",
      target: 90.0,
      variance: -3.0,
      trend: "stable",
      category: "operational",
      period: currentMonth,
      benchmark: 85.5,
    },
    {
      id: "quality_score",
      name: "Δείκτης Ποιότητας",
      value: 94.2,
      unit: "%",
      target: 95.0,
      variance: -0.8,
      trend: "up",
      category: "quality",
      period: currentMonth,
      benchmark: 92.8,
    },
    {
      id: "sustainability_score",
      name: "Δείκτης Βιωσιμότητας",
      value: 78.6,
      unit: "%",
      target: 80.0,
      variance: -1.8,
      trend: "up",
      category: "sustainability",
      period: currentMonth,
      benchmark: 75.3,
    },
    {
      id: "cost_per_kg",
      name: "Κόστος ανά Κιλό",
      value: 3.42,
      unit: "€/kg",
      target: 3.2,
      variance: 6.9,
      trend: "up",
      category: "financial",
      period: currentMonth,
      benchmark: 3.55,
    },
    {
      id: "fuel_efficiency",
      name: "Απόδοση Καυσίμων",
      value: 2.34,
      unit: "L/kg",
      target: 2.2,
      variance: 6.4,
      trend: "down",
      category: "operational",
      period: currentMonth,
      benchmark: 2.45,
    },
  ];
};

// Generate realistic forecast data
export const genForecast = (months: number = 12): ForecastData[] => {
  const forecast: ForecastData[] = [];
  const categories = ["Έσοδα", "Κόστος", "Κέρδος", "Όγκος Πωλήσεων"];
  const startDate = new Date();

  categories.forEach((category) => {
    const baseValue =
      category === "Έσοδα"
        ? 45000
        : category === "Κόστος"
          ? 35000
          : category === "Κέρδος"
            ? 10000
            : 12000;

    for (let i = 0; i < months; i++) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + i);

      const seasonality = Math.sin((i * 2 * Math.PI) / 12) * 0.2; // 20% seasonal variation
      const trend = i * 0.02; // 2% monthly growth
      const noise = (Math.random() - 0.5) * 0.1; // 10% random variation

      const forecastValue = baseValue * (1 + seasonality + trend + noise);
      const actualValue =
        i < 3 ? forecastValue * (0.9 + Math.random() * 0.2) : undefined;

      forecast.push({
        month: date.toLocaleDateString("el-GR", {
          month: "short",
          year: "numeric",
        }),
        actual: actualValue ? Math.round(actualValue) : undefined,
        forecast: Math.round(forecastValue),
        confidence: Math.max(60, 95 - i * 3), // Decreasing confidence over time
        category,
        variance: actualValue
          ? Math.round(((actualValue - forecastValue) / forecastValue) * 100)
          : undefined,
      });
    }
  });

  return forecast;
};

// Generate realistic table data
export const genTableData = (
  type: "transactions" | "vessels" | "customers" | "products",
  count: number = 20,
): TableRow[] => {
  const data: TableRow[] = [];

  switch (type) {
    case "transactions":
      for (let i = 0; i < count; i++) {
        data.push({
          id: `TXN-${String(i + 1).padStart(4, "0")}`,
          date: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
          ).toLocaleDateString("el-GR"),
          type: Math.random() > 0.5 ? "Πώληση" : "Αγορά",
          amount: Math.round((Math.random() * 5000 + 500) * 100) / 100,
          customer: SUPPLIERS[Math.floor(Math.random() * SUPPLIERS.length)],
          product:
            EXPENSE_CATEGORIES["Πρώτες Ύλες"][
              Math.floor(
                Math.random() * EXPENSE_CATEGORIES["Πρώτες Ύλες"].length,
              )
            ],
          status: Math.random() > 0.8 ? "Εκκρεμής" : "Ολοκληρώθηκε",
        });
      }
      break;

    case "vessels":
      VESSELS.slice(0, count).forEach((vessel, i) => {
        data.push({
          id: `VSL-${String(i + 1).padStart(3, "0")}`,
          name: vessel,
          type: ["Τράτα", "Παραγάδι", "Καλάμι"][Math.floor(Math.random() * 3)],
          length: Math.round((15 + Math.random() * 25) * 10) / 10,
          crew: Math.floor(Math.random() * 8) + 3,
          status: Math.random() > 0.2 ? "Ενεργό" : "Συντήρηση",
          location: ["Πειραιάς", "Θεσσαλονίκη", "Πάτρα", "Βόλος"][
            Math.floor(Math.random() * 4)
          ],
          lastCatch: Math.round((Math.random() * 2000 + 500) * 10) / 10,
        });
      });
      break;

    case "customers":
      for (let i = 0; i < count; i++) {
        data.push({
          id: `CUST-${String(i + 1).padStart(4, "0")}`,
          name: `Πελάτης ${i + 1}`,
          type: ["Λιανική", "Χονδρική", "Εστιατόριο", "Ξενοδοχείο"][
            Math.floor(Math.random() * 4)
          ],
          location: ["Αθήνα", "Θεσσαλονίκη", "Πάτρα", "Ηράκλειο"][
            Math.floor(Math.random() * 4)
          ],
          totalOrders: Math.floor(Math.random() * 50) + 5,
          totalValue: Math.round((Math.random() * 25000 + 5000) * 100) / 100,
          lastOrder: new Date(
            Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000,
          ).toLocaleDateString("el-GR"),
          status: Math.random() > 0.1 ? "Ενεργός" : "Ανενεργός",
        });
      }
      break;

    case "products":
      Object.values(EXPENSE_CATEGORIES["Πρώτες Ύλες"])
        .slice(0, count)
        .forEach((product, i) => {
          data.push({
            id: `PROD-${String(i + 1).padStart(3, "0")}`,
            name: product,
            category: "Πρώτες Ύλες",
            stock: Math.floor(Math.random() * 1000) + 100,
            unit: "kg",
            price: Math.round((Math.random() * 8 + 2) * 100) / 100,
            supplier: SUPPLIERS[Math.floor(Math.random() * SUPPLIERS.length)],
            lastRestocked: new Date(
              Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000,
            ).toLocaleDateString("el-GR"),
            minStock: Math.floor(Math.random() * 200) + 50,
          });
        });
      break;
  }

  return data;
};

// Chart data generators
export const genChartData = (
  type: "line" | "bar" | "pie" | "area",
  points: number = 12,
) => {
  switch (type) {
    case "line":
      return Array.from({ length: points }, (_, i) => ({
        month: new Date(2024, i).toLocaleDateString("el-GR", {
          month: "short",
        }),
        έσοδα: Math.round((40000 + Math.random() * 10000) * 100) / 100,
        κόστος: Math.round((30000 + Math.random() * 8000) * 100) / 100,
        κέρδος: Math.round((8000 + Math.random() * 4000) * 100) / 100,
      }));

    case "bar":
      return Object.keys(EXPENSE_CATEGORIES).map((category) => ({
        category,
        amount: Math.round((Math.random() * 15000 + 5000) * 100) / 100,
        budget: Math.round((Math.random() * 18000 + 6000) * 100) / 100,
      }));

    case "pie":
      return Object.keys(EXPENSE_CATEGORIES).map((category, i) => ({
        name: category,
        value: Math.round((Math.random() * 20 + 10) * 100) / 100,
        color: `hsl(${i * 60}, 70%, 50%)`,
      }));

    case "area":
      return Array.from({ length: points }, (_, i) => ({
        month: new Date(2024, i).toLocaleDateString("el-GR", {
          month: "short",
        }),
        actual: Math.round((40000 + Math.random() * 8000) * 100) / 100,
        forecast: Math.round((42000 + Math.random() * 6000) * 100) / 100,
        target: 45000,
      }));
  }
};

// Utility functions
export const formatCurrency = (
  amount: number,
  currency: string = "EUR",
): string => {
  return new Intl.NumberFormat("el-GR", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat("el-GR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

export const formatNumber = (value: number, unit?: string): string => {
  const formatted = new Intl.NumberFormat("el-GR").format(value);
  return unit ? `${formatted} ${unit}` : formatted;
};

// Export all generators for easy access
export const stubData = {
  expenses: genExpenses,
  kpis: genKPIs,
  forecast: genForecast,
  tableData: genTableData,
  chartData: genChartData,
  formatters: {
    currency: formatCurrency,
    percentage: formatPercentage,
    number: formatNumber,
  },
};
