/**
 * LoadingState Component Stories
 * @module shared/ui/LoadingState/LoadingState.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Loading State Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { LoadingState } from './LoadingState';

const meta: Meta<typeof LoadingState> = {
  title: 'Shared/UI/LoadingState',
  component: LoadingState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading state component with animated spinner and optional message.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the loading spinner',
    },
    fullPage: {
      control: 'boolean',
      description: 'Whether to render as full page loading',
    },
    message: {
      control: 'text',
      description: 'Optional loading message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingState>;

/**
 * Default loading state
 */
export const Default: Story = {
  args: {
    message: 'Loading...',
    size: 'md',
  },
};

/**
 * Small spinner
 */
export const Small: Story = {
  args: {
    message: 'Please wait',
    size: 'sm',
  },
};

/**
 * Medium spinner
 */
export const Medium: Story = {
  args: {
    message: 'Loading profile...',
    size: 'md',
  },
};

/**
 * Large spinner
 */
export const Large: Story = {
  args: {
    message: 'Loading data...',
    size: 'lg',
  },
};

/**
 * Without message
 */
export const NoMessage: Story = {
  args: {
    size: 'md',
  },
};

/**
 * Full page loading
 */
export const FullPage: Story = {
  args: {
    message: 'Loading application...',
    size: 'lg',
    fullPage: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * Custom message
 */
export const CustomMessage: Story = {
  args: {
    message: 'Fetching your business profile...',
    size: 'md',
  },
};
