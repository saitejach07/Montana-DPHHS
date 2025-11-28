# 🚀 Montana DPHHS Platform - Quick Start

## ⚡ Get Running in 2 Minutes

### 1️⃣ Install Node.js
Download and install from: https://nodejs.org/ (v18 or higher)

### 2️⃣ Open Terminal in Project Folder
```bash
cd montana-dphhs-healthcare-platform
```

### 3️⃣ Install Dependencies
```bash
npm install
```
⏱️ This takes about 1-2 minutes

### 4️⃣ Start the Application
```bash
npm run dev
```
✅ App opens automatically at http://localhost:3000

---

## 🎯 First Time Using VS Code?

### Install VS Code
1. Download: https://code.visualstudio.com/
2. Install it
3. Open the project folder: `File` → `Open Folder` → Select project folder

### Recommended Extensions
VS Code will prompt you to install recommended extensions:
- **ESLint** - Shows code errors
- **Prettier** - Formats code automatically
- **Tailwind CSS IntelliSense** - Helps with styling
- **ES7+ React Snippets** - Makes coding faster

Click **"Install All"** when prompted!

---

## 🧪 Testing the Application

### Login Credentials (Mock)
You can use **ANY** email and password to login:

**Examples:**
- Email: `provider@test.com`, Password: `test123`
- Email: `agent@montana.gov`, Password: `password`

### Navigation Flow
```
Landing Page
    ↓
Choose Portal → Provider Portal OR State Agent Portal
    ↓
Login → Enter any email/password
    ↓
Dashboard → View patients, claims, enrollments
    ↓
Patient Records → Full patient details
    ↓
Claims → Create and process claims
```

### Pre-loaded Mock Data
The app includes:
- ✅ 4 sample patients
- ✅ 4 sample providers  
- ✅ 6 sample claims
- ✅ Complete patient history
- ✅ Mock insurance data

---

## 📁 Important Files to Know

### Main Application
- **`App.tsx`** - Main app with all routing logic
- **`main.tsx`** - Entry point
- **`index.html`** - HTML template

### Configuration
- **`package.json`** - Dependencies and scripts
- **`vite.config.ts`** - Build tool settings
- **`tsconfig.json`** - TypeScript settings

### Key Components
- **`components/LandingPage.tsx`** - First page users see
- **`components/dashboards/ProviderDashboard.tsx`** - Provider portal
- **`components/dashboards/StateAgentDashboard.tsx`** - State agent portal
- **`components/auth/Login.tsx`** - Login page

### Styling
- **`styles/globals.css`** - All global styles and colors

---

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for code errors
npm run lint

# Stop the server
# Press: Ctrl + C (or Cmd + C on Mac)
```

---

## 🎨 Making Changes

### Change Colors
Edit `styles/globals.css` - Look for the `:root` section with color variables

### Add a New Page
1. Create file in `components/`: `MyPage.tsx`
2. Import in `App.tsx`
3. Add to routing logic

### Modify Dashboard
Edit files in `components/dashboards/`

### Change Mock Data
Edit `App.tsx` - Search for `initialPatients`, `initialProviders`, `initialClaims`

---

## ❓ Troubleshooting

### Problem: Port 3000 already in use
**Solution:** 
Edit `vite.config.ts`, change port to `3001` or `3002`

### Problem: Module not found
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: TypeScript errors in VS Code
**Solution:**
- Press `Cmd/Ctrl + Shift + P`
- Type "TypeScript: Restart TS Server"
- Press Enter

### Problem: Code not updating
**Solution:**
- Save the file (`Cmd/Ctrl + S`)
- If still not working, stop server (`Ctrl+C`) and restart (`npm run dev`)

### Problem: Build fails
**Solution:**
```bash
rm -rf dist
npm run build
```

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| **QUICKSTART.md** | This file - Get started quickly |
| **SETUP_GUIDE.md** | Detailed setup instructions |
| **FILE_INVENTORY.md** | Complete list of all files |
| **DEPLOYMENT_GUIDE.md** | How to deploy to production |
| **README.md** | Project overview |
| **CLAIMS_WORKFLOW.md** | Claims processing details |
| **IMPLEMENTATION_COMPLETE.md** | Features implemented |
| **VISUAL_ENHANCEMENTS.md** | Visual components guide |

---

## 🎓 New to React?

### What is React?
React is a JavaScript library for building user interfaces. This project uses:
- **React** - UI library
- **TypeScript** - JavaScript with types (safer code)
- **Tailwind CSS** - Styling framework
- **Vite** - Fast build tool

### File Types
- **`.tsx`** - React component with TypeScript
- **`.ts`** - TypeScript file
- **`.css`** - Stylesheet
- **`.json`** - Configuration file

### Basic React Concepts
- **Component** - A reusable piece of UI (e.g., Button, Card)
- **Props** - Data passed to components
- **State** - Data that changes over time
- **Hook** - Special function (e.g., `useState`, `useEffect`)

---

## 💡 Quick Tips

### VS Code Shortcuts
- **Save All**: `Cmd/Ctrl + K, S`
- **Format Document**: `Shift + Alt + F`
- **Find in Files**: `Cmd/Ctrl + Shift + F`
- **Quick Open**: `Cmd/Ctrl + P`
- **Command Palette**: `Cmd/Ctrl + Shift + P`

### Tailwind CSS
```tsx
// Example styling
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello World
</div>
```
- `bg-blue-500` - Blue background
- `text-white` - White text
- `p-4` - Padding
- `rounded-lg` - Rounded corners

### Mock Data Location
All fake data is in `App.tsx`:
- Lines 60-253: Patient data
- Lines 255-300: Provider data
- Lines 302-381: Claims data

---

## 🔄 Typical Development Workflow

### 1. Start Server
```bash
npm run dev
```

### 2. Make Changes
- Edit files in VS Code
- Save (`Cmd/Ctrl + S`)
- Browser auto-refreshes

### 3. Check for Errors
- Look at terminal for build errors
- Look at browser console (F12) for runtime errors

### 4. Build for Production
```bash
npm run build
```

### 5. Test Production Build
```bash
npm run preview
```

---

## 🎯 What Can You Do?

### ✅ Fully Functional Features
- Provider registration and login
- State agent login
- Patient enrollment and management
- Claims creation and submission
- Provider credentialing
- Delegate invitation system
- Workflow visualization
- Session management
- PHI data handling with badges
- Complete claims workflow
- Professional dashboards
- Montana-themed UI

### 🚧 Backend Integration Ready
This is a **frontend-only** application with mock data. When your Spring Boot backend is ready:
1. Replace mock data with API calls
2. Implement real authentication
3. Connect to database
4. Add security layers

---

## 📞 Need Help?

### Common Questions

**Q: Can I use this without a backend?**  
A: Yes! It works completely standalone with mock data.

**Q: How do I add a new patient?**  
A: Click "Enroll New Patient" in Provider Dashboard.

**Q: Where is the data stored?**  
A: In browser memory (resets on page refresh).

**Q: Is this HIPAA compliant?**  
A: Not yet - this is a demo. Production needs encryption, audit logs, etc.

**Q: Can I customize the colors?**  
A: Yes! Edit `styles/globals.css`.

---

## 🎉 You're Ready!

Run this command and start exploring:
```bash
npm run dev
```

The application will open at: **http://localhost:3000**

---

### Next Steps
1. ✅ Run `npm run dev`
2. ✅ Click around and explore
3. ✅ Try the Provider Portal
4. ✅ Try the State Agent Portal
5. ✅ Create some claims
6. ✅ Enroll a patient
7. ✅ Check out the Workflow Guide

### Happy Coding! 🚀

---

**Montana DPHHS Healthcare Coordination Platform v1.0**  
Built with ❤️ using React, TypeScript, and Tailwind CSS
