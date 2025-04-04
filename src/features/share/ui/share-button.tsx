'use client';

import { CyberButton } from '@/features/ciphers/ui';
import { Share2 } from 'lucide-react';
import React, { FormEvent, useEffect, useState } from 'react';
import { createShareRecord } from '@/features/share/api';
import { TCipherIds, ShareDataProp } from '@/features/ciphers/model/schema';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/shared/ui/dialog';
import { CLIENT_URL } from '@/shared/constants';
import { CopyButton } from '@/shared/ui/copy-button';

export const ShareButton = <T extends TCipherIds>({
  shareData,
  ...props
}: {
  shareData: NonNullable<ShareDataProp<T>>;
  props?: React.ComponentProps<'button'>;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shareRecordId, setShareRecordId] = useState<string | undefined>();

  // if share data changed generate new share link
  useEffect(() => {
    setShareRecordId(undefined);
  }, [shareData]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (shareRecordId) return;

    setIsLoading(true);
    const sharedId = await createShareRecord({ data: shareData });

    if (sharedId) {
      setShareRecordId(sharedId);
    }

    setIsLoading(false);
  }
  return (
    <form onSubmit={onSubmit}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[37.5rem] max-sm:w-full bg-background border-primary">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              Here your's share link:
            </DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex items-center gap-2">
              {shareRecordId ? (
                <>
                  <a
                    className="hover:underline break-all text-wrap"
                    href={`${CLIENT_URL}/ciphers/share/${shareRecordId}`}
                    target="_blank"
                  >{`${CLIENT_URL}/ciphers/share/${shareRecordId}`}</a>
                  <CopyButton value={`${CLIENT_URL}/ciphers/share/${shareRecordId}`} />
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
