# BAALVION Enterprise Backend

Enterprise-grade modular monolith backend — microservices ready.

## Tech Stack
- Node.js + Express
- MongoDB
- Redis (coming soon)
- RabbitMQ (coming soon)
- Winston (logging)
- JWT Authentication

## Getting Started
npm install
npm run dev

## API Endpoints
Base URL: /api/v1

### Auth
- POST /api/v1/auth/register  → Register new user
- POST /api/v1/auth/login     → Login and get JWT token
- GET  /api/v1/auth/me        → Get current user (protected)

## Status

### Core
- [x] Basic server running
- [x] Tenant middleware
- [x] Error middleware
- [x] Logger (Winston)
- [x] MongoDB connection
- [x] Environment config

### Auth Module
- [x] User model
- [x] Auth repository
- [x] Auth service
- [x] Auth controller
- [x] Auth routes
- [x] Auth middleware (validation)
- [x] Global auth middleware (JWT)
- [x] Register endpoint
- [x] Login endpoint
- [x] Me endpoint (in progress)

### Coming Soon
- [x] Redis caching
- [x] RabbitMQ event system
- [ ] Users module
- [ ] Roles module
- [ ] Permissions module
- [ ] Tenants module
- [ ] Commerce domain
- [ ] Trading domain
- [ ] Investor domain
- [ ] All other domains

## RBAC Hierarchy
- Super Admin
- Country Admin
- Organization Admin
- User

## Multi-Tenant System
Every request resolved to tenant via hostname:
- localhost → development
- shop.baalvion.com → commerce
- ir.baalvion.com → investor