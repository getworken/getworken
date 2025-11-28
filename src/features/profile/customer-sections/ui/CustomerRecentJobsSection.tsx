/**
 * CustomerRecentJobsSection Component
 * @module features/profile/customer-sections/ui/CustomerRecentJobsSection
 * 
 * ✅ DIAMOND STANDARD: Customer recent job requests and bookings
 */

'use client';


export interface RecentJob {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  provider?: string;
}

export interface CustomerRecentJobsSectionProps {
  jobs: RecentJob[];
}

export function CustomerRecentJobsSection({ jobs }: CustomerRecentJobsSectionProps) {
  const getStatusColor = (status: RecentJob['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Recent Jobs</h3>
      {jobs.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">💼</div>
          <p className="text-slate-400">No job history</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.id} className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-medium">{job.title}</h4>
                  {job.provider && (
                    <p className="text-slate-400 text-sm">Provider: {job.provider}</p>
                  )}
                  <p className="text-slate-500 text-xs">{job.date}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
