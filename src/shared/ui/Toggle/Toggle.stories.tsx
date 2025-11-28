/**
 * Toggle Component Stories
 * @module shared/ui/Toggle/Toggle.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Toggle Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Shared/UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible toggle switch component with label and description.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['teal', 'emerald', 'blue', 'purple'],
      description: 'Color theme of the toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/**
 * Interactive toggle with state management
 */
const ToggleWrapper = (args: any) => {
  const [checked, setChecked] = useState(args.checked);
  return <Toggle {...args} checked={checked} onChange={setChecked} />;
};

/**
 * Default toggle
 */
export const Default: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    label: 'Enable notifications',
    checked: false,
    color: 'teal',
  },
};

/**
 * With description
 */
export const WithDescription: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    label: 'Email notifications',
    description: 'Receive email updates about your projects and team activities',
    checked: true,
    color: 'teal',
  },
};

/**
 * Checked state
 */
export const Checked: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    label: 'Public profile',
    description: 'Make your profile visible to potential clients',
    checked: true,
    color: 'teal',
  },
};

/**
 * Unchecked state
 */
export const Unchecked: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    label: 'Public profile',
    description: 'Make your profile visible to potential clients',
    checked: false,
    color: 'teal',
  },
};

/**
 * Disabled checked
 */
export const DisabledChecked: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    label: 'Two-factor authentication',
    description: 'Required by your organization',
    checked: true,
    disabled: true,
    color: 'teal',
  },
};

/**
 * Disabled unchecked
 */
export const DisabledUnchecked: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    label: 'Premium features',
    description: 'Upgrade to access premium features',
    checked: false,
    disabled: true,
    color: 'teal',
  },
};

/**
 * Emerald color
 */
export const EmeraldColor: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    label: 'Available for work',
    description: 'Show your availability status to clients',
    checked: true,
    color: 'emerald',
  },
};

/**
 * Blue color
 */
export const BlueColor: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    label: 'Desktop notifications',
    checked: true,
    color: 'blue',
  },
};

/**
 * Purple color
 */
export const PurpleColor: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    label: 'Marketing emails',
    description: 'Receive updates about new features and offers',
    checked: false,
    color: 'purple',
  },
};

/**
 * Without label
 */
export const NoLabel: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    checked: true,
    color: 'teal',
  },
};
