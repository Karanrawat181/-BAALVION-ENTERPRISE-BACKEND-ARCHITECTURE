const Tenant = require('./tenants.model');

const findAllTenants = async () => {
  return await Tenant.find({ isDeleted: false });
};

const findTenantById = async (id) => {
  return await Tenant.findOne({ _id: id, isDeleted: false });
};

const findTenantByDomain = async (domain) => {
  return await Tenant.findOne({ domain, isActive: true, isDeleted: false });
};

const findTenantByTenantId = async (tenantId) => {
  return await Tenant.findOne({ tenantId, isDeleted: false });
};

const createTenant = async (data) => {
  return await Tenant.create(data);
};

const updateTenantById = async (id, updates) => {
  return await Tenant.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updates,
    { new: true, runValidators: true }
  );
};

const softDeleteTenantById = async (id) => {
  return await Tenant.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );
};

module.exports = {
  findAllTenants,
  findTenantById,
  findTenantByDomain,
  findTenantByTenantId,
  createTenant,
  updateTenantById,
  softDeleteTenantById,
};
