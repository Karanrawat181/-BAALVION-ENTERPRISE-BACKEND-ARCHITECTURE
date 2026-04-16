# BAALVION Enterprise Backend

Enterprise-grade modular monolith backend — microservices ready.

## Tech Stack
- Node.js + Express
- MongoDB
- Redis
- RabbitMQ
- Winston (logging)
- JWT Authentication

## Getting Started
```
npm install
npm run dev
```

## API Endpoints
Base URL: /api/v1

### Auth
- POST /api/v1/auth/register       → Register new user
- POST /api/v1/auth/login          → Login and get JWT token
- GET  /api/v1/auth/me             → Get current user (protected)

### Users
- GET    /api/v1/users             → List all users (protected)
- GET    /api/v1/users/:id         → Get user by ID (protected)
- PUT    /api/v1/users/:id         → Update user (protected)
- PATCH  /api/v1/users/:id/deactivate → Deactivate user (protected)
- DELETE /api/v1/users/:id         → Soft delete user (protected)

### Tenants
- GET    /api/v1/tenants           → List all tenants (protected)
- GET    /api/v1/tenants/:id       → Get tenant by ID (protected)
- POST   /api/v1/tenants           → Create new tenant (protected)
- PUT    /api/v1/tenants/:id       → Update tenant (protected)
- DELETE /api/v1/tenants/:id       → Soft delete tenant (protected)

## Status

### Core
- [x] Basic server running
- [x] Bootstrap — all services initialized
- [x] Tenant middleware — dynamic (Redis → DB)
- [x] Auth middleware
- [x] Error middleware
- [x] Logger middleware
- [x] MongoDB connection
- [x] Redis connection
- [x] RabbitMQ connection
- [x] Environment config
- [x] Database config
- [x] Cache config — TTL managed centrally

### Shared
- [x] AppError — custom error class
- [x] apiResponse — standard response format
- [x] Tenant constants

### Auth Module
- [x] User model
- [x] Auth repository
- [x] Auth service
- [x] Auth controller
- [x] Auth routes
- [x] Auth middleware
- [x] Global auth middleware — JWT
- [x] Register endpoint
- [x] Login endpoint
- [x] Me endpoint — protected

### Users Module
- [x] User model — isDeleted + deletedAt (soft delete)
- [x] Users repository
- [x] Users service
- [x] Users controller
- [x] Users routes — all protected
- [x] List users endpoint
- [x] Get user by ID endpoint
- [x] Update user endpoint
- [x] Deactivate user endpoint
- [x] Soft delete user endpoint

### Tenants Module
- [x] Tenant model
- [x] Tenants repository
- [x] Tenants service — Redis cache invalidation on update/delete
- [x] Tenants controller
- [x] Tenants routes — all protected
- [x] List tenants endpoint
- [x] Get tenant by ID endpoint
- [x] Create tenant endpoint
- [x] Update tenant endpoint
- [x] Soft delete tenant endpoint

### Event System
- [x] RabbitMQ producer
- [x] RabbitMQ consumer
- [x] user.created event
- [ ] order.placed event
- [ ] trade.executed event
- [ ] campaign.launched event

### Coming Soon
- [ ] Roles module — via Auth0
- [ ] Permissions module — via Auth0
- [ ] Commerce domain
- [ ] Trading domain
- [ ] Investor domain
- [ ] Corporate domain
- [ ] Careers domain
- [ ] Marketing domain
- [ ] Content domain
- [ ] Mining domain
- [ ] Luxury domain
- [ ] Connect domain
- [ ] Kafka
- [ ] Elasticsearch
- [ ] Dockerfile
- [ ] CI/CD — GitHub Actions
- [ ] Prometheus + Grafana
- [ ] Sentry

## RBAC Hierarchy
- Super Admin
- Country Admin
- Organization Admin
- User

RBAC managed via Auth0 (external).

## Multi-Tenant System
Every request resolved to tenant via hostname → Redis cache → MongoDB:
- localhost → development
- shop.baalvion.com → commerce
- ir.baalvion.com → investor
- trade.baalvion.com → trading
- careers.baalvion.com → careers
- mining.baalvion.com → mining
- luxury.baalvion.com → luxury
- marketing.baalvion.com → marketing
- connect.baalvion.com → connect
- corp.baalvion.com → corporate

## Architecture
```
Client (100+ Websites)
↓
Node.js Backend
↓
Middleware Layer (Tenant + Auth + Logging)
↓
Modules / Domains (Commerce, Trading, etc.)
↓
Infrastructure (MongoDB + Redis + RabbitMQ)
```

Route → Controller → Service → Repository → MongoDB
