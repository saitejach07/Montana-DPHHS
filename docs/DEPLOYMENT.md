# 🚀 Deployment Guide

**Montana DPHHS Healthcare Coordination Platform**

Last Updated: November 28, 2025

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Frontend Deployment](#frontend-deployment)
4. [Backend Deployment (Spring Boot)](#backend-deployment-spring-boot)
5. [Database Setup](#database-setup)
6. [Security Configuration](#security-configuration)
7. [Monitoring & Logging](#monitoring--logging)
8. [Backup & Recovery](#backup--recovery)
9. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

### **Required Software**

#### Frontend
- Node.js 18.x or higher
- npm 9.x or higher (or yarn/pnpm)
- Git

#### Backend
- Java 17 or higher (JDK)
- Maven 3.8+ or Gradle 7+
- PostgreSQL 15+
- Redis 7+

#### DevOps Tools
- Docker 24+
- Docker Compose 2.20+
- Kubernetes 1.28+ (optional)
- AWS CLI 2.x (for AWS deployment)

### **Server Requirements**

#### Development Environment
- **CPU**: 2 cores minimum
- **RAM**: 4 GB minimum
- **Disk**: 20 GB SSD

#### Production Environment
- **Frontend**: AWS S3 + CloudFront (serverless)
- **Backend**: 
  - CPU: 4 cores minimum
  - RAM: 8 GB minimum
  - Disk: 50 GB SSD
- **Database**: 
  - CPU: 2 cores minimum
  - RAM: 8 GB minimum
  - Disk: 100 GB SSD (with backup)

---

## 🔧 Environment Setup

### **Environment Variables**

#### Frontend (.env)
```bash
# API Configuration
VITE_API_URL=https://api.montana-dphhs.gov/api
VITE_API_TIMEOUT=30000

# Environment
VITE_ENVIRONMENT=production

# Feature Flags
VITE_ENABLE_CAQH=true
VITE_ENABLE_ANALYTICS=true

# Security
VITE_ENABLE_MFA=false
```

#### Backend (application.properties)
```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/montana_dphhs
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Redis Configuration
spring.redis.host=${REDIS_HOST:localhost}
spring.redis.port=${REDIS_PORT:6379}
spring.redis.password=${REDIS_PASSWORD}

# JWT Configuration
jwt.secret=${JWT_SECRET}
jwt.access-token-expiration=900000
jwt.refresh-token-expiration=604800000

# CAQH Integration
caqh.api.url=https://proview-demo.caqh.org/api
caqh.api.key=${CAQH_API_KEY}
caqh.api.username=${CAQH_USERNAME}
caqh.api.password=${CAQH_PASSWORD}

# Logging
logging.level.root=INFO
logging.level.com.montana.dphhs=DEBUG
logging.file.name=/var/log/montana-dphhs/application.log

# HIPAA Audit Logging
audit.enabled=true
audit.log.path=/var/log/montana-dphhs/audit.log

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# CORS Configuration
cors.allowed-origins=https://montana-dphhs.gov,https://www.montana-dphhs.gov
```

---

## 🌐 Frontend Deployment

### **Option 1: AWS S3 + CloudFront (Recommended)**

#### Step 1: Build Frontend
```bash
cd /path/to/frontend

# Install dependencies
npm install

# Build for production
npm run build

# Output will be in /dist directory
```

#### Step 2: Create S3 Bucket
```bash
# Create bucket
aws s3 mb s3://montana-dphhs-frontend

# Enable static website hosting
aws s3 website s3://montana-dphhs-frontend \
  --index-document index.html \
  --error-document index.html
```

#### Step 3: Upload to S3
```bash
# Sync build files to S3
aws s3 sync dist/ s3://montana-dphhs-frontend \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html"

# Upload index.html with no-cache
aws s3 cp dist/index.html s3://montana-dphhs-frontend/index.html \
  --cache-control "no-cache, no-store, must-revalidate"
```

#### Step 4: Configure CloudFront
```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name montana-dphhs-frontend.s3.amazonaws.com \
  --default-root-object index.html

# Note: Configure SSL certificate in ACM first
```

#### Step 5: Configure Custom Domain
```bash
# Add CNAME record in Route 53
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch file://dns-record.json
```

---

### **Option 2: Vercel (Alternative)**

#### Deploy with Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Configure custom domain in Vercel dashboard
```

---

### **Option 3: Netlify (Alternative)**

#### Deploy with Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod --dir=dist
```

---

### **Option 4: Docker Container**

#### Dockerfile
```dockerfile
# Build stage
FROM node:20-alpine AS build

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

#### nginx.conf
```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Don't cache index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

#### Build and Run
```bash
# Build Docker image
docker build -t montana-dphhs-frontend:latest .

# Run container
docker run -d -p 80:80 \
  --name montana-dphhs-frontend \
  montana-dphhs-frontend:latest
```

---

## 🔧 Backend Deployment (Spring Boot)

### **Option 1: AWS ECS/Fargate (Recommended)**

#### Step 1: Create Dockerfile
```dockerfile
# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Production stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]
```

#### Step 2: Build and Push to ECR
```bash
# Authenticate Docker to ECR
aws ecr get-login-password --region us-west-2 | \
  docker login --username AWS --password-stdin \
  123456789012.dkr.ecr.us-west-2.amazonaws.com

# Build image
docker build -t montana-dphhs-backend:latest .

# Tag image
docker tag montana-dphhs-backend:latest \
  123456789012.dkr.ecr.us-west-2.amazonaws.com/montana-dphhs-backend:latest

# Push to ECR
docker push \
  123456789012.dkr.ecr.us-west-2.amazonaws.com/montana-dphhs-backend:latest
```

#### Step 3: Create ECS Task Definition
```json
{
  "family": "montana-dphhs-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "containerDefinitions": [
    {
      "name": "montana-dphhs-backend",
      "image": "123456789012.dkr.ecr.us-west-2.amazonaws.com/montana-dphhs-backend:latest",
      "portMappings": [
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "SPRING_PROFILES_ACTIVE",
          "value": "prod"
        }
      ],
      "secrets": [
        {
          "name": "DB_USERNAME",
          "valueFrom": "arn:aws:secretsmanager:us-west-2:123456789012:secret:db-username"
        },
        {
          "name": "DB_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:us-west-2:123456789012:secret:db-password"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/montana-dphhs-backend",
          "awslogs-region": "us-west-2",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### Step 4: Create ECS Service
```bash
aws ecs create-service \
  --cluster montana-dphhs \
  --service-name backend-service \
  --task-definition montana-dphhs-backend:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345,subnet-67890],securityGroups=[sg-12345],assignPublicIp=DISABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/montana-dphhs/abcd1234,containerName=montana-dphhs-backend,containerPort=8080"
```

---

### **Option 2: Traditional Server Deployment**

#### Step 1: Build JAR
```bash
mvn clean package -DskipTests
```

#### Step 2: Create Systemd Service
```ini
# /etc/systemd/system/montana-dphhs.service

[Unit]
Description=Montana DPHHS Healthcare Platform
After=syslog.target network.target

[Service]
Type=simple
User=montana-dphhs
WorkingDirectory=/opt/montana-dphhs
ExecStart=/usr/bin/java -jar -Dspring.profiles.active=prod /opt/montana-dphhs/app.jar
StandardOutput=journal
StandardError=journal
SyslogIdentifier=montana-dphhs
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

#### Step 3: Deploy and Start
```bash
# Copy JAR to server
scp target/montana-dphhs-*.jar user@server:/opt/montana-dphhs/app.jar

# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable montana-dphhs

# Start service
sudo systemctl start montana-dphhs

# Check status
sudo systemctl status montana-dphhs

# View logs
sudo journalctl -u montana-dphhs -f
```

---

## 🗄️ Database Setup

### **PostgreSQL Installation**

#### Option 1: AWS RDS (Recommended)
```bash
aws rds create-db-instance \
  --db-instance-identifier montana-dphhs-db \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --engine-version 15.3 \
  --master-username dbadmin \
  --master-user-password <password> \
  --allocated-storage 100 \
  --storage-type gp3 \
  --storage-encrypted \
  --backup-retention-period 7 \
  --multi-az \
  --vpc-security-group-ids sg-12345 \
  --db-subnet-group-name montana-dphhs-subnet-group
```

#### Option 2: Self-Hosted
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql-15 postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### **Database Initialization**

```sql
-- Create database
CREATE DATABASE montana_dphhs;

-- Create user
CREATE USER montana_user WITH ENCRYPTED PASSWORD 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE montana_dphhs TO montana_user;

-- Connect to database
\c montana_dphhs

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create schema
CREATE SCHEMA IF NOT EXISTS healthcare AUTHORIZATION montana_user;
```

### **Run Migrations**

#### Using Flyway (Recommended)
```bash
# Add Flyway to pom.xml
# Migrations in src/main/resources/db/migration/

# Run migrations
mvn flyway:migrate
```

#### Using Liquibase
```bash
# Add Liquibase to pom.xml
# Changesets in src/main/resources/db/changelog/

# Run changesets
mvn liquibase:update
```

---

## 🔐 Security Configuration

### **SSL/TLS Certificate**

#### AWS Certificate Manager (ACM)
```bash
# Request certificate
aws acm request-certificate \
  --domain-name montana-dphhs.gov \
  --subject-alternative-names www.montana-dphhs.gov api.montana-dphhs.gov \
  --validation-method DNS
```

#### Let's Encrypt (Self-Hosted)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d montana-dphhs.gov -d www.montana-dphhs.gov
```

### **Firewall Configuration**

```bash
# Allow HTTPS
sudo ufw allow 443/tcp

# Allow HTTP (for redirect)
sudo ufw allow 80/tcp

# Allow SSH (from specific IP)
sudo ufw allow from 203.0.113.0/24 to any port 22

# Enable firewall
sudo ufw enable
```

### **Security Groups (AWS)**

```json
{
  "GroupName": "montana-dphhs-backend",
  "Description": "Security group for backend API",
  "VpcId": "vpc-12345",
  "IpPermissions": [
    {
      "IpProtocol": "tcp",
      "FromPort": 8080,
      "ToPort": 8080,
      "UserIdGroupPairs": [
        {
          "GroupId": "sg-alb-12345",
          "Description": "Allow from ALB"
        }
      ]
    }
  ]
}
```

---

## 📊 Monitoring & Logging

### **Application Monitoring**

#### AWS CloudWatch
```bash
# Create log group
aws logs create-log-group --log-group-name /ecs/montana-dphhs

# Create alarms
aws cloudwatch put-metric-alarm \
  --alarm-name high-cpu \
  --alarm-description "Alert when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2
```

#### Prometheus + Grafana (Self-Hosted)
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'spring-boot'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['localhost:8080']
```

### **HIPAA Audit Logging**

```java
@Service
public class AuditLoggingService {
    
    @Async
    public void logAccess(String userId, String action, String resourceType, String resourceId) {
        AuditLog log = new AuditLog();
        log.setTimestamp(LocalDateTime.now());
        log.setUserId(userId);
        log.setAction(action);
        log.setResourceType(resourceType);
        log.setResourceId(resourceId);
        log.setIpAddress(getCurrentIpAddress());
        
        auditLogRepository.save(log);
    }
}
```

### **Log Aggregation**

#### ELK Stack (Elasticsearch, Logstash, Kibana)
```yaml
# docker-compose.yml
version: '3'
services:
  elasticsearch:
    image: elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"
  
  logstash:
    image: logstash:8.11.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - "5000:5000"
  
  kibana:
    image: kibana:8.11.0
    ports:
      - "5601:5601"
```

---

## 💾 Backup & Recovery

### **Database Backups**

#### Automated Backups (AWS RDS)
```bash
# Configure automated backups (already enabled in creation)
aws rds modify-db-instance \
  --db-instance-identifier montana-dphhs-db \
  --backup-retention-period 30 \
  --preferred-backup-window "03:00-04:00"
```

#### Manual Backups (PostgreSQL)
```bash
# Create backup
pg_dump -h localhost -U montana_user -d montana_dphhs -F c -b -v -f backup_$(date +%Y%m%d).dump

# Restore backup
pg_restore -h localhost -U montana_user -d montana_dphhs -v backup_20251128.dump

# Automate with cron
0 2 * * * /usr/bin/pg_dump -h localhost -U montana_user montana_dphhs | gzip > /backups/montana_dphhs_$(date +\%Y\%m\%d).sql.gz
```

### **Disaster Recovery Plan**

| RTO (Recovery Time Objective) | RPO (Recovery Point Objective) |
|-------------------------------|--------------------------------|
| 4 hours | 15 minutes |

**Steps:**
1. Restore database from latest backup
2. Deploy application from Docker image
3. Verify data integrity
4. Switch DNS to DR environment
5. Monitor application health

---

## 🔍 Troubleshooting

### **Common Issues**

#### Frontend Not Loading
```bash
# Check S3 bucket permissions
aws s3api get-bucket-policy --bucket montana-dphhs-frontend

# Check CloudFront distribution
aws cloudfront get-distribution --id E1234567890ABC

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*"
```

#### Backend Not Starting
```bash
# Check application logs
docker logs montana-dphhs-backend

# Check database connection
psql -h db-hostname -U montana_user -d montana_dphhs

# Check environment variables
docker exec montana-dphhs-backend env
```

#### Database Connection Errors
```bash
# Test connection
nc -zv db-hostname 5432

# Check PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log

# Verify user permissions
psql -U postgres -c "\du montana_user"
```

---

## 📝 Deployment Checklist

### **Pre-Deployment**
- [ ] Code review completed
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] SSL certificates obtained
- [ ] Backup strategy implemented

### **Deployment**
- [ ] Build and tag Docker images
- [ ] Deploy database migrations
- [ ] Deploy backend services
- [ ] Deploy frontend assets
- [ ] Configure load balancer
- [ ] Update DNS records

### **Post-Deployment**
- [ ] Smoke tests passed
- [ ] Health checks passing
- [ ] Monitoring alerts configured
- [ ] Log aggregation working
- [ ] Backup job verified
- [ ] Documentation updated

---

**Deployment Guide Owner**: DevOps Team  
**Last Updated**: November 28, 2025  
**Support**: devops@montana-dphhs.gov
