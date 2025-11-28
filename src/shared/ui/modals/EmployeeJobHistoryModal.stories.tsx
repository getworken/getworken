/**
 * EmployeeJobHistoryModal Component Stories
 * @module shared/ui/modals/EmployeeJobHistoryModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Employee Job History Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import EmployeeJobHistoryModal from './EmployeeJobHistoryModal';

const meta: Meta<typeof EmployeeJobHistoryModal> = {
  title: 'Shared/Modals/EmployeeJobHistoryModal',
  component: EmployeeJobHistoryModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for displaying employee job history.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmployeeJobHistoryModal>;

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
      <EmployeeJobHistoryModal
        show={show}
        onClose={() => setShow(false)}
        employeeId="demo-employee-123"
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
