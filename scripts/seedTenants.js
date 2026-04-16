/*
 * seedTenants.js
 * Run once to load all tenants into MongoDB
 * Usage: node scripts/seedTenants.js
 */

const mongoose = require('mongoose');
const { MONGO_URI } = require('../src/config/env');
const Tenant = require('../src/modules/tenants/tenants.model');

const tenants = [
  { name: 'Development', tenantId: 'development', domain: 'localhost' },
  { name: 'Commerce', tenantId: 'commerce', domain: 'shop.baalvion.com' },
  { name: 'Investor', tenantId: 'investor', domain: 'ir.baalvion.com' },
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

  for (const t of tenants) {
    await Tenant.findOneAndUpdate(
      { tenantId: t.tenantId },
      t,
      { upsert: true, new: true }
    );
    console.log(`Seeded: ${t.name} (${t.domain})`);
  }

  console.log('All tenants seeded');
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
