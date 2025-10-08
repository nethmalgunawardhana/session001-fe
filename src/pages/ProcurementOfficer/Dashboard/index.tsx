import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Plus,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import {
  MetricCard,
  StatusChart,
  CategoryChart,
  RecentToolsTable,
} from "../components";

interface DashboardMetrics {
  totalTools: number;
  availableTools: number;
  warrantyExpiring: number;
  totalValue: number;
}

export const ProcurementOfficerDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalTools: 0,
    availableTools: 0,
    warrantyExpiring: 0,
    totalValue: 0,
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/procurement/dashboard/metrics');
      
      // Mock data for now
      setTimeout(() => {
        setMetrics({
          totalTools: 0,
          availableTools: 0,
          warrantyExpiring: 0,
          totalValue: 0,
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "tools", label: "Tools" },
    { id: "qr-scanner", label: "QR Scanner" },
    { id: "movements", label: "All Movements" },
    { id: "warranty", label: "Warranty Alerts" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b border-border">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground">
              Tool Inventory Dashboard
            </h1>
            <Link
              to="/procurement/tools/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Tool
            </Link>
          </div>
          <p className="text-muted-foreground">
            Manage and track your tool inventory with QR code scanning
          </p>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <div className="flex gap-6 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-1 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard
            title="Total Tools"
            value={metrics.totalTools}
            icon={Package}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            loading={loading}
          />
          <MetricCard
            title="Available"
            value={metrics.availableTools}
            icon={CheckCircle}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            loading={loading}
          />
          <MetricCard
            title="Warranty Expiring"
            value={metrics.warrantyExpiring}
            icon={AlertTriangle}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            loading={loading}
          />
          <MetricCard
            title="Total Value"
            value={`$${metrics.totalValue}`}
            icon={DollarSign}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            loading={loading}
            isCurrency
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Status Distribution Chart */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Status Distribution
              </h2>
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
            <StatusChart loading={loading} />
          </div>

          {/* Category Distribution Chart */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Category Distribution
              </h2>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <CategoryChart loading={loading} />
          </div>
        </div>

        {/* Recent Tools Added Table */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Recent Tools Added
          </h2>
          <RecentToolsTable loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ProcurementOfficerDashboard;
