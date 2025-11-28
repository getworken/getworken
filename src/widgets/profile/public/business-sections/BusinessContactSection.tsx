/**
 * Business Contact Section Component
 * @module widgets/profile/public/business-sections/BusinessContactSection
 * 
 * Displays business contact information including address, phone, email.
 * Part of public business profile widget composition.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";
import React, { useState } from 'react';

interface BusinessContactSectionProps {
  branding: any;
  businessInfo: any;
  onClose?: () => void;
}

export default function BusinessContactSection({ businessInfo }: BusinessContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="bg-slate-700 rounded-lg p-6">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
          <p className="text-slate-300">Thank you for reaching out. We'll get back to you soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Get In Touch</h3>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Contact Information</h4>
          <div className="space-y-4">
            {businessInfo.businessAddress && (
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 text-xl">📍</span>
                <div>
                  <p className="text-white font-medium">Address</p>
                  <p className="text-slate-300">{businessInfo.businessAddress}</p>
                </div>
              </div>
            )}
            
            {businessInfo.businessPhone && (
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 text-xl">📞</span>
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <a href={`tel:${businessInfo.businessPhone}`} className="text-slate-300 hover:text-blue-400 transition-colors">
                    {businessInfo.businessPhone}
                  </a>
                </div>
              </div>
            )}
            
            {businessInfo.businessEmail && (
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 text-xl">📧</span>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href={`mailto:${businessInfo.businessEmail}`} className="text-slate-300 hover:text-blue-400 transition-colors">
                    {businessInfo.businessEmail}
                  </a>
                </div>
              </div>
            )}
            
            {businessInfo.workingHours && (
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 text-xl">🕒</span>
                <div>
                  <p className="text-white font-medium">Business Hours</p>
                  <div className="text-slate-300 text-sm space-y-1">
                    {Object.entries(businessInfo.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize">{day}:</span>
                        <span>{hours as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-white mb-4">Send us a Message</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="quote">Request Quote</option>
                  <option value="service">Service Question</option>
                  <option value="employment">Employment</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Tell us how we can help you..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}