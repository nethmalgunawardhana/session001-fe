import React from "react";
import { useSelector } from "react-redux";
import { user } from "store/auth/selector";
import { Card, CardHeader, CardTitle, CardContent } from "components/shared";

export default function Dashboard() {
  const currentUser = useSelector(user);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome, {currentUser?.firstName || 'User'}! 👋
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {currentUser?.role ? `You are logged in as ${currentUser.role}` : 'Dashboard'}
          </p>
        </div>

        {/* User Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="mt-1 text-lg text-gray-900">{currentUser?.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-lg text-gray-900">{currentUser?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Username</p>
                  <p className="mt-1 text-lg text-gray-900">{currentUser?.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="mt-1 text-lg">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {currentUser?.role}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p className="mt-1 text-lg text-gray-900">#{currentUser?.userID}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Account Status</p>
                  <p className="mt-1 text-lg">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      currentUser?.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {currentUser?.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Profile</dt>
                    <dd className="text-lg font-semibold text-gray-900">Active</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Authentication</dt>
                    <dd className="text-lg font-semibold text-gray-900">Verified</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Security</dt>
                    <dd className="text-lg font-semibold text-gray-900">JWT Active</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Session</dt>
                    <dd className="text-lg font-semibold text-gray-900">24h</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role-Based Features */}
        <Card>
          <CardHeader>
            <CardTitle>Available Features for {currentUser?.role}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getRoleFeatures(currentUser?.roleId).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Welcome Message */}
        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎉 Welcome to the Inventory Management System!
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              You have successfully logged in with role-based authentication. 
              Your JWT token is active and your session is secure. 
              The system uses BCrypt password hashing and supports 8 different user roles with granular permissions.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <span className="inline-flex items-center px-4 py-2 rounded-lg bg-green-100 text-green-800">
                ✓ Authentication Active
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-100 text-blue-800">
                ✓ Role: {currentUser?.role}
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-100 text-purple-800">
                ✓ Protected Route
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function to get features based on role
function getRoleFeatures(roleId?: number): string[] {
  const roleFeatures: { [key: number]: string[] } = {
    1: [ // Admin
      "Full System Access",
      "User Management",
      "Role Management",
      "System Configuration",
      "View All Reports",
      "Audit Logs"
    ],
    2: [ // Procurement Officer
      "Manage Procurement Orders",
      "View Suppliers",
      "Create Purchase Orders",
      "Track Deliveries"
    ],
    3: [ // Warehouse Clerk
      "Manage Warehouse",
      "Tool Movement Tracking",
      "Inventory Updates",
      "Stock Management"
    ],
    4: [ // Quality Inspector
      "Quality Control",
      "Inspection Reports",
      "Approve/Reject Items",
      "View Tool Details"
    ],
    5: [ // Project Manager
      "Manage Projects",
      "Resource Allocation",
      "View Reports",
      "Assign Tools"
    ],
    6: [ // Technician
      "Request Tools",
      "Return Tools",
      "Log Maintenance",
      "View Tool Availability"
    ],
    7: [ // Billing Clerk
      "Create Invoices",
      "Process Payments",
      "View Billing History",
      "Generate Reports"
    ],
    8: [ // Inventory Manager
      "Manage Inventory",
      "Stock Reports",
      "Tool Management",
      "Adjust Stock Levels"
    ]
  };

  return roleFeatures[roleId || 1] || ["View Dashboard", "Basic Access"];
}

