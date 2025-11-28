/**
 * SectionCard Component Stories
 * @module shared/ui/SectionCard/SectionCard.stories
 *
 * @deprecated This component has been migrated to shadcn/ui Card components.
 * Use Card, CardHeader, CardTitle, CardContent from '@/shared/ui' instead.
 * See ProfileStats.stories.tsx and BusinessInformation.stories.tsx for examples.
 *
 * ⚠️ LEGACY: This component is no longer used in the codebase.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { SectionCard } from './SectionCard';

const meta: Meta<typeof SectionCard> = {
  title: 'Legacy/SectionCard (Deprecated)',
  component: SectionCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Container card for profile sections with optional collapsible functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    collapsible: {
      control: 'boolean',
      description: 'Whether the section can be collapsed',
    },
    defaultCollapsed: {
      control: 'boolean',
      description: 'Initial collapsed state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionCard>;

const sampleContent = (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700">
          Business Name
        </label>
        <p className="mt-1 text-gray-900">Acme Construction</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Industry</label>
        <p className="mt-1 text-gray-900">General Contracting</p>
      </div>
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700">Description</label>
      <p className="mt-1 text-gray-600">
        Full-service construction company specializing in residential and
        commercial projects.
      </p>
    </div>
  </div>
);

/**
 * Default section card
 */
export const Default: Story = {
  args: {
    title: 'Business Information',
    description: 'Manage your business details and contact information',
    children: sampleContent,
  },
};

/**
 * With action button
 */
export const WithAction: Story = {
  args: {
    title: 'Business Information',
    description: 'Manage your business details',
    children: sampleContent,
    action: (
      <button className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
        Edit
      </button>
    ),
  },
};

/**
 * Collapsible section
 */
export const Collapsible: Story = {
  args: {
    title: 'Advanced Settings',
    description: 'Configure advanced options',
    children: sampleContent,
    collapsible: true,
  },
};

/**
 * Default collapsed
 */
export const DefaultCollapsed: Story = {
  args: {
    title: 'Additional Information',
    description: 'Extra details about your business',
    children: sampleContent,
    collapsible: true,
    defaultCollapsed: true,
  },
};

/**
 * Simple content
 */
export const SimpleContent: Story = {
  args: {
    title: 'Contact Details',
    children: (
      <div className="space-y-2">
        <p className="text-gray-900">Email: contact@acme.com</p>
        <p className="text-gray-900">Phone: (555) 123-4567</p>
        <p className="text-gray-900">Address: 123 Main St, City, ST 12345</p>
      </div>
    ),
  },
};

/**
 * No description
 */
export const NoDescription: Story = {
  args: {
    title: 'Quick Stats',
    children: (
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-teal-600">42</p>
          <p className="text-sm text-gray-600">Projects</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-emerald-600">4.8</p>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-600">15</p>
          <p className="text-sm text-gray-600">Team</p>
        </div>
      </div>
    ),
  },
};
