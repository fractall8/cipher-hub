import React from 'react';
import { CipherForm } from '@/features/ciphers/ui/cipher-form';
import { useCipherForm } from '@/features/ciphers/lib/hooks/useCipherForm';
import { base64 } from '@/features/ciphers/lib/ciphers/base64';
import { Base64FormScheme } from '@/features/ciphers/model/schema';

export const Base64Form = () => {
  const formHook = useCipherForm({
    schema: Base64FormScheme,
    defaultValues: { text: '', action: 'encode' },
    processFunction: base64,
  });

  return <CipherForm formHook={formHook} renderFields={<></>} />;
};
