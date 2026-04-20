const mongoose = require('mongoose');
const { MONGO_URI } = require('../src/config/env');

const tenants = [
  { name: 'Development', tenantId: 'development', domain: 'localhost' },
  { name: 'Commerce', tenantId: 'commerce', domain: 'shop.baalvion.com' },
  { name: 'Investor Relations', tenantId: 'investor', domain: 'ir.baalvion.com' },
  { name: 'Trading', tenantId: 'trading', domain: 'trade.baalvion.com' },
  { name: 'Careers', tenantId: 'careers', domain: 'careers.baalvion.com' },
  { name: 'Mining', tenantId: 'mining', domain: 'mining.baalvion.com' },
  { name: 'Luxury', tenantId: 'luxury', domain: 'luxury.baalvion.com' },
  { name: 'Marketing', tenantId: 'marketing', domain: 'marketing.baalvion.com' },
  { name: 'Connect', tenantId: 'connect', domain: 'connect.baalvion.com' },
  { name: 'Corporate', tenantId: 'corporate', domain: 'corp.baalvion.com' },
];

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const Tenant = require('../src/modules/tenants/tenants.model');

  for (const t of tenants) {
    await Tenant.findOneAndUpdate(
      { tenantId: t.tenantId },
      { ...t, isActive: true, isDeleted: false, deletedAt: null },
      { upsert: true, new: true, runValidators: true }
    );
    console.log(`Upserted: ${t.tenantId}`);
  }

  console.log('All tenants seeded successfully.');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
