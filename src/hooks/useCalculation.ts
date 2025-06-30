import { useState, useCallback, useEffect } from "react";
import type { FormData, CalculationResults } from "@/utils/calc";
import { calculateCosts, validateFormData } from "@/utils/calc";
import { toast } from "@/components/ui/sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { safeGetJSON, safeSetJSON, safeRemoveItem } from "@/utils/safeStorage";

export const useCalculation = () => {
  const { language } = useLanguage();

  const [formData, setFormData] = useState<Partial<FormData>>({
    // Basic Product Info
    productName: "",
    productType: "fish",
    weight: 0,
    quantity: 1,
    origin: "",
    quality: "A",
    notes: "",

    // Pricing (VAT default to 0%)
    purchasePrice: 0,
    targetSellingPrice: 0,
    profitMargin: 20,
    vatRate: 0, // Default 0% VAT

    // Processing - will be initialized by ProcessingPhases component
    processingPhases: [],
    totalLossPercentage: 5, // General losses default
    glazingPercentage: 0,
    glazingType: "none",

    // Costs
    directCosts: [
      { id: "1", name: "Πρώτες Ύλες", value: 0, category: "direct" },
      { id: "2", name: "Εργατικά", value: 0, category: "direct" },
      { id: "3", name: "Ενέργεια", value: 0, category: "direct" },
    ],
    indirectCosts: [
      { id: "4", name: "Γενικά Έξοδα", value: 0, category: "indirect" },
      { id: "5", name: "Αποσβέσεις", value: 0, category: "indirect" },
      { id: "6", name: "Ασφάλιστρα", value: 0, category: "indirect" },
    ],
    transportLegs: [
      {
        id: "1",
        from: "Αθήνα",
        to: "Θεσσαλονίκη",
        distance: 500,
        cost: 150,
        type: "Οδικό",
      },
    ],

    // Legacy compatibility fields
    waste: 0,
    glazingPercent: 0,
    vatPercent: 0, // Legacy, replaced by vatRate
    workers: [{ id: "1", hourlyRate: 4.5, hours: 1 }],
    boxCost: 0,
    bagCost: 0,
    distance: 0,
    fuelCost: 0,
    tolls: 0,
    parkingCost: 0,
    driverSalary: 0,
    profitTarget: 0,
    competitor1: 0,
    competitor2: 0,
    electricityCost: 0,
    equipmentCost: 0,
    insuranceCost: 0,
    rentCost: 0,
    communicationCost: 0,
    otherCosts: 0,
    originAddress: "",
    destinationAddress: "",
    routeCalculated: false,
    estimatedDuration: "",
    batchNumber: "",
    supplierName: "",
    minimumMargin: 10,
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Auto-calculate when significant fields change
  useEffect(() => {
    if (
      formData.weight &&
      formData.purchasePrice &&
      formData.targetSellingPrice
    ) {
      calculate();
    }
  }, [
    formData.weight,
    formData.quantity,
    formData.purchasePrice,
    formData.targetSellingPrice,
    formData.vatRate,
    formData.processingPhases,
    formData.totalLossPercentage,
    formData.glazingPercentage,
    formData.directCosts,
    formData.indirectCosts,
    formData.transportLegs,
  ]);

  const updateFormData = useCallback(
    (updates: Partial<FormData>) => {
      setFormData((prev) => {
        const newData = { ...prev, ...updates };

        // Clear errors when data is updated
        if (errors.length > 0) {
          setErrors([]);
        }

        return newData;
      });
    },
    [errors.length],
  );

  const calculate = useCallback(async () => {
    if (!formData.weight || !formData.purchasePrice) {
      const missingFields = [];
      if (!formData.weight)
        missingFields.push(language === "el" ? "Βάρος" : "Weight");
      if (!formData.purchasePrice)
        missingFields.push(
          language === "el" ? "Τιμή Αγοράς" : "Purchase Price",
        );

      toast.warning(
        language === "el"
          ? `Παρακαλώ συμπληρώστε: ${missingFields.join(", ")}`
          : `Please fill in: ${missingFields.join(", ")}`,
      );
      return;
    }

    setIsCalculating(true);
    setErrors([]);

    try {
      // Validate form data
      const validationErrors = validateFormData(formData as FormData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        validationErrors.forEach((error) => {
          toast.error(error);
        });
        return;
      }

      // Perform calculation
      const calculationResults = calculateCosts(formData as FormData);
      setResults(calculationResults);

      // Success feedback
      toast.success(
        language === "el"
          ? "Υπολογισμός ολοκληρώθηκε επιτυχώς!"
          : "Calculation completed successfully!",
      );

      // Auto-save to localStorage
      safeSetJSON("kostoProFormData", formData);
      safeSetJSON("kostoProResults", calculationResults);
    } catch (error) {
      console.error("Calculation error:", error);
      const errorMessage =
        language === "el"
          ? "Σφάλμα κατά τον υπολογισμό. Παρακαλώ ελέγξτε τα δεδομένα σας."
          : "Error during calculation. Please check your data.";

      toast.error(errorMessage);
      setErrors([errorMessage]);
    } finally {
      setIsCalculating(false);
    }
  }, [formData, language]);

  const resetForm = useCallback(() => {
    const defaultData: Partial<FormData> = {
      productName: "",
      productType: "fish",
      weight: 0,
      quantity: 1,
      purchasePrice: 0,
      targetSellingPrice: 0,
      profitMargin: 20,
      vatRate: 0,
      origin: "",
      quality: "A",
      notes: "",
      processingPhases: [],
      totalLossPercentage: 5,
      glazingPercentage: 0,
      glazingType: "none",
      directCosts: [
        { id: "1", name: "Πρώτες Ύλες", value: 0, category: "direct" },
        { id: "2", name: "Εργατικά", value: 0, category: "direct" },
        { id: "3", name: "Ενέργεια", value: 0, category: "direct" },
      ],
      indirectCosts: [
        { id: "4", name: "Γενικά Έξοδα", value: 0, category: "indirect" },
        { id: "5", name: "Αποσβέσεις", value: 0, category: "indirect" },
        { id: "6", name: "Ασφάλιστρα", value: 0, category: "indirect" },
      ],
      transportLegs: [
        { id: "1", from: "", to: "", distance: 0, cost: 0, type: "Οδικό" },
      ],
    };

    setFormData(defaultData);
    setResults(null);
    setErrors([]);

    // Clear localStorage
    safeRemoveItem("kostoProFormData");
    safeRemoveItem("kostoProResults");

    toast.success(
      language === "el"
        ? "Η φόρμα επαναφέρθηκε στις αρχικές τιμές"
        : "Form has been reset to default values",
    );
  }, [language]);

  const loadSavedData = useCallback(() => {
    try {
      const savedFormData = safeGetJSON("kostoProFormData", null);
      const savedResults = safeGetJSON("kostoProResults", null);

      if (savedFormData) {
        const parsedFormData = JSON.parse(savedFormData);
        setFormData(parsedFormData);

        toast.info(
          language === "el"
            ? "Φορτώθηκαν αποθηκευμένα δεδομένα"
            : "Loaded saved data",
        );
      }

      if (savedResults) {
        const parsedResults = JSON.parse(savedResults);
        setResults(parsedResults);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  }, [language]);

  const exportData = useCallback(() => {
    const exportData = {
      formData,
      results,
      exportDate: new Date().toISOString(),
      version: "2.0",
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `kostopro-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(
      language === "el"
        ? "Δεδομένα εξήχθησαν επιτυχώς"
        : "Data exported successfully",
    );
  }, [formData, results, language]);

  const importData = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);

          if (data.formData) {
            setFormData(data.formData);
          }
          if (data.results) {
            setResults(data.results);
          }

          toast.success(
            language === "el"
              ? "Δεδομένα εισήχθησαν επιτυχώς"
              : "Data imported successfully",
          );
        } catch (error) {
          toast.error(
            language === "el"
              ? "Σφάλμα κατά την εισαγωγή δεδομένων"
              : "Error importing data",
          );
        }
      };
      reader.readAsText(file);
    },
    [language],
  );

  // Load saved data on mount
  useEffect(() => {
    loadSavedData();
  }, [loadSavedData]);

  return {
    formData,
    results,
    isCalculating,
    errors,
    updateFormData,
    calculate,
    resetForm,
    exportData,
    importData,
    loadSavedData,
  };
};

export type UseCalculationReturn = ReturnType<typeof useCalculation>;
