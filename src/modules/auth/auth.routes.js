const { Router } = require('express');
const { registerUser, loginUser, getProfile } = require('./auth.controller');
const { validateRegister, validateLogin } = require('./auth.middleware');
const { authenticate } = require('../../middleware/auth.middleware');

const router = Router();

// Public routes
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

// Protected route — must be logged in
router.get('/me', authenticate, getProfile);

module.exports = router;