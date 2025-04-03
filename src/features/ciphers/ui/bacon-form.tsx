'use client';

import { CipherForm } from '@/features/ciphers/ui/cipher-form';
import { useCipherForm } from '@/features/ciphers/lib/hooks/useCipherForm';
import { bacon } from '@/features/ciphers/lib';
import { BaconFormScheme, TBaconFormState } from '@/features/ciphers/model/schema';
import { CyberInput } from '@/features/ciphers/ui/cyber-input';
import { merge } from '@/features/ciphers/lib/helpers';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';

export const BaconForm = ({
  shareValues,
  result,
}: {
  shareValues?: TBaconFormState;
  result?: string;
}) => {
  const defaultValues = {
    text: '',
    letter1: 'a',
    letter2: 'b',
    action: 'encode',
  };
  const values = shareValues ? merge(defaultValues, shareValues) : defaultValues;

  const formHook = useCipherForm({
    schema: BaconFormScheme,
    defaultValues: values,
    processFunction: bacon,
    defaultResult: result,
  });

  return (
    <CipherForm
      formHook={formHook}
      renderFields={
        <>
          <div className="flex justify-between items-center gap-2">
            <FormField
              control={formHook.form.control}
              name="letter1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Letter 1</FormLabel>
                  <FormControl>
                    <CyberInput
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        formHook.handleDebouncedActionSubmit();
                      }}
                      placeholder="letter 1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formHook.form.control}
              name="letter2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Letter 2</FormLabel>
                  <FormControl>
                    <CyberInput
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        formHook.handleDebouncedActionSubmit();
                      }}
                      placeholder="letter 2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      }
    />
  );
};
