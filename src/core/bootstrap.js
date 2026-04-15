const { connectDB } = require('../infrastructure/database/mongo');
const { connectRedis } = require('../infrastructure/cache/redis');
const { connectRabbitMQ } = require('../infrastructure/queue/rabbitmq');
const logger = require('../shared/utils/logger');

const bootstrap = async () => {
  try {
    // Step 1 — Connect MongoDB
    await connectDB();
    logger.info('MongoDB initialized');

    // Step 2 — Connect Redis
    await connectRedis();
    logger.info('Redis initialized');

    // Step 3 — Connect RabbitMQ
    await connectRabbitMQ();
    logger.info('RabbitMQ initialized');

    logger.info('All services initialized successfully');
  } catch (err) {
    logger.error('Bootstrap failed:', err.message);
    process.exit(1);
  }
};

module.exports = { bootstrap };