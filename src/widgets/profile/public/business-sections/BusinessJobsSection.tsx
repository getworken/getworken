/**
 * Business Jobs Section Component
 * @module widgets/profile/public/business-sections/BusinessJobsSection
 * 
 * Displays business job openings and hiring information.
 * Part of public business profile widget composition.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface Job {
  id: string;
  title: string;
  description?: string;
  location?: string;
  type?: string;
  salary?: string;
  requirements?: string[];
  postedDate?: string;
  status?: string;
}

interface BusinessJobsSectionProps {
  branding: any;
  businessInfo: any;
  jobs: Job[];
}

export default function BusinessJobsSection({ jobs }: BusinessJobsSectionProps) {
  const activeJobs = jobs.filter(job => job.status !== 'closed' && job.status !== 'filled');

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Job Opportunities</h3>
      
      {activeJobs.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">💼</div>
          <p className="text-slate-400 mb-2">No open positions at the moment</p>
          <p className="text-slate-500 text-sm">Check back later for new opportunities!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeJobs.map((job) => (
            <div key={job.id} className="bg-slate-600 rounded-lg p-6 border border-slate-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{job.title}</h4>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                    {job.location && (
                      <span className="flex items-center">
                        📍 {job.location}
                      </span>
                    )}
                    {job.type && (
                      <span className="flex items-center">
                        💼 {job.type}
                      </span>
                    )}
                    {job.salary && (
                      <span className="flex items-center text-green-400">
                        💰 {job.salary}
                      </span>
                    )}
                  </div>
                </div>
                {job.postedDate && (
                  <span className="text-xs text-slate-400">
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              {job.description && (
                <div className="mb-4">
                  <p className="text-slate-300 leading-relaxed">{job.description}</p>
                </div>
              )}
              
              {job.requirements && job.requirements.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-white font-medium mb-2">Requirements:</h5>
                  <ul className="text-slate-300 text-sm space-y-1">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {job.status && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      job.status === 'urgent' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-green-600 text-white'
                    }`}>
                      {job.status === 'urgent' ? 'Urgent' : 'Open'}
                    </span>
                  )}
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}