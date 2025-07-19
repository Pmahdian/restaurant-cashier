import { useCart } from '../../context/CartContext';
import { Button, Typography, Paper } from '@mui/material';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{item.name}</Typography>
      <Typography color="text.secondary">{item.category}</Typography>
      <Typography variant="body1" sx={{ my: 1 }}>
        {item.price.toLocaleString()} تومان
      </Typography>
      <Button 
        variant="contained" 
        fullWidth
        onClick={() => addToCart(item)}
      >
        افزودن
      </Button>
    </Paper>
  );
};

export default MenuItem;