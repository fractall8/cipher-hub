'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Unlock } from 'lucide-react';
import { CyberTextarea } from '@/features/ciphers/ui/cyber-textarea';
import { CyberInput } from '@/features/ciphers/ui/cyber-input';
import { vigenere } from '@/features/ciphers/lib';
import { debounce } from '@/features/ciphers/lib/helpers';
import { TVigenereFormState, VigenereFormSchema } from '@/features/ciphers/model/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { CopyButton } from '@/shared/ui/copy-button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export const VigenereForm = () => {
  const [result, setResult] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'encode' | 'decode'>('encode');

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

  const handleDebouncedActionSubmit = useMemo(
    () =>
      debounce(() => {
        form.handleSubmit(onSubmit)();
      }, 500),
    [form],
  );

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          const text = form.getValues().text;
          const actionResult = result;

          form.setValue('text', actionResult);
          setResult(text);

          setActiveTab(value as 'encode' | 'decode');
          form.setValue('action', value as 'encode' | 'decode');
        }}
        className="space-y-6"
      >
        <TabsList className="cyber-border w-full bg-background/40">
          <TabsTrigger
            value="encode"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Lock className="w-4 h-4 mr-2" />
            Encode
          </TabsTrigger>
          <TabsTrigger
            value="decode"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Unlock className="w-4 h-4 mr-2" />
            Decode
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input Text</FormLabel>
                <FormControl>
                  <CyberTextarea
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleDebouncedActionSubmit();
                    }}
                    placeholder="Enter your text here..."
                  />
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
                  <CyberInput
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleDebouncedActionSubmit();
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
            control={form.control}
            name="alphabet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alphabet</FormLabel>
                <FormControl>
                  <CyberInput
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleDebouncedActionSubmit();
                    }}
                    placeholder="Vigenere cipher will be using this alphabet"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
