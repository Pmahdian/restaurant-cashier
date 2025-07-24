import { forwardRef } from 'react';
import { 
  Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';

const Invoice = forwardRef((props, ref) => {
  const {
    cart = [],
    customerName = 'میهمان',
    deliveryFee = 0,
    discountAmount = 0,
    serviceAmount = 0,
    total = 0,
    orderNotes = ''
  } = props;

  return (
    <Box ref={ref} sx={{ 
      width: '80mm',
      p: 2,
      fontFamily: 'Vazirmatn',
      direction: 'rtl'
    }}>
      <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        فاکتور رستوران
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 2, boxShadow: 'none' }}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell sx={{ border: 'none', fontWeight: 'bold' }}>مشتری:</TableCell>
              <TableCell sx={{ border: 'none' }}>{customerName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: 'none', fontWeight: 'bold' }}>تاریخ:</TableCell>
              <TableCell sx={{ border: 'none' }}>{new Date().toLocaleString('fa-IR')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {cart.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ mb: 2, boxShadow: 'none' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>آیتم</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>تعداد</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>مبلغ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {item.name}
                      {item.notes && (
                        <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                          {item.notes}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">{(item.price * item.quantity).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 'none', fontWeight: 'bold' }}>حق سرویس:</TableCell>
                  <TableCell align="right" sx={{ border: 'none' }}>+{serviceAmount.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 'none', fontWeight: 'bold' }}>حق پیک:</TableCell>
                  <TableCell align="right" sx={{ border: 'none' }}>+{deliveryFee.toLocaleString()}</TableCell>
                </TableRow>
                {discountAmount > 0 && (
                  <TableRow>
                    <TableCell sx={{ border: 'none', fontWeight: 'bold' }}>تخفیف:</TableCell>
                    <TableCell align="right" sx={{ border: 'none', color: 'error.main' }}>
                      -{discountAmount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell sx={{ border: 'none', fontWeight: 'bold', borderTop: '1px dashed #ddd' }}>
                    جمع کل:
                  </TableCell>
                  <TableCell align="right" sx={{ border: 'none', fontWeight: 'bold', borderTop: '1px dashed #ddd' }}>
                    {total.toLocaleString()} تومان
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {orderNotes && (
            <Box sx={{ mt: 2, p: 1, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>توضیحات:</Typography>
              <Typography variant="body2">{orderNotes}</Typography>
            </Box>
          )}
        </>
      ) : (
        <Typography variant="body2" align="center" sx={{ p: 2 }}>
          هیچ آیتمی در سبد خرید وجود ندارد
        </Typography>
      )}

      <Typography variant="body2" align="center" sx={{ mt: 3, fontStyle: 'italic' }}>
        با تشکر از انتخاب شما
      </Typography>
    </Box>
  );
});

export default Invoice;