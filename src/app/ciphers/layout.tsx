import { CiphersStoreProvider } from '@/features/ciphers/model/provider';
import React from 'react';

export default function CiphersLayout({ children }: { children: React.ReactNode }) {
  return <CiphersStoreProvider>{children}</CiphersStoreProvider>;
}
