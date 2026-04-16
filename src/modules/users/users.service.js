const {
  findAllUsers,
  findUserById,
  updateUserById,
  deactivateUserById,
  softDeleteUserById,
} = require('./users.repository');
const { AppError } = require('../../shared/errors/AppError');

const getAllUsers = async (tenantId) => {
  return await findAllUsers(tenantId);
};

const getUserById = async (id, tenantId) => {
  const user = await findUserById(id, tenantId);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

const updateUser = async (id, tenantId, updates) => {
  delete updates.password;
  delete updates.tenantId;
  delete updates.isDeleted;
  delete updates.deletedAt;

  const user = await updateUserById(id, tenantId, updates);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

const deactivateUser = async (id, tenantId) => {
  const user = await deactivateUserById(id, tenantId);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

const deleteUser = async (id, tenantId) => {
  const user = await softDeleteUserById(id, tenantId);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

module.exports = { getAllUsers, getUserById, updateUser, deactivateUser, deleteUser };
