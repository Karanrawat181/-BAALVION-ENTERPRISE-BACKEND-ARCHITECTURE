const { getAllOrders, getOrderById, placeOrder, updateStatus, cancelOrder } = require('./orders.service');
const { success } = require('../../../shared/response/apiResponse');
const logger = require('../../../shared/utils/logger');

const listOrders = async (req, res, next) => {
  try {
    const orders = await getAllOrders(req.tenantId, req.user.userId);
    return success(res, orders, 'Orders fetched successfully');
  } catch (err) {
    logger.error(`List orders error: ${err.message}`);
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id, req.tenantId);
    return success(res, order, 'Order fetched successfully');
  } catch (err) {
    logger.error(`Get order error: ${err.message}`);
    next(err);
  }
};

const placeOrderHandler = async (req, res, next) => {
  try {
    const order = await placeOrder(req.user.userId, req.tenantId);
    return success(res, order, 'Order placed successfully', 201);
  } catch (err) {
    logger.error(`Place order error: ${err.message}`);
    next(err);
  }
};

const updateStatusHandler = async (req, res, next) => {
  try {
    const order = await updateStatus(req.params.id, req.tenantId, req.body.status);
    return success(res, order, 'Order status updated');
  } catch (err) {
    logger.error(`Update order status error: ${err.message}`);
    next(err);
  }
};

const cancelOrderHandler = async (req, res, next) => {
  try {
    const order = await cancelOrder(req.params.id, req.tenantId);
    return success(res, order, 'Order cancelled successfully');
  } catch (err) {
    logger.error(`Cancel order error: ${err.message}`);
    next(err);
  }
};

module.exports = { listOrders, getOrder, placeOrderHandler, updateStatusHandler, cancelOrderHandler };
