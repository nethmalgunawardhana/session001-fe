import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  FileText,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { axiosInstance as axios } from "../../../config/axios";

interface Tool {
  id: string;
  make: string;
  model: string;
  serialNumber: string;
  supplier: {
    id: string;
    name: string;
    email: string;
  };
  status: string;
}

interface ReturnFormData {
  toolId: string;
  supplierId: string;
  rmaNumber: string;
  reason: string;
  date: string;
  notes: string;
}

interface SupplierReturnProps {
  tool: Tool;
  onClose: () => void;
  onSuccess: () => void;
}

export const SupplierReturn: React.FC<SupplierReturnProps> = ({
  tool,
  onClose,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ReturnFormData, string>>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<ReturnFormData>({
    toolId: tool.id,
    supplierId: tool.supplier.id,
    rmaNumber: "",
    reason: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const returnReasons = [
    "Quality Check Failed - Does not meet specifications",
    "Quality Check Failed - Defective unit",
    "Quality Check Failed - Damaged during shipping",
    "Quality Check Failed - Missing components",
    "Quality Check Failed - Incorrect model/specifications",
    "Quality Check Failed - Performance issues",
    "Other (specify in notes)",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ReturnFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ReturnFormData, string>> = {};

    if (!formData.rmaNumber.trim()) {
      newErrors.rmaNumber = "RMA Number is required";
    }
    if (!formData.reason) {
      newErrors.reason = "Return reason is required";
    }
    if (!formData.date) {
      newErrors.date = "Return date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // TODO: Replace with actual API call
      // const response = await axios.post('/api/returns', formData);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      setShowSuccess(true);

      // Wait a bit then close
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error("Error creating return request:", error);
      alert(
        error.response?.data?.message || "Failed to create return request"
      );
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg border border-border p-8 max-w-md w-full text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Return Request Created
          </h3>
          <p className="text-muted-foreground mb-4">
            The supplier has been notified and a return note has been generated.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="text-sm text-foreground">
              <span className="font-medium">RMA Number:</span> {formData.rmaNumber}
            </p>
            <p className="text-sm text-foreground mt-1">
              <span className="font-medium">Status:</span> Returning to Supplier
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-card rounded-lg border border-border max-w-2xl w-full my-8">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Initiate Supplier Return
            </h2>
          </div>
          <p className="text-muted-foreground">
            Create a return request for a tool that failed Quality Check
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Tool Information */}
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-foreground mb-3">Tool Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Make & Model</p>
                <p className="font-medium text-foreground">
                  {tool.make} {tool.model}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Serial Number</p>
                <p className="font-medium text-foreground">{tool.serialNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Supplier</p>
                <p className="font-medium text-foreground">{tool.supplier.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {tool.status}
                </span>
              </div>
            </div>
          </div>

          {/* Return Details */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-foreground">Return Details</h3>

            {/* RMA Number */}
            <div>
              <label
                htmlFor="rmaNumber"
                className="block text-sm font-medium text-foreground mb-2"
              >
                RMA Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="rmaNumber"
                name="rmaNumber"
                value={formData.rmaNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.rmaNumber ? "border-red-500" : "border-border"
                }`}
                placeholder="RMA-2024-001"
              />
              {errors.rmaNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.rmaNumber}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Return Merchandise Authorization number from supplier
              </p>
            </div>

            {/* Return Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Return Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.date ? "border-red-500" : "border-border"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Return Reason */}
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Return Reason <span className="text-red-500">*</span>
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.reason ? "border-red-500" : "border-border"
                }`}
              >
                <option value="">Select a reason</option>
                {returnReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
              {errors.reason && (
                <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide additional details about the quality issues..."
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  What happens next?
                </p>
                <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Return note (PDF) will be automatically generated</li>
                  <li>• Supplier will receive email notification</li>
                  <li>• Tool status will be updated to "Returning to Supplier"</li>
                  <li>• Return tracking record will be created</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Return...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Create Return Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierReturn;
