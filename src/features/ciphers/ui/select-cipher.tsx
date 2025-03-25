'use client';

import React, { useState } from 'react';
import { useCiphersStore } from '@/features/ciphers/model/provider';
import { Dialog, DialogHeader } from '@/shared/ui/dialog';
import { DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { CIPHERS } from '@/shared/constants';
import { Settings } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export const SelectCipher = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { selectCipher } = useCiphersStore((state) => state);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="cyber-button p-2 hover:bg-primary/90 cursor-pointer">
          <Settings className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background border-primary">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Choose Encryption Method
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CIPHERS.map((cipher) => (
              <button
                key={cipher.id}
                onClick={() => {
                  selectCipher(cipher);
                  setIsDialogOpen(false);
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
