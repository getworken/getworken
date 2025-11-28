/**
 * Business Stats Section Component
 * @module widgets/profile/public/business-sections/BusinessStatsSection
 * 
 * Displays business statistics and key metrics (jobs completed, rating, etc.).
 * Part of public business profile widget composition.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface BusinessStatsSectionProps {
  branding: any;
  businessStatsVisibility: any;
  businessInfo: any;
  allTeamMembers: any[];
}

export default function BusinessStatsSection({ branding, businessStatsVisibility, businessInfo, allTeamMembers }: BusinessStatsSectionProps) {
  if (!branding?.showStats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {businessStatsVisibility?.showRating && businessInfo.customerRating && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-white mb-1">{businessInfo.customerRating}/5</div>
          <div className="text-slate-400 text-sm">Rating</div>
          {businessInfo.totalReviews && (
            <div className="text-xs text-slate-500 mt-1">{businessInfo.totalReviews} reviews</div>
          )}
        </div>
      )}
      {businessStatsVisibility?.showJobsCompleted && businessInfo.totalProjects && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-white mb-1">{businessInfo.totalProjects}</div>
          <div className="text-slate-400 text-sm">Projects</div>
          <div className="text-xs text-slate-500 mt-1">Completed</div>
        </div>
      )}
      {businessStatsVisibility?.showTeamMembers && allTeamMembers.length > 0 && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-white mb-1">{allTeamMembers.length}</div>
          <div className="text-slate-400 text-sm">Team Members</div>
          <div className="text-xs text-slate-500 mt-1">Professionals</div>
        </div>
      )}
      {businessStatsVisibility?.showEstablished && businessInfo.established && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-2xl font-bold text-white mb-1">{businessInfo.established}</div>
          <div className="text-slate-400 text-sm">Established</div>
          <div className="text-xs text-slate-500 mt-1">Years in business</div>
        </div>
      )}
    </div>
  );
}