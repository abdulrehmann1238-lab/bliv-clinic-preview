import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, children, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary mb-1.5">
            {label}
            {props.required && <span className="text-bliv-error ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            className={clsx(
              'w-full appearance-none bg-bliv-surface border rounded-bliv text-sm text-bliv-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-bliv-green/30 focus:border-bliv-green py-2 pl-3 pr-9',
              error ? 'border-bliv-error focus:ring-bliv-error/20 focus:border-bliv-error' : 'border-bliv-border',
              className
            )}
            {...props}
          >
            {options
              ? options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3 pointer-events-none text-bliv-text-secondary">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="text-xs text-bliv-error mt-1">{error}</p>}
        {!error && helperText && <p className="text-xs text-bliv-text-secondary/80 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
