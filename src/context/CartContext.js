import { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('میهمان');
  
  // حق سرویس
  const [serviceType, setServiceType] = useState('percent');
  const [serviceValue, setServiceValue] = useState(10);
  
  // حق پیک
  const [deliveryType, setDeliveryType] = useState('fixed');
  const [deliveryValue, setDeliveryValue] = useState(0);
  
  // تخفیف
  const [discountType, setDiscountType] = useState('fixed');
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

  const subtotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
    [cart]
  );

  const serviceAmount = useMemo(() => 
    serviceType === 'percent' 
      ? (subtotal * serviceValue) / 100 
      : serviceValue,
    [serviceType, serviceValue, subtotal]
  );

  const deliveryFee = useMemo(() => 
    deliveryType === 'percent' 
      ? (subtotal * deliveryValue) / 100 
      : deliveryValue,
    [deliveryType, deliveryValue, subtotal]
  );

  const discountAmount = useMemo(() => 
    discountType === 'percent' 
      ? (subtotal * discountValue) / 100 
      : discountValue,
    [discountType, discountValue, subtotal]
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
        serviceType,
        serviceValue,
        setServiceType,
        setServiceValue,
        serviceAmount,
        deliveryType,
        deliveryValue,
        setDeliveryType,
        setDeliveryValue,
        deliveryFee,
        discountType,
        discountValue,
        setDiscountType,
        setDiscountValue,
        discountAmount,
        total,
        customerName,
        setCustomerName
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);