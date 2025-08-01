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
    orderNotes = '',
    orderNumber = ''
  } = props;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Box ref={ref} sx={{ 
      width: '80mm',
      p: 2,
      fontFamily: 'Vazirmatn, sans-serif',
      direction: 'rtl',
      backgroundColor: 'white',
      margin: '0 auto',
      color: '#333'
    }}>
      {/* هدر فاکتور */}
      <Box sx={{ 
        textAlign: 'center',
        mb: 3,
        pb: 1,
        borderBottom: '2px dashed #ccc'
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold',
          color: '#d32f2f'
        }}>
          رستوران بابا طاهر
        </Typography>
        <Typography variant="subtitle1" sx={{ 
          color: '#666',
          mt: 1
        }}>
          فاکتور فروش
        </Typography>
      </Box>

      {/* اطلاعات سفارش */}
      <Box sx={{
        textAlign: 'center',
        mb: 3,
        p: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: '6px'
      }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          شماره سفارش: #{orderNumber || '---'}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          تاریخ: {new Date().toLocaleString('fa-IR')}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          مشتری: {customerName}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
          وضعیت: تحویل شده
        </Typography>
      </Box>

      {/* جدول آیتم‌ها */}
      <TableContainer component={Paper} sx={{ 
        mb: 3,
        border: 'none',
        boxShadow: 'none'
      }}>
        <Table size="small" sx={{
          '& .MuiTableCell-root': {
            borderBottom: '1px solid #e0e0e0',
            padding: '6px 8px',
            textAlign: 'center',
            fontSize: '0.85rem'
          }
        }}>
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: '#f5f5f5',
              '& th': { fontWeight: 'bold', color: '#444' }
            }}>
              <TableCell sx={{ width: '40%' }}>آیتم</TableCell>
              <TableCell sx={{ width: '20%' }}>تعداد</TableCell>
              <TableCell sx={{ width: '20%' }}>فی</TableCell>
              <TableCell sx={{ width: '20%' }}>جمع</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index} sx={{
                backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9'
              }}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  {item.notes && (
                    <Typography variant="caption" display="block" sx={{ 
                      color: '#888',
                      fontSize: '0.75rem',
                      mt: 0.5
                    }}>
                      {item.notes}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price.toLocaleString()}</TableCell>
                <TableCell>{(item.price * item.quantity).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* خلاصه پرداخت */}
      <Box sx={{ 
        border: '1px solid #ddd',
        borderRadius: '8px',
        p: 2,
        mb: 3,
        backgroundColor: '#fefefe'
      }}>
        <Typography variant="subtitle1" sx={{ 
          fontWeight: 'bold',
          mb: 2,
          color: '#444',
          textAlign: 'center'
        }}>
          خلاصه پرداخت
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">جمع کل آیتم‌ها:</Typography>
          <Typography variant="body2">{subtotal.toLocaleString()} تومان</Typography>
        </Box>
        
        {serviceAmount > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">حق سرویس:</Typography>
            <Typography variant="body2" sx={{ color: '#388e3c' }}>
              +{serviceAmount.toLocaleString()} تومان
            </Typography>
          </Box>
        )}
        
        {deliveryFee > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">هزینه ارسال:</Typography>
            <Typography variant="body2" sx={{ color: '#1976d2' }}>
              +{deliveryFee.toLocaleString()} تومان
            </Typography>
          </Box>
        )}
        
        {discountAmount > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">تخفیف:</Typography>
            <Typography variant="body2" sx={{ color: '#d32f2f' }}>
              -{discountAmount.toLocaleString()} تومان
            </Typography>
          </Box>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            مبلغ قابل پرداخت:
          </Typography>
          <Typography variant="subtitle1" sx={{ 
            fontWeight: 'bold',
            color: '#d32f2f'
          }}>
            {total.toLocaleString()} تومان
          </Typography>
        </Box>
      </Box>

      {/* توضیحات سفارش */}
      {orderNotes && (
        <Box sx={{ 
          border: '1px dashed #ccc',
          borderRadius: '8px',
          p: 2,
          mb: 3,
          backgroundColor: '#fefefe'
        }}>
          <Typography variant="subtitle2" sx={{ 
            fontWeight: 'bold', 
            mb: 1,
            color: '#444',
            textAlign: 'center'
          }}>
            توضیحات سفارش
          </Typography>
          <Typography variant="body2" sx={{ 
            whiteSpace: 'pre-line',
            fontSize: '0.85rem',
            color: '#555',
            textAlign: 'center'
          }}>
            {orderNotes}
          </Typography>
        </Box>
      )}

      {/* پاورقی */}
      <Box sx={{ 
        mt: 3,
        textAlign: 'center',
        borderTop: '2px dashed #ccc',
        pt: 2
      }}>
        <Typography variant="body1" sx={{ 
          fontWeight: 'bold',
          mb: 1,
          color: '#333'
        }}>
          با تشکر از خرید شما
        </Typography>
        <Typography variant="caption" sx={{ 
          display: 'block',
          color: '#777',
          fontSize: '0.8rem'
        }}>
          شماره تماس: ۰۲۱-۱۲۳۴۵۶۷۸
        </Typography>
        <Typography variant="caption" sx={{ 
          display: 'block',
          color: '#777',
          fontSize: '0.75rem',
          mt: 1
        }}>
          آدرس: تهران، خیابان نمونه، پلاک ۱۲۳
        </Typography>
      </Box>
    </Box>
  );
});

export default Invoice;
