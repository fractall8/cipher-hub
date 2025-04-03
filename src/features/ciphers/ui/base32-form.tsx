import React from 'react';
import { CipherForm } from '@/features/ciphers/ui/cipher-form';
import { useCipherForm } from '@/features/ciphers/lib/hooks/useCipherForm';
import { base32 } from '@/features/ciphers/lib';
import { BaseFormScheme, TBaseFormState } from '@/features/ciphers/model/schema';
import { merge } from '@/features/ciphers/lib/helpers';

export const Base32Form = ({
  shareValues,
  result,
}: {
  shareValues?: TBaseFormState;
  result?: string;
}) => {
  const defaultValues = {
    text: '',
    action: 'encode',
  };
  const values = shareValues ? merge(defaultValues, shareValues) : defaultValues;

  const formHook = useCipherForm({
    schema: BaseFormScheme,
    defaultValues: values,
    processFunction: base32,
    defaultResult: result,
  });
  return <CipherForm formHook={formHook} renderFields={<></>} />;
};
