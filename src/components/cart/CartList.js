import { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Box, Typography, TextField, Button, Paper, Grid,
  Select, MenuItem, InputAdornment, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import Invoice from '../Invoice';

const CartList = () => {
  const {
    cart,
    customerName,
    setCustomerName,
    delivery,
    setDelivery,
    discount,
    setDiscount,
    service,
    setService,
    total,
    deliveryFee,
    discountAmount,
    serviceAmount,
    addToCart,
    removeFromCart
  } = useCart();

  const [orderNotes, setOrderNotes] = useState('');
  const invoiceRef = useRef();

  const handleValueChange = (type, value) => {
    if (value === '') return '';
    const numValue = Number(value);
    return isNaN(numValue) ? 0 : numValue;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>فاکتور رستوران</title>
          <style>
            @page { size: auto; margin: 0; }
            body { font-family: Vazirmatn; direction: rtl; }
          </style>
        </head>
        <body>
          <div id="invoice-content"></div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 1000);
            };
          </script>
        </body>
      </html>
    `);
    
    const invoiceContent = printWindow.document.getElementById('invoice-content');
    invoiceRef.current && invoiceContent.appendChild(invoiceRef.current.cloneNode(true));
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextField
        label="نام مشتری"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* حق سرویس */}
        <Grid item xs={12} sm={4}>
          <Select
            value={service.type}
            onChange={(e) => setService({...service, type: e.target.value})}
            fullWidth
          >
            <MenuItem value="percent">درصدی</MenuItem>
            <MenuItem value="fixed">مبلغ ثابت</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            label={`حق سرویس ${service.type === 'percent' ? '(%)' : '(تومان)'}`}
            value={service.value === 0 ? '' : service.value}
            onChange={(e) => setService({...service, value: handleValueChange('service', e.target.value)})}
            fullWidth
           
          />
        </Grid>

        {/* حق پیک */}
        <Grid item xs={12} sm={4}>
          <Select
            value={delivery.type}
            onChange={(e) => setDelivery({...delivery, type: e.target.value})}
            fullWidth
          >
            <MenuItem value="percent">درصدی</MenuItem>
            <MenuItem value="fixed">مبلغ ثابت</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            label={`حق پیک ${delivery.type === 'percent' ? '(%)' : '(تومان)'}`}
            value={delivery.value === 0 ? '' : delivery.value}
            onChange={(e) => setDelivery({...delivery, value: handleValueChange('delivery', e.target.value)})}
            fullWidth
           
          />
        </Grid>

        {/* تخفیف */}
        <Grid item xs={12} sm={4}>
          <Select
            value={discount.type}
            onChange={(e) => setDiscount({...discount, type: e.target.value})}
            fullWidth
          >
            <MenuItem value="percent">درصدی</MenuItem>
            <MenuItem value="fixed">مبلغ ثابت</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            label={`تخفیف ${discount.type === 'percent' ? '(%)' : '(تومان)'}`}
            value={discount.value === 0 ? '' : discount.value}
            onChange={(e) => setDiscount({...discount, value: handleValueChange('discount', e.target.value)})}
            fullWidth
           
          />
        </Grid>
      </Grid>

      <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
        {cart.length > 0 ? (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>آیتم</TableCell>
                  <TableCell align="center">تعداد</TableCell>
                  <TableCell align="right">مبلغ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">{(item.price * item.quantity).toLocaleString()} تومان</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" align="center" sx={{ p: 2 }}>
            سبد خرید خالی است
          </Typography>
        )}
      </Box>

      <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, mb: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography>حق سرویس:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>+{serviceAmount.toLocaleString()} تومان</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>حق پیک:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>+{deliveryFee.toLocaleString()} تومان</Typography>
          </Grid>
          {discountAmount > 0 && (
            <>
              <Grid item xs={6}>
                <Typography>تخفیف:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography color="error">-{discountAmount.toLocaleString()} تومان</Typography>
              </Grid>
            </>
          )}
          <Grid item xs={12} sx={{ borderTop: '1px dashed #ddd', pt: 1, mt: 1 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="bold">جمع کل:</Typography>
              <Typography fontWeight="bold">{total.toLocaleString()} تومان</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <TextField
        label="توضیحات سفارش (اختیاری)"
        value={orderNotes}
        onChange={(e) => setOrderNotes(e.target.value)}
        fullWidth
        multiline
        rows={2}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handlePrint}
        startIcon={<PrintIcon />}
        disabled={cart.length === 0}
        sx={{ alignSelf: 'flex-end' }}
      >
        چاپ فاکتور
      </Button>

      <div style={{ display: 'none' }}>
        <Invoice 
          ref={invoiceRef}
          cart={cart}
          customerName={customerName}
          deliveryFee={deliveryFee}
          discountAmount={discountAmount}
          serviceAmount={serviceAmount}
          total={total}
          orderNotes={orderNotes}
        />
      </div>
    </Paper>
  );
};

export default CartList;