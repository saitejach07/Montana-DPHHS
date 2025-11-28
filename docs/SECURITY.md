# 🔒 Security & HIPAA Compliance Documentation

**Montana DPHHS Healthcare Coordination Platform**

Last Updated: November 28, 2025

---

## 📋 Table of Contents

1. [HIPAA Compliance Overview](#hipaa-compliance-overview)
2. [Security Architecture](#security-architecture)
3. [Authentication & Authorization](#authentication--authorization)
4. [Data Encryption](#data-encryption)
5. [Audit Logging](#audit-logging)
6. [Access Controls](#access-controls)
7. [Security Best Practices](#security-best-practices)
8. [Incident Response](#incident-response)
9. [Compliance Checklist](#compliance-checklist)

---

## 🏥 HIPAA Compliance Overview

### **Important Disclaimer**

⚠️ **This is a UI/UX prototype and demonstration application.**

The current implementation is **NOT production-ready for handling real PHI (Protected Health Information)**. Before deploying with real patient data, a comprehensive security implementation, third-party audit, and Business Associate Agreement (BAA) are required.

### **HIPAA Requirements**

The platform must comply with:

1. **HIPAA Privacy Rule** - PHI usage and disclosure standards
2. **HIPAA Security Rule** - Administrative, physical, and technical safeguards
3. **HIPAA Breach Notification Rule** - Breach response procedures
4. **HITECH Act** - Enhanced penalties and enforcement

---

## 🛡️ Security Architecture

### **Defense in Depth Strategy**

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Network Security                              │
│  • Firewall rules                                       │
│  • VPC isolation                                        │
│  • DDoS protection                                      │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Layer 2: Transport Security                            │
│  • TLS 1.3 encryption                                   │
│  • Certificate pinning                                  │
│  • HTTPS enforcement                                    │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Layer 3: Application Security                          │
│  • JWT authentication                                   │
│  • Role-based access control                            │
│  • Input validation                                     │
│  • XSS/CSRF protection                                  │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Layer 4: Data Security                                 │
│  • Encryption at rest (AES-256)                         │
│  • Field-level encryption for PHI                       │
│  • Database access controls                             │
│  • Secure key management                                │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Layer 5: Monitoring & Auditing                         │
│  • Comprehensive audit logs                             │
│  • Real-time security monitoring                        │
│  • Automated threat detection                           │
│  • Incident response system                             │
└─────────────────────────────────────────────────────────┘
```

---

## 🔑 Authentication & Authorization

### **JWT-Based Authentication**

#### **Token Structure**

**Access Token** (Short-lived: 15 minutes)
```json
{
  "sub": "user_123",
  "email": "provider@example.com",
  "role": "PROVIDER",
  "permissions": ["READ_PATIENTS", "WRITE_CLAIMS"],
  "organizationId": "org_456",
  "iat": 1701234567,
  "exp": 1701235467
}
```

**Refresh Token** (Long-lived: 7 days)
```json
{
  "sub": "user_123",
  "type": "refresh",
  "iat": 1701234567,
  "exp": 1701839367
}
```

#### **Token Security**

✅ **Implemented:**
- JWT tokens signed with HS256 algorithm
- Short expiration for access tokens (15 min)
- Separate refresh token with longer expiration (7 days)
- Token validation on every API request

🔜 **To Implement:**
- Store refresh tokens in HttpOnly cookies (not localStorage)
- Token revocation list in Redis
- Refresh token rotation
- IP-based token binding
- Device fingerprinting

### **Multi-Factor Authentication (MFA)**

🔜 **Planned for Production:**

```typescript
// MFA enrollment flow
interface MFASetup {
  userId: string;
  method: 'SMS' | 'EMAIL' | 'TOTP' | 'HARDWARE_TOKEN';
  phoneNumber?: string;
  email?: string;
  secret?: string; // For TOTP
}

// MFA verification
interface MFAVerification {
  userId: string;
  code: string;
  trustDevice: boolean;
}
```

### **Role-Based Access Control (RBAC)**

#### **User Roles**

| Role | Description | Permissions |
|------|-------------|-------------|
| **PROVIDER** | Healthcare professional | Read/Write own patients, Create claims |
| **DELEGATE** | Provider's staff member | Limited patient access, Cannot approve |
| **STATE_AGENT** | Montana DPHHS staff | Review enrollments, Process claims, Approve payments |
| **ADMIN** | System administrator | Full system access |

#### **Permission Matrix**

| Resource | Provider | Delegate | State Agent | Admin |
|----------|----------|----------|-------------|-------|
| Enroll Patients | ✅ | ✅ | ❌ | ✅ |
| View Own Patients | ✅ | ✅ | ❌ | ✅ |
| View All Patients | ❌ | ❌ | ✅ | ✅ |
| Create Claims | ✅ | ✅ | ❌ | ✅ |
| Process Claims | ❌ | ❌ | ✅ | ✅ |
| Approve Enrollments | ❌ | ❌ | ✅ | ✅ |
| System Configuration | ❌ | ❌ | ❌ | ✅ |

### **Authorization Enforcement**

#### Backend (Spring Security)
```java
@PreAuthorize("hasRole('PROVIDER') or hasRole('ADMIN')")
@GetMapping("/api/patients")
public List<PatientDTO> getPatients() {
    // Only accessible by PROVIDER or ADMIN roles
}

@PreAuthorize("hasAuthority('APPROVE_CLAIMS')")
@PostMapping("/api/claims/{id}/approve")
public ClaimDTO approveClaim(@PathVariable String id) {
    // Only accessible with APPROVE_CLAIMS permission
}
```

#### Frontend (React)
```typescript
// Role-based component rendering
{user.role === 'PROVIDER' && (
  <Button onClick={enrollPatient}>Enroll Patient</Button>
)}

{user.role === 'STATE_AGENT' && (
  <Button onClick={processEnrollment}>Process Enrollment</Button>
)}
```

---

## 🔐 Data Encryption

### **Encryption at Rest**

#### **Database Encryption (PostgreSQL)**

**Full Database Encryption:**
```sql
-- Enable transparent data encryption (TDE)
-- AWS RDS: Enabled at instance creation with KMS key

-- Field-level encryption for PHI
CREATE TABLE patients (
    id UUID PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    ssn BYTEA, -- Encrypted using pgcrypto
    date_of_birth DATE,
    medical_record_number BYTEA, -- Encrypted
    created_at TIMESTAMP DEFAULT NOW()
);

-- Encrypt sensitive data
INSERT INTO patients (id, first_name, last_name, ssn, date_of_birth)
VALUES (
    uuid_generate_v4(),
    'John',
    'Doe',
    pgp_sym_encrypt('123-45-6789', 'encryption-key'),
    '1980-01-15'
);

-- Decrypt when querying
SELECT 
    id,
    first_name,
    last_name,
    pgp_sym_decrypt(ssn, 'encryption-key') AS ssn,
    date_of_birth
FROM patients;
```

**Field-Level Encryption Implementation:**
```java
@Entity
@Table(name = "patients")
public class Patient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "ssn", columnDefinition = "bytea")
    @Convert(converter = EncryptedStringConverter.class)
    private String ssn; // Automatically encrypted/decrypted
    
    @Column(name = "medical_record_number", columnDefinition = "bytea")
    @Convert(converter = EncryptedStringConverter.class)
    private String medicalRecordNumber;
}

// Encryption converter
@Converter
public class EncryptedStringConverter implements AttributeConverter<String, byte[]> {
    
    @Override
    public byte[] convertToDatabaseColumn(String attribute) {
        return EncryptionUtil.encrypt(attribute);
    }
    
    @Override
    public String convertToEntityAttribute(byte[] dbData) {
        return EncryptionUtil.decrypt(dbData);
    }
}
```

### **Encryption in Transit**

#### **TLS 1.3 Configuration**

**NGINX Configuration:**
```nginx
server {
    listen 443 ssl http2;
    server_name api.montana-dphhs.gov;

    # SSL certificates
    ssl_certificate /etc/ssl/certs/montana-dphhs.crt;
    ssl_certificate_key /etc/ssl/private/montana-dphhs.key;

    # TLS 1.3 only
    ssl_protocols TLSv1.3;
    
    # Strong ciphers
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256';
    ssl_prefer_server_ciphers off;

    # HSTS (HTTP Strict Transport Security)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;

    location / {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Database Connection Encryption:**
```properties
# PostgreSQL SSL connection
spring.datasource.url=jdbc:postgresql://db-host:5432/montana_dphhs?ssl=true&sslmode=require

# Redis SSL connection
spring.redis.ssl=true
```

### **Key Management**

#### **AWS KMS Integration**
```java
@Service
public class KeyManagementService {
    
    private final AWSKMSClient kmsClient;
    
    public String encryptData(String plaintext) {
        EncryptRequest request = new EncryptRequest()
            .withKeyId("arn:aws:kms:us-west-2:123456789012:key/12345678-1234-1234-1234-123456789012")
            .withPlaintext(ByteBuffer.wrap(plaintext.getBytes()));
        
        EncryptResult result = kmsClient.encrypt(request);
        return Base64.getEncoder().encodeToString(result.getCiphertextBlob().array());
    }
    
    public String decryptData(String ciphertext) {
        DecryptRequest request = new DecryptRequest()
            .withCiphertextBlob(ByteBuffer.wrap(Base64.getDecoder().decode(ciphertext)));
        
        DecryptResult result = kmsClient.decrypt(request);
        return new String(result.getPlaintext().array());
    }
}
```

---

## 📝 Audit Logging

### **HIPAA Audit Requirements**

All access to PHI must be logged with:
- **Who** accessed the data (User ID, Name, Role)
- **What** was accessed (Resource type, Resource ID)
- **When** it was accessed (Timestamp)
- **Where** from (IP address, Device info)
- **Why** (Action: READ, CREATE, UPDATE, DELETE)
- **Result** (SUCCESS, FAILURE, reason)

### **Audit Log Implementation**

#### **Database Schema**
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id VARCHAR(100) NOT NULL,
    user_name VARCHAR(200) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100),
    ip_address INET NOT NULL,
    user_agent TEXT,
    request_id VARCHAR(100),
    result VARCHAR(20) NOT NULL,
    error_message TEXT,
    metadata JSONB
);

-- Index for fast queries
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- Prevent modifications (append-only table)
CREATE RULE audit_logs_no_delete AS ON DELETE TO audit_logs DO INSTEAD NOTHING;
CREATE RULE audit_logs_no_update AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
```

#### **Audit Logging Service**
```java
@Service
public class AuditLoggingService {
    
    @Autowired
    private AuditLogRepository auditLogRepository;
    
    @Async
    public void logAccess(AuditLogRequest request) {
        AuditLog log = new AuditLog();
        log.setTimestamp(LocalDateTime.now());
        log.setUserId(request.getUserId());
        log.setUserName(request.getUserName());
        log.setUserRole(request.getUserRole());
        log.setAction(request.getAction());
        log.setResourceType(request.getResourceType());
        log.setResourceId(request.getResourceId());
        log.setIpAddress(request.getIpAddress());
        log.setUserAgent(request.getUserAgent());
        log.setRequestId(request.getRequestId());
        log.setResult(request.getResult());
        log.setErrorMessage(request.getErrorMessage());
        log.setMetadata(request.getMetadata());
        
        auditLogRepository.save(log);
        
        // Also send to centralized logging (CloudWatch, ELK)
        logToCentralSystem(log);
    }
    
    public List<AuditLog> searchAuditLogs(AuditLogSearchRequest search) {
        // Implement search with pagination
        return auditLogRepository.findByFilters(search);
    }
}
```

#### **Automatic Audit Logging (AOP)**
```java
@Aspect
@Component
public class AuditLoggingAspect {
    
    @Autowired
    private AuditLoggingService auditLoggingService;
    
    @Around("@annotation(auditable)")
    public Object logAccess(ProceedingJoinPoint joinPoint, Auditable auditable) throws Throwable {
        HttpServletRequest request = getCurrentRequest();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        AuditLogRequest auditLog = new AuditLogRequest();
        auditLog.setUserId(auth.getName());
        auditLog.setAction(auditable.action());
        auditLog.setResourceType(auditable.resourceType());
        auditLog.setIpAddress(request.getRemoteAddr());
        auditLog.setUserAgent(request.getHeader("User-Agent"));
        auditLog.setRequestId(request.getHeader("X-Request-ID"));
        
        try {
            Object result = joinPoint.proceed();
            auditLog.setResult("SUCCESS");
            return result;
        } catch (Exception e) {
            auditLog.setResult("FAILURE");
            auditLog.setErrorMessage(e.getMessage());
            throw e;
        } finally {
            auditLoggingService.logAccess(auditLog);
        }
    }
}

// Usage
@Auditable(action = "READ", resourceType = "PATIENT")
@GetMapping("/api/patients/{id}")
public PatientDTO getPatient(@PathVariable String id) {
    return patientService.getPatient(id);
}
```

### **Audit Log Retention**

| Log Type | Retention Period | Storage |
|----------|------------------|---------|
| PHI Access Logs | 6 years | Encrypted S3 + Glacier |
| Authentication Logs | 2 years | CloudWatch Logs |
| System Logs | 1 year | CloudWatch Logs |
| Error Logs | 6 months | CloudWatch Logs |

---

## 🚨 Security Best Practices

### **Input Validation**

```java
@RestController
public class PatientController {
    
    @PostMapping("/api/patients")
    public PatientDTO createPatient(@Valid @RequestBody PatientDTO patient) {
        // @Valid triggers JSR-303 validation
        
        // Additional business validation
        ValidationUtil.validateSSN(patient.getSsn());
        ValidationUtil.validateEmail(patient.getEmail());
        ValidationUtil.validateDateOfBirth(patient.getDateOfBirth());
        
        return patientService.createPatient(patient);
    }
}

// DTO with validation annotations
public class PatientDTO {
    
    @NotBlank(message = "First name is required")
    @Size(min = 1, max = 100)
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 1, max = 100)
    private String lastName;
    
    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;
    
    @Pattern(regexp = "^\\d{3}-\\d{2}-\\d{4}$", message = "Invalid SSN format")
    private String ssn;
    
    @Email(message = "Invalid email address")
    private String email;
}
```

### **SQL Injection Prevention**

```java
// ✅ GOOD: Use parameterized queries
@Query("SELECT p FROM Patient p WHERE p.lastName = :lastName")
List<Patient> findByLastName(@Param("lastName") String lastName);

// ❌ BAD: Never concatenate SQL strings
// String query = "SELECT * FROM patients WHERE last_name = '" + lastName + "'";
```

### **XSS Protection**

```typescript
// Frontend: Sanitize user input
import DOMPurify from 'dompurify';

function displayNotes(notes: string) {
  const sanitized = DOMPurify.sanitize(notes);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

// Backend: Escape HTML in responses
@JsonSerialize(using = HtmlEscapeSerializer.class)
private String notes;
```

### **CSRF Protection**

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            .and()
            // ... other config
        ;
        return http.build();
    }
}
```

### **Rate Limiting**

```java
@Service
public class RateLimitingService {
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    public boolean isAllowed(String userId, String endpoint) {
        String key = "rate_limit:" + userId + ":" + endpoint;
        Long requests = redisTemplate.opsForValue().increment(key);
        
        if (requests == 1) {
            redisTemplate.expire(key, 60, TimeUnit.SECONDS);
        }
        
        return requests <= 100; // 100 requests per minute
    }
}
```

---

## 🚨 Incident Response

### **Incident Response Plan**

#### **1. Detection**
- Automated alerts from monitoring systems
- User reports
- Security audits

#### **2. Containment**
- Isolate affected systems
- Revoke compromised credentials
- Block malicious IPs

#### **3. Investigation**
- Review audit logs
- Identify scope of breach
- Document findings

#### **4. Notification**
- Notify affected users (within 60 days per HIPAA)
- Report to HHS if 500+ individuals affected
- Contact law enforcement if needed

#### **5. Recovery**
- Restore systems from backups
- Apply security patches
- Reset credentials

#### **6. Post-Incident**
- Conduct post-mortem
- Update security procedures
- Provide training

### **Breach Notification Template**

```
Subject: Important Security Notice

Dear [User Name],

We are writing to inform you of a data security incident that may have 
affected your protected health information (PHI).

WHAT HAPPENED:
[Description of incident]

WHAT INFORMATION WAS INVOLVED:
[Types of data potentially affected]

WHAT WE ARE DOING:
[Response actions taken]

WHAT YOU CAN DO:
[Recommended actions for affected individuals]

FOR MORE INFORMATION:
Contact us at security@montana-dphhs.gov or call 1-800-XXX-XXXX

Sincerely,
Montana DPHHS Security Team
```

---

## ✅ Compliance Checklist

### **HIPAA Security Rule - Technical Safeguards**

- [ ] **Access Control** (§164.312(a)(1))
  - [ ] Unique user identification
  - [ ] Emergency access procedures
  - [ ] Automatic logoff
  - [ ] Encryption and decryption

- [ ] **Audit Controls** (§164.312(b))
  - [ ] Hardware, software, and procedural mechanisms to record and examine PHI access

- [ ] **Integrity** (§164.312(c)(1))
  - [ ] Mechanisms to authenticate that PHI has not been altered or destroyed

- [ ] **Person or Entity Authentication** (§164.312(d))
  - [ ] Procedures to verify person/entity seeking access

- [ ] **Transmission Security** (§164.312(e)(1))
  - [ ] Integrity controls
  - [ ] Encryption

### **HIPAA Security Rule - Administrative Safeguards**

- [ ] Security Management Process
- [ ] Workforce Security
- [ ] Information Access Management
- [ ] Security Awareness and Training
- [ ] Security Incident Procedures
- [ ] Contingency Plan
- [ ] Business Associate Agreements

### **HIPAA Security Rule - Physical Safeguards**

- [ ] Facility Access Controls
- [ ] Workstation Use
- [ ] Workstation Security
- [ ] Device and Media Controls

---

**Security Documentation Owner**: Security & Compliance Team  
**Last Updated**: November 28, 2025  
**Security Contact**: security@montana-dphhs.gov  
**Emergency**: 1-800-XXX-XXXX (24/7 Security Hotline)
