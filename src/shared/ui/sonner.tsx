'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

/**
 * Sonner Component
 *
 * Alternative toast notification system using Sonner.
 * Part of the shared layer following Diamond Standard v2.0.
 *
 * @module shared/ui
 *
 * @example
 * ```tsx
 * import { Toaster } from '@/shared/ui';
 * import { toast } from 'sonner';
 *
 * // In your root layout
 * <Toaster />
 *
 * // In your components
 * toast.success("Success!");
 * ```
 */
type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={(theme as 'light' | 'dark' | 'system') || 'system'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
