/**
 * ContractorStatsOverviewSection Component
 * @module features/profile/contractor-sections/ui/ContractorStatsOverviewSection
 * 
 * ✅ DIAMOND STANDARD: Contractor statistics overview cards
 */

'use client';


export interface ContractorStatsOverviewSectionProps {
  stats?: {
    completedJobs: number;
    activeProjects: number;
    rating: number;
    responseTime: string;
  };
}

export function ContractorStatsOverviewSection({ 
  stats = { completedJobs: 0, activeProjects: 0, rating: 0, responseTime: 'N/A' }
}: ContractorStatsOverviewSectionProps) {
  const statCards = [
    {
      label: 'Completed Jobs',
      value: stats.completedJobs,
      icon: '✅',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      icon: '🔨',
      color: 'from-green-500 to-emerald-600'
    },
    {
      label: 'Rating',
      value: stats.rating.toFixed(1),
      icon: '⭐',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      label: 'Response Time',
      value: stats.responseTime,
      icon: '⚡',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div 
          key={index}
          className={`bg-gradient-to-br ${stat.color} rounded-lg p-6`}
        >
          <div className="text-4xl mb-2">{stat.icon}</div>
          <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-white/90 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
