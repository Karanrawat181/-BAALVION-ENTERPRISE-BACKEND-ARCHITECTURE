const mongoose = require('mongoose');
const { MONGO_URI } = require('../src/config/env');

const tenants = [
  {
    name: 'Core',
    tenantId: 'core',
    domains: ['baalvion.com', 'api.baalvion.com'],
  },
  {
    name: 'Corporate',
    tenantId: 'corporate',
    domains: ['about.baalvion.com', 'baalviongroup.com'],
  },
  {
    name: 'Commerce',
    tenantId: 'commerce',
    domains: ['amarisemaisonavenue.com', 'shop.baalvionstack.com'],
  },
  {
    name: 'Careers',
    tenantId: 'careers',
    domains: ['jobs.baalvion.com', 'careers.baalvion.com'],
  },
  {
    name: 'Content',
    tenantId: 'content',
    domains: ['imperialpedia.com', 'market.baalvion.com', 'lawelitenetwork.com'],
  },
  {
    name: 'SaaS',
    tenantId: 'saas',
    domains: ['controlthemarket.com', 'baalvionstack.com'],
  },
  {
    name: 'Connect',
    tenantId: 'connect',
    domains: ['connect.baalvion.com', 'network.baalvion.com'],
  },
  {
    name: 'Investor Relations',
    tenantId: 'investor',
    domains: ['ir.baalvion.com', 'investors.baalviongroup.com'],
  },
  {
    name: 'Mining',
    tenantId: 'mining',
    domains: ['mining.baalvion.com', 'mine.baalvionstack.com'],
  },
  {
    name: 'Admin',
    tenantId: 'admin',
    domains: ['dashboard.baalvion.com', 'admin.baalvion.com'],
  },
  {
    name: 'Trading',
    tenantId: 'trading',
    domains: ['marketunderworld.com', 'trade.baalvion.com'],
  },
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
