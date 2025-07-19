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
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        سبد خرید
      </Typography>
      
      <TextField
        label="نام مشتری"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ maxHeight: '400px', overflow: 'auto', mb: 2 }}>
        {cart.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={3}>
            سبد خرید خالی است
          </Typography>
        ) : (
          cart.map((item, index) => (
            <CartItem key={item.id} item={item} index={index} />
          ))
        )}
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>حق سرویس:</Typography>
          <Select
            size="small"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            sx={{ width: '100px' }}
          >
            <MenuItem value="percent">درصدی</MenuItem>
            <MenuItem value="fixed">مبلغ ثابت</MenuItem>
          </Select>
          <TextField
            size="small"
            type="number"
            value={serviceValue}
            onChange={(e) => setServiceValue(Number(e.target.value))}
            InputProps={{
              endAdornment: serviceType === 'percent' ? 
                <InputAdornment position="end">%</InputAdornment> : 
                <InputAdornment position="end">تومان</InputAdornment>,
              sx: { width: '120px' }
            }}
          />
          <Typography flexGrow={1} textAlign="right">
            +{serviceAmount.toLocaleString()} تومان
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography>کرایه پیک:</Typography>
          <TextField
            size="small"
            type="number"
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(Number(e.target.value))}
            InputProps={{
              endAdornment: <InputAdornment position="end">تومان</InputAdornment>,
              sx: { width: '120px' }
            }}
          />
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography>تخفیف:</Typography>
          <Select
            size="small"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            sx={{ width: '100px' }}
          >
            <MenuItem value="percent">درصدی</MenuItem>
            <MenuItem value="fixed">مبلغ ثابت</MenuItem>
          </Select>
          <TextField
            size="small"
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(Number(e.target.value))}
            InputProps={{
              endAdornment: discountType === 'percent' ? 
                <InputAdornment position="end">%</InputAdornment> : 
                <InputAdornment position="end">تومان</InputAdornment>,
              sx: { width: '120px' }
            }}
          />
          <Typography flexGrow={1} textAlign="right" color="error">
            -{discountAmount.toLocaleString()} تومان
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

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