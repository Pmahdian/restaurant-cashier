import { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [serviceAmount, setServiceAmount] = useState(0);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      if (newCart[index].quantity > 1) {
        newCart[index] = {
          ...newCart[index],
          quantity: newCart[index].quantity - 1
        };
        return newCart;
      }
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const subtotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
    [cart]
  );

  const total = useMemo(() => 
    subtotal + serviceAmount + deliveryFee - discountAmount,
    [subtotal, serviceAmount, deliveryFee, discountAmount]
  );

  return (
    <CartContext.Provider 
      value={{ 
        cart,
        addToCart,
        removeFromCart,
        subtotal,
        serviceAmount,
        setServiceAmount,
        deliveryFee,
        setDeliveryFee,
        discountAmount,
        setDiscountAmount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);