/**
 * Auth Feature Public API
 * @module features/auth
 * 
 * Following Diamond Standard FSD:
 * - Features export their public API through index.ts
 * - Server Actions are exported for use in pages/widgets
 * 
 * @see {@link file://DIAMOND_STANDARD_REFERENCE.md}
 */

export { 
  createUserDocuments, 
  getUserData, 
  updateUserProfile 
} from './api/actions';
