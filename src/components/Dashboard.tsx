import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>{language === "el" ? "Dashboard" : "Dashboard"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {language === "el"
            ? "Επισκόπηση δεδομένων και στατιστικών..."
            : "Data overview and statistics..."}
        </p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
