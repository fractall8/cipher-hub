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
}: {
  schema: ZodSchema;
  processFunction: (args: z.infer<typeof schema>) => string;
  defaultValues: DefaultValues<FieldValues>;
}) {
  const [result, setResult] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'encode' | 'decode'>('encode');

  type TFormState = z.infer<typeof schema>;

  const form = useForm<TFormState>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    (formData: TFormState) => setResult(processFunction(formData)),
    [processFunction],
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
