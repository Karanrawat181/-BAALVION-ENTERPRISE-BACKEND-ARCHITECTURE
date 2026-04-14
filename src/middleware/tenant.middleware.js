const TENANT_MAP = {
  'localhost': 'development',
  'shop.baalvion.com': 'commerce',
  'ir.baalvion.com': 'investor'
};

const tenantMiddleware = (req, res, next) => {
  const hostname = req.hostname;

  const tenant = TENANT_MAP[hostname];

  if (!tenant) {
    return res.status(400).json({
      success: false,
      message: `Unknown tenant for host: ${hostname}`,
    });
  }

  req.tenantId = tenant;
  next();
};

module.exports = { tenantMiddleware };