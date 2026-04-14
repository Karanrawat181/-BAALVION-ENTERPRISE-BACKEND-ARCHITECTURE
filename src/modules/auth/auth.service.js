const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/env');
const { createUser, findUserByEmail, findUserById } = require('./auth.repository');
const logger = require('../../shared/utils/logger');

// creates JWT with userId, tenantId, role
const generateToken = (userId, tenantId, role) => {
  return jwt.sign(
    { userId, tenantId, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// checks if user exists, creates user, returns token
const register = async (userData) => {
  const { name, email, password, tenantId } = userData;

  // Check if user already exists in this tenant
  const existingUser = await findUserByEmail(email, tenantId);
  if (existingUser) {
    throw new Error('User already exists in this tenant');
  }

  // Create new user
  const user = await createUser({ name, email, password, tenantId });
  logger.info(`New user registered: ${email} | tenant: ${tenantId}`);

  // Generate token
  const token = generateToken(user._id, tenantId, user.role);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    },
  };
};

// finds user, verifies password, returns token
const login = async (email, password, tenantId) => {
  // Find user by email and tenantId
  const user = await findUserByEmail(email, tenantId);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if user is active
  if (!user.isActive) {
    throw new Error('Account is disabled');
  }

  // Verify password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  logger.info(`User logged in: ${email} | tenant: ${tenantId}`);

  // Generate token
  const token = generateToken(user._id, tenantId, user.role);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    },
  };
};

// returns current user profile
const getMe = async (userId, tenantId) => {
  const user = await findUserById(userId, tenantId);
  if (!user) {
    throw new Error('User not found');
  }
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
  };
};

module.exports = { register, login, getMe };