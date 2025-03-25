import { cn } from '@/shared/lib/utils';
import React from 'react';

export const CyberButton = ({ children, className, ...props }: React.ComponentProps<'button'>) => {
  return (
    <button
      className={cn([
        'cyber-button px-6 py-3 text-primary-foreground font-medium hover:cursor-pointer',
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  );
};
