
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  FolderOpen,
  Calendar,
  User,
  Lock,
  Share,
  Archive,
  Tag,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  created: string;
  modified: string;
  author: string;
  status: "active" | "archived" | "pending" | "expired";
  tags: string[];
  isShared: boolean;
  isLocked: boolean;
}

const DocumentManagement: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("documents");

  // Sample document data
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Αναφορά Ποιότητας Q1 2024",
      type: "PDF",
      category: "reports",
      size: "2.4 MB",
      created: "2024-01-15",
      modified: "2024-01-20",
      author: "Μαρία Παπαδοπούλου",
      status: "active",
      tags: ["ποιότητα", "τρίμηνο", "αναφορά"],
      isShared: true,
      isLocked: false,
    },
    {
      id: "2",
      name: "Πιστοποιητικό ISO 22000",
      type: "PDF",
      category: "certificates",
      size: "1.8 MB",
      created: "2024-02-10",
      modified: "2024-02-10",
      author: "Γιάννης Νικολάου",
      status: "active",
      tags: ["iso", "πιστοποίηση", "ασφάλεια"],
      isShared: false,
      isLocked: true,
    },
    {
      id: "3",
      name: "Σύμβαση Προμηθευτή - Αλιευτικός Όμιλος",
      type: "DOCX",
      category: "contracts",
      size: "845 KB",
      created: "2024-01-28",
      modified: "2024-02-05",
      author: "Κώστας Αντωνίου",
      status: "pending",
      tags: ["σύμβαση", "προμηθευτής", "νομικά"],
      isShared: true,
      isLocked: false,
    },
    {
      id: "4",
      name: "Αναλυτικό Κόστους Παραγωγής",
      type: "XLSX",
      category: "analysis",
      size: "3.2 MB",
      created: "2024-02-01",
      modified: "2024-02-12",
      author: "Ελένη Μαυρίδου",
      status: "active",
      tags: ["κόστος", "παραγωγή", "ανάλυση"],
      isShared: true,
      isLocked: false,
    },
    {
      id: "5",
      name: "Εγχειρίδιο HACCP",
      type: "PDF",
      category: "procedures",
      size: "5.6 MB",
      created: "2023-12-15",
      modified: "2024-01-10",
      author: "Δρ. Αννα Γεωργίου",
      status: "active",
      tags: ["haccp", "διαδικασίες", "ασφάλεια"],
      isShared: false,
      isLocked: true,
    },
  ]);

  const categories = [
    { id: "all", label: language === "el" ? "Όλες οι κατηγορίες" : "All Categories" },
    { id: "reports", label: language === "el" ? "Αναφορές" : "Reports" },
    { id: "certificates", label: language === "el" ? "Πιστοποιητικά" : "Certificates" },
    { id: "contracts", label: language === "el" ? "Συμβάσεις" : "Contracts" },
    { id: "analysis", label: language === "el" ? "Αναλύσεις" : "Analysis" },
    { id: "procedures", label: language === "el" ? "Διαδικασίες" : "Procedures" },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "archived": return <Archive className="w-4 h-4" />;
      case "expired": return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === "el" ? "Διαχείριση Εγγράφων" : "Document Management"}
          </h1>
          <p className="text-gray-600">
            {language === "el" 
              ? "Οργάνωση και διαχείριση όλων των εγγράφων της επιχείρησης"
              : "Organize and manage all business documents"
            }
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            {language === "el" ? "Μεταφόρτωση" : "Upload"}
          </Button>
          <Button variant="outline">
            <FolderOpen className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέος Φάκελος" : "New Folder"}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={language === "el" ? "Αναζήτηση εγγράφων..." : "Search documents..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm bg-white"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              {language === "el" ? "Φίλτρα" : "Filters"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="documents">
            <FileText className="w-4 h-4 mr-2" />
            {language === "el" ? "Έγγραφα" : "Documents"}
          </TabsTrigger>
          <TabsTrigger value="shared">
            <Share className="w-4 h-4 mr-2" />
            {language === "el" ? "Κοινόχρηστα" : "Shared"}
          </TabsTrigger>
          <TabsTrigger value="archived">
            <Archive className="w-4 h-4 mr-2" />
            {language === "el" ? "Αρχειοθετημένα" : "Archived"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          {/* Document Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{documents.length}</p>
                    <p className="text-sm text-gray-600">
                      {language === "el" ? "Συνολικά Έγγραφα" : "Total Documents"}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {documents.filter(d => d.isShared).length}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === "el" ? "Κοινόχρηστα" : "Shared"}
                    </p>
                  </div>
                  <Share className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {documents.filter(d => d.status === "pending").length}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === "el" ? "Εκκρεμή" : "Pending"}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {documents.filter(d => d.isLocked).length}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === "el" ? "Κλειδωμένα" : "Locked"}
                    </p>
                  </div>
                  <Lock className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === "el" ? "Όνομα" : "Name"}</TableHead>
                    <TableHead>{language === "el" ? "Τύπος" : "Type"}</TableHead>
                    <TableHead>{language === "el" ? "Μέγεθος" : "Size"}</TableHead>
                    <TableHead>{language === "el" ? "Τροποποίηση" : "Modified"}</TableHead>
                    <TableHead>{language === "el" ? "Συγγραφέας" : "Author"}</TableHead>
                    <TableHead>{language === "el" ? "Κατάσταση" : "Status"}</TableHead>
                    <TableHead>{language === "el" ? "Ενέργειες" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              {doc.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {doc.isLocked && <Lock className="w-4 h-4 text-red-500" />}
                          {doc.isShared && <Share className="w-4 h-4 text-green-500" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{doc.size}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(doc.modified).toLocaleDateString("el-GR")}
                      </TableCell>
                      <TableCell className="text-sm">{doc.author}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(doc.status)}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(doc.status)}
                            <span>{doc.status}</span>
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                          {!doc.isLocked && (
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared">
          <Card>
            <CardContent className="p-8 text-center">
              <Share className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">
                {language === "el" ? "Κοινόχρηστα Έγγραφα" : "Shared Documents"}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === "el" 
                  ? "Εδώ θα εμφανίζονται τα έγγραφα που μοιράζεστε με άλλους χρήστες"
                  : "Documents shared with other users will appear here"
                }
              </p>
              <Button variant="outline">
                {language === "el" ? "Διαχείριση Κοινόχρηστων" : "Manage Shared"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardContent className="p-8 text-center">
              <Archive className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">
                {language === "el" ? "Αρχειοθετημένα Έγγραφα" : "Archived Documents"}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === "el" 
                  ? "Εδώ βρίσκονται τα έγγραφα που έχουν αρχειοθετηθεί"
                  : "Archived documents are stored here for reference"
                }
              </p>
              <Button variant="outline">
                {language === "el" ? "Προβολή Αρχείου" : "View Archive"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentManagement;
