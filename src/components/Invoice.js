// src/components/Invoice.js
import { forwardRef } from 'react';
import { Box, Typography, Divider } from '@mui/material';

const Invoice = forwardRef(({ 
  cart, 
  subtotal,
  serviceCharge,
  serviceAmount,
  total,
  customerName 
}, ref) => {
  const date = new Date().toLocaleString('fa-IR');
  
  return (
    <Box ref={ref} sx={{ 
      p: 3, 
      fontFamily: 'Vazirmatn',
      maxWidth: '400px',
      mx: 'auto'
    }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        🍽️ فاکتور رستوران
      </Typography>
      
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography>تاریخ:</Typography>
        <Typography>{date}</Typography>
      </Box>
      
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography>مشتری:</Typography>
        <Typography>{customerName || 'ناشناس'}</Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      {cart.map((item, index) => (
        <Box key={index} display="flex" justifyContent="space-between" mb={1}>
          <Typography>{item.name}</Typography>
          <Typography>{item.price.toLocaleString()} تومان</Typography>
        </Box>
      ))}
      
      <Divider sx={{ my: 2 }} />
      
      <Box display="flex" justifyContent="space-between">
        <Typography>جمع جزء:</Typography>
        <Typography>{subtotal.toLocaleString()} تومان</Typography>
      </Box>
      
      <Box display="flex" justifyContent="space-between">
        <Typography>حق سرویس ({serviceCharge}%):</Typography>
        <Typography>{serviceAmount.toLocaleString()} تومان</Typography>
      </Box>
      
      <Divider sx={{ my: 1 }} />
      
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography variant="h6" fontWeight="bold">جمع کل:</Typography>
        <Typography variant="h6" fontWeight="bold">
          {total.toLocaleString()} تومان
        </Typography>
      </Box>
      
      <Typography variant="body2" align="center" sx={{ mt: 4, fontStyle: 'italic' }}>
        با تشکر از انتخاب شما! 🌟
      </Typography>
    </Box>
  );
});

export default Invoice;