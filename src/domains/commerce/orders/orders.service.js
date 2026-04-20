const { findAllOrders, findOrderById, createOrder, updateOrderStatus, softDeleteOrder } = require('./orders.repository');
const { findCartByUser } = require('../cart/cart.repository');
const { clearCart } = require('../cart/cart.repository');
const { AppError } = require('../../../shared/errors/AppError');
const { events } = require('../../../events/producers/eventProducer');

const getAllOrders = async (tenantId, userId) => {
  return await findAllOrders(tenantId, userId);
};

const getOrderById = async (id, tenantId) => {
  const order = await findOrderById(id, tenantId);
  if (!order) throw new AppError('Order not found', 404);
  return order;
};

const placeOrder = async (userId, tenantId) => {
  const cart = await findCartByUser(userId, tenantId);
  if (!cart || !cart.items.length) throw new AppError('Cart is empty', 400);

  const items = cart.items.map((i) => ({
    productId: i.productId._id || i.productId,
    name: i.productId.name || 'Product',
    quantity: i.quantity,
    price: i.price,
  }));
  let orderDate = new Date()

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = await createOrder({ tenantId, userId, items, total ,orderDate});

  await clearCart(userId, tenantId);

  await events.orderPlaced({ orderId: order._id, userId, tenantId, total });

  return order;
};

const updateStatus = async (id, tenantId, status) => {
  const order = await updateOrderStatus(id, tenantId, status);
  if (!order) throw new AppError('Order not found', 404);
  return order;
};

const cancelOrder = async (id, tenantId) => {
  const order = await findOrderById(id, tenantId);
  if (!order) throw new AppError('Order not found', 404);
  if (['delivered', 'cancelled'].includes(order.status)) {
    throw new AppError(`Cannot cancel a ${order.status} order`, 400);
  }
  return await updateOrderStatus(id, tenantId, 'cancelled');
};

module.exports = { getAllOrders, getOrderById, placeOrder, updateStatus, cancelOrder };
