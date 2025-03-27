import React from 'react';
import { cn } from '@/shared/lib/utils';

export const CyberInput = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      className={cn([
        'w-full bg-background border-primary cyber-border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary',
        className,
      ])}
      {...props}
    />
  );
};
