'use client';

import { Shield, Terminal } from 'lucide-react';
import { useCiphersStore } from '@/features/ciphers/model/provider';
import { CaesarForm, VigenereForm, BaconForm, Base64Form, Base32Form } from '@/features/ciphers';
import type { TShareContent, TCipherIds, ShareDataProp } from '@/features/ciphers/model/schema';
import { SelectCipher } from '@/features/ciphers';
import { CIPHERS } from '@/shared/constants';

export function CiphersPage<T extends TCipherIds>({ shareData }: { shareData?: ShareDataProp<T> }) {
  const { selectedCipher, selectCipher } = useCiphersStore((state) => state);

  if (shareData && shareData.cipherId && !selectedCipher) {
    const defaultCipher = CIPHERS.find(({ id }) => shareData.cipherId === id);
    if (defaultCipher) selectCipher(defaultCipher);
  }

  function renderCipherForm<T extends TCipherIds>(id: string, shareData?: ShareDataProp<T>) {
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
    <div className="page-shell">
      <div className="mb-8 flex w-full flex-col items-center justify-center gap-4 text-center">
        {selectedCipher ? (
          <>
            <h2 className="text-display text-primary-strong text-4xl md:text-5xl">
              {selectedCipher.name}
            </h2>
            <p className="text-foreground/80 max-w-2xl text-lg text-balance md:text-xl">
              {selectedCipher.about}
            </p>
          </>
        ) : (
          <h2 className="text-display text-primary-strong max-w-3xl text-4xl md:text-5xl">
            Select any cipher and try to use it!
          </h2>
        )}
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="cyber-border cyber-background neon-glow p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="text-primary-strong h-6 w-6 shrink-0" />
              <h2 className="text-xl font-semibold md:text-2xl">Current Cipher</h2>
            </div>
            <SelectCipher />
          </div>
          {selectedCipher ? (
            <div className="cyber-border cyber-background-raised space-y-4 p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="text-primary-strong shrink-0">{selectedCipher.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCipher.name}</h3>
                  <p className="text-foreground/70 text-sm">{selectedCipher.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="cyber-border cyber-background-raised flex min-h-[200px] flex-col items-center justify-center space-y-4 p-6 text-center">
              <Shield className="text-primary-strong/40 h-12 w-12" />
              <div>
                <p className="text-lg font-medium">No Cipher Selected</p>
                <p className="text-foreground/70 text-sm">
                  Click the settings icon to choose an encryption method
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="cyber-border cyber-background neon-glow p-6">
          <div className="mb-6 flex items-center gap-3">
            <Terminal className="text-primary-strong h-6 w-6 shrink-0" />
            <h2 className="text-xl font-semibold md:text-2xl">Operation Console</h2>
          </div>

          <div className="flex flex-col gap-2">
            {selectedCipher && renderCipherForm(selectedCipher.id, shareData)}
          </div>
        </div>
      </div>
    </div>
  );
}
