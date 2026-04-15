require('dotenv').config();
const app = require('./app');
const logger = require('../shared/utils/logger');
const { PORT, NODE_ENV } = require('../config/env');
const { bootstrap } = require('./bootstrap');

const startServer = async () => {
  try {
   // Initialize all services first
    await bootstrap();

    // Then start the server
    app.listen(PORT, () => {
      logger.info(`BAALVION server running on port ${PORT} [${NODE_ENV}]`);
    });
  } catch (err) {
    logger.error('Server failed to start:', err.message);
    process.exit(1);
  }
};

startServer();