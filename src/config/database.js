const { MONGO_URI, NODE_ENV } = require('./env');

const mongoConfig = {
  uri: MONGO_URI,
  options: {
    autoIndex: NODE_ENV === 'development',
  },
};

module.exports = { mongoConfig };