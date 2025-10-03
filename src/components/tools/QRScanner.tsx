import React, { useState } from 'react';
import { ToolService } from '../../services/toolService';
import { QRScanResultDto, ToolDto } from '../../types/tool';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

interface QRScannerProps {
  onToolFound?: (tool: ToolDto) => void;
  onNewQRGenerated?: (qrCode: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onToolFound, onNewQRGenerated }) => {
  const [qrInput, setQrInput] = useState('');
  const [scanResult, setScanResult] = useState<QRScanResultDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleManualScan = async (qrCode: string) => {
    if (!qrCode.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const result = await ToolService.scanQRCode(qrCode);
      setScanResult(result);

      if (result.exists && result.tool) {
        onToolFound?.(result.tool);
      } else if (result.generatedQRCode) {
        onNewQRGenerated?.(result.generatedQRCode);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan QR code');
    } finally {
      setLoading(false);
    }
  };

  const generateNewQR = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ToolService.generateQRCode();
      setQrInput(result.qrCode);
      onNewQRGenerated?.(result.qrCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const validateQR = async (qrCode: string) => {
    if (!qrCode.trim()) return;

    try {
      setLoading(true);
      const result = await ToolService.validateQRCode(qrCode);
      setScanResult({
        exists: !result.isUnique,
        message: result.isUnique ? 'QR code is unique and can be used' : 'QR code already exists'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate QR code');
    } finally {
      setLoading(false);
    }
  };

  const lookupToolByQR = async (qrCode: string) => {
    if (!qrCode.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const tool = await ToolService.getToolByQR(qrCode);
      setScanResult({
        exists: true,
        message: 'Tool found successfully',
        tool: tool
      });
      onToolFound?.(tool);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Tool not found with this QR code');
      setScanResult({
        exists: false,
        message: 'Tool not found with this QR code'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">QR Code Scanner</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter QR Code Manually
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                placeholder="Enter QR code..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={() => handleManualScan(qrInput)}
                disabled={loading || !qrInput.trim()}
                name="Scan"
              />
              <Button
                onClick={() => lookupToolByQR(qrInput)}
                disabled={loading || !qrInput.trim()}
                name="Lookup"
                variant="secondary"
              />
              <Button
                onClick={() => validateQR(qrInput)}
                disabled={loading || !qrInput.trim()}
                name="Validate"
                variant="secondary"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={generateNewQR}
              disabled={loading}
              name="Generate New QR"
              variant="secondary"
            />
          </div>
        </div>
      </Card>

      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="text-red-600 text-sm">{error}</div>
        </Card>
      )}

      {scanResult && (
        <Card className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Scan Result</h4>
          <div className={`p-4 rounded-lg ${
            scanResult.exists ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <p className={`text-sm ${
              scanResult.exists ? 'text-green-800' : 'text-yellow-800'
            }`}>
              {scanResult.message}
            </p>

            {scanResult.tool && (
              <div className="mt-4 space-y-2">
                <h5 className="font-medium text-gray-900">Tool Information:</h5>
                <div className="text-sm text-gray-600">
                  <p><strong>Name:</strong> {scanResult.tool.name}</p>
                  <p><strong>Model:</strong> {scanResult.tool.model}</p>
                  <p><strong>Category:</strong> {scanResult.tool.category}</p>
                  <p><strong>Status:</strong> {scanResult.tool.status}</p>
                  <p><strong>Location:</strong> {scanResult.tool.storageLocation || 'N/A'}</p>
                </div>
              </div>
            )}

            {scanResult.generatedQRCode && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <strong>Generated QR Code:</strong> {scanResult.generatedQRCode}
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {loading && (
        <Card className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Processing...</span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default QRScanner;