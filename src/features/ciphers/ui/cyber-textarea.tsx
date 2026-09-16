import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Textarea } from '@/shared/ui/textarea';

export const CyberTextarea = ({ className, ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <Textarea
      {...props}
      className={cn([
        // a coloured shadcn border would paint over the notched rim
        'cyber-border rounded-none border-transparent shadow-none',
        'focus-visible:border-transparent focus-visible:ring-0',
        'h-32 w-full resize-none p-3 outline-none',
        className,
      ])}
    />
  );
};
