/**
 * Pricing Card Types
 * @module entities/pricing-card/model
 *
 * ✅ DIAMOND STANDARD: Entities Layer Types
 *
 * Type definitions for pricing plan cards.
 */

/**
 * Billing cycle options for pricing plans
 */
export type BillingCycle = 'monthly' | 'annual';

/**
 * Plan type categories
 */
export type PlanType = 'solo' | 'team';

/**
 * Plan variant keys matching i18n structure
 */
export type PlanVariant =
  | 'freeSolo'
  | 'soloBasic'
  | 'soloPro'
  | 'teamBasic'
  | 'teamPro'
  | 'enterprise';

/**
 * Pricing plan data structure
 */
export interface PricingPlan {
  /** Unique plan identifier */
  variant: PlanVariant;

  /** Plan type category (solo or team) */
  planType: PlanType;

  /** Display name of the plan */
  name: string;

  /** Short description of the plan */
  description: string;

  /** Monthly price (formatted string like "$49" or "Custom" for enterprise) */
  priceMonthly: string | null;

  /** Annual price (formatted string like "$39" or null for enterprise) */
  priceAnnual: string | null;

  /** Period text (e.g., "/month") */
  period?: string;

  /** Annual billing description (e.g., "Billed annually at $468") */
  annualBilling?: string;

  /** User count description (e.g., "1 contractor + 6 employees") */
  users: string;

  /** Call-to-action button text */
  cta: string;

  /** Call-to-action link URL */
  ctaLink: string;

  /** Optional badge text (e.g., "MOST POPULAR") */
  badge?: string;

  /** List of included features */
  features: string[];

  /** List of excluded features (optional) */
  excluded?: string[];

  /** Whether this is a featured plan (special styling) */
  isFeatured?: boolean;

  /** Whether this is an enterprise plan (custom pricing) */
  isEnterprise?: boolean;
}
