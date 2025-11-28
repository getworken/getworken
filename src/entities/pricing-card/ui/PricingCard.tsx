/**
 * @fileoverview PricingCard entity component
 * @module entities/pricing-card/ui
 */

import React from 'react';
import type { PricingPlan, BillingCycle } from '../model/types';

/**
 * Props for the PricingCard component
 */
export interface PricingCardProps {
  /** Pricing plan configuration */
  plan: PricingPlan;

  /** Current billing cycle (monthly or annual) */
  billingCycle: BillingCycle;

  /** Additional CSS class names */
  className?: string;

  /** Whether this card is highlighted by quiz recommendation */
  isHighlighted?: boolean;

  /** Callback when CTA button is clicked */
  onCtaClick?: () => void;
}

/**
 * PricingCard Component
 *
 * Diamond Standard: Entity layer component for displaying pricing plan cards
 *
 * Features:
 * - Dynamic pricing based on billing cycle
 * - Featured and enterprise variants
 * - Badge display (e.g., "MOST POPULAR")
 * - Included/excluded feature lists
 * - Responsive layout with Tailwind composition classes
 *
 * Composition Classes Used:
 * - .pricing-card: Base card styling
 * - .pricing-card-featured: Featured plan variant
 * - .pricing-card-enterprise: Enterprise plan variant
 * - .feature-included: Included feature styling
 * - .feature-excluded: Excluded feature styling
 * - .feature-check: Checkmark icon
 * - .feature-x: X icon
 *
 * @example
 * ```tsx
 * <PricingCard
 *   plan={soloPlan}
 *   billingCycle="annual"
 * />
 * ```
 */
export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  billingCycle,
  className = '',
  isHighlighted = false,
  onCtaClick,
}) => {
  // Determine card variant class
  const getCardClass = () => {
    const baseCard = plan.isFeatured
      ? 'card relative flex flex-col overflow-hidden border-2 border-primary p-8'
      : 'card relative flex flex-col p-8'; // Added 'relative' for badge positioning

    // Add highlight styling if this card is recommended by quiz
    const highlightClass = isHighlighted
      ? 'ring-4 ring-primary ring-offset-4 ring-offset-background shadow-xl shadow-primary/50'
      : '';

    return `${baseCard} ${highlightClass}`;
  };

  // Get current price based on billing cycle
  const getCurrentPrice = () => {
    if (plan.isEnterprise) {
      return plan.priceMonthly; // "Custom" text
    }
    return billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
  };

  // Get badge text with 🎯 emoji if recommended by quiz
  const getBadgeText = () => {
    if (plan.badge) {
      // If has existing badge, add 🎯 when recommended
      return isHighlighted ? `🎯 ${plan.badge}` : plan.badge;
    } else if (isHighlighted) {
      // If no badge but is recommended, show just 🎯
      return '🎯';
    }
    return null;
  };

  return (
    <div
      id={`plan-${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
      className={`${getCardClass()} ${className}`}
    >
      {/* Badge (for featured plans or quiz recommendation) */}
      {(plan.badge || isHighlighted) && (
        <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          {getBadgeText()}
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-4">
        {/* Quiz Recommendation Label */}
        {isHighlighted && (
          <div className="mb-3 inline-block rounded-md bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            Recommended based on quiz
          </div>
        )}

        <div className="muted text-lg font-medium">{plan.name}</div>
        <div className="mb-1 mt-2 text-4xl font-extrabold">
          {getCurrentPrice()}
          {plan.period && !plan.isEnterprise && (
            <span className="muted text-lg font-normal">{plan.period}</span>
          )}
        </div>
        <div className="text-sm font-medium text-primary">{plan.users}</div>
      </div>

      {/* Features List */}
      <ul className="muted mb-8 flex-1 space-y-3 text-sm">
        {plan.features.map((feature, idx) => (
          <li key={`included-${idx}`} className="flex gap-2">
            <span className="text-primary">✓</span> {feature}
          </li>
        ))}
        {plan.excluded?.map((feature, idx) => (
          <li key={`excluded-${idx}`} className="flex gap-2 opacity-50">
            <span className="text-red-400">✕</span> {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onCtaClick}
        className={
          plan.isFeatured
            ? 'btn-primary inline-block w-full px-4 py-3 text-center shadow-lg'
            : 'muted inline-block w-full rounded-md border border-border px-4 py-3 text-center transition-colors hover:bg-card/50'
        }
      >
        {plan.cta}
      </button>
    </div>
  );
};

PricingCard.displayName = 'PricingCard';
