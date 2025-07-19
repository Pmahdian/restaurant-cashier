import React, { useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Divider, 
  Button,
  IconButton,
  Paper
} from '@mui/material';
import { Print as PrintIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import Invoice from './Invoice';

const CartList = ({ cart, setCart }) => {
  const invoiceRef = useRef();

  // محاسبات مالی
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.09; // مالیات 9%
  const total = subtotal + tax;

  // حذف آیتم از سبد خرید
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // افزایش تعداد آیتم
  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  // کاهش تعداد آیتم
  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    }
  };

  // چاپ فاکتور
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    pageStyle: `
      @page { size: auto; margin: 5mm; }
      body { font-family: Vazirmatn; direction: rtl; padding: 10px; }
    `,
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        سبد خرید ({cart.length} آیتم)
      </Typography>

      {/* لیست آیتم‌های سبد خرید */}
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
        {cart.map((item, index) => (
          <Paper key={index} sx={{ p: 1, mb: 1, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight="bold">{item.name}</Typography>
              <Typography variant="body2">
                {item.price.toLocaleString()} تومان
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <IconButton 
                size="small" 
                onClick={() => decreaseQuantity(index)}
                disabled={item.quantity <= 1}
              >
                -
              </IconButton>
              <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
              <IconButton size="small" onClick={() => increaseQuantity(index)}>
                +
              </IconButton>
            </Box>

            <Typography sx={{ minWidth: 100, textAlign: 'left' }}>
              {(item.price * item.quantity).toLocaleString()} تومان
            </Typography>

            <IconButton 
              color="error" 
              onClick={() => removeFromCart(index)}
              sx={{ ml: 1 }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Paper>
        ))}
      </Box>

      {/* خلاصه فاکتور */}
      <Box sx={{ mt: 'auto' }}>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>جمع جزء:</Typography>
          <Typography>{subtotal.toLocaleString()} تومان</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>مالیات (9%):</Typography>
          <Typography>+{tax.toLocaleString()} تومان</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">جمع کل:</Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {total.toLocaleString()} تومان
          </Typography>
        </Box>

        {/* دکمه چاپ فاکتور */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          disabled={cart.length === 0}
        >
          چاپ فاکتور
        </Button>
      </Box>

      {/* کامپوننت فاکتور (برای چاپ) */}
      <div style={{ display: 'none' }}>
        <Invoice 
          ref={invoiceRef}
          cart={cart}
          subtotal={subtotal}
          tax={tax}
          total={total}
        />
      </div>
    </Box>
  );
};

export default CartList;