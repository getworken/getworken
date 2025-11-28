/**
 * Value Modal Component
 * @module shared/ui/modals/ValueModal
 * 
 * Modal dialog for adding company values.
 * Allows businesses to define core values with icons for branding display.
 * 
 * ✅ DIAMOND STANDARD: Shared UI modal component
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#shared-layer}
 */

"use client";

interface CompanyValue {
  id: string;
  icon: string;
  value: string;
}

interface ValueModalProps {
  show: boolean;
  onClose: () => void;
  companyValues: CompanyValue[];
  setCompanyValues: (values: CompanyValue[]) => void;
  newValue: { icon: string; value: string };
  setNewValue: (value: { icon: string; value: string }) => void;
}

export default function ValueModal({
  show,
  onClose,
  companyValues,
  setCompanyValues,
  newValue,
  setNewValue,
}: ValueModalProps) {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = {
      id: Date.now().toString(),
      icon: newValue.icon,
      value: newValue.value
    };
    setCompanyValues([...companyValues, value]);
    onClose();
    setNewValue({ icon: '🎯', value: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Add Company Value</h3>
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
            <label className="block text-sm font-medium text-slate-300 mb-2">Icon (Emoji)</label>
            <input
              type="text"
              value={newValue.icon}
              onChange={(e) => setNewValue({...newValue, icon: e.target.value})}
              required
              placeholder="e.g. 🎯"
              maxLength={2}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-2xl"
            />
            <p className="text-xs text-slate-400 mt-1">Common values: 🎯 Excellence | 🤝 Trust | ⚡ Speed | 💡 Innovation | 🛡️ Safety</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Value</label>
            <input
              type="text"
              value={newValue.value}
              onChange={(e) => setNewValue({...newValue, value: e.target.value})}
              required
              placeholder="e.g. Quality Excellence"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
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
              Add Value
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
