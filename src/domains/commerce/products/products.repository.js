const Product = require('./products.model');

const findAllProducts = async (tenantId, filters = {}) => {
  const query = { tenantId, isDeleted: false };
  if (filters.isActive !== undefined) query.isActive = filters.isActive;
  return await Product.find(query).sort({ createdAt: -1 });
};

const findProductById = async (id, tenantId) => {
  return await Product.findOne({ _id: id, tenantId, isDeleted: false });
};

const createProduct = async (data) => {
  return await Product.create(data);
};

const updateProductById = async (id, tenantId, updates) => {
  return await Product.findOneAndUpdate(
    { _id: id, tenantId, isDeleted: false },
    updates,
    { new: true, runValidators: true }
  ).populate('categoryId', 'name');
};

const softDeleteProductById = async (id, tenantId) => {
  return await Product.findOneAndUpdate(
    { _id: id, tenantId, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );
};

const toggleProductStatus = async (id, tenantId, isActive) => {
  return await Product.findOneAndUpdate(
    { _id: id, tenantId, isDeleted: false },
    { isActive },
    { new: true }
  );
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProductById,
  softDeleteProductById,
  toggleProductStatus,
};
