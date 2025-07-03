import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Download,
  Upload,
  FileText,
  Send,
  Activity,
  Target,
  Zap,
  Globe,
  Building,
  CreditCard,
  Package,
  ShoppingCart,
  Truck,
  UserCheck,
  UserX,
  Heart,
  ThumbsUp,
  MessageSquare,
  Bell,
  Settings,
  MoreVertical,
  ExternalLink,
  Copy,
  Archive,
  RefreshCw,
  Calendar as CalendarIcon,
  Timer,
  Percent,
  ArrowUpDown,
  Trophy,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { realisticSeafoodData } from "@/mock/realisticSeafoodData";

interface CustomerManagementProps {
  className?: string;
}

const CustomerManagement: React.FC<CustomerManagementProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortField, setSortField] = useState("loyaltyScore");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const customers = realisticSeafoodData.customers;
  const orders = realisticSeafoodData.orders;

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contact.person
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || customer.type === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      restaurant: "bg-purple-100 text-purple-800",
      retailer: "bg-blue-100 text-blue-800",
      wholesaler: "bg-green-100 text-green-800",
      processor: "bg-orange-100 text-orange-800",
      exporter: "bg-pink-100 text-pink-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getLoyaltyColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getLoyaltyBadge = (score: number) => {
    if (score >= 90)
      return { label: "Platinum", color: "bg-purple-100 text-purple-800" };
    if (score >= 75)
      return { label: "Gold", color: "bg-yellow-100 text-yellow-800" };
    if (score >= 60)
      return { label: "Silver", color: "bg-gray-100 text-gray-800" };
    return { label: "Bronze", color: "bg-orange-100 text-orange-800" };
  };

  // Calculate customer metrics
  const customerMetrics = {
    total: customers.length,
    restaurants: customers.filter((c) => c.type === "restaurant").length,
    retailers: customers.filter((c) => c.type === "retailer").length,
    wholesalers: customers.filter((c) => c.type === "wholesaler").length,
    processors: customers.filter((c) => c.type === "processor").length,
    avgLoyaltyScore:
      customers.reduce((sum, c) => sum + c.loyaltyScore, 0) / customers.length,
    totalCreditLimit: customers.reduce((sum, c) => sum + c.creditLimit, 0),
    totalBalance: customers.reduce((sum, c) => sum + c.currentBalance, 0),
    avgOrderValue:
      customers.reduce((sum, c) => sum + c.averageOrderValue, 0) /
      customers.length,
    highValueCustomers: customers.filter((c) => c.averageOrderValue > 2000)
      .length,
    newCustomers: customers.filter((c) => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return c.registrationDate >= monthAgo;
    }).length,
  };

  // Customer Overview Widget
  const CustomerOverviewWidget = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el" ? "Συνολικοί Πελάτες" : "Total Customers"}
              </p>
              <p className="text-2xl font-bold">{customerMetrics.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el"
                  ? "Μέσος Βαθμός Πιστότητας"
                  : "Avg Loyalty Score"}
              </p>
              <p className="text-2xl font-bold">
                {customerMetrics.avgLoyaltyScore.toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el"
                  ? "Μέση Αξία Παραγγελίας"
                  : "Avg Order Value"}
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(customerMetrics.avgOrderValue)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el" ? "Υψηλής Αξίας" : "High Value"}
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {customerMetrics.highValueCustomers}
              </p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Customer Types Widget
  const CustomerTypesWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Building className="w-4 h-4 mr-2 text-blue-600" />
          {language === "el" ? "Τύποι Πελατών" : "Customer Types"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {[
            {
              type: "restaurant",
              count: customerMetrics.restaurants,
              label: language === "el" ? "Εστιατόρια" : "Restaurants",
            },
            {
              type: "retailer",
              count: customerMetrics.retailers,
              label: language === "el" ? "Λιανικά" : "Retailers",
            },
            {
              type: "wholesaler",
              count: customerMetrics.wholesalers,
              label: language === "el" ? "Χονδρικά" : "Wholesalers",
            },
            {
              type: "processor",
              count: customerMetrics.processors,
              label: language === "el" ? "Επεξεργαστές" : "Processors",
            },
          ].map((item) => (
            <div key={item.type} className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge className={getTypeColor(item.type)} />
                <span className="ml-2 text-sm">{item.label}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-2">{item.count}</span>
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{
                      width: `${(item.count / customerMetrics.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Top Customers Widget
  const TopCustomersWidget = () => {
    const topCustomers = customers
      .sort((a, b) => b.averageOrderValue - a.averageOrderValue)
      .slice(0, 5);

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm">
            <Trophy className="w-4 h-4 mr-2 text-yellow-600" />
            {language === "el" ? "Κορυφαίοι Πελάτες" : "Top Customers"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {topCustomers.map((customer, index) => {
            const loyaltyBadge = getLoyaltyBadge(customer.loyaltyScore);
            return (
              <div
                key={customer.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
              >
                <div className="flex items-center flex-1 min-w-0">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-800 mr-2">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {formatCurrency(customer.averageOrderValue)}
                  </div>
                  <Badge className={`${loyaltyBadge.color} text-xs`}>
                    {loyaltyBadge.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  // Quick Actions Widget
  const QuickActionsWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Zap className="w-4 h-4 mr-2 text-yellow-600" />
          {language === "el" ? "Γρήγορες Ενέργειες" : "Quick Actions"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Plus className="w-4 h-4 mr-2" />
          {language === "el" ? "Νέος Πελάτης" : "New Customer"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Send className="w-4 h-4 mr-2" />
          {language === "el" ? "Μαζική Αποστολή Email" : "Bulk Email"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <FileText className="w-4 h-4 mr-2" />
          {language === "el" ? "Εξαγωγή Λίστας" : "Export List"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Target className="w-4 h-4 mr-2" />
          {language === "el" ? "Στοχευμένο Marketing" : "Target Marketing"}
        </Button>
      </CardContent>
    </Card>
  );

  // Customer Details Panel
  const CustomerDetailsPanel = ({ customerId }: { customerId: string }) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return null;

    const customerOrders = orders.filter((o) => o.customerId === customerId);
    const totalOrders = customerOrders.length;
    const totalSpent = customerOrders.reduce(
      (sum, order) => sum + order.total,
      0,
    );
    const loyaltyBadge = getLoyaltyBadge(customer.loyaltyScore);

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              {customer.name}
            </span>
            <div className="flex items-center space-x-2">
              <Badge className={getTypeColor(customer.type)}>
                {customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}
              </Badge>
              <Badge className={loyaltyBadge.color}>
                <Star className="w-3 h-3 mr-1" />
                {loyaltyBadge.label}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">
                {language === "el" ? "Στοιχεία" : "Details"}
              </TabsTrigger>
              <TabsTrigger value="orders">
                {language === "el" ? "Παραγγελίες" : "Orders"}
              </TabsTrigger>
              <TabsTrigger value="preferences">
                {language === "el" ? "Προτιμήσεις" : "Preferences"}
              </TabsTrigger>
              <TabsTrigger value="analytics">
                {language === "el" ? "Αναλυτικά" : "Analytics"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el"
                        ? "Υπεύθυνος Επικοινωνίας"
                        : "Contact Person"}
                    </Label>
                    <div className="font-medium">{customer.contact.person}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Email" : "Email"}
                    </Label>
                    <div className="font-medium flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {customer.contact.email}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Τηλέφωνο" : "Phone"}
                    </Label>
                    <div className="font-medium flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {customer.contact.phone}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el"
                        ? "Ημερομηνία Εγγραφής"
                        : "Registration Date"}
                    </Label>
                    <div className="font-medium">
                      {customer.registrationDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Όριο Πίστωσης" : "Credit Limit"}
                    </Label>
                    <div className="font-medium">
                      {formatCurrency(customer.creditLimit)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el"
                        ? "Τρέχον Υπόλοιπο"
                        : "Current Balance"}
                    </Label>
                    <div className="font-medium">
                      {formatCurrency(customer.currentBalance)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Όροι Πληρωμής" : "Payment Terms"}
                    </Label>
                    <div className="font-medium">
                      {customer.paymentTerms}{" "}
                      {language === "el" ? "ημέρες" : "days"}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el"
                        ? "Βαθμός Πιστότητας"
                        : "Loyalty Score"}
                    </Label>
                    <div className="flex items-center">
                      <Progress
                        value={customer.loyaltyScore}
                        className="flex-1 mr-2"
                      />
                      <span
                        className={`font-bold ${getLoyaltyColor(customer.loyaltyScore)}`}
                      >
                        {customer.loyaltyScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-sm text-gray-600">
                  {language === "el" ? "Διεύθυνση" : "Address"}
                </Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm flex items-start">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                  {customer.contact.address}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{totalOrders}</div>
                    <div className="text-sm text-gray-600">
                      {language === "el"
                        ? "Συνολικές Παραγγελίες"
                        : "Total Orders"}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">
                      {formatCurrency(totalSpent)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Συνολικές Δαπάνες" : "Total Spent"}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold">
                      {formatCurrency(customer.averageOrderValue)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Μέση Αξία" : "Average Value"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {language === "el" ? "ID Παραγγελίας" : "Order ID"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Ημερομηνία" : "Date"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Κατάσταση" : "Status"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Σύνολο" : "Total"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerOrders.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        {order.id}
                      </TableCell>
                      <TableCell>{order.date.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "processing"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(order.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">
                    {language === "el"
                      ? "Προτιμώμενα Προϊόντα"
                      : "Preferred Products"}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {customer.preferredProducts.map((product, index) => (
                      <Badge key={index} variant="outline">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">
                    {language === "el"
                      ? "Απαιτήσεις Ποιότητας"
                      : "Quality Requirements"}
                  </Label>
                  <div className="space-y-2 p-3 bg-gray-50 rounded-md text-sm">
                    <div className="flex justify-between">
                      <span>
                        {language === "el"
                          ? "Ελάχιστος Βαθμός:"
                          : "Minimum Grade:"}
                      </span>
                      <Badge>{customer.qualityRequirements.minGrade}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {language === "el" ? "Συσκευασία:" : "Packaging:"}
                      </span>
                      <span>{customer.qualityRequirements.packaging}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">
                    {language === "el"
                      ? "Πρόγραμμα Παράδοσης"
                      : "Delivery Schedule"}
                  </Label>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    {customer.deliverySchedule}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {language === "el"
                        ? "Εποχιακή Ζήτηση"
                        : "Seasonal Demand"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-48">
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">
                          {language === "el"
                            ? "Γράφημα εποχιακής ζήτησης"
                            : "Seasonal demand chart"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {language === "el"
                        ? "Ιστορικό Πωλήσεων"
                        : "Sales History"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-48">
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">
                          {language === "el"
                            ? "Γράφημα ιστορικού πωλήσεων"
                            : "Sales history chart"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
            <Button size="sm" variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              {language === "el" ? "Αποστολή Email" : "Send Email"}
            </Button>
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              {language === "el" ? "Κλήση" : "Call"}
            </Button>
            <Button size="sm" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              {language === "el" ? "Νέα Παραγγελία" : "New Order"}
            </Button>
            <Button size="sm">
              <Edit className="w-4 h-4 mr-2" />
              {language === "el" ? "Επεξεργασία" : "Edit"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el" ? "Διαχείριση Πελατών" : "Customer Management"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Διαχείριση σχέσεων και αλληλεπιδράσεων με πελάτες"
              : "Manage customer relationships and interactions"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {customerMetrics.total}{" "}
            {language === "el" ? "πελάτες" : "customers"}
          </Badge>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Εξαγωγή" : "Export"}
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέος Πελάτης" : "New Customer"}
          </Button>
        </div>
      </div>

      {/* Customer Overview */}
      <CustomerOverviewWidget />

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="customers">
            {language === "el" ? "Πελάτες" : "Customers"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === "el" ? "Αναλυτικά" : "Analytics"}
          </TabsTrigger>
          <TabsTrigger value="campaigns">
            {language === "el" ? "Καμπάνιες" : "Campaigns"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Charts area */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    {language === "el"
                      ? "Κατανομή Πελατών"
                      : "Customer Distribution"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Γράφημα κατανομής πελατών"
                          : "Customer distribution chart"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    {language === "el"
                      ? "Τάσεις Πωλήσεων ανά Πελάτη"
                      : "Sales Trends by Customer"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Γράφημα τάσεων πωλήσεων"
                          : "Sales trends chart"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right sidebar widgets */}
            <div className="space-y-6">
              <CustomerTypesWidget />
              <TopCustomersWidget />
              <QuickActionsWidget />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">
                    {language === "el" ? "Αναζήτηση" : "Search"}
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder={
                        language === "el"
                          ? "Όνομα, επικοινωνία, email..."
                          : "Name, contact, email..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">
                    {language === "el" ? "Τύπος" : "Type"}
                  </Label>
                  <select
                    id="type"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">
                      {language === "el" ? "Όλοι" : "All"}
                    </option>
                    <option value="restaurant">
                      {language === "el" ? "Εστιατόρια" : "Restaurants"}
                    </option>
                    <option value="retailer">
                      {language === "el" ? "Λιανικά" : "Retailers"}
                    </option>
                    <option value="wholesaler">
                      {language === "el" ? "Χονδρικά" : "Wholesalers"}
                    </option>
                    <option value="processor">
                      {language === "el" ? "Επεξεργαστές" : "Processors"}
                    </option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="sort">
                    {language === "el" ? "Ταξινόμηση" : "Sort By"}
                  </Label>
                  <select
                    id="sort"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="loyaltyScore">
                      {language === "el"
                        ? "Βαθμός Πιστότητας"
                        : "Loyalty Score"}
                    </option>
                    <option value="averageOrderValue">
                      {language === "el" ? "Μέση Αξία" : "Average Value"}
                    </option>
                    <option value="registrationDate">
                      {language === "el"
                        ? "Ημερομηνία Εγγραφής"
                        : "Registration Date"}
                    </option>
                    <option value="name">
                      {language === "el" ? "Όνομα" : "Name"}
                    </option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    {sortOrder === "asc"
                      ? language === "el"
                        ? "Αύξουσα"
                        : "Ascending"
                      : language === "el"
                        ? "Φθίνουσα"
                        : "Descending"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el" ? "Λίστα Πελατών" : "Customer List"}
                </span>
                <Badge variant="outline">
                  {filteredCustomers.length}{" "}
                  {language === "el" ? "πελάτες" : "customers"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {language === "el" ? "Όνομα" : "Name"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Τύπος" : "Type"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Επικοινωνία" : "Contact"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Πιστότητα" : "Loyalty"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Μέση Αξία" : "Avg Value"}
                    </TableHead>
                    <TableHead>
                      {language === "el"
                        ? "Τελευταία Παραγγελία"
                        : "Last Order"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Ενέργειες" : "Actions"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => {
                    const loyaltyBadge = getLoyaltyBadge(customer.loyaltyScore);

                    return (
                      <TableRow key={customer.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-gray-500">
                              {customer.contact.person}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(customer.type)}>
                            {customer.type.charAt(0).toUpperCase() +
                              customer.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center">
                              <Mail className="w-3 h-3 mr-1 text-gray-400" />
                              {customer.contact.email}
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="w-3 h-3 mr-1 text-gray-400" />
                              {customer.contact.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Badge className={loyaltyBadge.color}>
                              <Star className="w-3 h-3 mr-1" />
                              {customer.loyaltyScore}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(customer.averageOrderValue)}
                        </TableCell>
                        <TableCell className="text-sm">
                          {customer.lastOrder.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedCustomer(customer.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Customer Details */}
          {selectedCustomer && (
            <CustomerDetailsPanel customerId={selectedCustomer} />
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el" ? "Ανάλυση Πελατών" : "Customer Analytics"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Αναλυτικά γραφήματα πελατών"
                        : "Customer analytics charts"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el"
                    ? "Στόχοι & Επιδόσεις"
                    : "Goals & Performance"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Ανάλυση στόχων και επιδόσεων"
                        : "Goals and performance analysis"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2 text-purple-600" />
                {language === "el"
                  ? "Καμπάνιες Marketing"
                  : "Marketing Campaigns"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Send className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Διαχείριση καμπανιών και επι��οινωνίας"
                      : "Campaign and communication management"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerManagement;
