/**
 * SocialMediaModal Component Stories
 * @module shared/ui/modals/SocialMediaModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Social Media Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SocialMediaModal from './SocialMediaModal';

const meta: Meta<typeof SocialMediaModal> = {
  title: 'Shared/Modals/SocialMediaModal',
  component: SocialMediaModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for managing business social media links.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SocialMediaModal>;

const ModalWrapper = () => {
  const [show, setShow] = useState(true);
  const [socialMedia, setSocialMedia] = useState<any[]>([]);
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Social Media Modal
      </button>
      <SocialMediaModal
        show={show}
        onClose={() => setShow(false)}
        socialMedia={socialMedia}
        setSocialMedia={setSocialMedia}
      />
    </>
  );
};

/**
 * Default social media modal
 */
export const Default: Story = {
  render: () => <ModalWrapper />,
};
