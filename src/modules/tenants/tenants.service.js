const {
  findAllTenants,
  findTenantById,
  findTenantByDomain,
  findTenantByTenantId,
  createTenant,
  updateTenantById,
  softDeleteTenantById,
} = require('./tenants.repository');
const { AppError } = require('../../shared/errors/AppError');
const { getClient } = require('../../infrastructure/cache/redis');
const { TTL } = require('../../config/cache');

const invalidateTenantCache = async (domain) => {
  const redis = getClient();
  if (redis && domain) await redis.del(`tenant:${domain}`);
};

const getAllTenants = async () => {
  return await findAllTenants();
};

const getTenantById = async (id) => {
  const tenant = await findTenantById(id);
  if (!tenant) throw new AppError('Tenant not found', 404);
  return tenant;
};

const createNewTenant = async (data) => {
  const existingDomain = await findTenantByDomain(data.domain);
  if (existingDomain) throw new AppError('Domain already in use', 409);

  const existingId = await findTenantByTenantId(data.tenantId);
  if (existingId) throw new AppError('Tenant ID already in use', 409);

  return await createTenant(data);
};

const updateTenant = async (id, updates) => {
  delete updates.isDeleted;
  delete updates.deletedAt;

  const tenant = await updateTenantById(id, updates);
  if (!tenant) throw new AppError('Tenant not found', 404);

  await invalidateTenantCache(tenant.domain);
  return tenant;
};

const deleteTenant = async (id) => {
  const tenant = await softDeleteTenantById(id);
  if (!tenant) throw new AppError('Tenant not found', 404);

  await invalidateTenantCache(tenant.domain);
  return tenant;
};

module.exports = { getAllTenants, getTenantById, createNewTenant, updateTenant, deleteTenant };
