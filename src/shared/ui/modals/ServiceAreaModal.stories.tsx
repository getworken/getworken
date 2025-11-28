/**
 * ServiceAreaModal Component Stories
 * @module shared/ui/modals/ServiceAreaModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Service Area Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ServiceAreaModal from './ServiceAreaModal';

const meta: Meta<typeof ServiceAreaModal> = {
  title: 'Shared/Modals/ServiceAreaModal',
  component: ServiceAreaModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for defining contractor service areas.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ServiceAreaModal>;

const ModalWrapper = () => {
  const [show, setShow] = useState(true);
  const [serviceAreas, setServiceAreas] = useState<any[]>([]);
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Service Area Modal
      </button>
      <ServiceAreaModal
        show={show}
        onClose={() => setShow(false)}
        serviceAreas={serviceAreas}
        setServiceAreas={setServiceAreas}
      />
    </>
  );
};

/**
 * Default service area modal
 */
export const Default: Story = {
  render: () => <ModalWrapper />,
};
