// src/components/cart/CartList.js
import { useRef, useState } from 'react'; // اضافه کردن useState
import { useCart } from '../../context/CartContext';
import { Box, Typography, TextField } from '@mui/material';
import CartItem from './CartItem'; // اضافه کردن import CartItem
import Invoice from '../Invoice';
import PrintButton from '../ui/PrintButton';

const CartList = () => {
  const { cart, total } = useCart();
  const [customerName, setCustomerName] = useState('');
  const invoiceRef = useRef();

  return (
    <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1 }}>
      <Typography variant="h6">سبد خرید</Typography>
      
      <TextField
        label="نام مشتری"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        margin="normal"
      />

      {cart.length === 0 ? (
        <Typography>سبد خرید خالی است</Typography>
      ) : (
        <>
          {cart.map((item, index) => (
            <CartItem key={index} item={item} index={index} />
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
            جمع کل: {total.toLocaleString()} تومان
          </Typography>
          
          <div style={{ display: 'none' }}>
            <Invoice 
              ref={invoiceRef} 
              cart={cart} 
              total={total} 
              customerName={customerName} 
            />
          </div>
          
          <PrintButton componentRef={invoiceRef} />
        </>
      )}
    </Box>
  );
};

export default CartList;