/**
 * @fileoverview Pricing plan data configuration
 * @module entities/pricing-card/model
 */

import type { PricingPlan } from './types';

/**
 * Free Solo plan configuration
 */
export const freeSoloPlan: PricingPlan = {
  variant: 'freeSolo',
  planType: 'solo',
  name: 'Free Solo',
  description: 'Perfect for getting started',
  priceMonthly: '$0',
  priceAnnual: '$0',
  period: '/month',
  users: '1 contractor + 1 employee',
  cta: 'Join Waitlist',
  ctaLink: '/signup?plan=free',
  features: [
    '3 Jobs/month',
    '10 Estimates/month',
    '25 Customers',
    '50 Notifications/month',
  ],
  excluded: ['SMS Messaging', 'GPS Routing'],
};

/**
 * Solo Basic plan configuration
 */
export const soloBasicPlan: PricingPlan = {
  variant: 'soloBasic',
  planType: 'solo',
  name: 'Solo Basic',
  description: 'For individual contractors',
  priceMonthly: '$49',
  priceAnnual: '$39',
  period: '/month',
  annualBilling: 'Billed annually at $468',
  users: '1 contractor + 6 employees',
  cta: 'Join Waitlist',
  ctaLink: '/signup?plan=solo_basic',
  features: [
    '50 Jobs/month',
    '25 Estimates/month',
    '100 Customers',
    '100 SMS/month',
    'Basic Scheduling',
  ],
  excluded: ['GPS Routing'],
};

/**
 * Solo Pro plan configuration (Featured)
 */
export const soloProPlan: PricingPlan = {
  variant: 'soloPro',
  planType: 'solo',
  name: 'Solo Pro',
  description: 'Full-featured for solos',
  priceMonthly: '$99',
  priceAnnual: '$79',
  period: '/month',
  annualBilling: 'Billed annually at $948',
  users: '1 contractor + unlimited employees',
  cta: 'Join Waitlist',
  ctaLink: '/signup?plan=solo_pro',
  badge: 'MOST POPULAR',
  isFeatured: true,
  features: [
    'Unlimited Jobs',
    'Unlimited Estimates',
    'Unlimited Customers',
    '500 SMS/month',
    'GPS & Route Optimization',
    'Advanced Analytics',
  ],
};

/**
 * Team Basic plan configuration
 */
export const teamBasicPlan: PricingPlan = {
  variant: 'teamBasic',
  planType: 'team',
  name: 'Team Basic',
  description: 'For small teams',
  priceMonthly: '$199',
  priceAnnual: '$159',
  period: '/month',
  annualBilling: 'Billed annually at $1,908',
  users: '3 contractors + unlimited employees',
  cta: 'Join Waitlist',
  ctaLink: '/signup?plan=team_basic',
  features: [
    '200 Jobs/month',
    '100 Estimates/month',
    '500 Customers',
    '200 SMS/month',
    'Team Scheduling',
    'Basic Reports',
  ],
  excluded: ['Custom Branding', 'API Access'],
};

/**
 * Team Pro plan configuration (Featured)
 */
export const teamProPlan: PricingPlan = {
  variant: 'teamPro',
  planType: 'team',
  name: 'Team Pro',
  description: 'For growing teams',
  priceMonthly: '$399',
  priceAnnual: '$319',
  period: '/month',
  annualBilling: 'Billed annually at $3,828',
  users: '10 contractors + unlimited employees',
  cta: 'Join Waitlist',
  ctaLink: '/signup?plan=team_pro',
  badge: 'BEST VALUE',
  isFeatured: true,
  features: [
    'Unlimited Jobs',
    'Unlimited Estimates',
    'Unlimited Customers',
    '1,000 SMS/month',
    'Advanced Team Features',
    'Custom Branding',
    'Priority Support',
  ],
  excluded: ['Dedicated Account Manager'],
};

/**
 * Enterprise plan configuration
 */
export const enterprisePlan: PricingPlan = {
  variant: 'enterprise',
  planType: 'team',
  name: 'Enterprise',
  description: 'Custom solution',
  priceMonthly: 'Custom',
  priceAnnual: null,
  users: 'Unlimited everything',
  cta: 'Join Waitlist',
  ctaLink: '/contact',
  isEnterprise: true,
  features: [
    'Unlimited Everything',
    'Unlimited SMS',
    'API Access',
    'Custom Integration',
    'Dedicated Account Manager',
    'SLA Guarantee',
    'White Label Option',
  ],
};

/**
 * All solo plans
 */
export const soloPlans: PricingPlan[] = [
  freeSoloPlan,
  soloBasicPlan,
  soloProPlan,
];

/**
 * All team plans
 */
export const teamPlans: PricingPlan[] = [
  teamBasicPlan,
  teamProPlan,
  enterprisePlan,
];

/**
 * All pricing plans
 */
export const allPlans: PricingPlan[] = [...soloPlans, ...teamPlans];
