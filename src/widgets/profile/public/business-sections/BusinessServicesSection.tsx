/**
 * Business Services Section Component
 * @module widgets/profile/public/business-sections/BusinessServicesSection
 * 
 * Displays business services offered with categories and descriptions.
 * Part of public business profile widget composition.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface Service {
  id: string;
  name: string;
  description?: string;
  price?: string | number;
  category?: string;
}

interface BusinessServicesSectionProps {
  branding: any;
  businessInfo: any;
  services: Service[];
}

export default function BusinessServicesSection({ services }: BusinessServicesSectionProps) {
  const groupedServices = services.reduce((acc, service) => {
    const category = service.category || 'General Services';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Our Services</h3>
      
      {services.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🔧</div>
          <p className="text-slate-400">Services information coming soon!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <div key={category}>
              <h4 className="text-lg font-medium text-white mb-4 border-b border-slate-600 pb-2">
                {category}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {categoryServices.map((service) => (
                  <div key={service.id} className="bg-slate-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-white">{service.name}</h5>
                      {service.price && (
                        <span className="text-green-400 font-semibold">
                          {typeof service.price === 'number' ? `$${service.price}` : service.price}
                        </span>
                      )}
                    </div>
                    {service.description && (
                      <p className="text-slate-300 text-sm">{service.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}