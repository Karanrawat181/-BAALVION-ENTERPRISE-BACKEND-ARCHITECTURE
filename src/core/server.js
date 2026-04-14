require('dotenv').config();
const app = require('./app');
const logger = require('../shared/utils/logger');
const { PORT, NODE_ENV } = require('../config/env');


app.listen(PORT, () => {
  logger.info(`server running on port ${PORT} [${NODE_ENV}]`);
});