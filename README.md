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
- [x] Bootstrap — all services initialized
- [x] Tenant middleware
- [x] Auth middleware
- [x] Error middleware
- [x] Logger middleware
- [x] MongoDB connection
- [x] Redis connection
- [x] RabbitMQ connection
- [x] Environment config
- [x] Database config
- [x] Cache config

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

### Event System
- [x] RabbitMQ producer
- [x] RabbitMQ consumer
- [x] user.created event
- [ ] order.placed event
- [ ] trade.executed event
- [ ] campaign.launched event

### Coming Soon
- [ ] Users module
- [ ] Roles module
- [ ] Permissions module
- [ ] Tenants module
- [ ] Commerce domain
- [ ] Trading domain
- [ ] Investor domain
- [ ] Remaining domains
- [ ] Dockerfile
- [ ] CI/CD — GitHub Actions
- [ ] Elasticsearch
- [ ] Prometheus + Grafana
- [ ] Sentry

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
- trade.baalvion.com → trading
- careers.baalvion.com → careers
- mining.baalvion.com → mining
- luxury.baalvion.com → luxury
- marketing.baalvion.com → marketing
- connect.baalvion.com → connect
- corp.baalvion.com → corporate

## Architecture
Route → Controller → Service → Repository → MongoDB