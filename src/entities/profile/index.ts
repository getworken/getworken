/**
 * Profile Entity - Public API
 * @module entities/profile
 * 
 * ✅ DIAMOND STANDARD: Centralized entity exports
 * 
 * This is the main profile entity containing all profile domain logic:
 * - Business profile domain
 * - Contractor profile domain
 * - Employee profile domain
 * - Customer profile domain
 * - Shared profile models, types, and UI components
 */

// Profile Types & Schemas
export * from './model/types';
export * from './model/schemas';
export * from './model/profileAtom';

// Business Domain
export * from './business/api/actions';
export * from './business/model/businessAtom';

// Contractor Domain
export * from './contractor/api/actions';
export * from './contractor/model/contractorAtom';

// Employee Domain
export * from './employee/api/actions';
export * from './employee/model/employeeAtom';

// Customer Domain
export * from './customer/api/actions';
export * from './customer/model/customerAtom';

// Shared Profile UI Components
export * from './ui/ProfileBadge';
export * from './ui/ProfileAvatar';
export * from './ui/ProfileStats';
