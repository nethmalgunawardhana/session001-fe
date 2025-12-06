import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "components/shared";
import { Button } from "components/shared";
import { QrCode, Camera, CameraOff, Search } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import toast from "react-hot-toast";

export const QRScanner: React.FC = () => {
  const [scannerActive, setScannerActive] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [toolInfo, setToolInfo] = useState<any>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const readerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current) {
        stopScanner();
      }
    };
  }, []);

  const startScanner = async () => {
    try {
      if (!readerRef.current) return;

      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      await html5QrCode.start(
        { facingMode: "environment" }, // Use back camera
        config,
        (decodedText) => {
          // Success callback
          handleQRCodeScanned(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Error callback - silent, no need to show
          console.debug("QR Code scan error:", errorMessage);
        }
      );

      setScannerActive(true);
      toast.success("Camera started successfully");
    } catch (error: any) {
      console.error("Error starting scanner:", error);
      toast.error(error.message || "Failed to start camera. Please check permissions.");
      setScannerActive(false);
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      }
      setScannerActive(false);
      toast.success("Camera stopped");
    } catch (error) {
      console.error("Error stopping scanner:", error);
    }
  };

  const handleQRCodeScanned = (decodedText: string) => {
    setScannedData(decodedText);
    toast.success(`QR Code scanned: ${decodedText}`);

    // Here you would typically call an API to get tool information
    // For now, we'll just display the scanned data
    setToolInfo({
      qrCode: decodedText,
      name: "Sample Tool",
      status: "Available",
      location: "Warehouse A",
    });
  };

  const handleManualSearch = () => {
    if (!manualCode.trim()) {
      toast.error("Please enter a QR code");
      return;
    }
    handleQRCodeScanned(manualCode);
    setManualCode("");
  };

  const handleClearResults = () => {
    setScannedData(null);
    setToolInfo(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">QR Code Scanner</h1>
        <p className="text-muted-foreground mt-2">
          Scan and manage tool QR codes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Camera Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* QR Reader Container */}
              <div
                id="qr-reader"
                ref={readerRef}
                className={`w-full ${scannerActive ? "block" : "hidden"}`}
                style={{ minHeight: "300px" }}
              />

              {!scannerActive && (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                  <QrCode className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Camera Scanner Ready
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Click the button below to start scanning
                  </p>
                </div>
              )}

              {/* Camera Controls */}
              <div className="flex gap-2">
                {!scannerActive ? (
                  <Button
                    onClick={startScanner}
                    name="Start Camera"
                    variant="primary"
                    className="flex-1"
                    icon={<Camera className="h-4 w-4" />}
                  />
                ) : (
                  <Button
                    onClick={stopScanner}
                    name="Stop Camera"
                    variant="secondary"
                    className="flex-1"
                    icon={<CameraOff className="h-4 w-4" />}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manual Entry Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Manual Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Enter QR Code
                </label>
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleManualSearch()}
                  placeholder="Type or paste QR code here..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <Button
                onClick={handleManualSearch}
                name="Search Tool"
                variant="primary"
                className="w-full"
              />
            </div>

            {/* Scanned Results */}
            {scannedData && toolInfo && (
              <div className="mt-6 p-4 bg-accent rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-foreground">Scan Result</h4>
                  <Button
                    onClick={handleClearResults}
                    name="Clear"
                    variant="secondary"
                    className="text-xs"
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">QR Code:</span>
                    <span className="font-medium text-foreground">{toolInfo.qrCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tool Name:</span>
                    <span className="font-medium text-foreground">{toolInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {toolInfo.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium text-foreground">{toolInfo.location}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  1
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Start Camera</h5>
                <p className="text-muted-foreground">
                  Click "Start Camera" and allow camera permissions when prompted
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  2
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Scan QR Code</h5>
                <p className="text-muted-foreground">
                  Point your camera at the QR code on the tool
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  3
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">View Results</h5>
                <p className="text-muted-foreground">
                  Tool information will appear automatically after scanning
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanner;
