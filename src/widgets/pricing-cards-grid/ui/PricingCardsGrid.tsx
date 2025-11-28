/**
 * @fileoverview PricingCardsGrid widget component
 * @module widgets/pricing-cards-grid/ui
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Component
 */

import React from 'react';
import { PricingCard, soloPlans, teamPlans } from '@/entities/pricing-card';
import type { PricingCardsGridProps } from '../model/types';

/**
 * PricingCardsGrid Widget
 *
 * Diamond Standard: Widgets layer component for displaying pricing plan cards in a grid
 *
 * Features:
 * - Filters plans by type (solo vs team)
 * - Responsive grid layout (1 col mobile, 3 cols desktop)
 * - Passes billing cycle to all cards
 * - Consistent spacing and alignment
 *
 * Composition:
 * - Uses PricingCard entity from entities layer
 * - Manages grid layout and filtering logic
 * - No business logic, pure presentation
 *
 * @example
 * ```tsx
 * <PricingCardsGrid
 *   planType="solo"
 *   billingCycle="annual"
 * />
 * ```
 */
export const PricingCardsGrid: React.FC<PricingCardsGridProps> = ({
  billingCycle,
  planType,
  className = '',
  highlightedPlan,
  onCtaClick,
}) => {
  // Select plans based on type
  const plans = planType === 'solo' ? soloPlans : teamPlans;

  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {plans.map((plan) => (
        <PricingCard
          key={plan.variant}
          plan={plan}
          billingCycle={billingCycle}
          isHighlighted={highlightedPlan === plan.name}
          {...(onCtaClick && { onCtaClick })}
        />
      ))}
    </div>
  );
};

PricingCardsGrid.displayName = 'PricingCardsGrid';
