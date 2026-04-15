const { getChannel } = require('../../infrastructure/queue/rabbitmq');
const logger = require('../../shared/utils/logger');

const EXCHANGE = 'baalvion.events';

const subscribe = async (eventPattern, queueName, handler) => {
  try {
    const channel = getChannel();
    if (!channel) throw new Error('RabbitMQ channel not ready');

    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

    const q = await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(q.queue, EXCHANGE, eventPattern);

    channel.consume(q.queue, (msg) => {
      if (!msg) return;
      try {
        const content = JSON.parse(msg.content.toString());
        logger.info(`Event received: ${content.event} | tenant: ${content.data.tenantId}`);
        handler(content);
        channel.ack(msg);
      } catch (err) {
        logger.error('Event processing error:', err.message);
        channel.nack(msg, false, false);
      }
    });

    logger.info(`Subscribed to: ${eventPattern} → queue: ${queueName}`);
  } catch (err) {
    logger.error('Subscribe error:', err.message);
  }
};

module.exports = { subscribe };