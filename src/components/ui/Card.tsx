import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, children, hover, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm',
        hover && 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

