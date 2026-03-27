import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [distance, setDistance] = useState(null); // Mock distance in km

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('srm-cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('srm-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const productId = product._id || product.id;
      const existing = prev.find(item => (item._id || item.id) === productId);
      if (existing) {
        return prev.map(item => 
          (item._id || item.id) === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => (item._id || item.id) !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => (item._id || item.id) === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => {
    const actualPrice = item.price * (1 - (item.discount || 0) / 100);
    return acc + (actualPrice * item.quantity);
  }, 0);

  const deliveryFee = distance && distance > 5 ? 50 : 20; // Example logic
  const total = subtotal + (cart.length > 0 ? deliveryFee : 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      deliveryFee,
      total,
      deliveryAddress,
      setDeliveryAddress,
      distance,
      setDistance
    }}>
      {children}
    </CartContext.Provider>
  );
};
