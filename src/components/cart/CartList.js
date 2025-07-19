// src/components/cart/CartList.js
import React, { useRef, useState } from 'react'; // اضافه کردن React و useState
import { useCart } from '../../context/CartContext';
import { 
  Box, 
  Typography, 
  TextField,
  Paper,
  Divider,
  Stack,
  IconButton
} from '@mui/material';
import { Percent as PercentIcon, Print as PrintIcon } from '@mui/icons-material';
import CartItem from './CartItem';
import Invoice from '../Invoice';

const CartList = () => {
  const { 
    cart, 
    subtotal,
    serviceCharge,
    serviceAmount,
    total,
    updateServiceCharge
  } = useCart();
  
  const [customerName, setCustomerName] = useState('');
  const invoiceRef = useRef();

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        🛒 سبد خرید
      </Typography>
      
      <TextField
        label="📝 نام مشتری"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ maxHeight: '300px', overflow: 'auto', mb: 2 }}>
        {cart.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={3}>
            سبد خرید خالی است
          </Typography>
        ) : (
          cart.map((item, index) => (
            <CartItem key={index} item={item} index={index} />
          ))
        )}
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Stack spacing={1}>
        <Box display="flex" justifyContent="space-between">
          <Typography>جمع جزء:</Typography>
          <Typography>{subtotal.toLocaleString()} تومان</Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>حق سرویس:</Typography>
          <TextField
            size="small"
            type="number"
            value={serviceCharge}
            onChange={(e) => updateServiceCharge(e.target.value)}
            InputProps={{
              endAdornment: <PercentIcon fontSize="small" />,
              sx: { width: '80px' }
            }}
          />
          <Typography flexGrow={1} textAlign="right">
            {serviceAmount.toLocaleString()} تومان
          </Typography>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold">
            قابل پرداخت:
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {total.toLocaleString()} تومان
          </Typography>
        </Box>
      </Stack>
      
      <Box mt={3} display="flex" justifyContent="flex-end">
        <IconButton
          color="primary"
          onClick={() => window.print()}
          sx={{ 
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
            p: 1.5
          }}
        >
          <PrintIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>
            چاپ فاکتور
          </Typography>
        </IconButton>
      </Box>
      
      {/* کامپوننت مخفی برای چاپ */}
      <div style={{ display: 'none' }}>
        <Invoice 
          ref={invoiceRef} 
          cart={cart} 
          subtotal={subtotal}
          serviceCharge={serviceCharge}
          serviceAmount={serviceAmount}
          total={total}
          customerName={customerName} 
        />
      </div>
    </Paper>
  );
};

export default CartList;