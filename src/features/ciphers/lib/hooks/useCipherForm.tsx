'use client';

import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z, ZodSchema } from 'zod';
import type { DefaultValues, FieldValues } from 'react-hook-form';
import { debounce } from '@/features/ciphers/lib/helpers';

export function useCipherForm({
  schema,
  processFunction,
  defaultValues,
  defaultResult,
}: {
  schema: ZodSchema;
  processFunction: (args: z.infer<typeof schema>) => string;
  defaultValues: DefaultValues<FieldValues>;
  defaultResult?: string;
}) {
  const [result, setResult] = useState<string>(defaultResult || '');
  const [activeTab, setActiveTab] = useState<'encode' | 'decode'>(defaultValues.action);

  type TFormState = z.infer<typeof schema>;

  const form = useForm<TFormState>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    (formData: TFormState) => {
      try {
        setResult(processFunction(formData));
      } catch (error) {
        if (error instanceof Error) {
          form.setError('text', { type: 'manual', message: error.message });
        }
      }
    },
    [processFunction, form],
  );

  const handleDebouncedActionSubmit = useMemo(
    () =>
      debounce(() => {
        form.handleSubmit(onSubmit)();
      }, 500),
    [form, onSubmit],
  );

  return {
    form,
    result,
    setResult,
    activeTab,
    setActiveTab,
    handleDebouncedActionSubmit,
    onSubmit,
  };
}
