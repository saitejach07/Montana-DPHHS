# Montana DPHHS Healthcare Coordination Platform

A comprehensive HIPAA-compliant healthcare coordination platform following the Montana Department of Public Health & Human Services (DPHHS) model with two distinct portals: Provider Portal and State Agent Portal.

## 🏛️ Overview

This platform implements the Montana Healthcare Programs enrollment model with proper provider type classification, complete workflows from registration through patient care to claims submission, and strict visibility rules following professional healthcare UI standards.

### Two Main Portals

- **Provider Portal**: For healthcare professionals and organizations to enroll, manage patients, and submit claims
- **State Agent Portal**: For Montana DPHHS government staff to review enrollments, process claims, and manage payments

## 🎯 Key Features

### ✅ Landing Page
- Three interactive navigation buttons
- Montana mountains landscape background
- Professional healthcare branding with Montana DPHHS identity

### ✅ Authentication & Security
- Role-based access control (Provider vs State Agent)
- Session timeout modal for HIPAA compliance
- Separate login flows for each portal type
- Mock authentication ready for Spring Boot JWT integration

### ✅ Provider Registration System
- **Owner vs Delegate** selection flow
- **Provider Type Selection**:
  - Individual Providers (Sole Proprietor, Rendering, Ordering/Referring/Prescribing)
  - Organization Providers (Group/Facility)
- Complete multi-step registration forms
- CAQH integration support for credential verification
- Delegate invitation system

### ✅ Provider Portal Features
- Professional split-screen dashboard design
- Montana Capitol building hero banner
- Patient enrollment and management
- Claims initiation and tracking
- Provider credentialing status
- Patient care coordination
- Complete patient records with PHI security

### ✅ State Agent Portal Features
- Government office professional background
- Enrollment review and approval
- Claims processing dashboard
- Payment management
- Provider oversight tools
- Comprehensive state agent functions

### ✅ Patient Management
- Complete patient records with visit history
- Clinical notes with visibility controls
- Document management
- Permission-based access
- Follow-up tracking
- Insurance verification
- PHI data badges throughout

### ✅ Claims Processing Workflow
- Provider claim initiation
- Member review workflow
- State agent processing
- Insurance submission
- Complete status tracking
- Audit trail

### ✅ Visual Enhancements
- **LoadingState Component**: Montana DPHHS branded loading states
- **EmptyState Component**: Professional empty state displays
- Authentic Montana imagery (mountains, capitol building)
- Soft blues/teals healthcare color scheme
- Responsive design throughout

### ✅ Workflow Guide
- Interactive process visualization
- Step-by-step enrollment flow
- Claims workflow documentation
- Role descriptions and responsibilities

## 🎨 Design System

### Montana DPHHS Branding
- **Primary Colors**: Soft blues (#0ea5e9) and teals (#14b8a6)
- **Government Accent**: Professional state blue
- **Typography**: Clean, professional fonts
- **Montana Imagery**: Mountains, capitol building, government office

### HIPAA Visual Elements
- 🛡️ PHI badges on sensitive information
- 🔒 Lock icons for restricted access
- ⚠️ Session timeout warnings
- 📊 Status indicators
- 🔐 Masked sensitive data

## 📱 User Flows

### Provider Registration Flow
1. Landing Page → Provider Portal
2. Login → Register → Owner vs Delegate choice
3. Provider Type Selection (Individual vs Organization)
4. Multi-step registration form
5. CAQH credential verification
6. Account creation → Login

### Delegate Invitation Flow
1. Provider sends invitation to delegate
2. Delegate receives email with unique code
3. Delegate registers using invitation code
4. Linked to provider's organization
5. Access granted to provider dashboard

### Patient Enrollment Flow
1. Provider logs in
2. Dashboard → Enroll New Patient
3. Complete patient information form
4. Assign care team members
5. Add insurance information
6. Patient appears in dashboard

### Claims Submission Flow
1. Provider selects patient
2. Initiate new claim
3. Add diagnosis and procedure codes
4. Attach clinical documentation
5. Submit to State Agent for review
6. State Agent processes → Submit to insurance
7. Track claim status

## 🔐 Access Control & Visibility Rules

### Provider Access
- ✅ Full patient records for assigned patients
- ✅ Create and edit clinical notes
- ✅ Initiate and track claims
- ✅ View credentialing status
- ✅ Manage delegates

### State Agent Access
- ✅ Review all provider enrollments
- ✅ Process claims from all providers
- ✅ Oversee patient enrollments
- ✅ Approve/deny provider applications
- ✅ Manage payment processing
- ✅ Generate reports

### PHI Protection
- Visibility badges on all sensitive data
- Role-based access controls
- Audit logging ready (backend)
- Secure data transmission ready

## 🔧 Technical Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4.0** - Styling framework
- **Vite** - Build tool and dev server
- **Shadcn UI** - Component library
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **Sonner** - Toast notifications
- **React Hook Form** - Form management

### State Management
- Local React state (useState)
- Props for component communication
- No external state library (kept simple)
- Ready for Redux/Zustand if needed

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **VS Code** - Recommended IDE

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- npm, yarn, or pnpm

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# App opens automatically at http://localhost:3000
```

### Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🧪 Testing the Application

### Mock Login Credentials
The application uses mock authentication. You can log in with **any** email and password:

**Provider Portal:**
```
Email: provider@test.com
Password: anything
```

**State Agent Portal:**
```
Email: agent@montana.gov
Password: anything
```

### Pre-loaded Mock Data
- **4 Sample Patients** with complete medical histories
- **4 Sample Providers** with credentials
- **6 Sample Claims** in various processing states
- Complete visit history and clinical notes
- Insurance information for all patients

## 📦 No Backend Required

This is a **frontend-only** application that runs entirely in the browser:
- ✅ Mock authentication
- ✅ Local state management
- ✅ No API calls needed
- ✅ No database required
- ✅ Perfect for demos and prototyping

### Data Persistence
⚠️ **Important**: All data is stored in browser memory and resets on page refresh. This is intentional for the frontend-only version.

## 🔮 Spring Boot Integration Ready

The application is structured for easy backend integration:

### What's Ready
- ✅ Clean component architecture
- ✅ TypeScript interfaces (can become DTOs)
- ✅ Service layer placeholders
- ✅ Mock data structure matches expected API format
- ✅ Authentication flow structure
- ✅ Error handling patterns

### Suggested API Endpoints
```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/delegate-invite
GET    /api/patients
POST   /api/patients
PUT    /api/patients/:id
GET    /api/claims
POST   /api/claims
PUT    /api/claims/:id
GET    /api/providers
POST   /api/providers/enroll
GET    /api/providers/credentials
POST   /api/caqh/verify
GET    /api/state-agent/enrollments
PUT    /api/state-agent/enrollments/:id/approve
GET    /api/state-agent/claims
PUT    /api/state-agent/claims/:id/process
```

## 📁 Project Structure

```
montana-dphhs-healthcare-platform/
├── components/
│   ├── auth/                    # Authentication components
│   ├── registration/            # Provider/delegate registration
│   ├── dashboards/              # Provider & State Agent dashboards
│   ├── patient/                 # Patient management
│   ├── claims/                  # Claims processing
│   ├── insurance/               # Insurance integration
│   ├── provider/                # Provider-specific features
│   ├── member/                  # Member features
│   ├── shared/                  # Shared components
│   ├── ui/                      # UI component library (51 components)
│   ├── LandingPage.tsx
│   ├── WorkflowGuidePage.tsx
│   ├── LoadingState.tsx
│   └── EmptyState.tsx
├── styles/
│   └── globals.css              # Global styles + Tailwind config
├── types/
│   └── claim.ts                 # TypeScript types
├── App.tsx                      # Main application component
├── main.tsx                     # React entry point
├── index.html                   # HTML template
└── [config files]               # package.json, tsconfig, vite, etc.
```

## 📚 Documentation

- **QUICKSTART.md** - Get running in 2 minutes (START HERE)
- **SETUP_GUIDE.md** - Detailed setup and features guide
- **FILE_INVENTORY.md** - Complete list of all files
- **DEPLOYMENT_GUIDE.md** - Multiple deployment options
- **EXPORT_SUMMARY.md** - Export overview
- **CLAIMS_WORKFLOW.md** - Detailed claims processing flow
- **IMPLEMENTATION_COMPLETE.md** - Implementation status
- **VISUAL_ENHANCEMENTS.md** - Visual components documentation

## 🎯 Complete Feature List

### Implemented Features
- ✅ Landing page with Montana branding
- ✅ Provider and State Agent login flows
- ✅ Provider registration (Owner/Delegate)
- ✅ Provider type selection (Individual/Organization)
- ✅ Delegate invitation system
- ✅ Provider dashboard with split-screen design
- ✅ State Agent dashboard with government theme
- ✅ Patient enrollment and management
- ✅ Complete patient records
- ✅ Claims initiation workflow
- ✅ Claims processing workflow
- ✅ Clinical notes with visibility controls
- ✅ Document management
- ✅ Insurance verification
- ✅ Session timeout management
- ✅ Loading and empty states
- ✅ Workflow guide with visualization
- ✅ Responsive design
- ✅ PHI security indicators
- ✅ Professional healthcare UI

## ⚠️ Important Disclaimers

### Security & Compliance
1. **Not Production-Ready for PHI**: This is a UI/UX prototype
2. **Mock Authentication**: Real production needs JWT, OAuth, MFA
3. **No Encryption**: Production requires encryption at rest and in transit
4. **No Audit Logs**: Production needs comprehensive audit logging
5. **HIPAA Compliance**: Requires BAA, security audits, technical safeguards

### Data
1. **All patient data is fictional** - No real PHI
2. **Mock insurance information** - For demonstration only
3. **Data resets on refresh** - No persistence in frontend-only version

### Usage
⚠️ **Figma Make is not meant for collecting PII or securing sensitive data**

This is a demonstration and prototyping tool. For production use with real PHI:
- Implement proper backend with Spring Boot
- Add database with encryption
- Implement real authentication and authorization
- Add comprehensive audit logging
- Follow HIPAA technical safeguards
- Obtain proper security certifications
- Implement data backup and recovery
- Add intrusion detection
- Regular security audits

## 🚧 Production Checklist

Before using with real PHI data:

- [ ] Spring Boot backend implementation
- [ ] PostgreSQL with encrypted fields
- [ ] JWT authentication with refresh tokens
- [ ] Multi-factor authentication (MFA)
- [ ] Role-based access control (RBAC)
- [ ] CAQH API integration
- [ ] Audit logging system
- [ ] Data encryption at rest
- [ ] TLS/SSL for data in transit
- [ ] Secure file storage (HIPAA-compliant)
- [ ] Business Associate Agreement (BAA)
- [ ] Regular security audits
- [ ] Penetration testing
- [ ] Disaster recovery plan
- [ ] Data backup strategy
- [ ] Compliance documentation
- [ ] Staff training on HIPAA
- [ ] Incident response plan

## 📈 Performance

### Bundle Sizes (approximate)
- Development: ~2.5 MB (unminified with source maps)
- Production: ~350 KB (minified + gzipped)

### Optimizations
- ✅ Code splitting (automatic with Vite)
- ✅ Tree shaking
- ✅ Asset minification
- ✅ CSS purging with Tailwind
- ✅ Lazy loading ready

## 🌐 Deployment Options

See **DEPLOYMENT_GUIDE.md** for detailed instructions:

1. **Vercel** (Recommended) - Zero-config, automatic HTTPS
2. **Netlify** - Easy deployment with continuous integration
3. **AWS S3 + CloudFront** - Production-ready with HIPAA options
4. **Docker** - Containerized deployment
5. **GitHub Pages** - Free static hosting
6. **Custom Server** - Full control

## 🤝 Contributing

This is a proprietary healthcare platform for Montana DPHHS.

## 📄 License

Copyright © 2025 Montana DPHHS. All rights reserved.

---

## 📞 Support & Questions

For setup issues, see:
1. **QUICKSTART.md** - Common issues
2. **SETUP_GUIDE.md** - Troubleshooting section
3. **DEPLOYMENT_GUIDE.md** - Deployment issues

---

**Montana DPHHS Healthcare Coordination Platform v1.0**

Built with React 18, TypeScript, Tailwind CSS v4.0, and Vite

**Last Updated**: November 27, 2025
