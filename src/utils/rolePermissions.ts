// Role-based access control utilities

export enum UserRole {
  Admin = 1,
  ProcurementOfficer = 2,
  WarehouseClerk = 3,
  QualityInspector = 4,
  ProjectManager = 5,
  Technician = 6,
  BillingClerk = 7,
  InventoryManager = 8,
}

export const RolePermissions = {
  [UserRole.Admin]: {
    name: "Admin",
    permissions: ["*"], // All permissions
  },
  [UserRole.ProcurementOfficer]: {
    name: "Procurement Officer",
    permissions: [
      "procurement.view",
      "procurement.create",
      "procurement.edit",
      "orders.view",
      "orders.create",
      "suppliers.view",
    ],
  },
  [UserRole.WarehouseClerk]: {
    name: "Warehouse Clerk",
    permissions: [
      "warehouse.view",
      "warehouse.manage",
      "inventory.view",
      "tools.view",
      "tools.movement",
    ],
  },
  [UserRole.QualityInspector]: {
    name: "Quality Inspector",
    permissions: [
      "quality.view",
      "quality.inspect",
      "quality.approve",
      "quality.reject",
      "tools.view",
    ],
  },
  [UserRole.ProjectManager]: {
    name: "Project Manager",
    permissions: [
      "projects.view",
      "projects.create",
      "projects.edit",
      "projects.assign",
      "tools.view",
      "inventory.view",
      "reports.view",
    ],
  },
  [UserRole.Technician]: {
    name: "Technician",
    permissions: [
      "tools.view",
      "tools.request",
      "tools.return",
      "maintenance.view",
      "maintenance.log",
    ],
  },
  [UserRole.BillingClerk]: {
    name: "Billing Clerk",
    permissions: [
      "billing.view",
      "billing.create",
      "billing.edit",
      "invoices.view",
      "invoices.create",
      "payments.view",
    ],
  },
  [UserRole.InventoryManager]: {
    name: "Inventory Manager",
    permissions: [
      "inventory.view",
      "inventory.manage",
      "inventory.reports",
      "tools.view",
      "tools.manage",
      "warehouse.view",
      "stock.view",
      "stock.adjust",
    ],
  },
};

/**
 * Check if user has specific permission
 */
export const hasPermission = (userRole: number, permission: string): boolean => {
  const rolePerms = RolePermissions[userRole as UserRole];
  
  if (!rolePerms) return false;
  
  // Admin has all permissions
  if (rolePerms.permissions.includes("*")) return true;
  
  return rolePerms.permissions.includes(permission);
};

/**
 * Check if user has any of the specified roles
 */
export const hasRole = (userRole: number, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(userRole as UserRole);
};

/**
 * Get current user from localStorage
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }
  return null;
};

/**
 * Get current user's role ID
 */
export const getCurrentUserRole = (): number | null => {
  const user = getCurrentUser();
  return user?.roleId || null;
};

/**
 * Check if current user has permission
 */
export const currentUserHasPermission = (permission: string): boolean => {
  const roleId = getCurrentUserRole();
  if (!roleId) return false;
  return hasPermission(roleId, permission);
};

/**
 * Check if current user has any of the specified roles
 */
export const currentUserHasRole = (allowedRoles: UserRole[]): boolean => {
  const roleId = getCurrentUserRole();
  if (!roleId) return false;
  return hasRole(roleId, allowedRoles);
};
