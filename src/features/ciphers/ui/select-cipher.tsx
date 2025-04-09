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
        <button className="cyber-button p-2 hover:bg-primary/90 cursor-pointer">
          <Settings className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background border-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl pt-2 font-bold text-primary">
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
                className="cyber-border cyber-background p-4 hover:cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-primary">{cipher.icon}</div>
                  <h3 className="font-semibold">{cipher.name}</h3>
                </div>
                <p className="text-sm text-foreground/70">{cipher.description}</p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
