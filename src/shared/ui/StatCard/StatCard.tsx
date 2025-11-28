/**
 * StatCard Component
 * @module shared/ui/StatCard
 * 
 * ✅ DIAMOND STANDARD: Statistic display card
 */

'use client';

import React from 'react';

interface StatCardProps {
  /**
   * Statistic label
   */
  label: string;
  /**
   * Statistic value
   */
  value: string | number;
  /**
   * Optional icon
   */
  icon?: React.ReactNode;
  /**
   * Optional trend indicator
   */
  trend?: {
    value: string;
    isPositive: boolean;
  };
  /**
   * Card color theme
   */
  color?: 'teal' | 'emerald' | 'blue' | 'purple' | 'gray';
}

const colorClasses = {
  teal: 'bg-teal-50 text-teal-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  gray: 'bg-gray-50 text-gray-600',
};

/**
 * Statistic card component
 * 
 * @example
 * ```tsx
 * <StatCard
 *   label="Total Jobs"
 *   value={42}
 *   icon={<BriefcaseIcon />}
 *   trend={{ value: "+12%", isPositive: true }}
 *   color="teal"
 * />
 * ```
 */
export function StatCard({ label, value, icon, trend, color = 'teal' }: StatCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
