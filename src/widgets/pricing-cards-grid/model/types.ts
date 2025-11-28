/**
 * @fileoverview PricingCardsGrid widget types
 * @module widgets/pricing-cards-grid/model
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Types
 */

import type { BillingCycle, PlanType } from '@/entities/pricing-card';

/**
 * Props for PricingCardsGrid widget
 */
export interface PricingCardsGridProps {
  /** Current billing cycle selection */
  billingCycle: BillingCycle;

  /** Current plan type filter (solo or team) */
  planType: PlanType;

  /** Additional CSS class names */
  className?: string;

  /** Name of the plan to highlight (from quiz recommendation) */
  highlightedPlan?: string | null;

  /** Callback when CTA button is clicked */
  onCtaClick?: () => void;
}
