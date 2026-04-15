
// All cache settings in one place
const { REDIS_HOST, REDIS_PORT } = require('./env');

const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

// TTL values in seconds — per spec cache targets
const TTL = {
  PRODUCTS: 60 * 5,        // 5 minutes
  REPORTS: 60 * 10,        // 10 minutes
  CONTENT: 60 * 30,        // 30 minutes
  DEFAULT: 60 * 5,         // 5 minutes
};

module.exports = { redisConfig, TTL };