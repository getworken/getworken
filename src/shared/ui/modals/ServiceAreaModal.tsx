/**
 * Service Area Modal Component
 * @module shared/ui/modals/ServiceAreaModal
 * 
 * Modal dialog for adding service coverage areas.
 * Allows contractors and businesses to define geographic service regions with radius.
 * 
 * ✅ DIAMOND STANDARD: Shared UI modal component
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#shared-layer}
 */

"use client";

interface ServiceArea {
  id: string;
  name: string;
  radius: string;
}

interface ServiceAreaModalProps {
  show: boolean;
  onClose: () => void;
  serviceAreas: ServiceArea[];
  setServiceAreas: (areas: ServiceArea[]) => void;
  newServiceArea?: { name: string; radius: string };
  setNewServiceArea?: (area: { name: string; radius: string }) => void;
}

export default function ServiceAreaModal({
  show,
  onClose,
  serviceAreas,
  setServiceAreas,
  newServiceArea = { name: '', radius: '20 miles' },
  setNewServiceArea = () => {},
}: ServiceAreaModalProps) {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const area = {
      id: Date.now().toString(),
      name: newServiceArea.name,
      radius: newServiceArea.radius
    };
    setServiceAreas([...serviceAreas, area]);
    onClose();
    setNewServiceArea({ name: '', radius: '20 miles' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Add Service Area</h3>
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
            <label className="block text-sm font-medium text-slate-300 mb-2">Location/City</label>
            <input
              type="text"
              value={newServiceArea.name}
              onChange={(e) => setNewServiceArea({...newServiceArea, name: e.target.value})}
              required
              placeholder="e.g. Downtown Los Angeles"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Service Radius</label>
            <select
              value={newServiceArea.radius}
              onChange={(e) => setNewServiceArea({...newServiceArea, radius: e.target.value})}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              aria-label="Service Radius"
            >
              <option value="10 miles">10 miles</option>
              <option value="20 miles">20 miles</option>
              <option value="30 miles">30 miles</option>
              <option value="50 miles">50 miles</option>
              <option value="100 miles">100 miles</option>
              <option value="Statewide">Statewide</option>
              <option value="Nationwide">Nationwide</option>
            </select>
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
              Add Service Area
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
