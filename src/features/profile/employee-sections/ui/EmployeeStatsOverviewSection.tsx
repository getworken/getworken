/**
 * EmployeeStatsOverviewSection Component
 * @module features/profile/employee-sections/ui/EmployeeStatsOverviewSection
 * 
 * ✅ DIAMOND STANDARD: Employee statistics overview
 */

'use client';


export interface EmployeeStatsOverviewSectionProps {
  stats?: {
    tasksCompleted: number;
    projectsWorked: number;
    hoursLogged: number;
    attendance: string;
  };
}

export function EmployeeStatsOverviewSection({ 
  stats = { tasksCompleted: 0, projectsWorked: 0, hoursLogged: 0, attendance: 'N/A' }
}: EmployeeStatsOverviewSectionProps) {
  const statCards = [
    {
      label: 'Tasks Completed',
      value: stats.tasksCompleted,
      icon: '✅',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      label: 'Projects Worked',
      value: stats.projectsWorked,
      icon: '📁',
      color: 'from-green-500 to-emerald-600'
    },
    {
      label: 'Hours Logged',
      value: stats.hoursLogged,
      icon: '⏱️',
      color: 'from-purple-500 to-pink-600'
    },
    {
      label: 'Attendance',
      value: stats.attendance,
      icon: '📊',
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
