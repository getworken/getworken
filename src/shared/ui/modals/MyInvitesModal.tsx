/**
 * My Invites Modal Component
 * @module shared/ui/modals/MyInvitesModal
 * 
 * Modal dialog displaying received team invitations.
 * Users can accept or decline invitations to join businesses.
 * Shows invitation details including business name, role, and expiration.
 * 
 * ✅ DIAMOND STANDARD: Shared UI modal component
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#shared-layer}
 */

"use client";

import { useState } from 'react';

// TODO: Import from server actions when implemented
// import { acceptTeamInvitation, declineTeamInvitation } from '@/app/api/actions/invites/inviteActions';

// Stub functions for development
const acceptTeamInvitation = async (_invitationId: string, _userId: string, _type: string, _businessId: string) => ({ success: true, message: 'Invitation accepted (dev mode)' });
const declineTeamInvitation = async (_invitationId: string, _userId?: string, _type?: string, _businessId?: string) => ({ success: true, message: 'Invitation declined (dev mode)' });

interface Invitation {
  id: string;
  fromBusinessId: string;
  fromBusinessName: string;
  type: 'contractor' | 'employee';
  role: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  sentDate: string;
  expiresDate?: string;
  acceptedDate?: string;
  declinedDate?: string;
  expiredDate?: string;
}

interface MyInvitesModalProps {
  show: boolean;
  onClose: () => void;
  myInvites: Invitation[];
  setMyInvites: (invites: Invitation[]) => void;
  contractorId: string;
  employeeId: string;
  user: { email?: string; uid?: string } | null;
  setToast: (toast: { message: string; type: 'success' | 'error' } | null) => void;
}

export default function MyInvitesModal({
  show,
  onClose,
  myInvites,
  setMyInvites,
  contractorId,
  employeeId,
  user,
  setToast,
}: MyInvitesModalProps) {
  const [memberType, setMemberType] = useState<'contractor' | 'employee'>('contractor');
  const [statusView, setStatusView] = useState<'pending' | 'accepted' | 'declined' | 'expired'>('pending');

  if (!show) return null;

  const handleAcceptContractor = async (invitation: Invitation) => {
    try {
      const currentUserId = contractorId || user?.uid || '';
      
      if (!currentUserId) {
        setToast({ message: 'Error: User ID not found', type: 'error' });
        return;
      }
      
      const result = await acceptTeamInvitation(
        invitation.id,
        currentUserId,
        'contractor',
        invitation.fromBusinessId
      );
      
      if (!result.success) {
        setToast({ message: result.message || 'Failed to accept invitation', type: 'error' });
        return;
      }
      
      // Update local state
      setMyInvites(myInvites.map(inv => 
        inv.id === invitation.id 
          ? { ...inv, status: 'accepted' as const, acceptedDate: new Date().toISOString() } 
          : inv
      ));
      
      setToast({ message: 'Invitation accepted! You are now part of the team.', type: 'success' });
    } catch (error) {
      // Log error for debugging (error object contains stack trace)
      if (error instanceof Error) {
        console.warn('Accept invitation error:', error.message);
      }
      setToast({ message: 'Failed to accept invitation', type: 'error' });
    }
  };

  const handleAcceptEmployee = async (invitation: Invitation) => {
    try {
      const currentUserId = employeeId || user?.uid || '';
      
      if (!currentUserId) {
        setToast({ message: 'Error: User ID not found', type: 'error' });
        return;
      }
      
      const result = await acceptTeamInvitation(
        invitation.id,
        currentUserId,
        'employee',
        invitation.fromBusinessId
      );
      
      if (!result.success) {
        setToast({ message: result.message || 'Failed to accept invitation', type: 'error' });
        return;
      }
      
      // Update local state
      setMyInvites(myInvites.map(inv => 
        inv.id === invitation.id 
          ? { ...inv, status: 'accepted' as const, acceptedDate: new Date().toISOString() } 
          : inv
      ));
      
      setToast({ message: 'Invitation accepted! You are now part of the team.', type: 'success' });
    } catch (error) {
      // Log error for debugging (error object contains stack trace)
      if (error instanceof Error) {
        console.warn('Accept invitation error:', error.message);
      }
      setToast({ message: 'Failed to accept invitation', type: 'error' });
    }
  };

  const handleDeclineContractor = async (invitation: Invitation) => {
    try {
      const currentUserId = contractorId || user?.uid || '';
      
      const result = await declineTeamInvitation(
        invitation.id,
        currentUserId,
        'contractor',
        invitation.fromBusinessId
      );
      
      if (!result.success) {
        setToast({ message: result.message || 'Failed to decline invitation', type: 'error' });
        return;
      }
      
      setMyInvites(myInvites.map(inv => 
        inv.id === invitation.id ? { ...inv, status: 'declined' as const, declinedDate: new Date().toISOString() } : inv
      ));
      
      setToast({ message: 'Invitation declined', type: 'success' });
    } catch (error) {
      // Log error for debugging (error object contains stack trace)
      if (error instanceof Error) {
        console.warn('Decline invitation error:', error.message);
      }
      setToast({ message: 'Failed to decline invitation', type: 'error' });
    }
  };

  const handleDeclineEmployee = async (invitation: Invitation) => {
    try {
      const currentUserId = employeeId || user?.uid || '';
      
      const result = await declineTeamInvitation(
        invitation.id,
        currentUserId,
        'employee',
        invitation.fromBusinessId
      );
      
      if (!result.success) {
        setToast({ message: result.message || 'Failed to decline invitation', type: 'error' });
        return;
      }
      
      setMyInvites(myInvites.map(inv => 
        inv.id === invitation.id ? { ...inv, status: 'declined' as const, declinedDate: new Date().toISOString() } : inv
      ));
      
      setToast({ message: 'Invitation declined', type: 'success' });
    } catch (error) {
      // Log error for debugging (error object contains stack trace)
      if (error instanceof Error) {
        console.warn('Decline invitation error:', error.message);
      }
      setToast({ message: 'Failed to decline invitation', type: 'error' });
    }
  };

  const contractorInvites = myInvites.filter(inv => inv.type === 'contractor');
  const employeeInvites = myInvites.filter(inv => inv.type === 'employee');

  // Filter by current view
  const currentInvites = (memberType === 'contractor' ? contractorInvites : employeeInvites)
    .filter(inv => inv.status === statusView);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">My Team Invitations</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <span className="text-2xl">✕</span>
          </button>
        </div>

        {myInvites.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📬</span>
            <p className="text-slate-400 text-lg">No invitations yet</p>
            <p className="text-slate-500 text-sm mt-2">You haven&apos;t received any team invitations</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Member Type Tabs */}
            <div className="flex gap-2 border-b border-slate-700">
              <button
                onClick={() => setMemberType('contractor')}
                className={`px-4 py-2 font-medium transition relative ${
                  memberType === 'contractor' ? 'text-white' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>👷</span>
                  Contractor
                  {contractorInvites.length > 0 && (
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      memberType === 'contractor' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {contractorInvites.length}
                    </span>
                  )}
                </span>
                {memberType === 'contractor' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                )}
              </button>
              <button
                onClick={() => setMemberType('employee')}
                className={`px-4 py-2 font-medium transition relative ${
                  memberType === 'employee' ? 'text-white' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>👤</span>
                  Employee
                  {employeeInvites.length > 0 && (
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      memberType === 'employee' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {employeeInvites.length}
                    </span>
                  )}
                </span>
                {memberType === 'employee' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 border-b border-slate-700">
              {(['pending', 'accepted', 'declined', 'expired'] as const).map((status) => {
                const count = (memberType === 'contractor' ? contractorInvites : employeeInvites)
                  .filter(inv => inv.status === status).length;
                const config = {
                  pending: { icon: '⏳', label: 'Pending', color: 'yellow' },
                  accepted: { icon: '✓', label: 'Accepted', color: 'green' },
                  declined: { icon: '✗', label: 'Declined', color: 'red' },
                  expired: { icon: '⌛', label: 'Expired', color: 'slate' }
                }[status];

                return (
                  <button
                    key={status}
                    onClick={() => setStatusView(status)}
                    className={`px-4 py-2 font-medium transition relative ${
                      statusView === status ? 'text-white' : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{config.icon}</span>
                      {config.label}
                      {count > 0 && (
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                          statusView === status
                            ? `bg-${config.color}-600 text-white`
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {count}
                        </span>
                      )}
                    </span>
                    {statusView === status && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-${config.color}-500`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Invitation List */}
            {currentInvites.length === 0 ? (
              <div className="text-center py-8 bg-slate-900 rounded-lg">
                <p className="text-slate-400">No {statusView} {memberType} invitations</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentInvites.map((invitation) => {
                  const bgColor = memberType === 'contractor' 
                    ? 'from-emerald-500 to-teal-600' 
                    : 'from-blue-500 to-indigo-600';
                  const borderColor = memberType === 'contractor'
                    ? 'border-emerald-700/50'
                    : 'border-blue-700/50';
                  const textColor = memberType === 'contractor'
                    ? 'text-emerald-400'
                    : 'text-blue-400';

                  // Format dates
                  const formatDate = (dateStr: string) => {
                    const date = new Date(dateStr);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  };

                  const formatDateTime = (dateStr: string) => {
                    const date = new Date(dateStr);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
                  };

                  return (
                    <div key={invitation.id} className={`bg-slate-900 border ${borderColor} rounded-lg p-5`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-14 h-14 bg-gradient-to-br ${bgColor} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                              🏢
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-white">{invitation.fromBusinessName}</h4>
                              <p className={`text-sm ${textColor} font-medium flex items-center gap-1`}>
                                <span>{memberType === 'contractor' ? '👷' : '👤'}</span>
                                {memberType === 'contractor' ? 'Contractor' : 'Employee'} Invitation
                              </p>
                            </div>
                          </div>
                          
                          <div className="ml-17 space-y-2 bg-slate-800/50 rounded-lg p-3">
                            <div className="flex items-start gap-2 text-sm">
                              <span className="text-slate-400 min-w-[80px]">📅 Sent:</span>
                              <span className="text-slate-200 font-medium">{formatDate(invitation.sentDate)}</span>
                            </div>
                            
                            {invitation.expiresDate && invitation.status === 'pending' && (
                              <div className="flex items-start gap-2 text-sm">
                                <span className="text-slate-400 min-w-[80px]">⏰ Expires:</span>
                                <span className="text-yellow-400 font-medium">{formatDate(invitation.expiresDate)}</span>
                              </div>
                            )}
                            
                            {invitation.acceptedDate && invitation.status === 'accepted' && (
                              <div className="flex items-start gap-2 text-sm">
                                <span className="text-slate-400 min-w-[80px]">✓ Accepted:</span>
                                <span className="text-green-400 font-medium">{formatDateTime(invitation.acceptedDate)}</span>
                              </div>
                            )}
                            
                            {invitation.declinedDate && invitation.status === 'declined' && (
                              <div className="flex items-start gap-2 text-sm">
                                <span className="text-slate-400 min-w-[80px]">✗ Declined:</span>
                                <span className="text-red-400 font-medium">{formatDateTime(invitation.declinedDate)}</span>
                              </div>
                            )}
                            
                            {invitation.expiredDate && invitation.status === 'expired' && (
                              <div className="flex items-start gap-2 text-sm">
                                <span className="text-slate-400 min-w-[80px]">⌛ Expired:</span>
                                <span className="text-slate-400 font-medium">{formatDateTime(invitation.expiredDate)}</span>
                              </div>
                            )}
                            
                            <div className="flex items-start gap-2 text-sm">
                              <span className="text-slate-400 min-w-[80px]">Status:</span>
                              <span className={`font-semibold capitalize ${
                                invitation.status === 'pending' ? 'text-yellow-400' :
                                invitation.status === 'accepted' ? 'text-green-400' :
                                invitation.status === 'declined' ? 'text-red-400' :
                                'text-slate-400'
                              }`}>
                                {invitation.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        {invitation.status === 'pending' && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => memberType === 'contractor' ? handleAcceptContractor(invitation) : handleAcceptEmployee(invitation)}
                              className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold shadow-lg hover:shadow-emerald-600/50"
                            >
                              ✓ Accept
                            </button>
                            <button
                              onClick={() => memberType === 'contractor' ? handleDeclineContractor(invitation) : handleDeclineEmployee(invitation)}
                              className="px-5 py-2.5 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 hover:text-white transition font-medium"
                            >
                              ✗ Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
