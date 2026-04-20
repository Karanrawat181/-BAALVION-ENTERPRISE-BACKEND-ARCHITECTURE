const router = require('express').Router();
const { getCartHandler, addItemHandler, updateItemHandler, removeItemHandler, clearCartHandler } = require('./cart.controller');
const { authenticate } = require('../../../middleware/auth.middleware');

// All cart routes require authentication
router.use(authenticate);

router.get('/', getCartHandler);
router.post('/items', addItemHandler);
router.put('/items/:productId', updateItemHandler);
router.delete('/items/:productId', removeItemHandler);
router.delete('/', clearCartHandler);

module.exports = router;
