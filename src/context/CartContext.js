// src/context/CartContext.js
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [serviceCharge, setServiceCharge] = useState(10); // درصد حق سرویس (پیش‌فرض 10%)
  
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const updateServiceCharge = (value) => {
    setServiceCharge(Number(value));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const serviceAmount = (subtotal * serviceCharge) / 100;
  const total = subtotal + serviceAmount;

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        subtotal,
        serviceCharge,
        serviceAmount,
        total,
        updateServiceCharge
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);