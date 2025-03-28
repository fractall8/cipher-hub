function encodeBase64(text: string) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';

  const bytes = new TextEncoder().encode(text);

  for (let i = 0; i < bytes.length; i += 3) {
    const chunk = (bytes[i] << 16) | ((bytes[i + 1] || 0) << 8) | (bytes[i + 2] || 0);

    result += chars[(chunk >> 18) & 63];
    result += chars[(chunk >> 12) & 63];
    result += i + 1 < bytes.length ? chars[(chunk >> 6) & 63] : '=';
    result += i + 2 < bytes.length ? chars[chunk & 63] : '=';
  }

  return result;
}

function decodeBase64(base64: string) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const result: number[] = [];
  let buffer = 0,
    bits = 0;

  for (const char of base64.replace(/=/g, '')) {
    buffer = (buffer << 6) | chars.indexOf(char);
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      result.push((buffer >> bits) & 255);
    }
  }

  return new TextDecoder().decode(new Uint8Array(result));
}

export function base64({ text, action }: { text: string; action: 'encode' | 'decode' }) {
  if (action === 'encode') {
    return encodeBase64(text);
  } else if (action === 'decode') {
    return decodeBase64(text);
  }
  return '';
}
