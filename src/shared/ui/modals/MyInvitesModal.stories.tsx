/**
 * MyInvitesModal Component Stories
 * @module shared/ui/modals/MyInvitesModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for My Invites Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import MyInvitesModal from './MyInvitesModal';

const meta: Meta<typeof MyInvitesModal> = {
  title: 'Shared/Modals/MyInvitesModal',
  component: MyInvitesModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for viewing and managing received team invitations.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyInvitesModal>;

const mockInvitations = [
  {
    id: '1',
    fromBusinessId: 'biz1',
    fromBusinessName: 'Acme Construction',
    type: 'contractor' as const,
    role: 'Senior Plumber',
    status: 'pending' as const,
    sentDate: '2025-11-10',
  },
  {
    id: '2',
    fromBusinessId: 'biz2',
    fromBusinessName: 'Elite Builders',
    type: 'employee' as const,
    role: 'Project Manager',
    status: 'pending' as const,
    sentDate: '2025-11-15',
  },
];

const ModalWrapper = (args: any) => {
  const [show, setShow] = useState(true);
  const [myInvitations, setMyInvitations] = useState(args.myInvites || []);
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Invites Modal
      </button>
      <MyInvitesModal
        show={show}
        onClose={() => setShow(false)}
        myInvites={myInvitations}
        setMyInvites={setMyInvitations}
        contractorId="demo-contractor-123"
        employeeId="demo-employee-123"
        user={{ email: 'demo@example.com', uid: 'user123' }}
        setToast={() => {}}
      />
    </>
  );
};

/**
 * With pending invitations
 */
export const WithInvitations: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    myInvites: mockInvitations,
  },
};

/**
 * No invitations
 */
export const NoInvitations: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    myInvites: [],
  },
};
