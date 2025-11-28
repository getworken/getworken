/**
 * BusinessInformation Component Stories
 * @module features/profile/business-sections/BusinessInformation.stories
 *
 * ✅ DIAMOND STANDARD: Storybook for Business Information Section
 */

import type { Meta, StoryObj } from '@storybook/react';
import { BusinessInformation } from './BusinessInformation';
import type { BusinessProfile } from '@/entities/profile/model/types';

const meta: Meta<typeof BusinessInformation> = {
  title: 'Features/Profile/Business Sections/BusinessInformation',
  component: BusinessInformation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Business information section using shadcn/ui Card components. Displays basic business details including name, email, phone, and address.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onEdit: {
      action: 'edit clicked',
      description: 'Callback when edit button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BusinessInformation>;

const mockBusinessProfile = {
  businessId: 'business-1',
  userId: 'user-1',
  businessName: 'Acme Construction',
  email: 'contact@acmeconstruction.com',
  phone: '(555) 123-4567',
  address: {
    street: '123 Main Street, Suite 100',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    country: 'USA',
  },
  description:
    'Full-service construction company specializing in residential and commercial projects.',
  website: 'https://acmeconstruction.com',
  services: [],
  serviceAreas: [],
  isPublic: true,
  verified: false,
  active: true,
  completed: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deleted: false,
} as BusinessProfile;

/**
 * Default business information section
 */
export const Default: Story = {
  args: {
    profile: mockBusinessProfile,
  },
};

/**
 * With edit button visible
 */
export const WithEditButton: Story = {
  args: {
    profile: mockBusinessProfile,
    onEdit: () => console.log('Edit clicked'),
  },
};

/**
 * Minimal business information
 */
export const MinimalInfo: Story = {
  args: {
    profile: {
      ...mockBusinessProfile,
      phone: '',
      website: '',
      description: '',
    },
  },
};

/**
 * Complete business information
 */
export const CompleteInfo: Story = {
  args: {
    profile: {
      ...mockBusinessProfile,
      description:
        'Acme Construction has been serving the Springfield area for over 25 years. We specialize in both residential and commercial construction projects, from new builds to renovations. Our team of experienced contractors is dedicated to delivering quality workmanship on every project.',
    },
  },
};
