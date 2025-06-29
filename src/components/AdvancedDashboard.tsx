import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Share2,
  Settings,
  Filter,
  RefreshCw,
  AlertTriangle,
  Bell,
  MessageSquare,
  Calendar,
  Clock,
  Target,
  DollarSign,
  Users,
  Package,
  Zap,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Grid3X3,
  MoreHorizontal,
  Search,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { libraryLoader } from "@/utils/libraryLoader";

interface DashboardProps {
  data?: any;
  onExport?: () => void;
  onShare?: () => void;
}

interface KPICard {
  id: string;
  title: string;
  value: number;
  target?: number;
  unit: string;
  trend: "up" | "down" | "stable";
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface DashboardWidget {
  id: string;
  type: "chart" | "table" | "metric" | "alert";
  title: string;
  data: any;
  visible: boolean;
  order: number;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: number;
  type: "note" | "alert" | "insight";
}

const AdvancedDashboard: React.FC<DashboardProps> = ({
  data,
  onExport,
  onShare,
}) => {
  const [dateRange, setDateRange] = useState("7d");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [kpiCards, setKpiCards] = useState<KPICard[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [dashboardLayout, setDashboardLayout] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isGridMode, setIsGridMode] = useState(true);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const datePickerRef = useRef<HTMLInputElement>(null);
  const chartRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({});
  const sortableRef = useRef<HTMLDivElement>(null);

  // Initialize Dashboard
  useEffect(() => {
    initializeDashboard();
    loadSavedComments();
    loadSavedLayout();
    setupDatePickers();
    setupSortable();
  }, []);

  // Update counters with animation
  useEffect(() => {
    animateCounters();
  }, [kpiCards]);

  const initializeDashboard = () => {
    // Sample KPI data
    const sampleKPIs: KPICard[] = [
      {
        id: "total-cost",
        title: "Συνολικό Κόστος",
        value: 15420.5,
        target: 16000,
        unit: "€",
        trend: "down",
        change: -3.2,
        icon: <DollarSign className="w-6 h-6" />,
        color: "blue",
      },
      {
        id: "batches",
        title: "Παρτίδες",
        value: 24,
        target: 30,
        unit: "",
        trend: "up",
        change: 12.5,
        icon: <Package className="w-6 h-6" />,
        color: "green",
      },
      {
        id: "efficiency",
        title: "Αποδοτικότητα",
        value: 87.5,
        target: 90,
        unit: "%",
        trend: "stable",
        change: 0.5,
        icon: <Target className="w-6 h-6" />,
        color: "orange",
      },
      {
        id: "profit-margin",
        title: "Περιθώριο Κέρδους",
        value: 23.8,
        target: 25,
        unit: "%",
        trend: "up",
        change: 2.1,
        icon: <TrendingUp className="w-6 h-6" />,
        color: "purple",
      },
    ];

    const sampleWidgets: DashboardWidget[] = [
      {
        id: "cost-trend",
        type: "chart",
        title: "Τάση Κόστους",
        data: { type: "line" },
        visible: true,
        order: 1,
      },
      {
        id: "batch-distribution",
        type: "chart",
        title: "Κατανομή Παρτίδων",
        data: { type: "doughnut" },
        visible: true,
        order: 2,
      },
      {
        id: "recent-batches",
        type: "table",
        title: "Πρόσφατες Παρτίδες",
        data: generateRecentBatches(),
        visible: true,
        order: 3,
      },
    ];

    const sampleAlerts = [
      {
        id: "high-cost",
        type: "warning",
        title: "Υψηλό Κόστος Πρώτων Υλών",
        message:
          "Το κόστος πρώτων υλών έχει αυξηθεί κατά 15% αυτή την εβδομάδα",
        timestamp: Date.now() - 3600000,
      },
      {
        id: "efficiency-drop",
        type: "info",
        title: "Μείωση Αποδοτικότητας",
        message: "Η αποδοτικότητα της γραμμής παραγωγής Α έχει μειωθεί",
        timestamp: Date.now() - 7200000,
      },
    ];

    setKpiCards(sampleKPIs);
    setWidgets(sampleWidgets);
    setAlerts(sampleAlerts);
    setDashboardLayout(sampleWidgets.map((w) => w.id));
  };

  const generateRecentBatches = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `batch-${i + 1}`,
      name: `Παρτίδα ${i + 1}`,
      product: ["Τσιπούρα", "Λαβράκι", "Φαγγρί", "Κολιός"][
        Math.floor(Math.random() * 4)
      ],
      quantity: Math.floor(Math.random() * 1000) + 100,
      cost: (Math.random() * 5000 + 1000).toFixed(2),
      date: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString("el-GR"),
      status: ["Ολοκληρώθηκε", "Σε εξέλιξη", "Σχεδιασμός"][
        Math.floor(Math.random() * 3)
      ],
    }));
  };

  const setupDatePickers = async () => {
    await libraryLoader.waitForLibrary("flatpickr");
    if (window.flatpickr && datePickerRef.current) {
      window.flatpickr(datePickerRef.current, {
        mode: "range",
        dateFormat: "d/m/Y",
        locale: "el",
        onChange: (dates: Date[]) => {
          if (dates.length === 2) {
            updateDashboardData(dates);
          }
        },
      });
    }
  };

  const setupSortable = async () => {
    await libraryLoader.waitForLibrary("sortable");
    if (window.Sortable && sortableRef.current) {
      window.Sortable.create(sortableRef.current, {
        animation: 150,
        onEnd: (evt: any) => {
          const newLayout = [...dashboardLayout];
          const [moved] = newLayout.splice(evt.oldIndex, 1);
          newLayout.splice(evt.newIndex, 0, moved);
          setDashboardLayout(newLayout);
          localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
        },
      });
    }
  };

  const setupCharts = async () => {
    await libraryLoader.waitForLibrary("chart");
    if (!window.Chart) return;

    // Line chart for cost trend
    const costTrendCtx = chartRefs.current["cost-trend"];
    if (costTrendCtx) {
      new window.Chart(costTrendCtx, {
        type: "line",
        data: {
          labels: ["Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ", "Κυρ"],
          datasets: [
            {
              label: "Κόστος (€)",
              data: [2100, 2300, 1800, 2500, 2200, 1900, 2400],
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }

    // Doughnut chart for batch distribution
    const batchDistCtx = chartRefs.current["batch-distribution"];
    if (batchDistCtx) {
      new window.Chart(batchDistCtx, {
        type: "doughnut",
        data: {
          labels: ["Τσιπούρα", "Λαβράκι", "Φαγγρί", "Κολιός"],
          datasets: [
            {
              data: [35, 25, 20, 20],
              backgroundColor: [
                "rgb(59, 130, 246)",
                "rgb(16, 185, 129)",
                "rgb(245, 158, 11)",
                "rgb(139, 92, 246)",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
          },
        },
      });
    }
  };

  const animateCounters = () => {
    kpiCards.forEach((kpi) => {
      const element = document.getElementById(`counter-${kpi.id}`);
      if (element) {
        let start = 0;
        const end = kpi.value;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = start + (end - start) * progress;

          element.textContent =
            kpi.unit === "%"
              ? `${current.toFixed(1)}${kpi.unit}`
              : kpi.unit === "€"
                ? `${kpi.unit}${current.toLocaleString("el-GR", { minimumFractionDigits: 2 })}`
                : `${Math.floor(current)}${kpi.unit}`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }
    });
  };

  const updateDashboardData = (dateRange: Date[]) => {
    // Simulate data update based on date range
    console.log("Updating dashboard for date range:", dateRange);
  };

  const exportDashboard = async () => {
    await libraryLoader.waitForLibrary("html2canvas");
    await libraryLoader.waitForLibrary("jspdf");

    if (window.html2canvas && window.jsPDF) {
      const dashboard = document.getElementById("dashboard-layout");
      if (dashboard) {
        const canvas = await window.html2canvas(dashboard, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
        });

        const pdf = new window.jsPDF("l", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("dashboard-kostopro.pdf");
      }
    }

    onExport?.();
  };

  const shareDashboard = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: "KostoPro Dashboard",
        text: "Δείτε το dashboard κοστολόγησης",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Το link αντιγράφηκε στο clipboard!");
    }

    onShare?.();
  };

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: "Χρήστης",
        text: newComment,
        timestamp: Date.now(),
        type: "note",
      };

      const updatedComments = [comment, ...comments];
      setComments(updatedComments);
      setNewComment("");
      localStorage.setItem(
        "dashboardComments",
        JSON.stringify(updatedComments),
      );
    }
  };

  const loadSavedComments = () => {
    const saved = localStorage.getItem("dashboardComments");
    if (saved) {
      setComments(JSON.parse(saved));
    }
  };

  const loadSavedLayout = () => {
    const saved = localStorage.getItem("dashboardLayout");
    if (saved) {
      setDashboardLayout(JSON.parse(saved));
    }
  };

  const toggleWidget = (widgetId: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === widgetId ? { ...w, visible: !w.visible } : w)),
    );
  };

  const sortTable = (column: string) => {
    const newOrder = sortBy === column && sortOrder === "desc" ? "asc" : "desc";
    setSortBy(column);
    setSortOrder(newOrder);
  };

  const quickFilters = [
    { id: "1d", label: "Σήμερα", active: dateRange === "1d" },
    { id: "7d", label: "7 ημέρ��ς", active: dateRange === "7d" },
    { id: "30d", label: "30 ημέρες", active: dateRange === "30d" },
    { id: "90d", label: "3 μήνες", active: dateRange === "90d" },
    { id: "custom", label: "Προσαρμογή", active: dateRange === "custom" },
  ];

  useEffect(() => {
    setupCharts();
  }, [widgets]);

  return (
    <div id="dashboard" className="space-y-6">
      {/* Quick Actions Toolbar */}
      <div
        id="quick-actions"
        className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border"
      >
        <div className="flex items-center gap-3">
          <Button
            onClick={() => window.location.reload()}
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Ανανέωση
          </Button>

          <Button
            onClick={exportDashboard}
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Εξαγωγή
          </Button>

          <Button
            onClick={shareDashboard}
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Κοινοποίηση
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsGridMode(!isGridMode)}
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            {isGridMode ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {isGridMode ? "Λίστα" : "Πλέγμα"}
          </Button>

          <Button size="sm" variant="outline">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Date Filters */}
      <div
        id="date-filters"
        className="flex flex-wrap items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium">Φίλτρα Ημερομηνιών:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setDateRange(filter.id)}
              className={`quick-filter ${filter.active ? "active" : ""}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <Input
          ref={datePickerRef}
          placeholder="Επιλογή περιόδου"
          className="w-48"
          id="dashboard-date-picker"
        />
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        {kpiCards.map((kpi) => (
          <div key={kpi.id} className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-lg bg-${kpi.color}-100 text-${kpi.color}-600`}
              >
                {kpi.icon}
              </div>
              <div
                className={`flex items-center text-sm ${
                  kpi.trend === "up"
                    ? "text-green-600"
                    : kpi.trend === "down"
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : kpi.trend === "down" ? (
                  <TrendingDown className="w-4 h-4 mr-1" />
                ) : (
                  <Minus className="w-4 h-4 mr-1" />
                )}
                {kpi.change > 0 ? "+" : ""}
                {kpi.change}%
              </div>
            </div>

            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              {kpi.title}
            </h3>

            <div className="flex items-end justify-between">
              <span
                id={`counter-${kpi.id}`}
                className="counter text-2xl font-bold"
              >
                {kpi.unit === "€"
                  ? `${kpi.unit}${kpi.value.toLocaleString("el-GR")}`
                  : kpi.unit === "%"
                    ? `${kpi.value}${kpi.unit}`
                    : `${kpi.value}${kpi.unit}`}
              </span>

              {kpi.target && (
                <span className="text-xs text-gray-500">
                  /{" "}
                  {kpi.unit === "€"
                    ? `${kpi.unit}${kpi.target.toLocaleString("el-GR")}`
                    : kpi.unit === "%"
                      ? `${kpi.target}${kpi.unit}`
                      : `${kpi.target}${kpi.unit}`}
                </span>
              )}
            </div>

            {kpi.target && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-${kpi.color}-600`}
                    style={{
                      width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sortable Widget Grid */}
      <div
        id="dashboard-layout"
        ref={sortableRef}
        className={`grid gap-6 ${
          isGridMode ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {dashboardLayout.map((widgetId) => {
          const widget = widgets.find((w) => w.id === widgetId);
          if (!widget || !widget.visible) return null;

          return (
            <Card key={widget.id} className="builder-chart">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{widget.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleWidget(widget.id)}
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {widget.type === "chart" && (
                  <div className="h-64">
                    <canvas
                      ref={(el) => (chartRefs.current[widget.id] = el)}
                      className="w-full h-full"
                    />
                  </div>
                )}

                {widget.type === "table" && (
                  <div className="overflow-x-auto">
                    <table id="recent-batches-table" className="pro-table">
                      <thead>
                        <tr>
                          {[
                            "Όνομα",
                            "Προϊόν",
                            "Ποσότητα",
                            "Κόστος",
                            "Ημερομηνία",
                            "Κατάσταση",
                          ].map((header) => (
                            <th
                              key={header}
                              className="cursor-pointer"
                              onClick={() => sortTable(header.toLowerCase())}
                            >
                              <div className="flex items-center gap-1">
                                {header}
                                {sortBy === header.toLowerCase() &&
                                  (sortOrder === "asc" ? (
                                    <SortAsc className="w-3 h-3" />
                                  ) : (
                                    <SortDesc className="w-3 h-3" />
                                  ))}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {widget.data.map((batch: any) => (
                          <tr key={batch.id}>
                            <td className="font-medium">{batch.name}</td>
                            <td>{batch.product}</td>
                            <td>{batch.quantity} kg</td>
                            <td>€{batch.cost}</td>
                            <td>{batch.date}</td>
                            <td>
                              <Badge
                                variant={
                                  batch.status === "Ολοκληρώθηκε"
                                    ? "default"
                                    : batch.status === "Σε εξέλιξη"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {batch.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts Panel */}
      <Card id="alerts-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Ειδοποιήσεις
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`alert-item ${alert.type}`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm mt-1">{alert.message}</p>
                    <span className="text-xs opacity-75">
                      {new Date(alert.timestamp).toLocaleString("el-GR")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inline Insights */}
      <Card id="inline-insights">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Στατιστικά Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-700 dark:text-blue-300">
                Καλύτερη Περίοδος
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                Τετάρτη απόγευμα - 23% χαμηλότερο κόστος
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-700 dark:text-green-300">
                Πρόβλεψη
              </h4>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Αναμένεται μείωση κόστους 12% τον επόμενο μήνα
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Feed */}
      <Card id="comments-feed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Σχόλια & Σημειώσεις
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Προσθήκη σχολίου..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && addComment()}
              />
              <Button onClick={addComment} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleString("el-GR")}
                    </span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back to Top Button */}
      <button
        id="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center opacity-0 translate-y-4 pointer-events-none"
      >
        <TrendingUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default AdvancedDashboard;
