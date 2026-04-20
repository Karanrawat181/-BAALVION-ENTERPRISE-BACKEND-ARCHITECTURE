const Cart = require('./cart.model');

const findCartByUser = async (userId, tenantId) => {
  return await Cart.findOne({ userId, tenantId }).populate('items.productId', 'name price');
};

const upsertCart = async (userId, tenantId, items) => {
  return await Cart.findOneAndUpdate(
    { userId, tenantId },
    { items },
    { new: true, upsert: true, runValidators: true }
  ).populate('items.productId', 'name price');
};

const clearCart = async (userId, tenantId) => {
  return await Cart.findOneAndUpdate(
    { userId, tenantId },
    { items: [] },
    { new: true }
  );
};

module.exports = { findCartByUser, upsertCart, clearCart };
