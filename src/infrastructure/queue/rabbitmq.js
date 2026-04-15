const amqp = require('amqplib');
const logger = require('../../shared/utils/logger');
const { RABBITMQ_URL } = require('../../config/env');

let connection = null;
let channel = null;

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();

    connection.on('close', () => {
      logger.warn('RabbitMQ connection closed — retrying in 5s');
      setTimeout(connectRabbitMQ, 5000);
    });

    connection.on('error', (err) => {
      logger.error('RabbitMQ error:', err.message);
    });

    logger.info('RabbitMQ connected successfully');
  } catch (err) {
    logger.error('RabbitMQ connection failed:', err.message);
    process.exit(1);
  }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };