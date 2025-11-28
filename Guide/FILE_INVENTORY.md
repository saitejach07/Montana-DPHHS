# Montana DPHHS Platform - Complete File Inventory

## 🗂️ All Project Files

### Configuration Files (Root Level)
- ✅ `package.json` - Dependencies and npm scripts
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tsconfig.node.json` - TypeScript config for Vite
- ✅ `vite.config.ts` - Vite bundler configuration
- ✅ `.eslintrc.cjs` - ESLint linting rules
- ✅ `.prettierrc` - Prettier formatting rules
- ✅ `.gitignore` - Git ignore patterns
- ✅ `index.html` - HTML entry point
- ✅ `main.tsx` - React application entry point
- ✅ `App.tsx` - Main application component with routing

### VS Code Settings
- ✅ `.vscode/extensions.json` - Recommended extensions
- ✅ `.vscode/settings.json` - Workspace settings

### Documentation
- ✅ `README.md` - Main project readme
- ✅ `SETUP_GUIDE.md` - VS Code setup instructions
- ✅ `FILE_INVENTORY.md` - This file
- ✅ `CLAIMS_WORKFLOW.md` - Claims processing documentation
- ✅ `IMPLEMENTATION_COMPLETE.md` - Implementation status
- ✅ `VISUAL_ENHANCEMENTS.md` - Visual components docs
- ✅ `Attributions.md` - Image attributions
- ✅ `guidelines/Guidelines.md` - Development guidelines

### Styles
- ✅ `styles/globals.css` - Global CSS with Tailwind v4 config

### Type Definitions
- ✅ `types/claim.ts` - Claim-related TypeScript types

---

## 📦 Components Directory

### Landing & Workflow
- ✅ `components/LandingPage.tsx` - Main landing page with 3 buttons
- ✅ `components/WorkflowGuidePage.tsx` - Interactive workflow guide
- ✅ `components/LoadingState.tsx` - Montana DPHHS branded loading
- ✅ `components/EmptyState.tsx` - Professional empty states

### Authentication (`components/auth/`)
- ✅ `components/auth/Login.tsx` - Login component
- ✅ `components/auth/LoginScreen.tsx` - Login screen wrapper
- ✅ `components/auth/SessionTimeoutModal.tsx` - Session timeout dialog

### Registration (`components/registration/`)
- ✅ `components/registration/RegistrationChoice.tsx` - Owner vs Delegate choice
- ✅ `components/registration/ProviderTypeSelection.tsx` - Individual vs Organization
- ✅ `components/registration/DelegateRegistration.tsx` - Delegate registration form
- ✅ `components/registration/ProviderRegistration.tsx` - Provider registration form

### Dashboards (`components/dashboards/`)
- ✅ `components/dashboards/ProviderDashboard.tsx` - Provider portal dashboard
- ✅ `components/dashboards/StateAgentDashboard.tsx` - State agent dashboard
- ✅ `components/dashboards/AdministratorDashboard.tsx` - Admin dashboard
- ✅ `components/dashboards/MemberDashboard_new.tsx` - Member dashboard

### Patient Management (`components/patient/`)
- ✅ `components/patient/PatientRecord.tsx` - Complete patient record view

### Provider Components (`components/provider/`)
- ✅ `components/provider/ProviderPatientProfile.tsx` - Provider's patient view

### Member/Patient Components (`components/member/`)
- ✅ `components/member/PatientEditModal.tsx` - Patient editing modal
- ✅ `components/member/MemberClaimProcessing.tsx` - Member claim processing
- ✅ `components/member/MemberClaimReview.tsx` - Member claim review

### Claims/Insurance (`components/insurance/` & `components/claims/`)
- ✅ `components/insurance/ClaimDetailPage.tsx` - Detailed claim view
- ✅ `components/insurance/ClaimHistoryPage.tsx` - Claims history page
- ✅ `components/claims/ClaimInitiationModal.tsx` - Start new claim
- ✅ `components/claims/ClaimSubmissionModal.tsx` - Submit claim to insurance

### Shared Components (`components/shared/`)
- ✅ `components/shared/PatientStatusBadge.tsx` - Patient status badges

### Protected System Component (`components/figma/`)
- 🔒 `components/figma/ImageWithFallback.tsx` - **PROTECTED** (Do not modify)

---

## 🎨 UI Component Library (`components/ui/`)

### Form Components
- ✅ `components/ui/input.tsx` - Text input
- ✅ `components/ui/textarea.tsx` - Multi-line text input
- ✅ `components/ui/checkbox.tsx` - Checkbox
- ✅ `components/ui/radio-group.tsx` - Radio buttons
- ✅ `components/ui/switch.tsx` - Toggle switch
- ✅ `components/ui/select.tsx` - Dropdown select
- ✅ `components/ui/calendar.tsx` - Date picker calendar
- ✅ `components/ui/form.tsx` - Form wrapper
- ✅ `components/ui/label.tsx` - Form labels
- ✅ `components/ui/input-otp.tsx` - OTP input

### Layout Components
- ✅ `components/ui/card.tsx` - Card container
- ✅ `components/ui/separator.tsx` - Divider line
- ✅ `components/ui/accordion.tsx` - Expandable sections
- ✅ `components/ui/tabs.tsx` - Tabbed interface
- ✅ `components/ui/collapsible.tsx` - Collapsible content
- ✅ `components/ui/scroll-area.tsx` - Scrollable container
- ✅ `components/ui/resizable.tsx` - Resizable panels
- ✅ `components/ui/sidebar.tsx` - Sidebar navigation
- ✅ `components/ui/aspect-ratio.tsx` - Aspect ratio wrapper

### Navigation Components
- ✅ `components/ui/breadcrumb.tsx` - Breadcrumb navigation
- ✅ `components/ui/pagination.tsx` - Pagination controls
- ✅ `components/ui/navigation-menu.tsx` - Navigation menu
- ✅ `components/ui/menubar.tsx` - Menu bar

### Overlay Components
- ✅ `components/ui/dialog.tsx` - Modal dialog
- ✅ `components/ui/alert-dialog.tsx` - Alert dialog
- ✅ `components/ui/sheet.tsx` - Slide-out sheet
- ✅ `components/ui/drawer.tsx` - Drawer component
- ✅ `components/ui/popover.tsx` - Popover tooltip
- ✅ `components/ui/tooltip.tsx` - Tooltip
- ✅ `components/ui/hover-card.tsx` - Hover card
- ✅ `components/ui/context-menu.tsx` - Right-click menu
- ✅ `components/ui/dropdown-menu.tsx` - Dropdown menu
- ✅ `components/ui/command.tsx` - Command palette

### Display Components
- ✅ `components/ui/badge.tsx` - Badge/chip
- ✅ `components/ui/avatar.tsx` - User avatar
- ✅ `components/ui/alert.tsx` - Alert message
- ✅ `components/ui/table.tsx` - Data table
- ✅ `components/ui/progress.tsx` - Progress bar
- ✅ `components/ui/skeleton.tsx` - Loading skeleton
- ✅ `components/ui/chart.tsx` - Chart wrapper
- ✅ `components/ui/carousel.tsx` - Carousel/slider

### Interactive Components
- ✅ `components/ui/button.tsx` - Button
- ✅ `components/ui/toggle.tsx` - Toggle button
- ✅ `components/ui/toggle-group.tsx` - Toggle button group
- ✅ `components/ui/slider.tsx` - Range slider
- ✅ `components/ui/sonner.tsx` - Toast notifications

### Utilities
- ✅ `components/ui/use-mobile.ts` - Mobile detection hook
- ✅ `components/ui/utils.ts` - Utility functions (cn, etc.)

---

## 📊 File Count Summary

### By Category
- **Configuration**: 11 files
- **Documentation**: 8 files
- **Main Application**: 3 files (App.tsx, main.tsx, index.html)
- **Styles**: 1 file
- **Types**: 1 file
- **Feature Components**: 23 files
- **UI Components**: 51 files

### Total Files: ~98 files

---

## 🚀 Key Entry Points

1. **Start Here**: `index.html` → `main.tsx` → `App.tsx`
2. **Landing Page**: `components/LandingPage.tsx`
3. **Provider Portal**: `components/dashboards/ProviderDashboard.tsx`
4. **State Agent Portal**: `components/dashboards/StateAgentDashboard.tsx`
5. **Styles**: `styles/globals.css`

---

## 🔄 State Management

All state is managed in `App.tsx` with local React state:
- `currentUser` - Logged in user
- `patients` - Patient records
- `providers` - Provider list
- `claims` - Claims data
- `currentView` - Current page view

---

## 🎯 Mock Data Sources

Mock data is defined in `App.tsx`:
- `initialPatients` (lines 60-253) - 4 sample patients
- `initialProviders` (lines 255-300) - 4 sample providers
- `initialClaims` (lines 302-381) - 6 sample claims

---

## 🛠️ No Backend Required

This project runs entirely in the browser with:
- ✅ Mock authentication
- ✅ Local state management
- ✅ No API calls
- ✅ No database
- ✅ Ready for Spring Boot integration

---

Last Updated: 2025-11-27
Version: 1.0.0
