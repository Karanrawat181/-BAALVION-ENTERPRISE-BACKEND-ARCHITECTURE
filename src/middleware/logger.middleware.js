const logger = require('../shared/utils/logger');

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.path} ${res.statusCode} ${duration}ms | tenant: ${req.tenantId}`);
  });

  next();
};

module.exports = { loggerMiddleware };