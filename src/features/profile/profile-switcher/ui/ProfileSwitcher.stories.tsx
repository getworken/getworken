/**
 * ProfileSwitcher Storybook Stories
 * @module features/profile/profile-switcher
 * 
 * ✅ DIAMOND STANDARD: Feature component stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSwitcher } from './ProfileSwitcher';
import { UserProfiles } from '@/entities/user/model/types';

const meta: Meta<typeof ProfileSwitcher> = {
  title: 'Features/ProfileSwitcher',
  component: ProfileSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Profile Switcher allows users to switch between their different profile types.

**Visual States:**
- **Selected**: Bright profile color (current active profile)
- **Active**: Gray background with green border (profile set up, not selected)
- **Inactive**: Gray background with yellow border and dimmed (not set up yet)

**Profile Colors:**
- Business: Teal
- Contractor: Emerald
- Employee: Blue
- Customer: Purple
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeProfile: {
      control: 'select',
      options: ['business', 'contractor', 'employee', 'customer'],
      description: 'Currently active profile type',
    },
    profiles: {
      control: 'object',
      description: 'User profile configuration from Firestore',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state during profile switch',
    },
    onProfileSwitch: {
      action: 'profileSwitched',
      description: 'Callback when profile is switched',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileSwitcher>;

/**
 * All profiles active, business selected
 */
export const BusinessActive: Story = {
  args: {
    activeProfile: 'business',
    profiles: {
      business: { active: true, businessId: 'biz-123' },
      contractor: { active: true, contractorId: 'con-456' },
      employee: { active: true, employeeId: 'emp-789' },
      customer: { active: true, customerId: 'cus-012' },
    } as UserProfiles,
    isLoading: false,
  },
};

/**
 * Contractor profile selected
 */
export const ContractorActive: Story = {
  args: {
    activeProfile: 'contractor',
    profiles: {
      business: { active: true, businessId: 'biz-123' },
      contractor: { active: true, contractorId: 'con-456' },
      employee: { active: true, employeeId: 'emp-789' },
      customer: { active: true, customerId: 'cus-012' },
    } as UserProfiles,
    isLoading: false,
  },
};

/**
 * Employee profile selected
 */
export const EmployeeActive: Story = {
  args: {
    activeProfile: 'employee',
    profiles: {
      business: { active: true, businessId: 'biz-123' },
      contractor: { active: true, contractorId: 'con-456' },
      employee: { active: true, employeeId: 'emp-789' },
      customer: { active: true, customerId: 'cus-012' },
    } as UserProfiles,
    isLoading: false,
  },
};

/**
 * Customer profile selected
 */
export const CustomerActive: Story = {
  args: {
    activeProfile: 'customer',
    profiles: {
      business: { active: true, businessId: 'biz-123' },
      contractor: { active: true, contractorId: 'con-456' },
      employee: { active: true, employeeId: 'emp-789' },
      customer: { active: true, customerId: 'cus-012' },
    } as UserProfiles,
    isLoading: false,
  },
};

/**
 * Mixed state: Some profiles active, some inactive
 */
export const MixedProfiles: Story = {
  args: {
    activeProfile: 'customer',
    profiles: {
      business: { active: false },
      contractor: { active: true, contractorId: 'con-456' },
      employee: { active: false },
      customer: { active: true, customerId: 'cus-012' },
    } as UserProfiles,
    isLoading: false,
  },
};

/**
 * New user: Only customer profile active (default)
 */
export const NewUser: Story = {
  args: {
    activeProfile: 'customer',
    profiles: {
      business: { active: false },
      contractor: { active: false },
      employee: { active: false },
      customer: { active: true, customerId: 'cus-012' },
    } as UserProfiles,
    isLoading: false,
  },
};

/**
 * Loading state during profile switch
 */
export const Loading: Story = {
  args: {
    activeProfile: 'business',
    profiles: {
      business: { active: true, businessId: 'biz-123' },
      contractor: { active: true, contractorId: 'con-456' },
      employee: { active: false },
      customer: { active: true, customerId: 'cus-012' },
    } as UserProfiles,
    isLoading: true,
  },
};

/**
 * Business owner with employee profile
 */
export const BusinessOwnerWithEmployee: Story = {
  args: {
    activeProfile: 'business',
    profiles: {
      business: { active: true, businessId: 'biz-123' },
      contractor: { active: false },
      employee: { active: true, employeeId: 'emp-789' },
      customer: { active: false },
    } as UserProfiles,
    isLoading: false,
  },
};
