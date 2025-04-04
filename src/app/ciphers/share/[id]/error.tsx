'use client';

import { CyberButton } from '@/features/ciphers/ui';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p className="text-red-400 text-3xl font-bold mb-4">Oops! Failed to fetch share data :(</p>
      <span className="text-lg text-foreground/80 mb-2">
        If error persists after pressing the button try again later.
      </span>
      <CyberButton onClick={() => reset()}>Try again</CyberButton>
    </div>
  );
}
