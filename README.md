# ToolTrackr - Tool Inventory Management System

A comprehensive React TypeScript frontend application for managing tool inventory with QR code scanning, barcode support, and movement tracking.

## Features

- ⚡️ **React 18** with TypeScript
- 🎨 **Tailwind CSS** for styling
- 🧭 **React Router** for navigation
- 📱 **Responsive Design** with mobile-first approach
- 🎯 **Component Library** with reusable UI components
- 🔐 **Authentication** setup with JWT
- 📊 **Dashboard** with tool statistics and analytics
- 🌙 **Dark Mode** support with next-themes
- 📋 **Form Management** with Formik and Yup
- 🔄 **Data Fetching** with Axios
- 🎭 **Icons** from Lucide React
- 📦 **Modern Build Setup** with Create React App
- 🔧 **Tool Management** - CRUD operations for tools
- 📱 **QR Code Integration** - Generation, scanning, and validation
- 📍 **Movement Tracking** - Complete audit trail of tool movements
- 🔍 **Advanced Search & Filtering** - Multi-field search with real-time results

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Tool Inventory Management API running

### Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Configure environment variables (create a `.env` file):
\`\`\`env
REACT_APP_API_URL=https://localhost:7002
REACT_APP_NAME=ToolTrackr
REACT_APP_LANG=en
\`\`\`

4. Start development server:
\`\`\`bash
npm start
\`\`\`

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### \`npm test\`

Launches the test runner in interactive watch mode.

### \`npm run build\`

Builds the app for production to the \`build\` folder.

### \`npm run eject\`

**Note: this is a one-way operation. Once you \`eject\`, you can't go back!**

## Project Structure

\`\`\`
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
│   ├── Login/          # Authentication
│   └── ...
├── services/
│   └── toolService.ts   # API service layer
├── types/
│   └── tool.ts         # TypeScript type definitions
├── config/
│   ├── axios.ts        # Axios configuration
│   └── urls.ts         # API endpoints
├── layouts/            # Layout components (Header, Sidebar)
├── constants/          # Application constants and routes
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── styles/             # Global styles
\`\`\`

## Key Features

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

### Authentication
- Login/logout functionality
- JWT token management
- Protected routes
- Role-based access control

### UI Components
- **Button** - Customizable button component
- **Card** - Flexible card component
- **Form Controls** - Input, textarea, checkbox, select
- **Navigation** - Sidebar navigation with tool-specific menu
- **Theme Toggle** - Dark/light mode switcher

### Styling
- Tailwind CSS utility classes
- Custom theme configuration
- Responsive design system
- Dark mode support

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

## Customization

### Theme Configuration
Edit \`tailwind.config.js\` to customize your theme colors, fonts, and spacing.

### API Configuration
Update \`src/config/urls.ts\` to set your API endpoints.

### Routes
Add new routes in \`src/router/routes.tsx\` and \`src/constants/routes/index.ts\`.

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

## Learn More

To learn more about the technologies used:

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)

## Support

For issues, questions, or contributions, please refer to the project documentation or contact the development team.

---

**Note**: This frontend application is designed to work with the Tool Inventory Management API. Ensure the backend service is running and properly configured before using the application.

## License

This project is MIT licensed.