'use client';
import { CiphersStoreProvider } from '@/features/ciphers/model/provider';
import { ShareDataProp, TCipherIds } from '@/features/ciphers/model/schema';
import { CiphersPage } from '@/features/ciphers';

export function ClientWrapper<T extends TCipherIds>({
  shareData,
}: {
  shareData: ShareDataProp<T>;
}) {
  return (
    <CiphersStoreProvider>
      <CiphersPage shareData={shareData} />
    </CiphersStoreProvider>
  );
}
