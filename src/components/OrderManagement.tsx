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
  ShoppingCart,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Package,
  Truck,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Download,
  Upload,
  BarChart3,
  TrendingUp,
  Target,
  Star,
  Activity,
  Zap,
  Bell,
  Settings,
  MoreVertical,
  ArrowUpDown,
  ExternalLink,
  Copy,
  Send,
  Archive,
  RefreshCw,
  PrinterIcon as Printer,
  ChevronRight,
  ChevronDown,
  Timer,
  Award,
  Users,
  Globe,
  CreditCard,
  Banknote,
  Receipt,
  ShoppingBag,
  PackageCheck,
  PlusCircle,
  MinusCircle,
  Calculator,
  Percent,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  realisticSeafoodData,
  getActiveOrders,
} from "@/mock/realisticSeafoodData";

interface OrderManagementProps {
  className?: string;
}

const OrderManagement: React.FC<OrderManagementProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);

  const orders = realisticSeafoodData.orders;
  const customers = realisticSeafoodData.customers;
  const products = realisticSeafoodData.products;
  const inventory = realisticSeafoodData.inventory;

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const customer = customers.find((c) => c.id === order.customerId);
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const today = new Date();
      const orderDate = order.date;

      switch (dateFilter) {
        case "today":
          matchesDate = orderDate.toDateString() === today.toDateString();
          break;
        case "week":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= monthAgo;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-green-100 text-green-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      normal: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    };
    return (
      colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3" />;
      case "confirmed":
        return <CheckCircle className="w-3 h-3" />;
      case "processing":
        return <Package className="w-3 h-3" />;
      case "shipped":
        return <Truck className="w-3 h-3" />;
      case "delivered":
        return <CheckCircle className="w-3 h-3" />;
      case "cancelled":
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return <ShoppingCart className="w-3 h-3" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  // Calculate order metrics
  const orderMetrics = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    totalValue: orders.reduce((sum, order) => sum + order.total, 0),
    avgOrderValue:
      orders.length > 0
        ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length
        : 0,
    pendingPayments: orders.filter((o) => o.paymentStatus === "pending").length,
    overduePayments: orders.filter((o) => o.paymentStatus === "overdue").length,
  };

  // Orders Overview Widget
  const OrdersOverviewWidget = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el" ? "Συνολικές Παραγγελίες" : "Total Orders"}
              </p>
              <p className="text-2xl font-bold">{orderMetrics.total}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {language === "el" ? "Σε Εκκρεμότητα" : "Pending"}
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {orderMetrics.pending}
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
              <p className="text-sm text-gray-600">
                {language === "el" ? "Συνολική Αξία" : "Total Value"}
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(orderMetrics.totalValue)}
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
                {language === "el" ? "Μέση Αξία" : "Avg Value"}
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(orderMetrics.avgOrderValue)}
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Quick Stats Widget
  const QuickStatsWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Activity className="w-4 h-4 mr-2 text-blue-600" />
          {language === "el" ? "Γρήγορα Στατιστικά" : "Quick Stats"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-yellow-600">
              {language === "el" ? "Εκκρεμείς" : "Pending"}
            </span>
            <span className="font-semibold">{orderMetrics.pending}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-purple-600">
              {language === "el" ? "Σε Επεξεργασία" : "Processing"}
            </span>
            <span className="font-semibold">{orderMetrics.processing}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-600">
              {language === "el" ? "Αποστολή" : "Shipped"}
            </span>
            <span className="font-semibold">{orderMetrics.shipped}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-600">
              {language === "el" ? "Παραδόθηκαν" : "Delivered"}
            </span>
            <span className="font-semibold">{orderMetrics.delivered}</span>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {language === "el" ? "Ποσοστό Ολοκλήρωσης" : "Completion Rate"}
            </span>
            <span className="font-bold text-green-600">
              {((orderMetrics.delivered / orderMetrics.total) * 100).toFixed(1)}
              %
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Payment Status Widget
  const PaymentStatusWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <CreditCard className="w-4 h-4 mr-2 text-green-600" />
          {language === "el" ? "Κατάσταση Πληρωμών" : "Payment Status"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-600">
              {language === "el" ? "Πληρωμένες" : "Paid"}
            </span>
            <span className="font-semibold">
              {orders.filter((o) => o.paymentStatus === "paid").length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-yellow-600">
              {language === "el" ? "Εκκρεμείς" : "Pending"}
            </span>
            <span className="font-semibold">
              {orderMetrics.pendingPayments}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-red-600">
              {language === "el" ? "Καθυστερημένες" : "Overdue"}
            </span>
            <span className="font-semibold">
              {orderMetrics.overduePayments}
            </span>
          </div>
        </div>
        {orderMetrics.overduePayments > 0 && (
          <Alert className="mt-3">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {orderMetrics.overduePayments}{" "}
              {language === "el"
                ? "καθυστερημένες πληρωμές"
                : "overdue payments"}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );

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
        <Button
          size="sm"
          variant="outline"
          className="w-full justify-start"
          onClick={() => setShowNewOrderForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          {language === "el" ? "Νέα Παραγγελία" : "New Order"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Package className="w-4 h-4 mr-2" />
          {language === "el" ? "Μαζική Επεξεργασία" : "Bulk Process"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <FileText className="w-4 h-4 mr-2" />
          {language === "el" ? "Εξαγωγή Αναφοράς" : "Export Report"}
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start">
          <Bell className="w-4 h-4 mr-2" />
          {language === "el" ? "Ειδοποιήσεις" : "Notifications"}
        </Button>
      </CardContent>
    </Card>
  );

  // Order Details Panel
  const OrderDetailsPanel = ({ orderId }: { orderId: string }) => {
    const order = orders.find((o) => o.id === orderId);
    const customer = order
      ? customers.find((c) => c.id === order.customerId)
      : null;

    if (!order || !customer) return null;

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              {language === "el"
                ? "Λεπτομέρειες Παραγγελίας"
                : "Order Details"}{" "}
              - {order.id}
            </span>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(order.status)}>
                {getStatusIcon(order.status)}
                <span className="ml-1">
                  {language === "el"
                    ? order.status === "pending"
                      ? "Εκκρεμής"
                      : order.status === "confirmed"
                        ? "Επιβεβαιωμένη"
                        : order.status === "processing"
                          ? "Επεξεργασία"
                          : order.status === "shipped"
                            ? "Αποστολή"
                            : order.status === "delivered"
                              ? "Παραδόθηκε"
                              : "Ακυρώθηκε"
                    : order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                </span>
              </Badge>
              <Badge className={getPriorityColor(order.priority)}>
                {language === "el"
                  ? order.priority === "low"
                    ? "Χαμηλή"
                    : order.priority === "normal"
                      ? "Κανονική"
                      : order.priority === "high"
                        ? "Υψηλή"
                        : "Επείγουσα"
                  : order.priority.charAt(0).toUpperCase() +
                    order.priority.slice(1)}
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
              <TabsTrigger value="items">
                {language === "el" ? "Προϊόντα" : "Items"}
              </TabsTrigger>
              <TabsTrigger value="customer">
                {language === "el" ? "Πελάτης" : "Customer"}
              </TabsTrigger>
              <TabsTrigger value="history">
                {language === "el" ? "Ιστορικό" : "History"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el"
                        ? "Ημερομηνία Παραγγελίας"
                        : "Order Date"}
                    </Label>
                    <div className="font-medium">
                      {order.date.toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el"
                        ? "Ημερομηνία Παράδοσης"
                        : "Delivery Date"}
                    </Label>
                    <div className="font-medium">
                      {order.deliveryDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Τρόπος Πληρωμής" : "Payment Method"}
                    </Label>
                    <div className="font-medium">{order.paymentMethod}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el"
                        ? "Κατάσταση Πληρωμής"
                        : "Payment Status"}
                    </Label>
                    <Badge
                      className={getPaymentStatusColor(order.paymentStatus)}
                    >
                      {language === "el"
                        ? order.paymentStatus === "pending"
                          ? "Εκκρεμής"
                          : order.paymentStatus === "paid"
                            ? "Πληρωμένη"
                            : "Καθυστερημένη"
                        : order.paymentStatus.charAt(0).toUpperCase() +
                          order.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Υποσύνολο" : "Subtotal"}
                    </Label>
                    <div className="font-medium">
                      {formatCurrency(order.total - order.shipping)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Έκπτωση" : "Discount"}
                    </Label>
                    <div className="font-medium">
                      -{formatCurrency(order.discount)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Μεταφορικά" : "Shipping"}
                    </Label>
                    <div className="font-medium">
                      {formatCurrency(order.shipping)}
                    </div>
                  </div>
                  <div className="border-t pt-2">
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Συνολικό Ποσό" : "Total Amount"}
                    </Label>
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(order.total)}
                    </div>
                  </div>
                </div>
              </div>

              {order.notes && (
                <div className="border-t pt-4">
                  <Label className="text-sm text-gray-600">
                    {language === "el" ? "Σημειώσεις" : "Notes"}
                  </Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                    {order.notes}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="items" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {language === "el" ? "Προϊόν" : "Product"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Ποσότητα" : "Quantity"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Τιμή Μονάδας" : "Unit Price"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Έκπτωση" : "Discount"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Σύνολο" : "Total"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => {
                    const product = products.find(
                      (p) => p.id === item.productId,
                    );
                    const itemTotal =
                      item.unitPrice * item.quantity - item.discount;

                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product?.name}</div>
                            <div className="text-xs text-gray-500">
                              {language === "el" ? "Βαθμός:" : "Grade:"}{" "}
                              {item.specifications.grade}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.quantity}kg</TableCell>
                        <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                        <TableCell>
                          {item.discount > 0
                            ? formatCurrency(item.discount)
                            : "-"}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(itemTotal)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="customer" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Όνομα Εταιρείας" : "Company Name"}
                    </Label>
                    <div className="font-medium">{customer.name}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Τύπος Πελάτη" : "Customer Type"}
                    </Label>
                    <div className="font-medium">{customer.type}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el"
                        ? "Αξιολόγηση Πιστότητας"
                        : "Loyalty Score"}
                    </Label>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">
                        {customer.loyaltyScore}/100
                      </span>
                    </div>
                  </div>
                </div>
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
                      {language === "el" ? "Τηλέφωνο" : "Phone"}
                    </Label>
                    <div className="font-medium">{customer.contact.phone}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      {language === "el" ? "Email" : "Email"}
                    </Label>
                    <div className="font-medium">{customer.contact.email}</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-sm text-gray-600">
                  {language === "el" ? "Διεύθυνση" : "Address"}
                </Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                  {customer.contact.address}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium">
                      {language === "el"
                        ? "Παραγγελία δημιουργήθηκε"
                        : "Order created"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {order.date.toLocaleString()}
                  </span>
                </div>

                {order.status !== "pending" && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium">
                        {language === "el"
                          ? "Παραγγελία επιβεβαιώθηκε"
                          : "Order confirmed"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(
                        order.date.getTime() + 2 * 60 * 60 * 1000,
                      ).toLocaleString()}
                    </span>
                  </div>
                )}

                {["processing", "shipped", "delivered"].includes(
                  order.status,
                ) && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="text-sm font-medium">
                        {language === "el"
                          ? "Επεξεργασία ξεκίνησε"
                          : "Processing started"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(
                        order.date.getTime() + 4 * 60 * 60 * 1000,
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
            <Button size="sm" variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              {language === "el" ? "Εκτύπωση" : "Print"}
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {language === "el" ? "PDF" : "PDF"}
            </Button>
            <Button size="sm" variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              {language === "el" ? "Αποστολή Email" : "Send Email"}
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
            {language === "el" ? "Διαχείριση Παραγγελιών" : "Order Management"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Διαχείριση και παρακολούθηση παραγγελιών πελατών"
              : "Manage and track customer orders"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {orderMetrics.pending} {language === "el" ? "εκκρεμείς" : "pending"}
          </Badge>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Εξαγωγή" : "Export"}
          </Button>
          <Button size="sm" onClick={() => setShowNewOrderForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέα Πα��αγγελία" : "New Order"}
          </Button>
        </div>
      </div>

      {/* Orders Overview */}
      <OrdersOverviewWidget />

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="orders">
            {language === "el" ? "Παραγγελίες" : "Orders"}
          </TabsTrigger>
          <TabsTrigger value="processing">
            {language === "el" ? "Επεξεργασία" : "Processing"}
          </TabsTrigger>
          <TabsTrigger value="payments">
            {language === "el" ? "Πληρωμές" : "Payments"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === "el" ? "Αναλυτικά" : "Analytics"}
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
                    {language === "el" ? "Τάσεις Παραγγελιών" : "Order Trends"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Γράφημα τάσεων παραγγελιών"
                          : "Order trends chart"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {language === "el"
                        ? "Κατάσταση Παραγγελιών"
                        : "Order Status"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-48">
                    <div className="space-y-3">
                      {[
                        {
                          status: "pending",
                          count: orderMetrics.pending,
                          color: "yellow",
                        },
                        {
                          status: "processing",
                          count: orderMetrics.processing,
                          color: "purple",
                        },
                        {
                          status: "shipped",
                          count: orderMetrics.shipped,
                          color: "blue",
                        },
                        {
                          status: "delivered",
                          count: orderMetrics.delivered,
                          color: "green",
                        },
                      ].map((item) => (
                        <div
                          key={item.status}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            {getStatusIcon(item.status)}
                            <span className="ml-2 text-sm">
                              {language === "el"
                                ? item.status === "pending"
                                  ? "Εκκρεμείς"
                                  : item.status === "processing"
                                    ? "Επεξεργασία"
                                    : item.status === "shipped"
                                      ? "Αποστολή"
                                      : "Παραδόθηκαν"
                                : item.status.charAt(0).toUpperCase() +
                                  item.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-bold mr-2">{item.count}</span>
                            <div
                              className={`w-16 h-2 bg-${item.color}-200 rounded-full`}
                            >
                              <div
                                className={`h-2 bg-${item.color}-500 rounded-full`}
                                style={{
                                  width: `${(item.count / orderMetrics.total) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {language === "el"
                        ? "Πρόσφατες Παραγγελίες"
                        : "Recent Orders"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-48">
                    <div className="space-y-2">
                      {orders.slice(0, 5).map((order) => {
                        const customer = customers.find(
                          (c) => c.id === order.customerId,
                        );
                        return (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {customer?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {order.id}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {formatCurrency(order.total)}
                              </div>
                              <Badge
                                className={`${getStatusColor(order.status)} text-xs`}
                              >
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right sidebar widgets */}
            <div className="space-y-6">
              <QuickStatsWidget />
              <PaymentStatusWidget />
              <QuickActionsWidget />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
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
                          ? "ID παραγγελίας, πελάτης..."
                          : "Order ID, customer..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">
                    {language === "el" ? "Κατάσταση" : "Status"}
                  </Label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">
                      {language === "el" ? "Όλες" : "All"}
                    </option>
                    <option value="pending">
                      {language === "el" ? "Εκκρεμείς" : "Pending"}
                    </option>
                    <option value="confirmed">
                      {language === "el" ? "Επιβεβαιωμένες" : "Confirmed"}
                    </option>
                    <option value="processing">
                      {language === "el" ? "Επεξεργασία" : "Processing"}
                    </option>
                    <option value="shipped">
                      {language === "el" ? "Αποστολή" : "Shipped"}
                    </option>
                    <option value="delivered">
                      {language === "el" ? "Παραδόθηκαν" : "Delivered"}
                    </option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="date">
                    {language === "el" ? "Περίοδος" : "Period"}
                  </Label>
                  <select
                    id="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">
                      {language === "el" ? "Όλες" : "All Time"}
                    </option>
                    <option value="today">
                      {language === "el" ? "Σήμερα" : "Today"}
                    </option>
                    <option value="week">
                      {language === "el" ? "Τελευταία εβδομάδα" : "Last Week"}
                    </option>
                    <option value="month">
                      {language === "el" ? "Τελευταίος μήνας" : "Last Month"}
                    </option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    {language === "el" ? "Περισσότερα Φίλτρα" : "More Filters"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el" ? "Παραγγελίες" : "Orders"}
                </span>
                <Badge variant="outline">
                  {filteredOrders.length}{" "}
                  {language === "el" ? "παραγγελίες" : "orders"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === "el" ? "ID" : "ID"}</TableHead>
                    <TableHead>
                      {language === "el" ? "Πελάτης" : "Customer"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Ημερομηνία" : "Date"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Κατάσταση" : "Status"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Προτεραιότητα" : "Priority"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Σύνολο" : "Total"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Πληρωμή" : "Payment"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Ενέργειες" : "Actions"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const customer = customers.find(
                      (c) => c.id === order.customerId,
                    );

                    return (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono text-sm">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer?.name}</div>
                            <div className="text-xs text-gray-500">
                              {customer?.type}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {order.date.toLocaleDateString()}
                            <div className="text-xs text-gray-500">
                              {language === "el" ? "Παράδοση:" : "Delivery:"}{" "}
                              {order.deliveryDate.toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">
                              {language === "el"
                                ? order.status === "pending"
                                  ? "Εκκρεμής"
                                  : order.status === "confirmed"
                                    ? "Επιβεβαιωμένη"
                                    : order.status === "processing"
                                      ? "Επεξεργασία"
                                      : order.status === "shipped"
                                        ? "Αποστολή"
                                        : order.status === "delivered"
                                          ? "Παραδόθηκε"
                                          : "Ακυρώθηκε"
                                : order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(order.priority)}>
                            {language === "el"
                              ? order.priority === "low"
                                ? "Χαμηλή"
                                : order.priority === "normal"
                                  ? "Κανονική"
                                  : order.priority === "high"
                                    ? "Υψηλή"
                                    : "Επείγουσα"
                              : order.priority.charAt(0).toUpperCase() +
                                order.priority.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(order.total)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getPaymentStatusColor(
                              order.paymentStatus,
                            )}
                          >
                            {language === "el"
                              ? order.paymentStatus === "pending"
                                ? "Εκκρεμής"
                                : order.paymentStatus === "paid"
                                  ? "Πληρωμένη"
                                  : "Καθυστερημένη"
                              : order.paymentStatus.charAt(0).toUpperCase() +
                                order.paymentStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedOrder(order.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Copy className="w-4 h-4" />
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

          {/* Order Details */}
          {selectedOrder && <OrderDetailsPanel orderId={selectedOrder} />}
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-purple-600" />
                {language === "el"
                  ? "Επεξεργασία Παραγγελιών"
                  : "Order Processing"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Κέντρο επεξεργασίας παραγγελιών"
                      : "Order processing center"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                {language === "el"
                  ? "Διαχείριση Πληρωμών"
                  : "Payment Management"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Διαχείριση πληρωμών και τιμολογίων"
                      : "Payment and invoice management"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  {language === "el"
                    ? "Αναλυτικά Παραγγελιών"
                    : "Order Analytics"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Αναλυτικά γραφήματα παραγγελιών"
                        : "Order analytics charts"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el" ? "Τάσεις Πωλήσεων" : "Sales Trends"}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>
                      {language === "el"
                        ? "Ανάλυση τάσεων πωλήσεων"
                        : "Sales trends analysis"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderManagement;
