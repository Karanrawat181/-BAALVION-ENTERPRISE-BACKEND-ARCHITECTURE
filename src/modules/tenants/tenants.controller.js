const { getAllTenants, getTenantById, createNewTenant, updateTenant, deleteTenant } = require('./tenants.service');
const { success } = require('../../shared/response/apiResponse');
const logger = require('../../shared/utils/logger');

const listTenants = async (req, res, next) => {
  try {
    const tenants = await getAllTenants();
    return success(res, tenants, 'Tenants fetched successfully');
  } catch (err) {
    logger.error(`List tenants error: ${err.message}`);
    next(err);
  }
};

const getTenant = async (req, res, next) => {
  try {
    const tenant = await getTenantById(req.params.id);
    return success(res, tenant, 'Tenant fetched successfully');
  } catch (err) {
    logger.error(`Get tenant error: ${err.message}`);
    next(err);
  }
};

const createTenant = async (req, res, next) => {
  try {
    const tenant = await createNewTenant(req.body);
    return success(res, tenant, 'Tenant created successfully', 201);
  } catch (err) {
    logger.error(`Create tenant error: ${err.message}`);
    next(err);
  }
};

const updateTenantHandler = async (req, res, next) => {
  try {
    const tenant = await updateTenant(req.params.id, req.body);
    return success(res, tenant, 'Tenant updated successfully');
  } catch (err) {
    logger.error(`Update tenant error: ${err.message}`);
    next(err);
  }
};

const deleteTenantHandler = async (req, res, next) => {
  try {
    const tenant = await deleteTenant(req.params.id);
    return success(res, tenant, 'Tenant deleted successfully');
  } catch (err) {
    logger.error(`Delete tenant error: ${err.message}`);
    next(err);
  }
};

module.exports = { listTenants, getTenant, createTenant, updateTenantHandler, deleteTenantHandler };
