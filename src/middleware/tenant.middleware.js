/*
 * tenant.middleware.js
 * Resolves tenantId from hostname on every request
 * Rejects unknown hostnames immediately
 */

const { TENANT_MAP } = require('../shared/constants/tenants');
const { AppError } = require('../shared/errors/AppError');

const tenantMiddleware = (req, res, next) => {
  const hostname = req.hostname;

  const tenant = TENANT_MAP[hostname];

  if (!tenant) {
    return next(new AppError(`Unknown tenant for host: ${hostname}`, 400));
  }

  req.tenantId = tenant;
  next();
};

module.exports = { tenantMiddleware };