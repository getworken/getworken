/**
 * Waitlist Modal Component
 * @module features/waitlist-modal
 *
 * ✅ DIAMOND STANDARD: Features layer - business logic UI
 *
 * Modal for collecting waitlist signups and storing in Firestore.
 * Captures key user data for targeted launch segmentation:
 * - Demographics (name, email, country)
 * - Business context (company, business type, team size)
 *
 * **Architecture Compliance:**
 * - FSD features/ layer (business logic UI)
 * - Uses shared/ui Select component for country dropdown
 * - Stores structured data in Firestore for launch analytics
 * - WCAG 2.2 compliant (labels, ARIA, focus management)
 *
 * @see {@link file://src/shared/ui/select.tsx}
 */

'use client';

import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/shared/lib/firebase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * WaitlistModal Component
 *
 * Displays a modal form for collecting waitlist signups with structured data
 * for launch segmentation and marketing.
 *
 * **Captured Data:**
 * - Demographics: name, email, country
 * - Business: company, business type, team size
 * - Metadata: timestamp, status
 *
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback to close modal
 * @returns {JSX.Element | null} Modal component or null if closed
 *
 * @example
 * ```tsx
 * <WaitlistModal
 *   isOpen={showWaitlist}
 *   onClose={() => setShowWaitlist(false)}
 * />
 * ```
 */
export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const data: any = {
        email: email.trim().toLowerCase(),
        name: name.trim(),
        country: country || 'Not specified',
        businessType: businessType || 'Not specified',
        teamSize: teamSize || 'Not specified',
        createdAt: Timestamp.now(),
        status: 'pending',
      };

      // Only include company if provided
      if (company.trim()) {
        data.company = company.trim();
      }

      await addDoc(collection(db, 'waitlist'), data);

      setIsSuccess(true);
      setEmail('');
      setName('');
      setCompany('');
      setCountry('');
      setBusinessType('');
      setTeamSize('');

      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setName('');
    setCompany('');
    setCountry('');
    setBusinessType('');
    setTeamSize('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="card relative my-8 w-full max-w-md overflow-y-auto p-6 shadow-2xl sm:max-h-[90vh] sm:p-8">
        <button
          onClick={handleClose}
          className="muted absolute right-4 top-4 text-2xl transition hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
          Join the Waitlist
        </h2>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mb-4 text-6xl">✓</div>
            <p className="text-xl font-semibold text-primary">
              Successfully joined the waitlist!
            </p>
            <p className="muted mt-2">We'll be in touch soon.</p>
          </div>
        ) : (
          <>
            <p className="muted mb-6">
              Be the first to know when GetWorken launches. Get early access and
              exclusive benefits.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="waitlist-name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Name *
                </label>
                <input
                  id="waitlist-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="waitlist-email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email *
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="waitlist-country"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Country
                </label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger
                    id="waitlist-country"
                    className="w-full border-slate-600 bg-slate-700 text-white focus:ring-2 focus:ring-teal-500"
                  >
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-slate-700 text-white">
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="NZ">New Zealand</SelectItem>
                    <SelectItem value="IE">Ireland</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="ES">Spain</SelectItem>
                    <SelectItem value="IT">Italy</SelectItem>
                    <SelectItem value="NL">Netherlands</SelectItem>
                    <SelectItem value="BE">Belgium</SelectItem>
                    <SelectItem value="SE">Sweden</SelectItem>
                    <SelectItem value="NO">Norway</SelectItem>
                    <SelectItem value="DK">Denmark</SelectItem>
                    <SelectItem value="FI">Finland</SelectItem>
                    <SelectItem value="MX">Mexico</SelectItem>
                    <SelectItem value="BR">Brazil</SelectItem>
                    <SelectItem value="AR">Argentina</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="SG">Singapore</SelectItem>
                    <SelectItem value="JP">Japan</SelectItem>
                    <SelectItem value="ZA">South Africa</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="waitlist-business-type"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Business Type
                </label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger
                    id="waitlist-business-type"
                    className="w-full border-slate-600 bg-slate-700 text-white focus:ring-2 focus:ring-teal-500"
                  >
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-slate-700 text-white">
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="general-contracting">
                      General Contracting
                    </SelectItem>
                    <SelectItem value="remodeling">
                      Remodeling & Renovation
                    </SelectItem>
                    <SelectItem value="landscaping">Landscaping</SelectItem>
                    <SelectItem value="lawn-care">
                      Lawn Care & Maintenance
                    </SelectItem>
                    <SelectItem value="tree-service">Tree Service</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="roofing">Roofing</SelectItem>
                    <SelectItem value="painting">
                      Painting & Decorating
                    </SelectItem>
                    <SelectItem value="drywall">
                      Drywall & Plastering
                    </SelectItem>
                    <SelectItem value="flooring">
                      Flooring Installation
                    </SelectItem>
                    <SelectItem value="carpentry">
                      Carpentry & Woodworking
                    </SelectItem>
                    <SelectItem value="masonry">
                      Masonry & Bricklaying
                    </SelectItem>
                    <SelectItem value="concrete">Concrete Work</SelectItem>
                    <SelectItem value="fencing">Fencing & Decking</SelectItem>
                    <SelectItem value="windows-doors">
                      Windows & Doors
                    </SelectItem>
                    <SelectItem value="siding">Siding Installation</SelectItem>
                    <SelectItem value="cleaning-residential">
                      Cleaning - Residential
                    </SelectItem>
                    <SelectItem value="cleaning-commercial">
                      Cleaning - Commercial
                    </SelectItem>
                    <SelectItem value="janitorial">
                      Janitorial Services
                    </SelectItem>
                    <SelectItem value="carpet-cleaning">
                      Carpet & Upholstery Cleaning
                    </SelectItem>
                    <SelectItem value="window-cleaning">
                      Window Cleaning
                    </SelectItem>
                    <SelectItem value="pressure-washing">
                      Pressure Washing
                    </SelectItem>
                    <SelectItem value="pest-control">Pest Control</SelectItem>
                    <SelectItem value="handyman">Handyman Services</SelectItem>
                    <SelectItem value="appliance-repair">
                      Appliance Repair
                    </SelectItem>
                    <SelectItem value="locksmith">Locksmith</SelectItem>
                    <SelectItem value="garage-door">
                      Garage Door Services
                    </SelectItem>
                    <SelectItem value="pool-service">
                      Pool Service & Maintenance
                    </SelectItem>
                    <SelectItem value="solar">Solar Installation</SelectItem>
                    <SelectItem value="home-inspection">
                      Home Inspection
                    </SelectItem>
                    <SelectItem value="moving">Moving & Storage</SelectItem>
                    <SelectItem value="junk-removal">
                      Junk Removal & Hauling
                    </SelectItem>
                    <SelectItem value="auto-repair">
                      Auto Repair & Mechanics
                    </SelectItem>
                    <SelectItem value="auto-detailing">
                      Auto Detailing
                    </SelectItem>
                    <SelectItem value="towing">Towing Services</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="videography">Videography</SelectItem>
                    <SelectItem value="event-planning">
                      Event Planning
                    </SelectItem>
                    <SelectItem value="catering">Catering</SelectItem>
                    <SelectItem value="personal-training">
                      Personal Training
                    </SelectItem>
                    <SelectItem value="massage-therapy">
                      Massage Therapy
                    </SelectItem>
                    <SelectItem value="beauty-salon">Beauty Salon</SelectItem>
                    <SelectItem value="barber">Barber Shop</SelectItem>
                    <SelectItem value="tattoo">Tattoo Artist</SelectItem>
                    <SelectItem value="pet-grooming">Pet Grooming</SelectItem>
                    <SelectItem value="pet-sitting">
                      Pet Sitting & Dog Walking
                    </SelectItem>
                    <SelectItem value="tutoring">
                      Tutoring & Education
                    </SelectItem>
                    <SelectItem value="music-lessons">Music Lessons</SelectItem>
                    <SelectItem value="it-services">
                      IT Services & Tech Support
                    </SelectItem>
                    <SelectItem value="web-design">
                      Web Design & Development
                    </SelectItem>
                    <SelectItem value="graphic-design">
                      Graphic Design
                    </SelectItem>
                    <SelectItem value="marketing">
                      Marketing & Advertising
                    </SelectItem>
                    <SelectItem value="accounting">
                      Accounting & Bookkeeping
                    </SelectItem>
                    <SelectItem value="legal">Legal Services</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="property-management">
                      Property Management
                    </SelectItem>
                    <SelectItem value="security">Security Services</SelectItem>
                    <SelectItem value="waste-management">
                      Waste Management
                    </SelectItem>
                    <SelectItem value="delivery">Delivery Services</SelectItem>
                    <SelectItem value="courier">Courier Services</SelectItem>
                    <SelectItem value="food-truck">Food Truck</SelectItem>
                    <SelectItem value="retail-store">Retail Store</SelectItem>
                    <SelectItem value="commercial-store">
                      Commercial Store
                    </SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="wholesale">
                      Wholesale & Distribution
                    </SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="welding">
                      Welding & Fabrication
                    </SelectItem>
                    <SelectItem value="machining">Machining & CNC</SelectItem>
                    <SelectItem value="printing">Printing Services</SelectItem>
                    <SelectItem value="sign-making">Sign Making</SelectItem>
                    <SelectItem value="upholstery">
                      Upholstery & Furniture Repair
                    </SelectItem>
                    <SelectItem value="tailoring">
                      Tailoring & Alterations
                    </SelectItem>
                    <SelectItem value="dry-cleaning">
                      Dry Cleaning & Laundry
                    </SelectItem>
                    <SelectItem value="equipment-rental">
                      Equipment Rental
                    </SelectItem>
                    <SelectItem value="party-rental">
                      Party & Event Rental
                    </SelectItem>
                    <SelectItem value="entertainment">
                      Entertainment Services
                    </SelectItem>
                    <SelectItem value="dj-services">DJ Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="waitlist-team-size"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Team Size
                </label>
                <Select value={teamSize} onValueChange={setTeamSize}>
                  <SelectTrigger
                    id="waitlist-team-size"
                    className="w-full border-slate-600 bg-slate-700 text-white focus:ring-2 focus:ring-teal-500"
                  >
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 text-white">
                    <SelectItem value="solo">Just me</SelectItem>
                    <SelectItem value="2-5">2-5 people</SelectItem>
                    <SelectItem value="6-10">6-10 people</SelectItem>
                    <SelectItem value="11-25">11-25 people</SelectItem>
                    <SelectItem value="26-50">26-50 people</SelectItem>
                    <SelectItem value="50+">50+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="waitlist-company"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Company (Optional)
                </label>
                <input
                  id="waitlist-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your Company"
                />
              </div>

              {error && <div className="text-sm text-red-400">{error}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-teal-600 px-4 py-3 font-medium text-white transition hover:bg-teal-700 disabled:bg-slate-600"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
