# Tool Inventory Management Frontend

A comprehensive React TypeScript frontend application for managing tool inventory with QR code scanning, barcode support, and movement tracking.

## Features

### 🏠 Dashboard
- **Overview Statistics**: Total tools, available tools, warranty alerts, and total inventory value
- **Status Distribution**: Visual breakdown of tool statuses (Available, In-Use, Maintenance, Retired)
- **Category Analysis**: Distribution of tools by category
- **Recent Activity**: Recently added tools and updates
- **Warranty Alerts**: Tools with expiring warranties

### 🔧 Tool Management
- **CRUD Operations**: Create, read, update, and delete tools
- **Comprehensive Tool Data**:
  - Basic info (name, model, category, supplier)
  - Financial data (purchase price, warranty date)
  - Location tracking (storage location)
  - Status management (Available, In-Use, Maintenance, Retired)
  - QR code assignment and validation
  - Custom descriptions

### 📱 QR Code Integration
- **QR Code Generation**: Automatic generation of unique QR codes for new tools
- **QR Code Scanning**: Manual input and validation of QR codes
- **Tool Lookup**: Quick tool identification via QR code scanning
- **Validation**: Check QR code uniqueness before assignment

### 📍 Movement Tracking
- **Movement History**: Complete audit trail of tool movements
- **Movement Types**: Check-out, check-in, maintenance, repair, location changes
- **Assignment Tracking**: Track who has which tools
- **Location Updates**: Monitor tool location changes
- **Notes and Comments**: Additional context for each movement

### 🔍 Search and Filtering
- **Multi-field Search**: Search by name, category, supplier, status, location
- **Advanced Filtering**: Filter tools by multiple criteria simultaneously
- **Pagination**: Efficient handling of large tool inventories
- **Real-time Results**: Instant search results as you type

## Technology Stack

### Frontend Framework
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Hooks** for state management

### Core Dependencies
- **Axios** for API communication
- **React Router** for navigation
- **Date handling** for warranty tracking

### Development Tools
- **ESLint** for code linting
- **TypeScript** for type safety
- **VS Code** for development environment

## Project Structure

```
src/
├── components/
│   ├── shared/           # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Badge/
│   │   └── ...
│   └── tools/           # Tool-specific components
│       ├── ToolList.tsx
│       ├── ToolForm.tsx
│       ├── ToolMovements.tsx
│       ├── ToolStatsDashboard.tsx
│       ├── QRScanner.tsx
│       └── index.ts
├── pages/
│   ├── Dashboard/       # Main dashboard page
│   ├── Tools/          # Tool management page
│   └── ...
├── services/
│   └── toolService.ts   # API service layer
├── types/
│   └── tool.ts         # TypeScript type definitions
├── config/
│   ├── axios.ts        # Axios configuration
│   └── urls.ts         # API endpoints
└── ...
```

## API Integration

The frontend integrates with a comprehensive Tool Inventory Management API that provides:

### Tool Endpoints
- `GET /api/Tools` - Get all tools with filtering and pagination
- `POST /api/Tools` - Create a new tool
- `GET /api/Tools/{id}` - Get tool by ID
- `PUT /api/Tools/{id}` - Update existing tool
- `DELETE /api/Tools/{id}` - Delete tool
- `GET /api/Tools/qr/{qrCode}` - Get tool by QR code
- `POST /api/Tools/scan` - Process QR code scan
- `GET /api/Tools/generate-qr` - Generate unique QR code
- `GET /api/Tools/validate-qr/{qrCode}` - Validate QR code uniqueness
- `GET /api/Tools/status/{status}` - Get tools by status
- `GET /api/Tools/category/{category}` - Get tools by category
- `GET /api/Tools/warranty-expiring` - Get tools with expiring warranties
- `GET /api/Tools/statistics` - Get tool statistics

### Movement Endpoints
- `GET /api/Tools/{id}/movements` - Get tool movement history
- `POST /api/Tools/{id}/movements` - Create tool movement
- `GET /api/Tools/movements` - Get all movements with pagination

## Component Documentation

### ToolList Component
**Purpose**: Display and manage the list of tools with search and filtering capabilities.

**Features**:
- Responsive table layout
- Real-time search and filtering
- Status indicators with color coding
- Pagination for large datasets
- Tool selection for detailed view

**Props**:
- `initialTools?: ToolDto[]` - Pre-loaded tools
- `onToolSelect?: (tool: ToolDto) => void` - Tool selection callback
- `searchParams?: ToolSearchParams` - Initial search parameters

### ToolForm Component
**Purpose**: Create new tools or edit existing ones.

**Features**:
- Form validation
- QR code generation
- Category selection
- Date picker for warranty
- Auto-save drafts

**Props**:
- `tool?: ToolDto` - Tool to edit (undefined for new tool)
- `onSuccess?: (tool: ToolDto) => void` - Success callback
- `onCancel?: () => void` - Cancel callback

### ToolMovements Component
**Purpose**: Track and manage tool movement history.

**Features**:
- Movement history timeline
- Add new movements
- Movement type categorization
- User assignment tracking
- Location change monitoring

**Props**:
- `tool: ToolDto` - Tool to track movements for

### ToolStatsDashboard Component
**Purpose**: Display comprehensive tool inventory statistics and analytics.

**Features**:
- Key performance indicators
- Status distribution charts
- Category breakdown
- Warranty alerts
- Recent activity feed

**Props**:
- `tools: ToolDto[]` - All tools data
- `statistics: ToolStatistics` - Pre-calculated statistics
- `warrantyExpiring: ToolDto[]` - Tools with expiring warranties

### QRScanner Component
**Purpose**: Handle QR code scanning and validation.

**Features**:
- Manual QR code input
- QR code validation
- New QR code generation
- Tool lookup by QR code

**Props**:
- `onToolFound?: (tool: ToolDto) => void` - Tool found callback
- `onNewQRGenerated?: (qrCode: string) => void` - QR generation callback

## Type Definitions

### Core Types
```typescript
interface ToolDto {
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

interface ToolMovementDto {
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
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://localhost:7002
REACT_APP_NAME=Tool Inventory Management
REACT_APP_LANG=en
```

### API Configuration
The application uses Axios for API communication with the following configuration:
- Base URL: Configurable via environment variables
- Request/Response interceptors for authentication
- Error handling and retry logic

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Tool Inventory Management API running

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Start development server: `npm start`

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Usage Examples

### Adding a New Tool
1. Navigate to Tools page
2. Click "Add New Tool" button
3. Fill in tool details
4. Generate or enter QR code
5. Submit form

### Tracking Tool Movements
1. Select a tool from the list
2. Click "View" to open tool details
3. Navigate to "Movements" tab
4. Add new movement record with details

### QR Code Scanning
1. Go to QR Scanner tab
2. Enter QR code manually or use camera
3. View tool information if found
4. Generate new QR code if needed

## Best Practices

### State Management
- Use React hooks for component state
- Implement proper error boundaries
- Handle loading states consistently

### Performance
- Implement pagination for large datasets
- Use React.memo for expensive components
- Optimize re-renders with useCallback/useMemo

### User Experience
- Provide loading indicators
- Show clear error messages
- Implement proper form validation
- Use consistent color coding for statuses

## Future Enhancements

### Planned Features
- Camera-based QR code scanning
- Barcode support
- Advanced reporting and analytics
- Bulk operations
- Export functionality
- Mobile app integration
- Real-time notifications
- Advanced user permissions

### Technical Improvements
- Progressive Web App (PWA) support
- Offline functionality
- Advanced caching strategies
- Performance monitoring
- Automated testing suite

## Support

For issues, questions, or contributions, please refer to the project documentation or contact the development team.

---

**Note**: This frontend application is designed to work with the Tool Inventory Management API. Ensure the backend service is running and properly configured before using the application.