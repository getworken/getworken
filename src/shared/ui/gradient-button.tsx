/**
 * Gradient Button Component
 * @module shared/ui/gradient-button
 *
 * ✅ DIAMOND STANDARD: Shared Layer Component
 *
 * A specialized button component with teal-to-blue gradient styling.
 * This button maintains theme consistency and adapts to theme changes.
 *
 * **Architecture Compliance:**
 * - FSD shared/ui layer (reusable, non-business UI)
 * - WCAG 2.2 compliant (semantic button, focus states)
 * - Theme-aware gradient that adapts to theme changes
 * - Built on top of shadcn/ui primitives
 *
 * **Use Cases:**
 * - Primary CTAs on hero sections
 * - Feature exploration buttons
 * - High-visibility action buttons requiring gradient styling
 *
 * @see {@link https://ui.shadcn.com/docs/components/button}
 * @see {@link file://./gradient-button.stories.tsx}
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const gradientButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-white ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      gradient: {
        'teal-blue':
          'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 shadow-md hover:shadow-lg',
        'teal-cyan':
          'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-md hover:shadow-lg',
        'emerald-green':
          'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-md hover:shadow-lg',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8 text-sm',
        xl: 'h-14 rounded-lg px-10 py-4 text-lg',
      },
    },
    defaultVariants: {
      gradient: 'teal-blue',
      size: 'default',
    },
  }
);

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  /**
   * If true, renders the button as a child component (polymorphic)
   * Useful for rendering as a Link or other component while maintaining button styles
   *
   * @example
   * ```tsx
   * <GradientButton asChild>
   *   <Link href="/signup">Get Started</Link>
   * </GradientButton>
   * ```
   */
  asChild?: boolean;
}

/**
 * GradientButton Component
 *
 * A visually striking button with gradient backgrounds that adapts to theme changes.
 * Primary use case is for hero sections and high-visibility CTAs.
 *
 * The gradient colors are defined using Tailwind CSS classes and will automatically
 * adapt when the theme changes, maintaining consistent branding across light/dark modes.
 *
 * @param gradient - The gradient style: teal-blue (default) | teal-cyan | emerald-green
 * @param size - Button size: default | sm | lg | xl
 * @param asChild - If true, merges props with child component for polymorphic rendering
 * @param className - Additional CSS classes to apply
 * @returns A gradient-styled button element
 *
 * @example
 * ```tsx
 * // Basic usage
 * <GradientButton>Explore Features</GradientButton>
 *
 * // With size variant
 * <GradientButton size="lg">Get Started Now</GradientButton>
 *
 * // Different gradient
 * <GradientButton gradient="teal-cyan">Learn More</GradientButton>
 *
 * // As a Link component (polymorphic)
 * <GradientButton asChild>
 *   <Link href="/signup">Sign Up Free</Link>
 * </GradientButton>
 *
 * // With custom classes
 * <GradientButton className="w-full" size="xl">
 *   Start Your Free Trial
 * </GradientButton>
 * ```
 *
 * @see {@link https://ui.shadcn.com/docs/components/button} - Base button documentation
 * @see {@link file://./Button.stories.tsx} - Standard button stories
 */
const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, gradient, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(gradientButtonVariants({ gradient, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
GradientButton.displayName = 'GradientButton';

export { GradientButton, gradientButtonVariants };
