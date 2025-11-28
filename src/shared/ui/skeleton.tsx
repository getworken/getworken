import * as React from 'react';
import { cn } from '../lib/utils';

/**
 * Skeleton component - Loading placeholder.
 * Part of the shared UI layer (shadcn/ui).
 *
 * @example
 * ```tsx
 * <Skeleton className="w-[100px] h-[20px] rounded-full" />
 * ```
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
