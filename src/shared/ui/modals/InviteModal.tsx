/**
 * Invite Modal Component
 * @module shared/ui/modals/InviteModal
 * 
 * Modal dialog for inviting contractors and employees to join business team.
 * Supports email invitations with role assignment and permission management.
 * Includes directory search for existing platform users.
 * 
 * ✅ DIAMOND STANDARD: Shared UI modal component
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#shared-layer}
 */

"use client";

import { useState } from 'react';

// TODO: Import from server actions when implemented
// import { findProfileByEmail, sendTeamInvitation } from '@/app/api/actions/invites/inviteActions';

// Stub functions for development
const findProfileByEmail = async (_email: string, _type: string) => null;
const sendTeamInvitation = async (_data: any) => ({ success: true, message: 'Invitation sent (dev mode)' });

interface InviteModalProps {
  show: boolean;
  onClose: () => void;
  inviteEmail: string;
  setInviteEmail: (email: string) => void;
  inviteType: 'contractor' | 'employee';
  setInviteType: (type: 'contractor' | 'employee') => void;
  inviteDirectorySearch: string;
  setInviteDirectorySearch: (search: string) => void;
  teamMembers: {
    contractors: any[];
    employees: any[];
  };
  subscription: {
    tier: string;
    contractorLimit: number;
    employeeLimit: number;
  };
  pendingInvitations: any[];
  setPendingInvitations: (invitations: any[]) => void;
  businessInfo: any;
  user: any;
  businessId: string;
  directoryContractors: any[];
  directoryEmployees: any[];
  setToast: (toast: { message: string; type: 'success' | 'error' } | null) => void;
}

export default function InviteModal({
  show,
  onClose,
  inviteEmail,
  setInviteEmail,
  inviteType,
  setInviteType,
  inviteDirectorySearch,
  setInviteDirectorySearch,
  teamMembers,
  subscription,
  pendingInvitations,
  setPendingInvitations,
  user,
  businessId,
  directoryContractors,
  directoryEmployees,
  setToast,
}: InviteModalProps) {
  const [expiryAmount, setExpiryAmount] = useState(7);
  const [expiryUnit, setExpiryUnit] = useState<'hours' | 'days' | 'weeks'>('days');

  if (!show) return null;

  const handleClose = () => {
    onClose();
    setInviteEmail('');
    setExpiryAmount(7);
    setExpiryUnit('days');
  };

  // Normalize phone number for search
  const normalizePhone = (phone: string) => {
    return phone.replace(/\D/g, ''); // Remove all non-digit characters
  };

  const handleSendInvitation = async () => {
    try {
      const currentBusinessId = businessId || user?.uid || '';
      
      // Find the contractor/employee by email
      const searchResult = await findProfileByEmail(inviteEmail, inviteType) as { success: boolean; profile: any } | null;
      
      if (!searchResult || !searchResult.success || !searchResult.profile) {
        setToast({ message: `No ${inviteType} found with that email address`, type: 'error' });
        return;
      }
      
      // Calculate expiry milliseconds based on selected time unit
      let expiryMilliseconds = 0;
      if (expiryUnit === 'hours') {
        expiryMilliseconds = expiryAmount * 60 * 60 * 1000;
      } else if (expiryUnit === 'days') {
        expiryMilliseconds = expiryAmount * 24 * 60 * 60 * 1000;
      } else if (expiryUnit === 'weeks') {
        expiryMilliseconds = expiryAmount * 7 * 24 * 60 * 60 * 1000;
      }

      // Send the invitation via server action
      const result = await sendTeamInvitation({
        businessId: currentBusinessId,
        email: inviteEmail,
        memberType: inviteType,
        expiresIn: expiryMilliseconds
      }) as {
        success: boolean;
        message: string;
        invitation: { id: string; sentDate: Date; expiresDate: Date };
      };
      
      if (!result.success) {
        setToast({ message: 'Failed to send invitation', type: 'error' });
        return;
      }

      // Update local state
      const localInvitation = {
        id: result.invitation.id,
        email: inviteEmail,
        type: inviteType,
        status: 'pending' as 'pending' | 'accepted' | 'declined' | 'expired',
        sentDate: result.invitation.sentDate,
        expiresDate: result.invitation.expiresDate,
        invitedBy: user?.email || 'Admin',
      };
      setPendingInvitations([...pendingInvitations, localInvitation]);
      handleClose();
      setToast({ message: 'Invitation sent successfully!', type: 'success' });
    } catch (error) {
      // Log error for debugging (error object contains stack trace)
      if (error instanceof Error) {
        console.warn('Invitation error:', error.message);
      }
      setToast({ message: 'Failed to send invitation', type: 'error' });
    }
  };

  // Validate expiry amount based on unit
  const getMaxExpiry = () => {
    if (expiryUnit === 'hours') return 24;
    if (expiryUnit === 'days') return 30;
    if (expiryUnit === 'weeks') return 4;
    return 7;
  };

  const isAtCapacity = (inviteType === 'contractor' && (teamMembers?.contractors?.filter(c => c.status === 'active').length || 0) >= subscription.contractorLimit) ||
                       (inviteType === 'employee' && (teamMembers?.employees?.filter(e => e.status === 'active').length || 0) >= subscription.employeeLimit);

  const isDisabled = !inviteEmail;

  // Combine and filter directory members - search by name, email, and phone
  const filteredMembers = inviteDirectorySearch
    ? [
        ...directoryContractors.map(c => ({ ...c, memberType: 'contractor' })),
        ...directoryEmployees.map(e => ({ ...e, memberType: 'employee' }))
      ].filter((item) => {
        const search = inviteDirectorySearch.toLowerCase();
        
        // Get name
        const itemName = (item.name || 
                       (item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : '') ||
                       item.personalInfo?.name || '').toLowerCase();
        
        // Get email
        const itemEmail = (item.email || item.personalInfo?.email || '').toLowerCase();
        
        // Get phone and normalize
        const itemPhone = item.phoneNumber || item.phone || item.personalInfo?.phone || '';
        const normalizedPhone = normalizePhone(itemPhone);
        const normalizedSearch = normalizePhone(search);
        
        return (
          itemName.includes(search) ||
          itemEmail.includes(search) ||
          (normalizedSearch && normalizedPhone.includes(normalizedSearch))
        );
      }).slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-lg w-full">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Invite Team Member</h3>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Member Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setInviteType('contractor')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  inviteType === 'contractor'
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="text-3xl mb-2">👷</div>
                <div className="text-white font-semibold">Contractor</div>
                <div className="text-slate-400 text-xs mt-1">
                  Active: {teamMembers?.contractors?.filter(c => c.status === 'active').length || 0} / {subscription.contractorLimit}
                </div>
                <div className="text-slate-500 text-xs">
                  Total: {teamMembers?.contractors?.length || 0}
                </div>
              </button>
              <button
                onClick={() => setInviteType('employee')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  inviteType === 'employee'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="text-3xl mb-2">👤</div>
                <div className="text-white font-semibold">Employee</div>
                <div className="text-slate-400 text-xs mt-1">
                  Active: {teamMembers?.employees?.filter(e => e.status === 'active').length || 0} / {subscription.employeeLimit}
                </div>
                <div className="text-slate-500 text-xs">
                  Total: {teamMembers?.employees?.length || 0}
                </div>
              </button>
            </div>
          </div>

          {/* Email Input with Directory Search */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Search Member</label>
            <input
              type="text"
              value={inviteDirectorySearch || ''}
              onChange={e => setInviteDirectorySearch(e.target.value)}
              placeholder="Search by name, email, or phone"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 mb-2"
            />
            {inviteDirectorySearch && (
              <div className="max-h-60 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg">
                {filteredMembers.map((item) => {
                  const displayName = item.name || 
                                    (item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : '') ||
                                    item.personalInfo?.name || 'Unknown';
                  const displayEmail = item.email || item.personalInfo?.email || '';
                  const displayPhone = item.phoneNumber || item.phone || item.personalInfo?.phone || '';
                  
                  return (
                    <button
                      key={item.id}
                      className="w-full text-left px-3 py-3 hover:bg-slate-800 text-slate-300 flex items-center gap-3 border-b border-slate-800 last:border-b-0"
                      onClick={() => {
                        setInviteEmail(displayEmail);
                        setInviteType(item.memberType);
                        setInviteDirectorySearch('');
                      }}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                        item.memberType === 'contractor' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.memberType === 'contractor' ? '👷' : '👤'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{displayName}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            item.memberType === 'contractor'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {item.memberType === 'contractor' ? 'Contractor' : 'Employee'}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 truncate">{displayEmail}</div>
                        {displayPhone && <div className="text-xs text-slate-500">{displayPhone}</div>}
                      </div>
                    </button>
                  );
                })}
                {filteredMembers.length === 0 && (
                  <div className="px-3 py-4 text-center text-slate-500 text-sm">
                    No members found. Try a different search.
                  </div>
                )}
              </div>
            )}
            {inviteEmail && (
              <div className="mt-2 text-sm text-slate-400">
                Selected: <span className="text-white font-medium">{inviteEmail}</span>
              </div>
            )}
          </div>

          {/* Expiry Time Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Invitation Expires In</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  min="1"
                  max={getMaxExpiry()}
                  value={expiryAmount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val > 0 && val <= getMaxExpiry()) {
                      setExpiryAmount(val);
                    }
                  }}
                  aria-label="Expiry amount"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <select
                  value={expiryUnit}
                  onChange={(e) => {
                    setExpiryUnit(e.target.value as 'hours' | 'days' | 'weeks');
                    // Reset amount if it exceeds new max
                    const newUnit = e.target.value as 'hours' | 'days' | 'weeks';
                    const maxForUnit = newUnit === 'hours' ? 24 : newUnit === 'days' ? 30 : 4;
                    if (expiryAmount > maxForUnit) {
                      setExpiryAmount(maxForUnit);
                    }
                  }}
                  aria-label="Expiry time unit"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                >
                  <option value="hours">Hours (max 24)</option>
                  <option value="days">Days (max 30)</option>
                  <option value="weeks">Weeks (max 4)</option>
                </select>
              </div>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Invitation will expire {expiryAmount} {expiryUnit} after being sent
            </div>
          </div>

          {/* Capacity Warning */}
          {isAtCapacity && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-amber-400 text-xl">ℹ️</span>
                <div>
                  <div className="text-amber-400 font-semibold mb-1">Active {inviteType.charAt(0).toUpperCase() + inviteType.slice(1)} Limit Reached</div>
                  <p className="text-amber-300 text-sm">
                    You&apos;ve reached your active {inviteType} limit ({subscription[inviteType === 'contractor' ? 'contractorLimit' : 'employeeLimit']}) for the {subscription.tier} plan. 
                    New members will be added as <strong>inactive</strong> and you can set their permissions before activating them. Upgrade your plan to increase active member capacity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-700 flex items-center justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSendInvitation}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-lg font-medium ${
              isDisabled
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
}
