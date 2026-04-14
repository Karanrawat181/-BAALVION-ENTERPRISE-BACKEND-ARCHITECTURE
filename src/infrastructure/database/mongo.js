const mongoose = require('mongoose');
const logger = require('../../shared/utils/logger');
const { MONGO_URI } = require('../../config/env');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('MongoDB connected successfully');
  } catch (err) {
    logger.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };