import React, { useState, useEffect, useCallback } from 'react';
import { ToolService } from '../../services/toolService';
import { ToolMovementDto } from '../../types/tool';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

const AllMovements: React.FC = () => {
  const [movements, setMovements] = useState<ToolMovementDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);

  const fetchMovements = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ToolService.getAllMovements(currentPage, pageSize);
      setMovements(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movements');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getMovementTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'check-in': return 'bg-green-100 text-green-800';
      case 'check-out': return 'bg-blue-100 text-blue-800';
      case 'transfer': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-muted text-muted-foreground';
    }
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
          <Button onClick={fetchMovements} className="mt-4" name="Retry" />
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">All Tool Movements</h2>
          <Button onClick={fetchMovements} name="Refresh" variant="secondary" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-table-header">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tool
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  To Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Moved By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {movements.map((movement) => (
                <tr key={movement.movementID} className="hover:bg-muted">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {movement.tool?.name || `Tool #${movement.toolID}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {movement.tool?.model || 'Unknown model'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMovementTypeColor(movement.movementType)}`}>
                      {movement.movementType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {movement.previousLocation || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {movement.newLocation || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {movement.assignedTo || movement.createdBy || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(movement.movementDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {movement.notes || 'No notes'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {movements.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No movements found</p>
          </div>
        )}

        {/* Pagination */}
        <div className="bg-table-header px-4 py-3 flex items-center justify-between border-t border-border sm:px-6 mt-4">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              name="Previous"
            />
            <Button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={movements.length < pageSize}
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
                  disabled={movements.length < pageSize}
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

export default AllMovements;