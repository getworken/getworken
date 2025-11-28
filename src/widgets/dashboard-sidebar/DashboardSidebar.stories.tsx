/**
 * DashboardSidebar Storybook Stories
 * @module widgets/dashboard-sidebar/DashboardSidebar.stories
 * 
 * ✅ DIAMOND STANDARD: Component documentation via Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { DashboardSidebar } from './DashboardSidebar';
import { ClientNavigation } from '@/widgets/client-navigation';
import { DashboardProvider } from '@/widgets/dashboard-layout';

const meta = {
  title: 'Widgets/DashboardSidebar',
  component: DashboardSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Reusable dashboard sidebar that accepts role-specific navigation widgets as children.

**Reusable Design:**
- Base structure: Logo + User Menu
- Navigation widget passed as children
- Use with ClientNavigation, AdminNavigation, ModeratorNavigation, etc.

**Structure:**
- Header (Logo + Title)
- Navigation Widget (passed as children)
- Account Menu Footer (User avatar + dropdown)

Part of the widgets layer - composite UI component following Diamond Standard reusability principles.
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-screen bg-slate-800">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DashboardSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default sidebar shell without navigation
 * 
 * Shows the reusable base structure:
 * - Logo and branding
 * - User account menu at bottom
 * - No navigation (children not provided)
 * 
 * This is the foundation - navigation widgets are passed as children
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Reusable sidebar shell without navigation. This is the base layout that accepts role-specific navigation as children.',
      },
    },
  },
};

/**
 * Sidebar with ClientNavigation for client role users
 * 
 * Shows the sidebar with client-specific navigation:
 * - Logo and branding
 * - ClientNavigation tabs (Overview, Profile, Directory, Team, Chat)
 * - User account menu at bottom
 */
export const WithClientNavigation: Story = {
  args: {},
  decorators: [
    (_Story) => (
      <DashboardProvider>
        <div className="h-screen bg-slate-800">
          <DashboardSidebar>
            <ClientNavigation />
          </DashboardSidebar>
        </div>
      </DashboardProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with ClientNavigation widget for client role users. Other roles would use AdminNavigation, ModeratorNavigation, etc.',
      },
    },
  },
};

/**
 * With account menu callbacks for interaction tracking
 */
export const WithCallbacks: Story = {
  args: {
    onAccountMenuOpen: () => console.log('Account menu opened'),
    onAccountMenuClose: () => console.log('Account menu closed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates callback functionality for tracking when the user opens or closes the account menu dropdown.',
      },
    },
  },
};

/**
 * Mobile view simulation (narrow viewport)
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Sidebar appearance on mobile devices. Consider implementing a hamburger menu pattern for production.',
      },
    },
  },
};
