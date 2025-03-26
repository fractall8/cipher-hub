'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TVigenereFormState, VigenereFormSchema } from '@/features/ciphers/model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { CopyButton } from '@/shared/ui/copy-button';
import { CyberTextarea } from '@/features/ciphers/ui/cyber-textarea';
import { CyberButton } from '@/features/ciphers/ui/cyber-button';
import CyberInput from '@/features/ciphers/ui/cyber-input';
import { vigenere } from '@/features/ciphers/lib';

export const VigenereForm = () => {
  const [result, setResult] = useState<string>('');
  const form = useForm<TVigenereFormState>({
    resolver: zodResolver(VigenereFormSchema),
    defaultValues: {
      text: '',
      key: 'cipherhub',
      alphabet: 'abcdefghijklmnopqrstuvwxyz',
      action: 'encode',
    },
    mode: 'onChange',
  });

  function onSubmit(formData: TVigenereFormState) {
    setResult(vigenere(formData));
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
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <CyberInput type="text" placeholder="Enter key..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alphabet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alphabet</FormLabel>
                <FormControl>
                  <CyberInput placeholder="Caesar cipher will be using this alphabet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
