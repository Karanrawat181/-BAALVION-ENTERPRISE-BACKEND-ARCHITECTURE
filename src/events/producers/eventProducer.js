const { getChannel } = require('../../infrastructure/queue/rabbitmq');
const logger = require('../../shared/utils/logger');

const EXCHANGE = 'baalvion.events';

const publish = async (eventName, data) => {
  try {
    const channel = getChannel();
    if (!channel) throw new Error('RabbitMQ channel not ready');

    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

    const message = JSON.stringify({
      event: eventName,
      data,
      timestamp: new Date().toISOString(),
    });

    channel.publish(EXCHANGE, eventName, Buffer.from(message), {
      persistent: true,
    });

    logger.info(`Event published: ${eventName} | tenant: ${data.tenantId}`);
  } catch (err) {
    logger.error(`Failed to publish event ${eventName}:`, err.message);
  }
};

// Pre-built events — exactly as per spec
const events = {
  userCreated: (data) => publish('user.created', data),
  orderPlaced: (data) => publish('order.placed', data),
  tradeExecuted: (data) => publish('trade.executed', data),
  campaignLaunched: (data) => publish('campaign.launched', data),
};

module.exports = { publish, events };