import { useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Box, Typography, TextField, Divider, Stack, 
  Button, Select, MenuItem, InputAdornment, Paper, Grid
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
    discountAmount,
    total,
    setServiceType,
    setServiceValue,
    setDiscountAmount
  } = useCart();
  
  const [customerName, setCustomerName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const invoiceRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>فاکتور رستوران</title>
          <style>
            @page { size: auto; margin: 0; }
            body { font-family: Vazirmatn; direction: rtl; }
          </style>
        </head>
        <body>
          <div id="invoice-content"></div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 1000);
            };
          </script>
        </body>
      </html>
    `);
    
    const invoiceContent = printWindow.document.getElementById('invoice-content');
    invoiceRef.current && invoiceContent.appendChild(invoiceRef.current.cloneNode(true));
  };

  return (
    <Paper elevation={3} sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 2,
      borderRadius: '12px',
      backgroundColor: '#fff',
      
    }}>
      {/* هدر سبد خرید */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        p: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <Typography variant="h6" fontWeight="bold">
          سبد خرید ({cart.length} آیتم)
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {total.toLocaleString()} تومان
        </Typography>
      </Box>

      {/* لیست آیتم‌ها */}
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        mb: 2,
        '& > *:not(:last-child)': {
          mb: 1
        }
      }}>
        {cart.map((item, index) => (
          <CartItem key={`${item.id}-${index}`} item={item} index={index} />
        ))}
      </Box>

      {/* فرم اطلاعات سفارش */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="نام مشتری"
          variant="outlined"
          size="medium"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="توضیحات سفارش (اختیاری)"
          variant="outlined"
          size="medium"
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        
        {/* تنظیمات مالی */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* حق سرویس */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>حق سرویس</Typography>
            <Select
              fullWidth
              size="medium"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              sx={{ mb: 1 }}
            >
              <MenuItem value="percent">درصدی</MenuItem>
              <MenuItem value="fixed">مبلغ ثابت</MenuItem>
            </Select>
            <TextField
              fullWidth
              size="medium"
              type="number"
              value={serviceValue}
              onChange={(e) => setServiceValue(Number(e.target.value))}
              InputProps={{
                endAdornment: serviceType === 'percent' ? 
                  <InputAdornment position="end">%</InputAdornment> : 
                  <InputAdornment position="end">تومان</InputAdornment>,
              }}
            />
          </Grid>

          {/* کرایه پیک */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>کرایه پیک</Typography>
            <TextField
              fullWidth
              size="medium"
              type="number"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">تومان</InputAdornment>,
              }}
            />
          </Grid>

          {/* تخفیف */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>تخفیف</Typography>
            <TextField
              fullWidth
              size="medium"
              type="number"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">تومان</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>

        {/* جمع‌بندی مالی */}
        <Box sx={{ 
          p: 2,
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          mb: 2
        }}>
          <Stack spacing={1.5}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">جمع جزء:</Typography>
              <Typography variant="subtitle1">{subtotal.toLocaleString()} تومان</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">حق سرویس:</Typography>
              <Typography variant="subtitle1">+{serviceAmount.toLocaleString()} تومان</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">کرایه پیک:</Typography>
              <Typography variant="subtitle1">+{deliveryFee.toLocaleString()} تومان</Typography>
            </Box>
            {discountAmount > 0 && (
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">تخفیف:</Typography>
                <Typography variant="subtitle1" color="error">-{discountAmount.toLocaleString()} تومان</Typography>
              </Box>
            )}
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold">جمع کل:</Typography>
              <Typography variant="h6" fontWeight="bold">{total.toLocaleString()} تومان</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* دکمه چاپ */}
      <Button
        variant="contained"
        fullWidth
        onClick={handlePrint}
        startIcon={<PrintIcon sx={{ fontSize: '1.5rem' }} />}
        size="large"
        sx={{
          py: 2,
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0'
          }
        }}
      >
        چاپ فاکتور
      </Button>

      {/* کامپوننت مخفی برای چاپ */}
      <div style={{ display: 'none' }}>
        <Invoice 
          ref={invoiceRef} 
          cart={cart}
          subtotal={subtotal}
          serviceAmount={serviceAmount}
          deliveryFee={deliveryFee}
          discountAmount={discountAmount}
          total={total}
          customerName={customerName}
          orderNotes={orderNotes}
        />
      </div>
    </Paper>
  );
};

export default CartList;