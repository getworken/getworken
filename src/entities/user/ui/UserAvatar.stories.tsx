/**
 * UserAvatar Storybook Stories
 * @module entities/user/ui/UserAvatar.stories
 * 
 * ✅ DIAMOND STANDARD: Component documentation via Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { UserAvatar } from './UserAvatar';

const meta = {
  title: 'Entities/User/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'User avatar component with initials fallback. Part of the user entity UI layer.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Avatar size variant',
    },
    displayName: {
      control: 'text',
      description: 'User display name (used for initials)',
    },
    email: {
      control: 'text',
      description: 'User email (fallback for initials)',
    },
    photoURL: {
      control: 'text',
      description: 'URL to user photo',
    },
  },
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default avatar with initials from display name
 */
export const WithDisplayName: Story = {
  args: {
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    size: 'md',
  },
};

/**
 * Avatar with initials from email only
 */
export const WithEmailOnly: Story = {
  args: {
    email: 'jane.smith@example.com',
    size: 'md',
  },
};

/**
 * Avatar with photo URL
 */
export const WithPhoto: Story = {
  args: {
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    size: 'md',
  },
};

/**
 * Small size variant
 */
export const SmallSize: Story = {
  args: {
    displayName: 'Jane Smith',
    size: 'sm',
  },
};

/**
 * Medium size variant (default)
 */
export const MediumSize: Story = {
  args: {
    displayName: 'John Doe',
    size: 'md',
  },
};

/**
 * Large size variant
 */
export const LargeSize: Story = {
  args: {
    displayName: 'Sarah Wilson',
    size: 'lg',
  },
};

/**
 * Fallback when no user data provided
 */
export const Fallback: Story = {
  args: {
    size: 'md',
  },
};

/**
 * Multiple avatars showcasing different states
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <UserAvatar displayName="Small" size="sm" />
      <UserAvatar displayName="Medium" size="md" />
      <UserAvatar displayName="Large" size="lg" />
    </div>
  ),
};
