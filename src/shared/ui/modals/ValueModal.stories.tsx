/**
 * ValueModal Component Stories
 * @module shared/ui/modals/ValueModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Value Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ValueModal from './ValueModal';

const meta: Meta<typeof ValueModal> = {
  title: 'Shared/Modals/ValueModal',
  component: ValueModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for defining company values.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ValueModal>;

const ModalWrapper = () => {
  const [show, setShow] = useState(true);
  const [companyValues, setCompanyValues] = useState<any[]>([]);
  const [newValue, setNewValue] = useState({ icon: '⭐', value: '' });
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Value Modal
      </button>
      <ValueModal
        show={show}
        onClose={() => setShow(false)}
        companyValues={companyValues}
        setCompanyValues={setCompanyValues}
        newValue={newValue}
        setNewValue={setNewValue}
      />
    </>
  );
};

/**
 * Default value modal
 */
export const Default: Story = {
  render: () => <ModalWrapper />,
};
