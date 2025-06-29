import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BatchManagement: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>
            {language === "el" ? "Διαχείριση Παρτίδων" : "Batch Management"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {language === "el"
            ? "Διαχείριση παρτίδων προϊόντων..."
            : "Manage product batches..."}
        </p>
      </CardContent>
    </Card>
  );
};

export default BatchManagement;
