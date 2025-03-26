export function caesar({
  text,
  shift,
  alphabet,
  action,
}: {
  text: string;
  shift: number;
  alphabet: string;
  action: 'encode' | 'decode';
}) {
  if (typeof text !== 'string' || typeof alphabet !== 'string' || typeof shift !== 'number') {
    throw new Error('Invalid input: text and alphabet must be strings, shift must be a number.');
  }
  if (!text.trim() || !alphabet.trim()) {
    throw new Error('Invalid input: text and alphabet must be non-empty.');
  }
  if (!Number.isInteger(shift) || shift <= 0) {
    throw new Error('Invalid input: shift must be a positive integer.');
  }

  let result = '';
  const alphabetLength = alphabet.length;

  for (const char of text) {
    if (!alphabet.includes(char.toLowerCase())) {
      result += char;
      continue;
    }

    const isUpperCase = char === char.toUpperCase();
    const charIndex = alphabet.indexOf(char.toLowerCase());

    const newIndex =
      action == 'encode'
        ? (charIndex + shift) % alphabetLength
        : (charIndex - shift + alphabetLength) % alphabetLength;

    result += isUpperCase ? alphabet[newIndex].toUpperCase() : alphabet[newIndex];
  }

  return result;
}

export function vigenere({
  text,
  key,
  alphabet,
  action,
}: {
  text: string;
  key: string;
  alphabet: string;
  action: 'encode' | 'decode';
}) {
  if (typeof text !== 'string' || typeof key !== 'string' || typeof alphabet !== 'string') {
    throw new Error('Invalid input: text, key, and alphabet must be strings.');
  }
  if (!text.trim() || !key.trim() || !alphabet.trim()) {
    throw new Error('Invalid input: text, key, and alphabet must be non-empty.');
  }
  if (![...key].every((char) => alphabet.includes(char.toLowerCase()))) {
    throw new Error('Invalid input: key must contain only characters from the alphabet.');
  }

  let result = '';
  const alphabetLength = alphabet.length;
  let keyIndex = 0;

  for (const char of text) {
    if (!alphabet.includes(char.toLowerCase())) {
      result += char;
      continue;
    }

    const isUpperCase = char === char.toUpperCase();
    const charIndex = alphabet.indexOf(char.toLowerCase());
    const shift = alphabet.indexOf(key[keyIndex].toLowerCase());

    const newIndex =
      action == 'encode'
        ? (charIndex + shift) % alphabetLength
        : (charIndex - shift + alphabetLength) % alphabetLength;

    result += isUpperCase ? alphabet[newIndex].toUpperCase() : alphabet[newIndex];
    keyIndex = (keyIndex + 1) % key.length;
  }

  return result;
}
