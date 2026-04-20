const {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  setProductStatus,
} = require('./products.service');
const { success } = require('../../../shared/response/apiResponse');
const logger = require('../../../shared/utils/logger');

const listProducts = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.isActive !== undefined) filters.isActive = req.query.isActive === 'true';

    const products = await getAllProducts(req.tenantId, filters);
    return success(res, products, 'Products fetched successfully');
  } catch (err) {
    logger.error(`List products error: ${err.message}`);
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id, req.tenantId);
    return success(res, product, 'Product fetched successfully');
  } catch (err) {
    logger.error(`Get product error: ${err.message}`);
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await createNewProduct(req.tenantId, req.body);
    return success(res, product, 'Product created successfully', 201);
  } catch (err) {
    logger.error(`Create product error: ${err.message}`);
    next(err);
  }
};

const updateProductHandler = async (req, res, next) => {
  try {
    const product = await updateProduct(req.params.id, req.tenantId, req.body);
    return success(res, product, 'Product updated successfully');
  } catch (err) {
    logger.error(`Update product error: ${err.message}`);
    next(err);
  }
};

const deleteProductHandler = async (req, res, next) => {
  try {
    const product = await deleteProduct(req.params.id, req.tenantId);
    return success(res, product, 'Product deleted successfully');
  } catch (err) {
    logger.error(`Delete product error: ${err.message}`);
    next(err);
  }
};

const toggleProductStatus = async (req, res, next) => {
  try {
    const isActive = req.body.isActive;
    if (typeof isActive !== 'boolean') {
      return next(new (require('../../../shared/errors/AppError').AppError)('isActive must be a boolean', 400));
    }
    const product = await setProductStatus(req.params.id, req.tenantId, isActive);
    return success(res, product, `Product ${isActive ? 'activated' : 'deactivated'} successfully`);
  } catch (err) {
    logger.error(`Toggle product status error: ${err.message}`);
    next(err);
  }
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProductHandler,
  deleteProductHandler,
  toggleProductStatus,
};
