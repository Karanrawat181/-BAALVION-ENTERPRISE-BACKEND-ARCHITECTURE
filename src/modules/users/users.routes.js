const router = require('express').Router();
const { listUsers, getUser, updateUserProfile, deactivateUserHandler, deleteUserHandler } = require('./users.controller');
const { authenticate } = require('../../middleware/auth.middleware');

// All users routes require authentication
router.use(authenticate);

router.get('/', listUsers);
router.get('/:id', getUser);
router.put('/:id', updateUserProfile);
router.patch('/:id/deactivate', deactivateUserHandler);
router.delete('/:id', deleteUserHandler);

module.exports = router;
