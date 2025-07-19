import { forwardRef } from 'react';
import { Box, Typography, Divider } from '@mui/material';

const Invoice = forwardRef(({ 
  cart,
  subtotal,
  serviceType,
  serviceValue,
  serviceAmount,
  deliveryFee,
  discountType,
  discountValue,
  discountAmount,
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
        فاکتور رستوران
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
      
      {cart.map((item) => (
        <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
          <Typography>
            {item.name} (تعداد: {item.quantity})
          </Typography>
          <Typography>
            {(item.price * item.quantity).toLocaleString()} تومان
          </Typography>
        </Box>
      ))}
      
      <Divider sx={{ my: 2 }} />
      
      <Box display="flex" justifyContent="space-between">
        <Typography>جمع جزء:</Typography>
        <Typography>{subtotal.toLocaleString()} تومان</Typography>
      </Box>
      
      <Box display="flex" justifyContent="space-between">
        <Typography>
          حق سرویس ({serviceType === 'percent' ? `${serviceValue}%` : 'ثابت'}):
        </Typography>
        <Typography>+{serviceAmount.toLocaleString()} تومان</Typography>
      </Box>
      
      {deliveryFee > 0 && (
        <Box display="flex" justifyContent="space-between">
          <Typography>کرایه پیک:</Typography>
          <Typography>+{deliveryFee.toLocaleString()} تومان</Typography>
        </Box>
      )}
      
      {discountValue > 0 && (
        <Box display="flex" justifyContent="space-between">
          <Typography>
            تخفیف ({discountType === 'percent' ? `${discountValue}%` : 'ثابت'}):
          </Typography>
          <Typography color="error">-{discountAmount.toLocaleString()} تومان</Typography>
        </Box>
      )}
      
      <Divider sx={{ my: 2 }} />
      
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography variant="h6" fontWeight="bold">جمع کل:</Typography>
        <Typography variant="h6" fontWeight="bold">
          {total.toLocaleString()} تومان
        </Typography>
      </Box>
      
      <Typography variant="body2" align="center" sx={{ mt: 4, fontStyle: 'italic' }}>
        با تشکر از انتخاب شما
      </Typography>
    </Box>
  );
});

export default Invoice;