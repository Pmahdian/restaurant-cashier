import { forwardRef } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Invoice = forwardRef(({ 
  cart,
  serviceAmount,
  deliveryFee,
  discountAmount,
  total,
  customerName,
  orderNotes
}, ref) => {
  const date = new Date().toLocaleString('fa-IR');
  
  return (
    <Box ref={ref} sx={{ 
      width: '80mm',
      p: 2,
      fontFamily: 'Vazirmatn',
      direction: 'rtl'
    }}>
      {/* هدر فاکتور */}
      <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        فاکتور رستوران
      </Typography>
      
      {/* اطلاعات مشتری و تاریخ */}
      <Box sx={{ mb: 2 }}>
        <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none' }}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ border: 'none', p: 0.5, fontWeight: 'bold' }}>مشتری:</TableCell>
                <TableCell sx={{ border: 'none', p: 0.5 }}>{customerName || 'میهمان'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 'none', p: 0.5, fontWeight: 'bold' }}>تاریخ:</TableCell>
                <TableCell sx={{ border: 'none', p: 0.5 }}>{date}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      {/* لیست آیتم‌ها */}
      <TableContainer component={Paper} elevation={0} sx={{ mb: 2, boxShadow: 'none' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', p: 1 }}>آیتم</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', p: 1 }}>تعداد</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', p: 1 }}>مبلغ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ p: 1 }}>
                  {item.name}
                  {item.notes && <Typography variant="caption" display="block">{item.notes}</Typography>}
                </TableCell>
                <TableCell align="center" sx={{ p: 1 }}>{item.quantity}</TableCell>
                <TableCell align="left" sx={{ p: 1 }}>{(item.price * item.quantity).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* جمع‌بندی مالی */}
      <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none' }}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell sx={{ border: 'none', p: 0.5, fontWeight: 'bold' }}>حق سرویس:</TableCell>
              <TableCell align="left" sx={{ border: 'none', p: 0.5 }}>+{serviceAmount.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: 'none', p: 0.5, fontWeight: 'bold' }}>حق پیک:</TableCell>
              <TableCell align="left" sx={{ border: 'none', p: 0.5 }}>+{deliveryFee.toLocaleString()}</TableCell>
            </TableRow>
            {discountAmount > 0 && (
              <TableRow>
                <TableCell sx={{ border: 'none', p: 0.5, fontWeight: 'bold' }}>تخفیف:</TableCell>
                <TableCell align="left" sx={{ border: 'none', p: 0.5, color: 'error.main' }}>-{discountAmount.toLocaleString()}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell sx={{ border: 'none', p: 0.5, fontWeight: 'bold', borderTop: '1px dashed #ddd' }}>جمع کل:</TableCell>
              <TableCell align="left" sx={{ border: 'none', p: 0.5, fontWeight: 'bold', borderTop: '1px dashed #ddd' }}>
                {total.toLocaleString()} تومان
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* توضیحات */}
      {orderNotes && (
        <Box sx={{ mt: 2, p: 1, backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>توضیحات:</Typography>
          <Typography variant="body2">{orderNotes}</Typography>
        </Box>
      )}

      {/* پاورقی */}
      <Typography variant="body2" align="center" sx={{ mt: 3, fontStyle: 'italic' }}>
        با تشکر از انتخاب شما
      </Typography>
    </Box>
  );
});

export default Invoice;