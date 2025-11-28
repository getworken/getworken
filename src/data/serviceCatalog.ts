/**
 * Service Catalog - Complete list of services organized by category
 * @module data/serviceCatalog
 * 
 * Comprehensive catalog of field service offerings organized by trade category.
 * Used throughout the application for business profile setup, service selection,
 * and contractor specialization matching.
 * 
 * ✅ DIAMOND STANDARD: Centralized service definitions
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#data-layer}
 * 
 * @example
 * ```typescript
 * import { SERVICE_CATALOG, getCategoriesList } from '@data/serviceCatalog';
 * 
 * // Get all HVAC services
 * const hvacServices = SERVICE_CATALOG.filter(s => s.category === 'HVAC');
 * 
 * // Get all unique categories
 * const categories = getCategoriesList();
 * ```
 */

/**
 * Service catalog item structure
 * @interface ServiceCatalogItem
 */
export interface ServiceCatalogItem {
  /** Display name of the service */
  name: string;
  /** Category/trade the service belongs to */
  category: string;
  /** Emoji icon for visual representation */
  icon: string;
  /** Optional detailed description */
  description?: string;
}

/**
 * Complete service catalog with all available services
 * Organized by trade category for easy filtering and selection
 */
export const SERVICE_CATALOG: ServiceCatalogItem[] = [
  // HVAC Services
  { name: 'AC Installation', category: 'HVAC', icon: '❄️' },
  { name: 'AC Repair', category: 'HVAC', icon: '❄️' },
  { name: 'AC Maintenance', category: 'HVAC', icon: '❄️' },
  { name: 'Heating Installation', category: 'HVAC', icon: '🔥' },
  { name: 'Heating Repair', category: 'HVAC', icon: '🔥' },
  { name: 'Furnace Replacement', category: 'HVAC', icon: '🔥' },
  { name: 'Duct Cleaning', category: 'HVAC', icon: '🌬️' },
  { name: 'Thermostat Installation', category: 'HVAC', icon: '🌡️' },
  { name: 'Air Quality Testing', category: 'HVAC', icon: '💨' },
  { name: 'Heat Pump Service', category: 'HVAC', icon: '♨️' },
  
  // Plumbing Services
  { name: 'Pipe Repair', category: 'Plumbing', icon: '🚰' },
  { name: 'Drain Cleaning', category: 'Plumbing', icon: '🚰' },
  { name: 'Water Heater Installation', category: 'Plumbing', icon: '🔧' },
  { name: 'Water Heater Repair', category: 'Plumbing', icon: '🔧' },
  { name: 'Toilet Repair', category: 'Plumbing', icon: '🚽' },
  { name: 'Faucet Installation', category: 'Plumbing', icon: '🚿' },
  { name: 'Leak Detection', category: 'Plumbing', icon: '💧' },
  { name: 'Sewer Line Repair', category: 'Plumbing', icon: '🔧' },
  { name: 'Garbage Disposal', category: 'Plumbing', icon: '🗑️' },
  { name: 'Sump Pump Service', category: 'Plumbing', icon: '⚙️' },
  { name: 'Water Filtration', category: 'Plumbing', icon: '💧' },
  { name: 'Backflow Prevention', category: 'Plumbing', icon: '🔙' },
  
  // Electrical Services
  { name: 'Electrical Wiring', category: 'Electrical', icon: '⚡' },
  { name: 'Panel Upgrade', category: 'Electrical', icon: '⚡' },
  { name: 'Outlet Installation', category: 'Electrical', icon: '🔌' },
  { name: 'Light Fixture Installation', category: 'Electrical', icon: '💡' },
  { name: 'Ceiling Fan Installation', category: 'Electrical', icon: '🌀' },
  { name: 'Generator Installation', category: 'Electrical', icon: '⚡' },
  { name: 'EV Charger Installation', category: 'Electrical', icon: '🔋' },
  { name: 'Smart Home Wiring', category: 'Electrical', icon: '🏠' },
  { name: 'Security System Wiring', category: 'Electrical', icon: '🔒' },
  { name: 'Electrical Inspection', category: 'Electrical', icon: '🔍' },
  { name: 'Surge Protection', category: 'Electrical', icon: '⚡' },
  { name: 'Landscape Lighting', category: 'Electrical', icon: '💡' },
  
  // General Contracting
  { name: 'Kitchen Remodeling', category: 'Contracting', icon: '🔨' },
  { name: 'Bathroom Remodeling', category: 'Contracting', icon: '🔨' },
  { name: 'Basement Finishing', category: 'Contracting', icon: '🏗️' },
  { name: 'Room Addition', category: 'Contracting', icon: '🏗️' },
  { name: 'Deck Building', category: 'Contracting', icon: '🪵' },
  { name: 'Patio Installation', category: 'Contracting', icon: '🏗️' },
  { name: 'Drywall Installation', category: 'Contracting', icon: '🔨' },
  { name: 'Flooring Installation', category: 'Contracting', icon: '🏗️' },
  { name: 'Door Installation', category: 'Contracting', icon: '🚪' },
  { name: 'Window Installation', category: 'Contracting', icon: '🪟' },
  { name: 'Painting Interior', category: 'Contracting', icon: '🎨' },
  { name: 'Painting Exterior', category: 'Contracting', icon: '🎨' },
  { name: 'Tile Installation', category: 'Contracting', icon: '🔲' },
  { name: 'Cabinet Installation', category: 'Contracting', icon: '🗄️' },
  { name: 'Countertop Installation', category: 'Contracting', icon: '🏗️' },
  
  // Roofing Services
  { name: 'Roof Replacement', category: 'Roofing', icon: '🏠' },
  { name: 'Roof Repair', category: 'Roofing', icon: '🏠' },
  { name: 'Roof Inspection', category: 'Roofing', icon: '🔍' },
  { name: 'Gutter Installation', category: 'Roofing', icon: '💧' },
  { name: 'Gutter Cleaning', category: 'Roofing', icon: '🧹' },
  { name: 'Skylight Installation', category: 'Roofing', icon: '☀️' },
  { name: 'Roof Coating', category: 'Roofing', icon: '🎨' },
  { name: 'Emergency Roof Repair', category: 'Roofing', icon: '🚨' },
  
  // Landscaping Services
  { name: 'Lawn Maintenance', category: 'Landscaping', icon: '🌳' },
  { name: 'Lawn Mowing', category: 'Landscaping', icon: '🌱' },
  { name: 'Tree Trimming', category: 'Landscaping', icon: '🌲' },
  { name: 'Tree Removal', category: 'Landscaping', icon: '🪓' },
  { name: 'Irrigation System', category: 'Landscaping', icon: '💧' },
  { name: 'Sod Installation', category: 'Landscaping', icon: '🌿' },
  { name: 'Mulching', category: 'Landscaping', icon: '🍂' },
  { name: 'Fertilization', category: 'Landscaping', icon: '🌱' },
  { name: 'Weed Control', category: 'Landscaping', icon: '🌿' },
  { name: 'Landscape Design', category: 'Landscaping', icon: '🎨' },
  { name: 'Hardscaping', category: 'Landscaping', icon: '🪨' },
  { name: 'Retaining Walls', category: 'Landscaping', icon: '🧱' },
  { name: 'Garden Bed Installation', category: 'Landscaping', icon: '🌺' },
  
  // Pool Services
  { name: 'Pool Installation', category: 'Pool', icon: '🏊' },
  { name: 'Pool Repair', category: 'Pool', icon: '🔧' },
  { name: 'Pool Cleaning', category: 'Pool', icon: '🧹' },
  { name: 'Pool Maintenance', category: 'Pool', icon: '⚙️' },
  { name: 'Pool Resurfacing', category: 'Pool', icon: '🎨' },
  { name: 'Pool Equipment Repair', category: 'Pool', icon: '🔧' },
  { name: 'Hot Tub Service', category: 'Pool', icon: '♨️' },
  { name: 'Pool Opening/Closing', category: 'Pool', icon: '🏊' },
  
  // Appliance Services
  { name: 'Refrigerator Repair', category: 'Appliance', icon: '❄️' },
  { name: 'Washer Repair', category: 'Appliance', icon: '🔧' },
  { name: 'Dryer Repair', category: 'Appliance', icon: '🔧' },
  { name: 'Dishwasher Repair', category: 'Appliance', icon: '🍽️' },
  { name: 'Oven Repair', category: 'Appliance', icon: '🍳' },
  { name: 'Appliance Installation', category: 'Appliance', icon: '🔧' },
  
  // Pest Control
  { name: 'General Pest Control', category: 'Pest Control', icon: '🐛' },
  { name: 'Termite Treatment', category: 'Pest Control', icon: '🐜' },
  { name: 'Rodent Control', category: 'Pest Control', icon: '🐀' },
  { name: 'Bed Bug Treatment', category: 'Pest Control', icon: '🛏️' },
  { name: 'Mosquito Control', category: 'Pest Control', icon: '🦟' },
  { name: 'Wildlife Removal', category: 'Pest Control', icon: '🦝' },
  
  // Cleaning Services
  { name: 'House Cleaning', category: 'Cleaning', icon: '🧹' },
  { name: 'Deep Cleaning', category: 'Cleaning', icon: '✨' },
  { name: 'Carpet Cleaning', category: 'Cleaning', icon: '🧽' },
  { name: 'Window Cleaning', category: 'Cleaning', icon: '🪟' },
  { name: 'Pressure Washing', category: 'Cleaning', icon: '💦' },
  { name: 'Move-In/Out Cleaning', category: 'Cleaning', icon: '📦' },
  
  // Security Services
  { name: 'Security System Installation', category: 'Security', icon: '🔒' },
  { name: 'Camera Installation', category: 'Security', icon: '📹' },
  { name: 'Access Control Systems', category: 'Security', icon: '🔐' },
  { name: 'Lock Installation', category: 'Security', icon: '🔑' },
  { name: 'Lock Repair', category: 'Security', icon: '🔧' },
  { name: 'Safe Installation', category: 'Security', icon: '🔒' },
  
  // Garage Services
  { name: 'Garage Door Installation', category: 'Garage', icon: '🚪' },
  { name: 'Garage Door Repair', category: 'Garage', icon: '🔧' },
  { name: 'Garage Door Opener', category: 'Garage', icon: '⚙️' },
  { name: 'Garage Organization', category: 'Garage', icon: '📦' },
  
  // Flooring Services
  { name: 'Hardwood Installation', category: 'Flooring', icon: '🪵' },
  { name: 'Laminate Installation', category: 'Flooring', icon: '🔲' },
  { name: 'Tile Flooring', category: 'Flooring', icon: '🔲' },
  { name: 'Vinyl Flooring', category: 'Flooring', icon: '🔲' },
  { name: 'Carpet Installation', category: 'Flooring', icon: '🧵' },
  { name: 'Floor Refinishing', category: 'Flooring', icon: '✨' },
  
  // Concrete Services
  { name: 'Concrete Driveway', category: 'Concrete', icon: '🛣️' },
  { name: 'Concrete Patio', category: 'Concrete', icon: '🏗️' },
  { name: 'Concrete Repair', category: 'Concrete', icon: '🔧' },
  { name: 'Stamped Concrete', category: 'Concrete', icon: '🎨' },
  { name: 'Foundation Repair', category: 'Concrete', icon: '🏗️' },
  
  // Fencing Services
  { name: 'Fence Installation', category: 'Fencing', icon: '🪚' },
  { name: 'Fence Repair', category: 'Fencing', icon: '🔧' },
  { name: 'Gate Installation', category: 'Fencing', icon: '🚪' },
  { name: 'Privacy Fence', category: 'Fencing', icon: '🏗️' },
  { name: 'Chain Link Fence', category: 'Fencing', icon: '⛓️' },
  
  // Insulation Services
  { name: 'Attic Insulation', category: 'Insulation', icon: '🏠' },
  { name: 'Wall Insulation', category: 'Insulation', icon: '🧱' },
  { name: 'Crawl Space Insulation', category: 'Insulation', icon: '🏗️' },
  { name: 'Spray Foam Insulation', category: 'Insulation', icon: '💨' },
  
  // Handyman Services
  { name: 'General Handyman', category: 'Handyman', icon: '🔧' },
  { name: 'Furniture Assembly', category: 'Handyman', icon: '🪑' },
  { name: 'TV Mounting', category: 'Handyman', icon: '📺' },
  { name: 'Shelving Installation', category: 'Handyman', icon: '📚' },
  { name: 'Minor Repairs', category: 'Handyman', icon: '🔨' },
];

export const SERVICE_CATEGORIES = Array.from(new Set(SERVICE_CATALOG.map(service => service.category))).sort();
