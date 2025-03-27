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
  if (!alphabet.trim()) {
    throw new Error('Invalid input: alphabet must be non-empty.');
  }

  let result = '';
  const alphabetLength = alphabet.length;

  if (new Set(alphabet).size !== alphabetLength) {
    throw new Error('Invalid input: alphabet must contain only unique chars.');
  }
  if (!Number.isInteger(shift)) {
    shift = Math.round(shift);
  }

  for (const char of text) {
    if (!alphabet.includes(char.toLowerCase())) {
      result += char;
      continue;
    }

    const isUpperCase = char === char.toUpperCase();
    const charIndex = alphabet.indexOf(char.toLowerCase());

    const newIndex =
      action == 'encode'
        ? (charIndex + shift + alphabetLength) % alphabetLength
        : (charIndex - shift + alphabetLength) % alphabetLength;

    result += isUpperCase ? alphabet[newIndex].toUpperCase() : alphabet[newIndex];
  }

  return result;
}
