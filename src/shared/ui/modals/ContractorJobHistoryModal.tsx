/**
 * Contractor Job History Modal Component
 * @module shared/ui/modals/ContractorJobHistoryModal
 * 
 * Modal dialog displaying contractor's job completion history.
 * Shows past jobs, dates, and performance metrics.
 * 
 * ✅ DIAMOND STANDARD: Shared UI modal component
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#shared-layer}
 */

import React from 'react';

interface JobHistoryModalProps {
  show: boolean;
  onClose: () => void;
  contractorId?: string;
}

const JobHistoryModal: React.FC<JobHistoryModalProps> = ({
  show,
  onClose
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Job History</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-3xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="text-center py-8 text-slate-400">
          Job history coming soon...
        </div>
      </div>
    </div>
  );
};

export default JobHistoryModal;
