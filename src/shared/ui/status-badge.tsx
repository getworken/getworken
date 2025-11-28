/**
 * Status Badge Component
 * @module shared/ui/status-badge
 *
 * ✅ DIAMOND STANDARD: Shared UI Layer Component
 *
 * A specialized badge component for displaying feature status (live, in development, coming soon).
 * Uses global.css CSS custom properties for consistent theming across light/dark modes.
 * Part of the shared UI layer for reusable, non-business UI components.
 *
 * @example
 * ```tsx
 * <StatusBadge status="live">✓ Available Now</StatusBadge>
 * <StatusBadge status="dev">🔨 In Development</StatusBadge>
 * <StatusBadge status="soon">⏳ Coming Soon</StatusBadge>
 * ```
 *
 * @see {@link file://src/shared/ui/status-badge.stories.tsx} - Storybook stories
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Class variance authority configuration for StatusBadge variants.
 * Uses CSS custom properties from global.css for theming.
 */
const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      status: {
        live: 'bg-[hsl(var(--status-live))] text-[hsl(var(--status-live-foreground))]',
        dev: 'bg-[hsl(var(--status-dev))] text-[hsl(var(--status-dev-foreground))]',
        soon: 'bg-[hsl(var(--status-soon))] text-[hsl(var(--status-soon-foreground))]',
      },
    },
    defaultVariants: {
      status: 'soon',
    },
  }
);

/**
 * Props for the StatusBadge component.
 *
 * @property status - The feature status type (live, dev, or soon)
 */
export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  /**
   * The status variant to display.
   * - `live`: Feature is currently available (teal/green)
   * - `dev`: Feature is in active development (yellow/amber)
   * - `soon`: Feature is planned for future release (red/rose)
   */
  status?: 'live' | 'dev' | 'soon';
}

/**
 * StatusBadge - A badge component for displaying feature availability status.
 *
 * Part of the shared UI layer (Diamond Standard FSD architecture).
 * Uses CSS custom properties from global.css for consistent theming.
 *
 * WCAG 2.2 Compliant:
 * - Semantic HTML (div with role implied by context)
 * - Focus states with ring utilities
 * - Sufficient color contrast via CSS custom properties
 *
 * @param props - Component props including status variant and HTML div attributes
 * @returns A styled status badge element
 *
 * @example
 * ```tsx
 * // Live feature
 * <StatusBadge status="live">✓ Available Now</StatusBadge>
 *
 * // Feature in development
 * <StatusBadge status="dev">🔨 In Development</StatusBadge>
 *
 * // Coming soon
 * <StatusBadge status="soon">⏳ Coming Soon</StatusBadge>
 * ```
 */
function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  return (
    <div
      className={cn(statusBadgeVariants({ status }), className)}
      {...props}
    />
  );
}

export { StatusBadge, statusBadgeVariants };
