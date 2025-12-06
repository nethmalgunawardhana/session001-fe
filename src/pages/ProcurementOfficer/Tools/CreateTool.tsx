import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { axiosInstance as axios } from "../../../config/axios";

interface ToolFormData {
  make: string;
  model: string;
  category: string;
  supplierId: string;
  warrantyPeriod: number;
  description: string;
  serialNumber: string;
  purchasePrice: number;
  currency: string;
}

interface Supplier {
  id: string;
  name: string;
}

export const CreateTool: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<keyof ToolFormData, string>>>({});
  
  const [formData, setFormData] = useState<ToolFormData>({
    make: "",
    model: "",
    category: "",
    supplierId: "",
    warrantyPeriod: 12,
    description: "",
    serialNumber: "",
    purchasePrice: 0,
    currency: "USD",
  });

  const categories = [
    "Power Tools",
    "Hand Tools",
    "Measuring Tools",
    "Safety Equipment",
    "Cutting Tools",
    "Fastening Tools",
    "Material Handling",
    "Other",
  ];

  const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"];

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoadingSuppliers(true);
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/suppliers');
      // setSuppliers(response.data);
      
      // Mock data for now
      setSuppliers([
        { id: "1", name: "Supplier A" },
        { id: "2", name: "Supplier B" },
        { id: "3", name: "Supplier C" },
      ]);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoadingSuppliers(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ToolFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ToolFormData, string>> = {};

    if (!formData.make.trim()) {
      newErrors.make = "Make is required";
    }
    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.supplierId) {
      newErrors.supplierId = "Supplier is required";
    }
    if (formData.warrantyPeriod < 0) {
      newErrors.warrantyPeriod = "Warranty period must be positive";
    }
    if (formData.purchasePrice < 0) {
      newErrors.purchasePrice = "Purchase price must be positive";
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
      // const response = await axios.post('/api/tools', formData);
      
      // Mock success for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Show success toast
      alert("Tool created successfully!");
      
      // Redirect to tool details page
      // navigate(`/procurement/tools/${response.data.id}`);
      navigate("/procurement/dashboard");
      
    } catch (error: any) {
      console.error("Error creating tool:", error);
      alert(error.response?.data?.message || "Failed to create tool");
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-foreground">
            Create New Tool Profile
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a new tool to your inventory with complete details
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Make */}
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-foreground mb-2">
                  Make <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.make ? "border-red-500" : "border-border"
                  }`}
                  placeholder="e.g., Bosch, DeWalt, Makita"
                />
                {errors.make && (
                  <p className="text-red-500 text-sm mt-1">{errors.make}</p>
                )}
              </div>

              {/* Model */}
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-foreground mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.model ? "border-red-500" : "border-border"
                  }`}
                  placeholder="e.g., GSR 12V-15"
                />
                {errors.model && (
                  <p className="text-red-500 text-sm mt-1">{errors.model}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* Serial Number */}
              <div>
                <label htmlFor="serialNumber" className="block text-sm font-medium text-foreground mb-2">
                  Serial Number
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., SN123456789"
                />
              </div>
            </div>
          </div>

          {/* Supplier & Warranty Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              Supplier & Warranty
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Supplier */}
              <div>
                <label htmlFor="supplierId" className="block text-sm font-medium text-foreground mb-2">
                  Supplier <span className="text-red-500">*</span>
                </label>
                <select
                  id="supplierId"
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  disabled={loadingSuppliers}
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.supplierId ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">
                    {loadingSuppliers ? "Loading suppliers..." : "Select supplier"}
                  </option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                {errors.supplierId && (
                  <p className="text-red-500 text-sm mt-1">{errors.supplierId}</p>
                )}
              </div>

              {/* Warranty Period */}
              <div>
                <label htmlFor="warrantyPeriod" className="block text-sm font-medium text-foreground mb-2">
                  Warranty Period (months)
                </label>
                <input
                  type="number"
                  id="warrantyPeriod"
                  name="warrantyPeriod"
                  value={formData.warrantyPeriod}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.warrantyPeriod ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.warrantyPeriod && (
                  <p className="text-red-500 text-sm mt-1">{errors.warrantyPeriod}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              Pricing Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Purchase Price */}
              <div>
                <label htmlFor="purchasePrice" className="block text-sm font-medium text-foreground mb-2">
                  Purchase Price
                </label>
                <input
                  type="number"
                  id="purchasePrice"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.purchasePrice ? "border-red-500" : "border-border"
                  }`}
                  placeholder="0.00"
                />
                {errors.purchasePrice && (
                  <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>
                )}
              </div>

              {/* Currency */}
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-foreground mb-2">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
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
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              Additional Details
            </h2>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tool description, specifications, and any additional notes..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Create Tool
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTool;
