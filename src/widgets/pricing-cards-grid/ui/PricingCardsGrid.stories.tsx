/**
 * @fileoverview Storybook stories for PricingCardsGrid widget
 * @module widgets/pricing-cards-grid/ui
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PricingCardsGrid } from './PricingCardsGrid';
import type { BillingCycle, PlanType } from '@/entities/pricing-card';

const meta: Meta<typeof PricingCardsGrid> = {
  title: 'Widgets/PricingCardsGrid',
  component: PricingCardsGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    billingCycle: {
      control: 'radio',
      options: ['monthly', 'annual'],
      description: 'Billing cycle selection',
    },
    planType: {
      control: 'radio',
      options: ['solo', 'team'],
      description: 'Plan type filter',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PricingCardsGrid>;

/**
 * Solo Plans - Monthly
 */
export const SoloMonthly: Story = {
  args: {
    planType: 'solo',
    billingCycle: 'monthly',
  },
};

/**
 * Solo Plans - Annual
 */
export const SoloAnnual: Story = {
  args: {
    planType: 'solo',
    billingCycle: 'annual',
  },
};

/**
 * Team Plans - Monthly
 */
export const TeamMonthly: Story = {
  args: {
    planType: 'team',
    billingCycle: 'monthly',
  },
};

/**
 * Team Plans - Annual
 */
export const TeamAnnual: Story = {
  args: {
    planType: 'team',
    billingCycle: 'annual',
  },
};

/**
 * Interactive - Full Controls
 */
export const Interactive: Story = {
  render: () => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const [planType, setPlanType] = useState<PlanType>('solo');

    return (
      <div className="space-y-6">
        <div className="flex gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Plan Type:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setPlanType('solo')}
                className={`rounded px-4 py-2 ${
                  planType === 'solo'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                Solo
              </button>
              <button
                onClick={() => setPlanType('team')}
                className={`rounded px-4 py-2 ${
                  planType === 'team'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                Team
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Billing:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`rounded px-4 py-2 ${
                  billingCycle === 'monthly'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`rounded px-4 py-2 ${
                  billingCycle === 'annual'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                Annual
              </button>
            </div>
          </div>
        </div>

        <PricingCardsGrid planType={planType} billingCycle={billingCycle} />
      </div>
    );
  },
};
