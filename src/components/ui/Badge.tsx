import React from 'react';
import { clsx } from 'clsx';

export type BadgeVariant = 
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'sage'
  | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  dot = false,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
  };

  const variants: Record<BadgeVariant, { bg: string; dotColor?: string }> = {
    default: {
      bg: 'bg-bliv-surface-secondary text-bliv-text-secondary border border-bliv-border/60',
      dotColor: 'bg-bliv-text-secondary',
    },
    success: {
      bg: 'bg-[#eaf3ec] text-[#366141] border border-[#d2e4d6]',
      dotColor: 'bg-[#437b52]',
    },
    warning: {
      bg: 'bg-[#fcf5e9] text-[#8c672b] border border-[#f3e1c2]',
      dotColor: 'bg-[#c69b60]',
    },
    error: {
      bg: 'bg-[#faecea] text-[#8e3c35] border border-[#f2d0cc]',
      dotColor: 'bg-[#b86d67]',
    },
    info: {
      bg: 'bg-[#edf4f9] text-[#395c78] border border-[#d2e2ee]',
      dotColor: 'bg-[#718da5]',
    },
    sage: {
      bg: 'bg-bliv-sage/50 text-bliv-dark border border-bliv-sage',
      dotColor: 'bg-bliv-green',
    },
    outline: {
      bg: 'bg-transparent text-bliv-text-primary border border-bliv-border',
      dotColor: 'bg-bliv-text-secondary',
    },
  };

  return (
    <span className={clsx(baseStyles, sizes[size], variants[variant].bg, className)}>
      {dot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', variants[variant].dotColor)} />
      )}
      <span>{children}</span>
    </span>
  );
};
