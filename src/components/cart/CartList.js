import { useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Box, Typography, TextField, Divider, Stack, 
  Button, Select, MenuItem, InputAdornment, Paper
} from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import CartItem from './CartItem';
import Invoice from '../Invoice';

const CartList = () => {
  // ... (کدهای قبلی useCart و stateها)
  
  return (
    <Paper elevation={3} sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 1,
      borderRadius: '12px',
      backgroundColor: '#fff'
    }}>
      {/* هدر سبد خرید */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
        p: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <Typography variant="subtitle1" fontWeight="bold">
          سبد خرید ({cart.length} آیتم)
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {total.toLocaleString()} تومان
        </Typography>
      </Box>

      {/* لیست آیتم‌ها */}
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        mb: 1,
        '& > *:not(:last-child)': {
          mb: 0.5
        }
      }}>
        {cart.map((item, index) => (
          <CartItem key={`${item.id}-${index}`} item={item} index={index} />
        ))}
      </Box>

      {/* فرم مشتری و تنظیمات */}
      <Box sx={{ mb: 1 }}>
        <TextField
          label="نام مشتری"
          size="small"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          fullWidth
          sx={{ mb: 1 }}
        />
        
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Select
              fullWidth
              size="small"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <MenuItem value="percent">حق سرویس %</MenuItem>
              <MenuItem value="fixed">حق سرویس ثابت</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={serviceValue}
              onChange={(e) => setServiceValue(Number(e.target.value))}
              InputProps={{
                endAdornment: serviceType === 'percent' ? 
                  <InputAdornment position="end">%</InputAdornment> : 
                  <InputAdornment position="end">تومان</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* دکمه چاپ */}
      <Button
        variant="contained"
        fullWidth
        onClick={handlePrint}
        startIcon={<PrintIcon />}
        sx={{
          py: 1.5,
          borderRadius: '8px',
          fontWeight: 'bold',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0'
          }
        }}
      >
        چاپ فاکتور
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