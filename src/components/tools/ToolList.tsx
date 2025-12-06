import React, { useState, useEffect, useCallback } from 'react';
import { ToolDto, ToolSearchParams } from '../../types/tool';
import { ToolService } from '../../services/toolService';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

interface ToolListProps {
  initialTools?: ToolDto[];
  onToolSelect?: (tool: ToolDto) => void;
  searchParams?: ToolSearchParams;
}

const ToolList: React.FC<ToolListProps> = ({ 
  initialTools, 
  onToolSelect,
  searchParams = {}
}) => {
  const [tools, setTools] = useState<ToolDto[]>(initialTools || []);
  const [loading, setLoading] = useState(!initialTools);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilters, setSearchFilters] = useState<ToolSearchParams>(searchParams);

  // Update tools when initialTools prop changes (when parent refetches)
  useEffect(() => {
    if (initialTools) {
      setTools(initialTools);
    }
  }, [initialTools]);

  const fetchTools = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ToolService.getTools({
        ...searchFilters,
        Page: currentPage,
        PageSize: 10
      });
      setTools(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  }, [searchFilters, currentPage]);

  useEffect(() => {
    if (!initialTools) {
      fetchTools();
    }
  }, [fetchTools, initialTools]);

  const handleSearch = (filters: Partial<ToolSearchParams>) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-use': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'retired': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-600 text-center">
          <p>Error: {error}</p>
          <Button onClick={fetchTools} className="mt-4" name="Retry" />
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleSearch({ Name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleSearch({ Category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Supplier..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleSearch({ Supplier: e.target.value })}
          />
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleSearch({ Status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="In-Use">In Use</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Retired">Retired</option>
          </select>
        </div>
        
        {/* Quick Filter Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Quick Filters:</span>
          <Button
            onClick={() => handleSearch({ Status: 'Available' })}
            name="Available"
            variant="secondary"
            className="text-xs px-3 py-1"
          />
          <Button
            onClick={() => handleSearch({ Status: 'In-Use' })}
            name="In Use"
            variant="secondary"
            className="text-xs px-3 py-1"
          />
          <Button
            onClick={() => handleSearch({ Status: 'Maintenance' })}
            name="Maintenance"
            variant="secondary"
            className="text-xs px-3 py-1"
          />
          <Button
            onClick={() => handleSearch({ Status: 'Retired' })}
            name="Retired"
            variant="secondary"
            className="text-xs px-3 py-1"
          />
          <Button
            onClick={() => handleSearch({})}
            name="Clear Filters"
            variant="secondary"
            className="text-xs px-3 py-1"
          />
        </div>
      </Card>

      {/* Tools List */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Tools ({tools.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-table-header">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-table-header-foreground uppercase tracking-wider">
                  Tool
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-table-header-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-table-header-foreground uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-table-header-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-table-header-foreground uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-table-header-foreground uppercase tracking-wider">
                  Warranty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-table-header-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {tools.map((tool) => (
                <tr key={tool.toolID} className="hover:bg-muted">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {tool.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {tool.model}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tool.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tool.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tool.status)}`}>
                      {tool.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tool.storageLocation || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(tool.warrantyDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      onClick={() => onToolSelect?.(tool)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                      name="View"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-table-header px-4 py-3 flex items-center justify-between border-t border-border sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              name="Previous"
            />
            <Button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={tools.length < 10}
              name="Next"
            />
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border bg-card text-sm font-medium text-card-foreground hover:bg-muted"
                  name="Previous"
                />
                <Button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={tools.length < 10}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border bg-card text-sm font-medium text-card-foreground hover:bg-muted"
                  name="Next"
                />
              </nav>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ToolList;