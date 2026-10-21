import { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { RfqCartContext } from './RfqCartContext';
import type { RfqItem } from '../../types/rfq';
import productsData from '../../data/products.json';

const STORAGE_KEY = 'pix-rfq-cart:v1';

// Build a fast lookup set of valid product IDs from products.json
const validProductIds = new Set(productsData.map((p) => p.id));

function loadInitialCart(): RfqItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter and sanitize items to ensure referential integrity
    return parsed
      .filter((item): item is RfqItem => {
        return (
          typeof item === 'object' &&
          item !== null &&
          typeof item.productId === 'string' &&
          validProductIds.has(item.productId) &&
          typeof item.sku === 'string' &&
          typeof item.name === 'string' &&
          typeof item.quantity === 'number' &&
          item.quantity >= 1
        );
      })
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Math.floor(item.quantity)),
        variant: item.variant || 'Standard',
        brandingMethod: item.brandingMethod || 'None / Standard'
      }));
  } catch (err) {
    console.warn('Failed to load RFQ cart from localStorage:', err);
    return [];
  }
}

export function RfqCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RfqItem[]>(loadInitialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Sync to localStorage whenever items change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event('pix-rfq-cart-updated'));
    } catch (err) {
      console.warn('Failed to persist RFQ cart to localStorage:', err);
    }
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);
  const openRequestModal = useCallback(() => setIsRequestModalOpen(true), []);
  const closeRequestModal = useCallback(() => setIsRequestModalOpen(false), []);

  const addItem = useCallback((newItemInput: Omit<RfqItem, 'quantity'> & { quantity?: number }) => {
    const addQty = Math.max(1, Math.floor(newItemInput.quantity ?? 1));
    const targetVariant = newItemInput.variant || 'Standard';
    const targetBranding = newItemInput.brandingMethod || 'None / Standard';

    setItems((prevItems) => {
      // Find matching item by ID, variant, and branding method
      const existingIndex = prevItems.findIndex(
        (i) =>
          i.productId === newItemInput.productId &&
          (i.variant || 'Standard') === targetVariant &&
          (i.brandingMethod || 'None / Standard') === targetBranding
      );

      if (existingIndex >= 0) {
        const next = [...prevItems];
        const existing = next[existingIndex];
        next[existingIndex] = {
          ...existing,
          quantity: existing.quantity + addQty
        };
        return next;
      }

      // New line item
      const newItem: RfqItem = {
        productId: newItemInput.productId,
        sku: newItemInput.sku,
        name: newItemInput.name,
        slug: newItemInput.slug,
        image: newItemInput.image,
        category: newItemInput.category,
        capacity: newItemInput.capacity,
        material: newItemInput.material,
        variant: targetVariant,
        brandingMethod: targetBranding,
        quantity: addQty,
        notes: newItemInput.notes || ''
      };

      return [...prevItems, newItem];
    });

    // Automatically open the drawer on addition for seamless feedback
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    const validQty = Math.max(1, Math.floor(quantity));
    setItems((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const next = [...prev];
      next[index] = { ...next[index], quantity: validQty };
      return next;
    });
  }, []);

  const updateItemOptions = useCallback(
    (
      index: number,
      options: Partial<Pick<RfqItem, 'variant' | 'brandingMethod' | 'notes'>>
    ) => {
      setItems((prev) => {
        if (index < 0 || index >= prev.length) return prev;
        const next = [...prev];
        next[index] = { ...next[index], ...options };
        return next;
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItemCount = items.length;
  const totalUnitsCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const contextValue = useMemo(
    () => ({
      items,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      isRequestModalOpen,
      openRequestModal,
      closeRequestModal,
      addItem,
      removeItem,
      updateQuantity,
      updateItemOptions,
      clearCart,
      totalItemCount,
      totalUnitsCount
    }),
    [
      items,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      isRequestModalOpen,
      openRequestModal,
      closeRequestModal,
      addItem,
      removeItem,
      updateQuantity,
      updateItemOptions,
      clearCart,
      totalItemCount,
      totalUnitsCount
    ]
  );

  return (
    <RfqCartContext.Provider value={contextValue}>
      {children}
    </RfqCartContext.Provider>
  );
}
