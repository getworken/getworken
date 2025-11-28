/**
 * Permissions Modal Component
 * @module shared/ui/modals/PermissionsModal
 * 
 * Modal dialog for managing team member permissions.
 * Allows business owners to set granular access controls for contractors and employees.
 * Includes permissions for jobs, estimates, customers, schedule, reports, and team management.
 * 
 * ✅ DIAMOND STANDARD: Shared UI modal component
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#shared-layer}
 */

"use client";

import { useState } from 'react';

// TODO: Import from server actions when implemented
// import { updateTeamMemberPermissions } from '@/app/api/actions/team/teamActions';

// Stub function for development
const updateTeamMemberPermissions = async (_businessId: string, _memberId: string, _memberType: string, _permissions: any) => ({ success: true, message: 'Permissions updated (dev mode)' });

interface Permissions {
  canViewJobs: boolean;
  canEditJobs: boolean;
  canViewEstimates: boolean;
  canCreateEstimates: boolean;
  canViewCustomers: boolean;
  canEditCustomers: boolean;
  canViewSchedule: boolean;
  canEditSchedule: boolean;
  canViewReports: boolean;
  canManageTeam?: boolean;
}

interface Contractor {
  id: string;
  name: string;
  role: string;
  permissions: Permissions;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  permissions: Permissions & { canManageTeam: boolean };
}

interface PermissionsModalProps {
  show: boolean;
  onClose: () => void;
  selectedMember: string | null;
  teamMembers: {
    contractors: Contractor[];
    employees: Employee[];
  };
  setTeamMembers: (members: { contractors: Contractor[]; employees: Employee[] }) => void;
  setToast: (toast: { message: string; type: 'success' | 'error' } | null) => void;
  businessId: string | null;
}

export default function PermissionsModal({
  show,
  onClose,
  selectedMember,
  teamMembers,
  setTeamMembers,
  setToast,
  businessId,
}: PermissionsModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  
  if (!show || !selectedMember) return null;

  // Get fresh member reference from current state on each render
  const contractorMember = teamMembers.contractors.find(c => c.id === selectedMember);
  const employeeMember = teamMembers.employees.find(e => e.id === selectedMember);
  const member = contractorMember || employeeMember;
  
  if (!member) return null;

  const isEmployee = !!employeeMember;

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    if (!businessId) {
      setToast({ message: 'Business ID not found', type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const memberType = isEmployee ? 'employee' : 'contractor';
      const result = await updateTeamMemberPermissions(
        businessId,
        selectedMember,
        memberType,
        member.permissions
      );

      if (result.success) {
        onClose();
        setToast({ message: 'Permissions updated successfully!', type: 'success' });
      } else {
        setToast({ message: result.message || 'Failed to update permissions', type: 'error' });
      }
    } catch (error) {
      // Log error for debugging (error object contains stack trace)
      if (error instanceof Error) {
        console.warn('Permissions error:', error.message);
      }
      setToast({ message: 'Failed to update permissions', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const updatePermission = (permissionKey: keyof Permissions, value: boolean) => {
    if (isEmployee) {
      const updatedEmployees = teamMembers.employees.map(emp => {
        if (emp.id === selectedMember) {
          return { ...emp, permissions: { ...emp.permissions, [permissionKey]: value } };
        }
        return emp;
      });
      const newTeamMembers = { ...teamMembers, employees: updatedEmployees };
      setTeamMembers(newTeamMembers);
    } else {
      const updatedContractors = teamMembers.contractors.map(con => {
        if (con.id === selectedMember) {
          return { ...con, permissions: { ...con.permissions, [permissionKey]: value } };
        }
        return con;
      });
      const newTeamMembers = { ...teamMembers, contractors: updatedContractors };
      setTeamMembers(newTeamMembers);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Manage Permissions</h3>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Member Info */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                isEmployee
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                  : 'bg-gradient-to-br from-emerald-500 to-green-600'
              }`}>
                {isEmployee ? '👤' : '👷'}
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">{member.name}</h4>
                <p className="text-slate-400">{isEmployee ? (member as Employee).position : (member as Contractor).role}</p>
              </div>
            </div>

            {/* Permissions Categories */}
            <div className="space-y-4">
              {/* Jobs */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>📋</span> Jobs & Tasks
                </h5>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700">
                    <span className="text-slate-300">View Jobs</span>
                    <input
                      type="checkbox"
                      checked={member.permissions.canViewJobs}
                      onChange={(e) => updatePermission('canViewJobs', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-teal-600"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700">
                    <span className="text-slate-300">Edit Jobs</span>
                    <input
                      type="checkbox"
                      checked={member.permissions.canEditJobs}
                      onChange={(e) => updatePermission('canEditJobs', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-teal-600"
                    />
                  </label>
                </div>
              </div>

              {/* Estimates */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>💰</span> Estimates & Quotes
                </h5>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700">
                    <span className="text-slate-300">View Estimates</span>
                    <input
                      type="checkbox"
                      checked={member.permissions.canViewEstimates}
                      onChange={(e) => updatePermission('canViewEstimates', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-teal-600"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700">
                    <span className="text-slate-300">Create Estimates</span>
                    <input
                      type="checkbox"
                      checked={member.permissions.canCreateEstimates}
                      onChange={(e) => updatePermission('canCreateEstimates', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-teal-600"
                    />
                  </label>
                </div>
              </div>

              {/* Customers */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>👥</span> Customers
                </h5>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700">
                    <span className="text-slate-300">View Customers</span>
                    <input
                      type="checkbox"
                      checked={member.permissions.canViewCustomers}
                      onChange={(e) => updatePermission('canViewCustomers', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-teal-600"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700">
                    <span className="text-slate-300">Edit Customers</span>
                    <input
                      type="checkbox"
                      checked={member.permissions.canEditCustomers}
                      onChange={(e) => updatePermission('canEditCustomers', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-teal-600"
                    />
                  </label>
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>📅</span> Schedule & Calendar
                </h5>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700">
                    <span className="text-slate-300">View Schedule</span>
                    <input
                      type="checkbox"
                      checked={member.permissions.canViewSchedule}
                      onChange={(e) => updatePermission('canViewSchedule', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-teal-600"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700">
                    <span className="text-slate-300">Edit Schedule</span>
                    <input
                      type="checkbox"
                      checked={member.permissions.canEditSchedule}
                      onChange={(e) => updatePermission('canEditSchedule', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-teal-600"
                    />
                  </label>
                </div>
              </div>

              {/* Reports */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>📊</span> Reports & Analytics
                </h5>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700">
                    <span className="text-slate-300">View Reports</span>
                    <input
                      type="checkbox"
                      checked={member.permissions.canViewReports}
                      onChange={(e) => updatePermission('canViewReports', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-teal-600"
                    />
                  </label>
                </div>
              </div>

              {/* Team Management (Employees Only) */}
              {isEmployee && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <span>⚙️</span> Team Management
                  </h5>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700">
                      <span className="text-slate-300">Manage Team</span>
                      <input
                        type="checkbox"
                        checked={(member as Employee).permissions.canManageTeam}
                        onChange={(e) => updatePermission('canManageTeam', e.target.checked)}
                        className="w-5 h-5 rounded border-slate-600 text-teal-600"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-700 flex items-center justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={isSaving}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="animate-spin">⏳</span>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
