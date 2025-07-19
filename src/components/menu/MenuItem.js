import React from 'react';
import { Button, Typography, Paper } from '@mui/material';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  if (!item) return null; // محافظت در برابر item undefined

  return (
    <Paper sx={{ p: 1, mb: 1 }}>
      <Typography variant="h6">{item.name}</Typography>
      <Typography>{item.price.toLocaleString()} تومان</Typography>
      <Button 
        variant="contained" 
        size="small" 
        onClick={() => addToCart(item)}
      >
        افزودن
      </Button>
    </Paper>
  );
};

export default MenuItem;