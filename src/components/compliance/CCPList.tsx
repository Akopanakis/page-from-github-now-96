import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { complianceAPI } from "@/api/compliance";
import { CCP, Hazard } from "@/types/compliance";
import { useLanguage } from "@/contexts/LanguageContext";

const CCPList: React.FC = () => {
  const { language } = useLanguage();
  const [ccps, setCCPs] = useState<CCP[]>([]);
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCCP, setEditingCCP] = useState<CCP | null>(null);

  const [formData, setFormData] = useState({
    hazardId: "",
    step: "",
    criticalLimit: "",
    monitoringFrequency: "",
    monitoringMethod: "",
    correctiveActions: [""],
    verification: "",
    recordKeeping: "",
    responsible: "",
    status: "Active" as "Active" | "Inactive" | "Under Review",
    compliance: "Compliant" as "Compliant" | "Non-Compliant" | "Pending",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const ccpData = complianceAPI.ccps.get();
    const hazardData = complianceAPI.hazards.get();
    setCCPs(ccpData);
    setHazards(hazardData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ccpData = {
      ...formData,
      correctiveActions: formData.correctiveActions.filter(
        (action) => action.trim() !== "",
      ),
      dateEstablished: new Date().toISOString().split("T")[0],
      lastMonitored: new Date().toISOString().split("T")[0],
    };

    if (editingCCP) {
      complianceAPI.ccps.update(editingCCP.id, ccpData);
    } else {
      complianceAPI.ccps.create(ccpData);
    }

    resetForm();
    loadData();
  };

  const resetForm = () => {
    setFormData({
      hazardId: "",
      step: "",
      criticalLimit: "",
      monitoringFrequency: "",
      monitoringMethod: "",
      correctiveActions: [""],
      verification: "",
      recordKeeping: "",
      responsible: "",
      status: "Active",
      compliance: "Compliant",
    });
    setEditingCCP(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (ccp: CCP) => {
    setFormData({
      hazardId: ccp.hazardId,
      step: ccp.step,
      criticalLimit: ccp.criticalLimit,
      monitoringFrequency: ccp.monitoringFrequency,
      monitoringMethod: ccp.monitoringMethod,
      correctiveActions: ccp.correctiveActions.length
        ? ccp.correctiveActions
        : [""],
      verification: ccp.verification,
      recordKeeping: ccp.recordKeeping,
      responsible: ccp.responsible,
      status: ccp.status,
      compliance: ccp.compliance,
    });
    setEditingCCP(ccp);
    setIsAddDialogOpen(true);
  };

  const getComplianceIcon = (compliance: string) => {
    switch (compliance) {
      case "Compliant":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Non-Compliant":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case "Compliant":
        return "bg-green-100 text-green-800 border-green-200";
      case "Non-Compliant":
        return "bg-red-100 text-red-800 border-red-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const addCorrectiveAction = () => {
    setFormData((prev) => ({
      ...prev,
      correctiveActions: [...prev.correctiveActions, ""],
    }));
  };

  const updateCorrectiveAction = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      correctiveActions: prev.correctiveActions.map((action, i) =>
        i === index ? value : action,
      ),
    }));
  };

  const removeCorrectiveAction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      correctiveActions: prev.correctiveActions.filter((_, i) => i !== index),
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {language === "el"
              ? "Κρίσιμα Σημεία Ελέγχου (CCP)"
              : "Critical Control Points (CCP)"}
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCCP(null)}>
                <Plus className="w-4 h-4 mr-2" />
                {language === "el" ? "Νέο CCP" : "Add CCP"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCCP
                    ? language === "el"
                      ? "Επεξεργασία CCP"
                      : "Edit CCP"
                    : language === "el"
                      ? "Νέο CCP"
                      : "New CCP"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hazardId">
                      {language === "el" ? "Κίνδυνος" : "Hazard"}
                    </Label>
                    <Select
                      value={formData.hazardId}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, hazardId: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            language === "el"
                              ? "Επιλέξτε κίνδυνο"
                              : "Select hazard"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {hazards.map((hazard) => (
                          <SelectItem key={hazard.id} value={hazard.id}>
                            {hazard.name} ({hazard.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="step">
                      {language === "el" ? "Βήμα Διαδικασίας" : "Process Step"}
                    </Label>
                    <Input
                      id="step"
                      value={formData.step}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          step: e.target.value,
                        }))
                      }
                      placeholder={
                        language === "el"
                          ? "π.χ. Θερμική επεξεργασία"
                          : "e.g. Thermal processing"
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="criticalLimit">
                    {language === "el" ? "Κρίσιμο Όριο" : "Critical Limit"}
                  </Label>
                  <Input
                    id="criticalLimit"
                    value={formData.criticalLimit}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        criticalLimit: e.target.value,
                      }))
                    }
                    placeholder={
                      language === "el"
                        ? "π.χ. Θερμοκρασία ≥ 75°C για 2 λεπτά"
                        : "e.g. Temperature ≥ 75°C for 2 minutes"
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monitoringFrequency">
                      {language === "el"
                        ? "Συχνότητα Παρακολούθησης"
                        : "Monitoring Frequency"}
                    </Label>
                    <Input
                      id="monitoringFrequency"
                      value={formData.monitoringFrequency}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          monitoringFrequency: e.target.value,
                        }))
                      }
                      placeholder={
                        language === "el"
                          ? "π.χ. Κάθε παρτίδα"
                          : "e.g. Every batch"
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="monitoringMethod">
                      {language === "el"
                        ? "Μέθοδος Παρακολούθησης"
                        : "Monitoring Method"}
                    </Label>
                    <Input
                      id="monitoringMethod"
                      value={formData.monitoringMethod}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          monitoringMethod: e.target.value,
                        }))
                      }
                      placeholder={
                        language === "el"
                          ? "π.χ. Βαθμονομημένο θερμόμετρο"
                          : "e.g. Calibrated thermometer"
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>
                    {language === "el"
                      ? "Διορθωτικές Ενέργειες"
                      : "Corrective Actions"}
                  </Label>
                  {formData.correctiveActions.map((action, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={action}
                        onChange={(e) =>
                          updateCorrectiveAction(index, e.target.value)
                        }
                        placeholder={
                          language === "el"
                            ? "Διορθωτική ενέργεια..."
                            : "Corrective action..."
                        }
                      />
                      {formData.correctiveActions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeCorrectiveAction(index)}
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCorrectiveAction}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {language === "el" ? "Προσθήκη Ενέργειας" : "Add Action"}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="verification">
                      {language === "el" ? "Επαλήθευση" : "Verification"}
                    </Label>
                    <Input
                      id="verification"
                      value={formData.verification}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          verification: e.target.value,
                        }))
                      }
                      placeholder={
                        language === "el"
                          ? "π.χ. Εβδομαδιαίος έλεγχος"
                          : "e.g. Weekly check"
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="recordKeeping">
                      {language === "el" ? "Τήρηση Αρχείων" : "Record Keeping"}
                    </Label>
                    <Input
                      id="recordKeeping"
                      value={formData.recordKeeping}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          recordKeeping: e.target.value,
                        }))
                      }
                      placeholder={
                        language === "el"
                          ? "π.χ. Φύλλα καταγραφής θερμοκρασίας"
                          : "e.g. Temperature log sheets"
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="responsible">
                      {language === "el" ? "Υπεύθυνος" : "Responsible"}
                    </Label>
                    <Input
                      id="responsible"
                      value={formData.responsible}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          responsible: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">
                      {language === "el" ? "Κατάσταση" : "Status"}
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) =>
                        setFormData((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">
                          {language === "el" ? "Ενεργό" : "Active"}
                        </SelectItem>
                        <SelectItem value="Inactive">
                          {language === "el" ? "Ανενεργό" : "Inactive"}
                        </SelectItem>
                        <SelectItem value="Under Review">
                          {language === "el" ? "Υπό Εξέταση" : "Under Review"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="compliance">
                      {language === "el" ? "Συμμόρφωση" : "Compliance"}
                    </Label>
                    <Select
                      value={formData.compliance}
                      onValueChange={(value: any) =>
                        setFormData((prev) => ({ ...prev, compliance: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Compliant">
                          {language === "el" ? "Συμμορφώνεται" : "Compliant"}
                        </SelectItem>
                        <SelectItem value="Non-Compliant">
                          {language === "el"
                            ? "Δεν συμμορφώνεται"
                            : "Non-Compliant"}
                        </SelectItem>
                        <SelectItem value="Pending">
                          {language === "el" ? "Εκκρεμεί" : "Pending"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit">
                    {editingCCP
                      ? language === "el"
                        ? "Ενημέρωση"
                        : "Update"
                      : language === "el"
                        ? "Δημιουργία"
                        : "Create"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    {language === "el" ? "Ακύρωση" : "Cancel"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {ccps.map((ccp) => (
            <Card key={ccp.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{ccp.step}</h3>
                    <Badge
                      variant="outline"
                      className={getComplianceColor(ccp.compliance)}
                    >
                      {getComplianceIcon(ccp.compliance)}
                      <span className="ml-1">{ccp.compliance}</span>
                    </Badge>
                    <Badge
                      variant={
                        ccp.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {ccp.status}
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">
                      {language === "el" ? "Κίνδυνος:" : "Hazard:"}
                    </span>
                    <span className="ml-2">{ccp.hazardName}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">
                        {language === "el"
                          ? "Κ��ίσιμο Όριο:"
                          : "Critical Limit:"}
                      </span>
                      <p className="mt-1 text-gray-600">{ccp.criticalLimit}</p>
                    </div>
                    <div>
                      <span className="font-medium">
                        {language === "el" ? "Παρακολούθηση:" : "Monitoring:"}
                      </span>
                      <p className="mt-1 text-gray-600">
                        {ccp.monitoringMethod} ({ccp.monitoringFrequency})
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">
                        {language === "el" ? "Επαλήθευση:" : "Verification:"}
                      </span>
                      <p className="mt-1 text-gray-600">{ccp.verification}</p>
                    </div>
                    <div>
                      <span className="font-medium">
                        {language === "el" ? "Υπεύθυνος:" : "Responsible:"}
                      </span>
                      <p className="mt-1 text-gray-600">{ccp.responsible}</p>
                    </div>
                  </div>

                  {ccp.correctiveActions.length > 0 && (
                    <div className="mt-3">
                      <span className="font-medium text-sm">
                        {language === "el"
                          ? "Διορθωτικές Ενέργειες:"
                          : "Corrective Actions:"}
                      </span>
                      <ul className="list-disc list-inside mt-1 text-sm text-gray-600">
                        {ccp.correctiveActions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ccp.lastMonitored && (
                    <div className="mt-3 text-sm text-gray-500">
                      {language === "el"
                        ? "Τελευταίος έλεγχος:"
                        : "Last monitored:"}{" "}
                      {new Date(ccp.lastMonitored).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(ccp)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {ccps.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {language === "el" ? "Δε�� βρέθηκαν CCP" : "No CCPs found"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CCPList;
