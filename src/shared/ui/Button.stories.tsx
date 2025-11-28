/**
 * Button Component Stories
 * @module shared/ui/Button.stories
 *
 * ✅ DIAMOND STANDARD: Storybook for UI Development
 *
 * Interactive documentation and development environment for the Button component
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Shared/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable, accessible button component built with Tailwind CSS.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'outline',
        'ghost',
        'destructive',
        'link',
      ],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Primary button variant - used for main actions
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
  },
};

/**
 * Secondary button variant - used for secondary actions
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

/**
 * Outline button variant - used for less prominent actions
 */
export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

/**
 * Ghost button variant - minimal styling
 */
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

/**
 * Destructive button variant - used for destructive actions
 */
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

/**
 * Small size button
 */
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

/**
 * Medium size button (default)
 */
export const DefaultSize: Story = {
  args: {
    children: 'Default Button',
    size: 'default',
  },
};

/**
 * Large size button
 */
export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

/**
 * Disabled button state
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

/**
 * Button with loading state
 */
export const Loading: Story = {
  args: {
    children: 'Loading...',
    disabled: true,
    'aria-busy': true,
  } as any,
};

/**
 * Submit button for forms
 */
export const Submit: Story = {
  args: {
    children: 'Submit Form',
    type: 'submit',
    variant: 'default',
  },
};

/**
 * Button with icon (example)
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span aria-hidden="true">→</span> Continue
      </>
    ),
    variant: 'default',
  },
};

/**
 * Accessibility example with ARIA label
 */
export const WithAriaLabel: Story = {
  args: {
    children: '×',
    'aria-label': 'Close dialog',
    variant: 'ghost',
  } as any,
  parameters: {
    docs: {
      description: {
        story:
          'Use aria-label when button content is not descriptive (e.g., icon-only buttons)',
      },
    },
  },
};
