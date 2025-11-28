/**
 * ServiceModal Component
 * @module shared/ui/modals/ServiceModal
 * 
 * ✅ DIAMOND STANDARD: Modal for adding services (GetWork-alpha exact match)
 */

"use client";

interface Service {
  id: string;
  name: string;
  category: string;
  icon: string;
  jobsThisMonth: number;
}

interface CatalogService {
  name: string;
  category: string;
  icon: string;
}

export interface ServiceModalProps {
  show: boolean;
  onClose: () => void;
  services: Service[];
  onAddService: (service: Service) => void;
  serviceSearchTerm: string;
  setServiceSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  serviceCatalog: CatalogService[];
}

export function ServiceModal({
  show,
  onClose,
  services,
  onAddService,
  serviceSearchTerm,
  setServiceSearchTerm,
  selectedCategory,
  setSelectedCategory,
  serviceCatalog,
}: ServiceModalProps) {
  if (!show) return null;

  const handleClose = () => {
    onClose();
    setServiceSearchTerm('');
    setSelectedCategory('All Categories');
  };

  const handleAddService = (service: CatalogService) => {
    const newService: Service = {
      id: Date.now().toString(),
      name: service.name,
      category: service.category,
      icon: service.icon,
      jobsThisMonth: 0
    };
    onAddService(newService);
    handleClose();
  };

  const filteredServices = serviceCatalog.filter((service: CatalogService) => {
    const matchesSearch = service.name.toLowerCase().includes(serviceSearchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
    const notAlreadyAdded = !services.some((s: Service) => s.name === service.name);
    return matchesSearch && matchesCategory && notAlreadyAdded;
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Add Service</h3>
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
              placeholder="Search services..."
              value={serviceSearchTerm}
              onChange={(e) => setServiceSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              aria-label="Service Category Filter"
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
                onClick={() => handleAddService(service)}
                className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition text-left"
              >
                <span className="text-2xl">{service.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{service.name}</div>
                  <div className="text-slate-400 text-xs">{service.category}</div>
                </div>
                <span className="text-teal-400">+</span>
              </button>
            ))}
          </div>
          {filteredServices.length === 0 && (
            <div className="text-center text-slate-400 py-12">
              No services found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceModal;
