import { notFound } from 'next/navigation';
import { ClientWrapper } from '@/app/ciphers/ui/client-wrapper';
import { CLIENT_URL } from '@/shared/constants';

export default async function ShareIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`${CLIENT_URL}/api/share/${id}`, { method: 'GET' });
  const shareRecord = await response.json();

  if (shareRecord?.error) {
    notFound();
  }

  return <ClientWrapper shareData={shareRecord} />;
}
