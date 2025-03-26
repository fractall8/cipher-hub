// Func generate unique code for each letter but in original bacon cipher
// letters i and j, u and v had the same representation.

export function bacon({
  text,
  letter1,
  letter2,
  action,
}: {
  text: string;
  letter1: string;
  letter2: string;
  action: 'encode' | 'decode';
}) {
  if (typeof text !== 'string' || typeof letter1 !== 'string' || typeof letter2 !== 'string') {
    throw new Error('Invalid input: text and letters must be strings.');
  }
  if (letter1.length !== 1 || letter2.length !== 1) {
    throw new Error('Invalid input: letters must be 1 char long.');
  }

  let result = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  if (action === 'encode') {
    for (const char of text) {
      if (!alphabet.includes(char.toLowerCase())) {
        continue;
      }

      const charIndex = alphabet.indexOf(char.toLowerCase());
      const binary = charIndex.toString(2).padStart(5, '0');

      let fragment = '';
      for (const i of binary) {
        fragment += i == '0' ? letter1 : letter2;
      }

      result += fragment + ' ';
    }
  } else if (action === 'decode') {
    const fragments = text.split(' ').filter((fragment) => fragment.length === 5);

    for (const fragment of fragments) {
      let binary = '';
      for (const char of fragment) {
        if (char === letter1) {
          binary += '0';
        } else if (char === letter2) {
          binary += '1';
        }
      }

      const charIndex = parseInt(binary, 2);

      result += alphabet[charIndex];
    }
  }
  return result.trim();
}
