'use server';

import { TShareContent, TCipherIds } from '@/features/ciphers/model/schema';
import { CLIENT_URL } from '@/shared/constants';
import { ShareDataSchema } from '../model/schema';

export async function createShareRecord({
  data,
}: {
  data: { cipherId: TCipherIds; content: TShareContent<TCipherIds>; result?: string };
}) {
  try {
    const validationResult = ShareDataSchema.safeParse(data);

    if (!validationResult.success) {
      throw new Error(`Invalid share data: ${validationResult.error}`);
    }

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
