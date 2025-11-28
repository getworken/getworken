/**
 * ProfileStats Component Stories
 * @module entities/profile/ui/ProfileStats.stories
 *
 * ✅ DIAMOND STANDARD: Storybook for Profile Stats Component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ProfileStats } from './ProfileStats';

const meta: Meta<typeof ProfileStats> = {
  title: 'Entities/Profile/ProfileStats',
  component: ProfileStats,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Profile statistics display using shadcn/ui Card components. Shows key metrics with optional icons and trends.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['teal', 'emerald', 'blue', 'purple'],
      description: 'Color theme for the statistics',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileStats>;

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

const UserIcon = (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const TrendingUpIcon = (
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
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

/**
 * Basic statistics display
 */
export const Default: Story = {
  args: {
    stats: [
      { label: 'Total Jobs', value: 42 },
      { label: 'Reviews', value: 128 },
      { label: 'Rating', value: '4.8' },
      { label: 'Years Experience', value: 15 },
    ],
    color: 'teal',
  },
};

/**
 * Statistics with icons
 */
export const WithIcons: Story = {
  args: {
    stats: [
      { label: 'Total Jobs', value: 42, icon: BriefcaseIcon },
      { label: 'Reviews', value: 128, icon: StarIcon },
      { label: 'Team Members', value: 8, icon: UserIcon },
      { label: 'Growth', value: '+23%', icon: TrendingUpIcon },
    ],
    color: 'blue',
  },
};

/**
 * Statistics with trends
 */
export const WithTrends: Story = {
  args: {
    stats: [
      {
        label: 'Total Jobs',
        value: 42,
        icon: BriefcaseIcon,
        trend: { value: '+12%', isPositive: true },
      },
      {
        label: 'Reviews',
        value: 128,
        icon: StarIcon,
        trend: { value: '+23%', isPositive: true },
      },
      {
        label: 'Response Time',
        value: '2.4h',
        trend: { value: '-15%', isPositive: true },
      },
      {
        label: 'Completion Rate',
        value: '94%',
        trend: { value: '-3%', isPositive: false },
      },
    ],
    color: 'emerald',
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  args: {
    stats: [],
    color: 'teal',
  },
};

/**
 * Different color themes
 */
export const ColorThemes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Teal Theme</h3>
        <ProfileStats
          stats={[
            { label: 'Jobs', value: 42 },
            { label: 'Reviews', value: 128 },
          ]}
          color="teal"
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Emerald Theme</h3>
        <ProfileStats
          stats={[
            { label: 'Jobs', value: 42 },
            { label: 'Reviews', value: 128 },
          ]}
          color="emerald"
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Blue Theme</h3>
        <ProfileStats
          stats={[
            { label: 'Jobs', value: 42 },
            { label: 'Reviews', value: 128 },
          ]}
          color="blue"
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Purple Theme</h3>
        <ProfileStats
          stats={[
            { label: 'Jobs', value: 42 },
            { label: 'Reviews', value: 128 },
          ]}
          color="purple"
        />
      </div>
    </div>
  ),
};
