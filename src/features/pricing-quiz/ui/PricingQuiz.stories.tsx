/**
 * PricingQuiz Component Stories
 * @module features/pricing-quiz/ui/PricingQuiz.stories
 *
 * ✅ DIAMOND STANDARD: Storybook for Feature Development
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { PricingQuiz } from './PricingQuiz';

const meta: Meta<typeof PricingQuiz> = {
  title: 'Features/PricingQuiz',
  component: PricingQuiz,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0f172a' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Whether the quiz is visible',
    },
    onComplete: {
      action: 'completed',
      description: 'Callback when quiz is completed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PricingQuiz>;

/**
 * Default quiz state - visible and interactive
 */
export const Visible: Story = {
  args: {
    show: true,
    onComplete: (answers) => {
      console.log('Quiz completed with answers:', answers);
    },
  },
};

/**
 * Hidden quiz state
 */
export const Hidden: Story = {
  args: {
    show: false,
    onComplete: (answers) => {
      console.log('Quiz completed with answers:', answers);
    },
  },
};
