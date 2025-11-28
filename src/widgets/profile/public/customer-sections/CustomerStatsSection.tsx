/**
 * Customer Stats Section Component
 * @module widgets/profile/public/customer-sections/CustomerStatsSection
 * 
 * Displays customer's key statistics including service requests and member tenure.
 * Shows engagement metrics and customer history.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface CustomerStatsSectionProps {
  profile: any;
}

export default function CustomerStatsSection({ profile }: CustomerStatsSectionProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <div className="bg-slate-700 rounded-lg p-4 text-center">
        <div className="text-3xl mb-2">✅</div>
        <div className="text-2xl font-bold text-white mb-1">{profile.stats?.completedJobs ?? 0}</div>
        <div className="text-slate-400 text-sm">Completed Jobs</div>
        <div className="text-xs text-slate-500 mt-1">Finished projects</div>
      </div>
      <div className="bg-slate-700 rounded-lg p-4 text-center">
        <div className="text-3xl mb-2">🔄</div>
        <div className="text-2xl font-bold text-white mb-1">{profile.stats?.activeJobs ?? 0}</div>
        <div className="text-slate-400 text-sm">Active Jobs</div>
        <div className="text-xs text-slate-500 mt-1">In progress</div>
      </div>
      <div className="bg-slate-700 rounded-lg p-4 text-center">
        <div className="text-3xl mb-2">💰</div>
        <div className="text-2xl font-bold text-white mb-1">${(profile.stats?.totalSpent ?? 0).toLocaleString()}</div>
        <div className="text-slate-400 text-sm">Total Spent</div>
        <div className="text-xs text-slate-500 mt-1">Lifetime value</div>
      </div>
    </div>
  );
}