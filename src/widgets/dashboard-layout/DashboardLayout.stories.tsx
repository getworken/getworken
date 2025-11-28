/**
 * DashboardLayout Storybook Stories
 * @module widgets/dashboard-layout/DashboardLayout.stories
 * 
 * ✅ DIAMOND STANDARD: Component documentation via Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';
import { ClientNavigation } from '@/widgets/client-navigation';

const meta = {
  title: 'Widgets/DashboardLayout',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main dashboard layout with persistent sidebar. Part of the widgets layer - top-level layout component.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default layout with client navigation and sample content
 */
export const Default: Story = {
  args: {
    navigation: <ClientNavigation />,
    children: (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Dashboard Content</h2>
        <p className="text-slate-300">
          This is where your page content goes. The sidebar remains persistent while
          the content area changes.
        </p>
      </div>
    ),
  },
};

/**
 * With scrollable content
 */
export const WithScrollableContent: Story = {
  args: {
    navigation: <ClientNavigation />,
    children: (
      <div className="p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Long Content Page</h2>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="mb-4 p-4 bg-slate-700 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Section {i + 1}</h3>
            <p className="text-slate-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    ),
  },
};

/**
 * With grid layout content
 */
export const WithGridContent: Story = {
  args: {
    navigation: <ClientNavigation />,
    children: (
      <div className="p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 bg-slate-700 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Card {i + 1}</h3>
              <p className="text-slate-300 text-sm">
                Dashboard card content goes here.
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

/**
 * Without navigation (for special dashboard pages)
 */
export const WithoutNavigation: Story = {
  args: {
    children: (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Special Dashboard Page</h2>
        <p className="text-slate-300">
          This page doesn't show navigation (useful for modals, special views, etc.)
        </p>
      </div>
    ),
  },
};

/**
 * Empty state
 */
export const EmptyState: Story = {
  args: {
    navigation: <ClientNavigation />,
    children: (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">No Content</h2>
          <p className="text-slate-400">This is an empty dashboard page.</p>
        </div>
      </div>
    ),
  },
};
