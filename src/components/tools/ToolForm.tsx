import React, { useState, useEffect } from 'react';
import { ToolService } from '../../services/toolService';
import { CreateToolDto, UpdateToolDto, ToolDto } from '../../types/tool';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

interface ToolFormProps {
  tool?: ToolDto;
  onSuccess?: (tool: ToolDto) => void;
  onCancel?: () => void;
}

const ToolForm: React.FC<ToolFormProps> = ({ tool, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    category: '',
    supplier: '',
    warrantyDate: '',
    description: '',
    storageLocation: '',
    purchasePrice: '',
    qrCode: '',
    status: 'Available'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tool) {
      setFormData({
        name: tool.name,
        model: tool.model,
        category: tool.category,
        supplier: tool.supplier,
        warrantyDate: tool.warrantyDate.split('T')[0], // Format for date input
        description: tool.description || '',
        storageLocation: tool.storageLocation || '',
        purchasePrice: tool.purchasePrice?.toString() || '',
        qrCode: tool.qrCode,
        status: tool.status
      });
    }
  }, [tool]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateQRCode = async () => {
    try {
      const result = await ToolService.generateQRCode();
      setFormData(prev => ({ ...prev, qrCode: result.qrCode }));
    } catch (err) {
      setError('Failed to generate QR code');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const toolData = {
        name: formData.name,
        model: formData.model,
        category: formData.category,
        supplier: formData.supplier,
        warrantyDate: new Date(formData.warrantyDate).toISOString(),
        description: formData.description || null,
        storageLocation: formData.storageLocation || null,
        purchasePrice: formData.purchasePrice ? parseFloat(formData.purchasePrice) : null,
        qrCode: formData.qrCode || null
      };

      let result: ToolDto;
      if (tool) {
        // Update existing tool
        const updateData: UpdateToolDto = {
          ...toolData,
          status: formData.status
        };
        result = await ToolService.updateTool(tool.toolID, updateData);
      } else {
        // Create new tool
        const createData: CreateToolDto = toolData;
        result = await ToolService.createTool(createData);
      }

      onSuccess?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save tool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {tool ? 'Edit Tool' : 'Add New Tool'}
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tool Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tool name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model *
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter model"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option value="Power Tools">Power Tools</option>
              <option value="Hand Tools">Hand Tools</option>
              <option value="Measuring Tools">Measuring Tools</option>
              <option value="Safety Equipment">Safety Equipment</option>
              <option value="Cutting Tools">Cutting Tools</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier *
            </label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter supplier name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Warranty Date *
            </label>
            <input
              type="date"
              name="warrantyDate"
              value={formData.warrantyDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {tool && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Available">Available</option>
                <option value="In-Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage Location
            </label>
            <input
              type="text"
              name="storageLocation"
              value={formData.storageLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter storage location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Price
            </label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter purchase price"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            QR Code
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="qrCode"
              value={formData.qrCode}
              onChange={handleInputChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="QR code will be generated automatically"
              readOnly={!tool}
            />
            {!tool && (
              <Button
                type="button"
                onClick={generateQRCode}
                name="Generate"
                variant="secondary"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tool description"
          />
        </div>

        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              name="Cancel"
              variant="secondary"
            />
          )}
          <Button
            type="submit"
            disabled={loading}
            name={loading ? 'Saving...' : tool ? 'Update Tool' : 'Create Tool'}
          />
        </div>
      </form>
    </Card>
  );
};

export default ToolForm;