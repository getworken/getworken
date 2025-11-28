/**
 * ContractorJobHistoryModal Component Stories
 * @module shared/ui/modals/ContractorJobHistoryModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Contractor Job History Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ContractorJobHistoryModal from './ContractorJobHistoryModal';

const meta: Meta<typeof ContractorJobHistoryModal> = {
  title: 'Shared/Modals/ContractorJobHistoryModal',
  component: ContractorJobHistoryModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for displaying contractor job history.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContractorJobHistoryModal>;

const ModalWrapper = () => {
  const [show, setShow] = useState(true);
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Job History Modal
      </button>
      <ContractorJobHistoryModal
        show={show}
        onClose={() => setShow(false)}
        contractorId="demo-contractor-123"
      />
    </>
  );
};

/**
 * With job history
 */
export const WithHistory: Story = {
  render: () => <ModalWrapper />,
};
