/**
 * Profile Validation Schemas
 * @module entities/profile/model/schemas
 * 
 * ✅ DIAMOND STANDARD: Zod schemas for profile validation
 * Used for server action input validation and client-side forms
 */

import { z } from 'zod';

/**
 * Social media link schema
 */
export const SocialMediaLinkSchema = z.object({
  platform: z.enum(['facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'other']),
  url: z.string().url(),
});

/**
 * Service schema
 */
export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Service name is required'),
  description: z.string(),
  category: z.string().optional(),
  price: z.number().positive().optional(),
  priceUnit: z.enum(['hour', 'day', 'project', 'sqft']).optional(),
  featured: z.boolean().optional(),
});

/**
 * Company value schema
 */
export const CompanyValueSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  icon: z.string().optional(),
});

/**
 * Service area schema
 */
export const ServiceAreaSchema = z.object({
  id: z.string(),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zipCodes: z.array(z.string()).optional(),
  radius: z.number().positive().optional(),
});

/**
 * Team member schema
 */
export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  position: z.string(),
  bio: z.string().optional(),
  photo: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

/**
 * Testimonial schema
 */
export const TestimonialSchema = z.object({
  id: z.string(),
  customerName: z.string().min(1, 'Customer name is required'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, 'Comment is required'),
  projectType: z.string().optional(),
  date: z.date(),
  featured: z.boolean().optional(),
});

/**
 * Job listing schema
 */
export const JobListingSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  department: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['full-time', 'part-time', 'contract']),
  postedDate: z.date(),
  active: z.boolean(),
});

/**
 * Business branding schema
 */
export const BusinessBrandingSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  accentColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  heroHeadline: z.string().optional(),
  heroSubheadline: z.string().optional(),
  ctaButtonText: z.string().optional(),
  ctaButtonLink: z.string().url().optional(),
  showHero: z.boolean().optional(),
  showAbout: z.boolean().optional(),
  showMission: z.boolean().optional(),
  showStats: z.boolean().optional(),
  showServices: z.boolean().optional(),
  showTestimonials: z.boolean().optional(),
  showValues: z.boolean().optional(),
  showServiceAreas: z.boolean().optional(),
  showTeam: z.boolean().optional(),
  showGallery: z.boolean().optional(),
  showJobs: z.boolean().optional(),
  showContact: z.boolean().optional(),
  showSocialMedia: z.boolean().optional(),
});

/**
 * Profile stats visibility schema
 */
export const ProfileStatsVisibilitySchema = z.object({
  totalProjects: z.boolean().optional(),
  customerRating: z.boolean().optional(),
  totalReviews: z.boolean().optional(),
  yearsExperience: z.boolean().optional(),
  completedJobs: z.boolean().optional(),
});

/**
 * Business profile schema
 */
export const BusinessProfileSchema = z.object({
  businessId: z.string(),
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  story: z.string().optional(),
  mission: z.string().optional(),
  established: z.string().optional(),
  category: z.string().optional(),
  location: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }).optional(),
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
  }).optional(),
  logo: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  licenseNumber: z.string().optional(),
  insuranceNumber: z.string().optional(),
  isHiring: z.boolean().optional(),
  branding: BusinessBrandingSchema.optional(),
  services: z.array(ServiceSchema).optional(),
  testimonials: z.array(TestimonialSchema).optional(),
  companyValues: z.array(CompanyValueSchema).optional(),
  serviceAreas: z.array(ServiceAreaSchema).optional(),
  socialMedia: z.array(SocialMediaLinkSchema).optional(),
  teamMembers: z.array(TeamMemberSchema).optional(),
  jobListings: z.array(JobListingSchema).optional(),
  statsVisibility: ProfileStatsVisibilitySchema.optional(),
  isPublic: z.boolean(),
  verified: z.boolean(),
  active: z.boolean(),
  completed: z.boolean(),
});

/**
 * License schema
 */
export const LicenseSchema = z.object({
  id: z.string(),
  type: z.string().min(1, 'License type is required'),
  number: z.string().min(1, 'License number is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  expirationDate: z.date().optional(),
  verified: z.boolean().optional(),
});

/**
 * Certification schema
 */
export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certification name is required'),
  issuingOrganization: z.string().min(1, 'Issuing organization is required'),
  issueDate: z.date().optional(),
  expirationDate: z.date().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional(),
});

/**
 * Contractor profile schema
 */
export const ContractorProfileSchema = z.object({
  contractorId: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  displayName: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().optional(),
  professionalBio: z.string().optional(),
  specializations: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  experience: z.number().nonnegative().optional(),
  hourlyRate: z.number().positive().optional(),
  availability: z.enum(['available', 'busy', 'unavailable']).optional(),
  certifications: z.array(CertificationSchema).optional(),
  licenses: z.array(LicenseSchema).optional(),
  serviceAreas: z.array(ServiceAreaSchema).optional(),
  statsVisibility: ProfileStatsVisibilitySchema.optional(),
  isPublic: z.boolean(),
  verified: z.boolean(),
  active: z.boolean(),
  completed: z.boolean(),
});

/**
 * Employee profile schema
 */
export const EmployeeProfileSchema = z.object({
  employeeId: z.string(),
  businessId: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  displayName: z.string().optional(),
  position: z.string().optional(),
  title: z.string().optional(),
  department: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  hireDate: z.date().optional(),
  certifications: z.array(CertificationSchema).optional(),
  statsVisibility: ProfileStatsVisibilitySchema.optional(),
  isPublic: z.boolean(),
  verified: z.boolean(),
  active: z.boolean(),
  completed: z.boolean(),
});

/**
 * Customer profile schema
 */
export const CustomerProfileSchema = z.object({
  customerId: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  displayName: z.string().optional(),
  preferences: z.object({
    notificationChannels: z.array(z.enum(['email', 'sms', 'push'])),
    preferredContactTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']).optional(),
    language: z.string().optional(),
    communicationPreference: z.string().optional(),
  }).optional(),
  isPublic: z.boolean(),
  verified: z.boolean(),
  active: z.boolean(),
  completed: z.boolean(),
});
