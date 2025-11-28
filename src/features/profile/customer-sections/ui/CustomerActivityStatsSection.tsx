/**
 * CustomerActivityStatsSection Component
 * @module features/profile/customer-sections/ui/CustomerActivityStatsSection
 * 
 * ✅ DIAMOND STANDARD: Customer activity statistics
 */

'use client';


export interface CustomerActivityStatsSectionProps {
  stats?: {
    totalOrders: number;
    activeProjects: number;
    totalSpent: string;
    loyaltyPoints: number;
  };
}

export function CustomerActivityStatsSection({ 
  stats = { totalOrders: 0, activeProjects: 0, totalSpent: '$0', loyaltyPoints: 0 }
}: CustomerActivityStatsSectionProps) {
  const statCards = [
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: '📦',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      icon: '🔨',
      color: 'from-green-500 to-emerald-600'
    },
    {
      label: 'Total Spent',
      value: stats.totalSpent,
      icon: '💰',
      color: 'from-purple-500 to-pink-600'
    },
    {
      label: 'Loyalty Points',
      value: stats.loyaltyPoints,
      icon: '⭐',
      color: 'from-yellow-500 to-orange-600'
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
