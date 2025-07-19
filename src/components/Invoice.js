import { forwardRef } from 'react';
import { Typography, Box } from '@mui/material';

const Invoice = forwardRef(({ cart, total, customerName }, ref) => {
  const date = new Date().toLocaleString('fa-IR');

  return (
    <Box ref={ref} sx={{ p: 3, fontFamily: 'Vazirmatn' }}>
      <Typography variant="h4" align="center" gutterBottom>
        فاکتور رستوران
      </Typography>
      <Typography variant="body1" gutterBottom>
        تاریخ: {date}
      </Typography>
      <Typography variant="body1" gutterBottom>
        مشتری: {customerName || 'ناشناس'}
      </Typography>
      <hr />
      {cart.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>{item.name}</Typography>
          <Typography>{item.price.toLocaleString()} تومان</Typography>
        </Box>
      ))}
      <hr />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography variant="h6">جمع کل:</Typography>
        <Typography variant="h6">{total.toLocaleString()} تومان</Typography>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 4 }}>
        با تشکر از خرید شما!
      </Typography>
    </Box>
  );
});

export default Invoice;