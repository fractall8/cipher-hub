'use client';

import { CyberButton, CyberInput } from '@/features/ciphers/ui';
import { Share2 } from 'lucide-react';
import React, { FormEvent, useState } from 'react';
import { createShareRecord } from '@/features/share/api';
import { TShareContent, TCipherIds } from '@/features/ciphers/model/schema';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/shared/ui/dialog';
import { CLIENT_URL } from '@/shared/constants';
import { CopyButton } from '@/shared/ui/copy-button';

export const ShareButton = <T extends TCipherIds>({
  cipherId,
  data,
  result,
  ...props
}: {
  cipherId: T;
  data: TShareContent<T>;
  result?: string;
  props?: React.ComponentProps<'button'>;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shareRecordId, setShareRecordId] = useState<string | undefined>();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    const shareData = { cipherId, content: data, result: result };
    const sharedId = await createShareRecord({ data: shareData });

    if (sharedId) {
      setShareRecordId(sharedId);
    }

    setIsLoading(false);
  }
  return (
    <form onSubmit={onSubmit}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-background border-primary">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              Here your's share link:
            </DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="relative">
              {shareRecordId ? (
                <>
                  <CyberInput readOnly value={`${CLIENT_URL}/ciphers/share/${shareRecordId}`} />
                  <CopyButton
                    className="absolute top-1 right-0"
                    value={`${CLIENT_URL}/ciphers/share/${shareRecordId}`}
                  />
                </>
              ) : (
                <p className="text-red-400">
                  Oops! Failed to generate share link! Try again later.
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <CyberButton
        onClick={() => {
          setIsDialogOpen(true);
        }}
        type="submit"
        className="flex gap-2 items-center self-center"
        {...props}
      >
        <Share2 className="w-6 h-6" />
        <span>Share</span>
      </CyberButton>
    </form>
  );
};
