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
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  Download,
} from "lucide-react";
import { complianceAPI } from "@/api/compliance";
import { Hazard, ComplianceFilter } from "@/types/compliance";
import { useLanguage } from "@/contexts/LanguageContext";

const HazardList: React.FC = () => {
  const { language } = useLanguage();
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [filteredHazards, setFilteredHazards] = useState<Hazard[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingHazard, setEditingHazard] = useState<Hazard | null>(null);
  const [filter, setFilter] = useState<ComplianceFilter>({});
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "Biological" as "Biological" | "Chemical" | "Physical",
    description: "",
    severity: "Medium" as "Low" | "Medium" | "High" | "Critical",
    likelihood: "Possible" as
      | "Rare"
      | "Unlikely"
      | "Possible"
      | "Likely"
      | "Almost Certain",
    controlMeasures: [""],
    responsible: "",
    status: "Active" as "Active" | "Controlled" | "Resolved",
  });

  useEffect(() => {
    loadHazards();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [hazards, filter, searchTerm]);

  const loadHazards = () => {
    const data = complianceAPI.hazards.get(filter);
    setHazards(data);
  };

  const applyFilters = () => {
    let filtered = [...hazards];

    if (searchTerm) {
      filtered = filtered.filter(
        (hazard) =>
          hazard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hazard.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredHazards(filtered);
  };

  const calculateRiskScore = (severity: string, likelihood: string): number => {
    const severityScores = { Low: 1, Medium: 2, High: 3, Critical: 4 };
    const likelihoodScores = {
      Rare: 1,
      Unlikely: 2,
      Possible: 3,
      Likely: 4,
      "Almost Certain": 5,
    };
    return (
      severityScores[severity as keyof typeof severityScores] *
      likelihoodScores[likelihood as keyof typeof likelihoodScores]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const riskScore = calculateRiskScore(
      formData.severity,
      formData.likelihood,
    );

    const hazardData = {
      ...formData,
      riskScore,
      controlMeasures: formData.controlMeasures.filter(
        (measure) => measure.trim() !== "",
      ),
      dateIdentified: new Date().toISOString().split("T")[0],
    };

    if (editingHazard) {
      complianceAPI.hazards.update(editingHazard.id, hazardData);
    } else {
      complianceAPI.hazards.create(hazardData);
    }

    resetForm();
    loadHazards();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Biological",
      description: "",
      severity: "Medium",
      likelihood: "Possible",
      controlMeasures: [""],
      responsible: "",
      status: "Active",
    });
    setEditingHazard(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (hazard: Hazard) => {
    setFormData({
      name: hazard.name,
      type: hazard.type,
      description: hazard.description,
      severity: hazard.severity,
      likelihood: hazard.likelihood,
      controlMeasures: hazard.controlMeasures.length
        ? hazard.controlMeasures
        : [""],
      responsible: hazard.responsible,
      status: hazard.status,
    });
    setEditingHazard(hazard);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm(language === "el" ? "Είστε σίγουροι;" : "Are you sure?")) {
      complianceAPI.hazards.delete(id);
      loadHazards();
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 15) return "text-red-600 font-bold";
    if (score >= 10) return "text-orange-600 font-semibold";
    if (score >= 6) return "text-yellow-600";
    return "text-green-600";
  };

  const addControlMeasure = () => {
    setFormData((prev) => ({
      ...prev,
      controlMeasures: [...prev.controlMeasures, ""],
    }));
  };

  const updateControlMeasure = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      controlMeasures: prev.controlMeasures.map((measure, i) =>
        i === index ? value : measure,
      ),
    }));
  };

  const removeControlMeasure = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      controlMeasures: prev.controlMeasures.filter((_, i) => i !== index),
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {language === "el" ? "Διαχ��ίριση Κινδύνων" : "Hazard Management"}
          </CardTitle>
          <div className="flex gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingHazard(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  {language === "el" ? "Νέος Κίνδυνος" : "Add Hazard"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingHazard
                      ? language === "el"
                        ? "Επεξεργασία Κινδύνου"
                        : "Edit Hazard"
                      : language === "el"
                        ? "Νέος Κίνδυνος"
                        : "New Hazard"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">
                      {language === "el" ? "Όνομα Κινδύνου" : "Hazard Name"}
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">
                        {language === "el" ? "Τύπος" : "Type"}
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: any) =>
                          setFormData((prev) => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Biological">
                            {language === "el" ? "Βιολογικός" : "Biological"}
                          </SelectItem>
                          <SelectItem value="Chemical">
                            {language === "el" ? "Χημικός" : "Chemical"}
                          </SelectItem>
                          <SelectItem value="Physical">
                            {language === "el" ? "Φυσικός" : "Physical"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="severity">
                        {language === "el" ? "Σοβαρότητ��" : "Severity"}
                      </Label>
                      <Select
                        value={formData.severity}
                        onValueChange={(value: any) =>
                          setFormData((prev) => ({ ...prev, severity: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">
                            {language === "el" ? "Χαμηλή" : "Low"}
                          </SelectItem>
                          <SelectItem value="Medium">
                            {language === "el" ? "Μέτρια" : "Medium"}
                          </SelectItem>
                          <SelectItem value="High">
                            {language === "el" ? "Υψηλή" : "High"}
                          </SelectItem>
                          <SelectItem value="Critical">
                            {language === "el" ? "Κρίσιμη" : "Critical"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="likelihood">
                        {language === "el" ? "Πιθανότητα" : "Likelihood"}
                      </Label>
                      <Select
                        value={formData.likelihood}
                        onValueChange={(value: any) =>
                          setFormData((prev) => ({
                            ...prev,
                            likelihood: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rare">
                            {language === "el" ? "Σπάνια" : "Rare"}
                          </SelectItem>
                          <SelectItem value="Unlikely">
                            {language === "el" ? "Απίθανη" : "Unlikely"}
                          </SelectItem>
                          <SelectItem value="Possible">
                            {language === "el" ? "Πιθανή" : "Possible"}
                          </SelectItem>
                          <SelectItem value="Likely">
                            {language === "el" ? "Πολύ πιθανή" : "Likely"}
                          </SelectItem>
                          <SelectItem value="Almost Certain">
                            {language === "el"
                              ? "Σχεδόν βέβαιη"
                              : "Almost Certain"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

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
                  </div>

                  <div>
                    <Label htmlFor="description">
                      {language === "el" ? "Περιγραφή" : "Description"}
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label>
                      {language === "el" ? "Μέτρα Ελέγχου" : "Control Measures"}
                    </Label>
                    {formData.controlMeasures.map((measure, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={measure}
                          onChange={(e) =>
                            updateControlMeasure(index, e.target.value)
                          }
                          placeholder={
                            language === "el"
                              ? "Μέτρο ελέγχου..."
                              : "Control measure..."
                          }
                        />
                        {formData.controlMeasures.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeControlMeasure(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addControlMeasure}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {language === "el" ? "Προσθήκη Μέτρου" : "Add Measure"}
                    </Button>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit">
                      {editingHazard
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
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={
                  language === "el"
                    ? "Αναζήτηση κινδύνων..."
                    : "Search hazards..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select
            value={filter.type || "all"}
            onValueChange={(value) =>
              setFilter((prev) => ({
                ...prev,
                type: value === "all" ? undefined : value,
              }))
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder={language === "el" ? "Τύπος" : "Type"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === "el" ? "Όλοι οι τύποι" : "All types"}
              </SelectItem>
              <SelectItem value="Biological">
                {language === "el" ? "Βιολογικός" : "Biological"}
              </SelectItem>
              <SelectItem value="Chemical">
                {language === "el" ? "Χημικός" : "Chemical"}
              </SelectItem>
              <SelectItem value="Physical">
                {language === "el" ? "Φυσικός" : "Physical"}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filter.severity || ""}
            onValueChange={(value) =>
              setFilter((prev) => ({ ...prev, severity: value || undefined }))
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue
                placeholder={language === "el" ? "Σοβαρότητα" : "Severity"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === "el" ? "Όλες" : "All severities"}
              </SelectItem>
              <SelectItem value="Low">
                {language === "el" ? "Χαμηλή" : "Low"}
              </SelectItem>
              <SelectItem value="Medium">
                {language === "el" ? "Μέτρια" : "Medium"}
              </SelectItem>
              <SelectItem value="High">
                {language === "el" ? "Υψηλή" : "High"}
              </SelectItem>
              <SelectItem value="Critical">
                {language === "el" ? "Κρίσιμη" : "Critical"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredHazards.map((hazard) => (
            <Card key={hazard.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{hazard.name}</h3>
                    <Badge
                      variant="outline"
                      className={`${getSeverityColor(hazard.severity)} text-white`}
                    >
                      {hazard.severity}
                    </Badge>
                    <Badge variant="outline">{hazard.type}</Badge>
                    <Badge
                      variant={
                        hazard.status === "Active" ? "destructive" : "secondary"
                      }
                    >
                      {hazard.status}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-3">{hazard.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">
                        {language === "el" ? "Βαθμός Κινδύνου:" : "Risk Score:"}
                      </span>
                      <span
                        className={`ml-2 ${getRiskColor(hazard.riskScore)}`}
                      >
                        {hazard.riskScore}/20
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">
                        {language === "el" ? "Πιθανότητα:" : "Likelihood:"}
                      </span>
                      <span className="ml-2">{hazard.likelihood}</span>
                    </div>
                    <div>
                      <span className="font-medium">
                        {language === "el" ? "Υπεύθυνος:" : "Responsible:"}
                      </span>
                      <span className="ml-2">{hazard.responsible}</span>
                    </div>
                  </div>

                  {hazard.controlMeasures.length > 0 && (
                    <div className="mt-3">
                      <span className="font-medium text-sm">
                        {language === "el"
                          ? "Μέτρα Ελέγχου:"
                          : "Control Measures:"}
                      </span>
                      <ul className="list-disc list-inside mt-1 text-sm text-gray-600">
                        {hazard.controlMeasures.map((measure, index) => (
                          <li key={index}>{measure}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(hazard)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(hazard.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredHazards.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {language === "el" ? "Δεν βρέθηκαν κίνδυνοι" : "No hazards found"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HazardList;
