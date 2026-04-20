const mongoose = require('mongoose');
const { MONGO_URI } = require('../src/config/env');

const tenants = [
  {
    name: 'Core',
    tenantId: 'core',
    description: 'Main BAALVION platform and API gateway',
    domains: ['baalvion.com', 'api.baalvion.com'],
  },
  {
    name: 'Corporate',
    tenantId: 'corporate',
    description: 'Corporate identity, group information and branding',
    domains: ['about.baalvion.com', 'baalviongroup.com'],
  },
  {
    name: 'Commerce',
    tenantId: 'commerce',
    description: 'E-commerce and luxury retail storefronts',
    domains: ['amarisemaisonavenue.com', 'shop.baalvionstack.com'],
  },
  {
    name: 'Careers',
    tenantId: 'careers',
    description: 'Job listings, applications and hiring pipeline',
    domains: ['jobs.baalvion.com', 'careers.baalvion.com'],
  },
  {
    name: 'Content',
    tenantId: 'content',
    description: 'Media, editorial, legal and knowledge platforms',
    domains: ['imperialpedia.com', 'market.baalvion.com', 'lawelitenetwork.com'],
  },
  {
    name: 'SaaS',
    tenantId: 'saas',
    description: 'Software products and developer tools',
    domains: ['controlthemarket.com', 'baalvionstack.com'],
  },
  {
    name: 'Connect',
    tenantId: 'connect',
    description: 'Professional networking and community platform',
    domains: ['connect.baalvion.com', 'network.baalvion.com'],
  },
  {
    name: 'Investor Relations',
    tenantId: 'investor',
    description: 'Investor portfolios, reports and relations',
    domains: ['ir.baalvion.com', 'investors.baalviongroup.com'],
  },
  {
    name: 'Mining',
    tenantId: 'mining',
    description: 'Mining operations and resource management',
    domains: ['mining.baalvion.com', 'mine.baalvionstack.com'],
  },
  {
    name: 'Admin',
    tenantId: 'admin',
    description: 'Internal admin dashboard and system management',
    domains: ['dashboard.baalvion.com', 'admin.baalvion.com'],
  },
  {
    name: 'Trading',
    tenantId: 'trading',
    description: 'Market trading, signals and financial tools',
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
