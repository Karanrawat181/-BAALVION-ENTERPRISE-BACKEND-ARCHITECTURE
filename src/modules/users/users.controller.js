const { getAllUsers, getUserById, updateUser, deactivateUser, deleteUser } = require('./users.service');
const { success } = require('../../shared/response/apiResponse');
const logger = require('../../shared/utils/logger');

const listUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers(req.tenantId);
    return success(res, users, 'Users fetched successfully');
  } catch (err) {
    logger.error(`List users error: ${err.message}`);
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id, req.tenantId);
    return success(res, user, 'User fetched successfully');
  } catch (err) {
    logger.error(`Get user error: ${err.message}`);
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req.tenantId, req.body);
    return success(res, user, 'User updated successfully');
  } catch (err) {
    logger.error(`Update user error: ${err.message}`);
    next(err);
  }
};

const deactivateUserHandler = async (req, res, next) => {
  try {
    const user = await deactivateUser(req.params.id, req.tenantId);
    return success(res, user, 'User deactivated successfully');
  } catch (err) {
    logger.error(`Deactivate user error: ${err.message}`);
    next(err);
  }
};

const deleteUserHandler = async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id, req.tenantId);
    return success(res, user, 'User deleted successfully');
  } catch (err) {
    logger.error(`Delete user error: ${err.message}`);
    next(err);
  }
};

module.exports = { listUsers, getUser, updateUserProfile, deactivateUserHandler, deleteUserHandler };
