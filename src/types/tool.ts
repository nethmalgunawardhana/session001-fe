// Tool Inventory Management Types
export interface ToolDto {
  toolID: number;
  name: string;
  model: string;
  category: string;
  supplier: string;
  warrantyDate: string;
  qrCode: string;
  barcode?: string | null;
  description?: string | null;
  storageLocation?: string | null;
  status: string;
  purchasePrice?: number | null;
  createdDate: string;
  modifiedDate: string;
}

export interface CreateToolDto {
  name: string;
  model: string;
  category: string;
  supplier: string;
  warrantyDate: string;
  description?: string | null;
  storageLocation?: string | null;
  purchasePrice?: number | null;
  qrCode?: string | null;
}

export interface UpdateToolDto {
  name: string;
  model: string;
  category: string;
  supplier: string;
  warrantyDate: string;
  description?: string | null;
  storageLocation?: string | null;
  status: string;
  purchasePrice?: number | null;
}

export interface QRScanResultDto {
  exists: boolean;
  message: string;
  tool?: ToolDto | null;
  generatedQRCode?: string | null;
}

export interface ToolMovementDto {
  movementID: number;
  toolID: number;
  movementType: string;
  assignedTo?: string | null;
  previousLocation?: string | null;
  newLocation?: string | null;
  notes?: string | null;
  movementDate: string;
  createdBy: string;
  tool?: ToolDto | null;
}

export interface CreateMovementRequest {
  movementType: string;
  assignedTo?: string | null;
  newLocation?: string | null;
  notes?: string | null;
  createdBy?: string | null;
}

export interface ToolSearchParams {
  Name?: string;
  Category?: string;
  Supplier?: string;
  Status?: string;
  StorageLocation?: string;
  Page?: number;
  PageSize?: number;
}

export interface ToolStatistics {
  [key: string]: number;
}

export interface QRValidationResult {
  isUnique: boolean;
  qrCode: string;
}