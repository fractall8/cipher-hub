import { CIPHERS } from '@/shared/constants';
import { ReactNode } from 'react';
import { z } from 'zod';

export const CaesarFormSchema = z.object({
  text: z.string().min(1, { message: 'Text must be at least 1 char long' }),
  shift: z
    .string()
    .refine((value) => !isNaN(parseInt(value)), { message: 'Shift must be a number!' }),
  alphabet: z
    .string()
    .min(2, { message: 'Alphabet must be at least 2 chars long.' })
    .refine((value) => new Set(value).size === value.length, {
      message: 'Alphabet must contain only unique characters',
    }),
  action: z.enum(['encode', 'decode']),
});

export type TCaesarFromState = z.infer<typeof CaesarFormSchema>;

export const VigenereFormSchema = z
  .object({
    text: z.string().min(1, { message: 'Text must be at least 1 char long' }),
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

export type TCipherIds = (typeof CIPHERS)[number]['id'];

export type TCipher = {
  id: TCipherIds;
  icon: ReactNode;
  name: string;
  description: string;
  about: string;
};
