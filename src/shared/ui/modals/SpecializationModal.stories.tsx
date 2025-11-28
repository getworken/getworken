/**
 * SpecializationModal Component Stories
 * @module shared/ui/modals/SpecializationModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Specialization Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SpecializationModal from './SpecializationModal';

const meta: Meta<typeof SpecializationModal> = {
  title: 'Shared/Modals/SpecializationModal',
  component: SpecializationModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for selecting contractor specializations from service catalog.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpecializationModal>;

const mockServiceCatalog = [
  { name: 'Residential Plumbing', category: 'Plumbing', icon: '🔧' },
  { name: 'Commercial Electrical', category: 'Electrical', icon: '⚡' },
  { name: 'HVAC Installation', category: 'HVAC', icon: '❄️' },
];

const ModalWrapper = () => {
  const [show, setShow] = useState(true);
  const [profile, setProfile] = useState<any>({ specialties: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All Categories');
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Specialization Modal
      </button>
      <SpecializationModal
        show={show}
        onClose={() => setShow(false)}
        contractorProfile={profile}
        updateContractorProfile={(updates: any) => setProfile({ ...profile, ...updates })}
        specializationSearchTerm={searchTerm}
        setSpecializationSearchTerm={setSearchTerm}
        selectedSpecCategory={category}
        setSelectedSpecCategory={setCategory}
        serviceCatalog={mockServiceCatalog}
      />
    </>
  );
};

/**
 * Default specialization modal
 */
export const Default: Story = {
  render: () => <ModalWrapper />,
};
