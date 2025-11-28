/**
 * ProfileStats Component
 * @module entities/profile/ui/ProfileStats
 *
 * Displays profile statistics using shadcn/ui Card components.
 * Replaces the legacy StatCard component with a modern Card-based layout.
 *
 * ✅ DIAMOND STANDARD v2.0 Compliant:
 * - Uses shadcn/ui Card components
 * - Supports theming via CSS variables
 * - Optional icons and trend indicators
 * - Responsive grid layout
 *
 * @see {@link https://ui.shadcn.com/docs/components/card} shadcn Card docs
 */

'use client';

import React from 'react';
import { Card, CardContent } from '@/shared/ui';

/**
 * Individual statistic item
 */
interface ProfileStat {
  /** Label for the statistic */
  label: string;
  /** Value to display (string or number) */
  value: string | number;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Optional trend indicator */
  trend?: {
    /** Trend value (e.g., "+12%") */
    value: string;
    /** Whether trend is positive or negative */
    isPositive: boolean;
  };
}

/**
 * Props for ProfileStats component
 */
interface ProfileStatsProps {
  /** Array of statistics to display */
  stats: ProfileStat[];
  /** Color theme for icons and values */
  color?: 'teal' | 'emerald' | 'blue' | 'purple';
}

/**
 * Profile statistics component
 *
 * Displays a grid of statistic cards with optional icons and trends.
 * Automatically adjusts layout based on screen size.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <ProfileStats
 *   stats={[
 *     { label: "Total Jobs", value: 42 },
 *     { label: "Reviews", value: 128 }
 *   ]}
 *   color="teal"
 * />
 * ```
 *
 * @example
 * With icons and trends:
 * ```tsx
 * <ProfileStats
 *   stats={[
 *     {
 *       label: "Total Jobs",
 *       value: 42,
 *       icon: <BriefcaseIcon />,
 *       trend: { value: "+12%", isPositive: true }
 *     }
 *   ]}
 *   color="blue"
 * />
 * ```
 */
export function ProfileStats({ stats, color = 'teal' }: ProfileStatsProps) {
  if (stats.length === 0) {
    return null;
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      teal: 'text-teal-600',
      emerald: 'text-emerald-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
    };
    return colors[color] || colors.teal;
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${getColorClasses(color)}`}>
                  {stat.value}
                </p>
                {stat.trend && (
                  <p
                    className={`text-xs ${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {stat.trend.value}
                  </p>
                )}
              </div>
              {stat.icon && (
                <div className={getColorClasses(color)}>{stat.icon}</div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
