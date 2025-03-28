function encodeBase32(text: string) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let result = '';
  let buffer = 0,
    bits = 0;

  const bytes = new TextEncoder().encode(text);

  for (const byte of bytes) {
    buffer = (buffer << 8) | byte;
    bits += 8;

    while (bits >= 5) {
      bits -= 5;
      result += chars[(buffer >> bits) & 31];
    }
  }

  if (bits > 0) {
    result += chars[(buffer << (5 - bits)) & 31];
  }

  while (result.length % 8 !== 0) {
    result += '=';
  }

  return result;
}

function decodeBase32(text: string) {
  if (!text) {
    return '';
  }

  const isValidBase32 = (str: string) => /^[A-Z2-7]+=*$/.test(str);

  if (!isValidBase32(text)) {
    throw new Error('Invalid input: invalid base32.');
  }

  if (text.length % 8 !== 0) {
    throw new Error('Invalid input: invalid base32 length.');
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const result = [];
  let buffer = 0,
    bits = 0;

  for (const char of text.replace(/=/g, '')) {
    buffer = (buffer << 5) | chars.indexOf(char);
    bits += 5;

    if (bits >= 8) {
      bits -= 8;
      result.push((buffer >> bits) & 255);
    }
  }

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(result));
  } catch {
    throw new Error('Invalid input: decoded data is not valid UTF-8 text.');
  }
}

export function base32({ text, action }: { text: string; action: 'encode' | 'decode' }) {
  if (action === 'encode') {
    return encodeBase32(text);
  } else if (action === 'decode') {
    return decodeBase32(text);
  }

  return '';
}
