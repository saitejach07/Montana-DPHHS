# Montana DPHHS Healthcare Platform - VS Code Setup Guide

## 📋 Overview

This is a comprehensive HIPAA-compliant healthcare coordination platform with two distinct portals:
- **Provider Portal**: For healthcare professionals and organizations
- **State Agent Portal**: For Montana DPHHS government staff

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** or **pnpm**
- **VS Code** - [Download here](https://code.visualstudio.com/)

### Installation Steps

1. **Open the project in VS Code**
   ```bash
   cd montana-dphhs-healthcare-platform
   code .
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   - The app should automatically open at `http://localhost:3000`
   - If not, manually navigate to that URL

## 📁 Project Structure

```
montana-dphhs-healthcare-platform/
├── components/
│   ├── auth/                    # Authentication components
│   │   ├── Login.tsx
│   │   ├── LoginScreen.tsx
│   │   └── SessionTimeoutModal.tsx
│   ├── claims/                  # Claims processing components
│   │   ├── ClaimInitiationModal.tsx
│   │   └── ClaimSubmissionModal.tsx
│   ├── dashboards/              # Dashboard components
│   │   ├── ProviderDashboard.tsx
│   │   └── StateAgentDashboard.tsx
│   ├── registration/            # Registration flow components
│   │   ├── DelegateRegistration.tsx
│   │   ├── ProviderRegistration.tsx
│   │   ├── ProviderTypeSelection.tsx
│   │   └── RegistrationChoice.tsx
│   ├── patient/                 # Patient management components
│   ├── member/                  # Member-specific components
│   ├── insurance/               # Insurance/claims components
│   ├── ui/                      # Reusable UI components
│   ├── shared/                  # Shared components
│   ├── LandingPage.tsx
│   ├── WorkflowGuidePage.tsx
│   ├── LoadingState.tsx
│   └── EmptyState.tsx
├── styles/
│   └── globals.css              # Global styles and Tailwind config
├── types/
│   └── claim.ts                 # TypeScript type definitions
├── App.tsx                      # Main application component
├── main.tsx                     # Application entry point
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # Project documentation
```

## 🎨 Features Implemented

### ✅ Landing Page
- Three interactive buttons for navigation
- Montana mountains landscape background
- Professional healthcare branding

### ✅ Authentication System
- Separate login flows for Provider and State Agent portals
- Session timeout modal
- Role-based access control

### ✅ Registration Flows
- **Provider Registration**: Owner vs Delegate selection
- **Provider Type Selection**: Individual vs Organization providers
- **Delegate Registration**: Complete invitation system
- CAQH integration support

### ✅ Provider Portal
- Professional split-screen dashboard design
- Patient management and enrollment
- Claims initiation and tracking
- Provider credentialing status
- Montana Capitol building banner

### ✅ State Agent Portal
- Government office professional background
- Enrollment review and approval
- Claims processing and payment management
- Comprehensive oversight tools

### ✅ Patient Management
- Complete patient records
- PHI data with security badges
- Visit history and documentation
- Provider notes with visibility controls
- Patient status tracking

### ✅ Claims Processing
- Claim initiation by providers
- Member review workflow
- State agent processing
- Insurance submission
- Complete audit trail

### ✅ Visual Enhancements
- **LoadingState Component**: Montana DPHHS branded loading states
- **EmptyState Component**: Professional empty state displays
- Authentic Montana imagery throughout
- Consistent healthcare UI standards (soft blues/teals)

### ✅ Workflow Guide
- Interactive process visualization
- Step-by-step enrollment flow
- Claims workflow documentation
- User role descriptions

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### VS Code Extensions

The project recommends these VS Code extensions (auto-prompted on first open):
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **ES7+ React/Redux/React-Native snippets** - React snippets

## 🎯 Testing the Application

### Mock Login Credentials

The application uses mock authentication. You can log in with any email:

**Provider Portal:**
- Email: Any email (e.g., `provider@test.com`)
- Password: Any password

**State Agent Portal:**
- Email: Any email (e.g., `agent@test.com`)
- Password: Any password

### Navigation Flow

1. **Landing Page** → Choose portal type
2. **Login** → Access dashboard
3. **Dashboard** → View patients/claims
4. **Patient Records** → Full patient details
5. **Claims** → Process and submit claims

## 📦 Mock Data

The application includes comprehensive mock data:
- 4 sample patients with complete records
- 4 sample providers
- 6 sample claims in various states
- Complete patient visit history
- Sample documents and notes

## 🔐 No Backend Required

This is a **frontend-only** application with:
- ✅ Mock data for demonstration
- ✅ Local state management
- ✅ No API calls required
- ✅ Ready for Spring Boot backend integration

## 🚧 Future Backend Integration

The application is designed to be Spring Boot-ready:
- Clean separation of concerns
- TypeScript interfaces for DTOs
- Service layer placeholders
- Mock data can be easily replaced with API calls

### Planned Backend Structure

```
Future API Endpoints:
- POST /api/auth/login
- POST /api/auth/register
- GET /api/patients
- POST /api/patients
- GET /api/claims
- POST /api/claims
- GET /api/providers
- POST /api/providers/enroll
```

## 🎨 Styling

### Tailwind CSS v4.0
- Custom color scheme for healthcare
- Montana DPHHS branding colors
- Responsive design throughout
- Accessible components

### Design System
- **Primary Colors**: Soft blues and teals
- **Typography**: Clean, professional fonts
- **Components**: Shadcn UI component library
- **Icons**: Lucide React icons

## 📝 Important Notes

### HIPAA Compliance Considerations
⚠️ **Note**: This is a demonstration application. For production use:
- Implement proper encryption
- Add audit logging
- Secure PHI data transmission
- Follow HIPAA technical safeguards
- Implement proper access controls

### Mock Data Warning
- All patient data is fictional
- No real PHI is stored
- For demonstration purposes only

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Edit vite.config.ts and change the port number
server: {
  port: 3001, // Change this
}
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf dist
npm run build
```

## 📚 Additional Documentation

- `README.md` - Main project documentation
- `CLAIMS_WORKFLOW.md` - Detailed claims process
- `IMPLEMENTATION_COMPLETE.md` - Feature completion status
- `VISUAL_ENHANCEMENTS.md` - Visual component documentation
- `guidelines/Guidelines.md` - Development guidelines

## 🤝 Contributing

This is a proprietary healthcare platform for Montana DPHHS. For questions or support, contact the development team.

## 📄 License

Copyright © 2025 Montana DPHHS. All rights reserved.

---

**Built with:**
- React 18
- TypeScript
- Tailwind CSS v4.0
- Vite
- Shadcn UI Components
- Lucide Icons
- Recharts for data visualization

**Montana DPHHS Healthcare Coordination Platform v1.0**
