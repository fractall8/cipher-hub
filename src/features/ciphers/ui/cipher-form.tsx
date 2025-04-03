'use client';

import React, { JSX } from 'react';
import { ArrowDownFromLine, Lock, Unlock } from 'lucide-react';
import { useCipherForm } from '@/features/ciphers/lib/hooks/useCipherForm';
import { CyberTextarea } from '@/features/ciphers/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { CopyButton } from '@/shared/ui/copy-button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ShareButton } from '@/features/share/ui/share-button';
import { useCiphersStore } from '../model/provider';

export const CipherForm = ({
  formHook,
  renderFields,
}: {
  formHook: ReturnType<typeof useCipherForm>;
  renderFields: JSX.Element;
}) => {
  const {
    form,
    result,
    setResult,
    activeTab,
    setActiveTab,
    handleDebouncedActionSubmit,
    onSubmit,
  } = formHook;

  const { selectedCipher } = useCiphersStore((state) => state);

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
          {renderFields}
        </form>
      </Form>
      <div>
        <div className="flex text-foreground/80 mb-4 gap-2">
          <ArrowDownFromLine />
          <span>{activeTab === 'encode' ? 'Encoded' : 'Decoded'}</span>
        </div>
        <div className="relative">
          <CyberTextarea
            value={result}
            className="resize-none min-h-32 p-2"
            readOnly
            placeholder="Your result will appear here..."
          />
          <CopyButton className="absolute top-1 right-1" value={result} />
        </div>
      </div>
      {selectedCipher && (
        <ShareButton cipherId={selectedCipher.id} data={form.getValues()} result={result} />
      )}
    </div>
  );
};
