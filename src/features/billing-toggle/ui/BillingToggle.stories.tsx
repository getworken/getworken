/**
 * BillingToggle Component Stories
 * @module features/billing-toggle/ui/BillingToggle.stories
 *
 * ✅ DIAMOND STANDARD: Storybook for Feature Development
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { BillingToggle } from './BillingToggle';
import type { BillingCycle } from '../model/types';

const meta: Meta<typeof BillingToggle> = {
  title: 'Features/BillingToggle',
  component: BillingToggle,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0f172a' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'radio',
      options: ['monthly', 'annual'],
      description: 'Current billing cycle',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when billing cycle changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BillingToggle>;

/**
 * Monthly billing selected
 */
export const Monthly: Story = {
  args: {
    value: 'monthly',
    onChange: (cycle) => console.log('Billing cycle changed to:', cycle),
  },
};

/**
 * Annual billing selected (with discount message)
 */
export const Annual: Story = {
  args: {
    value: 'annual',
    onChange: (cycle) => console.log('Billing cycle changed to:', cycle),
  },
};

/**
 * Interactive example with state management
 */
export const Interactive: Story = {
  render: () => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    return (
      <div>
        <BillingToggle value={billingCycle} onChange={setBillingCycle} />
        <p className="mt-4 text-center text-slate-300">
          Current selection:{' '}
          <strong className="text-teal-400">{billingCycle}</strong>
        </p>
      </div>
    );
  },
};
