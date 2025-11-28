/**
 * Employee Stats Section Component
 * @module widgets/profile/public/employee-sections/EmployeeStatsSection
 * 
 * Displays employee's key statistics including jobs completed, attendance, and performance metrics.
 * Shows productivity and reliability indicators within the organization.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface EmployeeStatsProps {
  stats: {
    rating?: number;
    jobsCompleted?: number;
    satisfaction?: number;
    experience?: number;
  };
  statsVisibility: {
    showRating?: boolean;
    showJobsCompleted?: boolean;
    showSatisfaction?: boolean;
    showExperience?: boolean;
  };
  visibleStatsCount?: number;
}

export default function EmployeeStatsSection({ stats, statsVisibility, visibleStatsCount: propVisibleStatsCount }: EmployeeStatsProps) {
  const visibleStatsCount = propVisibleStatsCount ?? Object.values(statsVisibility).filter(Boolean).length;

  if (visibleStatsCount === 0) return null;

  return (
    <div className={`grid gap-4 ${
      visibleStatsCount === 1 ? 'grid-cols-1 md:grid-cols-1' :
      visibleStatsCount === 2 ? 'grid-cols-1 md:grid-cols-2' :
      visibleStatsCount === 3 ? 'grid-cols-1 md:grid-cols-3' :
      'grid-cols-1 md:grid-cols-4'
    }`}>
      {statsVisibility.showRating && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-white mb-1">{stats.rating}/5</div>
          <div className="text-slate-400 text-sm">Rating</div>
          <div className="text-xs text-slate-500 mt-1">Performance score</div>
        </div>
      )}
      {statsVisibility.showJobsCompleted && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-white mb-1">{stats.jobsCompleted}</div>
          <div className="text-slate-400 text-sm">Jobs Completed</div>
          <div className="text-xs text-slate-500 mt-1">This year</div>
        </div>
      )}
      {statsVisibility.showSatisfaction && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-white mb-1">{stats.satisfaction}%</div>
          <div className="text-slate-400 text-sm">Satisfaction</div>
          <div className="text-xs text-slate-500 mt-1">Excellent</div>
        </div>
      )}
      {statsVisibility.showExperience && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-2xl font-bold text-white mb-1">{stats.experience}</div>
          <div className="text-slate-400 text-sm">Experience</div>
          <div className="text-xs text-slate-500 mt-1">On platform</div>
        </div>
      )}
    </div>
  );
}