import { z } from 'zod';
import { CIPHERS } from '@/shared/constants';
import {
  BaconFormScheme,
  BaseFormScheme,
  CaesarFormSchema,
  VigenereFormSchema,
} from '@/features/ciphers/model/schema';

export const ShareDataSchema = z.object({
  cipherId: z.enum(CIPHERS.map(({ id }) => id) as [string, ...string[]]),
  content: z.union([CaesarFormSchema, VigenereFormSchema, BaconFormScheme, BaseFormScheme]),
  result: z.string().optional(),
});
