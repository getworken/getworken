/**
 * Job Modal Component
 * @module shared/ui/modals/JobModal
 * 
 * Modal dialog for adding job listings to business profile.
 * Supports creating job posts with title, type, salary, and applicant tracking.
 * 
 * ✅ DIAMOND STANDARD: Shared UI modal component
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#shared-layer}
 */

"use client";

interface JobListing {
  id: string;
  title: string;
  type: string;
  salary: string;
  applicants: number;
}

interface JobModalProps {
  show: boolean;
  onClose: () => void;
  jobListings: JobListing[];
  setJobListings: (listings: JobListing[]) => void;
}

export default function JobModal({
  show,
  onClose,
  jobListings,
  setJobListings,
}: JobModalProps) {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newJob: JobListing = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      type: formData.get('type') as string,
      salary: formData.get('salary') as string,
      applicants: 0
    };
    setJobListings([...jobListings, newJob]);
    onClose();
    e.currentTarget.reset();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Post New Job</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <form 
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. HVAC Technician"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Job Type</label>
              <select
                name="type"
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                aria-label="Job Type"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Salary Range</label>
              <input
                type="text"
                name="salary"
                required
                placeholder="e.g. $60k-$75k"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
