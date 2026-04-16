/*
 * tenant.middleware.js
 * Resolves tenantId from hostname on every request
 * Flow: Redis cache → MongoDB → reject if not found
 */

const { AppError } = require('../shared/errors/AppError');
const { getClient } = require('../infrastructure/cache/redis');
const { findTenantByDomain } = require('../modules/tenants/tenants.repository');
const { TTL } = require('../config/cache');

const tenantMiddleware = async (req, res, next) => {
  try {
    const domain = req.hostname;
    const redis = getClient();
    const cacheKey = `tenant:${domain}`;

    // Step 1 — check Redis
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        req.tenantId = cached;
        return next();
      }
    }

    // Step 2 — check DB
    const tenant = await findTenantByDomain(domain);

    if (!tenant) {
      return next(new AppError(`Unknown tenant for host: ${domain}`, 400));
    }

    // Step 3 — cache it for next time
    if (redis) {
      await redis.set(cacheKey, tenant.tenantId, 'EX', TTL.TENANT);
    }

    req.tenantId = tenant.tenantId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { tenantMiddleware };
