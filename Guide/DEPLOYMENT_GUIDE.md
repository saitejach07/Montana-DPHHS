# Deployment Guide - Montana DPHHS Healthcare Platform

## 📦 Deployment Options

This guide covers multiple deployment strategies for the Montana DPHHS Healthcare Platform.

---

## 🚀 Option 1: Local Development (Recommended for Testing)

### Prerequisites
- Node.js v18+ installed
- npm, yarn, or pnpm

### Steps
```bash
# 1. Navigate to project directory
cd montana-dphhs-healthcare-platform

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:3000
```

### Features
- ✅ Hot Module Replacement (HMR)
- ✅ Fast refresh on file changes
- ✅ Source maps for debugging
- ✅ TypeScript checking
- ✅ ESLint error display

---

## 🌐 Option 2: Production Build

### Build for Production
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Output
- Build folder: `dist/`
- Optimized assets with cache busting
- Minified JavaScript and CSS
- Source maps (optional)

### Build Optimization
The production build includes:
- Tree shaking (removes unused code)
- Minification
- Code splitting
- Asset optimization
- Gzip compression ready

---

## ☁️ Option 3: Deploy to Vercel (Recommended)

### Why Vercel?
- Zero-config deployment
- Automatic HTTPS
- CDN distribution
- Preview deployments
- Perfect for React + Vite

### Deployment Steps

#### Method A: Vercel CLI
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Follow prompts
```

#### Method B: GitHub Integration
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite config
6. Click "Deploy"

### Vercel Configuration
Create `vercel.json` (optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "framework": "vite"
}
```

---

## 🔥 Option 4: Deploy to Netlify

### Steps
1. Build your project:
   ```bash
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

4. Or use Netlify's drag-and-drop:
   - Go to [netlify.com](https://netlify.com)
   - Drag `dist` folder to deployment zone

### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📦 Option 5: Deploy to AWS S3 + CloudFront

### Steps

#### 1. Build Project
```bash
npm run build
```

#### 2. Create S3 Bucket
```bash
aws s3 mb s3://montana-dphhs-platform
```

#### 3. Upload Build
```bash
aws s3 sync dist/ s3://montana-dphhs-platform --delete
```

#### 4. Configure Bucket for Website Hosting
```bash
aws s3 website s3://montana-dphhs-platform \
  --index-document index.html \
  --error-document index.html
```

#### 5. Set Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::montana-dphhs-platform/*"
    }
  ]
}
```

#### 6. Create CloudFront Distribution
- Origin: Your S3 bucket
- Default Root Object: `index.html`
- Error Pages: Route 404 to `/index.html`

---

## 🐳 Option 6: Docker Deployment

### Create Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Create nginx.conf
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run
```bash
# Build Docker image
docker build -t montana-dphhs-platform .

# Run container
docker run -p 80:80 montana-dphhs-platform

# Or with Docker Compose
docker-compose up -d
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
    restart: always
```

---

## 🔧 Option 7: Deploy to GitHub Pages

### Steps

#### 1. Update vite.config.ts
```typescript
export default defineConfig({
  base: '/montana-dphhs-platform/', // Your repo name
  // ... rest of config
});
```

#### 2. Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### 3. Add Deploy Script to package.json
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### 4. Deploy
```bash
npm run deploy
```

#### 5. Configure GitHub Pages
- Go to repository settings
- Pages → Source → gh-pages branch
- Save

---

## 🌍 Environment Variables

### For Production
Create `.env.production`:
```env
VITE_API_BASE_URL=https://api.montana-dphhs.gov
VITE_ENVIRONMENT=production
VITE_ENABLE_ANALYTICS=true
```

### Usage in Code
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Important Notes
- ⚠️ All `VITE_*` variables are exposed to client
- Never store secrets in frontend env variables
- Use backend for sensitive operations

---

## 🔐 Security Considerations

### Before Deploying to Production

#### 1. Remove Debug Code
```bash
# Search for console.log statements
grep -r "console.log" components/
```

#### 2. Enable HTTPS
- All production deployments must use HTTPS
- Most hosting providers (Vercel, Netlify) provide automatic HTTPS

#### 3. Set Security Headers
Add to your server configuration:
```
Content-Security-Policy
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security
```

#### 4. Environment Variables
- Never commit `.env` files
- Use platform-specific secret management
- Rotate credentials regularly

#### 5. Dependency Audit
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix
```

---

## 📊 Performance Optimization

### Before Deployment

#### 1. Analyze Bundle Size
```bash
npm run build -- --mode analyze
```

#### 2. Image Optimization
- Use WebP format where possible
- Implement lazy loading
- Compress images

#### 3. Code Splitting
- Already configured in Vite
- Dynamic imports for large components

#### 4. Enable Compression
Most hosting providers enable gzip/brotli automatically

---

## 🧪 Pre-Deployment Checklist

- [ ] Run production build locally (`npm run build`)
- [ ] Test production build (`npm run preview`)
- [ ] Run linter (`npm run lint`)
- [ ] Check TypeScript errors
- [ ] Remove all `console.log` statements
- [ ] Test on multiple browsers
- [ ] Test responsive design
- [ ] Test all user flows
- [ ] Verify all images load
- [ ] Check for broken links
- [ ] Test session timeout
- [ ] Verify claim submission workflow
- [ ] Test patient record access
- [ ] Check provider registration flow
- [ ] Test state agent dashboard

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linter
        run: npm run lint
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🚨 Rollback Strategy

### Quick Rollback
Most platforms support instant rollback:

#### Vercel
```bash
vercel rollback [deployment-url]
```

#### Netlify
```bash
netlify rollback
```

#### Manual Rollback
1. Keep previous `dist/` folder backups
2. Redeploy previous version
3. Clear CDN cache if needed

---

## 📈 Monitoring & Analytics

### Recommended Tools
- **Sentry**: Error tracking
- **Google Analytics**: User analytics
- **LogRocket**: Session replay
- **Datadog**: Performance monitoring

### Implementation
```typescript
// Example: Sentry integration
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENVIRONMENT,
});
```

---

## 🎯 Recommended Deployment Path

### For Development/Staging
**Vercel** or **Netlify**
- Pros: Easy, fast, automatic previews
- Cons: Limited control

### For Production
**AWS S3 + CloudFront**
- Pros: Full control, HIPAA-compliant options
- Cons: More complex setup

### For Enterprise
**Kubernetes + Docker**
- Pros: Maximum control, scalability
- Cons: Complex infrastructure

---

## 📞 Support

For deployment issues:
1. Check build logs
2. Verify environment variables
3. Test locally with `npm run preview`
4. Check browser console for errors
5. Review hosting provider documentation

---

## 🎉 Post-Deployment

After successful deployment:
- ✅ Verify all pages load
- ✅ Test login/registration flows
- ✅ Check API connectivity (when backend is ready)
- ✅ Monitor error logs
- ✅ Set up uptime monitoring
- ✅ Configure backup strategy
- ✅ Document deployment process
- ✅ Share credentials with team

---

**Remember**: This is a healthcare platform. Always prioritize security and HIPAA compliance in production deployments.

Last Updated: 2025-11-27
