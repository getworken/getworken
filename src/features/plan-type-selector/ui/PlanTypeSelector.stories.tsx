/**
 * PlanTypeSelector Component Stories
 * @module features/plan-type-selector/ui/PlanTypeSelector.stories
 *
 * ✅ DIAMOND STANDARD: Storybook for Feature Development
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { PlanTypeSelector } from './PlanTypeSelector';
import type { PlanType } from '../model/types';

const meta: Meta<typeof PlanTypeSelector> = {
  title: 'Features/PlanTypeSelector',
  component: PlanTypeSelector,
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
      options: ['solo', 'team'],
      description: 'Current plan type',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when plan type changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlanTypeSelector>;

/**
 * Solo plans selected
 */
export const Solo: Story = {
  args: {
    value: 'solo',
    onChange: (type) => console.log('Plan type changed to:', type),
  },
};

/**
 * Team plans selected
 */
export const Team: Story = {
  args: {
    value: 'team',
    onChange: (type) => console.log('Plan type changed to:', type),
  },
};

/**
 * Interactive example with state management
 */
export const Interactive: Story = {
  render: () => {
    const [planType, setPlanType] = useState<PlanType>('solo');

    return (
      <div>
        <PlanTypeSelector value={planType} onChange={setPlanType} />
        <p className="mt-4 text-center text-slate-300">
          Current selection:{' '}
          <strong className="text-teal-400">{planType}</strong>
        </p>
      </div>
    );
  },
};
