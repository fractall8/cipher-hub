'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CaesarFormSchema, TCaesarFromState } from '@/features/ciphers/model/schema';
import { Button } from '@/shared/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { CopyButton } from '@/shared/ui/copy-button';

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
                  <Input placeholder="Enter your text here..." {...field} />
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
                  <Input type="number" placeholder="Enter shift..." {...field} />
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
                  <Input placeholder="Caesar cipher will be using this alphabet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleActionSubmit('encode')}
              type="submit"
              name="action"
              value="encode"
            >
              Encode
            </Button>
            <Button>Swap</Button>
            <Button
              onClick={() => handleActionSubmit('decode')}
              type="submit"
              name="action"
              value="decode"
            >
              Decode
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <Textarea
          value={result}
          className="resize-none min-h-32"
          disabled
          placeholder="Your result will apear here..."
        />
        <CopyButton className="absolute top-1 right-1" value={result} />
      </div>
    </div>
  );
};
