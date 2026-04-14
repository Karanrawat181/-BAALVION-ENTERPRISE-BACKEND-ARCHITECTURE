const logger = require('../shared/utils/logger');

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[${req.method}] ${req.path} → ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

module.exports = { errorMiddleware };