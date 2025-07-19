import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [serviceType, setServiceType] = useState('percent');
  const [serviceValue, setServiceValue] = useState(10);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [discountType, setDiscountType] = useState('percent');
  const [discountValue, setDiscountValue] = useState(0);

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

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const serviceAmount = serviceType === 'percent' 
    ? (subtotal * serviceValue) / 100
    : serviceValue;
    
  const discountAmount = discountType === 'percent'
    ? (subtotal * discountValue) / 100
    : discountValue;
    
  const total = subtotal + serviceAmount + deliveryFee - discountAmount;

  return (
    <CartContext.Provider 
      value={{ 
        cart,
        addToCart,
        removeFromCart,
        subtotal,
        serviceType,
        serviceValue,
        serviceAmount,
        deliveryFee,
        setDeliveryFee,
        discountType,
        discountValue,
        discountAmount,
        total,
        setServiceType,
        setServiceValue,
        setDiscountType,
        setDiscountValue
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);