const { getCart, addToCart, updateCartItem, removeFromCart, emptyCart } = require('./cart.service');
const { success } = require('../../../shared/response/apiResponse');
const logger = require('../../../shared/utils/logger');

const getCartHandler = async (req, res, next) => {
  try {
    const cart = await getCart(req.user.userId, req.tenantId);
    return success(res, cart, 'Cart fetched successfully');
  } catch (err) {
    logger.error(`Get cart error: ${err.message}`);
    next(err);
  }
};

const addItemHandler = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await addToCart(req.user.userId, req.tenantId, productId, quantity);
    return success(res, cart, 'Item added to cart');
  } catch (err) {
    logger.error(`Add to cart error: ${err.message}`);
    next(err);
  }
};

const updateItemHandler = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await updateCartItem(req.user.userId, req.tenantId, req.params.productId, quantity);
    return success(res, cart, 'Cart item updated');
  } catch (err) {
    logger.error(`Update cart item error: ${err.message}`);
    next(err);
  }
};

const removeItemHandler = async (req, res, next) => {
  try {
    const cart = await removeFromCart(req.user.userId, req.tenantId, req.params.productId);
    return success(res, cart, 'Item removed from cart');
  } catch (err) {
    logger.error(`Remove cart item error: ${err.message}`);
    next(err);
  }
};

const clearCartHandler = async (req, res, next) => {
  try {
    const cart = await emptyCart(req.user.userId, req.tenantId);
    return success(res, cart, 'Cart cleared');
  } catch (err) {
    logger.error(`Clear cart error: ${err.message}`);
    next(err);
  }
};

module.exports = { getCartHandler, addItemHandler, updateItemHandler, removeItemHandler, clearCartHandler };
