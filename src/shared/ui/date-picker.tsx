'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

/**
 * Date Picker Component
 *
 * A date picker input with calendar popover.
 * Part of the shared layer following Diamond Standard v2.0.
 *
 * @module shared/ui
 *
 * @example
 * ```tsx
 * import { DatePicker } from '@/shared/ui';
 *
 * const [date, setDate] = React.useState<Date>();
 *
 * <DatePicker
 *   date={date}
 *   onDateChange={setDate}
 * />
 * ```
 */
export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function DatePicker({
  date,
  onDateChange,
  placeholder = 'Pick a date',
  className,
  disabled,
}: DatePickerProps) {
  const handleSelect = (selectedDate: Date | undefined) => {
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
DatePicker.displayName = 'DatePicker';

export { DatePicker };
