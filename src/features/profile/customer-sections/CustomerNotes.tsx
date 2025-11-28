/**
 * Customer Notes Feature Component
 * @module features/profile/customer-sections/CustomerNotes
 *
 * Displays internal staff notes about customer:
 * - Note content and author
 * - Creation dates
 * - Note categories (general, important, follow-up)
 * - Add/edit note functionality
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { CustomerProfile } from '@/entities/profile/model/types';

/**
 * CustomerNotes Component
 *
 * Displays internal customer notes with content, author, date, and category.
 * Shows notes in a card layout with color-coded categories.
 *
 * @component
 * @param {Object} props - Component props
 * @param {CustomerProfile} props.profile - Customer profile data
 * @param {boolean} [props.isEditing=false] - Whether the component is in editing mode
 * @param {() => void} [props.onEdit] - Callback function when edit button is clicked
 */
interface CustomerNotesProps {
  profile: CustomerProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export const CustomerNotes: React.FC<CustomerNotesProps> = ({
  profile,
  isEditing = false,
  onEdit,
}) => {
  const notes = profile.notes || [];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      general: 'bg-blue-100 text-blue-800',
      support: 'bg-purple-100 text-purple-800',
      billing: 'bg-green-100 text-green-800',
      feedback: 'bg-yellow-100 text-yellow-800',
      complaint: 'bg-red-100 text-red-800',
    };
    return colors[category?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Internal Notes</CardTitle>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500">No notes added</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${getCategoryColor(
                        note.category
                      )}`}
                    >
                      {note.category}
                    </span>
                    <span className="text-sm text-gray-600">
                      {new Date(note.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {note.author}
                  </span>
                </div>
                {isEditing ? (
                  <textarea
                    defaultValue={note.note}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                ) : (
                  <p className="text-sm leading-relaxed text-gray-700">
                    {note.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {isEditing && (
          <button className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Add New Note
          </button>
        )}
      </CardContent>
    </Card>
  );
};
