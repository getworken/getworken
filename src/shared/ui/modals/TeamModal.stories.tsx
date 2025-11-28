/**
 * TeamModal Component Stories
 * @module shared/ui/modals/TeamModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Team Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TeamModal from './TeamModal';

const meta: Meta<typeof TeamModal> = {
  title: 'Shared/Modals/TeamModal',
  component: TeamModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for adding team members to business profile.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TeamModal>;

const ModalWrapper = (args: any) => {
  const [show, setShow] = useState(true);
  const [teamMembers, setTeamMembers] = useState(args.displayTeamMembers || []);
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Modal
      </button>
      <TeamModal
        {...args}
        show={show}
        onClose={() => setShow(false)}
        displayTeamMembers={teamMembers}
        setDisplayTeamMembers={setTeamMembers}
      />
    </>
  );
};

/**
 * Default team modal
 */
export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    displayTeamMembers: [],
  },
};

/**
 * With existing team members
 */
export const WithExistingMembers: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    displayTeamMembers: [
      { id: '1', name: 'John Doe', role: 'Project Manager', avatar: 'JD' },
      { id: '2', name: 'Jane Smith', role: 'Lead Contractor', avatar: 'JS' },
    ],
  },
};
