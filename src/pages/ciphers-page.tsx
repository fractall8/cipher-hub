'use client';

import { Shield, Terminal } from 'lucide-react';
import { useCiphersStore } from '@/features/ciphers/model/provider';
import { CaesarForm, VigenereForm, BaconForm, Base64Form, Base32Form } from '@/features/ciphers';
import type { TShareContent, TCipherIds } from '@/features/ciphers/model/schema';
import { SelectCipher } from '@/features/ciphers';
import { CIPHERS } from '@/shared/constants';

export function CiphersPage<T extends TCipherIds>({
  shareData,
}: {
  shareData?: {
    cipherId: T;
    content: TShareContent<T>;
    result?: string;
  };
}) {
  const { selectedCipher, selectCipher } = useCiphersStore((state) => state);

  if (shareData && shareData.cipherId && !selectedCipher) {
    const defaultCipher = CIPHERS.find(({ id }) => shareData.cipherId === id);
    if (defaultCipher) selectCipher(defaultCipher);
  }

  function renderCipherForm<T extends TCipherIds>(
    id: string,
    shareData?: {
      cipherId: T;
      content: TShareContent<T>;
      result?: string;
    },
  ) {
    switch (id) {
      case 'caesar':
        return shareData?.cipherId === 'caesar' ? (
          <CaesarForm
            shareValues={shareData?.content as TShareContent<'caesar'>}
            result={shareData?.result}
          />
        ) : (
          <CaesarForm />
        );
      case 'vigenere':
        return shareData?.cipherId === 'vigenere' ? (
          <VigenereForm
            shareValues={shareData?.content as TShareContent<'vigenere'>}
            result={shareData?.result}
          />
        ) : (
          <VigenereForm />
        );
      case 'bacon':
        return shareData?.cipherId === 'bacon' ? (
          <BaconForm
            shareValues={shareData?.content as TShareContent<'bacon'>}
            result={shareData?.result}
          />
        ) : (
          <BaconForm />
        );
      case 'base64':
        return shareData?.cipherId === 'base64' ? (
          <Base64Form
            shareValues={shareData?.content as TShareContent<'base64'>}
            result={shareData?.result}
          />
        ) : (
          <Base64Form />
        );
      case 'base32':
        return shareData?.cipherId === 'base32' ? (
          <Base32Form
            shareValues={shareData?.content as TShareContent<'base32'>}
            result={shareData?.result}
          />
        ) : (
          <Base32Form />
        );
      default:
        return <div />;
    }
  }

  return (
    <div className="container">
      <div className="flex flex-col mb-6 gap-4 items-center justify-center w-full">
        {selectedCipher ? (
          <>
            <h2 className="text-5xl font-bold tracking-tighter text-primary">
              {selectedCipher.name}
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl text-center">
              {selectedCipher.about}
            </p>
          </>
        ) : (
          <h2 className="text-5xl font-bold tracking-tighter text-primary">
            Select any cipher and try to use it!
          </h2>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="cyber-border cyber-background neon-glow bg-secondary/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Current Cipher</h2>
            </div>
            <SelectCipher />
          </div>
          {selectedCipher ? (
            <div className="cyber-border cyber-background p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-primary">{selectedCipher.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCipher.name}</h3>
                  <p className="text-sm text-foreground/70">{selectedCipher.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="cyber-border cyber-background p-6 flex flex-col items-center justify-center min-h-[200px] text-center space-y-4">
              <Shield className="w-12 h-12 text-primary/50" />
              <div>
                <p className="text-lg font-medium">No Cipher Selected</p>
                <p className="text-sm text-foreground/70">
                  Click the settings icon to choose an encryption method
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="cyber-border cyber-background neon-glow bg-secondary/50 p-6">
          <div className="flex items-center gap-4 mb-6">
            <Terminal className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Operation Console</h2>
          </div>

          <div className="flex flex-col gap-2">
            {selectedCipher && renderCipherForm(selectedCipher.id, shareData)}
          </div>
        </div>
      </div>
    </div>
  );
}
