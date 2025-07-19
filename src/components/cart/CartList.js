import React from 'react';
import { Box, Typography, Button, IconButton, Paper } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const CartList = () => {
  const { cart, removeFromCart, total } = useCart();

  return (
    <Box>
      <Typography variant="h6">سبد خرید</Typography>
      {cart.map(item => (
        <Paper key={item.id} sx={{ p: 1, mb: 1, display: 'flex' }}>
          <Box flexGrow={1}>
            <Typography>{item.name}</Typography>
            <Typography>
              {item.quantity} × {item.price.toLocaleString()} تومان
            </Typography>
          </Box>
          <IconButton onClick={() => removeFromCart(item.id)}>
            <Delete />
          </IconButton>
        </Paper>
      ))}
      <Typography variant="h6" sx={{ mt: 2 }}>
        جمع کل: {total.toLocaleString()} تومان
      </Typography>
    </Box>
  );
};

export default CartList;