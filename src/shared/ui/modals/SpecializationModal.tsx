/**
 * Specialization Modal Component
 * @module shared/ui/modals/SpecializationModal
 * 
 * Modal dialog for selecting contractor specializations.
 * Provides searchable service catalog for adding specialties to contractor profile.
 * Supports category filtering and specialty management.
 * 
 * ✅ DIAMOND STANDARD: Shared UI modal component
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#shared-layer}
 */

"use client";

interface CatalogService {
  name: string;
  category: string;
  icon: string;
}

interface ContractorProfile {
  specialties: string[];
}

interface SpecializationModalProps {
  show: boolean;
  onClose: () => void;
  contractorProfile: ContractorProfile | null;
  updateContractorProfile: (updates: Partial<ContractorProfile>) => void;
  specializationSearchTerm?: string;
  setSpecializationSearchTerm?: (term: string) => void;
  selectedSpecCategory?: string;
  setSelectedSpecCategory?: (category: string) => void;
  serviceCatalog?: CatalogService[];
}

export default function SpecializationModal({
  show,
  onClose,
  contractorProfile,
  updateContractorProfile,
  specializationSearchTerm = '',
  setSpecializationSearchTerm = () => {},
  selectedSpecCategory = 'All Categories',
  setSelectedSpecCategory = () => {},
  serviceCatalog = [],
}: SpecializationModalProps) {
  if (!show) return null;

  const handleClose = () => {
    onClose();
    if (setSpecializationSearchTerm) setSpecializationSearchTerm('');
    if (setSelectedSpecCategory) setSelectedSpecCategory('All Categories');
  };

  const handleAddSpecialization = (service: CatalogService) => {
    if (contractorProfile) {
      updateContractorProfile({
        specialties: [...(contractorProfile.specialties || []), service.name]
      });
    }
    handleClose();
  };

  const filteredServices = serviceCatalog.filter((service: CatalogService) => {
    const matchesSearch = service.name.toLowerCase().includes(specializationSearchTerm.toLowerCase());
    const matchesCategory = selectedSpecCategory === 'All Categories' || service.category === selectedSpecCategory;
    const notAlreadyAdded = !contractorProfile?.specialties?.includes(service.name);
    return matchesSearch && matchesCategory && notAlreadyAdded;
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Add Specialization</h3>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 border-b border-slate-700">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search specializations..."
              value={specializationSearchTerm}
              onChange={(e) => setSpecializationSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
            <select
              value={selectedSpecCategory}
              onChange={(e) => setSelectedSpecCategory(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              aria-label="Specialization Category Filter"
            >
              <option>All Categories</option>
              {Array.from(new Set(serviceCatalog.map((s: CatalogService) => s.category))).sort().map((cat: string) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredServices.map((service: CatalogService, i: number) => (
              <button
                key={i}
                onClick={() => handleAddSpecialization(service)}
                className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition text-left"
              >
                <span className="text-2xl">{service.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{service.name}</div>
                  <div className="text-slate-400 text-xs">{service.category}</div>
                </div>
                <span className="text-emerald-400">+</span>
              </button>
            ))}
          </div>
          {filteredServices.length === 0 && (
            <div className="text-center text-slate-400 py-12">
              No specializations found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
