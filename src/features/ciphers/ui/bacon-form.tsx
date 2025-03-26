'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BaconFormScheme, TBaconFormState } from '@/features/ciphers/model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { CopyButton } from '@/shared/ui/copy-button';
import { CyberTextarea } from '@/features/ciphers/ui/cyber-textarea';
import { CyberButton } from '@/features/ciphers/ui/cyber-button';
import CyberInput from '@/features/ciphers/ui/cyber-input';
import { bacon } from '@/features/ciphers/lib';

export const BaconForm = () => {
  const [result, setResult] = useState<string>('');
  const form = useForm<TBaconFormState>({
    resolver: zodResolver(BaconFormScheme),
    defaultValues: {
      text: '',
      letter1: 'a',
      letter2: 'b',
      action: 'encode',
    },
    mode: 'onChange',
  });

  function onSubmit(formData: TBaconFormState) {
    setResult(bacon(formData));
  }

  function handleActionSubmit(actionType: 'encode' | 'decode') {
    form.setValue('action', actionType);
    form.handleSubmit(onSubmit);
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input Text</FormLabel>
                <FormControl>
                  <CyberTextarea placeholder="Enter your text here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center gap-2">
            <FormField
              control={form.control}
              name="letter1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Letter 1</FormLabel>
                  <FormControl>
                    <CyberInput placeholder="letter 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="letter2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Letter 2</FormLabel>
                  <FormControl>
                    <CyberInput placeholder="letter 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-center items-center gap-2">
            <CyberButton
              onClick={() => handleActionSubmit('encode')}
              type="submit"
              name="action"
              value="encode"
            >
              Encode
            </CyberButton>
            <CyberButton
              onClick={() => {
                const text = form.getValues('text');
                const actionResult = result;
                setResult(text);
                form.setValue('text', actionResult);
              }}
            >
              Swap
            </CyberButton>
            <CyberButton
              onClick={() => handleActionSubmit('decode')}
              type="submit"
              name="action"
              value="decode"
            >
              Decode
            </CyberButton>
          </div>
        </form>
      </Form>
      <div className="relative">
        <CyberTextarea
          value={result}
          className="resize-none min-h-32"
          readOnly
          placeholder="Your result will appear here..."
        />
        <CopyButton className="absolute top-1 right-1" value={result} />
      </div>
    </div>
  );
};
