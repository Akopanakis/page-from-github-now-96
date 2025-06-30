import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CompanyInfo } from "@/types/company";
import { safeGetJSON } from "@/utils/safeStorage";

interface CompanySettingsProps {
  onChange: (info: CompanyInfo) => void;
}

const CompanySettings: React.FC<CompanySettingsProps> = ({ onChange }) => {
  const { language } = useLanguage();
  const [companyInfo, setCompanyInfo] = React.useState<CompanyInfo>(() => {
    return safeGetJSON("companyInfo", { logoUrl: "", name: "", address: "" });
  });

  const handleChange = (field: keyof CompanyInfo, value: string) => {
    const updated = { ...companyInfo, [field]: value };
    setCompanyInfo(updated);
    onChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="w-5 h-5" />
          <span>
            {language === "el" ? "Στοιχεία Εταιρείας" : "Company Details"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">
            {language === "el" ? "Όνομα Εταιρείας" : "Company Name"}
          </Label>
          <Input
            id="companyName"
            value={companyInfo.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={language === "el" ? "Όνομα εταιρείας" : "Company name"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyAddress">
            {language === "el" ? "Διεύθυνση" : "Address"}
          </Label>
          <Input
            id="companyAddress"
            value={companyInfo.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder={
              language === "el" ? "Διεύθυνση εταιρείας" : "Company address"
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoUrl">
            {language === "el" ? "URL Λογοτύπου" : "Logo URL"}
          </Label>
          <Input
            id="logoUrl"
            value={companyInfo.logoUrl || ""}
            onChange={(e) => handleChange("logoUrl", e.target.value)}
            placeholder={
              language === "el"
                ? "https://example.com/logo.png"
                : "https://example.com/logo.png"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySettings;
