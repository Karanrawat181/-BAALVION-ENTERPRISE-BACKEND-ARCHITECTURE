const { findCartByUser, upsertCart, clearCart } = require('./cart.repository');
const { findProductById } = require('../products/products.repository');
const { AppError } = require('../../../shared/errors/AppError');

const getProductId = (item) =>
  item.productId._id ? item.productId._id.toString() : item.productId.toString();

const computeTotal = (items) =>
  parseFloat(items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2));

const withTotal = (cart) => {
  const cartObj = cart.toObject ? cart.toObject() : cart;
  cartObj.total = computeTotal(cartObj.items);
  return cartObj;
};

const getCart = async (userId, tenantId) => {
  const cart = await findCartByUser(userId, tenantId);
  if (!cart) return { userId, tenantId, items: [], total: 0 };
  return withTotal(cart);
};

const addToCart = async (userId, tenantId, productId, quantity) => {
  const product = await findProductById(productId, tenantId);
  if (!product) throw new AppError('Product not found', 404);
  if (!product.isActive) throw new AppError('Product is not available', 400);

  const cart = await findCartByUser(userId, tenantId);
  const items = cart ? [...cart.items] : [];

  const existingIndex = items.findIndex((i) => getProductId(i) === productId);
  if (existingIndex >= 0) {
    items[existingIndex].quantity += quantity;
  } else {
    items.push({ productId, quantity, price: product.price });
  }

  const updated = await upsertCart(userId, tenantId, items);
  return withTotal(updated);
};

const updateCartItem = async (userId, tenantId, productId, quantity) => {
  const cart = await findCartByUser(userId, tenantId);
  if (!cart) throw new AppError('Cart not found', 404);

  const items = cart.items.map((i) =>
    getProductId(i) === productId
      ? { ...i.toObject(), quantity }
      : i.toObject()
  );

  const updated = await upsertCart(userId, tenantId, items);
  return withTotal(updated);
};

const removeFromCart = async (userId, tenantId, productId) => {
  const cart = await findCartByUser(userId, tenantId);
  if (!cart) throw new AppError('Cart not found', 404);

  const items = cart.items
    .filter((i) => getProductId(i) !== productId)
    .map((i) => i.toObject());

  const updated = await upsertCart(userId, tenantId, items);
  return withTotal(updated);
};

const emptyCart = async (userId, tenantId) => {
  return await clearCart(userId, tenantId);
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, emptyCart };
