/**
 * Plan Type Selector Feature
 * @module features/plan-type-selector
 *
 * ✅ DIAMOND STANDARD: Features Layer Component
 *
 * Tab-based selector for switching between Solo and Team pricing plans.
 *
 * **Architecture Compliance:**
 * - FSD features/ layer (business logic UI)
 * - WCAG 2.2 compliant (semantic buttons, focus states)
 * - Internationalized (ready for next-intl)
 * - Imports only from shared/ (FSD rules)
 *
 * @see {@link https://feature-sliced.design/docs/reference/layers#features}
 */

'use client';

import { Button } from '@/shared/ui';
import type { PlanType } from '../model/types';

export interface PlanTypeSelectorProps {
  /** Current plan type value */
  value: PlanType;
  /** Callback when plan type changes */
  onChange: (type: PlanType) => void;
}

/**
 * PlanTypeSelector Component
 *
 * Two-option selector for Solo vs Team pricing plans.
 *
 * @param value - Current plan type
 * @param onChange - Handler for plan type change
 * @returns {JSX.Element} The plan type selector interface
 *
 * @example
 * ```tsx
 * <PlanTypeSelector
 *   value={selectedPlanType}
 *   onChange={setSelectedPlanType}
 * />
 * ```
 */
export function PlanTypeSelector({ value, onChange }: PlanTypeSelectorProps) {
  return (
    <div
      className="mb-12 flex justify-center gap-4"
      role="group"
      aria-label="Plan type selector"
    >
      <Button
        onClick={() => onChange('solo')}
        variant={value === 'solo' ? 'default' : 'outline'}
        className={value === 'solo' ? 'plan-type-active' : 'plan-type-inactive'}
        aria-pressed={value === 'solo' ? 'true' : 'false'}
        aria-label="Select Solo Plans (1 contractor)"
      >
        Solo Plans
      </Button>
      <Button
        onClick={() => onChange('team')}
        variant={value === 'team' ? 'default' : 'outline'}
        className={value === 'team' ? 'plan-type-active' : 'plan-type-inactive'}
        aria-pressed={value === 'team' ? 'true' : 'false'}
        aria-label="Select Team Plans (multiple contractors)"
      >
        Team Plans
      </Button>
    </div>
  );
}
