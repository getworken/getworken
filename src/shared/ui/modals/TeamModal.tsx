/**
 * Team Modal Component
 * @module shared/ui/modals/TeamModal
 * 
 * Modal dialog for adding team members to business profile.
 * Supports adding employees and contractors with name, role, and avatar.
 * 
 * ✅ DIAMOND STANDARD: Shared UI modal component
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#shared-layer}
 */

"use client";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface TeamModalProps {
  show: boolean;
  onClose: () => void;
  displayTeamMembers: TeamMember[];
  setDisplayTeamMembers: (members: TeamMember[]) => void;
}

export default function TeamModal({
  show,
  onClose,
  displayTeamMembers,
  setDisplayTeamMembers,
}: TeamModalProps) {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const nameParts = name.split(' ');
    const avatar = nameParts.map(part => part[0]).join('').toUpperCase().slice(0, 2);
    
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name,
      role,
      avatar
    };
    setDisplayTeamMembers([...displayTeamMembers, newMember]);
    onClose();
    e.currentTarget.reset();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Add Team Member</h3>
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
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Role/Title</label>
            <input
              type="text"
              name="role"
              required
              placeholder="e.g. Operations Manager"
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
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
