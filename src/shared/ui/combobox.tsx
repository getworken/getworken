'use client';

import * as React from 'react';

import { cn } from '../lib/utils';
import { Command, CommandGroup, CommandItem } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Check, ChevronsUpDown } from 'lucide-react';

/**
 * Combobox Component
 *
 * Searchable select component combining Command and Popover.
 * Part of the shared layer following Diamond Standard v2.0.
 *
 * @module shared/ui
 *
 * @example
 * ```tsx
 * import { Combobox } from '@/shared/ui';
 *
 * const frameworks = [
 *   { value: "next.js", label: "Next.js" },
 *   { value: "react", label: "React" },
 * ];
 *
 * <Combobox
 *   options={frameworks}
 *   value={value}
 *   onValueChange={setValue}
 *   placeholder="Select framework..."
 *   emptyText="No framework found."
 * />
 * ```
 */
export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Select option...',
  emptyText = 'No option found.',
  className,
  disabled,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between', className)}
          disabled={disabled}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {options.length === 0 ? (
              <div className="py-6 text-center text-sm">{emptyText}</div>
            ) : (
              options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
Combobox.displayName = 'Combobox';

export { Combobox };
