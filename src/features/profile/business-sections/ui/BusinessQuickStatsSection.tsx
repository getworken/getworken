/**
 * BusinessQuickStatsSection Component
 * @module features/profile/business-sections/ui/BusinessQuickStatsSection
 * 
 * ✅ DIAMOND STANDARD: Business profile quick statistics cards
 * 
 * Displays key business metrics with visibility toggles.
 */

'use client';


export interface BusinessStatsVisibility {
  totalProjects: boolean;
  activeJobs: boolean;
  teamMembers: boolean;
  rating: boolean;
}

export interface BusinessQuickStatsSectionProps {
  /**
   * Visibility settings for each stat
   */
  businessStatsVisibility: BusinessStatsVisibility;
  /**
   * Callback to update visibility settings
   */
  setBusinessStatsVisibility: (visibility: BusinessStatsVisibility) => void;
  /**
   * Optional stats values (mock data if not provided)
   */
  stats?: {
    totalProjects: number;
    activeJobs: number;
    teamMembers: number;
    rating: number;
  };
}

/**
 * Business quick stats component
 * 
 * Renders a grid of stat cards with eye icons to toggle visibility.
 * 
 * @example
 * ```tsx
 * <BusinessQuickStatsSection
 *   businessStatsVisibility={visibility}
 *   setBusinessStatsVisibility={setVisibility}
 *   stats={{ totalProjects: 150, activeJobs: 12, teamMembers: 25, rating: 4.8 }}
 * />
 * ```
 */
export function BusinessQuickStatsSection({ 
  businessStatsVisibility, 
  setBusinessStatsVisibility,
  stats = { totalProjects: 0, activeJobs: 0, teamMembers: 0, rating: 0 }
}: BusinessQuickStatsSectionProps) {
  const statCards = [
    {
      key: 'totalProjects' as keyof BusinessStatsVisibility,
      label: 'Total Projects',
      value: stats.totalProjects,
      icon: '📊',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      key: 'activeJobs' as keyof BusinessStatsVisibility,
      label: 'Active Jobs',
      value: stats.activeJobs,
      icon: '🔨',
      color: 'from-green-500 to-emerald-600'
    },
    {
      key: 'teamMembers' as keyof BusinessStatsVisibility,
      label: 'Team Members',
      value: stats.teamMembers,
      icon: '👥',
      color: 'from-purple-500 to-pink-600'
    },
    {
      key: 'rating' as keyof BusinessStatsVisibility,
      label: 'Rating',
      value: stats.rating.toFixed(1),
      icon: '⭐',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const toggleVisibility = (key: keyof BusinessStatsVisibility) => {
    setBusinessStatsVisibility({
      ...businessStatsVisibility,
      [key]: !businessStatsVisibility[key]
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <div 
          key={stat.key}
          className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 relative`}
        >
          <button
            onClick={() => toggleVisibility(stat.key)}
            className="absolute top-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label={`Toggle ${stat.label} visibility`}
          >
            {businessStatsVisibility[stat.key] ? '👁️' : '🚫'}
          </button>
          <div className="text-4xl mb-2">{stat.icon}</div>
          <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-white/90 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
