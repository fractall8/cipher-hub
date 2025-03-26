import { describe, it, expect } from 'vitest';
import { vigenere } from '../vigenere';

describe('Vigenere Cipher', () => {
  it('should encode text correctly', () => {
    expect(
      vigenere({
        text: 'hello',
        key: 'key',
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'encode',
      }),
    ).toBe('rijvs');

    expect(
      vigenere({
        text: 'The quick brown fox jumps over the lazy dog.',
        key: 'cipherhub',
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'encode',
      }),
    ).toBe('Vpt xyzje ctwlu jfe dvoxh vzvy nig tpgc uva.');

    expect(
      vigenere({
        text: 'Привіт світ!',
        key: 'ключ',
        alphabet: 'абвгдеєжзиїклмнопрстуфхцчшщьюя',
        action: 'encode',
      }),
    ).toBe('Ьяжщіа ааім!');
  });

  it('should decode text correctly', () => {
    expect(
      vigenere({
        text: 'rijvs',
        key: 'key',
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'decode',
      }),
    ).toBe('hello');

    expect(
      vigenere({
        text: 'Vpt xyzje ctwlu jfe dvoxh vzvy nig tpgc uva.',
        key: 'cipherhub',
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'decode',
      }),
    ).toBe('The quick brown fox jumps over the lazy dog.');

    expect(
      vigenere({
        text: 'Ьяжщіа ааім!',
        key: 'ключ',
        alphabet: 'абвгдеєжзиїклмнопрстуфхцчшщьюя',
        action: 'decode',
      }),
    ).toBe('Привіт світ!');
  });

  it('edge cases: should throw error if text or alphabet is empty', () => {
    expect(() =>
      vigenere({
        text: '     ',
        key: 'hello',
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'decode',
      }),
    ).toThrow('Invalid input: text, key, and alphabet must be non-empty.');

    expect(() =>
      vigenere({
        text: '   ',
        key: 'key',
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'encode',
      }),
    ).toThrow('Invalid input: text, key, and alphabet must be non-empty.');

    expect(() =>
      vigenere({
        text: 'Hello world!',
        key: 'cipherhub',
        alphabet: '',
        action: 'encode',
      }),
    ).toThrow('Invalid input: text, key, and alphabet must be non-empty.');
  });

  it('edge cases: should throw error if arguments with invalid types provided.', () => {
    expect(() =>
      vigenere({
        text: 'Hello world!',
        key: 'key',
        alphabet: 12 as unknown as string,
        action: 'encode',
      }),
    ).toThrow('Invalid input: text, key, and alphabet must be strings.');

    expect(() =>
      vigenere({
        text: 'Hello world!',
        key: 12 as unknown as string,
        alphabet: 'alphabet',
        action: 'encode',
      }),
    ).toThrow('Invalid input: text, key, and alphabet must be strings.');
  });

  it('edge cases: should throw error if alphabet contains non-unique chars', () => {
    expect(() =>
      vigenere({
        text: 'Hello world!',
        key: 'cipherhub',
        alphabet: 'aaaabbbbb',
        action: 'encode',
      }),
    ).toThrow('Invalid input: alphabet must contain only unique chars.');
  });

  it('edge cases: should throw an error when the key contains invalid characters not in the alphabet', () => {
    expect(() =>
      vigenere({
        text: 'hello world',
        key: 'abcZ1',
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        action: 'encode',
      }),
    ).toThrow('Invalid input: key must contain only characters from the alphabet.');
  });
});
