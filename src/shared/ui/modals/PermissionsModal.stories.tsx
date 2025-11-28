/**
 * PermissionsModal Component Stories
 * @module shared/ui/modals/PermissionsModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Permissions Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import PermissionsModal from './PermissionsModal';

const meta: Meta<typeof PermissionsModal> = {
  title: 'Shared/Modals/PermissionsModal',
  component: PermissionsModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for managing team member permissions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PermissionsModal>;

const mockContractor = {
  id: 'c1',
  name: 'John Doe',
  role: 'Senior Plumber',
  avatar: 'JD',
  permissions: {
    canViewJobs: true,
    canEditJobs: false,
    canViewEstimates: true,
    canCreateEstimates: false,
    canViewCustomers: true,
    canEditCustomers: false,
    canViewSchedule: true,
    canEditSchedule: false,
    canViewReports: false,
  },
};

const ModalWrapper = (args: any) => {
  const [show, setShow] = useState(true);
  const [teamMembers, setTeamMembers] = useState(args.teamMembers || { contractors: [], employees: [] });
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Permissions Modal
      </button>
      <PermissionsModal
        show={show}
        onClose={() => setShow(false)}
        selectedMember={null}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        businessId="business123"
        setToast={() => {}}
      />
    </>
  );
};

/**
 * With contractor
 */
export const WithContractor: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    teamMembers: { contractors: [mockContractor], employees: [] },
  },
};

/**
 * No contractors
 */
export const NoContractors: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    teamMembers: { contractors: [], employees: [] },
  },
};
