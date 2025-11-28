# 🏗️ System Architecture Documentation

**Montana DPHHS Healthcare Coordination Platform**

Last Updated: November 28, 2025

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture (Planned)](#backend-architecture-planned)
5. [Data Flow](#data-flow)
6. [Component Architecture](#component-architecture)
7. [Security Architecture](#security-architecture)
8. [Integration Architecture](#integration-architecture)
9. [Deployment Architecture](#deployment-architecture)
10. [Scalability & Performance](#scalability--performance)

---

## 🎯 System Overview

### **Platform Purpose**
HIPAA-compliant healthcare coordination platform for Montana Department of Public Health & Human Services (DPHHS) following the Montana Healthcare Programs enrollment model.

### **Core Capabilities**
- **Provider Portal**: Healthcare professional enrollment, patient management, claims submission
- **State Agent Portal**: Government staff enrollment review, claims processing, payment management
- **CAQH Integration**: Automated provider credentialing verification
- **Claims Workflow**: Complete lifecycle from initiation to insurance submission

### **Architecture Philosophy**
- **Separation of Concerns**: Clear boundaries between UI, business logic, and data
- **Security First**: HIPAA compliance at every layer
- **API-Driven**: Frontend-backend separation for flexibility
- **Microservices Ready**: Modular design for future scaling
- **Cloud Native**: Designed for cloud deployment

---

## 🗺️ Architecture Diagram

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER LAYER                               │
│  ┌──────────────────┐        ┌──────────────────┐          │
│  │  Provider Portal │        │ State Agent Portal│          │
│  │   (React SPA)    │        │    (React SPA)    │          │
│  └──────────────────┘        └──────────────────┘          │
└────────────────┬────────────────────┬─────────────────────────┘
                 │                    │
                 │  HTTPS/TLS 1.3    │
                 │                    │
┌────────────────┴────────────────────┴─────────────────────────┐
│                  API GATEWAY / LOAD BALANCER                   │
│                   (NGINX / AWS ALB)                            │
└────────────────┬────────────────────┬─────────────────────────┘
                 │                    │
                 │  JWT Auth          │
                 │                    │
┌────────────────┴────────────────────┴─────────────────────────┐
│              APPLICATION LAYER (Spring Boot)                   │
│  ┌──────────────────────────────────────────────────────┐    │
│  │            REST API Controllers                       │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  Auth │ Provider │ Patient │ Claim │ State Agent     │    │
│  └──────────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │            Business Logic Services                    │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  Security │ Validation │ Workflow │ Audit Logging    │    │
│  └──────────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │            Data Access Layer (JPA/Hibernate)          │    │
│  └──────────────────────────────────────────────────────┘    │
└────────────────┬────────────────────┬─────────────────────────┘
                 │                    │
                 │                    │
┌────────────────┴─────────┐  ┌──────┴────────────────────────┐
│    DATABASE LAYER        │  │   EXTERNAL INTEGRATIONS        │
│  ┌────────────────────┐  │  │  ┌──────────────────────────┐ │
│  │   PostgreSQL       │  │  │  │  CAQH ProView API        │ │
│  │   (Primary DB)     │  │  │  │  (Provider Credentials)   │ │
│  └────────────────────┘  │  │  └──────────────────────────┘ │
│  ┌────────────────────┐  │  │  ┌──────────────────────────┐ │
│  │   Redis Cache      │  │  │  │  Insurance APIs          │ │
│  │   (Session Store)  │  │  │  │  (EDI 837, 270/271)      │ │
│  └────────────────────┘  │  │  └──────────────────────────┘ │
└──────────────────────────┘  └───────────────────────────────┘
```

---

## 💻 Frontend Architecture

### **Technology Stack**
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Shadcn/ui + Radix UI
- **State Management**: Local React State (useState)
- **Form Handling**: React Hook Form 7.55.0
- **Charts**: Recharts 2.15.0
- **Icons**: Lucide React 0.468.0

### **Frontend Layer Architecture**

```
┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                      │
│  ┌────────────────────────────────────────────────┐     │
│  │              Pages / Views                      │     │
│  │  • Landing Page                                 │     │
│  │  • Login (Provider / State Agent)               │     │
│  │  • Registration (Owner / Delegate)              │     │
│  │  • Provider Dashboard                           │     │
│  │  • State Agent Dashboard                        │     │
│  │  • Patient Management                           │     │
│  │  • Claims Processing                            │     │
│  └────────────────────────────────────────────────┘     │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────┐
│                 COMPONENT LAYER                          │
│  ┌────────────────────────────────────────────────┐     │
│  │          Feature Components                     │     │
│  │  /components/                                   │     │
│  │  ├── auth/           (Login, Session)           │     │
│  │  ├── registration/   (Provider, Delegate)       │     │
│  │  ├── dashboards/     (Provider, State Agent)    │     │
��  │  ├── patient/        (Enrollment, Records)      │     │
│  │  ├── claims/         (Creation, Processing)     │     │
│  │  ├── insurance/      (Verification, Claims)     │     │
│  │  ├── provider/       (Profile, Credentials)     │     │
│  │  └── shared/         (Reusable components)      │     │
│  └────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────┐     │
│  │           UI Component Library                  │     │
│  │  /components/ui/                                │     │
│  │  • 51 reusable UI components                    │     │
│  │  • Button, Card, Dialog, Table, Form, etc.     │     │
│  └────────────────────────────────────────────────┘     │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────┐
│                  SERVICE LAYER (Future)                  │
│  ┌────────────────────────────────────────────────┐     │
│  │          API Services (To Be Added)             │     │
│  │  /services/                                     │     │
│  │  • authService.ts      (Authentication)         │     │
│  │  • patientService.ts   (Patient CRUD)           │     │
│  │  • claimService.ts     (Claims Management)      │     │
│  │  • providerService.ts  (Provider Operations)    │     │
│  │  • caqhService.ts      (CAQH Integration)       │     │
│  └────────────────────────────────────────────────┘     │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────┐
│                    DATA LAYER                            │
│  ┌────────────────────────────────────────────────┐     │
│  │          TypeScript Types & Interfaces          │     │
│  │  /types/                                        │     │
│  │  • User, Provider, Patient, Claim               │     │
│  │  • DTOs matching Spring Boot models             │     │
│  └────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────┐     │
│  │          Mock Data (Current)                    │     │
│  │  • Embedded in App.tsx                          │     │
│  │  • Will be replaced by API calls                │     │
│  └────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### **Component Hierarchy**

```
App.tsx (Root)
├── LandingPage
│   ├── Hero Section
│   ├── Portal Selection Cards
│   └── Features Section
├── Authentication
│   ├── Login (Provider)
│   ├── Login (State Agent)
│   └── SessionTimeoutModal
├── Registration
│   ├── RegistrationChoice (Owner/Delegate)
│   ├── ProviderTypeSelection (Individual/Org)
│   ├── ProviderRegistration
│   └── DelegateRegistration
├── Provider Portal
│   ├── ProviderDashboard
│   │   ├── Patient List
│   │   ├── Claims Overview
│   │   └── Quick Actions
│   ├── PatientRecord
│   │   ├── Patient Info
│   │   ├── Visit History
│   │   └── Clinical Notes
│   └── ProviderPatientProfile
│       ├── Demographics
│       ├── Insurance Info
│       └── Medical History
├── State Agent Portal
│   ├── StateAgentDashboard
│   │   ├── Enrollments Review
│   │   ├── Claims Processing
│   │   └── Payment Management
│   ├── ClaimDetailPage
│   └── ClaimHistoryPage
└── Shared Components
    ├── WorkflowGuidePage
    ├── LoadingState
    └── EmptyState
```

---

## 🔧 Backend Architecture (Planned)

### **Technology Stack**
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Security**: Spring Security 6.x + JWT
- **Database**: PostgreSQL 15+
- **ORM**: Spring Data JPA / Hibernate
- **Cache**: Redis
- **API Docs**: Swagger/OpenAPI 3.0
- **Build Tool**: Maven

### **Backend Layer Architecture**

```
┌─────────────────────────────────────────────────────────┐
│                 PRESENTATION LAYER                       │
│  ┌────────────────────────────────────────────────┐     │
│  │         REST API Controllers                    │     │
│  │  @RestController                                │     │
│  │  • AuthController                               │     │
│  │  • ProviderController                           │     │
│  │  • PatientController                            │     │
│  │  • ClaimController                              │     │
│  │  • StateAgentController                         │     │
│  │  • CAQHController                               │     │
│  └────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────┐     │
│  │         Security Filters                        │     │
│  │  • JwtAuthenticationFilter                      │     │
│  │  • JwtAuthorizationFilter                       │     │
│  │  • CorsFilter                                   │     │
│  └────────────────────────────────────────────────┘     │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────┐
│                  SERVICE LAYER                           │
│  ┌────────────────────────────────────────────────┐     │
│  │         Business Logic Services                 │     │
│  │  @Service                                       │     │
│  │  • AuthService                                  │     │
│  │  • ProviderService                              │     │
│  │  • PatientService                               │     │
│  │  • ClaimService                                 │     │
│  │  • StateAgentService                            │     │
│  │  • CAQHIntegrationService                       │     │
│  └────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────┐     │
│  │         Cross-Cutting Concerns                  │     │
│  │  • ValidationService                            │     │
│  │  • AuditLoggingService                          │     │
│  │  • NotificationService                          │     │
│  │  • WorkflowService                              │     │
│  └────────────────────────────────────────────────┘     │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────┐
│                DATA ACCESS LAYER                         │
│  ┌────────────────────────────────────────────────┐     │
│  │         JPA Repositories                        │     │
│  │  @Repository (Spring Data JPA)                  │     │
│  │  • UserRepository                               │     │
│  │  • ProviderRepository                           │     │
│  │  • PatientRepository                            │     │
│  │  • ClaimRepository                              │     │
│  │  • AuditLogRepository                           │     │
│  └────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────┐     │
│  │         Entity Models                           │     │
│  │  @Entity (JPA Entities)                         │     │
│  │  • User, Provider, Patient, Claim               │     │
│  │  • Enrollment, Document, AuditLog               │     │
│  └────────────────────────────────────────────────┘     │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────┐
│                  PERSISTENCE LAYER                       │
│  ┌────────────────────────────────────────────────┐     │
│  │         PostgreSQL Database                     │     │
│  │  • Users, Providers, Patients, Claims           │     │
│  │  • Encrypted PHI fields                         │     │
│  │  • Audit logs                                   │     │
│  └────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────┐     │
│  │         Redis Cache                             │     │
│  │  • Session storage                              │     │
│  │  • JWT token blacklist                          │     │
│  │  • Rate limiting counters                       │     │
│  └────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### **Package Structure**

```
com.montana.dphhs.healthcare/
├── config/
│   ├── SecurityConfig.java
│   ├── JwtConfig.java
│   ├── CorsConfig.java
│   └── SwaggerConfig.java
├── controller/
│   ├── AuthController.java
│   ├── ProviderController.java
│   ├── PatientController.java
│   ├── ClaimController.java
│   └── StateAgentController.java
├── service/
│   ├── AuthService.java
│   ├── ProviderService.java
│   ├── PatientService.java
│   ├── ClaimService.java
│   └── CAQHIntegrationService.java
├── repository/
│   ├── UserRepository.java
│   ├─��� ProviderRepository.java
│   ├── PatientRepository.java
│   └── ClaimRepository.java
├── entity/
│   ├── User.java
│   ├── Provider.java
│   ├── Patient.java
│   └── Claim.java
├── dto/
│   ├── UserDTO.java
│   ├── ProviderDTO.java
│   ├── PatientDTO.java
│   └── ClaimDTO.java
├── security/
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── UserDetailsServiceImpl.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   └── UnauthorizedException.java
└── util/
    ├── EncryptionUtil.java
    ├── ValidationUtil.java
    └── AuditLogger.java
```

---

## 🔄 Data Flow

### **Authentication Flow**

```
1. User submits credentials
   ↓
2. Frontend validates input
   ↓
3. POST /api/auth/login
   ↓
4. Backend validates credentials
   ↓
5. Generate JWT tokens (access + refresh)
   ↓
6. Store refresh token in Redis
   ↓
7. Return tokens to frontend
   ↓
8. Frontend stores access token in memory
   ↓
9. Frontend stores refresh token in HttpOnly cookie
   ↓
10. All subsequent requests include JWT in Authorization header
```

### **Patient Enrollment Flow**

```
Provider Portal:
1. Provider fills patient enrollment form
   ↓
2. Frontend validates data (React Hook Form)
   ↓
3. POST /api/patients with JWT token
   ↓
Backend:
4. JWT validation (Spring Security)
   ↓
5. Authorization check (PROVIDER role)
   ↓
6. Business validation (PatientService)
   ↓
7. Encrypt PHI fields
   ↓
8. Save to PostgreSQL
   ↓
9. Create audit log entry
   ↓
10. Return patient ID
   ↓
Frontend:
11. Update local state
   ↓
12. Show success notification
   ↓
13. Navigate to patient profile
```

### **Claims Processing Flow**

```
Provider Creates Claim:
1. Provider initiates claim (Draft status)
   ↓
2. POST /api/claims
   ↓
3. Claim saved to DB
   ↓
4. Provider submits claim
   ↓
5. PUT /api/claims/{id}/submit
   ↓
6. Status: Awaiting Member Review
   ↓
State Agent Review:
7. State Agent views pending claims
   ↓
8. GET /api/state-agent/claims?status=PENDING
   ↓
9. State Agent reviews documentation
   ↓
10. PUT /api/state-agent/claims/{id}/process
   ↓
11. Status: In Progress → Submitted to Insurance
   ↓
Insurance Processing:
12. EDI 837 claim submitted to insurance
   ↓
13. Status: Approved / Denied
   ↓
14. Notification sent to provider
```

---

## 🔐 Security Architecture

### **Security Layers**

```
┌─────────────────────────────��───────────────────────────┐
│         TRANSPORT LAYER SECURITY (TLS 1.3)              │
│  • HTTPS only                                            │
│  • SSL certificate                                       │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│         AUTHENTICATION & AUTHORIZATION                   │
│  • JWT tokens (access + refresh)                        │
│  • Role-based access control (RBAC)                     │
│  • Permission-based authorization                        │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│         DATA ENCRYPTION                                  │
│  • PHI fields encrypted at rest (AES-256)               │
│  • All traffic encrypted in transit (TLS)               │
│  • Database connection encryption                        │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│         AUDIT LOGGING                                    │
│  • All PHI access logged                                │
│  • User actions tracked                                 │
│  • Immutable audit trail                                │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│         RATE LIMITING & DDoS PROTECTION                  │
│  • API rate limiting (Redis)                            │
│  • IP-based throttling                                  │
│  • Request validation                                   │
└─────────────────────────────────────────────────────────┘
```

### **HIPAA Compliance Architecture**

| HIPAA Safeguard | Implementation |
|-----------------|----------------|
| **Access Control** | JWT + RBAC |
| **Audit Controls** | Comprehensive audit logging |
| **Integrity Controls** | Data validation + checksums |
| **Transmission Security** | TLS 1.3 encryption |
| **Encryption** | AES-256 for PHI at rest |
| **Authentication** | Multi-factor ready |
| **Authorization** | Role and permission-based |
| **Data Backup** | Automated daily backups |

---

## 🔗 Integration Architecture

### **CAQH ProView® Integration**

```
Montana DPHHS Platform          CAQH ProView API
        │                              │
        │  1. Provider enters CAQH ID  │
        │ ─────────────────────────────>
        │                              │
        │  2. Verify Provider          │
        │ <─────────────────────────────
        │     (REST API Call)          │
        │                              │
        │  3. Retrieve Credentials     │
        │ <─────────────────────────────
        │     (NPI, License, DEA)      │
        │                              │
        │  4. Store Verification       │
        │     in Database              │
        │                              │
        │  5. Schedule Re-verification │
        │     (Every 90 days)          │
```

### **Insurance EDI Integration**

```
Montana DPHHS Platform          Insurance Clearinghouse
        │                              │
        │  1. Claim Approved           │
        │                              │
        │  2. Generate EDI 837         │
        │     (Professional/Inst)      │
        │                              │
        │  3. Submit Claim             │
        │ ─────────────────────────────>
        │                              │
        │  4. Eligibility Check        │
        │     (EDI 270/271)            │
        │ <─────────────────────────────
        │                              │
        │  5. Claim Status Update      │
        │ <─────────────────────────────
        │     (EDI 277)                │
```

---

## 🚀 Deployment Architecture

### **Production Deployment (AWS)**

```
┌───────────��─────────────────────────────────────────────┐
│                     CLOUDFRONT CDN                       │
│  • Static asset delivery                                │
│  • Global edge locations                                │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                   ROUTE 53 DNS                           │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│              APPLICATION LOAD BALANCER (ALB)             │
│  • SSL termination                                       │
│  • Health checks                                         │
│  • Request routing                                       │
└─────────┬───────────────────────────┬───────────────────┘
          │                           │
┌─────────┴─────────┐      ┌──────────┴──────────┐
│    S3 + CloudFront│      │  EC2 Auto Scaling   │
│   (React Frontend)│      │  (Spring Boot API)  │
│                   │      │                     │
│  • index.html     │      │  • ECS/EKS          │
│  • JS/CSS bundles │      │  • Docker containers│
│  • Images         │      │  • Auto-scaling     │
└───────────────────┘      └──────────┬──────────┘
                                      │
                     ┌────────────────┴────────────────┐
                     │                                  │
          ┌──────────┴─────────┐          ┌───────────┴────────┐
          │   RDS PostgreSQL   │          │  ElastiCache Redis │
          │   (Primary DB)     │          │  (Session Store)   │
          │                    │          │                    │
          │  • Multi-AZ        │          │  • Cluster mode    │
          │  • Encrypted       │          │  • High availability│
          │  • Automated backup│          └────────────────────┘
          └────────────────────┘
```

### **CI/CD Pipeline**

```
GitHub Repository
      │
      │ (Push to main)
      ↓
GitHub Actions
      │
      ├─> Frontend Build
      │   ├─> npm install
      │   ├─> npm run build
      │   ├─> Run tests
      │   └─> Deploy to S3
      │
      └─> Backend Build
          ├─> mvn clean install
          ├─> Run tests
          ├─> Build Docker image
          ├─> Push to ECR
          └─> Deploy to ECS
```

---

## 📊 Scalability & Performance

### **Horizontal Scaling**

| Component | Scaling Strategy |
|-----------|------------------|
| **Frontend** | CloudFront CDN + S3 (infinite scale) |
| **Backend** | Auto-scaling EC2/ECS (2-10 instances) |
| **Database** | RDS read replicas (1-5 replicas) |
| **Cache** | Redis cluster (sharding) |

### **Performance Targets**

| Metric | Target |
|--------|--------|
| **Page Load Time** | < 2 seconds |
| **API Response Time** | < 200ms (p95) |
| **Database Query Time** | < 50ms (p95) |
| **Concurrent Users** | 1,000+ |
| **Uptime** | 99.9% |

---

**Architecture Owner**: Montana DPHHS Technical Team  
**Last Updated**: November 28, 2025  
**Version**: 1.0.0
