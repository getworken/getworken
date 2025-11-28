/**
 * StatusBadge Storybook Stories
 * @module shared/ui/status-badge.stories
 *
 * ✅ DIAMOND STANDARD: Storybook Required for Shared UI Components
 *
 * Visual documentation and interactive examples for the StatusBadge component.
 * Demonstrates all three status variants with common use cases.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './status-badge';

/**
 * StatusBadge displays feature availability status with consistent theming.
 *
 * Uses CSS custom properties from global.css for light/dark mode support.
 * Three variants available: live (teal), dev (yellow), soon (red).
 */
const meta = {
  title: 'Shared/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A specialized badge component for displaying feature status. Uses global.css CSS custom properties for consistent theming across light/dark modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['live', 'dev', 'soon'],
      description: 'The feature status type',
      table: {
        type: { summary: 'live | dev | soon' },
        defaultValue: { summary: 'soon' },
      },
    },
    children: {
      control: 'text',
      description: 'Badge content (text, icons, etc.)',
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Live status - Feature is currently available
 */
export const Live: Story = {
  args: {
    status: 'live',
    children: '✓ Live',
  },
};

/**
 * In Development status - Feature is being actively built
 */
export const InDevelopment: Story = {
  args: {
    status: 'dev',
    children: '🔨 Dev',
  },
};

/**
 * Coming Soon status - Feature is planned for future release
 */
export const ComingSoon: Story = {
  args: {
    status: 'soon',
    children: '⏳ Soon',
  },
};

/**
 * With longer text content
 */
export const WithLongerText: Story = {
  args: {
    status: 'live',
    children: '✓ Available Now',
  },
};

/**
 * All variants side by side for comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <StatusBadge status="live">✓ Live</StatusBadge>
      <StatusBadge status="dev">🔨 Dev</StatusBadge>
      <StatusBadge status="soon">⏳ Soon</StatusBadge>
    </div>
  ),
};

/**
 * Feature card usage example
 */
export const InFeatureCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-slate-700 bg-slate-800 p-6">
      <div className="mb-4 text-4xl">📄</div>
      <h3 className="mb-2 text-xl font-semibold text-white">Instant Quoting</h3>
      <p className="mb-4 text-slate-400">
        Create and send professional quotes in minutes from anywhere.
      </p>
      <StatusBadge status="live">✓ Available Now</StatusBadge>
    </div>
  ),
};

/**
 * Table cell usage example
 */
export const InTableCell: Story = {
  render: () => (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="p-3 text-left text-slate-300">Feature</th>
          <th className="p-3 text-center text-slate-300">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-800">
          <td className="p-3 text-slate-300">Customer Management</td>
          <td className="p-3 text-center">
            <StatusBadge status="live">✓ Live</StatusBadge>
          </td>
        </tr>
        <tr className="border-b border-slate-800">
          <td className="p-3 text-slate-300">Smart Scheduling</td>
          <td className="p-3 text-center">
            <StatusBadge status="dev">🔨 Dev</StatusBadge>
          </td>
        </tr>
        <tr className="border-b border-slate-800">
          <td className="p-3 text-slate-300">Payment Processing</td>
          <td className="p-3 text-center">
            <StatusBadge status="soon">⏳ Soon</StatusBadge>
          </td>
        </tr>
      </tbody>
    </table>
  ),
};
