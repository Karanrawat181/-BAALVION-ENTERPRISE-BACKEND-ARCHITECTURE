const { register, login, getMe } = require('./auth.service');
const logger = require('../../shared/utils/logger');
const { success } = require('../../shared/response/apiResponse');

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const tenantId = req.tenantId;

    const result = await register({ name, email, password, tenantId });

    return success(res, result, 'User registered successfully', 201);
  } catch (err) {
    logger.error(`Register error: ${err.message}`);
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const tenantId = req.tenantId;

    const result = await login(email, password, tenantId);

    return success(res, result, 'Login successful', 200);
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const tenantId = req.tenantId;

    const result = await getMe(userId, tenantId);

    return success(res, result, 'Profile fetched successfully');
  } catch (err) {
    logger.error(`Get profile error: ${err.message}`);
    next(err);
  }
};

module.exports = { registerUser, loginUser, getProfile };