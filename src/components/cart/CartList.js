import { useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Box, Typography, TextField, Divider, Stack, 
  Button, Paper, Grid
} from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import CartItem from './CartItem';
import Invoice from '../Invoice';

const CartList = () => {
  const { 
    cart,
    subtotal,
    serviceAmount,
    setServiceAmount,
    deliveryFee,
    setDeliveryFee,
    discountAmount,
    setDiscountAmount,
    total,
    customerName,
    setCustomerName
  } = useCart();
  
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
      p: 1,
      borderRadius: '8px',
      backgroundColor: '#fff'
    }}>
      {/* هدر سبد خرید */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
        p: 1
      }}>
        <Typography variant="subtitle2" fontWeight="bold">
          سبد خرید ({cart.length})
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          {total.toLocaleString()} تومان
        </Typography>
      </Box>

      {/* نام مشتری */}
      <TextField
        label="نام مشتری"
        size="small"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />

      {/* لیست آیتم‌ها (چیدمان شبکه‌ای) */}
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        mb: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '4px'
      }}>
        {cart.map((item, index) => (
          <CartItem key={`${item.id}-${index}`} item={item} index={index} compact />
        ))}
      </Box>

      {/* بخش تنظیمات مالی فشرده */}
      <Box sx={{
        p: 1,
        backgroundColor: '#f9f9f9',
        borderRadius: '6px',
        mb: 1
      }}>
        <Grid container spacing={1}>
          {/* حق پیک */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="حق پیک"
              type="number"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(Number(e.target.value))}
              inputProps={{ 
                min: 0,
                style: { textAlign: 'left' }
              }}
            />
          </Grid>
          
          {/* تخفیف */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="تخفیف"
              type="number"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(Number(e.target.value))}
              inputProps={{ 
                min: 0,
                style: { textAlign: 'left' }
              }}
            />
          </Grid>
          
          {/* حق سرویس */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="حق سرویس"
              type="number"
              value={serviceAmount}
              onChange={(e) => setServiceAmount(Number(e.target.value))}
              inputProps={{ 
                min: 0,
                style: { textAlign: 'left' }
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* جمع‌بندی مالی */}
      <Box sx={{ 
        p: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
        mb: 1
      }}>
        <Stack spacing={0.5}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">جمع جزء:</Typography>
            <Typography variant="body2">{subtotal.toLocaleString()} تومان</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">حق سرویس:</Typography>
            <Typography variant="body2">+{serviceAmount.toLocaleString()} تومان</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">حق پیک:</Typography>
            <Typography variant="body2">+{deliveryFee.toLocaleString()} تومان</Typography>
          </Box>
          {discountAmount > 0 && (
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">تخفیف:</Typography>
              <Typography variant="body2" color="error">-{discountAmount.toLocaleString()} تومان</Typography>
            </Box>
          )}
          <Divider sx={{ my: 0.5 }} />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1" fontWeight="bold">جمع کل:</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{total.toLocaleString()} تومان</Typography>
          </Box>
        </Stack>
      </Box>

      {/* توضیحات سفارش */}
      <TextField
        label="توضیحات سفارش (اختیاری)"
        size="small"
        value={orderNotes}
        onChange={(e) => setOrderNotes(e.target.value)}
        fullWidth
        multiline
        rows={2}
        sx={{ mb: 1 }}
      />

      {/* دکمه چاپ */}
      <Button
        variant="contained"
        size="small"
        onClick={handlePrint}
        startIcon={<PrintIcon fontSize="small" />}
        sx={{
          alignSelf: 'flex-end',
          px: 2,
          py: 1,
          fontSize: '0.8rem'
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