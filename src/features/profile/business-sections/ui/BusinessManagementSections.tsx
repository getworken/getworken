/**
 * BusinessManagementSections Component
 * @module features/profile/business-sections/ui/BusinessManagementSections
 * 
 * ✅ DIAMOND STANDARD: Complete business management sections matching GetWork-alpha
 */

'use client';

import { MouseEvent } from 'react';

export interface BusinessManagementSectionsProps {
  testimonials: any[];
  setTestimonials: (testimonials: any[]) => void;
  companyValues: any[];
  setCompanyValues: (values: any[]) => void;
  serviceAreas: any[];
  setServiceAreas: (areas: any[]) => void;
  socialMedia: any[];
  setSocialMedia: (media: any[]) => void;
  services: any[];
  setServices: (services: any[]) => void;
  displayTeamMembers: any[];
  setDisplayTeamMembers: (members: any[]) => void;
  jobListings: any[];
  setJobListings: (listings: any[]) => void;
  isHiring: boolean;
  setIsHiring: (hiring: boolean) => void;
  showConfirmation?: ((message: string, onConfirm: () => void, event: MouseEvent) => void) | undefined;
  setShowServiceModal?: ((show: boolean) => void) | undefined;
  setShowTestimonialModal?: ((show: boolean) => void) | undefined;
  setShowValueModal?: ((show: boolean) => void) | undefined;
  setShowServiceAreaModal?: ((show: boolean) => void) | undefined;
  setShowSocialMediaModal?: ((show: boolean) => void) | undefined;
  setShowTeamModal?: ((show: boolean) => void) | undefined;
  setShowJobModal?: ((show: boolean) => void) | undefined;
}

export function BusinessManagementSections({
  testimonials,
  setTestimonials,
  companyValues,
  setCompanyValues,
  serviceAreas,
  setServiceAreas,
  socialMedia,
  setSocialMedia,
  services,
  setServices,
  displayTeamMembers,
  setDisplayTeamMembers,
  jobListings,
  setJobListings,
  isHiring,
  setIsHiring,
  showConfirmation,
  setShowServiceModal,
  setShowTestimonialModal,
  setShowValueModal,
  setShowServiceAreaModal,
  setShowSocialMediaModal,
  setShowTeamModal,
  setShowJobModal,
}: BusinessManagementSectionsProps) {
  return (
    <>
      {/* Testimonials */}
      <div className="bg-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Customer Testimonials ({testimonials.length})</h3>
          <button
            onClick={() => setShowTestimonialModal?.(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span>➕</span> Add Testimonial
          </button>
        </div>
        {testimonials.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-slate-400">No testimonials yet. Add your first customer review!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="bg-slate-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <div className="font-medium text-white">{testimonial.name}</div>
                      <div className="text-xs text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => showConfirmation?.('Delete this testimonial?', () => {
                      setTestimonials(testimonials.filter((_, i) => i !== index));
                    }, e)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    🗑️
                  </button>
                </div>
                <p className="text-slate-300 text-sm italic">"{testimonial.content}"</p>
                <div className="text-yellow-400 text-sm mt-2">
                  {'⭐'.repeat(testimonial.rating || 5)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Company Values */}
      <div className="bg-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Company Values ({companyValues.length})</h3>
          <button
            onClick={() => setShowValueModal?.(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            <span>➕</span> Add Value
          </button>
        </div>
        {companyValues.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-slate-400">No company values defined yet. Add your core principles!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-slate-600 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{value.icon || '💎'}</div>
                <h4 className="font-semibold text-white mb-2">{value.title}</h4>
                <p className="text-slate-300 text-sm">{value.description}</p>
                <button
                  onClick={(e) => showConfirmation?.('Delete this value?', () => {
                    setCompanyValues(companyValues.filter((_, i) => i !== index));
                  }, e)}
                  className="mt-2 text-red-400 hover:text-red-300 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Service Areas */}
      <div className="bg-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Service Areas ({serviceAreas.length})</h3>
          <button
            onClick={() => setShowServiceAreaModal?.(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <span>➕</span> Add Area
          </button>
        </div>
        {serviceAreas.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-slate-400">No service areas defined yet. Add the areas you serve!</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-2"
              >
                📍 {area.name}
                <button
                  onClick={(e) => showConfirmation?.('Remove this service area?', () => {
                    setServiceAreas(serviceAreas.filter((_, i) => i !== index));
                  }, e)}
                  className="hover:text-red-300"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Social Media */}
      <div className="bg-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Social Media ({socialMedia.length})</h3>
          <button
            onClick={() => setShowSocialMediaModal?.(true)}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition flex items-center gap-2"
          >
            <span>➕</span> Add Social Link
          </button>
        </div>
        {socialMedia.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📱</div>
            <p className="text-slate-400">No social media links yet. Connect your profiles!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {socialMedia.map((social, index) => (
              <div key={index} className="bg-slate-600 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{social.icon || '🔗'}</div>
                <p className="text-white text-sm font-medium capitalize">{social.platform}</p>
                <button
                  onClick={(e) => showConfirmation?.('Remove this social link?', () => {
                    setSocialMedia(socialMedia.filter((_, i) => i !== index));
                  }, e)}
                  className="mt-1 text-red-400 hover:text-red-300 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Services Offered */}
      <div className="bg-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Services Offered ({services.length})</h3>
          <button
            onClick={() => setShowServiceModal?.(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
          >
            <span>➕</span> Add Service
          </button>
        </div>
        {services.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔧</div>
            <p className="text-slate-400">No services listed yet. Add the services you offer!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{service.name}</h4>
                    <p className="text-green-400 font-medium">${service.price}</p>
                  </div>
                  <button
                    onClick={(e) => showConfirmation?.('Delete this service?', () => {
                      setServices(services.filter((_, i) => i !== index));
                    }, e)}
                    className="text-red-400 hover:text-red-300"
                  >
                    🗑️
                  </button>
                </div>
                <p className="text-slate-300 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Team Members */}
      <div className="bg-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Team Members ({displayTeamMembers.length})</h3>
          <button
            onClick={() => setShowTeamModal?.(true)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition flex items-center gap-2"
          >
            <span>➕</span> Add Team Member
          </button>
        </div>
        {displayTeamMembers.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-slate-400">No team members added yet. Showcase your team!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTeamMembers.map((member, index) => (
              <div key={index} className="bg-slate-600 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {member.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{member.name}</h4>
                    <p className="text-slate-300 text-sm">{member.role}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => showConfirmation?.('Remove this team member?', () => {
                    setDisplayTeamMembers(displayTeamMembers.filter((_, i) => i !== index));
                  }, e)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Open Positions */}
      <div className="bg-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Open Positions ({jobListings.length})</h3>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isHiring}
                onChange={(e) => setIsHiring(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-white text-sm">Currently Hiring</span>
            </label>
            <button
              onClick={() => setShowJobModal?.(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <span>➕</span> Add Position
            </button>
          </div>
        </div>
        {jobListings.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">💼</div>
            <p className="text-slate-400">No open positions. Add job listings to attract talent!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobListings.map((job, index) => (
              <div key={index} className="bg-slate-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{job.title}</h4>
                    <p className="text-slate-300 text-sm">{job.department}</p>
                    <p className="text-green-400 font-medium">{job.salary}</p>
                  </div>
                  <button
                    onClick={(e) => showConfirmation?.('Delete this job listing?', () => {
                      setJobListings(jobListings.filter((_, i) => i !== index));
                    }, e)}
                    className="text-red-400 hover:text-red-300"
                  >
                    🗑️
                  </button>
                </div>
                <p className="text-slate-300 text-sm">{job.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
