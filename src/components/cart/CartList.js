import { useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Box, Typography, TextField, Divider, Stack, 
  IconButton, MenuItem, Select, InputAdornment
} from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import CartItem from './CartItem';
import Invoice from '../Invoice';

const CartList = () => {
  const { 
    cart,
    subtotal,
    serviceType,
    serviceValue,
    serviceAmount,
    deliveryFee,
    setDeliveryFee,
    discountType,
    discountValue,
    discountAmount,
    total,
    setServiceType,
    setServiceValue,
    setDiscountType,
    setDiscountValue
  } = useCart();
  
  const [customerName, setCustomerName] = useState('');
  const invoiceRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>فاکتور رستوران</title>
          <style>
            @page {
              size: auto;
              margin: 5mm;
            }
            body {
              font-family: Vazirmatn, sans-serif;
              direction: rtl;
              padding: 20px;
            }
            .invoice-header {
              text-align: center;
              margin-bottom: 15px;
            }
            .invoice-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            .invoice-total {
              font-weight: bold;
              margin-top: 10px;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
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
    
    // Render invoice content in the new window
    const invoiceContent = printWindow.document.getElementById('invoice-content');
    invoiceRef.current && invoiceContent.appendChild(invoiceRef.current.cloneNode(true));
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <Typography variant="subtitle1" sx={{ 
        fontWeight: 'bold',
        mb: 1,
        fontSize: '0.9rem'
      }}>
        سبد خرید ({cart.length})
      </Typography>
      
      <TextField
        label="نام مشتری"
        size="small"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        sx={{ mb: 1.5 }}
      />
      
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        mb: 1.5,
        pr: 1
      }}>
        {cart.map((item, index) => (
          <CartItem key={`${item.id}-${index}`} item={item} index={index} />
        ))}
      </Box>
      
      <Divider sx={{ my: 1 }} />
      
      <Stack spacing={1} sx={{ mb: 1.5 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">جمع جزء:</Typography>
          <Typography variant="body2">{subtotal.toLocaleString()} تومان</Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">حق سرویس:</Typography>
          <Select
            size="small"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            sx={{ width: '90px', fontSize: '0.75rem' }}
          >
            <MenuItem value="percent" sx={{ fontSize: '0.75rem' }}>درصدی</MenuItem>
            <MenuItem value="fixed" sx={{ fontSize: '0.75rem' }}>مبلغ ثابت</MenuItem>
          </Select>
          <TextField
            size="small"
            type="number"
            value={serviceValue}
            onChange={(e) => setServiceValue(Number(e.target.value))}
            InputProps={{
              sx: { width: '80px', fontSize: '0.75rem' },
              endAdornment: serviceType === 'percent' ? 
                <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>%</InputAdornment> : 
                <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>تومان</InputAdornment>,
            }}
          />
          <Typography variant="body2" sx={{ flexGrow: 1, textAlign: 'right' }}>
            +{serviceAmount.toLocaleString()} تومان
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">پیک:</Typography>
          <TextField
            size="small"
            type="number"
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(Number(e.target.value))}
            InputProps={{
              sx: { width: '80px', fontSize: '0.75rem' },
              endAdornment: <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>تومان</InputAdornment>,
            }}
          />
        </Box>
        
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">تخفیف:</Typography>
          <Select
            size="small"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            sx={{ width: '90px', fontSize: '0.75rem' }}
          >
            <MenuItem value="percent" sx={{ fontSize: '0.75rem' }}>درصدی</MenuItem>
            <MenuItem value="fixed" sx={{ fontSize: '0.75rem' }}>مبلغ ثابت</MenuItem>
          </Select>
          <TextField
            size="small"
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(Number(e.target.value))}
            InputProps={{
              sx: { width: '80px', fontSize: '0.75rem' },
              endAdornment: discountType === 'percent' ? 
                <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>%</InputAdornment> : 
                <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>تومان</InputAdornment>,
            }}
          />
          <Typography variant="body2" color="error" sx={{ flexGrow: 1, textAlign: 'right' }}>
            -{discountAmount.toLocaleString()} تومان
          </Typography>
        </Box>
      </Stack>
      
      <Divider sx={{ my: 1 }} />
      
      <Box display="flex" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography variant="subtitle1" fontWeight="bold">جمع کل:</Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {total.toLocaleString()} تومان
        </Typography>
      </Box>
      
      <IconButton
        size="small"
        onClick={handlePrint}
        sx={{ 
          alignSelf: 'flex-end',
          fontSize: '0.75rem',
          '& svg': { fontSize: '1rem' }
        }}
      >
        <PrintIcon sx={{ mr: 0.5 }} />
        <Typography variant="caption">چاپ فاکتور</Typography>
      </IconButton>
      
      <div style={{ display: 'none' }}>
        <Invoice 
          ref={invoiceRef} 
          cart={cart}
          subtotal={subtotal}
          serviceType={serviceType}
          serviceValue={serviceValue}
          serviceAmount={serviceAmount}
          deliveryFee={deliveryFee}
          discountType={discountType}
          discountValue={discountValue}
          discountAmount={discountAmount}
          total={total}
          customerName={customerName} 
        />
      </div>
    </Box>
  );
};

export default CartList;