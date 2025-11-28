/**
 * @fileoverview Feature comparison table types
 * @module widgets/feature-comparison-table/model
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Types
 */

import type { PlanType } from '@/entities/pricing-card';

/**
 * Feature availability status
 */
export type FeatureStatus = 'live' | 'dev' | 'soon';

/**
 * Plan-specific feature value
 */
export type FeatureValue = string | boolean | null;

/**
 * Feature row data structure
 */
export interface FeatureRow {
  /** Feature name/description */
  name: string;

  /** Feature status (Live, Development, Coming Soon) */
  status: FeatureStatus;

  /** Values for solo plans [Free Solo, Solo Basic, Solo Pro] */
  soloValues: [FeatureValue, FeatureValue, FeatureValue];

  /** Values for team plans [Team Basic, Team Pro, Enterprise] */
  teamValues: [FeatureValue, FeatureValue, FeatureValue];

  /** Whether this feature is highlighted/premium */
  isHighlight?: boolean;

  /** Section this feature belongs to */
  section?: string;

  /** Subsection this feature belongs to */
  subsection?: string;
}

/**
 * Props for FeatureComparisonTable widget
 */
export interface FeatureComparisonTableProps {
  /** Current plan type filter (solo or team) */
  planType: PlanType;

  /** Additional CSS class names */
  className?: string;
}
