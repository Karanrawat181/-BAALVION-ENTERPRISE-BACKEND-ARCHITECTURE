const router = require('express').Router();
const { listTenants, getTenant, createTenant, updateTenantHandler, deleteTenantHandler } = require('./tenants.controller');
const { authenticate } = require('../../middleware/auth.middleware');

// All tenant routes require authentication
router.use(authenticate);

router.get('/', listTenants);
router.get('/:id', getTenant);
router.post('/', createTenant);
router.put('/:id', updateTenantHandler);
router.delete('/:id', deleteTenantHandler);

module.exports = router;
