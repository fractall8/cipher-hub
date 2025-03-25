import { Key, Keyboard } from 'lucide-react';

export const CIPHERS = [
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    icon: <Key className="w-6 h-6" />,
    description: 'Classic shift cipher',
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    icon: <Keyboard className="w-6 h-6" />,
    description: 'Polyalphabetic substitution',
  },
] as const;
