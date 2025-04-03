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
  if (!key.trim() || !alphabet.trim()) {
    throw new Error('Invalid input: key and alphabet must be non-empty.');
  }

  let result = '';
  const alphabetLength = alphabet.length;

  if (new Set(alphabet).size !== alphabetLength) {
    throw new Error('Invalid input: alphabet must contain only unique chars.');
  }

  if (![...key].every((char) => alphabet.includes(char.toLowerCase()))) {
    throw new Error('Invalid input: key must contain only characters from the alphabet.');
  }

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
