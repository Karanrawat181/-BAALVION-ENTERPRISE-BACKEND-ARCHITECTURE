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
```bash
npm install
npm run seed    # seed all tenants into MongoDB (required first time)
npm run dev     # start development server
```

## API Endpoints
Base URL: `/api/v1`

### Auth
- POST `/api/v1/auth/register`       → Register new user
- POST `/api/v1/auth/login`          → Login and get JWT token
- GET  `/api/v1/auth/me`             → Get current user (protected)

### Users
- GET    `/api/v1/users`                    → List all users (protected)
- GET    `/api/v1/users/:id`               → Get user by ID (protected)
- PUT    `/api/v1/users/:id`               → Update user (protected)
- PATCH  `/api/v1/users/:id/deactivate`    → Deactivate user (protected)
- DELETE `/api/v1/users/:id`               → Soft delete user (protected)

### Tenants
- GET    `/api/v1/tenants`                 → List all tenants (protected)
- GET    `/api/v1/tenants/:id`             → Get tenant by ID (protected)
- POST   `/api/v1/tenants`                 → Create new tenant (protected)
- PUT    `/api/v1/tenants/:id`             → Update tenant (protected)
- DELETE `/api/v1/tenants/:id`             → Soft delete tenant (protected)

### Commerce — Products
- GET    `/api/v1/commerce/products`               → List products (public)
- GET    `/api/v1/commerce/products/:id`           → Get product by ID (public)
- POST   `/api/v1/commerce/products`               → Create product (protected)
- PUT    `/api/v1/commerce/products/:id`           → Update product (protected)
- DELETE `/api/v1/commerce/products/:id`           → Soft delete product (protected)
- PATCH  `/api/v1/commerce/products/:id/status`    → Toggle active/inactive (protected)

### Commerce — Cart
- GET    `/api/v1/commerce/cart`                         → Get cart with total (protected)
- POST   `/api/v1/commerce/cart/items`                   → Add item to cart (protected)
- PUT    `/api/v1/commerce/cart/items/:productId`        → Update item quantity (protected)
- DELETE `/api/v1/commerce/cart/items/:productId`        → Remove item from cart (protected)
- DELETE `/api/v1/commerce/cart`                         → Clear cart (protected)

### Commerce — Orders
- GET    `/api/v1/commerce/orders`                 → List orders (protected)
- GET    `/api/v1/commerce/orders/:id`             → Get order by ID (protected)
- POST   `/api/v1/commerce/orders`                 → Place order from cart (protected)
- PATCH  `/api/v1/commerce/orders/:id/status`      → Update order status (protected)
- PATCH  `/api/v1/commerce/orders/:id/cancel`      → Cancel order (protected)

---

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
- [x] Auth middleware — JWT
- [x] Register endpoint
- [x] Login endpoint
- [x] Me endpoint — protected

### Users Module
- [x] User model — isDeleted + deletedAt (soft delete)
- [x] Users repository
- [x] Users service
- [x] Users controller
- [x] Users routes — all protected
- [x] List, Get, Update, Deactivate, Soft delete

### Tenants Module
- [x] Tenant model
- [x] Tenants repository
- [x] Tenants service — Redis cache invalidation on update/delete
- [x] Tenants controller
- [x] Tenants routes — all protected
- [x] List, Get, Create, Update, Soft delete
- [x] Seed script — `npm run seed`

### Commerce Domain
- [x] Products — CRUD + toggle status + Redis cache
- [x] Cart — add/update/remove items + computed total (price snapshot)
- [x] Orders — place from cart + status management + soft delete
- [x] order.placed event — fired via RabbitMQ on order creation
- [x] Cart cleared automatically on order placed

### Event System
- [x] RabbitMQ producer
- [x] RabbitMQ consumer
- [x] user.created event
- [x] order.placed event
- [ ] trade.executed event
- [ ] campaign.launched event

### Coming Soon — Domains
- [ ] Trading domain
- [ ] Investor domain
- [ ] Corporate domain
- [ ] Careers domain
- [ ] Marketing domain
- [ ] Content domain
- [ ] Mining domain
- [ ] Luxury domain
- [ ] Connect domain

### Coming Soon — Infrastructure
- [ ] Kafka
- [ ] Elasticsearch
- [ ] Dockerfile
- [ ] CI/CD — GitHub Actions
- [ ] Prometheus + Grafana
- [ ] Sentry

---

## Multi-Tenant System
Every request resolved via hostname → Redis cache → MongoDB:

| Hostname | Tenant ID |
|---|---|
| localhost | development |
| shop.baalvion.com | commerce |
| ir.baalvion.com | investor |
| trade.baalvion.com | trading |
| careers.baalvion.com | careers |
| mining.baalvion.com | mining |
| luxury.baalvion.com | luxury |
| marketing.baalvion.com | marketing |
| connect.baalvion.com | connect |
| corp.baalvion.com | corporate |

## RBAC Hierarchy
- Super Admin
- Country Admin
- Organization Admin
- User

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

## Database Strategy
- **Phase 1 (current):** Single MongoDB — `tenantId` field on every document
- **Phase 2:** Split databases per domain (commerce_db, trading_db, etc.)
- **Phase 3:** Read replicas, sharding, multi-region

## Scaling Plan
- **Stage 1 (current):** Single backend
- **Stage 2:** Split heavy domains into separate services
- **Stage 3:** Full microservices architecture
