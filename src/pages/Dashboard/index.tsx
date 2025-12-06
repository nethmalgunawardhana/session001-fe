import React, { useState, useEffect } from "react";
import { getUser } from "utils/auth";
import { Card, CardHeader, CardTitle, CardContent } from "components/shared";
import {
  Wrench,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Package,
  Activity,
  Calendar
} from "lucide-react";

export default function Dashboard() {
  const currentUser = getUser();

  // Mock data - Replace with actual API calls
  const [stats, setStats] = useState({
    totalTools: 0,
    availableTools: 0,
    inUseTools: 0,
    maintenanceTools: 0,
    totalValue: 0,
    warrantyExpiring: 0
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: "Tool Added", tool: "Power Drill XR-200", time: "2 hours ago", user: "John Doe" },
    { id: 2, action: "Tool Checked Out", tool: "Angle Grinder AG-500", time: "3 hours ago", user: "Jane Smith" },
    { id: 3, action: "Maintenance Completed", tool: "Circular Saw CS-300", time: "5 hours ago", user: "Mike Johnson" },
    { id: 4, action: "Tool Returned", tool: "Impact Driver ID-100", time: "1 day ago", user: "Sarah Williams" }
  ]);

  const [categoryDistribution, setCategoryDistribution] = useState([
    { category: "Power Tools", count: 45, percentage: 35 },
    { category: "Hand Tools", count: 38, percentage: 30 },
    { category: "Measuring Tools", count: 25, percentage: 20 },
    { category: "Safety Equipment", count: 20, percentage: 15 }
  ]);

  useEffect(() => {
    // Simulate API call
    setStats({
      totalTools: 128,
      availableTools: 95,
      inUseTools: 25,
      maintenanceTools: 8,
      totalValue: 45780,
      warrantyExpiring: 12
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Tool Inventory Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Welcome back, {currentUser?.fullName || 'User'}! Here's your tool inventory overview.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Tools */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tools</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stats.totalTools}</p>
                  <p className="text-xs text-muted-foreground mt-1">In inventory</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Tools */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{stats.availableTools}</p>
                  <p className="text-xs text-muted-foreground mt-1">Ready to use</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* In Use Tools */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Use</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">{stats.inUseTools}</p>
                  <p className="text-xs text-muted-foreground mt-1">Currently assigned</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Tools */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{stats.maintenanceTools}</p>
                  <p className="text-xs text-muted-foreground mt-1">Under repair</p>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Value */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Inventory Value</p>
                  <p className="text-3xl font-bold text-foreground mt-2">${stats.totalValue.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warranty Alerts */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Warranty Expiring</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stats.warrantyExpiring}</p>
                  <p className="text-xs text-yellow-600 mt-1">Within next 30 days</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryDistribution.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">{category.category}</span>
                      <span className="text-sm text-muted-foreground">{category.count} tools</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{category.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.tool}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/tools/new"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-lg hover:border-blue-500 hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Wrench className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Add New Tool</p>
                  <p className="text-xs text-muted-foreground">Register a new tool</p>
                </div>
              </a>

              <a
                href="/qr-scanner"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-lg hover:border-green-500 hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Scan QR Code</p>
                  <p className="text-xs text-muted-foreground">Quick tool lookup</p>
                </div>
              </a>

              <a
                href="/reports"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-lg hover:border-purple-500 hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">View Reports</p>
                  <p className="text-xs text-muted-foreground">Analytics & insights</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
