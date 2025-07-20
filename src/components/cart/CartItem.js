import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Box, Typography, IconButton, TextField,
  Avatar, Stack 
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const CartItem = ({ item, index }) => {
  const { removeFromCart, updateItemNotes } = useCart();
  const [notes, setNotes] = useState(item.notes || '');

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      p: 1,
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      gap: 1
    }}>
      <Avatar sx={{ 
        width: 40, 
        height: 40,
        backgroundColor: '#e0e0e0',
        color: '#333'
      }}>
        {item.quantity}
      </Avatar>
      
      <Box sx={{ flex: 1 }}>
        <Typography fontWeight="bold" noWrap>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.price.toLocaleString()} تومان
        </Typography>
      </Box>
      
      <Typography sx={{ minWidth: '80px', textAlign: 'left' }}>
        {(item.price * item.quantity).toLocaleString()} تومان
      </Typography>
      
      <IconButton 
        onClick={() => removeFromCart(index)}
        size="small"
        sx={{ color: '#f44336' }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItem;