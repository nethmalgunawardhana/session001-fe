# Procurement Officer Module

## 📁 Folder Structure

```
ProcurementOfficer/
├── Dashboard/
│   └── index.tsx                    # Main dashboard with metrics and charts
├── Tools/
│   ├── CreateTool.tsx              # Create new tool profile form
│   └── ToolDetails.tsx             # Tool details with procurement info
├── Suppliers/
│   └── (reserved for future features)
├── Reports/
│   └── index.tsx                    # Procurement reports & analytics
├── components/
│   ├── MetricCard.tsx              # Reusable metric card component
│   ├── StatusChart.tsx             # Status distribution chart
│   ├── CategoryChart.tsx           # Category distribution chart
│   ├── RecentToolsTable.tsx        # Recent tools table component
│   └── SupplierReturn.tsx          # Supplier return modal
├── index.ts                         # Module exports
└── README.md                        # This file
```

## 🎯 Features Implemented

### 1. **Procurement Officer Dashboard**

**File:** `Dashboard/index.tsx`

Matching the UI from the provided screenshot with:

- ✅ Four metric cards (Total Tools, Available, Warranty Expiring, Total Value)
- ✅ Tab navigation (Overview, Tools, QR Scanner, All Movements, Warranty Alerts)
- ✅ Status Distribution chart
- ✅ Category Distribution chart
- ✅ Recent Tools Added table
- ✅ "Add New Tool" button
- ✅ Responsive grid layout
- ✅ Dark mode support

**Routes:**

- `/procurement/dashboard` - Main dashboard

### 2. **Create Tool Profile**

**File:** `Tools/CreateTool.tsx`

Complete form for creating new tool entries with:

- ✅ Basic Information (Make, Model, Category, Serial Number)
- ✅ Supplier & Warranty (Supplier dropdown, Warranty period)
- ✅ Pricing Information (Purchase price, Currency selection)
- ✅ Additional Details (Description textarea)
- ✅ Form validation (required fields, positive values)
- ✅ Loading states and error handling
- ✅ Auto-fetch suppliers from API
- ✅ Success toast on creation
- ✅ Redirect to tool details after creation

**API Endpoint:**

```typescript
POST / api / tools;
Body: {
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
```

**Routes:**

- `/procurement/tools/new` - Create new tool

### 3. **Record Procurement Details**

**File:** `Tools/ToolDetails.tsx`

Tool details page with procurement information section:

- ✅ Tool information display (Make, Model, Serial, Supplier, Warranty, Price)
- ✅ Quick Info sidebar (Tool ID, Date Added, Value)
- ✅ Procurement Information form
  - PO Number (unique per supplier)
  - Procurement Date (cannot be future)
  - Unit Cost (must be > 0)
  - Currency selection
- ✅ Form validation
- ✅ Edit mode toggle
- ✅ Status badges
- ✅ Loading states

**API Endpoint:**

```typescript
PATCH /api/tools/:id/procurement
Body: {
  poNumber: string;
  supplierId: string;
  procurementDate: string;
  unitCost: number;
  currency: string;
}
```

**Routes:**

- `/procurement/tools/:id` - Tool details page

### 4. **Initiate Supplier Return (QC Fail)**

**File:** `components/SupplierReturn.tsx`

Modal component for creating return requests when tools fail QC:

- ✅ Tool information display
- ✅ RMA Number input
- ✅ Return Date picker
- ✅ Return Reason dropdown (7 predefined reasons)
- ✅ Additional Notes textarea
- ✅ Validation (RMA required, date required, reason required)
- ✅ Success confirmation with details
- ✅ Auto-notification to supplier
- ✅ PDF return note generation
- ✅ Status update to "Returning to Supplier"

**API Endpoint:**

```typescript
POST / api / returns;
Body: {
  toolId: string;
  supplierId: string;
  rmaNumber: string;
  reason: string;
  date: string;
  notes: string;
}
```

**Usage:**

```tsx
import { SupplierReturn } from "pages/ProcurementOfficer";

<SupplierReturn
  tool={toolData}
  onClose={() => setShowReturn(false)}
  onSuccess={() => refreshToolData()}
/>;
```

### 5. **Procurement Reports & Supplier Performance**

**File:** `Reports/index.tsx`

Comprehensive reports and analytics page:

- ✅ Date range filter (Last 7/30/90 days, Last Year, All Time)
- ✅ Key Metrics Cards
  - Total Purchases
  - Total Spend
  - Average Cost per Tool
  - Most Purchased Category
- ✅ Spend by Category Chart (bar chart)
- ✅ Procurement Trend Chart (placeholder for line/area chart)
- ✅ Supplier Performance Table
  - Supplier Name
  - Total Orders
  - On-Time Delivery % (color-coded)
  - Defect Rate % (color-coded)
  - Average Cost
  - Overall Rating (out of 5)
- ✅ Export Report button
- ✅ Color-coded performance indicators

**API Endpoints:**

```typescript
GET /api/reports/procurement?range=last_30_days
Response: {
  totalPurchases: number;
  totalSpend: number;
  avgCostPerTool: number;
  mostPurchasedCategory: string;
}

GET /api/reports/supplier-performance?range=last_30_days
Response: SupplierPerformance[]

GET /api/reports/category-spend?range=last_30_days
Response: CategorySpend[]
```

**Routes:**

- `/procurement/reports` - Reports & analytics page

## 🧩 Reusable Components

### MetricCard

**File:** `components/MetricCard.tsx`

Displays a metric with an icon and optional loading state.

**Props:**

```typescript
{
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  loading?: boolean;
  isCurrency?: boolean;
}
```

### StatusChart

**File:** `components/StatusChart.tsx`

Displays tool status distribution with progress bars.

**Props:**

```typescript
{
  loading?: boolean;
}
```

### CategoryChart

**File:** `components/CategoryChart.tsx`

Displays category distribution with progress bars.

**Props:**

```typescript
{
  loading?: boolean;
}
```

### RecentToolsTable

**File:** `components/RecentToolsTable.tsx`

Displays recent tools added with status badges and view details links.

**Props:**

```typescript
{
  loading?: boolean;
}
```

### SupplierReturn

**File:** `components/SupplierReturn.tsx`

Modal for creating supplier return requests.

**Props:**

```typescript
{
  tool: Tool;
  onClose: () => void;
  onSuccess: () => void;
}
```

## 🛠️ Setup & Integration

### 1. Add Routes to Router

Update `src/router/routes.tsx`:

```typescript
const routeItems = [
  // ... existing routes
  {
    path: "/procurement/dashboard",
    component: "ProcurementOfficer/Dashboard",
    policy: "procurement.dashboard",
  },
  {
    path: "/procurement/tools/new",
    component: "ProcurementOfficer/Tools/CreateTool",
    policy: "procurement.tools.create",
  },
  {
    path: "/procurement/tools/:id",
    component: "ProcurementOfficer/Tools/ToolDetails",
    policy: "procurement.tools.view",
  },
  {
    path: "/procurement/reports",
    component: "ProcurementOfficer/Reports",
    policy: "procurement.reports",
  },
];
```

### 2. Add to Sidebar Navigation

Update `src/layouts/sidebar/index.tsx` or navigation config:

```typescript
const procurementMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/procurement/dashboard",
  },
  {
    label: "Tools",
    icon: Package,
    path: "/procurement/tools",
  },
  {
    label: "Reports",
    icon: BarChart3,
    path: "/procurement/reports",
  },
];
```

### 3. Add Route Constants

Update `src/constants/routes/index.ts`:

```typescript
// Procurement Officer Routes
export const PROCUREMENT_DASHBOARD = "/procurement/dashboard";
export const PROCUREMENT_TOOLS_NEW = "/procurement/tools/new";
export const PROCUREMENT_TOOLS_DETAILS = "/procurement/tools/:id";
export const PROCUREMENT_REPORTS = "/procurement/reports";
```

## 🎨 UI Theme Matching

All components are designed to match the screenshot UI with:

- ✅ Blue color scheme (#3b82f6 - theme500/600/700)
- ✅ Consistent card layouts with borders
- ✅ Matching typography and spacing
- ✅ Status badges with appropriate colors
- ✅ Hover effects and transitions
- ✅ Dark mode support via CSS variables
- ✅ Responsive grid layouts
- ✅ Icon usage from lucide-react
- ✅ Tailwind CSS utility classes

**CSS Variables Used:**

- `bg-background` - Page background
- `bg-card` - Card backgrounds
- `border-border` - Border colors
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `bg-accent` - Hover states

## 📊 Data Flow

### Creating a Tool

```
User fills form → Validation → POST /api/tools
→ Success toast → Redirect to tool details
```

### Recording Procurement Info

```
User clicks "Add Procurement Info" → Form appears
→ User fills details → Validation → PATCH /api/tools/:id/procurement
→ Success → Refresh tool data
```

### Initiating Supplier Return

```
QC Fail status → "Return to Supplier" button visible
→ User clicks → Modal opens → User fills RMA details
→ POST /api/returns → Email sent to supplier
→ PDF generated → Status updated → Success confirmation
```

### Viewing Reports

```
User selects date range → GET /api/reports/procurement
→ GET /api/reports/supplier-performance
→ GET /api/reports/category-spend
→ Render charts and tables
```

## 🔒 Access Control

All routes should be protected and accessible only to users with the **"Procurement Officer"** role.

Check authentication in router:

```typescript
<PrivateRoute role="Procurement Officer">
  <ProcurementOfficerDashboard />
</PrivateRoute>
```

## 🧪 Testing Checklist

### Dashboard

- [ ] Metrics cards display correctly
- [ ] Charts render with data
- [ ] Recent tools table shows entries
- [ ] "Add New Tool" button navigates correctly
- [ ] Tab navigation works
- [ ] Dark mode toggle works

### Create Tool

- [ ] All fields validate correctly
- [ ] Required fields show error messages
- [ ] Suppliers load from API
- [ ] Form submits successfully
- [ ] Redirects to tool details
- [ ] Toast notification shows

### Tool Details

- [ ] Tool information displays correctly
- [ ] Procurement form validates
- [ ] Date cannot be future
- [ ] Unit cost must be positive
- [ ] Edit mode toggles correctly
- [ ] Saves successfully

### Supplier Return

- [ ] Modal opens for QC Failed tools only
- [ ] RMA validation works
- [ ] Return reasons populate
- [ ] Success confirmation shows
- [ ] Closes after success

### Reports

- [ ] Date range filter works
- [ ] Metrics update on filter change
- [ ] Charts render correctly
- [ ] Supplier table shows performance
- [ ] Color coding works (green/yellow/red)
- [ ] Export button triggers

## 🚀 Future Enhancements

1. **QR Code Integration**

   - QR scanner for tool lookup
   - Generate QR codes for new tools
   - Print QR labels

2. **Advanced Reporting**

   - Interactive charts (Chart.js or Recharts)
   - PDF export functionality
   - Email scheduled reports

3. **Supplier Management**

   - Add/Edit suppliers
   - Supplier contact management
   - Performance alerts

4. **Notifications**

   - Warranty expiration alerts
   - Low stock notifications
   - QC failure notifications

5. **Bulk Operations**
   - Bulk tool import (CSV/Excel)
   - Bulk procurement entry
   - Mass status updates

## 📞 Support

For issues or questions about the Procurement Officer module:

- Check API endpoints are correctly configured
- Verify user has "Procurement Officer" role
- Ensure all required packages are installed
- Check console for API errors

## 📝 Notes

- All API endpoints are currently mocked for development
- Replace mock data with actual API calls
- Ensure backend endpoints match the specifications
- Test all validation rules thoroughly
- Implement proper error handling for API failures
