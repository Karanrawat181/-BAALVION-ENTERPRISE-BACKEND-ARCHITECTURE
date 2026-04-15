/*
 * tenants.js — Tenant constants
 * Maps hostnames to tenantIds
 */

const TENANT_MAP = {
  'localhost': 'development',
  'shop.baalvion.com': 'commerce',
  'ir.baalvion.com': 'investor',
  'trade.baalvion.com': 'trading',
  'careers.baalvion.com': 'careers',
  'mining.baalvion.com': 'mining',
  'luxury.baalvion.com': 'luxury',
  'marketing.baalvion.com': 'marketing',
  'connect.baalvion.com': 'connect',
  'corp.baalvion.com': 'corporate',
};

const TENANTS = {
  DEVELOPMENT: 'development',
  COMMERCE: 'commerce',
  INVESTOR: 'investor',
  TRADING: 'trading',
  CAREERS: 'careers',
  MINING: 'mining',
  LUXURY: 'luxury',
  MARKETING: 'marketing',
  CONNECT: 'connect',
  CORPORATE: 'corporate',
};

module.exports = { TENANT_MAP, TENANTS };