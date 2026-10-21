import { createContext } from 'react';
import type { RfqItem } from '../../types/rfq';

export type RfqCartContextType = {
  items: RfqItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isRequestModalOpen: boolean;
  openRequestModal: () => void;
  closeRequestModal: () => void;
  addItem: (item: Omit<RfqItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  updateItemOptions: (
    index: number,
    options: Partial<Pick<RfqItem, 'variant' | 'brandingMethod' | 'notes'>>
  ) => void;
  clearCart: () => void;
  totalItemCount: number;
  totalUnitsCount: number;
};

export const RfqCartContext = createContext<RfqCartContextType | null>(null);
