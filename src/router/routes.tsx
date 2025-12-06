import * as routes from "../constants/routes";

const routeItems = [
  {
    path: routes.DASHBOARD,
    component: "Dashboard",
    policy: "dashboard.index",
  },
  // Procurement Officer Routes
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
