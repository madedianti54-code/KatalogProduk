import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { products } from '../data/products';

const CartContext = createContext(null);

// cart disimpan sebagai { [productId]: qty }
export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const addToCart = useCallback((id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const decrease = useCallback((id) => {
    setCart((prev) => {
      const qty = (prev[id] || 0) - 1;
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const value = useMemo(() => {
    const items = products
      .filter((p) => cart[p.id])
      .map((p) => ({ ...p, qty: cart[p.id] }));
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.price, 0);
    return { items, count, total, addToCart, decrease, removeFromCart, clearCart };
  }, [cart, addToCart, decrease, removeFromCart, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart harus dipakai di dalam CartProvider');
  return ctx;
}