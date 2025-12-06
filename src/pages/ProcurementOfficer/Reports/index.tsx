import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  Package,
  AlertCircle,
  Download,
  Calendar,
  BarChart3,
} from "lucide-react";
import { axiosInstance as axios } from "../../../config/axios";

interface ProcurementMetrics {
  totalPurchases: number;
  totalSpend: number;
  avgCostPerTool: number;
  mostPurchasedCategory: string;
}

interface SupplierPerformance {
  id: string;
  name: string;
  totalOrders: number;
  onTimeDeliveryRate: number;
  defectRate: number;
  avgCost: number;
  rating: number;
}

interface CategorySpend {
  category: string;
  spend: number;
  count: number;
}

export const ProcurementReports: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("last_30_days");
  const [metrics, setMetrics] = useState<ProcurementMetrics>({
    totalPurchases: 0,
    totalSpend: 0,
    avgCostPerTool: 0,
    mostPurchasedCategory: "N/A",
  });
  const [suppliers, setSuppliers] = useState<SupplierPerformance[]>([]);
  const [categorySpend, setCategorySpend] = useState<CategorySpend[]>([]);

  useEffect(() => {
    fetchReportsData();
  }, [dateRange]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // const [metricsRes, suppliersRes, categoryRes] = await Promise.all([
      //   axios.get('/api/reports/procurement', { params: { range: dateRange } }),
      //   axios.get('/api/reports/supplier-performance', { params: { range: dateRange } }),
      //   axios.get('/api/reports/category-spend', { params: { range: dateRange } })
      // ]);

      // Mock data for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMetrics({
        totalPurchases: 0,
        totalSpend: 0,
        avgCostPerTool: 0,
        mostPurchasedCategory: "N/A",
      });

      setSuppliers([]);
      setCategorySpend([]);
    } catch (error) {
      console.error("Error fetching reports data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceColor = (value: number, isDefect: boolean = false) => {
    if (isDefect) {
      if (value <= 2) return "text-green-600";
      if (value <= 5) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (value >= 95) return "text-green-600";
      if (value >= 85) return "text-yellow-600";
      return "text-red-600";
    }
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    alert("Export functionality coming soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Procurement Reports & Analytics
              </h1>
              <p className="text-muted-foreground mt-2">
                Track procurement trends, costs, and supplier performance
              </p>
            </div>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
            >
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>

          {/* Date Range Filter */}
          <div className="mt-6 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_90_days">Last 90 Days</option>
              <option value="last_year">Last Year</option>
              <option value="all_time">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Purchases</p>
                {loading ? (
                  <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-3xl font-bold text-foreground">
                    {metrics.totalPurchases}
                  </h3>
                )}
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Spend</p>
                {loading ? (
                  <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-3xl font-bold text-foreground">
                    ${metrics.totalSpend.toFixed(2)}
                  </h3>
                )}
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Cost/Tool</p>
                {loading ? (
                  <div className="h-8 w-28 bg-muted animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-3xl font-bold text-foreground">
                    ${metrics.avgCostPerTool.toFixed(2)}
                  </h3>
                )}
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Top Category
                </p>
                {loading ? (
                  <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-2xl font-bold text-foreground">
                    {metrics.mostPurchasedCategory}
                  </h3>
                )}
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Category Spend Chart */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Spend by Category
            </h2>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
                ))}
              </div>
            ) : categorySpend.length > 0 ? (
              <div className="space-y-4">
                {categorySpend.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {item.category}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        ${item.spend.toFixed(2)} ({item.count} tools)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${
                            (item.spend / metrics.totalSpend) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No procurement data available</p>
                </div>
              </div>
            )}
          </div>

          {/* Procurement Trend Chart Placeholder */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Procurement Trend
            </h2>
            {loading ? (
              <div className="h-64 bg-muted animate-pulse rounded"></div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Chart visualization coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Supplier Performance Table */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Supplier Performance
          </h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
              ))}
            </div>
          ) : suppliers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Supplier
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">
                      Total Orders
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">
                      On-Time %
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">
                      Defect %
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">
                      Avg Cost
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      className="border-b border-border hover:bg-accent transition-colors"
                    >
                      <td className="py-4 px-4">
                        <p className="font-medium text-foreground">
                          {supplier.name}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-center text-foreground">
                        {supplier.totalOrders}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`font-semibold ${getPerformanceColor(
                            supplier.onTimeDeliveryRate
                          )}`}
                        >
                          {supplier.onTimeDeliveryRate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`font-semibold ${getPerformanceColor(
                            supplier.defectRate,
                            true
                          )}`}
                        >
                          {supplier.defectRate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-foreground">
                        ${supplier.avgCost.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span
                            className={`font-semibold ${getRatingColor(
                              supplier.rating
                            )}`}
                          >
                            {supplier.rating.toFixed(1)}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            / 5.0
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground">
                No supplier performance data available
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Start procurement tracking to see supplier metrics
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcurementReports;
