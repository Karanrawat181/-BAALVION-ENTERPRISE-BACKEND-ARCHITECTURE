const mongoose = require('mongoose');
const { mongoConfig } = require('../../config/database');
const logger = require('../../shared/utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoConfig.uri, mongoConfig.options);
    logger.info('MongoDB connected successfully');
  } catch (err) {
    logger.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };