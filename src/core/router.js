const Router = require('express');
const router = Router()

// Domain routes will be mounted here later

// Auth routes
router.use('/auth', require('../modules/auth/auth.routes'));

// Users routes
router.use('/users', require('../modules/users/users.routes'));

// Tenants routes
router.use('/tenants', require('../modules/tenants/tenants.routes'));


router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BAALVION API v1',
    tenant: req.tenantId,
  });
});


module.exports = router;