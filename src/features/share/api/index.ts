'use server';

import { TShareContent, TCipherIds } from '@/features/ciphers/model/schema';
import { CLIENT_URL } from '@/shared/constants';

export async function createShareRecord({
  data,
}: {
  data: { cipherId: TCipherIds; content: TShareContent<TCipherIds>; result?: string };
}) {
  try {
    const response = await fetch(`${CLIENT_URL}/api/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const shareRecord = await response.json();
    return shareRecord.id;
  } catch (e) {
    console.error('Error creating share record:', e);
    return null;
  }
}

export async function getShareRecordById(
  id: string,
): Promise<{ cipherId: TCipherIds; content: TShareContent<TCipherIds>; result: string } | null> {
  try {
    const response = await fetch(`${CLIENT_URL}/api/share/${id}`, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const shareRecord = await response.json();
    return shareRecord;
  } catch (e) {
    console.log('Failed to fetch share record by id.', e);
    return null;
  }
}
