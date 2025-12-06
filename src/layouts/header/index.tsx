import { useState, useRef, useEffect } from "react";
import { Search, User, LogOut, UserCircle, ChevronDown } from "lucide-react";
import { ThemeToggle } from "components/shared";
import { logout, getUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex justify-end items-center gap-4 p-3 border-b border-border">
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search"
          className="bg-card border border-border pl-10 rounded-lg h-10 w-full text-sm text-card-foreground focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>
      <ThemeToggle />
      
      {/* User Menu Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 h-9 px-3 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
        >
          <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="h-4 w-4 text-indigo-600" />
          </div>
          {user && (
            <span className="text-sm font-medium text-foreground hidden sm:block">
              {user.fullName}
            </span>
          )}
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-lg bg-card border border-border shadow-lg z-50">
            <div className="p-3 border-b border-border">
              <p className="text-sm font-medium text-foreground">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
              {user?.role && (
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    {user.role}
                  </span>
                </p>
              )}
            </div>
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
