import React, { useState, useEffect } from 'react';
import { ToolService } from '../../services/toolService';
import { ToolDto } from '../../types/tool';
import { ToolList, ToolForm, ToolMovements } from '../../components/tools';
import { Button } from '../../components/shared/Button';
import { Card } from '../../components/shared/Card';

const Tools: React.FC = () => {
  const [tools, setTools] = useState<ToolDto[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolDto | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showMovements, setShowMovements] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const data = await ToolService.getTools({ PageSize: 100 });
      setTools(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  };

  const handleToolSelect = (tool: ToolDto) => {
    setSelectedTool(tool);
    setShowMovements(true);
  };

  const handleToolSuccess = (tool: ToolDto) => {
    setShowForm(false);
    setSelectedTool(null);
    fetchTools();
  };

  const handleDeleteTool = async (toolId: number) => {
    if (!window.confirm('Are you sure you want to delete this tool?')) return;
    
    try {
      await ToolService.deleteTool(toolId);
      fetchTools();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete tool');
    }
  };

  const closeAllModals = () => {
    setShowForm(false);
    setShowMovements(false);
    setSelectedTool(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tools Management</h1>
            <p className="mt-2 text-gray-600">Manage your tool inventory</p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            name="Add New Tool"
          />
        </div>

        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <div className="text-red-600 text-sm">{error}</div>
          </Card>
        )}

        {/* Tools List */}
        <ToolList 
          initialTools={tools}
          onToolSelect={handleToolSelect}
        />

        {/* Add/Edit Tool Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
              <ToolForm
                tool={selectedTool || undefined}
                onSuccess={handleToolSuccess}
                onCancel={closeAllModals}
              />
            </div>
          </div>
        )}

        {/* Tool Movements Modal */}
        {showMovements && selectedTool && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Tool Movements - {selectedTool.name}
                </h2>
                <div className="space-x-2">
                  <Button
                    onClick={() => {
                      setShowMovements(false);
                      setShowForm(true);
                    }}
                    name="Edit Tool"
                    variant="secondary"
                  />
                  <Button
                    onClick={() => handleDeleteTool(selectedTool.toolID)}
                    name="Delete Tool"
                    variant="secondary"
                  />
                  <Button
                    onClick={closeAllModals}
                    name="Close"
                    variant="secondary"
                  />
                </div>
              </div>
              <ToolMovements tool={selectedTool} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;