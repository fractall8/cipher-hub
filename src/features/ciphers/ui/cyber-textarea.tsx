import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Textarea } from '@/shared/ui/textarea';

export const CyberTextarea = ({ className, ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <Textarea
      {...props}
      className={cn([
        'w-full h-32 bg-white cyber-border resize-none p-3 focus:outline-none focus:ring-2 focus:ring-primary',
        className,
      ])}
    />
  );
};
