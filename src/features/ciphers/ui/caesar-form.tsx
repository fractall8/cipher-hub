'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CaesarFormSchema, TCaesarFromState } from '@/features/ciphers/model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { CopyButton } from '@/shared/ui/copy-button';
import { CyberTextarea } from '@/features/ciphers/ui/cyber-textarea';
import { CyberButton } from '@/features/ciphers/ui/cyber-button';
import CyberInput from '@/features/ciphers/ui/cyber-input';

export const CaesarForm = () => {
  const [result, setResult] = useState<string>('');
  const form = useForm<TCaesarFromState>({
    resolver: zodResolver(CaesarFormSchema),
    defaultValues: {
      text: '',
      shift: '7',
      alphabet: 'abcdefghijklmnopqrstuvwxyz',
      action: 'encode',
    },
    mode: 'onChange',
  });

  function onSubmit(formData: TCaesarFromState) {
    console.log(formData);
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
            name="shift"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift</FormLabel>
                <FormControl>
                  <CyberInput type="number" placeholder="Enter shift..." {...field} />
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
            <CyberButton>Swap</CyberButton>
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
