import { useContext } from 'react';
import { RfqCartContext, type RfqCartContextType } from './RfqCartContext';

export function useRfqCart(): RfqCartContextType {
  const context = useContext(RfqCartContext);
  if (!context) {
    throw new Error('useRfqCart must be used within an <RfqCartProvider>');
  }
  return context;
}
