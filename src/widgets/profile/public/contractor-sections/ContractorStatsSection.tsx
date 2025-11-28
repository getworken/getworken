/**
 * Contractor Stats Section Component
 * @module widgets/profile/public/contractor-sections/ContractorStatsSection
 * 
 * Displays contractor's key statistics including jobs completed, rating, and response time.
 * Shows performance metrics and reliability indicators.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface ContractorStatsProps {
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

export default function ContractorStatsSection({ stats, statsVisibility, visibleStatsCount: propVisibleStatsCount }: ContractorStatsProps) {
  const visibleStatsCount = propVisibleStatsCount ?? Object.values(statsVisibility).filter(Boolean).length;

  if (visibleStatsCount === 0) return null;

  return (
    <div className={`grid gap-4 ${
      visibleStatsCount === 1 ? 'grid-cols-1 md:grid-cols-1' :
      visibleStatsCount === 2 ? 'grid-cols-1 md:grid-cols-2' :
      visibleStatsCount === 3 ? 'grid-cols-1 md:grid-cols-3' :
      'grid-cols-2 md:grid-cols-4'
    }`}>
      {statsVisibility.showRating && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-white mb-1">{stats.rating || 0}/5</div>
          <div className="text-slate-400 text-sm">Rating</div>
        </div>
      )}
      {statsVisibility.showJobsCompleted && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-white mb-1">{stats.jobsCompleted || 0}</div>
          <div className="text-slate-400 text-sm">Jobs Completed</div>
        </div>
      )}
      {statsVisibility.showSatisfaction && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">😊</div>
          <div className="text-2xl font-bold text-white mb-1">{stats.satisfaction || 0}%</div>
          <div className="text-slate-400 text-sm">Satisfaction</div>
        </div>
      )}
      {statsVisibility.showExperience && (
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-white mb-1">{stats.experience || 0}</div>
          <div className="text-slate-400 text-sm">Experience Points</div>
        </div>
      )}
    </div>
  );
}