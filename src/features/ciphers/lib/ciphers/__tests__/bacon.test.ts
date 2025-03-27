import { describe, it, expect } from 'vitest';
import { bacon } from '../bacon';

describe('Bacon Cipher', () => {
  it('should encode text correctly', () => {
    const testData = [
      {
        text: 'hello3',
        letter1: 'a',
        letter2: 'b',
        action: 'encode',
        result: 'aabbb aabaa ababb ababb abbba',
      },
      {
        text: 'The quick brown fox jumps over the lazy dog.',
        letter1: 'a',
        letter2: 'b',
        action: 'encode',
        result:
          'baabb aabbb aabaa baaaa babaa abaaa aaaba ababa aaaab baaab abbba babba abbab aabab abbba babbb abaab babaa abbaa abbbb baaba abbba babab aabaa baaab baabb aabbb aabaa ababb aaaaa bbaab bbaaa aaabb abbba aabba',
      },
    ];
    testData.forEach(({ result, action, ...baconData }) => {
      expect(bacon({ ...baconData, action: action as 'encode' | 'decode' })).toBe(result);
    });
  });

  it('should decode text correctly', () => {
    const testData = [
      {
        text: 'aabbb aabaa ababb ababb abbba',
        letter1: 'a',
        letter2: 'b',
        action: 'decode',
        result: 'hello',
      },
      {
        text: 'baabb aabbb aabaa baaaa babaa abaaa aaaba ababa aaaab baaab abbba babba abbab aabab abbba babbb abaab babaa abbaa abbbb baaba abbba babab aabaa baaab baabb aabbb aabaa ababb aaaaa bbaab bbaaa aaabb abbba aabba',
        letter1: 'a',
        letter2: 'b',
        action: 'decode',
        result: 'thequickbrownfoxjumpsoverthelazydog',
      },
      {
        text: 'aabbb aabaa ababa ababa abbab',
        letter1: 'x',
        letter2: 'b',
        action: 'decode',
        result: '',
      },
    ];

    testData.forEach(({ result, action, ...baconData }) => {
      expect(bacon({ ...baconData, action: action as 'encode' | 'decode' })).toBe(result);
    });
  });

  it('edge cases: should throw an error if letter1 equals letter2', () => {
    expect(() => bacon({ text: 'hello!', letter1: 'a', letter2: 'a', action: 'encode' })).toThrow(
      'Invalid input: letters must be different from each other.',
    );
  });

  // test data for edge cases

  const testData = [
    {
      text: '',
      letter1: 'a',
      letter2: 'b',
      action: 'encode',
      result: '',
      description: 'Empty string should return an empty string',
    },
    {
      text: '',
      letter1: 'a',
      letter2: 'b',
      action: 'decode',
      result: '',
      description: 'Decoding an empty string should return an empty string',
    },
    {
      text: 'aaabaabaaa abbbb aabbb aabaabaaabaabbb babaa aaaab aabb',
      letter1: 'a',
      letter2: 'b',
      action: 'decode',
      result: 'cipherhub',
      description: 'Bacon cipher should be decoded even without proper indentation',
    },
    {
      text: 'HELLO',
      letter1: 'x',
      letter2: 'y',
      action: 'encode',
      result: 'xxyyy xxyxx xyxyy xyxyy xyyyx',
      description: 'Uppercase letters should be handled correctly',
    },
    {
      text: '12345',
      letter1: 'a',
      letter2: 'b',
      action: 'encode',
      result: '',
      description: 'Numbers should be ignored in encoding',
    },
    {
      text: '!?.,',
      letter1: 'a',
      letter2: 'b',
      action: 'encode',
      result: '',
      description: 'Punctuation should be ignored in encoding',
    },
    {
      text: 'Привіт!',
      letter1: 'a',
      letter2: 'b',
      action: 'encode',
      result: '',
      description: 'Non latin letters should be ignored',
    },
    {
      text: '     ',
      letter1: 'a',
      letter2: 'b',
      action: 'encode',
      result: '',
      description: 'Whitespace should be ignored in encoding',
    },
    {
      text: '=xxyyy xxyxx xyxyy xyxyy xyyyx',
      letter1: 'x',
      letter2: 'y',
      action: 'decode',
      result: 'hello',
      description: 'Decoding should work with different letter pairs',
    },
  ];

  testData.forEach(({ description, result, action, ...baconData }) => {
    it(description, () => {
      expect(bacon({ ...baconData, action: action as 'encode' | 'decode' })).toBe(result);
    });
  });
});
