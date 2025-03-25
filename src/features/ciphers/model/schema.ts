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

export type TCipherIds = (typeof CIPHERS)[number]['id'];

export type TCipher = { id: TCipherIds; icon: ReactNode; name: string; description: string };
