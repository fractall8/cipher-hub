import { Minus, Plus } from 'lucide-react';
import { CipherForm } from '@/features/ciphers/ui/cipher-form';
import { useCipherForm } from '@/features/ciphers/lib/hooks/useCipherForm';
import { caesar } from '@/features/ciphers/lib';
import { CaesarFormSchema } from '@/features/ciphers/model/schema';
import { CyberInput } from '@/features/ciphers/ui';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';

export const CaesarForm = () => {
  const formHook = useCipherForm({
    schema: CaesarFormSchema,
    defaultValues: {
      text: '',
      shift: 7,
      alphabet: 'abcdefghijklmnopqrstuvwxyz',
      action: 'encode',
    },
    processFunction: caesar,
  });

  return (
    <CipherForm
      formHook={formHook}
      renderFields={
        <>
          <FormField
            control={formHook.form.control}
            name="shift"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift</FormLabel>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      formHook.form.setValue(
                        'shift',
                        +formHook.form.getValues().shift !== 1
                          ? +formHook.form.getValues().shift - 1
                          : -1,
                      )
                    }
                  >
                    <Minus className="text-primary" />
                  </button>
                  <FormControl>
                    <CyberInput
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        let value = e.target.value;

                        if (/^0+\d+/.test(value)) {
                          value = String(+value);
                        }

                        if (/^\d*$/.test(value)) {
                          field.onChange(value ? +value : 0);
                        }

                        formHook.handleDebouncedActionSubmit();
                      }}
                      type="text"
                      placeholder="Enter shift..."
                    />
                  </FormControl>
                  <button
                    className="text-primary"
                    onClick={() =>
                      formHook.form.setValue(
                        'shift',
                        +formHook.form.getValues().shift !== -1
                          ? +formHook.form.getValues().shift + 1
                          : 1,
                      )
                    }
                  >
                    <Plus />
                  </button>
                </div>
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
                    placeholder="Caesar cipher will be using this alphabet"
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
