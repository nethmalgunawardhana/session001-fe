import React from "react";
import { Users } from "lucide-react";

const Suppliers: React.FC = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Suppliers
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage supplier relationships and performance
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <Users className="w-24 h-24 mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Supplier Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            This feature is under development. You'll soon be able to manage
            supplier information, contacts, and performance metrics here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
