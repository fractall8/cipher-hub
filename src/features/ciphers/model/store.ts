import { TCipher } from '@/features/ciphers/model/schema';
import { create } from 'zustand';

export type CiphersState = {
  selectedCipher: TCipher | undefined;
};

export type CiphersActions = {
  selectCipher: (cipher: TCipher) => void;
};

export type CiphersStore = CiphersState & CiphersActions;

export const defaultInitState: CiphersState = { selectedCipher: undefined };

export const createCiphersStore = (initState: CiphersState = defaultInitState) => {
  return create<CiphersStore>((set) => ({
    ...initState,
    selectCipher: (cipher: TCipher) => set(() => ({ selectedCipher: cipher })),
  }));
};
