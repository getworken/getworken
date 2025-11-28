/**
 * ErrorBoundary Component Stories
 * @module shared/ui/ErrorBoundary/ErrorBoundary.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Error Boundary Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './ErrorBoundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Shared/UI/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Error boundary component that catches React errors and displays a fallback UI with error details.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

// Component that always throws an error for demonstration
const ThrowError = () => {
  throw new Error('Example error thrown by child component');
};

// Component that works normally
const WorkingComponent = () => (
  <div className="rounded-lg border-2 border-teal-500 bg-teal-50 p-6 text-center">
    <h3 className="text-lg font-semibold text-teal-900">✅ Component Working</h3>
    <p className="mt-2 text-sm text-teal-700">This component rendered successfully!</p>
  </div>
);

/**
 * Normal state - no errors
 */
export const Default: Story = {
  args: {
    children: <WorkingComponent />,
  },
};

/**
 * Error state with default fallback UI
 */
export const WithError: Story = {
  args: {
    children: <ThrowError />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the default error fallback UI when a child component throws an error.',
      },
    },
  },
};

/**
 * Error state with custom fallback UI
 */
export const CustomFallback: Story = {
  args: {
    children: <ThrowError />,
    fallback: (
      <div className="rounded-lg border-2 border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-xl font-bold text-red-900">Custom Error Fallback</h2>
        <p className="mt-2 text-red-700">This is a custom error message</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a custom fallback UI when an error is caught.',
      },
    },
  },
};

/**
 * Error state with error callback
 */
export const WithErrorCallback: Story = {
  args: {
    children: <ThrowError />,
    onError: (error, errorInfo) => {
      console.log('Error caught:', error.message);
      console.log('Error info:', errorInfo);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the onError callback being triggered when an error is caught.',
      },
    },
  },
};
