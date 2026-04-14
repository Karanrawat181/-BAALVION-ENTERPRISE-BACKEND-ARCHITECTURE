const { register, login, getMe } = require('./auth.service');
const logger = require('../../shared/utils/logger');

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const tenantId = req.tenantId;

    const result = await register({ name, email, password, tenantId });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
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

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
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

    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: result,
    });
  } catch (err) {
    logger.error(`Get profile error: ${err.message}`);
    next(err);
  }
};

module.exports = { registerUser, loginUser, getProfile };