import React from 'react';
import { CipherForm } from '@/features/ciphers/ui/cipher-form';
import { useCipherForm } from '@/features/ciphers/lib/hooks/useCipherForm';
import { base64 } from '@/features/ciphers/lib';
import { BaseFormScheme, TBaseFormState } from '@/features/ciphers/model/schema';
import { merge } from '../lib/helpers';

export const Base64Form = ({
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
    processFunction: base64,
    defaultResult: result,
  });

  return <CipherForm formHook={formHook} renderFields={<></>} />;
};
