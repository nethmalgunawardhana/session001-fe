import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Package,
  Calendar,
  DollarSign,
  AlertCircle,
  Save,
  Loader2,
  FileText,
} from "lucide-react";
import { axiosInstance as axios } from "../../../config/axios";

interface Tool {
  id: string;
  make: string;
  model: string;
  category: string;
  serialNumber: string;
  status: string;
  supplier: {
    id: string;
    name: string;
  };
  warrantyPeriod: number;
  purchasePrice: number;
  currency: string;
  description: string;
  dateAdded: string;
  procurement?: ProcurementInfo;
}

interface ProcurementInfo {
  poNumber: string;
  supplierId: string;
  supplierName: string;
  procurementDate: string;
  unitCost: number;
  currency: string;
  status: string;
}

interface ProcurementFormData {
  poNumber: string;
  supplierId: string;
  procurementDate: string;
  unitCost: number;
  currency: string;
}

export const ToolDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingProcurement, setEditingProcurement] = useState(false);
  const [savingProcurement, setSavingProcurement] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProcurementFormData, string>>>({});

  const [procurementForm, setProcurementForm] = useState<ProcurementFormData>({
    poNumber: "",
    supplierId: "",
    procurementDate: new Date().toISOString().split("T")[0],
    unitCost: 0,
    currency: "USD",
  });

  const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"];

  useEffect(() => {
    fetchToolDetails();
  }, [id]);

  const fetchToolDetails = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await axios.get(`/api/tools/${id}`);
      // setTool(response.data);
      
      // Mock data for now
      setTimeout(() => {
        setTool({
          id: id || "1",
          make: "Bosch",
          model: "GSR 12V-15",
          category: "Power Tools",
          serialNumber: "SN123456789",
          status: "Available",
          supplier: {
            id: "1",
            name: "Supplier A",
          },
          warrantyPeriod: 12,
          purchasePrice: 299.99,
          currency: "USD",
          description: "Cordless drill with 2 batteries",
          dateAdded: new Date().toISOString(),
          procurement: undefined,
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching tool details:", error);
      setLoading(false);
    }
  };

  const handleProcurementChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProcurementForm((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof ProcurementFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateProcurementForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProcurementFormData, string>> = {};

    if (!procurementForm.poNumber.trim()) {
      newErrors.poNumber = "PO Number is required";
    }
    if (!procurementForm.supplierId) {
      newErrors.supplierId = "Supplier is required";
    }
    if (!procurementForm.procurementDate) {
      newErrors.procurementDate = "Procurement date is required";
    } else {
      const selectedDate = new Date(procurementForm.procurementDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate > today) {
        newErrors.procurementDate = "Procurement date cannot be in the future";
      }
    }
    if (procurementForm.unitCost <= 0) {
      newErrors.unitCost = "Unit cost must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProcurement = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProcurementForm()) {
      return;
    }

    try {
      setSavingProcurement(true);
      
      // TODO: Replace with actual API call
      // await axios.patch(`/api/tools/${id}/procurement`, procurementForm);
      
      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      alert("Procurement information saved successfully!");
      setEditingProcurement(false);
      fetchToolDetails(); // Refresh tool data
      
    } catch (error: any) {
      console.error("Error saving procurement info:", error);
      alert(error.response?.data?.message || "Failed to save procurement information");
    } finally {
      setSavingProcurement(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in use":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "under maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "qc failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "pending qc":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Tool Not Found
          </h2>
          <button
            onClick={() => navigate("/procurement/dashboard")}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-6 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {tool.make} {tool.model}
              </h1>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                    tool.status
                  )}`}
                >
                  {tool.status}
                </span>
                <span className="text-muted-foreground">
                  • {tool.category}
                </span>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors">
              <Edit className="w-4 h-4" />
              Edit Tool
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tool Details Card */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Tool Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Serial Number</p>
                  <p className="font-medium text-foreground">
                    {tool.serialNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Supplier</p>
                  <p className="font-medium text-foreground">{tool.supplier.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Warranty Period</p>
                  <p className="font-medium text-foreground">
                    {tool.warrantyPeriod} months
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Purchase Price</p>
                  <p className="font-medium text-foreground">
                    {tool.currency} {tool.purchasePrice.toFixed(2)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="text-foreground">{tool.description || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Procurement Information Card */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">
                  Procurement Information
                </h2>
                {!editingProcurement && !tool.procurement && (
                  <button
                    onClick={() => {
                      setEditingProcurement(true);
                      setProcurementForm({
                        ...procurementForm,
                        supplierId: tool.supplier.id,
                        unitCost: tool.purchasePrice,
                        currency: tool.currency,
                      });
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Add Procurement Info
                  </button>
                )}
              </div>

              {editingProcurement ? (
                <form onSubmit={handleSaveProcurement} className="space-y-4">
                  {/* PO Number */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      PO Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="poNumber"
                      value={procurementForm.poNumber}
                      onChange={handleProcurementChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.poNumber ? "border-red-500" : "border-border"
                      }`}
                      placeholder="PO-2024-001"
                    />
                    {errors.poNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.poNumber}</p>
                    )}
                  </div>

                  {/* Procurement Date */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Procurement Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="procurementDate"
                      value={procurementForm.procurementDate}
                      onChange={handleProcurementChange}
                      max={new Date().toISOString().split("T")[0]}
                      className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.procurementDate ? "border-red-500" : "border-border"
                      }`}
                    />
                    {errors.procurementDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.procurementDate}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Unit Cost */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Unit Cost <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="unitCost"
                        value={procurementForm.unitCost}
                        onChange={handleProcurementChange}
                        min="0"
                        step="0.01"
                        className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.unitCost ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.unitCost && (
                        <p className="text-red-500 text-sm mt-1">{errors.unitCost}</p>
                      )}
                    </div>

                    {/* Currency */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Currency
                      </label>
                      <select
                        name="currency"
                        value={procurementForm.currency}
                        onChange={handleProcurementChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {currencies.map((curr) => (
                          <option key={curr} value={curr}>
                            {curr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={savingProcurement}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {savingProcurement ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProcurement(false);
                        setErrors({});
                      }}
                      disabled={savingProcurement}
                      className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : tool.procurement ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">PO Number</p>
                      <p className="font-medium text-foreground">
                        {tool.procurement.poNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Procurement Date</p>
                      <p className="font-medium text-foreground">
                        {new Date(tool.procurement.procurementDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Unit Cost</p>
                      <p className="font-medium text-foreground">
                        {tool.procurement.currency} {tool.procurement.unitCost.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                          tool.procurement.status
                        )}`}
                      >
                        {tool.procurement.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingProcurement(true)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Edit Procurement Info
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No procurement information added yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tool ID</p>
                    <p className="font-medium text-foreground">{tool.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date Added</p>
                    <p className="font-medium text-foreground">
                      {new Date(tool.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Value</p>
                    <p className="font-medium text-foreground">
                      {tool.currency} {tool.purchasePrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetails;
