/**
 * Profile Entity Type Definitions
 * @module entities/profile/model/types
 * 
 * ✅ DIAMOND STANDARD: Domain entity types for different profile types
 */

import { Timestamps, SoftDelete } from '@/shared/types';

/**
 * Base profile interface
 */
interface BaseProfile extends Timestamps, SoftDelete {
  userId: string;
  isPublic: boolean;
  verified: boolean;
  active: boolean;
  completed: boolean;
  onboardingStep?: number;
}

/**
 * Profile status visibility settings
 */
export interface ProfileStatsVisibility {
  totalProjects?: boolean;
  customerRating?: boolean;
  totalReviews?: boolean;
  yearsExperience?: boolean;
  completedJobs?: boolean;
}

/**
 * Social media links
 */
export interface SocialMediaLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'other';
  url: string;
}

/**
 * Service offered by business or contractor
 */
export interface Service {
  id: string;
  name: string;
  description: string;
  category?: string;
  price?: number;
  priceUnit?: 'hour' | 'day' | 'project' | 'sqft';
  featured?: boolean;
}

/**
 * Company value or mission statement
 */
export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

/**
 * Service area coverage
 */
export interface ServiceArea {
  id: string;
  city: string;
  state: string;
  zipCodes?: string[];
  radius?: number; // miles
}

/**
 * Team member
 * 
 * ✅ DIAMOND STANDARD: Team member entity
 */
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  role?: string; // Job role/title
  bio?: string;
  photo?: string;
  email?: string;
  phone?: string;
}

/**
 * Testimonial/Review
 */
export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  projectType?: string;
  date: Date;
  featured?: boolean;
}

/**
 * Job listing
 */
export interface JobListing {
  id: string;
  title: string;
  description: string;
  department?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  salaryRange?: string;
  requirements?: string[];
  postedDate: Date;
  active: boolean;
}

/**
 * Business branding settings
 */
export interface BusinessBranding {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  showHero?: boolean;
  showAbout?: boolean;
  showMission?: boolean;
  showStats?: boolean;
  showServices?: boolean;
  showTestimonials?: boolean;
  showValues?: boolean;
  showServiceAreas?: boolean;
  showTeam?: boolean;
  showGallery?: boolean;
  showJobs?: boolean;
  showContact?: boolean;
  showSocialMedia?: boolean;
}

/**
 * Business profile
 * 
 * ✅ DIAMOND STANDARD: Complete business entity type definition
 * Supports both nested (contact.email) and flat (email) field access
 */
export interface BusinessProfile extends BaseProfile {
  businessId: string;
  businessName: string;
  businessType?: string;
  industry?: string;
  tagline?: string;
  description?: string;
  story?: string;
  mission?: string;
  established?: string;
  category?: string;
  
  // Convenience fields (can be accessed directly)
  displayName?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
  
  // Nested structured data
  location?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  
  logo?: string;
  coverImage?: string;
  rating?: number;
  reviewCount?: number;
  licenseNumber?: string;
  insuranceNumber?: string;
  isHiring?: boolean;
  branding?: BusinessBranding;
  services?: Service[];
  testimonials?: Testimonial[];
  companyValues?: CompanyValue[];
  serviceAreas?: ServiceArea[];
  socialMedia?: SocialMediaLink[];
  teamMembers?: TeamMember[];
  jobListings?: JobListing[];
  statsVisibility?: ProfileStatsVisibility;
}

/**
 * License information
 */
export interface License {
  id: string;
  name?: string; // License name/title
  type: string;
  number: string;
  state: string;
  expirationDate?: Date;
  verified?: boolean;
}

/**
 * Training/Education record
 */
export interface Training {
  id: string;
  name: string;
  institution: string;
  program?: string;
  provider?: string;
  hours?: number;
  completionDate?: Date;
  certificateUrl?: string;
}

/**
 * Certification
 */
export interface Certification {
  id: string;
  name: string;
  issuer?: string; // Alias for issuingOrganization
  issuingOrganization: string;
  issueDate?: Date;
  expirationDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  verified?: boolean;
}

/**
 * Equipment/Tool
 */
export interface Equipment {
  id: string;
  name: string;
  type: string;
  owned: boolean;
  condition?: string;
}

/**
 * Portfolio item
 */
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  completedDate?: Date;
  projectType?: string;
  clientName?: string;
}

/**
 * Availability schedule
 */
export interface AvailabilitySchedule {
  monday?: { start: string; end: string; available: boolean };
  tuesday?: { start: string; end: string; available: boolean };
  wednesday?: { start: string; end: string; available: boolean };
  thursday?: { start: string; end: string; available: boolean };
  friday?: { start: string; end: string; available: boolean };
  saturday?: { start: string; end: string; available: boolean };
  sunday?: { start: string; end: string; available: boolean };
  daysAvailable?: string[];
  hoursAvailable?: any[];
}

/**
 * ✅ DIAMOND STANDARD: Complete contractor entity type definition
 * Supports both flat convenience fields and nested structured data
 */
export interface ContractorProfile extends BaseProfile {
  contractorId: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  title?: string;
  bio?: string;
  professionalBio?: string;
  
  // Convenience fields (flat access for UI components)
  email?: string;
  phone?: string;
  phoneNumber?: string; // Alias for phone
  specialties?: string[]; // Alias for specializations
  insurance?: any[]; // Insurance policies
  yearsOfExperience?: number;
  pastProjectsCount?: number;
  languages?: any[];
  preferences?: any;
  dailyRate?: number;
  references?: any[];
  
  // Structured fields (nested access for backend)
  specializations?: string[];
  skills?: string[];
  experience?: number; // years
  hourlyRate?: number;
  availability?: 'available' | 'busy' | 'unavailable';
  location?: {
    address?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact?: {
    email?: string;
    phone?: string;
  };
  profileImage?: string;
  rating?: number;
  reviewCount?: number;
  totalProjects?: number;
  certifications?: Certification[];
  licenses?: License[];
  training?: Training[];
  equipment?: Equipment[];
  portfolio?: PortfolioItem[];
  serviceAreas?: ServiceArea[];
  availabilitySchedule?: AvailabilitySchedule;
  schedule?: AvailabilitySchedule; // Alias for availabilitySchedule
  statsVisibility?: ProfileStatsVisibility;
  documents?: any[]; // Contractor documents
  backgroundCheck?: any; // Background check status and details
}

/**
 * ✅ DIAMOND STANDARD: Complete employee entity type definition
 * Supports both flat convenience fields and nested structured data
 */
export interface EmployeeProfile extends BaseProfile {
  employeeId: string;
  businessId: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  position?: string;
  title?: string;
  department?: string;
  bio?: string;
  
  // Convenience fields (flat access for UI components)
  email?: string;
  phone?: string;
  phoneNumber?: string; // Alias for phone
  specializations?: string[]; // Employee specializations
  
  // Structured fields
  skills?: string[];
  hireDate?: Date;
  profileImage?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  permissions?: {
    canCreateJobs: boolean;
    canManageTeam: boolean;
    canViewFinancials: boolean;
    canManageClients: boolean;
  };
  certifications?: Certification[];
  availabilitySchedule?: AvailabilitySchedule;
  statsVisibility?: ProfileStatsVisibility;
}

/**
 * Address information
 */
export interface Address {
  id: string;
  type: 'home' | 'work' | 'billing' | 'shipping';
  label?: string;
  address: string;
  street?: string;
  city: string;
  state: string;
  zipCode: string;
  zip?: string;
  isDefault?: boolean;
}

/**
 * Payment method
 */
export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  expiryDate?: string;
  isDefault?: boolean;
}

/**
 * Customer activity log
 */
export interface CustomerActivity {
  id: string;
  type: 'job_created' | 'job_completed' | 'review_left' | 'payment_made';
  description: string;
  date: Date;
  metadata?: Record<string, any>;
}

/**
 * Customer interaction log
 */
export interface CustomerInteraction {
  id: string;
  type: 'call' | 'email' | 'message' | 'meeting';
  subject: string;
  notes?: string;
  date: Date;
  staffMemberId?: string;
}

/**
 * Customer loyalty/rewards
 */
export interface LoyaltyReward {
  id: string;
  points: number;
  tier?: string;
  benefits?: string[];
  expirationDate?: Date;
}

/**
 * ✅ DIAMOND STANDARD: Complete customer entity type definition
 * Supports both flat convenience fields and nested structured data
 */
export interface CustomerProfile extends BaseProfile {
  customerId: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  name?: string;
  
  // Convenience fields (flat access for UI components)
  email?: string;
  phoneNumber?: string;
  phone?: string;
  documents?: any[];
  loyalty?: any;
  notes?: any[];
  orders?: any[];
  reviews?: any[];
  serviceRequests?: any[];
  
  // Structured fields
  location?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  profileImage?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  preferences?: {
    notificationChannels?: ('email' | 'sms' | 'push')[];
    preferredContactTime?: 'morning' | 'afternoon' | 'evening' | 'anytime';
    language?: string;
    communicationPreference?: string;
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    marketingCommunications?: boolean;
    profileVisibility?: string;
    dataSharing?: boolean;
  };
  addresses?: Address[];
  savedAddresses?: Address[]; // Alias for addresses
  paymentMethods?: PaymentMethod[];
  recentJobs?: string[]; // Job IDs
  activityLog?: CustomerActivity[];
  interactionHistory?: CustomerInteraction[];
  loyaltyRewards?: LoyaltyReward;
  totalSpent?: number;
  totalJobs?: number;
}

/**
 * Union type of all profile types
 */
export type Profile =
  | BusinessProfile
  | ContractorProfile
  | EmployeeProfile
  | CustomerProfile;
