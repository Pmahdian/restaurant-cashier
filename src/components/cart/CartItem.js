// src/components/cart/CartItem.js
import { useCart } from '../../context/CartContext';
import { Box, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const CartItem = ({ item, index }) => {
  const { removeFromCart } = useCart();

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center"
      sx={{ 
        p: 1,
        mb: 1,
        borderRadius: 1,
        bgcolor: 'background.paper',
        boxShadow: 1
      }}
    >
      <Typography>
        <span style={{ fontWeight: 'bold' }}>{item.name}</span>
        <span style={{ fontSize: '0.8rem', color: 'text.secondary', display: 'block' }}>
          {item.price.toLocaleString()} تومان
        </span>
      </Typography>
      
      <IconButton 
        color="error"
        onClick={() => removeFromCart(index)}
        size="small"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItem;