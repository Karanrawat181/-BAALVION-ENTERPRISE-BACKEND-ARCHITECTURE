const User = require('./users.model');

const findAllUsers = async (tenantId) => {
  return await User.find({ tenantId, isDeleted: { $ne: true } }).select('-password');
};

const findUserById = async (id, tenantId) => {
  return await User.findOne({ _id: id, tenantId, isDeleted: { $ne: true } }).select('-password');
};

const updateUserById = async (id, tenantId, updates) => {
  return await User.findOneAndUpdate(
    { _id: id, tenantId, isDeleted: false },
    updates,
    { new: true, runValidators: true }
  ).select('-password');
};

const deactivateUserById = async (id, tenantId) => {
  return await User.findOneAndUpdate(
    { _id: id, tenantId, isDeleted: false },
    { isActive: false },
    { new: true }
  ).select('-password');
};

const softDeleteUserById = async (id, tenantId) => {
  return await User.findOneAndUpdate(
    { _id: id, tenantId, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  ).select('-password');
};

module.exports = {
  findAllUsers,
  findUserById,
  updateUserById,
  deactivateUserById,
  softDeleteUserById,
};
