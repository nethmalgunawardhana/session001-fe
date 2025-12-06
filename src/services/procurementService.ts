import { axiosInstance as axios } from '../config/axios';

// Procurement Information Types
export interface ProcurementInfo {
  id: string;
  toolId: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  procurementDate: string;
  unitCost: number;
  currency: string;
  quantity: number;
  status: string;
  notes?: string;
}

export interface CreateProcurementRequest {
  toolId: string;
  poNumber: string;
  supplierId: string;
  procurementDate: string;
  unitCost: number;
  currency: string;
  quantity?: number;
  notes?: string;
}

export interface UpdateProcurementRequest {
  poNumber?: string;
  supplierId?: string;
  procurementDate?: string;
  unitCost?: number;
  currency?: string;
  quantity?: number;
  status?: string;
  notes?: string;
}

// Supplier Return Types
export interface SupplierReturn {
  id: string;
  toolId: string;
  toolName: string;
  supplierId: string;
  supplierName: string;
  rmaNumber: string;
  reason: string;
  returnDate: string;
  notes?: string;
  status: string;
  pdfUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReturnRequest {
  toolId: string;
  supplierId: string;
  rmaNumber: string;
  reason: string;
  returnDate: string;
  notes?: string;
}

// Report Types
export interface ProcurementMetrics {
  totalPurchases: number;
  totalSpend: number;
  avgCost: number;
  topCategory: string;
}

export interface CategorySpend {
  category: string;
  totalSpend: number;
  percentage: number;
  toolCount: number;
}

export interface SupplierPerformance {
  id: string;
  name: string;
  totalOrders: number;
  onTimeDeliveryRate: number;
  defectRate: number;
  avgCost: number;
  rating: number;
  contactEmail?: string;
  contactPhone?: string;
}

export interface ProcurementReport {
  dateRange: string;
  metrics: ProcurementMetrics;
  categorySpend: CategorySpend[];
  supplierPerformance: SupplierPerformance[];
}

const API_BASE = '/api/procurement';

export class ProcurementService {
  // ============ Procurement Information ============

  /**
   * Get procurement information for a specific tool
   */
  static async getProcurementInfo(toolId: string): Promise<ProcurementInfo> {
    const response = await axios.get(`${API_BASE}/tools/${toolId}`);
    return response.data;
  }

  /**
   * Create procurement information for a tool
   */
  static async createProcurement(data: CreateProcurementRequest): Promise<ProcurementInfo> {
    const response = await axios.post(`${API_BASE}/tools/${data.toolId}`, data);
    return response.data;
  }

  /**
   * Update procurement information
   */
  static async updateProcurement(
    toolId: string,
    data: UpdateProcurementRequest
  ): Promise<ProcurementInfo> {
    const response = await axios.patch(`${API_BASE}/tools/${toolId}`, data);
    return response.data;
  }

  /**
   * Delete procurement information
   */
  static async deleteProcurement(toolId: string): Promise<void> {
    await axios.delete(`${API_BASE}/tools/${toolId}`);
  }

  /**
   * Validate PO number uniqueness
   */
  static async validatePONumber(poNumber: string): Promise<{ isValid: boolean; message?: string }> {
    const response = await axios.get(`${API_BASE}/validate-po/${encodeURIComponent(poNumber)}`);
    return response.data;
  }

  // ============ Supplier Returns ============

  /**
   * Get all supplier returns
   */
  static async getReturns(params?: {
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<SupplierReturn[]> {
    const response = await axios.get(`${API_BASE}/returns`, { params });
    return response.data;
  }

  /**
   * Get a specific return by ID
   */
  static async getReturnById(id: string): Promise<SupplierReturn> {
    const response = await axios.get(`${API_BASE}/returns/${id}`);
    return response.data;
  }

  /**
   * Create a new supplier return
   */
  static async createReturn(data: CreateReturnRequest): Promise<SupplierReturn> {
    const response = await axios.post(`${API_BASE}/returns`, data);
    return response.data;
  }

  /**
   * Update return status
   */
  static async updateReturnStatus(id: string, status: string): Promise<SupplierReturn> {
    const response = await axios.patch(`${API_BASE}/returns/${id}/status`, { status });
    return response.data;
  }

  /**
   * Generate return PDF document
   */
  static async generateReturnPDF(id: string): Promise<{ pdfUrl: string }> {
    const response = await axios.post(`${API_BASE}/returns/${id}/generate-pdf`);
    return response.data;
  }

  /**
   * Send return notification email to supplier
   */
  static async sendReturnNotification(id: string): Promise<{ success: boolean }> {
    const response = await axios.post(`${API_BASE}/returns/${id}/notify`);
    return response.data;
  }

  // ============ Reports & Analytics ============

  /**
   * Get procurement metrics for a date range
   */
  static async getProcurementMetrics(params: {
    startDate?: string;
    endDate?: string;
    period?: '7d' | '30d' | '90d' | 'year' | 'all';
  }): Promise<ProcurementMetrics> {
    const response = await axios.get(`${API_BASE}/reports/metrics`, { params });
    return response.data;
  }

  /**
   * Get category-wise spending
   */
  static async getCategorySpend(params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<CategorySpend[]> {
    const response = await axios.get(`${API_BASE}/reports/category-spend`, { params });
    return response.data;
  }

  /**
   * Get supplier performance data
   */
  static async getSupplierPerformance(params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<SupplierPerformance[]> {
    const response = await axios.get(`${API_BASE}/reports/supplier-performance`, { params });
    return response.data;
  }

  /**
   * Get complete procurement report
   */
  static async getProcurementReport(params: {
    startDate?: string;
    endDate?: string;
    period?: '7d' | '30d' | '90d' | 'year' | 'all';
  }): Promise<ProcurementReport> {
    const response = await axios.get(`${API_BASE}/reports`, { params });
    return response.data;
  }

  /**
   * Export procurement report as CSV
   */
  static async exportReportCSV(params: {
    startDate?: string;
    endDate?: string;
  }): Promise<Blob> {
    const response = await axios.get(`${API_BASE}/reports/export/csv`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  }

  /**
   * Export procurement report as PDF
   */
  static async exportReportPDF(params: {
    startDate?: string;
    endDate?: string;
  }): Promise<Blob> {
    const response = await axios.get(`${API_BASE}/reports/export/pdf`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  }

  // ============ Supplier Management ============

  /**
   * Get supplier details
   */
  static async getSupplier(id: string): Promise<SupplierPerformance> {
    const response = await axios.get(`${API_BASE}/suppliers/${id}`);
    return response.data;
  }

  /**
   * Get all suppliers
   */
  static async getSuppliers(): Promise<SupplierPerformance[]> {
    const response = await axios.get(`${API_BASE}/suppliers`);
    return response.data;
  }

  /**
   * Get tools from a specific supplier
   */
  static async getSupplierTools(supplierId: string): Promise<any[]> {
    const response = await axios.get(`${API_BASE}/suppliers/${supplierId}/tools`);
    return response.data;
  }
}

export default ProcurementService;
