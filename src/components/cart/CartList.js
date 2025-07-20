import { useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Box, Typography, TextField, Divider, Stack, 
  Button, InputAdornment, Paper, Grid
} from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import CartItem from './CartItem';
import Invoice from '../Invoice';

const CartList = () => {
  const { 
    cart,
    subtotal,
    serviceAmount,
    deliveryFee,
    setDeliveryFee,
    discountAmount,
    setDiscountAmount,
    total
  } = useCart();
  
  const [customerName, setCustomerName] = useState('');
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
          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="پیک"
              type="number"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">ت</InputAdornment>,
                inputProps: { style: { textAlign: 'left' } }
              }}
              sx={{ '& .MuiInputBase-input': { padding: '8px' } }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="تخفیف"
              type="number"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">ت</InputAdornment>,
                inputProps: { style: { textAlign: 'left' } }
              }}
              sx={{ '& .MuiInputBase-input': { padding: '8px' } }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="حق سرویس"
              type="number"
              value={serviceAmount}
              disabled
              InputProps={{
                endAdornment: <InputAdornment position="end">ت</InputAdornment>,
                inputProps: { style: { textAlign: 'left' } }
              }}
              sx={{ '& .MuiInputBase-input': { padding: '8px' } }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* جمع‌بندی فشرده */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        mb: 1
      }}>
        <Typography variant="body2">جمع کل:</Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          {total.toLocaleString()} تومان
        </Typography>
      </Box>

      {/* دکمه چاپ کوچک */}
      <Button
        variant="outlined"
        size="small"
        onClick={handlePrint}
        startIcon={<PrintIcon fontSize="small" />}
        sx={{
          alignSelf: 'flex-end',
          p: '4px 8px',
          minWidth: 'unset',
          fontSize: '0.75rem'
        }}
      >
        چاپ
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
        />
      </div>
    </Paper>
  );
};

export default CartList;