import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface Tool {
  id: string;
  make: string;
  model: string;
  category: string;
  status: string;
  dateAdded: string;
}

interface RecentToolsTableProps {
  loading?: boolean;
}

export const RecentToolsTable: React.FC<RecentToolsTableProps> = ({
  loading = false,
}) => {
  // Mock data - replace with actual data from API
  const recentTools: Tool[] = [];

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  if (recentTools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted rounded-full p-6 mb-4">
          <ExternalLink className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No tools added yet
        </h3>
        <p className="text-muted-foreground mb-4 max-w-sm">
          Start by adding your first tool to the inventory. Click the "Add New
          Tool" button above to get started.
        </p>
        <Link
          to="/procurement/tools/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Your First Tool
        </Link>
      </div>
    );
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in use":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "under maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "qc failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
              Make & Model
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
              Category
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
              Status
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
              Date Added
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {recentTools.map((tool) => (
            <tr
              key={tool.id}
              className="border-b border-border hover:bg-accent transition-colors"
            >
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-foreground">{tool.make}</p>
                  <p className="text-sm text-muted-foreground">{tool.model}</p>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-foreground">
                {tool.category}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                    tool.status
                  )}`}
                >
                  {tool.status}
                </span>
              </td>
              <td className="py-4 px-4 text-sm text-muted-foreground">
                {new Date(tool.dateAdded).toLocaleDateString()}
              </td>
              <td className="py-4 px-4 text-right">
                <Link
                  to={`/procurement/tools/${tool.id}`}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentToolsTable;
