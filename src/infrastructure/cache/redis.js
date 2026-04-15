const Redis = require('ioredis');
const logger = require('../../shared/utils/logger');
const { REDIS_HOST, REDIS_PORT } = require('../../config/env');

let client = null;

const connectRedis = async () => {
  try {
    client = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
    });

    client.on('connect', () => {
      logger.info('Redis connected successfully');
    });

    client.on('error', (err) => {
      logger.error('Redis error:', err.message);
    });

  } catch (err) {
    logger.error('Redis connection failed:', err.message);
    process.exit(1);
  }
};

const getClient = () => client;

module.exports = { connectRedis, getClient };