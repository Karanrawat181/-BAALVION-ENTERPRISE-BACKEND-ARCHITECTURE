const User = require('../users/users.model');

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const findUserByEmail = async (email, tenantId) => {
  return await User.findOne({ email, tenantId });
};

const findUserById = async (id, tenantId) => {
  return await User.findOne({ _id: id, tenantId });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};