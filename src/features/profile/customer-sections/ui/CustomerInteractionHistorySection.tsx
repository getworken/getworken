/**
 * CustomerInteractionHistorySection Component
 * @module features/profile/customer-sections/ui/CustomerInteractionHistorySection
 * 
 * ✅ DIAMOND STANDARD: Customer interaction timeline
 */

'use client';


export interface Interaction {
  id: string;
  date: string;
  type: 'support' | 'feedback' | 'complaint' | 'compliment';
  description: string;
  resolved: boolean;
}

export interface CustomerInteractionHistorySectionProps {
  interactions: Interaction[];
}

export function CustomerInteractionHistorySection({ interactions }: CustomerInteractionHistorySectionProps) {
  const getTypeColor = (type: Interaction['type']) => {
    switch (type) {
      case 'support': return 'border-blue-500';
      case 'feedback': return 'border-green-500';
      case 'complaint': return 'border-red-500';
      case 'compliment': return 'border-purple-500';
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Interaction History</h3>
      {interactions.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No interactions recorded</p>
      ) : (
        <div className="space-y-3">
          {interactions.map((interaction) => (
            <div key={interaction.id} className={`bg-slate-800 rounded-lg p-4 border-l-4 ${getTypeColor(interaction.type)}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="inline-block px-2 py-1 bg-slate-700 rounded text-xs text-white capitalize mb-2">
                    {interaction.type}
                  </span>
                  <p className="text-white text-sm">{interaction.description}</p>
                  <p className="text-slate-400 text-xs mt-1">{interaction.date}</p>
                </div>
                {interaction.resolved && (
                  <span className="text-green-400 text-xl" title="Resolved">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
