// src/components/menu/MenuItem.js
import { Button } from '@mui/material';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Button 
      variant="contained" 
      onClick={() => addToCart(item)}
      sx={{ m: 1 }}
    >
      {item.name} - {item.price.toLocaleString()} تومان
    </Button>
  );
};

export default MenuItem;