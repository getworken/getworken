/**
 * SectionCard Component
 * @module shared/ui/SectionCard
 * 
 * ✅ DIAMOND STANDARD: Profile section card container
 */

'use client';

import React, { ReactNode } from 'react';

interface SectionCardProps {
  /**
   * Section title
   */
  title: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Section content
   */
  children: ReactNode;
  /**
   * Optional action button
   */
  action?: ReactNode;
  /**
   * Optional edit callback
   */
  onEdit?: (() => void) | undefined;
  /**
   * Edit mode flag
   */
  isEditing?: boolean | undefined;
  /**
   * Whether section is collapsible
   */
  collapsible?: boolean;
  /**
   * Initial collapsed state
   */
  defaultCollapsed?: boolean;
  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * Section card component for profile sections
 * 
 * @example
 * ```tsx
 * <SectionCard
 *   title="Business Information"
 *   description="Manage your business details"
 *   action={<button>Edit</button>}
 * >
 *   <div>Content here</div>
 * </SectionCard>
 * ```
 */
export function SectionCard({
  title,
  description,
  children,
  action,
  collapsible = false,
  defaultCollapsed = false,
  className = '',
}: SectionCardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
      <div className="flex items-start justify-between border-b border-gray-200 p-6">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {collapsible && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-gray-400 hover:text-gray-600"
                aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
              >
                <svg
                  className={`h-5 w-5 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        </div>
        {action && <div className="ml-4">{action}</div>}
      </div>
      {!isCollapsed && <div className="p-6">{children}</div>}
    </div>
  );
}
