/**
 * Toggle Component
 * @module shared/ui/Toggle
 * 
 * ✅ DIAMOND STANDARD: Toggle switch component
 */

'use client';

interface ToggleProps {
  /**
   * Toggle label
   */
  label?: string;
  /**
   * Toggle description
   */
  description?: string;
  /**
   * Checked state
   */
  checked: boolean;
  /**
   * Change handler
   */
  onChange: (checked: boolean) => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Toggle color
   */
  color?: 'teal' | 'emerald' | 'blue' | 'purple';
}

const colorClasses = {
  teal: 'bg-teal-600',
  emerald: 'bg-emerald-600',
  blue: 'bg-blue-600',
  purple: 'bg-purple-600',
};

/**
 * Toggle switch component
 * 
 * @example
 * ```tsx
 * <Toggle
 *   label="Make profile public"
 *   description="Allow others to view your profile"
 *   checked={isPublic}
 *   onChange={setIsPublic}
 * />
 * ```
 */
export function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  color = 'teal',
}: ToggleProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        {label && <p className="text-sm font-medium text-gray-900">{label}</p>}
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked ? 'true' : 'false'}
        aria-label={label || 'Toggle setting'}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2
          ${checked ? colorClasses[color] : 'bg-gray-200'}
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
            transition duration-200 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}
