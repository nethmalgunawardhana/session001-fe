import * as routes from "../constants/routes";

const routeItems = [
  // Tool Inventory Routes
  {
    path: routes.TOOLS_DASHBOARD,
    component: "Dashboard",
    policy: "dashboard.index",
  },
  {
    path: routes.TOOLS_MANAGE,
    component: "Tools",
    policy: "tools.index",
  },
  {
    path: routes.TOOLS_NEW,
    component: "Tools/CreateTool",
    policy: "tools.create",
  },
  {
    path: routes.TOOLS_EDIT,
    component: "Tools/EditTool",
    policy: "tools.edit",
  },
  {
    path: routes.TOOLS_DETAILS,
    component: "Tools/ToolDetails",
    policy: "tools.view",
  },
  {
    path: routes.TOOLS_MOVEMENTS,
    component: "Movements",
    policy: "movements.index",
  },
  {
    path: routes.TOOLS_QR_SCANNER,
    component: "QRScanner",
    policy: "qr.scanner",
  },
  {
    path: routes.TOOLS_REPORTS,
    component: "Reports",
    policy: "reports.index",
  },
  // Legacy Procurement Officer Routes
  {
    path: routes.PROCUREMENT_DASHBOARD,
    component: "ProcurementOfficer/Dashboard",
    policy: "procurement.dashboard",
  },
  {
    path: routes.PROCUREMENT_TOOLS,
    component: "ProcurementOfficer/Tools",
    policy: "procurement.tools.index",
  },
  {
    path: routes.PROCUREMENT_TOOLS_NEW,
    component: "ProcurementOfficer/Tools/CreateTool",
    policy: "procurement.tools.create",
  },
  {
    path: routes.PROCUREMENT_TOOLS_DETAILS,
    component: "ProcurementOfficer/Tools/ToolDetails",
    policy: "procurement.tools.view",
  },
  {
    path: routes.PROCUREMENT_REPORTS,
    component: "ProcurementOfficer/Reports",
    policy: "procurement.reports",
  },
  {
    path: routes.PROCUREMENT_SUPPLIERS,
    component: "ProcurementOfficer/Suppliers",
    policy: "procurement.suppliers",
  },
];

export default routeItems;
