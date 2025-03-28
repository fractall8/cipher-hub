import React from 'react';
import { useCipherForm } from '../lib/hooks/useCipherForm';
import { Base64FormScheme } from '../model/schema';
import { base64 } from '../lib/ciphers/base64';
import { CipherForm } from './cipher-form';

export const Base64Form = () => {
  const formHook = useCipherForm({
    schema: Base64FormScheme,
    defaultValues: { text: '', action: 'encode' },
    processFunction: base64,
  });
  return <CipherForm formHook={formHook} renderFields={<></>} />;
};
