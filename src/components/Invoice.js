import { forwardRef } from 'react';
import { 
  Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Divider
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
      {/* هدر فاکتور */}
      <Typography variant="h6" align="center" sx={{ 
        fontWeight: 'bold',
        mb: 2,
        pb: 1,
        borderBottom: '1px solid #eee'
      }}>
        فاکتور رستوران
      </Typography>

      {/* اطلاعات مشتری */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        mb: 2
      }}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>مشتری:</Typography>
          <Typography>{customerName}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>تاریخ:</Typography>
          <Typography>{new Date().toLocaleString('fa-IR')}</Typography>
        </Box>
      </Box>

      {/* جدول آیتم‌ها */}
      <TableContainer component={Paper} sx={{ 
        mb: 2,
        border: '1px solid #eee',
        borderRadius: '4px'
      }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', p: 1 }}>آیتم</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', p: 1, width: '20%' }}>تعداد</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', p: 1, width: '30%' }}>مبلغ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ p: 1 }}>
                  {item.name}
                  {item.notes && (
                    <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                      {item.notes}
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="center" sx={{ p: 1 }}>{item.quantity}</TableCell>
                <TableCell align="left" sx={{ p: 1 }}>{(item.price * item.quantity).toLocaleString()} تومان</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* جمع‌بندی مالی */}
      <Box sx={{ 
        border: '1px solid #eee',
        borderRadius: '4px',
        p: 2,
        mb: 2
      }}>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1
        }}>
          <Typography>حق سرویس:</Typography>
          <Typography>+{serviceAmount.toLocaleString()} تومان</Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1
        }}>
          <Typography>حق پیک:</Typography>
          <Typography>+{deliveryFee.toLocaleString()} تومان</Typography>
        </Box>
        
        {discountAmount > 0 && (
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            mb: 1
          }}>
            <Typography>تخفیف:</Typography>
            <Typography color="error">-{discountAmount.toLocaleString()} تومان</Typography>
          </Box>
        )}
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 'bold'
        }}>
          <Typography>جمع کل:</Typography>
          <Typography>{total.toLocaleString()} تومان</Typography>
        </Box>
      </Box>

      {/* توضیحات سفارش */}
      {orderNotes && (
        <Box sx={{ 
          border: '1px solid #eee',
          borderRadius: '4px',
          p: 2,
          mb: 2
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>توضیحات سفارش:</Typography>
          <Typography variant="body2">{orderNotes}</Typography>
        </Box>
      )}

      {/* پاورقی */}
      <Typography variant="body2" align="center" sx={{ 
        mt: 2,
        fontStyle: 'italic',
        color: 'text.secondary'
      }}>
        با تشکر از انتخاب شما
      </Typography>
    </Box>
  );
});

export default Invoice;