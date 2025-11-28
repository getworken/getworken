/**
 * Dashboard Page
 * @module pages/dashboard
 *
 * Following Diamond Standard v2.0:
 * - Client component for user interaction
 * - Uses client-side state for tab navigation (URL stays as /dashboard)
 * - Tab state managed by DashboardContext (from layout)
 * - Locale-aware navigation via next-intl
 * - WCAG 2.2 accessibility compliant
 * - Proper error handling
 *
 * @see {@link file://DIAMOND_STANDARD_REFERENCE.md}
 */

'use client';

import { useTranslations } from 'next-intl';
import { useState, Suspense, lazy } from 'react';
import { useDashboard } from '@/widgets/dashboard-layout/model/DashboardContext';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { SERVICE_CATALOG } from '@/data/serviceCatalog';

type ProfileType = 'business' | 'contractor' | 'employee' | 'customer';

// Lazy load profile tab components
const BusinessProfileTab = lazy(() =>
  import('@/widgets/profile/BusinessProfileTab').then((m) => ({
    default: m.BusinessProfileTab,
  }))
);
const ContractorProfileTab = lazy(() =>
  import('@/widgets/profile/ContractorProfileTab').then((m) => ({
    default: m.ContractorProfileTab,
  }))
);
const EmployeeProfileTab = lazy(() =>
  import('@/widgets/profile/EmployeeProfileTab').then((m) => ({
    default: m.EmployeeProfileTab,
  }))
);
const CustomerProfileTab = lazy(() =>
  import('@/widgets/profile/CustomerProfileTab').then((m) => ({
    default: m.CustomerProfileTab,
  }))
);

// Lazy load modals
const ServiceModal = lazy(() => import('@/shared/ui/modals/ServiceModal'));
const TestimonialModal = lazy(
  () => import('@/shared/ui/modals/TestimonialModal')
);
const TeamModal = lazy(() => import('@/shared/ui/modals/TeamModal'));
const JobModal = lazy(() => import('@/shared/ui/modals/JobModal'));
const ValueModal = lazy(() => import('@/shared/ui/modals/ValueModal'));
const ServiceAreaModal = lazy(
  () => import('@/shared/ui/modals/ServiceAreaModal')
);
const SocialMediaModal = lazy(
  () => import('@/shared/ui/modals/SocialMediaModal')
);
const SkillsModal = lazy(() => import('@/shared/ui/modals/SkillsModal'));
const SpecializationModal = lazy(
  () => import('@/shared/ui/modals/SpecializationModal')
);
const PermissionsModal = lazy(
  () => import('@/shared/ui/modals/PermissionsModal')
);
const InviteModal = lazy(() => import('@/shared/ui/modals/InviteModal'));
const MyInvitesModal = lazy(() => import('@/shared/ui/modals/MyInvitesModal'));
const ContractorJobHistoryModal = lazy(
  () => import('@/shared/ui/modals/ContractorJobHistoryModal')
);
const EmployeeJobHistoryModal = lazy(
  () => import('@/shared/ui/modals/EmployeeJobHistoryModal')
);

// Lazy load public profile components
const PublicBusinessProfile = lazy(
  () => import('@/widgets/profile/public/PublicBusinessProfile')
);
const PublicContractorProfile = lazy(
  () => import('@/widgets/profile/public/PublicContractorProfile')
);
const PublicEmployeeProfile = lazy(
  () => import('@/widgets/profile/public/PublicEmployeeProfile')
);
const PublicCustomerProfile = lazy(
  () => import('@/widgets/profile/public/PublicCustomerProfile')
);

function ProfileTabContent() {
  const [activeProfile, setActiveProfile] = useState<ProfileType>('business');

  // Mock active profiles - in real app this comes from user.profiles
  const activeProfiles: ProfileType[] = ['business', 'customer'];

  // Mock state for profile data
  const [businessInfo, setBusinessInfo] = useState<any>({
    businessName: 'My Business',
    industry: 'Construction',
    email: 'business@example.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Main St',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'USA',
    },
    isVerified: true,
    story: '',
    mission: '',
  });

  const [branding, setBranding] = useState<any>({
    primaryColor: '#14b8a6',
    secondaryColor: '#06b6d4',
  });

  const [businessStatsVisibility, setBusinessStatsVisibility] = useState<any>({
    totalProjects: true,
    activeJobs: true,
    teamMembers: true,
    rating: true,
  });

  // Business management data
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [companyValues, setCompanyValues] = useState<any[]>([]);
  const [serviceAreas, setServiceAreas] = useState<any[]>([]);
  const [socialMedia, setSocialMedia] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [displayTeamMembers, setDisplayTeamMembers] = useState<any[]>([]);
  const [jobListings, setJobListings] = useState<any[]>([]);
  const [isHiring, setIsHiring] = useState(false);

  // Modal states
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [showValueModal, setShowValueModal] = useState(false);
  const [showServiceAreaModal, setShowServiceAreaModal] = useState(false);
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showSpecializationModal, setShowSpecializationModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showMyInvitesModal, setShowMyInvitesModal] = useState(false);
  const [showContractorJobHistoryModal, setShowContractorJobHistoryModal] =
    useState(false);
  const [showEmployeeJobHistoryModal, setShowEmployeeJobHistoryModal] =
    useState(false);
  const [showPublicProfile, setShowPublicProfile] = useState(false);
  const [showContractorPublicProfile, setShowContractorPublicProfile] =
    useState(false);
  const [showEmployeePublicProfile, setShowEmployeePublicProfile] =
    useState(false);
  const [showCustomerPublicProfile, setShowCustomerPublicProfile] =
    useState(false);

  // Modal form states
  const [serviceSearchTerm, setServiceSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    text: '',
    rating: 5,
  });
  const [newValue, setNewValue] = useState({ icon: '🎯', value: '' });
  const [newServiceArea, setNewServiceArea] = useState({
    name: '',
    radius: '20 miles',
  });
  const [newSocialMedia, setNewSocialMedia] = useState({
    platform: 'Facebook',
    url: '',
    icon: '📘',
  });

  // Invite modal states
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteType, setInviteType] = useState<'contractor' | 'employee'>(
    'contractor'
  );
  const [inviteDirectorySearch, setInviteDirectorySearch] = useState('');
  const [pendingInvitations, setPendingInvitations] = useState<any[]>([]);
  const [myInvites, setMyInvites] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<{
    contractors: any[];
    employees: any[];
  }>({ contractors: [], employees: [] });
  const subscription = { tier: 'pro', contractorLimit: 50, employeeLimit: 100 };
  const directoryContractors: any[] = [];
  const directoryEmployees: any[] = [];
  const user = { uid: 'demo-user-123', email: 'demo@example.com' };

  const [contractorProfile, setContractorProfile] = useState<any>({
    firstName: 'John',
    lastName: 'Contractor',
    email: 'john@example.com',
    phone: '(555) 234-5678',
    location: 'Austin, TX',
    title: 'General Contractor',
    status: 'active',
    isVerified: true,
  });

  const [employeeProfile, setEmployeeProfile] = useState<any>({
    firstName: 'Jane',
    lastName: 'Employee',
    email: 'jane@example.com',
    phone: '(555) 345-6789',
    phoneNumber: '(555) 345-6789',
    employeeId: 'EMP-001',
    position: 'Project Manager',
    status: 'active',
    isVerified: true,
    city: 'Austin',
    state: 'TX',
    bio: 'Experienced project manager with 5+ years in the industry.',
    specializations: ['Project Management', 'Team Leadership', 'Agile'],
    statsVisibility: {
      showRating: true,
      showTasksCompleted: true,
      showExperience: true,
      showSatisfaction: true,
    },
    stats: {
      rating: 4.8,
      tasksCompleted: 156,
      experience: 5,
      satisfaction: 98,
    },
    availability: {
      status: 'available',
      workingHours: { start: '09:00', end: '17:00' },
      daysAvailable: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
  });

  const [customerProfile] = useState<any>({
    firstName: 'Bob',
    lastName: 'Customer',
    email: 'bob@example.com',
    phone: '(555) 456-7890',
    phoneNumber: '(555) 456-7890',
    customerId: 'CUST-001',
    memberSince: '2024',
    isVerified: true,
    city: 'Austin',
    state: 'TX',
    statsVisibility: {
      showJobsCompleted: true,
      showTotalSpent: true,
      showAvgRating: true,
    },
    stats: {
      jobsCompleted: 23,
      totalSpent: 45000,
      avgRating: 4.9,
    },
    addresses: [],
  });

  // Instant save functions for availability schedules
  const instantSaveContractorProfile = async (updates: any) => {
    setContractorProfile((prev: any) => ({ ...prev, ...updates }));

    // Call the API route to save to Firestore
    try {
      const contractorId = `CONT-${contractorProfile.userId || 'TEMP'}`; // Replace with actual user ID
      const response = await fetch('/api/profiles/update-contractor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractorId, updates }),
      });
      const result = await response.json();
      if (!result.success) {
        console.error('Failed to save contractor profile:', result.error);
      }
    } catch (error) {
      console.error('Error saving contractor profile:', error);
    }

    return Promise.resolve();
  };

  const instantSaveEmployeeProfile = async (updates: any) => {
    setEmployeeProfile((prev: any) => ({ ...prev, ...updates }));

    // Call the API route to save to Firestore
    try {
      const employeeId = `EMP-${employeeProfile.userId || 'TEMP'}`; // Replace with actual user ID
      const response = await fetch('/api/profiles/update-employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, updates }),
      });
      const result = await response.json();
      if (!result.success) {
        console.error('Failed to save employee profile:', result.error);
      }
    } catch (error) {
      console.error('Error saving employee profile:', error);
    }

    return Promise.resolve();
  };

  // Business info update wrapper - saves to Firestore
  const updateBusinessInfo = async (updates: any) => {
    setBusinessInfo(updates);

    // Call the API route to save to Firestore
    try {
      const businessId = `BIZ-${businessInfo.userId || 'TEMP'}`; // Replace with actual user ID
      const response = await fetch('/api/profiles/update-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, updates }),
      });
      const result = await response.json();
      if (!result.success) {
        console.error('Failed to save business profile:', result.error);
      }
    } catch (error) {
      console.error('Error saving business profile:', error);
    }
  };

  const isProfileActive = (profileType: ProfileType) => {
    return activeProfiles.includes(profileType);
  };

  const getButtonStyle = (profileType: ProfileType) => {
    const isActive = isProfileActive(profileType);
    const isSelected = activeProfile === profileType;

    if (isSelected) {
      switch (profileType) {
        case 'business':
          return 'bg-teal-600 text-white';
        case 'contractor':
          return 'bg-emerald-600 text-white';
        case 'employee':
          return 'bg-blue-600 text-white';
        case 'customer':
          return 'bg-purple-600 text-white';
        default:
          return 'bg-slate-600 text-white';
      }
    } else if (isActive) {
      return 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-green-500/30';
    } else {
      return 'bg-slate-700 text-slate-400 hover:bg-slate-600 border border-yellow-500/30';
    }
  };

  const getButtonText = (profileType: ProfileType) => {
    const profileName =
      profileType.charAt(0).toUpperCase() + profileType.slice(1);
    return profileName;
  };

  const getProfileGradient = () => {
    switch (activeProfile) {
      case 'business':
        return 'from-teal-500 to-cyan-600';
      case 'contractor':
        return 'from-emerald-500 to-green-600';
      case 'employee':
        return 'from-blue-500 to-indigo-600';
      case 'customer':
        return 'from-purple-500 to-indigo-600';
      default:
        return 'from-teal-500 to-cyan-600';
    }
  };

  const getProfileTitle = () => {
    switch (activeProfile) {
      case 'business':
        return 'Business Profile';
      case 'contractor':
        return 'Contractor Profile';
      case 'employee':
        return 'Employee Profile';
      case 'customer':
        return 'Customer Profile';
      default:
        return 'Profile';
    }
  };

  const getProfileDescription = () => {
    switch (activeProfile) {
      case 'business':
        return 'Manage your business information and public profile';
      case 'contractor':
        return 'Manage your contractor information and public profile';
      case 'employee':
        return 'Manage your employee information and public profile';
      case 'customer':
        return 'View your customer information and interaction history';
      default:
        return 'Manage your profile';
    }
  };

  const allProfileTypes: ProfileType[] = [
    'business',
    'contractor',
    'employee',
    'customer',
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Sticky Header - Three Column Layout */}
      <div className="sticky top-0 z-10 flex-shrink-0 border-b border-slate-700 bg-slate-800 px-8 py-6">
        <div className="grid grid-cols-3 items-center gap-6">
          {/* Left Section: Title and Description */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              {getProfileTitle()}
            </h2>
            <p className="mt-1 text-slate-400">{getProfileDescription()}</p>
          </div>

          {/* Middle Section: View Button and Toggle */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                if (activeProfile === 'business') setShowPublicProfile(true);
                else if (activeProfile === 'contractor')
                  setShowContractorPublicProfile(true);
                else if (activeProfile === 'employee')
                  setShowEmployeePublicProfile(true);
                else if (activeProfile === 'customer')
                  setShowCustomerPublicProfile(true);
              }}
              className={`bg-gradient-to-r px-4 py-2 ${getProfileGradient()} whitespace-nowrap rounded-lg text-white transition hover:opacity-90`}
            >
              👁️ Public Profile
            </button>
            {/* Toggle or Invisible Placeholder */}
            {activeProfile !== 'customer' ? (
              <div className="flex items-center gap-2">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked
                    aria-label="Toggle public profile visibility"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-slate-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-800"></div>
                </label>
              </div>
            ) : (
              <div className="w-[100px]"></div>
            )}
          </div>

          {/* Right Section: Profile Type Switcher Buttons */}
          <div className="flex justify-end">
            <div className="flex gap-2">
              {allProfileTypes.map((profileType) => (
                <button
                  key={profileType}
                  onClick={() => setActiveProfile(profileType)}
                  className={`rounded-lg px-4 py-2 font-medium transition-colors ${getButtonStyle(profileType)}`}
                  aria-label={`Switch to ${profileType} profile ${isProfileActive(profileType) ? '' : ''}`}
                  title={
                    isProfileActive(profileType)
                      ? `View ${profileType} profile`
                      : `Set up ${profileType} profile`
                  }
                >
                  {getButtonText(profileType)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-8 p-8">
          <Suspense
            fallback={
              <div className="rounded-lg bg-slate-700 p-8 text-center">
                <div className="text-slate-400">Loading profile...</div>
              </div>
            }
          >
            {activeProfile === 'business' && (
              <BusinessProfileTab
                businessInfo={businessInfo}
                setBusinessInfo={updateBusinessInfo}
                branding={branding}
                setBranding={setBranding}
                businessStatsVisibility={businessStatsVisibility}
                setBusinessStatsVisibility={setBusinessStatsVisibility}
                testimonials={testimonials}
                setTestimonials={setTestimonials}
                companyValues={companyValues}
                setCompanyValues={setCompanyValues}
                serviceAreas={serviceAreas}
                setServiceAreas={setServiceAreas}
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                services={services}
                setServices={setServices}
                displayTeamMembers={displayTeamMembers}
                setDisplayTeamMembers={setDisplayTeamMembers}
                jobListings={jobListings}
                setJobListings={setJobListings}
                isHiring={isHiring}
                setIsHiring={setIsHiring}
                setShowServiceModal={setShowServiceModal}
                setShowTestimonialModal={setShowTestimonialModal}
                setShowValueModal={setShowValueModal}
                setShowServiceAreaModal={setShowServiceAreaModal}
                setShowSocialMediaModal={setShowSocialMediaModal}
                setShowTeamModal={setShowTeamModal}
                setShowJobModal={setShowJobModal}
              />
            )}
            {activeProfile === 'contractor' && (
              <ContractorProfileTab
                contractorProfile={contractorProfile}
                updateContractorProfile={(updates: any) =>
                  setContractorProfile({ ...contractorProfile, ...updates })
                }
                instantSaveContractorProfile={instantSaveContractorProfile}
                licenses={[]}
                certifications={[]}
                setShowSpecializationModal={setShowSpecializationModal}
                setShowContractorJobHistoryModal={
                  setShowContractorJobHistoryModal
                }
              />
            )}
            {activeProfile === 'employee' && (
              <EmployeeProfileTab
                employeeProfile={employeeProfile}
                updateEmployeeProfile={(updates: any) =>
                  setEmployeeProfile({ ...employeeProfile, ...updates })
                }
                instantSaveEmployeeProfile={instantSaveEmployeeProfile}
                certifications={[]}
                setShowSkillsModal={setShowSkillsModal}
                setShowPermissionsModal={setShowPermissionsModal}
                setShowEmployeeJobHistoryModal={setShowEmployeeJobHistoryModal}
              />
            )}
            {activeProfile === 'customer' && (
              <CustomerProfileTab
                customerProfile={customerProfile}
                addresses={[]}
                paymentMethods={[]}
                recentActivity={[]}
              />
            )}
          </Suspense>
        </div>
      </div>

      {/* Modal Components */}
      <Suspense fallback={null}>
        <ServiceModal
          show={showServiceModal}
          onClose={() => setShowServiceModal(false)}
          services={services}
          onAddService={(service) => setServices([...services, service])}
          serviceSearchTerm={serviceSearchTerm}
          setServiceSearchTerm={setServiceSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          serviceCatalog={SERVICE_CATALOG}
        />

        <TestimonialModal
          show={showTestimonialModal}
          onClose={() => setShowTestimonialModal(false)}
          testimonials={testimonials}
          setTestimonials={setTestimonials}
          newTestimonial={newTestimonial}
          setNewTestimonial={setNewTestimonial}
        />

        <ValueModal
          show={showValueModal}
          onClose={() => setShowValueModal(false)}
          companyValues={companyValues}
          setCompanyValues={setCompanyValues}
          newValue={newValue}
          setNewValue={setNewValue}
        />

        <ServiceAreaModal
          show={showServiceAreaModal}
          onClose={() => setShowServiceAreaModal(false)}
          serviceAreas={serviceAreas}
          setServiceAreas={setServiceAreas}
          newServiceArea={newServiceArea}
          setNewServiceArea={setNewServiceArea}
        />

        <SocialMediaModal
          show={showSocialMediaModal}
          onClose={() => setShowSocialMediaModal(false)}
          socialMedia={socialMedia}
          setSocialMedia={setSocialMedia}
          newSocialMedia={newSocialMedia}
          setNewSocialMedia={setNewSocialMedia}
        />

        <TeamModal
          show={showTeamModal}
          onClose={() => setShowTeamModal(false)}
          displayTeamMembers={displayTeamMembers}
          setDisplayTeamMembers={setDisplayTeamMembers}
        />

        <JobModal
          show={showJobModal}
          onClose={() => setShowJobModal(false)}
          jobListings={jobListings}
          setJobListings={setJobListings}
        />

        <SkillsModal
          show={showSkillsModal}
          onClose={() => setShowSkillsModal(false)}
          employeeProfile={employeeProfile}
          updateEmployeeProfile={(updates: any) =>
            setEmployeeProfile({ ...employeeProfile, ...updates })
          }
        />

        <SpecializationModal
          show={showSpecializationModal}
          onClose={() => setShowSpecializationModal(false)}
          contractorProfile={contractorProfile}
          updateContractorProfile={(updates: any) =>
            setContractorProfile({ ...contractorProfile, ...updates })
          }
        />

        <PermissionsModal
          show={showPermissionsModal}
          onClose={() => setShowPermissionsModal(false)}
          selectedMember={null}
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
          businessId={user?.uid || null}
          setToast={(toast) => console.log('Toast:', toast)}
        />

        <InviteModal
          show={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          inviteEmail={inviteEmail}
          setInviteEmail={setInviteEmail}
          inviteType={inviteType}
          setInviteType={setInviteType}
          inviteDirectorySearch={inviteDirectorySearch}
          setInviteDirectorySearch={setInviteDirectorySearch}
          teamMembers={teamMembers}
          subscription={subscription}
          pendingInvitations={pendingInvitations}
          setPendingInvitations={setPendingInvitations}
          businessInfo={businessInfo}
          user={user}
          businessId={user?.uid || ''}
          directoryContractors={directoryContractors}
          directoryEmployees={directoryEmployees}
          setToast={(toast) => console.log('Toast:', toast)}
        />

        <MyInvitesModal
          show={showMyInvitesModal}
          onClose={() => setShowMyInvitesModal(false)}
          myInvites={myInvites}
          setMyInvites={setMyInvites}
          contractorId={contractorProfile?.contractorId || ''}
          employeeId={employeeProfile?.employeeId || ''}
          user={user}
          setToast={(toast) => console.log('Toast:', toast)}
        />

        <ContractorJobHistoryModal
          show={showContractorJobHistoryModal}
          onClose={() => setShowContractorJobHistoryModal(false)}
        />

        <EmployeeJobHistoryModal
          show={showEmployeeJobHistoryModal}
          onClose={() => setShowEmployeeJobHistoryModal(false)}
        />

        {/* Public Profile Modals */}
        {showPublicProfile && (
          <PublicBusinessProfile
            onClose={() => setShowPublicProfile(false)}
            businessInfo={businessInfo}
            branding={branding}
            testimonials={testimonials}
            companyValues={companyValues}
            serviceAreas={serviceAreas}
            socialMedia={socialMedia}
            services={services}
            teamMembers={{ contractors: [], employees: displayTeamMembers }}
            jobListings={jobListings}
            businessStatsVisibility={businessStatsVisibility}
            isHiring={isHiring}
          />
        )}

        {showContractorPublicProfile && (
          <PublicContractorProfile
            profile={contractorProfile}
            onClose={() => setShowContractorPublicProfile(false)}
          />
        )}

        {showEmployeePublicProfile && (
          <PublicEmployeeProfile
            profile={employeeProfile}
            employeeId="mock-employee-id"
            onClose={() => setShowEmployeePublicProfile(false)}
          />
        )}

        {showCustomerPublicProfile && (
          <PublicCustomerProfile
            profile={customerProfile}
            customerId="mock-customer-id"
            onClose={() => setShowCustomerPublicProfile(false)}
          />
        )}
      </Suspense>
    </div>
  );
}

/**
 * Dashboard Page Component
 * Main authenticated landing page after login/onboarding
 * Renders content based on active tab from context
 *
 * @returns React component
 */
export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const { activeTab } = useDashboard();

  /**
   * Renders content based on active tab
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div
            id="overview-panel"
            role="tabpanel"
            aria-labelledby="overview-tab"
          >
            <h2 className="mb-4 text-3xl font-bold text-white">{t('title')}</h2>
            <p className="text-slate-400">{t('welcomeMessage')}</p>
          </div>
        );

      case 'profile':
        return (
          <div
            id="profile-panel"
            role="tabpanel"
            aria-labelledby="profile-tab"
            className="h-full"
          >
            <ErrorBoundary>
              <ProfileTabContent />
            </ErrorBoundary>
          </div>
        );

      case 'directory':
        return (
          <div
            id="directory-panel"
            role="tabpanel"
            aria-labelledby="directory-tab"
          >
            <h2 className="mb-4 text-3xl font-bold text-white">
              {t('directory')}
            </h2>
            <p className="text-slate-400">Directory content goes here</p>
          </div>
        );

      case 'team':
        return (
          <div id="team-panel" role="tabpanel" aria-labelledby="team-tab">
            <h2 className="mb-4 text-3xl font-bold text-white">{t('team')}</h2>
            <p className="text-slate-400">Team content goes here</p>
          </div>
        );

      case 'chat':
        return (
          <div id="chat-panel" role="tabpanel" aria-labelledby="chat-tab">
            <h2 className="mb-4 text-3xl font-bold text-white">{t('chat')}</h2>
            <p className="text-slate-400">Chat content goes here</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <main className="container mx-auto p-8" role="main">
        {renderTabContent()}
      </main>
    </div>
  );
}

/**
 * Force SSR for authenticated dashboard page
 * Prevents static generation at build time
 */
export async function getServerSideProps() {
  return {
    props: {},
  };
}
