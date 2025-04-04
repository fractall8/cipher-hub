import { ClientWrapper } from '@/pages/client-wrapper';
import { CLIENT_URL } from '@/shared/constants';

export default async function ShareIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`${CLIENT_URL}/api/share/${id}`, { method: 'GET' });
  const shareRecord = await response.json();

  return <ClientWrapper shareData={shareRecord} />;
}
