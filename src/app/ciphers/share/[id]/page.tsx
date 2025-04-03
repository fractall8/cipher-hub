import { getShareRecordById } from '@/features/share/api';
import { CiphersPage } from '@/pages/ciphers-page';

export default async function ShareIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const shareRecord = await getShareRecordById(id);

  return <CiphersPage shareData={shareRecord} />;
}
