/**
 * @fileoverview Storybook stories for GradientButton component
 * @module shared/ui/gradient-button
 *
 * Demonstrates all variants, sizes, and states of the GradientButton component.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { GradientButton } from './gradient-button';

const meta: Meta<typeof GradientButton> = {
  title: 'Shared/UI/GradientButton',
  component: GradientButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A gradient-styled button component with teal-to-blue gradient. Perfect for hero sections and high-visibility CTAs. Theme-aware and WCAG 2.2 compliant.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    gradient: {
      control: 'select',
      options: ['teal-blue', 'teal-cyan', 'emerald-green'],
      description: 'Gradient color scheme',
      table: {
        defaultValue: { summary: 'teal-blue' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'xl'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child component (polymorphic)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GradientButton>;

/**
 * Default gradient button with teal-to-blue gradient.
 * This is the primary variant used for hero CTAs.
 */
export const Default: Story = {
  args: {
    children: 'Explore Features',
  },
};

/**
 * Teal to Cyan gradient variant.
 * Alternative gradient for variety in UI.
 */
export const TealCyan: Story = {
  args: {
    children: 'Get Started',
    gradient: 'teal-cyan',
  },
};

/**
 * Emerald to Green gradient variant.
 * Used for success or confirmation actions.
 */
export const EmeraldGreen: Story = {
  args: {
    children: 'Contact Us',
    gradient: 'emerald-green',
  },
};

/**
 * Small size button.
 * For compact UI areas or secondary CTAs.
 */
export const Small: Story = {
  args: {
    children: 'Learn More',
    size: 'sm',
  },
};

/**
 * Large size button.
 * For prominent CTAs.
 */
export const Large: Story = {
  args: {
    children: 'Start Your Free Trial',
    size: 'lg',
  },
};

/**
 * Extra Large size button.
 * For hero sections and primary landing page CTAs.
 */
export const ExtraLarge: Story = {
  args: {
    children: 'Get Started Today',
    size: 'xl',
  },
};

/**
 * Disabled state.
 * Shows reduced opacity when button is disabled.
 */
export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    disabled: true,
  },
};

/**
 * With icon example.
 * Demonstrates button with an icon element.
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Quick Start
      </>
    ),
    size: 'lg',
  },
};

/**
 * Full width button.
 * For mobile-first layouts or form submissions.
 */
export const FullWidth: Story = {
  args: {
    children: 'Continue',
    className: 'w-full',
    size: 'lg',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * All gradient variants comparison.
 * Shows all gradient options side by side.
 */
export const AllGradients: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <GradientButton gradient="teal-blue">Teal to Blue</GradientButton>
      <GradientButton gradient="teal-cyan">Teal to Cyan</GradientButton>
      <GradientButton gradient="emerald-green">Emerald to Green</GradientButton>
    </div>
  ),
};

/**
 * All sizes comparison.
 * Shows all size variants side by side.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <GradientButton size="sm">Small Button</GradientButton>
      <GradientButton size="default">Default Button</GradientButton>
      <GradientButton size="lg">Large Button</GradientButton>
      <GradientButton size="xl">Extra Large Button</GradientButton>
    </div>
  ),
};

/**
 * Dark background example.
 * Shows how the button appears on dark backgrounds (typical use case).
 */
export const OnDarkBackground: Story = {
  args: {
    children: 'Explore Features',
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-slate-900 p-12">
        <Story />
      </div>
    ),
  ],
};

/**
 * Hero section example.
 * Realistic usage in a hero section context.
 */
export const HeroExample: Story = {
  render: () => (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-lg bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-12 text-center">
      <h2 className="text-4xl font-bold text-white">
        The All-In-One Platform for Field Service Professionals
      </h2>
      <p className="text-xl text-slate-300">
        Quote, schedule, invoice, and get paid faster
      </p>
      <div className="flex gap-4">
        <GradientButton size="xl">Start Your Free Trial</GradientButton>
        <GradientButton gradient="teal-cyan" size="xl">
          Explore Features
        </GradientButton>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
