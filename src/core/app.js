const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { tenantMiddleware } = require('../middleware/tenant.middleware');
const { errorMiddleware } = require('../middleware/error.middleware');
const { loggerMiddleware } = require('../middleware/logger.middleware');
const router = require('./router');

const app = express();

// Security
app.use(helmet());
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(morgan('dev'));

// Custom logger middleware
app.use(loggerMiddleware);

// Health check — before tenant middleware so it never needs a valid domain
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Tenant must be resolved before any route
app.use(tenantMiddleware);

// Routes
app.use('/api/v1', router);

// Global error handler — must be last
app.use(errorMiddleware);

module.exports = app;