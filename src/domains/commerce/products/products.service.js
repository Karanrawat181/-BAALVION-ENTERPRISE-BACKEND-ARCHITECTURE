const {
  findAllProducts,
  findProductById,
  createProduct,
  updateProductById,
  softDeleteProductById,
  toggleProductStatus,
} = require('./products.repository');
const { AppError } = require('../../../shared/errors/AppError');
const { getClient } = require('../../../infrastructure/cache/redis');
const { TTL } = require('../../../config/cache');
const logger = require('../../../shared/utils/logger');

const CACHE_KEY = (tenantId) => `products:${tenantId}`;

const invalidateProductsCache = async (tenantId) => {
  try {
    const redis = getClient();
    if (redis) await redis.del(CACHE_KEY(tenantId));
  } catch (err) {
    logger.error(`Cache invalidation failed: ${err.message}`);
  }
};

const getAllProducts = async (tenantId, filters) => {
  const redis = getClient();
  const cacheKey = CACHE_KEY(tenantId);

  if (redis && !Object.keys(filters).length) {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
  }

  const products = await findAllProducts(tenantId, filters);

  if (redis && !Object.keys(filters).length) {
    await redis.setex(cacheKey, TTL.PRODUCTS, JSON.stringify(products));
  }

  return products;
};

const getProductById = async (id, tenantId) => {
  const product = await findProductById(id, tenantId);
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

const createNewProduct = async (tenantId, data) => {
  const product = await createProduct({ ...data, tenantId });
  await invalidateProductsCache(tenantId);
  return product;
};

const updateProduct = async (id, tenantId, updates) => {
  delete updates.tenantId;
  delete updates.isDeleted;
  delete updates.deletedAt;

  const product = await updateProductById(id, tenantId, updates);
  if (!product) throw new AppError('Product not found', 404);
  await invalidateProductsCache(tenantId);
  return product;
};

const deleteProduct = async (id, tenantId) => {
  const product = await softDeleteProductById(id, tenantId);
  if (!product) throw new AppError('Product not found', 404);
  await invalidateProductsCache(tenantId);
  return product;
};

const setProductStatus = async (id, tenantId, isActive) => {
  const product = await toggleProductStatus(id, tenantId, isActive);
  if (!product) throw new AppError('Product not found', 404);
  await invalidateProductsCache(tenantId);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  setProductStatus,
};
