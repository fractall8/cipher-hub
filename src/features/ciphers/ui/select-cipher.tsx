'use client';

import React, { useState } from 'react';
import { TCipher } from '@/features/ciphers/model/schema';
import { CaesarForm } from '@/features/ciphers/ui/caesar-form';
import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { CIPHERS } from '@/shared/constants';

export const SelectCipher = () => {
  const [selectedCipher, setSelectedCipher] = useState<TCipher>(CIPHERS[0]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  return (
    <div className="space-y-2 mt-4">
      <div className="flex gap-2 items-center">
        <p className="text-lg">
          Using <span className="capitalize font-bold">{selectedCipher.name}</span>
        </p>
      </div>
      <h3 className="text-xl font-semibold">Encode/Decode</h3>
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
                  setSelectedCipher(cipher);
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
      {selectedCipher.id == 'caesar' && <CaesarForm />}
    </div>
  );
};
