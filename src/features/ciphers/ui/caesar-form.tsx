'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowDownFromLine, Lock, Minus, Plus, Unlock } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaesarFormSchema, TCaesarFromState } from '@/features/ciphers/model/schema';
import { CyberTextarea } from '@/features/ciphers/ui/cyber-textarea';
import { CyberInput } from '@/features/ciphers/ui/cyber-input';
import { caesar } from '@/features/ciphers/lib';
import { debounce } from '@/features/ciphers/lib/helpers';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { CopyButton } from '@/shared/ui/copy-button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export const CaesarForm = () => {
  const [result, setResult] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'encode' | 'decode'>('encode');

  const form = useForm<TCaesarFromState>({
    resolver: zodResolver(CaesarFormSchema),
    defaultValues: {
      text: '',
      shift: 7,
      alphabet: 'abcdefghijklmnopqrstuvwxyz',
      action: 'encode',
    },
    mode: 'onChange',
  });

  function onSubmit(formData: TCaesarFromState) {
    setResult(caesar(formData));
  }
  const handleDebouncedActionSubmit = useMemo(
    () =>
      debounce(() => {
        form.setValue('shift', Number(form.getValues().shift));
        form.handleSubmit(onSubmit)();
      }, 500),
    [form],
  );

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input Text</FormLabel>
                <FormControl>
                  <CyberTextarea
                    {...field}
                    value={field.value || ''}
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
            name="shift"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift</FormLabel>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      form.setValue(
                        'shift',
                        +form.getValues().shift !== 1 ? +form.getValues().shift - 1 : -1,
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

                        handleDebouncedActionSubmit();
                      }}
                      type="text"
                      placeholder="Enter shift..."
                    />
                  </FormControl>
                  <button
                    className="text-primary"
                    onClick={() =>
                      form.setValue(
                        'shift',
                        +form.getValues().shift !== -1 ? +form.getValues().shift + 1 : 1,
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
                    placeholder="Caesar cipher will be using this alphabet"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div>
        <div className="flex text-foreground/80 mb-4 gap-2">
          <ArrowDownFromLine />
          <span>{activeTab === 'encode' ? 'Encoded' : 'Decoded'}</span>
        </div>
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
