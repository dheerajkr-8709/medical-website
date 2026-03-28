import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [distance, setDistance] = useState(null); // km
  const [loading, setLoading] = useState(false);

  const [isInitialized, setIsInitialized] = useState(false);

  // Load backend cart on user login
  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated && user?._id) {
        setLoading(true);
        try {
          const { data } = await axios.get(`/api/users/${user._id}/cart`);
          if (data && data.length > 0) {
            setCart(data);
          } else {
            const savedCart = localStorage.getItem('srm-cart');
            if (savedCart) {
              const parsed = JSON.parse(savedCart);
              setCart(parsed);
              // We'll sync this specifically
              await axios.post('/api/users/syncCart', { userId: user._id, cart: parsed });
            }
          }
        } catch (error) {
          console.error("Error fetching backend cart:", error);
          const savedCart = localStorage.getItem('srm-cart');
          if (savedCart) setCart(JSON.parse(savedCart));
        } finally {
          setLoading(false);
          setIsInitialized(true);
        }
      } else {
        const savedCart = localStorage.getItem('srm-cart');
        if (savedCart) setCart(JSON.parse(savedCart));
        setIsInitialized(true);
      }
    };
    fetchCart();
  }, [isAuthenticated, user?._id]);

  // Sync cart to backend/localStorage
  const syncCartToBackend = useCallback(async (newCart) => {
    localStorage.setItem('srm-cart', JSON.stringify(newCart));
    if (isAuthenticated && user?._id && isInitialized) {
      try {
        await axios.post('/api/users/syncCart', { userId: user._id, cart: newCart });
      } catch (error) {
        console.error("Cart sync failed:", error);
      }
    }
  }, [isAuthenticated, user?._id, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      syncCartToBackend(cart);
    }
  }, [cart, isInitialized, syncCartToBackend]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const productId = product._id || product.id;
      const existingIdx = prev.findIndex(item => (item._id || item.id || item.medicineId) === productId);
      
      let newCart;
      if (existingIdx > -1) {
        newCart = [...prev];
        newCart[existingIdx] = { ...newCart[existingIdx], quantity: newCart[existingIdx].quantity + quantity };
      } else {
        newCart = [...prev, { 
          ...product, 
          medicineId: product._id || product.id, 
          quantity 
        }];
      }
      return newCart;
    });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => (item._id || item.id || item.medicineId) !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => (item._id || item.id || item.medicineId) === id ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('srm-cart');
  };

  const subtotal = cart.reduce((acc, item) => {
    const actualPrice = item.price * (1 - (item.discount || 0) / 100);
    return acc + (actualPrice * item.quantity);
  }, 0);

  const deliveryFee = subtotal > 500 ? 0 : 40; // Free above 500
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
      setDistance,
      cartLoading: loading
    }}>
      {children}
    </CartContext.Provider>
  );
};
