import { CiphersStoreProvider } from '@/features/ciphers/model/provider';
import { CiphersPage } from '@/pages/ciphers-page';

export default function Page() {
  return (
    <CiphersStoreProvider>
      <CiphersPage />
    </CiphersStoreProvider>
  );
}
