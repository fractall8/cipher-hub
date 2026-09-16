'use client';

import { CyberButton } from '@/features/ciphers/ui';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-destructive text-3xl font-bold mb-4">
        Oops! Failed to fetch share data :(
      </p>
      <span className="text-article mb-2">
        If error persists after pressing the button try again later.
      </span>
      <CyberButton onClick={() => reset()}>Try again</CyberButton>
    </div>
  );
}
