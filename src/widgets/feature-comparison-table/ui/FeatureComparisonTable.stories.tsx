/**
 * @fileoverview Storybook stories for FeatureComparisonTable widget
 * @module widgets/feature-comparison-table/ui
 */

import type { Meta, StoryObj } from '@storybook/react';
import { FeatureComparisonTable } from './FeatureComparisonTable';

const meta: Meta<typeof FeatureComparisonTable> = {
  title: 'Widgets/FeatureComparisonTable',
  component: FeatureComparisonTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    planType: {
      control: 'radio',
      options: ['solo', 'team'],
      description: 'Plan type filter',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureComparisonTable>;

/**
 * Solo Plans Comparison
 *
 * Compares Free Solo, Solo Basic, and Solo Pro plans
 */
export const SoloPlans: Story = {
  args: {
    planType: 'solo',
  },
};

/**
 * Team Plans Comparison
 *
 * Compares Team Basic, Team Pro, and Enterprise plans
 */
export const TeamPlans: Story = {
  args: {
    planType: 'team',
  },
};
