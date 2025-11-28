# 🛠️ Technology Stack Documentation

**Montana DPHHS Healthcare Coordination Platform**

Last Updated: November 28, 2025

---

## 📋 Table of Contents

1. [Frontend Technologies](#frontend-technologies)
2. [Build Tools & Development](#build-tools--development)
3. [UI Components & Libraries](#ui-components--libraries)
4. [State Management](#state-management)
5. [Backend Integration (Spring Boot Ready)](#backend-integration-spring-boot-ready)
6. [TypeScript & Type Safety](#typescript--type-safety)
7. [Styling & Design](#styling--design)
8. [Authentication & Security](#authentication--security)
9. [Version Details](#version-details)
10. [Third-Party Integrations](#third-party-integrations)

---

## 🎯 Frontend Technologies

### Core Framework

#### **React 19.2.0**
- **Purpose**: UI library for building component-based user interfaces
- **Why**: Industry standard, excellent ecosystem, strong TypeScript support
- **Features Used**:
  - Functional components with hooks
  - useState for local state management
  - useEffect for side effects
  - Custom hooks for reusable logic
  - Context API for global state (session management)

#### **TypeScript 5.9.3**
- **Purpose**: Type-safe JavaScript superset
- **Why**: Enhanced developer experience, catches errors at compile time, better IDE support
- **Configuration**: Strict mode enabled
- **Features**:
  - Interface definitions for all data models
  - Type-safe props and state
  - Generic types for reusable components
  - Enum types for status values
  - Type guards for runtime safety

---

## 🔧 Build Tools & Development

### **Vite 7.2.4**
- **Purpose**: Next-generation frontend build tool
- **Why**: Lightning-fast HMR, optimal build performance, ES modules support
- **Features**:
  - Hot Module Replacement (HMR)
  - Optimized production builds
  - Code splitting
  - Asset optimization
  - TypeScript support out of the box
  - React Fast Refresh

### **Development Server**
- **Port**: 3000 (configurable)
- **HMR**: Enabled for instant updates
- **HTTPS**: Ready for production (Vite preview)

### **ESLint 9.39.1**
- **Purpose**: Code quality and consistency
- **Plugins**:
  - `@eslint/js`: Core ESLint rules
  - `eslint-plugin-react-hooks`: React hooks linting
  - `eslint-plugin-react-refresh`: React Fast Refresh support
  - `typescript-eslint`: TypeScript-specific rules

### **Node.js Requirements**
- **Minimum Version**: Node.js 18.x
- **Recommended**: Node.js 20.x or higher
- **Package Manager**: npm (yarn and pnpm compatible)

---

## 🎨 UI Components & Libraries

### **Radix UI (Headless Components)**
Comprehensive set of accessible, unstyled components:

- `@radix-ui/react-accordion` ^1.2.2
- `@radix-ui/react-alert-dialog` ^1.1.4
- `@radix-ui/react-avatar` ^1.1.2
- `@radix-ui/react-checkbox` ^1.1.3
- `@radix-ui/react-dialog` ^1.1.4
- `@radix-ui/react-dropdown-menu` ^2.1.4
- `@radix-ui/react-label` ^2.1.1
- `@radix-ui/react-popover` ^1.1.4
- `@radix-ui/react-radio-group` ^1.2.2
- `@radix-ui/react-scroll-area` ^1.2.2
- `@radix-ui/react-select` ^2.1.4
- `@radix-ui/react-tabs` ^1.1.2
- `@radix-ui/react-tooltip` ^1.1.6
- And 15+ more Radix UI primitives

**Why Radix UI**: 
- WAI-ARIA compliant (accessibility)
- Unstyled (full design control)
- Keyboard navigation
- Focus management
- Screen reader support

### **Shadcn/ui Components**
Custom-built UI component library (51+ components in `/components/ui/`):

- **Forms**: Button, Input, Label, Select, Checkbox, Radio Group, Switch, Textarea
- **Layout**: Card, Separator, Tabs, Accordion, Collapsible
- **Overlays**: Dialog, Popover, Tooltip, Alert Dialog, Drawer
- **Feedback**: Alert, Toast (Sonner), Badge, Progress
- **Navigation**: Breadcrumb, Navigation Menu, Menubar, Command
- **Data Display**: Table, Avatar, Calendar, Charts
- **Advanced**: Carousel, Resizable Panels, Context Menu

### **Icon Library**

#### **Lucide React 0.468.0**
- **Purpose**: Modern, consistent icon set
- **Icons Used**: 50+ icons throughout the application
- **Features**: Tree-shakeable, TypeScript support, customizable size/color
- **Common Icons**:
  - UserCheck, Building2, FileText, Shield, Lock
  - Calendar, Clock, DollarSign, AlertTriangle
  - CheckCircle, XCircle, ArrowRight, Eye, EyeOff

### **Data Visualization**

#### **Recharts 2.15.0**
- **Purpose**: Composable charting library
- **Charts Used**:
  - Bar charts for claims statistics
  - Line charts for patient trends
  - Pie charts for status distributions
- **Features**: Responsive, customizable, TypeScript support

### **Form Management**

#### **React Hook Form 7.55.0**
- **Purpose**: Performant form validation and management
- **Why**: Minimal re-renders, easy validation, TypeScript support
- **Features**:
  - Controlled and uncontrolled inputs
  - Built-in validation rules
  - Custom validation functions
  - Error handling
  - Form state management

### **Date Management**

#### **date-fns 4.1.0**
- **Purpose**: Modern date utility library
- **Why**: Lightweight, functional, tree-shakeable
- **Usage**: Date formatting, parsing, calculations

#### **React Day Picker 9.4.4**
- **Purpose**: Flexible date picker component
- **Features**: Range selection, disabled dates, custom styling

### **Additional UI Libraries**

#### **cmdk 1.0.4**
- **Purpose**: Command menu component (Command+K)
- **Usage**: Quick navigation and search

#### **Vaul 1.1.1**
- **Purpose**: Drawer component for mobile
- **Usage**: Bottom sheets and slide-in panels

#### **Embla Carousel 8.5.2**
- **Purpose**: Lightweight carousel library
- **Usage**: Image galleries, content sliders

#### **Input OTP 1.4.1**
- **Purpose**: One-time password input component
- **Usage**: Two-factor authentication (future feature)

---

## 🎨 Styling & Design

### **Tailwind CSS 3.4.17** (v4.0 approach)
- **Purpose**: Utility-first CSS framework
- **Configuration**: `/styles/globals.css`
- **Features**:
  - Custom design tokens
  - Montana DPHHS color palette
  - Typography system
  - Responsive breakpoints
  - Dark mode ready (not implemented)

### **Tailwind Plugins**

#### **tailwindcss-animate 1.0.7**
- **Purpose**: Animation utilities
- **Animations**: Fade, slide, scale, spin

#### **Autoprefixer 10.4.20**
- **Purpose**: Automatic CSS vendor prefixing
- **Why**: Cross-browser compatibility

#### **PostCSS 8.4.49**
- **Purpose**: CSS processing
- **Usage**: Tailwind CSS transformation

### **Styling Utilities**

#### **clsx 2.1.1**
- **Purpose**: Conditional className construction
- **Usage**: Dynamic class application

#### **tailwind-merge 2.6.0**
- **Purpose**: Merge Tailwind classes intelligently
- **Why**: Prevents class conflicts in component composition

#### **class-variance-authority 0.7.1**
- **Purpose**: Type-safe component variants
- **Usage**: Button variants, card styles, badge types

### **Design System**

#### Montana DPHHS Color Palette
```css
/* Primary Colors */
--teal-600: #14b8a6;     /* Provider portal primary */
--teal-700: #0d9488;     /* Provider hover states */
--blue-600: #2563eb;     /* State agent primary */
--blue-700: #1d4ed8;     /* State agent hover states */

/* Neutral Colors */
--slate-900: #0f172a;    /* Primary text */
--slate-600: #475569;    /* Secondary text */
--slate-200: #e2e8f0;    /* Borders */
--slate-50: #f8fafc;     /* Backgrounds */

/* Status Colors */
--green-600: #16a34a;    /* Success/Approved */
--yellow-600: #ca8a04;   /* Warning/Pending */
--red-600: #dc2626;      /* Error/Denied */
```

#### Typography
- **Font Family**: System fonts (optimized for performance)
- **Font Sizes**: Defined in globals.css (not using Tailwind size classes)
- **Font Weights**: Defined in globals.css (not using Tailwind weight classes)
- **Line Heights**: Defined in globals.css (optimized for readability)

---

## 🔐 Authentication & Security

### Current Implementation (Frontend Only)

#### **Session Management**
- Local React state
- Mock authentication
- Session timeout modal (15 minutes)
- Role-based UI rendering

#### **Security Features**
- PHI data badges (visual indicators)
- Role-based component visibility
- Masked sensitive data display
- Secure form handling

### Spring Boot Integration Ready

#### **JWT Authentication Flow**
```typescript
// Planned structure
interface AuthService {
  login(email: string, password: string): Promise<AuthResponse>;
  refresh(refreshToken: string): Promise<AuthResponse>;
  logout(): Promise<void>;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}
```

#### **Token Storage**
- Access tokens: Memory only (not localStorage)
- Refresh tokens: HttpOnly cookies
- CSRF protection: Required for Spring Boot

---

## 📦 State Management

### **Current Approach: Local State**

#### React State Management
- `useState` for component-level state
- Props drilling for data passing
- Callback props for child-to-parent communication
- Context API for global state (session)

#### Why No Redux/Zustand Yet?
- Application complexity doesn't require it
- Local state performs well
- Easy to add later if needed

### **State Structure**

```typescript
// App.tsx state
const [currentView, setCurrentView] = useState<ViewType>('landing');
const [user, setUser] = useState<User | null>(null);
const [patients, setPatients] = useState<PatientData[]>(mockPatients);
const [claims, setClaims] = useState<Claim[]>(mockClaims);
const [providers, setProviders] = useState<Provider[]>(mockProviders);
```

### **Future State Management** (When Needed)

Recommended for Spring Boot integration:

#### **Option 1: Zustand** (Recommended)
- Lightweight (1KB)
- Simple API
- TypeScript support
- No boilerplate

#### **Option 2: Redux Toolkit**
- Industry standard
- DevTools
- Middleware support
- Complex state management

---

## 🔌 Backend Integration (Spring Boot Ready)

### **Architecture Design**

#### Service Layer Structure
```typescript
// Planned service layer
/src/services/
├── authService.ts        // Authentication API
├── patientService.ts     // Patient CRUD operations
├── claimService.ts       // Claims management
├── providerService.ts    // Provider operations
├── caqhService.ts        // CAQH integration
└── api.ts               // Axios instance configuration
```

#### API Configuration
```typescript
// Planned axios setup
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for JWT tokens
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### **TypeScript Interfaces → Spring Boot DTOs**

Current TypeScript interfaces are designed to match Spring Boot DTOs:

```typescript
// Frontend Interface (types/claim.ts)
export interface Claim {
  id: string;
  patientId: string;
  patientName: string;
  provider: string;
  status: ClaimStatus;
  dateCreated: string;
  totalAmount: number;
  diagnosisCodes: string[];
  procedureCodes: string[];
}

// Corresponding Spring Boot DTO
public class ClaimDTO {
    private String id;
    private String patientId;
    private String patientName;
    private String provider;
    private ClaimStatus status;
    private LocalDateTime dateCreated;
    private BigDecimal totalAmount;
    private List<String> diagnosisCodes;
    private List<String> procedureCodes;
}
```

### **API Endpoints Specification**

Complete API documentation needed (see API_DOCUMENTATION.md)

```
Authentication
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/refresh
POST   /api/auth/logout

Provider Management
GET    /api/providers
POST   /api/providers/enroll
PUT    /api/providers/{id}
GET    /api/providers/{id}/credentials
POST   /api/providers/delegate-invite

Patient Management
GET    /api/patients
POST   /api/patients
PUT    /api/patients/{id}
GET    /api/patients/{id}
DELETE /api/patients/{id}

Claims Processing
GET    /api/claims
POST   /api/claims
PUT    /api/claims/{id}
GET    /api/claims/{id}
POST   /api/claims/{id}/submit

State Agent Operations
GET    /api/state-agent/enrollments
PUT    /api/state-agent/enrollments/{id}/approve
GET    /api/state-agent/claims
PUT    /api/state-agent/claims/{id}/process
POST   /api/state-agent/claims/{id}/approve
POST   /api/state-agent/claims/{id}/deny

CAQH Integration
POST   /api/caqh/verify
GET    /api/caqh/status/{providerId}
POST   /api/caqh/refresh
```

---

## 📚 Third-Party Integrations

### **Planned: CAQH ProView®**
- **Purpose**: Provider credentialing verification
- **API**: REST API integration
- **Data**: Provider demographics, licenses, certifications
- **Status**: Mock implementation ready

### **Planned: Insurance APIs**
- **Purpose**: Claim submission and eligibility verification
- **Standards**: EDI 837, 270/271 transactions
- **Status**: Interface design complete

---

## 🧪 Testing (Not Implemented Yet)

### **Recommended Testing Stack**

#### Unit Testing
- **Vitest** - Vite-native test runner
- **React Testing Library** - Component testing
- **Jest DOM** - Custom matchers

#### E2E Testing
- **Playwright** - End-to-end testing
- **Cypress** - Alternative E2E option

#### Type Checking
- **TypeScript Compiler** - Static type checking
- **tsc --noEmit** - Type check without build

---

## 📊 Performance Optimization

### **Bundle Size**
- Production build: ~350KB (minified + gzipped)
- Code splitting: Automatic with Vite
- Tree shaking: Enabled

### **Optimizations Implemented**
- ✅ Vite's automatic code splitting
- ��� Tailwind CSS purging
- ✅ Asset optimization
- ✅ React.lazy ready for route-based splitting
- ✅ Lucide icons tree-shakeable

### **Performance Monitoring** (To Add)
- Lighthouse CI
- Web Vitals tracking
- Bundle analyzer

---

## 🗂️ Project Dependencies Summary

### **Production Dependencies (24 packages)**

| Package | Version | Category |
|---------|---------|----------|
| react | ^19.2.0 | Core |
| react-dom | ^19.2.0 | Core |
| @radix-ui/* | Various | UI Primitives |
| lucide-react | ^0.468.0 | Icons |
| recharts | ^2.15.0 | Charts |
| react-hook-form | ^7.55.0 | Forms |
| date-fns | ^4.1.0 | Dates |
| sonner | ^1.7.1 | Notifications |
| clsx | ^2.1.1 | Utilities |
| tailwind-merge | ^2.6.0 | Utilities |

### **Development Dependencies (12 packages)**

| Package | Version | Category |
|---------|---------|----------|
| vite | ^7.2.4 | Build Tool |
| typescript | ~5.9.3 | Type Safety |
| @vitejs/plugin-react | ^5.1.1 | React Support |
| eslint | ^9.39.1 | Linting |
| tailwindcss | ^3.4.17 | Styling |
| postcss | ^8.4.49 | CSS Processing |
| autoprefixer | ^10.4.20 | CSS Prefixing |

---

## 🔄 Migration Path

### **From Frontend-Only to Full Stack**

#### Phase 1: Setup Spring Boot Backend
1. Create Spring Boot project (Java 17+)
2. Add dependencies: Spring Security, JPA, PostgreSQL
3. Configure JWT authentication
4. Create entity models matching TypeScript interfaces

#### Phase 2: API Implementation
1. Implement authentication endpoints
2. Create REST controllers
3. Add service layer
4. Implement repository layer

#### Phase 3: Frontend Integration
1. Create API service layer in React
2. Replace mock data with API calls
3. Add error handling
4. Implement loading states

#### Phase 4: Security & Compliance
1. Add audit logging
2. Implement encryption
3. HIPAA compliance review
4. Security testing

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Nov 28, 2025 | Initial release - Frontend complete |
| | | React 19.2.0, Vite 7.2.4, TypeScript 5.9.3 |

---

## 🚀 Next Steps

1. **Backend Development**: Start Spring Boot implementation
2. **API Documentation**: Complete REST API specification
3. **Testing**: Add Vitest + React Testing Library
4. **CI/CD**: Setup GitHub Actions
5. **CAQH Integration**: Implement real API calls
6. **Security Audit**: Third-party security review

---

**Technology Stack Owner**: Montana DPHHS Development Team  
**Documentation Maintained**: November 28, 2025  
**Status**: ✅ Frontend Complete | 🚧 Backend In Planning
