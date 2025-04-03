'use client';

import { CipherForm } from '@/features/ciphers/ui/cipher-form';
import { useCipherForm } from '@/features/ciphers/lib/hooks/useCipherForm';
import { vigenere } from '@/features/ciphers/lib';
import { TVigenereFormState, VigenereFormSchema } from '@/features/ciphers/model/schema';
import { CyberInput } from '@/features/ciphers/ui/cyber-input';
import { merge } from '@/features/ciphers/lib/helpers';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';

export const VigenereForm = ({
  shareValues,
  result,
}: {
  shareValues?: TVigenereFormState;
  result?: string;
}) => {
  const defaultValues = {
    text: '',
    key: 'cipherhub',
    alphabet: 'abcdefghijklmnopqrstuvwxyz',
    action: 'encode',
  };
  const values = shareValues ? merge(defaultValues, shareValues) : defaultValues;

  const formHook = useCipherForm({
    schema: VigenereFormSchema,
    defaultValues: values,
    processFunction: vigenere,
    defaultResult: result,
  });

  return (
    <CipherForm
      formHook={formHook}
      renderFields={
        <>
          <FormField
            control={formHook.form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <CyberInput
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      formHook.handleDebouncedActionSubmit();
                    }}
                    type="text"
                    placeholder="Enter key..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formHook.form.control}
            name="alphabet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alphabet</FormLabel>
                <FormControl>
                  <CyberInput
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      formHook.handleDebouncedActionSubmit();
                    }}
                    placeholder="Vigenere cipher will be using this alphabet"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      }
    />
  );
};
