/**
 * Business Team Section Component
 * @module widgets/profile/public/business-sections/BusinessTeamSection
 * 
 * Displays business team members with roles and information.
 * Part of public business profile widget composition.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface TeamMember {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  avatar?: string;
  skills?: string[];
  experience?: string;
}

interface BusinessTeamSectionProps {
  branding: any;
  businessInfo: any;
  allTeamMembers: TeamMember[];
}

export default function BusinessTeamSection({ allTeamMembers }: BusinessTeamSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Our Team</h3>
      
      {allTeamMembers.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">👥</div>
          <p className="text-slate-400">Team information coming soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTeamMembers.map((member) => (
            <div key={member.id} className="bg-slate-600 rounded-lg p-4 text-center">
              <div className="mb-4">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full mx-auto bg-slate-500 flex items-center justify-center text-2xl text-white">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              <h4 className="font-semibold text-white mb-1">{member.name}</h4>
              
              {member.role && (
                <p className="text-blue-400 text-sm mb-3">{member.role}</p>
              )}
              
              {member.bio && (
                <p className="text-slate-300 text-sm mb-3 leading-relaxed">{member.bio}</p>
              )}
              
              {member.experience && (
                <div className="mb-3">
                  <span className="text-xs text-slate-400">Experience: </span>
                  <span className="text-slate-300 text-sm">{member.experience}</span>
                </div>
              )}
              
              {member.skills && member.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-500 text-slate-200 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-2 py-1 bg-slate-500 text-slate-200 text-xs rounded">
                      +{member.skills.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}