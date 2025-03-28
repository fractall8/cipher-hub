import { describe, expect, it } from 'vitest';
import { base64 } from '../base64';

describe('Base64 Cipher', () => {
  it('should encode text correctly', () => {
    const testData = [
      { text: 'Hello!', action: 'encode', result: 'SGVsbG8h' },
      { text: 'Hello world!', action: 'encode', result: 'SGVsbG8gd29ybGQh' },
      { text: 'Привіт!', action: 'encode', result: '0J/RgNC40LLRltGCIQ==' },
      {
        text: 'The quick brown fox jumps over the lazy dog.',
        action: 'encode',
        result: 'VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZy4=',
      },
      {
        text: 'Relaxing in basins at the end of inlets terminates the endless tests from the box.',
        action: 'encode',
        result:
          'UmVsYXhpbmcgaW4gYmFzaW5zIGF0IHRoZSBlbmQgb2YgaW5sZXRzIHRlcm1pbmF0ZXMgdGhlIGVuZGxlc3MgdGVzdHMgZnJvbSB0aGUgYm94Lg==',
      },
      {
        text: '',
        action: 'encode',
        result: '',
      },
    ];
    testData.forEach(({ text, action, result }) => {
      expect(base64({ text, action: action as 'encode' | 'decode' })).toBe(result);
    });
  });

  it('should decode text correctly', () => {
    const testData = [
      {
        text: 'VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZy4=',
        action: 'decode',
        result: 'The quick brown fox jumps over the lazy dog.',
      },
      {
        text: 'UmVsYXhpbmcgaW4gYmFzaW5zIGF0IHRoZSBlbmQgb2YgaW5sZXRzIHRlcm1pbmF0ZXMgdGhlIGVuZGxlc3MgdGVzdHMgZnJvbSB0aGUgYm94Lg==',
        action: 'decode',
        result:
          'Relaxing in basins at the end of inlets terminates the endless tests from the box.',
      },
      {
        text: '',
        action: 'decode',
        result: '',
      },
    ];

    testData.forEach(({ text, action, result }) => {
      expect(base64({ text, action: action as 'encode' | 'decode' })).toBe(result);
    });
  });

  it('edge cases: should throw an error if invalid base64 provided for decoding', () => {
    const testData = [
      {
        text: 'SGVsbG8gd29ybGQ',
        action: 'decode',
        errorMsg: 'Invalid input: invalid base64 length.',
      },
      { text: 'SGVsbG8gd29ybGQ===', action: 'decode', errorMsg: 'Invalid input: invalid base64.' },
      { text: 'SGVsbG8$%29ybGQ=', action: 'decode', errorMsg: 'Invalid input: invalid base64.' },
      {
        text: '1234',
        action: 'decode',
        errorMsg: 'Invalid input: decoded data is not valid UTF-8 text',
      },
      {
        text: '++++',
        action: 'decode',
        errorMsg: 'Invalid input: decoded data is not valid UTF-8 text.',
      },
      { text: '    ', action: 'decode', errorMsg: 'Invalid input: invalid base64.' },
    ];

    testData.forEach(({ text, action, errorMsg }) => {
      expect(() => base64({ text, action: action as 'encode' | 'decode' })).toThrow(errorMsg);
    });
  });
});
