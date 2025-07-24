import { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';

const Invoice = forwardRef(({ 
  cart,
  subtotal,
  serviceAmount,
  deliveryFee,
  discountAmount,
  total,
  customerName
}, ref) => {
  
  return (
    <Box ref={ref} sx={{ 
      width: '80mm',
      p: 2,
      fontFamily: 'Vazirmatn'
    }}>
      <Typography variant="h6" align="center" gutterBottom>
        فاکتور رستوران
      </Typography>
      
      {/* اطلاعات مشتری */}
      <Box sx={{ mb: 2 }}>
        <Typography>مشتری: {customerName || 'میهمان'}</Typography>
        <Typography>تاریخ: {new Date().toLocaleString('fa-IR')}</Typography>
      </Box>
      
      {/* لیست آیتم‌ها */}
      {cart.map((item, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography>
            {item.quantity} × {item.name} 
            {item.notes && ` (${item.notes})`}
          </Typography>
          <Typography align="left">
            {(item.price * item.quantity).toLocaleString()} تومان
          </Typography>
        </Box>
      ))}
      
      {/* جمع‌بندی */}
      <Box sx={{ mt: 2, borderTop: '1px dashed #000', pt: 1 }}>
        <Typography>جمع جزء: {subtotal.toLocaleString()} </Typography>
        <Typography>حق سرویس: +{serviceAmount.toLocaleString()} </Typography>
        {deliveryFee > 0 && (
          <Typography>هزینه پیک: +{deliveryFee.toLocaleString()} </Typography>
        )}
        {discountAmount > 0 && (
          <Typography>تخفیف: -{discountAmount.toLocaleString()} </Typography>
        )}
        <Typography fontWeight="bold" sx={{ mt: 1 }}>
          جمع کل: {total.toLocaleString()} تومان
        </Typography>
      </Box>
      
      <Typography align="center" sx={{ mt: 3 }}>
        با تشکر از خرید شما
      </Typography>
    </Box>
  );
});

export default Invoice;