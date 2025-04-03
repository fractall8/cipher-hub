import { CIPHERS } from '@/shared/constants';
import { ReactNode } from 'react';
import { z } from 'zod';

export const CaesarFormSchema = z.object({
  text: z.string(),
  shift: z
    .number()
    .int()
    .refine((val) => val !== 0, { message: 'Shift must not be 0' }),
  alphabet: z
    .string()
    .min(2, { message: 'Alphabet must be at least 2 chars long.' })
    .refine((value) => new Set(value).size === value.length, {
      message: 'Alphabet must contain only unique characters',
    }),
  action: z.enum(['encode', 'decode']),
});

export type TCaesarFormState = z.infer<typeof CaesarFormSchema>;

export const VigenereFormSchema = z
  .object({
    text: z.string(),
    key: z.string().min(2, { message: 'Key must be at least 2 chars long.' }),
    alphabet: z
      .string()
      .min(2, { message: 'Alphabet must be at least 2 chars long.' })
      .refine((value: string) => new Set(value).size === value.length, {
        message: 'Alphabet must contain only unique characters',
      }),
    action: z.enum(['encode', 'decode']),
  })
  .superRefine((data, ctx) => {
    let forbiddenChars = '';
    for (const char of data.key) {
      if (!data.alphabet.includes(char)) {
        forbiddenChars += char;
      }
    }
    if (forbiddenChars) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['key'],
        message: `Key contains forbidden chars: ${forbiddenChars}`,
      });
    }
  });

export type TVigenereFormState = z.infer<typeof VigenereFormSchema>;

export const BaconFormScheme = z
  .object({
    text: z.string(),
    letter1: z
      .string()
      .min(1, { message: 'Letter must be 1 char long' })
      .max(1, { message: 'Letter must be 1 char long' }),
    letter2: z
      .string()
      .min(1, { message: 'Letter must be 1 char long' })
      .max(1, { message: 'Letter must be 1 char long' }),
    action: z.enum(['encode', 'decode']),
  })
  .superRefine((data, ctx) => {
    if (data.letter1 === data.letter2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['letter1', 'letter2'],
        message: 'The letters must be different from each other.',
      });
    }
  });

export type TBaconFormState = z.infer<typeof BaconFormScheme>;

// same scheme for base64 and base32
export const BaseFormScheme = z.object({
  text: z.string(),
  action: z.enum(['encode', 'decode']),
});

export type TBaseFormState = z.infer<typeof BaseFormScheme>;

export type TCipherIds = (typeof CIPHERS)[number]['id'];

export type TCipher = {
  id: TCipherIds;
  icon: ReactNode;
  name: string;
  description: string;
  about: string;
};

type TShareContentMap = {
  caesar: TCaesarFormState;
  vigenere: TVigenereFormState;
  bacon: TBaconFormState;
  base64: TBaseFormState;
  base32: TBaseFormState;
};

export type TShareContent<K extends TCipherIds> = TShareContentMap[K];
