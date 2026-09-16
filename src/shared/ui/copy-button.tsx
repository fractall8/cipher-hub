import React from 'react';
import { Check, Clipboard } from 'lucide-react';
import { Button, type ButtonProps } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

interface CopyButtonProps extends ButtonProps {
  value: string;
}

function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}

export function CopyButton({ value, className, variant = 'ghost', ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        'text-primary-strong hover:bg-primary hover:text-primary-foreground relative z-10 h-8 w-8',
        className,
      )}
      onClick={() => {
        copyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      <div className="transition-opacity duration-300">
        {hasCopied ? (
          <Check className="h-6 w-6 opacity-100 transition-opacity duration-300" />
        ) : (
          <Clipboard className="h-6 w-6 opacity-100 transition-opacity duration-300" />
        )}
      </div>
    </Button>
  );
}
