/**
 * ClientNavigation Storybook Stories
 * @module widgets/client-navigation
 * 
 * ✅ DIAMOND STANDARD: Widget component stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ClientNavigation } from './ClientNavigation';
import { DashboardProvider } from '@/widgets/dashboard-layout';

const meta: Meta<typeof ClientNavigation> = {
  title: 'Widgets/ClientNavigation',
  component: ClientNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Client Navigation widget provides tab-based navigation for client role users.

**Role-Specific Navigation:**
- This is the navigation widget for the \`client\` role
- Other roles will have their own navigation widgets (AdminNavigation, ModeratorNavigation, etc.)
- Reusable DashboardLayout accepts any navigation widget

**Features:**
- Client-side tab switching (URL stays as /dashboard)
- Dynamic navigation based on user permissions
- Firebase-based tab visibility
- Active tab highlighting
- i18n support with next-intl
- WCAG 2.2 compliant with proper ARIA roles

**Client Tabs:**
- **Overview**: Dashboard overview
- **Profile**: User profile management
- **Directory**: Service provider directory
- **Team**: Team management
- **Chat**: Messaging

**Tab Navigation:**
- All tabs keep URL as \`/dashboard\`
- Tab state managed by DashboardContext
- Instant switching without page reload
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => (
      <DashboardProvider>
        <div className="bg-slate-900 min-h-screen p-4">
          <div className="w-64 bg-slate-800 rounded-lg overflow-hidden">
            <Story />
          </div>
        </div>
      </DashboardProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ClientNavigation>;

/**
 * Default navigation with all items visible
 */
export const Default: Story = {
  args: {
    className: '',
  },
};

/**
 * Navigation with custom styling
 */
export const CustomStyling: Story = {
  args: {
    className: 'bg-slate-700',
  },
};

/**
 * Navigation in loading state
 */
export const Loading: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Displays loading state while fetching user permissions',
      },
    },
  },
};

/**
 * Navigation for business owner
 * Shows Team tab (requires business:active)
 */
export const BusinessOwner: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Navigation for user with active business profile - includes Team tab',
      },
    },
  },
};

/**
 * Navigation for customer only
 * Hides Team tab (no business profile)
 */
export const CustomerOnly: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Navigation for user with only customer profile - Team tab hidden',
      },
    },
  },
};
