import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-bliv-border rounded-bliv-lg bg-bliv-surface/60 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-bliv-sage/40 flex items-center justify-center text-bliv-green mb-4 shadow-sm">
        {icon}
      </div>
      <h4 className="text-base font-semibold text-bliv-dark mb-1">{title}</h4>
      <p className="text-xs sm:text-sm text-bliv-text-secondary max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
