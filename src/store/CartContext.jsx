import React, { createContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    const cartRef = doc(db, 'carts', user.uid);
    const unsub = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        setCart(docSnap.data().items || []);
      } else {
        setCart([]);
      }
    });
    return () => unsub();
  }, [user]);

  async function saveCart(newCart) {
    if (!user) return;
    const cartRef = doc(db, 'carts', user.uid);
    await setDoc(cartRef, { items: newCart }, { merge: true });
  }

  function addToCart(fruit) {
    setCart(prev => {
      const found = prev.find(item => item.id === fruit.id);
      let newCart;
      if (found) {
        newCart = prev.map(item => item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        newCart = [...prev, { ...fruit, quantity: 1 }];
      }
      saveCart(newCart);
      return newCart;
    });
  }

  function updateCartItem(id, quantity) {
    if (id === '__CLEAR__') {
      setCart([]);
      saveCart([]);
      return [];
    }
    setCart(prev => {
      const newCart = prev.map(item => item.id === id ? { ...item, quantity } : item);
      saveCart(newCart);
      return newCart;
    });
  }

  function removeFromCart(id) {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== id);
      saveCart(newCart);
      return newCart;
    });
  }

  function clearCart() {
    setCart([]);
    saveCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
} 