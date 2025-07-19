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
        p: 2,
        mb: 1,
        border: '1px solid #eee',
        borderRadius: 1
      }}
    >
      <Box>
        <Typography fontWeight="bold">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {item.price.toLocaleString()} تومان × {item.quantity}
        </Typography>
      </Box>
      
      <Box display="flex" alignItems="center">
        <Typography sx={{ mx: 2, fontWeight: 'bold' }}>
          {(item.price * item.quantity).toLocaleString()} تومان
        </Typography>
        <IconButton 
          color="error" 
          onClick={() => removeFromCart(index)}
          size="small"
          sx={{ bgcolor: '#ffeeee' }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;