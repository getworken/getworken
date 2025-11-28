/**
 * Business Navigation Tabs Component
 * @module widgets/profile/public/business-sections/BusinessNavigationTabs
 * 
 * Tab navigation for switching between profile sections (About, Services, Team, Jobs).
 * Part of public business profile widget composition.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface BusinessNavigationTabsProps {
  branding: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BusinessNavigationTabs({ activeTab, setActiveTab }: BusinessNavigationTabsProps) {
  const tabs = ['about', 'services', 'team', 'jobs', 'contact'] as const;

  const getTabLabel = (tab: string): string => {
    const labels: Record<string, string> = {
      about: 'About',
      services: 'Services',
      team: 'Team',
      jobs: 'Jobs',
      contact: 'Contact'
    };
    return labels[tab] || tab;
  };

  return (
    <div className="flex space-x-1 bg-slate-700 rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 ${
            activeTab === tab
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-600'
          }`}
        >
          {getTabLabel(tab)}
        </button>
      ))}
    </div>
  );
}