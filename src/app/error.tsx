'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CyberButton } from '@/features/ciphers/ui';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-destructive text-3xl font-bold mb-4">Oops! Something went wrong :(</p>
      <span className="text-article mb-2">
        If error persists after pressing the button you can navigate to home or ciphers page.
      </span>
      <CyberButton className="mb-4" onClick={() => reset()}>
        Try again
      </CyberButton>
      <div>
        <p className="text-center text-article mb-2">Navigate to...</p>
        <div className="flex gap-2">
          <Link href="/">
            <CyberButton>Home</CyberButton>
          </Link>
          <Link href="/ciphers">
            <CyberButton>Ciphers</CyberButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
