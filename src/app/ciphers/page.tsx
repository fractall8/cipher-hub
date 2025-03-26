'use client';

import { useCiphersStore } from '@/features/ciphers/model/provider';
import { TCipherIds } from '@/features/ciphers/model/schema';
import { CaesarForm } from '@/features/ciphers/ui/caesar-form';
import { SelectCipher } from '@/features/ciphers/ui/select-cipher';
import { VigenereForm } from '@/features/ciphers/ui/vigenere-form';
import { Shield, Terminal } from 'lucide-react';

export default function Page() {
  const { selectedCipher } = useCiphersStore((state) => state);

  function renderCipherForm(id: TCipherIds) {
    switch (id) {
      case 'caesar':
        return <CaesarForm />;
      case 'vigenere':
        return <VigenereForm />;
      default:
        return <div />;
    }
  }

  return (
    <div className="container">
      <div className="flex flex-col my-6 gap-2 items-center justify-center w-full">
        {selectedCipher ? (
          <>
            <h2 className="text-3xl font-bold text-primary">{selectedCipher.name}</h2>
            <p className="text-accent text-center max-w-3xl">{selectedCipher.about}</p>
          </>
        ) : (
          <h2 className="text-3xl font-bold text-primary">Select any cipher and try to use it!</h2>
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

          {selectedCipher && renderCipherForm(selectedCipher.id)}
        </div>
      </div>
    </div>
  );
}
