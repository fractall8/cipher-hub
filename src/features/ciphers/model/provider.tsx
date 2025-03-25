'use client';

import { CiphersStore, createCiphersStore } from '@/features/ciphers/model/store';
import { type ReactNode, useRef, createContext, useContext } from 'react';
import { useStore } from 'zustand';

export type CiphersStoreApi = ReturnType<typeof createCiphersStore>;

export const CiphersStoreContext = createContext<CiphersStoreApi | undefined>(undefined);

export interface CiphersStoreProviderProps {
  children: ReactNode;
}

export const CiphersStoreProvider = ({ children }: CiphersStoreProviderProps) => {
  const storeRef = useRef<CiphersStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createCiphersStore();
  }

  return (
    <CiphersStoreContext.Provider value={storeRef.current}>{children}</CiphersStoreContext.Provider>
  );
};

export const useCiphersStore = <T,>(selector: (store: CiphersStore) => T): T => {
  const ciphersStoreContext = useContext(CiphersStoreContext);

  if (!ciphersStoreContext) {
    throw new Error(`useCiphersStore must be used within CounterStoreProvider`);
  }

  return useStore(ciphersStoreContext, selector);
};
