const Order = require('./orders.model');

const findAllOrders = async (tenantId, userId = null) => {
  const query = { tenantId, isDeleted: false };
  if (userId) query.userId = userId;
  return await Order.find(query).sort({ createdAt: -1 });
};

const findOrderById = async (id, tenantId) => {
  return await Order.findOne({ _id: id, tenantId, isDeleted: false });
};

const createOrder = async (data) => {
  return await Order.create(data);
};

const updateOrderStatus = async (id, tenantId, status) => {
  return await Order.findOneAndUpdate(
    { _id: id, tenantId, isDeleted: false },
    { status },
    { new: true }
  );
};

const softDeleteOrder = async (id, tenantId) => {
  return await Order.findOneAndUpdate(
    { _id: id, tenantId, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );
};

module.exports = { findAllOrders, findOrderById, createOrder, updateOrderStatus, softDeleteOrder };
