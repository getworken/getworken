/**
 * LoadingState Component
 * @module shared/ui/LoadingState
 * 
 * ✅ DIAMOND STANDARD: Loading state indicator
 */

'use client';

interface LoadingStateProps {
  /**
   * Loading message to display
   */
  message?: string;
  /**
   * Size of the spinner
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Full page loading (centered)
   */
  fullPage?: boolean;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-10 w-10',
  lg: 'h-16 w-16',
};

/**
 * Loading state component with spinner
 * 
 * @example
 * ```tsx
 * <LoadingState message="Loading profile..." size="md" />
 * ```
 */
export function LoadingState({ message, size = 'md', fullPage = false }: LoadingStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-teal-600`}
        role="status"
        aria-label="Loading"
      />
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{content}</div>;
}
