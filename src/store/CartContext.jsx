import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(fruit) {
    setCart(prev => {
      const found = prev.find(item => item.id === fruit.id);
      if (found) {
        return prev.map(item => item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...fruit, quantity: 1 }];
    });
  }

  function updateCartItem(id, quantity) {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
} 