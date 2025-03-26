import { Key, Keyboard, FileText } from 'lucide-react';

export const CIPHERS = [
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    icon: <Key className="w-6 h-6" />,
    description: 'Classic shift cipher',
    about:
      'Caesar cipher is one of the oldest encryption techniques. It replaces each letter with another letter a fixed number of positions away in the alphabet. Despite its simplicity, it was historically used in military communications.',
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    icon: <Keyboard className="w-6 h-6" />,
    description: 'Polyalphabetic substitution',
    about:
      'Vigenère cipher uses a repeating keyword to apply multiple Caesar shifts, making it harder to break. Each letter is shifted by a different amount based on the keyword, reducing patterns in the encrypted text.',
  },
  {
    id: 'bacon',
    name: 'Bacon Cipher',
    icon: <FileText className="w-6 h-6" />,
    description: '2-letter substitution alphabet',
    about:
      'Bacon cipher is a method of steganography where each letter of the alphabet is replaced by a group of five letters, typically "A" and "B". The cipher allows hiding messages in plain sight by using a simple two-letter code. It was invented by Sir Francis Bacon in the 17th century, primarily for covert communication.',
  },
] as const;
