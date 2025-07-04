import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FileText,
  User,
  Clock,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { complianceAPI } from "@/api/compliance";
import { AuditLog, ComplianceFilter } from "@/types/compliance";
import { useLanguage } from "@/contexts/LanguageContext";

const AuditTrail: React.FC = () => {
  const { language } = useLanguage();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [filter, setFilter] = useState<ComplianceFilter>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 20;

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [logs, filter, searchTerm]);

  const loadLogs = () => {
    const data = complianceAPI.logs.get(filter);
    setLogs(data);
  };

  const applyFilters = () => {
    let filtered = [...logs];

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.user.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "Error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "Warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "Info":
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "Error":
        return "bg-red-100 text-red-800 border-red-200";
      case "Warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Create":
        return "bg-green-50 border-green-200";
      case "Update":
        return "bg-blue-50 border-blue-200";
      case "Delete":
        return "bg-red-50 border-red-200";
      case "View":
        return "bg-gray-50 border-gray-200";
      case "Export":
        return "bg-purple-50 border-purple-200";
      case "Import":
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(language === "el" ? "el-GR" : "en-US"),
      time: date.toLocaleTimeString(language === "el" ? "el-GR" : "en-US"),
    };
  };

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage,
  );

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const exportLogs = () => {
    const csvContent = [
      [
        "Date",
        "Time",
        "Module",
        "User",
        "Action",
        "Severity",
        "Category",
        "Details",
      ].join(","),
      ...filteredLogs.map((log) => {
        const { date, time } = formatDateTime(log.timestamp);
        return [
          date,
          time,
          log.module,
          log.user,
          log.action,
          log.severity,
          log.category,
          `"${log.details.replace(/"/g, '""')}"`,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {language === "el" ? "Ιχ��ηλάτης Ελέ��χου" : "Audit Trail"}
          </CardTitle>
          <Button onClick={exportLogs} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Εξαγωγή" : "Export"}
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={
                  language === "el"
                    ? "Αναζήτηση στο ιστορικό..."
                    : "Search audit trail..."
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
              <SelectValue
                placeholder={language === "el" ? "Μονάδα" : "Module"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === "el" ? "Όλες οι μονάδες" : "All modules"}
              </SelectItem>
              <SelectItem value="HACCP">HACCP</SelectItem>
              <SelectItem value="ISO">ISO</SelectItem>
              <SelectItem value="BRC">BRC</SelectItem>
              <SelectItem value="MSC">MSC</SelectItem>
              <SelectItem value="General">
                {language === "el" ? "Γενικά" : "General"}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filter.status || "all"}
            onValueChange={(value) =>
              setFilter((prev) => ({
                ...prev,
                status: value === "all" ? undefined : value,
              }))
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue
                placeholder={language === "el" ? "Σοβαρότητα" : "Severity"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === "el" ? "Όλες" : "All severities"}
              </SelectItem>
              <SelectItem value="Critical">
                {language === "el" ? "Κρίσιμη" : "Critical"}
              </SelectItem>
              <SelectItem value="Error">
                {language === "el" ? "Σφάλμα" : "Error"}
              </SelectItem>
              <SelectItem value="Warning">
                {language === "el" ? "Προειδοποίηση" : "Warning"}
              </SelectItem>
              <SelectItem value="Info">
                {language === "el" ? "Πληροφορί��" : "Info"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {filteredLogs.length}
            </div>
            <div className="text-sm text-blue-600">
              {language === "el" ? "Συνολικά Γεγονότα" : "Total Events"}
            </div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {filteredLogs.filter((log) => log.severity === "Info").length}
            </div>
            <div className="text-sm text-green-600">
              {language === "el" ? "Πληροφοριακά" : "Info"}
            </div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredLogs.filter((log) => log.severity === "Warning").length}
            </div>
            <div className="text-sm text-yellow-600">
              {language === "el" ? "Προειδοποιήσεις" : "Warnings"}
            </div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {
                filteredLogs.filter((log) =>
                  ["Error", "Critical"].includes(log.severity),
                ).length
              }
            </div>
            <div className="text-sm text-red-600">
              {language === "el" ? "Σφάλματα" : "Errors"}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {paginatedLogs.map((log) => {
            const { date, time } = formatDateTime(log.timestamp);
            return (
              <Card
                key={log.id}
                className={`p-4 border-l-4 ${getCategoryColor(log.category)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(log.severity)}
                        <Badge
                          variant="outline"
                          className={getSeverityColor(log.severity)}
                        >
                          {log.severity}
                        </Badge>
                      </div>
                      <Badge variant="outline">{log.module}</Badge>
                      <Badge variant="secondary">{log.category}</Badge>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {date} {time}
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="font-semibold text-gray-900">
                        {log.action}
                      </span>
                      <span className="ml-2 text-sm text-gray-600 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {log.user}
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm">{log.details}</p>

                    {log.entityType && log.entityId && (
                      <div className="mt-2 text-xs text-gray-500">
                        {language === "el" ? "Οντότητα:" : "Entity:"}{" "}
                        {log.entityType} (ID: {log.entityId})
                      </div>
                    )}

                    {log.changes && Object.keys(log.changes).length > 0 && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                        <span className="font-medium">
                          {language === "el" ? "Αλλαγές:" : "Changes:"}
                        </span>
                        <pre className="mt-1 text-gray-600 whitespace-pre-wrap">
                          {JSON.stringify(log.changes, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}

          {paginatedLogs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {language === "el" ? "Δεν βρέθηκαν γεγονότα" : "No events found"}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              {language === "el"
                ? `Εμφάνιση ${(currentPage - 1) * logsPerPage + 1}-${Math.min(currentPage * logsPerPage, filteredLogs.length)} από ${filteredLogs.length} γεγονότα`
                : `Showing ${(currentPage - 1) * logsPerPage + 1}-${Math.min(currentPage * logsPerPage, filteredLogs.length)} of ${filteredLogs.length} events`}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                {language === "el" ? "Προηγούμενη" : "Previous"}
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum =
                    Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                {language === "el" ? "Επόμενη" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuditTrail;
