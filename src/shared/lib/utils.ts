import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes using clsx and tailwind-merge.
 * Part of the shared utility layer for shadcn/ui integration.
 *
 * This utility combines class names and resolves Tailwind CSS conflicts,
 * ensuring that later classes override earlier ones correctly.
 *
 * @param inputs - Class values to merge (strings, arrays, objects, etc.)
 * @returns Merged and deduplicated class string
 *
 * @example
 * cn('px-2 py-1', 'px-4') // Returns: 'py-1 px-4'
 * cn('text-red-500', { 'text-blue-500': true }) // Returns: 'text-blue-500'
 *
 * @see {@link https://ui.shadcn.com/docs/installation}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
