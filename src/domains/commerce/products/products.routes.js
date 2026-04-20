const router = require('express').Router();
const {
  listProducts,
  getProduct,
  createProduct,
  updateProductHandler,
  deleteProductHandler,
  toggleProductStatus,
} = require('./products.controller');
const { authenticate } = require('../../../middleware/auth.middleware');

// Public routes
router.get('/', listProducts);
router.get('/:id', getProduct);

// Protected routes
router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProductHandler);
router.delete('/:id', authenticate, deleteProductHandler);
router.patch('/:id/status', authenticate, toggleProductStatus);

module.exports = router;
