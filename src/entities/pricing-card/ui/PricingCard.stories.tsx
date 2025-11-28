/**
 * @fileoverview Storybook stories for PricingCard component
 * @module entities/pricing-card/ui
 */

import type { Meta, StoryObj } from '@storybook/react';
import { PricingCard } from './PricingCard';
import {
  freeSoloPlan,
  soloBasicPlan,
  soloProPlan,
  teamBasicPlan,
  teamProPlan,
  enterprisePlan,
} from '../model/planData';

const meta: Meta<typeof PricingCard> = {
  title: 'Entities/PricingCard',
  component: PricingCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    billingCycle: {
      control: 'radio',
      options: ['monthly', 'annual'],
      description: 'Billing cycle selection',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PricingCard>;

/**
 * Free Solo Plan
 */
export const FreeSolo: Story = {
  args: {
    plan: freeSoloPlan,
    billingCycle: 'monthly',
  },
};

/**
 * Solo Basic Plan - Monthly
 */
export const SoloBasicMonthly: Story = {
  args: {
    plan: soloBasicPlan,
    billingCycle: 'monthly',
  },
};

/**
 * Solo Basic Plan - Annual
 */
export const SoloBasicAnnual: Story = {
  args: {
    plan: soloBasicPlan,
    billingCycle: 'annual',
  },
};

/**
 * Solo Pro Plan (Featured) - Monthly
 */
export const SoloProMonthly: Story = {
  args: {
    plan: soloProPlan,
    billingCycle: 'monthly',
  },
};

/**
 * Solo Pro Plan (Featured) - Annual
 */
export const SoloProAnnual: Story = {
  args: {
    plan: soloProPlan,
    billingCycle: 'annual',
  },
};

/**
 * Team Basic Plan - Monthly
 */
export const TeamBasicMonthly: Story = {
  args: {
    plan: teamBasicPlan,
    billingCycle: 'monthly',
  },
};

/**
 * Team Basic Plan - Annual
 */
export const TeamBasicAnnual: Story = {
  args: {
    plan: teamBasicPlan,
    billingCycle: 'annual',
  },
};

/**
 * Team Pro Plan (Featured) - Monthly
 */
export const TeamProMonthly: Story = {
  args: {
    plan: teamProPlan,
    billingCycle: 'monthly',
  },
};

/**
 * Team Pro Plan (Featured) - Annual
 */
export const TeamProAnnual: Story = {
  args: {
    plan: teamProPlan,
    billingCycle: 'annual',
  },
};

/**
 * Enterprise Plan
 */
export const Enterprise: Story = {
  args: {
    plan: enterprisePlan,
    billingCycle: 'monthly', // Not used for enterprise
  },
};
