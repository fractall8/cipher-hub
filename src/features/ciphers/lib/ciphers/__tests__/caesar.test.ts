import { describe, it, expect } from 'vitest';
import { caesar } from '../caesar';

describe('Caesar Cipher', () => {
  it('should encode text correctly', () => {
    expect(
      caesar({ text: 'abc', shift: 3, alphabet: 'abcdefghijklmnopqrstuvwxyz', action: 'encode' }),
    ).toBe('def');

    expect(
      caesar({
        text: 'The quick brown fox jumps over the lazy dog.',
        shift: 7,
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'encode',
      }),
    ).toBe('Aol xbpjr iyvdu mve qbtwz vcly aol shgf kvn.');

    expect(
      caesar({
        text: 'Привіт світ!',
        shift: 5,
        alphabet: 'абвгдеєжзиїклмнопрстуфхцчшщьюя',
        action: 'encode',
      }),
    ).toBe('Фхнжіч цжіч!');
  });

  it('should decode text correctly', () => {
    expect(
      caesar({ text: 'def', shift: 3, alphabet: 'abcdefghijklmnopqrstuvwxyz', action: 'decode' }),
    ).toBe('abc');

    expect(
      caesar({
        text: 'Aol xbpjr iyvdu mve qbtwz vcly aol shgf kvn.',
        shift: 7,
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'decode',
      }),
    ).toBe('The quick brown fox jumps over the lazy dog.');

    expect(
      caesar({
        text: 'Фхнжіч цжіч!',
        shift: 5,
        alphabet: 'абвгдеєжзиїклмнопрстуфхцчшщьюя',
        action: 'decode',
      }),
    ).toBe('Привіт світ!');
  });

  it('edge cases: should throw error if text or alphabet is empty', () => {
    expect(() =>
      caesar({
        text: '     ',
        shift: 12,
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'decode',
      }),
    ).toThrow('Invalid input: text and alphabet must be non-empty.');

    expect(() =>
      caesar({
        text: '   ',
        shift: 12,
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'encode',
      }),
    ).toThrow('Invalid input: text and alphabet must be non-empty.');

    expect(() =>
      caesar({
        text: 'Hello world!',
        shift: 12,
        alphabet: '',
        action: 'encode',
      }),
    ).toThrow('Invalid input: text and alphabet must be non-empty.');
  });

  it('edge cases: should throw error if arguments with invalid types provided.', () => {
    expect(() =>
      caesar({
        text: 'Hello world!',
        shift: 12,
        alphabet: 12 as unknown as string,
        action: 'encode',
      }),
    ).toThrow('Invalid input: text and alphabet must be strings, shift must be a number.');

    expect(() =>
      caesar({
        text: 'Hello world!',
        shift: 'string' as unknown as number,
        alphabet: 'alphabet',
        action: 'encode',
      }),
    ).toThrow('Invalid input: text and alphabet must be strings, shift must be a number.');
  });

  it('edge cases: should throw error if alphabet contains non-unique chars', () => {
    expect(() =>
      caesar({
        text: 'Hello world!',
        shift: -5,
        alphabet: 'aaaabbbbb',
        action: 'encode',
      }),
    ).toThrow('Invalid input: alphabet must contain only unique chars.');
  });
});
