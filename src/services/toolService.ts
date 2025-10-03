import { axiosInstance as axios } from '../config/axios';
import {
  ToolDto,
  CreateToolDto,
  UpdateToolDto,
  QRScanResultDto,
  ToolMovementDto,
  CreateMovementRequest,
  ToolSearchParams,
  ToolStatistics,
  QRValidationResult
} from '../types/tool';

const API_BASE = '/api/Tools';

export class ToolService {
  // Get all tools with optional search parameters
  static async getTools(params?: ToolSearchParams): Promise<ToolDto[]> {
    const response = await axios.get(API_BASE, { params });
    return response.data;
  }

  // Get a specific tool by ID
  static async getToolById(id: number): Promise<ToolDto> {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  }

  // Create a new tool
  static async createTool(tool: CreateToolDto): Promise<ToolDto> {
    const response = await axios.post(API_BASE, tool);
    return response.data;
  }

  // Update an existing tool
  static async updateTool(id: number, tool: UpdateToolDto): Promise<ToolDto> {
    const response = await axios.put(`${API_BASE}/${id}`, tool);
    return response.data;
  }

  // Delete a tool
  static async deleteTool(id: number): Promise<void> {
    await axios.delete(`${API_BASE}/${id}`);
  }

  // Get a tool by QR code
  static async getToolByQR(qrCode: string): Promise<ToolDto> {
    const response = await axios.get(`${API_BASE}/qr/${encodeURIComponent(qrCode)}`);
    return response.data;
  }

  // Process QR code scan
  static async scanQRCode(qrCode: string): Promise<QRScanResultDto> {
    const response = await axios.post(`${API_BASE}/scan`, JSON.stringify(qrCode), {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }

  // Generate a unique QR code
  static async generateQRCode(): Promise<{ qrCode: string }> {
    const response = await axios.get(`${API_BASE}/generate-qr`);
    return response.data;
  }

  // Get tools by status
  static async getToolsByStatus(status: string): Promise<ToolDto[]> {
    const response = await axios.get(`${API_BASE}/status/${encodeURIComponent(status)}`);
    return response.data;
  }

  // Get tools by category
  static async getToolsByCategory(category: string): Promise<ToolDto[]> {
    const response = await axios.get(`${API_BASE}/category/${encodeURIComponent(category)}`);
    return response.data;
  }

  // Get tools with warranty expiring soon
  static async getWarrantyExpiringTools(days: number = 30): Promise<ToolDto[]> {
    const response = await axios.get(`${API_BASE}/warranty-expiring`, {
      params: { days }
    });
    return response.data;
  }

  // Get tool statistics
  static async getToolStatistics(): Promise<ToolStatistics> {
    const response = await axios.get(`${API_BASE}/statistics`);
    return response.data;
  }

  // Get tool movements for a specific tool
  static async getToolMovements(toolId: number): Promise<ToolMovementDto[]> {
    const response = await axios.get(`${API_BASE}/${toolId}/movements`);
    return response.data;
  }

  // Create a tool movement record
  static async createToolMovement(
    toolId: number,
    movement: CreateMovementRequest
  ): Promise<ToolMovementDto> {
    const response = await axios.post(`${API_BASE}/${toolId}/movements`, movement);
    return response.data;
  }

  // Get all tool movements with pagination
  static async getAllMovements(page: number = 1, pageSize: number = 10): Promise<ToolMovementDto[]> {
    const response = await axios.get(`${API_BASE}/movements`, {
      params: { page, pageSize }
    });
    return response.data;
  }

  // Validate if QR code is unique
  static async validateQRCode(qrCode: string): Promise<QRValidationResult> {
    const response = await axios.get(`${API_BASE}/validate-qr/${encodeURIComponent(qrCode)}`);
    return response.data;
  }
}