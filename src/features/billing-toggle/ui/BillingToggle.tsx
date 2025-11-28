/**
 * Billing Toggle Feature
 * @module features/billing-toggle
 *
 * ✅ DIAMOND STANDARD: Features Layer Component
 *
 * Toggle control for switching between monthly and annual billing cycles.
 * Displays savings information for annual billing.
 *
 * **Architecture Compliance:**
 * - FSD features/ layer (business logic UI)
 * - WCAG 2.2 compliant (ARIA pressed state, keyboard navigation)
 * - Internationalized (ready for next-intl)
 * - Imports only from shared/ (FSD rules)
 *
 * @see {@link https://feature-sliced.design/docs/reference/layers#features}
 */

'use client';

import { Button } from '@/shared/ui';

import type { BillingCycle } from '../model/types';

export interface BillingToggleProps {
  /** Current billing cycle value */
  value: BillingCycle;
  /** Callback when billing cycle changes */
  onChange: (cycle: BillingCycle) => void;
}

/**
 * BillingToggle Component
 *
 * Two-option toggle for selecting monthly or annual billing.
 *
 * @param value - Current billing cycle
 * @param onChange - Handler for billing cycle change
 * @returns {JSX.Element} The billing toggle interface
 *
 * @example
 * ```tsx
 * <BillingToggle
 *   value={billingCycle}
 *   onChange={setBillingCycle}
 * />
 * ```
 */
export function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div className="mb-8 text-center">
      <div
        className="inline-flex rounded-lg bg-slate-700 p-1"
        role="group"
        aria-label="Billing cycle selector"
      >
        <Button
          onClick={() => onChange('monthly')}
          variant={value === 'monthly' ? 'default' : 'ghost'}
          className="rounded-md px-6 py-2"
          aria-pressed={value === 'monthly' ? 'true' : 'false'}
          aria-label="Select monthly billing"
        >
          Monthly
        </Button>
        <Button
          onClick={() => onChange('annual')}
          variant={value === 'annual' ? 'default' : 'ghost'}
          className="rounded-md px-6 py-2"
          aria-pressed={value === 'annual' ? 'true' : 'false'}
          aria-label="Select annual billing (save 20%)"
        >
          Annual{' '}
          <span
            className="ml-1 text-sm text-teal-400"
            aria-label="save 20 percent"
          >
            (Save 20%)
          </span>
        </Button>
      </div>
    </div>
  );
}
