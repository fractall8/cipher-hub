'use client';

import { CiphersStore, createCiphersStore } from '@/features/ciphers/model/store';
import { type ReactNode, useState, createContext, useContext } from 'react';
import { useStore } from 'zustand';

export type CiphersStoreApi = ReturnType<typeof createCiphersStore>;

export const CiphersStoreContext = createContext<CiphersStoreApi | undefined>(undefined);

export interface CiphersStoreProviderProps {
  children: ReactNode;
}

export const CiphersStoreProvider = ({ children }: CiphersStoreProviderProps) => {
  // lazy initializer: the store is created once, on the first render
  const [store] = useState(() => createCiphersStore());

  return <CiphersStoreContext.Provider value={store}>{children}</CiphersStoreContext.Provider>;
};

export const useCiphersStore = <T,>(selector: (store: CiphersStore) => T): T => {
  const ciphersStoreContext = useContext(CiphersStoreContext);

  if (!ciphersStoreContext) {
    throw new Error(`useCiphersStore must be used within CounterStoreProvider`);
  }

  return useStore(ciphersStoreContext, selector);
};
