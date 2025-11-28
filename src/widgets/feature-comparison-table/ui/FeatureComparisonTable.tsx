/**
 * @fileoverview FeatureComparisonTable widget component
 * @module widgets/feature-comparison-table/ui
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Component
 */

'use client';

import React from 'react';
import { featureData } from '../model/featureData';
import type { FeatureComparisonTableProps } from '../model/types';
import { soloPlans, teamPlans } from '@/entities/pricing-card/model/planData';

/**
 * Group features by section and subsection
 */
const groupFeaturesBySection = (features: typeof featureData) => {
  const sections: {
    [key: string]: {
      [subsection: string]: typeof featureData;
    };
  } = {};

  features.forEach((feature) => {
    const section = feature.section || 'Other';
    const subsection = feature.subsection || 'General';

    if (!sections[section]) {
      sections[section] = {};
    }

    if (!sections[section][subsection]) {
      sections[section][subsection] = [];
    }

    sections[section][subsection]!.push(feature);
  });

  return sections;
};

/**
 * FeatureComparisonTable Widget
 *
 * Diamond Standard: Widgets layer component for comparing features across pricing plans
 *
 * Features:
 * - Accordion-based feature comparison organized by category
 * - Status badges (Live, Development, Coming Soon)
 * - Plan type filtering (solo vs team)
 * - Responsive table with horizontal scroll
 * - Color-coded availability indicators
 *
 * Composition Classes Used:
 * - Card, Accordion components from shared/ui
 * - Badge components for status indicators
 * - Table styling with Tailwind utilities
 *
 * @example
 * ```tsx
 * <FeatureComparisonTable planType="solo" />
 * ```
 */
export const FeatureComparisonTable: React.FC<FeatureComparisonTableProps> = ({
  planType,
  className = '',
}) => {
  // Get plan names from actual plan data
  const planNames = (planType === 'solo' ? soloPlans : teamPlans).map(
    (plan) => plan.name
  );

  // Group features by section
  const sections = groupFeaturesBySection(featureData);

  return (
    <div className={`mx-auto max-w-5xl ${className}`}>
      <h3 className="mb-8 text-center text-2xl font-bold">
        Detailed Feature Comparison
      </h3>

      <div className="card overflow-hidden">
        {/* Plan Type Header */}
        <div className="border-b border-border bg-card p-4 text-center">
          <h4 className="text-lg font-semibold text-primary">
            {planType === 'solo'
              ? 'Solo Plans Feature Comparison'
              : 'Team Plans Feature Comparison'}
          </h4>
        </div>

        {/* Header Row - 4 columns: Feature + 3 Tiers */}
        <div className="sticky top-0 border-b border-border bg-black/20 p-4">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 text-sm font-semibold">
            <div className="text-left">Feature</div>
            <div className="text-center text-muted-foreground">
              {planNames[0]}
            </div>
            <div className="text-center text-muted-foreground">
              {planNames[1]}
            </div>
            <div className="text-center text-primary">{planNames[2]}</div>
          </div>
        </div>

        {/* Collapsible sections */}
        {Object.entries(sections).map(([sectionName, subsections], idx) => (
          <details
            key={sectionName}
            className="group border-b border-border"
            open={idx < 2}
          >
            <summary className="flex cursor-pointer items-center justify-between bg-card p-4 hover:bg-white/5">
              <span className="text-lg font-semibold text-primary">
                {sectionName}
              </span>
              <svg
                className="h-5 w-5 text-muted transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="text-sm">
              {Object.entries(subsections).map(([subsectionName, features]) => (
                <React.Fragment key={subsectionName}>
                  {/* Subsection Header */}
                  <div className="border-t border-border bg-card/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {subsectionName}
                  </div>

                  {/* Features in this subsection */}
                  {features.map((feature, idx) => {
                    const values =
                      planType === 'solo'
                        ? feature.soloValues
                        : feature.teamValues;

                    return (
                      <div
                        key={`${feature.name}-${idx}`}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 p-4 hover:bg-white/5"
                      >
                        <div className="text-left">{feature.name}</div>
                        <div className="text-center text-muted-foreground">
                          {values[0]}
                        </div>
                        <div className="text-center text-muted-foreground">
                          {values[1]}
                        </div>
                        <div className="text-center font-bold">{values[2]}</div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

FeatureComparisonTable.displayName = 'FeatureComparisonTable';
