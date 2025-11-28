/**
 * Profile Validation Helpers
 * @module shared/lib/profile/profileValidation
 * 
 * ✅ DIAMOND STANDARD: Profile validation utilities
 */

/**
 * Validate email format
 * 
 * @param email - Email address to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (US)
 * 
 * @param phone - Phone number to validate
 * @returns True if phone is valid
 */
export function isValidPhone(phone: string): boolean {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  // US phone numbers should have 10 digits
  return digits.length === 10;
}

/**
 * Validate URL format
 * 
 * @param url - URL to validate
 * @returns True if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate ZIP code format (US)
 * 
 * @param zipCode - ZIP code to validate
 * @returns True if ZIP code is valid
 */
export function isValidZipCode(zipCode: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
}

/**
 * Validate hex color format
 * 
 * @param color - Hex color to validate
 * @returns True if color is valid
 */
export function isValidHexColor(color: string): boolean {
  const hexRegex = /^#[0-9A-F]{6}$/i;
  return hexRegex.test(color);
}

/**
 * Check if profile is complete enough to be made public
 * 
 * @param profile - Profile object
 * @returns True if profile meets minimum requirements
 */
export function isProfilePublicReady(profile: any): boolean {
  // Minimum requirements for public profile
  return (
    profile.completed === true &&
    profile.active === true &&
    profile.verified === true
  );
}

/**
 * Calculate profile completion percentage
 * 
 * @param profile - Profile object
 * @param requiredFields - Array of required field names
 * @returns Completion percentage (0-100)
 */
export function calculateProfileCompletion(
  profile: Record<string, any>,
  requiredFields: string[]
): number {
  if (!profile || requiredFields.length === 0) {
    return 0;
  }
  
  const completedFields = requiredFields.filter(field => {
    const value = profile[field];
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  });
  
  return Math.round((completedFields.length / requiredFields.length) * 100);
}
