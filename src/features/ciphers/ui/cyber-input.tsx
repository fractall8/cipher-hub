import React from 'react';
import { cn } from '@/shared/lib/utils';

export const CyberInput = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      className={cn([
        'cyber-border text-foreground placeholder:text-muted-foreground w-full px-3 py-2 text-sm outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      ])}
      {...props}
    />
  );
};
