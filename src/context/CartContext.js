// src/context/CartContext.js
import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // اضافه کردن آیتم به سبد خرید
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // حذف آیتم از سبد خرید (بر اساس index)
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // محاسبه جمع کل سبد خرید
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook برای استفاده راحت‌تر از Context
export const useCart = () => {
  return useContext(CartContext);
};