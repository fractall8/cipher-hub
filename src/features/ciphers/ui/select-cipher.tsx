'use client';

import React from 'react';
import { useCiphersStore } from '@/features/ciphers/model/provider';
import { Dialog, DialogHeader } from '@/shared/ui/dialog';
import { DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { CIPHERS } from '@/shared/constants';
import { Settings } from 'lucide-react';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { useDialog } from '@/shared/lib/hooks';

export const SelectCipher = () => {
  const { isOpen, setIsOpen, close } = useDialog();
  const { selectCipher } = useCiphersStore((state) => state);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="cyber-button cyber-sm cursor-pointer p-2"
          aria-label="Choose encryption method"
        >
          <Settings className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="cyber-border cyber-background rounded-none border-transparent sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-primary-strong pt-2 text-xl font-bold md:text-2xl">
            Choose Encryption Method
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[25rem] w-full pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CIPHERS.map((cipher) => (
              <button
                key={cipher.id}
                onClick={() => {
                  selectCipher(cipher);
                  close();
                }}
                type="button"
                className="cyber-border cyber-background cyber-interactive p-4 text-left"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="text-primary-strong shrink-0">{cipher.icon}</div>
                  <h3 className="font-semibold">{cipher.name}</h3>
                </div>
                <p className="text-foreground/70 text-sm">{cipher.description}</p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
