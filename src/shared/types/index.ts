/**
 * Global TypeScript Type Definitions
 * @module shared/types
 * 
 * This file contains shared types used across the entire application
 * Part of the Diamond Standard shared layer
 */

/**
 * User roles in the application (Custom Claims)
 * ✅ DIAMOND STANDARD: Static roles stored in Firebase Custom Claims
 */
export type UserRole = 'super-admin' | 'admin' | 'moderator' | 'support' | 'client';

/**
 * Profile types that a user can have
 */
export type ProfileType = 'business' | 'contractor' | 'employee' | 'customer';

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

/**
 * Common timestamp fields
 */
export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Soft delete support
 */
export interface SoftDelete {
  deleted: boolean;
  deletedAt?: Date;
}
