import { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [delivery, setDelivery] = useState({ type: 'fixed', value: 0 });
  const [discount, setDiscount] = useState({ type: 'fixed', value: 0 });
  const [service, setService] = useState({ type: 'percent', value: 10 });

  const subtotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
    [cart]
  );

  const deliveryFee = useMemo(() => 
    delivery.type === 'percent' ? (subtotal * delivery.value) / 100 : delivery.value,
    [delivery, subtotal]
  );

  const discountAmount = useMemo(() =>
    discount.type === 'percent' ? (subtotal * discount.value) / 100 : discount.value,
    [discount, subtotal]
  );

  const serviceAmount = useMemo(() =>
    service.type === 'percent' ? (subtotal * service.value) / 100 : service.value,
    [service, subtotal]
  );

  const total = useMemo(() =>
    subtotal + serviceAmount + deliveryFee - discountAmount,
    [subtotal, serviceAmount, deliveryFee, discountAmount]
  );

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

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        customerName,
        setCustomerName,
        delivery,
        setDelivery,
        discount,
        setDiscount,
        service,
        setService,
        subtotal,
        deliveryFee,
        discountAmount,
        serviceAmount,
        total,
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};