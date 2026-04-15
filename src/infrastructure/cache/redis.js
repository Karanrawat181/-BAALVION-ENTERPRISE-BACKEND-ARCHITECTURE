//redis.js — Redis connection

const Redis = require('ioredis');
const { redisConfig } = require('../../config/cache');
const logger = require('../../shared/utils/logger');

let client = null;

const connectRedis = async () => {
  try {
    client = new Redis(redisConfig);

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