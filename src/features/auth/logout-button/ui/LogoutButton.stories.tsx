/**
 * LogoutButton Storybook Stories
 * @module features/auth/logout-button/ui/LogoutButton.stories
 * 
 * ✅ DIAMOND STANDARD: Component documentation via Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { LogoutButton } from './LogoutButton';

const meta = {
  title: 'Features/Auth/LogoutButton',
  component: LogoutButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Logout button with loading states and error handling. Part of the auth feature UI layer.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['danger', 'ghost'],
      description: 'Button style variant',
    },
    showLoadingState: {
      control: 'boolean',
      description: 'Show loading spinner during logout',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-800 p-4 rounded-lg min-w-[250px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LogoutButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default logout button with danger variant
 */
export const Default: Story = {
  args: {
    variant: 'danger',
    showLoadingState: true,
  },
};

/**
 * Ghost variant for subtle styling
 */
export const GhostVariant: Story = {
  args: {
    variant: 'ghost',
    showLoadingState: true,
    children: 'Sign Out',
  },
};

/**
 * Custom text content
 */
export const CustomText: Story = {
  args: {
    variant: 'danger',
    children: 'Logout',
  },
};

/**
 * Without loading state
 */
export const NoLoadingState: Story = {
  args: {
    variant: 'danger',
    showLoadingState: false,
  },
};

/**
 * With callbacks
 */
export const WithCallbacks: Story = {
  args: {
    variant: 'danger',
    onLogoutSuccess: () => console.log('Logout successful'),
    onLogoutError: (error) => console.error('Logout failed:', error),
  },
};
