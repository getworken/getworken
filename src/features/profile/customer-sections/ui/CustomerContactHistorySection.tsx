/**
 * CustomerContactHistorySection Component
 * @module features/profile/customer-sections/ui/CustomerContactHistorySection
 * 
 * ✅ DIAMOND STANDARD: Customer contact history timeline
 */

'use client';


export interface ContactHistory {
  id: string;
  date: string;
  type: 'call' | 'email' | 'chat' | 'meeting';
  subject: string;
  notes?: string;
}

export interface CustomerContactHistorySectionProps {
  contacts: ContactHistory[];
}

export function CustomerContactHistorySection({ contacts }: CustomerContactHistorySectionProps) {
  const getIcon = (type: ContactHistory['type']) => {
    switch (type) {
      case 'call': return '📞';
      case 'email': return '✉️';
      case 'chat': return '💬';
      case 'meeting': return '🤝';
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Contact History</h3>
      {contacts.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No contact history</p>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-slate-800 rounded-lg p-4 border-l-4 border-sky-500">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{getIcon(contact.type)}</span>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{contact.subject}</h4>
                  <p className="text-slate-400 text-sm">{contact.date}</p>
                </div>
              </div>
              {contact.notes && (
                <p className="text-slate-300 text-sm mt-2 pl-11">{contact.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
