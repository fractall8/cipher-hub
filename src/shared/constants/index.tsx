import { Key, Keyboard, FileText, Binary } from 'lucide-react';

export const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

export const CIPHERS = [
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    icon: <Key className="w-6 h-6" />,
    description: 'Classic shift cipher',
    about:
      'Shifts each letter in the plaintext by a fixed number of positions in the alphabet. Named after Julius Caesar, who used it for secret correspondence.',
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    icon: <Keyboard className="w-6 h-6" />,
    description: 'Polyalphabetic substitution',
    about:
      'Uses a keyword to shift each letter by different amounts. Created by Blaise de Vigenère in the 16th century.',
  },
  {
    id: 'bacon',
    name: 'Bacon Cipher',
    icon: <FileText className="w-6 h-6" />,
    description: '2-letter substitution alphabet',
    about:
      'The Bacon cipher, invented by Sir Francis Bacon in the 17th century, is a steganographic method where each letter is encoded using a five-letter combination of "A" and "B" for covert communication.',
  },
  {
    id: 'base64',
    name: 'Base64',
    icon: <Binary className="w-6 h-6" />,
    description: 'Binary-to-text encoding',
    about:
      'Encodes binary data into ASCII characters. Commonly used for sending binary data through text-based systems.',
  },
  {
    id: 'base32',
    name: 'Base32',
    icon: <Binary className="w-6 h-6" />,
    description: 'Base32 encoding',
    about:
      'Encodes binary data into a set of 32 printable characters. Typically used in applications where case insensitivity is important, such as QR codes or authentication systems.',
  },
] as const;
