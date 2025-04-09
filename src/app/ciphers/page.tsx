import { CiphersStoreProvider } from '@/features/ciphers/model/provider';
import { CiphersPage } from '@/features/ciphers';

export default function Page() {
  return (
    <CiphersStoreProvider>
      <CiphersPage />
    </CiphersStoreProvider>
  );
}
