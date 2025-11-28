/**
 * InviteModal Component Stories
 * @module shared/ui/modals/InviteModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Invite Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import InviteModal from './InviteModal';

const meta: Meta<typeof InviteModal> = {
  title: 'Shared/Modals/InviteModal',
  component: InviteModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for inviting team members via email.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InviteModal>;

const mockBusinessInfo = {
  businessName: 'Acme Construction',
  logo: '',
};

const mockUser = {
  id: 'user123',
  email: 'owner@acme.com',
};

const mockSubscription = {
  tier: 'professional',
  contractorLimit: 10,
  employeeLimit: 25,
};

const ModalWrapper = (_args: any) => {
  const [show, setShow] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteType, setInviteType] = useState<'contractor' | 'employee'>('contractor');
  const [inviteDirectorySearch, setInviteDirectorySearch] = useState('');
  const [pendingInvitations, setPendingInvitations] = useState<any[]>([]);
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Invite Modal
      </button>
      <InviteModal
        show={show}
        onClose={() => setShow(false)}
        inviteEmail={inviteEmail}
        setInviteEmail={setInviteEmail}
        inviteType={inviteType}
        setInviteType={setInviteType}
        inviteDirectorySearch={inviteDirectorySearch}
        setInviteDirectorySearch={setInviteDirectorySearch}
        teamMembers={{ contractors: [], employees: [] }}
        subscription={mockSubscription}
        pendingInvitations={pendingInvitations}
        setPendingInvitations={setPendingInvitations}
        businessInfo={mockBusinessInfo}
        user={mockUser}
        businessId="business123"
        directoryContractors={[]}
        directoryEmployees={[]}
        setToast={() => {}}
      />
    </>
  );
};

/**
 * Default invite modal
 */
export const Default: Story = {
  render: () => <ModalWrapper />,
};
