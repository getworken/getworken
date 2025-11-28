/**
 * SkillsModal Component Stories
 * @module shared/ui/modals/SkillsModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Skills Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SkillsModal from './SkillsModal';

const meta: Meta<typeof SkillsModal> = {
  title: 'Shared/Modals/SkillsModal',
  component: SkillsModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for selecting employee skills from service catalog.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SkillsModal>;

const mockServiceCatalog = [
  { name: 'Plumbing', category: 'Plumbing', icon: '🔧' },
  { name: 'Electrical', category: 'Electrical', icon: '⚡' },
  { name: 'HVAC', category: 'HVAC', icon: '❄️' },
  { name: 'Carpentry', category: 'Carpentry', icon: '🪚' },
];

const ModalWrapper = (_args: any) => {
  const [show, setShow] = useState(true);
  const [employeeProfile, setEmployeeProfile] = useState<any>({ specializations: [] });
  const [skillsSearchTerm, setSkillsSearchTerm] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All Categories');
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Skills Modal
      </button>
      <SkillsModal
        show={show}
        onClose={() => setShow(false)}
        employeeProfile={employeeProfile}
        updateEmployeeProfile={(updates) => setEmployeeProfile({ ...employeeProfile, ...updates })}
        skillsSearchTerm={skillsSearchTerm}
        setSkillsSearchTerm={setSkillsSearchTerm}
        selectedSkillCategory={selectedSkillCategory}
        setSelectedSkillCategory={setSelectedSkillCategory}
        serviceCatalog={mockServiceCatalog}
      />
    </>
  );
};

/**
 * Default skills modal
 */
export const Default: Story = {
  render: () => <ModalWrapper />,
};
