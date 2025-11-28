/**
 * EmployeeProfileDetailsSection Component
 * @module features/profile/employee-sections/ui/EmployeeProfileDetailsSection
 * 
 * ✅ DIAMOND STANDARD: Employee profile details
 */

'use client';


export interface EmployeeProfileDetailsSectionProps {
  employeeProfile: any;
  updateEmployeeProfile: (updates: any) => void;
  onAddSkill?: (() => void) | undefined;
  setShowSkillsModal?: ((show: boolean) => void) | undefined;
  setShowPermissionsModal?: ((show: boolean) => void) | undefined;
  setShowEmployeeJobHistoryModal?: ((show: boolean) => void) | undefined;
}

export function EmployeeProfileDetailsSection({ 
  employeeProfile,
  updateEmployeeProfile,
  onAddSkill,
  setShowSkillsModal
}: EmployeeProfileDetailsSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Profile Details</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="employee-bio" className="block text-sm font-medium text-slate-300 mb-2">
            Professional Bio
          </label>
          <textarea
            id="employee-bio"
            value={employeeProfile?.bio || ''}
            onChange={(e) => updateEmployeeProfile({ bio: e.target.value })}
            placeholder="Tell about your background and experience..."
            className="w-full h-32 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-slate-300">
              Skills
            </label>
            <button
              onClick={() => {
                if (setShowSkillsModal) {
                  setShowSkillsModal(true);
                } else if (onAddSkill) {
                  onAddSkill();
                }
              }}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {employeeProfile?.skills?.length ? (
              employeeProfile.skills.map((skill: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-slate-400 text-sm">No skills added yet</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-slate-300 mb-2">
              Position
            </label>
            <input
              id="position"
              type="text"
              value={employeeProfile?.position || ''}
              onChange={(e) => updateEmployeeProfile({ position: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-2">
              Department
            </label>
            <input
              id="department"
              type="text"
              value={employeeProfile?.department || ''}
              onChange={(e) => updateEmployeeProfile({ department: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
