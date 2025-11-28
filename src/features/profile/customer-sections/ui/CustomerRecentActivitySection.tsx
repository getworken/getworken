/**
 * CustomerRecentActivitySection Component
 * @module features/profile/customer-sections/ui/CustomerRecentActivitySection
 * 
 * ✅ DIAMOND STANDARD: Customer recent activity timeline
 */

'use client';


export interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
}

export interface CustomerRecentActivitySectionProps {
  activities: Activity[];
}

export function CustomerRecentActivitySection({ activities }: CustomerRecentActivitySectionProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return '📦';
      case 'payment': return '💰';
      case 'review': return '⭐';
      case 'message': return '💬';
      default: return '📝';
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No recent activity</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-600 last:border-0">
              <div className="text-3xl">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.description}</p>
                <p className="text-slate-400 text-sm">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
