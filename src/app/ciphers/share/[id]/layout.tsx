import { ReactNode, Suspense } from 'react';

export default function CipherIdLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
}
