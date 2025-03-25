'use client';

import React, { useState } from 'react';
import { useCiphersStore } from '@/features/ciphers/model/provider';
import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { CIPHERS } from '@/shared/constants';

export const SelectCipher = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { selectCipher } = useCiphersStore((state) => state);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change cipher</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background border-primary">
        <DialogTitle>Select a cipher</DialogTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CIPHERS.map((cipher) => (
            <button
              key={cipher.id}
              onClick={() => {
                selectCipher(cipher);
                setIsDialogOpen(false);
              }}
              className="cursor-pointer"
            >
              {cipher.name}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
