/**
 * StatCard Component Stories
 * @module shared/ui/StatCard/StatCard.stories
 *
 * @deprecated This component has been migrated to shadcn/ui Card components.
 * Use ProfileStats component with Card components from '@/shared/ui' instead.
 * See ProfileStats.stories.tsx for the updated implementation.
 *
 * ⚠️ LEGACY: This component is no longer used in the codebase.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Legacy/StatCard (Deprecated)',
  component: StatCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Statistic display card with optional icon and trend indicator.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['teal', 'emerald', 'blue', 'purple', 'gray'],
      description: 'Color theme of the icon background',
    },
    value: {
      control: 'text',
      description: 'Statistic value (string or number)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

const BriefcaseIcon = (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const StarIcon = (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const UsersIcon = (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

/**
 * Default stat card
 */
export const Default: Story = {
  args: {
    label: 'Total Jobs',
    value: 42,
    color: 'teal',
  },
};

/**
 * With icon
 */
export const WithIcon: Story = {
  args: {
    label: 'Active Projects',
    value: 12,
    icon: BriefcaseIcon,
    color: 'teal',
  },
};

/**
 * With positive trend
 */
export const WithPositiveTrend: Story = {
  args: {
    label: 'Revenue',
    value: '$45,231',
    icon: BriefcaseIcon,
    trend: { value: '+12%', isPositive: true },
    color: 'emerald',
  },
};

/**
 * With negative trend
 */
export const WithNegativeTrend: Story = {
  args: {
    label: 'Pending Tasks',
    value: 8,
    icon: BriefcaseIcon,
    trend: { value: '-5%', isPositive: false },
    color: 'blue',
  },
};

/**
 * Rating stat
 */
export const Rating: Story = {
  args: {
    label: 'Average Rating',
    value: '4.8',
    icon: StarIcon,
    trend: { value: '+0.3', isPositive: true },
    color: 'emerald',
  },
};

/**
 * Team size stat
 */
export const TeamSize: Story = {
  args: {
    label: 'Team Members',
    value: 15,
    icon: UsersIcon,
    trend: { value: '+3', isPositive: true },
    color: 'purple',
  },
};

/**
 * Large number
 */
export const LargeNumber: Story = {
  args: {
    label: 'Total Revenue',
    value: '$1,234,567',
    icon: BriefcaseIcon,
    color: 'teal',
  },
};

/**
 * Without icon
 */
export const NoIcon: Story = {
  args: {
    label: 'Completion Rate',
    value: '98%',
    trend: { value: '+2%', isPositive: true },
    color: 'emerald',
  },
};

/**
 * Gray theme
 */
export const GrayTheme: Story = {
  args: {
    label: 'Pending Reviews',
    value: 5,
    icon: StarIcon,
    color: 'gray',
  },
};
