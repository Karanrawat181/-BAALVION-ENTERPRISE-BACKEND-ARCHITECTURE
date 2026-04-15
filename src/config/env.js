module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/baalvion_dev',
  JWT_SECRET: process.env.JWT_SECRET || 'de5eb17c5d0f061b1491db2da65c89494c4e2a7f65e76d35ca5da9eba01bdd85df05ec32333894ced6391a11bcbb2bb71f30f8fc5bb25f83db55a0a39501c957',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',  
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://localhost',
};