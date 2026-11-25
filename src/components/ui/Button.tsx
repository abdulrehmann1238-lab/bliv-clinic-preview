import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 rounded-bliv';

    const variants = {
      primary: 'bg-bliv-dark text-white hover:bg-[#1e2c25] shadow-sm hover:shadow focus-visible:ring-bliv-dark',
      secondary: 'bg-bliv-surface-secondary text-bliv-text-primary hover:bg-bliv-sage/60 border border-bliv-border/60 focus-visible:ring-bliv-green',
      outline: 'bg-transparent border border-bliv-border text-bliv-text-primary hover:bg-bliv-surface-secondary/80 hover:border-bliv-sage-muted focus-visible:ring-bliv-green',
      ghost: 'bg-transparent text-bliv-text-primary hover:bg-bliv-surface-secondary/70 focus-visible:ring-bliv-green',
      danger: 'bg-bliv-error text-white hover:bg-[#a65f59] shadow-sm focus-visible:ring-bliv-error',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-5 py-2.5 gap-2.5 h-12',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {!isLoading && icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children && <span>{children}</span>}
        {!isLoading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
