import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  isOnline?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', className, isOnline }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
    '2xl': 'w-32 h-32'
  };

  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={alt}
        className={cn(
          'object-cover rounded-full border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800',
          sizes[size],
          className
        )}
      />
      {isOnline && (
        <span className={cn(
          "absolute bottom-0 right-0 block rounded-full bg-green-500 ring-2 ring-white dark:ring-black",
          size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
        )} />
      )}
    </div>
  );
};

