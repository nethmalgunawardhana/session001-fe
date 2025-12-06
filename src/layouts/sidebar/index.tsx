import { Link, useLocation } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Package,
  TrendingUp,
  History,
  QrCode,
  Wrench,
} from "lucide-react";
import {
  TOOLS_DASHBOARD,
  TOOLS_MANAGE,
  TOOLS_MOVEMENTS,
  TOOLS_QR_SCANNER,
  TOOLS_REPORTS,
} from "../../constants/routes";
import { getUser, logout } from "../../utils/auth";

export const SideBar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const currentUser = getUser();

  // Tool Inventory menu items
  const toolInventoryNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: TOOLS_DASHBOARD },
    { icon: Wrench, label: "Tools", href: TOOLS_MANAGE },
    { icon: History, label: "Movements", href: TOOLS_MOVEMENTS },
    { icon: QrCode, label: "QR Scanner", href: TOOLS_QR_SCANNER },
    { icon: TrendingUp, label: "Reports", href: TOOLS_REPORTS },
  ];

  const isActive = (href: string) => {
    if (href === TOOLS_DASHBOARD && pathname === "/") return true;
    if (href === "#") return false;
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 bg-card text-foreground p-6 flex flex-col justify-between border-r border-border md:flex">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-foreground rounded-full" />
          <h1 className="text-xl font-bold text-foreground">ToolTrackr</h1>
        </div>
        <nav>
          {/* Tool Inventory Navigation */}
          <div>
            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Tool Inventory
            </h3>
            <ul className="space-y-1">
              {toolInventoryNavItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-active text-active-foreground font-semibold"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-indigo-50 hover:text-indigo-700"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
};
