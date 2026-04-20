const router = require('express').Router();

router.use('/products', require('./products/products.routes'));
router.use('/cart', require('./cart/cart.routes'));
router.use('/orders', require('./orders/orders.routes'));

module.exports = router;
