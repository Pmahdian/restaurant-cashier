import { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Box, Typography, TextField, Paper, Divider, Stack, 
  IconButton, MenuItem, Select, InputAdornment
} from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import CartItem from './CartItem';
import Invoice from '../Invoice';

const CartList = () => {
  const { 
    cart,
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
  } = useCart();
  
  const [customerName, setCustomerName] = useState('');
  const invoiceRef = useRef();

  return (
    <Paper elevation={1} sx={{ 
      p: 1.5,
      borderRadius: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant="subtitle1" sx={{ 
        fontWeight: 'bold',
        mb: 1,
        fontSize: '0.9rem'
      }}>
        سبد خرید ({cart.length})
      </Typography>
      
      {/* ... بقیه کدها با استایل‌های مشابه فشرده ... */}
      
      {/* دکمه چاپ فشرده */}
      <IconButton
        size="small"
        onClick={() => window.print()}
        sx={{ 
          alignSelf: 'flex-end',
          mt: 1,
          fontSize: '0.7rem'
        }}
      >
        <PrintIcon fontSize="small" sx={{ mr: 0.5 }} />
        <Typography variant="caption">چاپ فاکتور</Typography>
      </IconButton>
      
      {/* فاکتور مخفی */}
      <div style={{ display: 'none' }}>
        <Invoice 
          ref={invoiceRef} 
          cart={cart}
          subtotal={subtotal}
          serviceType={serviceType}
          serviceValue={serviceValue}
          serviceAmount={serviceAmount}
          deliveryFee={deliveryFee}
          discountType={discountType}
          discountValue={discountValue}
          discountAmount={discountAmount}
          total={total}
          customerName={customerName} 
        />
      </div>
    </Paper>
  );
};

export default CartList;