'use client';

import { useCiphersStore } from '@/features/ciphers/model/provider';
import { TCipherIds } from '@/features/ciphers/model/schema';
import { CaesarForm } from '@/features/ciphers/ui/caesar-form';
import { SelectCipher } from '@/features/ciphers/ui/select-cipher';

export default function Page() {
  const { selectedCipher } = useCiphersStore((state) => state);

  function renderCipherForm(id: TCipherIds) {
    switch (id) {
      case 'caesar':
        return <CaesarForm />;
      case 'vigenere':
        return <div>Vigenere Form</div>;
      default:
        return <div />;
    }
  }

  return (
    <div className="container">
      <div className="space-y-2 mt-4">
        <div className="flex gap-2 items-center">
          <p className="text-lg">
            Using <span className="capitalize font-bold">{selectedCipher.name}</span>
          </p>
          <SelectCipher />
        </div>
        <h3 className="text-xl font-semibold">Encode/Decode</h3>
      </div>
      {renderCipherForm(selectedCipher.id)}
    </div>
  );
}
