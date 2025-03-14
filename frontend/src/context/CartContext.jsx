// src/CartContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

//export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id === product._id);

      if (existingProduct) {
        toast.success("Quantité mise à jour !");
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success("Produit ajouté avec succès !");
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };


  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => prevCart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    toast.success("Le panier à été vider avec succès !");
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.new_price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
