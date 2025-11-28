/**
 * JobModal Component Stories
 * @module shared/ui/modals/JobModal.stories
 * 
 * ✅ DIAMOND STANDARD: Storybook for Job Modal Development
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import JobModal from './JobModal';

const meta: Meta<typeof JobModal> = {
  title: 'Shared/Modals/JobModal',
  component: JobModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for creating job listings.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JobModal>;

const ModalWrapper = (args: any) => {
  const [show, setShow] = useState(true);
  const [jobListings, setJobListings] = useState(args.jobListings || []);
  
  return (
    <>
      <button 
        onClick={() => setShow(true)}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        Open Job Modal
      </button>
      <JobModal
        show={show}
        onClose={() => setShow(false)}
        jobListings={jobListings}
        setJobListings={setJobListings}
      />
    </>
  );
};

/**
 * Default job modal
 */
export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    jobListings: [],
  },
};

/**
 * With existing jobs
 */
export const WithExistingJobs: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    jobListings: [
      { id: '1', title: 'Senior Plumber', type: 'Full-time', salary: '$65,000', applicants: 12 },
      { id: '2', title: 'Electrician', type: 'Part-time', salary: '$45/hour', applicants: 8 },
    ],
  },
};
