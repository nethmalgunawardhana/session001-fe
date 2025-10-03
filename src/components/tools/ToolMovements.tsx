import React, { useState, useEffect } from 'react';
import { ToolService } from '../../services/toolService';
import { ToolMovementDto, CreateMovementRequest, ToolDto } from '../../types/tool';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

interface ToolMovementsProps {
  tool: ToolDto;
}

const ToolMovements: React.FC<ToolMovementsProps> = ({ tool }) => {
  const [movements, setMovements] = useState<ToolMovementDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    movementType: '',
    assignedTo: '',
    newLocation: '',
    notes: '',
    createdBy: 'Current User' // In a real app, this would come from auth context
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMovements();
  }, [tool.toolID]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMovements = async () => {
    try {
      setLoading(true);
      const data = await ToolService.getToolMovements(tool.toolID);
      setMovements(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movements');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const movementData: CreateMovementRequest = {
        movementType: formData.movementType,
        assignedTo: formData.assignedTo || null,
        newLocation: formData.newLocation || null,
        notes: formData.notes || null,
        createdBy: formData.createdBy
      };

      await ToolService.createToolMovement(tool.toolID, movementData);
      
      // Reset form and refresh movements
      setFormData({
        movementType: '',
        assignedTo: '',
        newLocation: '',
        notes: '',
        createdBy: 'Current User'
      });
      setShowAddForm(false);
      fetchMovements();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add movement');
    } finally {
      setSubmitting(false);
    }
  };

  const getMovementTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'check-out': return 'bg-blue-100 text-blue-800';
      case 'check-in': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'repair': return 'bg-red-100 text-red-800';
      case 'location-change': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Movement History</h2>
            <p className="text-gray-600">Track movements for {tool.name}</p>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            name={showAddForm ? 'Cancel' : 'Add Movement'}
            variant={showAddForm ? 'secondary' : 'primary'}
          />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Add Movement Form */}
        {showAddForm && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Movement</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Movement Type *
                  </label>
                  <select
                    name="movementType"
                    value={formData.movementType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select movement type</option>
                    <option value="Check-Out">Check Out</option>
                    <option value="Check-In">Check In</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Repair">Repair</option>
                    <option value="Location-Change">Location Change</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter person's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Location
                  </label>
                  <input
                    type="text"
                    name="newLocation"
                    value={formData.newLocation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Created By
                  </label>
                  <input
                    type="text"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting}
                  name={submitting ? 'Adding...' : 'Add Movement'}
                />
              </div>
            </form>
          </div>
        )}

        {/* Movements List */}
        {movements.length > 0 ? (
          <div className="space-y-4">
            {movements.map((movement) => (
              <div key={movement.movementID} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMovementTypeColor(movement.movementType)}`}>
                        {movement.movementType}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(movement.movementDate)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {movement.assignedTo && (
                        <div>
                          <span className="font-medium text-gray-700">Assigned To:</span>
                          <p className="text-gray-600">{movement.assignedTo}</p>
                        </div>
                      )}
                      
                      {movement.newLocation && (
                        <div>
                          <span className="font-medium text-gray-700">Location:</span>
                          <p className="text-gray-600">{movement.newLocation}</p>
                        </div>
                      )}
                      
                      {movement.previousLocation && (
                        <div>
                          <span className="font-medium text-gray-700">Previous Location:</span>
                          <p className="text-gray-600">{movement.previousLocation}</p>
                        </div>
                      )}
                    </div>
                    
                    {movement.notes && (
                      <div className="mt-2">
                        <span className="font-medium text-gray-700">Notes:</span>
                        <p className="text-gray-600 text-sm mt-1">{movement.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right text-sm text-gray-500">
                    <p>By: {movement.createdBy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No movements recorded for this tool</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ToolMovements;