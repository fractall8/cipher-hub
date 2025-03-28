import React from 'react';
import { CipherForm } from '@/features/ciphers/ui/cipher-form';
import { useCipherForm } from '@/features/ciphers/lib/hooks/useCipherForm';
import { base32 } from '@/features/ciphers/lib';
import { BaseFormScheme } from '@/features/ciphers/model/schema';

export const Base32Form = () => {
  const formHook = useCipherForm({
    schema: BaseFormScheme,
    defaultValues: { text: '', action: 'encode' },
    processFunction: base32,
  });

  return <CipherForm formHook={formHook} renderFields={<></>} />;
};
