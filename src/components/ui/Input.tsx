import React, { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, rightElement, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-bliv-text-secondary mb-1.5">
            {label}
            {props.required && <span className="text-bliv-error ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-bliv-text-secondary pointer-events-none flex items-center">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={clsx(
              'w-full bg-bliv-surface border rounded-bliv text-sm text-bliv-text-primary placeholder:text-bliv-text-secondary/60 transition-colors focus:outline-none focus:ring-2 focus:ring-bliv-green/30 focus:border-bliv-green py-2 px-3',
              icon ? 'pl-9' : 'pl-3',
              rightElement ? 'pr-10' : 'pr-3',
              error ? 'border-bliv-error focus:ring-bliv-error/20 focus:border-bliv-error' : 'border-bliv-border',
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-bliv-error mt-1">{error}</p>}
        {!error && helperText && <p className="text-xs text-bliv-text-secondary/80 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
