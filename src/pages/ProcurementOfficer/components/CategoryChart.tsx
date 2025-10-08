import React from "react";

interface CategoryChartProps {
  loading?: boolean;
}

export const CategoryChart: React.FC<CategoryChartProps> = ({
  loading = false,
}) => {
  // Mock data - replace with actual data from API
  const categoryData = [
    { category: "Power Tools", count: 0, color: "bg-blue-500" },
    { category: "Hand Tools", count: 0, color: "bg-green-500" },
    { category: "Measuring Tools", count: 0, color: "bg-purple-500" },
    { category: "Safety Equipment", count: 0, color: "bg-yellow-500" },
    { category: "Other", count: 0, color: "bg-gray-500" },
  ];

  const total = categoryData.reduce((sum, item) => sum + item.count, 0);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-muted animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">No data available</p>
          <p className="text-sm">Add tools to see category distribution</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {categoryData.map((item, index) => {
        const percentage = total > 0 ? (item.count / total) * 100 : 0;
        return (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm font-medium text-foreground">
                  {item.category}
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {item.count}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryChart;
