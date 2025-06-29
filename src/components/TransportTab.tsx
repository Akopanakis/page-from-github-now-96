import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, MapPin, Fuel } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TransportTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const TransportTab: React.FC<TransportTabProps> = ({
  formData,
  updateFormData,
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Route Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>
              {language === "el" ? "Στοιχεία Διαδρομής" : "Route Information"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originAddress">
                {language === "el" ? "Διεύθυνση Αφετηρίας" : "Origin Address"}
              </Label>
              <Input
                id="originAddress"
                value={formData.originAddress || ""}
                onChange={(e) =>
                  updateFormData({ originAddress: e.target.value })
                }
                placeholder={
                  language === "el" ? "Αθήνα, Ελλάδα" : "Athens, Greece"
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationAddress">
                {language === "el"
                  ? "Διεύθυνση Προορισμού"
                  : "Destination Address"}
              </Label>
              <Input
                id="destinationAddress"
                value={formData.destinationAddress || ""}
                onChange={(e) =>
                  updateFormData({ destinationAddress: e.target.value })
                }
                placeholder={
                  language === "el"
                    ? "Θεσσαλονίκη, Ελλάδα"
                    : "Thessaloniki, Greece"
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance">
                {language === "el" ? "Απόσταση (km)" : "Distance (km)"}
              </Label>
              <Input
                id="distance"
                type="number"
                step="0.1"
                value={formData.distance || ""}
                onChange={(e) =>
                  updateFormData({ distance: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedDuration">
                {language === "el"
                  ? "Εκτιμώμενη Διάρκεια"
                  : "Estimated Duration"}
              </Label>
              <Input
                id="estimatedDuration"
                value={formData.estimatedDuration || ""}
                onChange={(e) =>
                  updateFormData({ estimatedDuration: e.target.value })
                }
                placeholder="2h 30m"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transport Costs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="w-5 h-5" />
            <span>
              {language === "el" ? "Κόστη Μεταφοράς" : "Transport Costs"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuelCost">
                {language === "el"
                  ? "Κόστος Καυσίμου (€/km)"
                  : "Fuel Cost (€/km)"}
              </Label>
              <Input
                id="fuelCost"
                type="number"
                step="0.01"
                value={formData.fuelCost || ""}
                onChange={(e) =>
                  updateFormData({ fuelCost: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tolls">
                {language === "el" ? "Διόδια (€)" : "Tolls (€)"}
              </Label>
              <Input
                id="tolls"
                type="number"
                step="0.01"
                value={formData.tolls || ""}
                onChange={(e) =>
                  updateFormData({ tolls: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parkingCost">
                {language === "el" ? "Κόστος Parking (€)" : "Parking Cost (€)"}
              </Label>
              <Input
                id="parkingCost"
                type="number"
                step="0.01"
                value={formData.parkingCost || ""}
                onChange={(e) =>
                  updateFormData({
                    parkingCost: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driverSalary">
                {language === "el" ? "Μισθός Οδηγού (€)" : "Driver Salary (€)"}
              </Label>
              <Input
                id="driverSalary"
                type="number"
                step="0.01"
                value={formData.driverSalary || ""}
                onChange={(e) =>
                  updateFormData({
                    driverSalary: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportTab;
