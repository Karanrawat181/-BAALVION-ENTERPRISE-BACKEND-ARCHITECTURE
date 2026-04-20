const router = require('express').Router();
const { listOrders, getOrder, placeOrderHandler, updateStatusHandler, cancelOrderHandler } = require('./orders.controller');
const { authenticate } = require('../../../middleware/auth.middleware');

// All order routes require authentication
router.use(authenticate);

router.get('/', listOrders);
router.get('/:id', getOrder);
router.post('/', placeOrderHandler);
router.patch('/:id/status', updateStatusHandler);
router.patch('/:id/cancel', cancelOrderHandler);

module.exports = router;
