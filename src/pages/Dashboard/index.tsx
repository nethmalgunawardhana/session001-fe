import React, { useEffect, useState } from "react";
import { ToolService } from "../../services/toolService";
import { ToolDto, ToolStatistics } from "../../types/tool";
import ToolList from "../../components/tools/ToolList";
import ToolStatsDashboard from "../../components/tools/ToolStatsDashboard";
import QRScanner from "../../components/tools/QRScanner";
import AllMovements from "../../components/tools/AllMovements";
import { Button } from "../../components/shared/Button";
import { Card } from "../../components/shared/Card";

export default function Dashboard() {
  const [tools, setTools] = useState<ToolDto[]>([]);
  const [statistics, setStatistics] = useState<ToolStatistics>({});
  const [warrantyExpiring, setWarrantyExpiring] = useState<ToolDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'scanner' | 'warranty' | 'movements'>('overview');
  const [selectedTool, setSelectedTool] = useState<ToolDto | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [toolsData, statsData, warrantyData] = await Promise.all([
        ToolService.getTools({ PageSize: 50 }),
        ToolService.getToolStatistics(),
        ToolService.getWarrantyExpiringTools(30)
      ]);
      
      setTools(toolsData);
      setStatistics(statsData);
      setWarrantyExpiring(warrantyData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleToolFound = (tool: ToolDto) => {
    setSelectedTool(tool);
    setActiveTab('tools');
  };

  const handleNewQRGenerated = (qrCode: string) => {
    console.log('New QR Code generated:', qrCode);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 m-6">
        <div className="text-red-600 text-center">
          <p>Error: {error}</p>
          <Button onClick={fetchDashboardData} className="mt-4" name="Retry" />
        </div>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tool Inventory Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage and track your tool inventory with QR code scanning</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'tools', label: 'Tools' },
              { key: 'scanner', label: 'QR Scanner' },
              { key: 'movements', label: 'All Movements' },
              { key: 'warranty', label: 'Warranty Alerts' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <ToolStatsDashboard 
            tools={tools}
            statistics={statistics}
            warrantyExpiring={warrantyExpiring}
          />
        )}

        {activeTab === 'tools' && (
          <ToolList 
            initialTools={tools}
            onToolSelect={setSelectedTool}
          />
        )}

        {activeTab === 'scanner' && (
          <QRScanner 
            onToolFound={handleToolFound}
            onNewQRGenerated={handleNewQRGenerated}
          />
        )}

        {activeTab === 'movements' && (
          <AllMovements />
        )}

        {activeTab === 'warranty' && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Warranty Alerts</h2>
            {warrantyExpiring.length > 0 ? (
              <div className="space-y-4">
                {warrantyExpiring.map((tool) => {
                  const daysLeft = Math.ceil(
                    (new Date(tool.warrantyDate).getTime() - new Date().getTime()) / 
                    (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div key={tool.toolID} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{tool.name}</h3>
                        <p className="text-sm text-gray-600">{tool.model} • {tool.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-yellow-800">
                          {daysLeft} days left
                        </p>
                        <p className="text-xs text-gray-500">
                          Expires: {new Date(tool.warrantyDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No tools with expiring warranties</p>
              </div>
            )}
          </Card>
        )}

        {/* Selected Tool Modal/Details */}
        {selectedTool && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tool Details</h3>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {selectedTool.name}</p>
                  <p><strong>Model:</strong> {selectedTool.model}</p>
                  <p><strong>Category:</strong> {selectedTool.category}</p>
                  <p><strong>Supplier:</strong> {selectedTool.supplier}</p>
                  <p><strong>Status:</strong> {selectedTool.status}</p>
                  <p><strong>Location:</strong> {selectedTool.storageLocation || 'N/A'}</p>
                  <p><strong>QR Code:</strong> {selectedTool.qrCode}</p>
                  {selectedTool.description && (
                    <p><strong>Description:</strong> {selectedTool.description}</p>
                  )}
                  <p><strong>Warranty:</strong> {new Date(selectedTool.warrantyDate).toLocaleDateString()}</p>
                  {selectedTool.purchasePrice && (
                    <p><strong>Value:</strong> ${selectedTool.purchasePrice.toLocaleString()}</p>
                  )}
                </div>
                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={() => setSelectedTool(null)}
                    name="Close"
                    variant="secondary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

