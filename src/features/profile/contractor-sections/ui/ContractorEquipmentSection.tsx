/**
 * ContractorEquipmentSection Component
 * @module features/profile/contractor-sections/ui/ContractorEquipmentSection
 * 
 * ✅ DIAMOND STANDARD: Contractor equipment inventory management
 */

'use client';


export interface Equipment {
  id: string;
  name: string;
  category: string;
  owned: boolean;
}

export interface ContractorEquipmentSectionProps {
  equipment: Equipment[];
  onAddEquipment?: () => void;
  onRemoveEquipment?: (id: string) => void;
}

export function ContractorEquipmentSection({ equipment, onAddEquipment, onRemoveEquipment }: ContractorEquipmentSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Equipment & Tools</h3>
        <button
          onClick={onAddEquipment}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          + Add Equipment
        </button>
      </div>
      {equipment.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🔨</div>
          <p className="text-slate-400">No equipment listed yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {equipment.map((item) => (
            <div key={item.id} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium text-sm">{item.name}</h4>
                <p className="text-slate-400 text-xs">{item.category}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                  item.owned ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {item.owned ? 'Owned' : 'Access'}
                </span>
              </div>
              <button
                onClick={() => onRemoveEquipment?.(item.id)}
                className="text-red-400 hover:text-red-300"
                aria-label="Remove equipment"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
