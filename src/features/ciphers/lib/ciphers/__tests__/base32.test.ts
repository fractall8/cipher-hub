import { describe, expect, it } from 'vitest';
import { base32 } from '../base32';

describe('Base32 Cipher', () => {
  it('should encode text correctly', () => {
    const testData = [
      { text: 'Hello!', action: 'encode', result: 'JBSWY3DPEE======' },
      { text: 'Hello world!', action: 'encode', result: 'JBSWY3DPEB3W64TMMQQQ====' },
      { text: 'Привіт!', action: 'encode', result: '2CP5DAGQXDILFUMW2GBCC===' },
      {
        text: 'The quick brown fox jumps over the lazy dog.',
        action: 'encode',
        result: 'KRUGKIDROVUWG2ZAMJZG653OEBTG66BANJ2W24DTEBXXMZLSEB2GQZJANRQXU6JAMRXWOLQ=',
      },
      {
        text: 'Relaxing in basins at the end of inlets terminates the endless tests from the box.',
        action: 'encode',
        result:
          'KJSWYYLYNFXGOIDJNYQGEYLTNFXHGIDBOQQHI2DFEBSW4ZBAN5TCA2LONRSXI4ZAORSXE3LJNZQXIZLTEB2GQZJAMVXGI3DFONZSA5DFON2HGIDGOJXW2IDUNBSSAYTPPAXA====',
      },
      {
        text: '',
        action: 'encode',
        result: '',
      },
    ];
    testData.forEach(({ text, action, result }) => {
      expect(base32({ text, action: action as 'encode' | 'decode' })).toBe(result);
    });
  });

  it('should decode text correctly', () => {
    const testData = [
      {
        text: 'KRUGKIDROVUWG2ZAMJZG653OEBTG66BANJ2W24DTEBXXMZLSEB2GQZJANRQXU6JAMRXWOLQ=',
        action: 'decode',
        result: 'The quick brown fox jumps over the lazy dog.',
      },
      {
        text: 'KJSWYYLYNFXGOIDJNYQGEYLTNFXHGIDBOQQHI2DFEBSW4ZBAN5TCA2LONRSXI4ZAORSXE3LJNZQXIZLTEB2GQZJAMVXGI3DFONZSA5DFON2HGIDGOJXW2IDUNBSSAYTPPAXA====',
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
      expect(base32({ text, action: action as 'encode' | 'decode' })).toBe(result);
    });
  });

  it('edge cases: should throw an error if invalid base32 provided for decoding', () => {
    const testData = [
      {
        text: 'JBSWY3DPEBLW64TMMQ',
        action: 'decode',
        errorMsg: 'Invalid input: invalid base32 length.',
      },
      {
        text: 'JBSWY3DPFQQHO33SNRSXG4JXG6XW64TMMQ===',
        action: 'decode',
        errorMsg: 'Invalid input: invalid base32 length.',
      },
      {
        text: 'JBSWY3D$%29PEBLW64TMMQ=',
        action: 'decode',
        errorMsg: 'Invalid input: invalid base32.',
      },
      {
        text: '1234',
        action: 'decode',
        errorMsg: 'Invalid input: invalid base32.',
      },
      {
        text: '++++',
        action: 'decode',
        errorMsg: 'Invalid input: invalid base32.',
      },
      {
        text: '234567AB',
        action: 'decode',
        errorMsg: 'Invalid input: decoded data is not valid UTF-8 text.',
      },
      { text: '    ', action: 'decode', errorMsg: 'Invalid input: invalid base32.' },
    ];

    testData.forEach(({ text, action, errorMsg }) => {
      expect(() => base32({ text, action: action as 'encode' | 'decode' })).toThrow(errorMsg);
    });
  });
});
