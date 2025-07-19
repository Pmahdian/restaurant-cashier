import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const CartItem = ({ item, index }) => {
  const { removeFromCart, updateItemNotes } = useCart();
  const [notes, setNotes] = useState(item.notes || '');

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    updateItemNotes(index, newNotes);
  };

  return (
    <Box sx={{ 
      p: 1,
      mb: 1,
      bgcolor: '#fff',
      borderRadius: 1,
      boxShadow: 1
    }}>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">{item.name}</Typography>
        <Typography>
          {(item.price * item.quantity).toLocaleString()} تومان
        </Typography>
      </Box>
      
      <TextField
        size="small"
        placeholder="توضیحات (اختیاری)"
        value={notes}
        onChange={handleNotesChange}
        fullWidth
        sx={{ mt: 1 }}
      />
      
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <IconButton onClick={() => removeFromCart(index)} size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;