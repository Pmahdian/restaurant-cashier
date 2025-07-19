import { Grid, Paper, Typography, Button } from '@mui/material';
import { useCart } from '../../context/CartContext';

const MenuList = ({ menuItems }) => {
  const { addToCart } = useCart();

  return (
    <Grid container spacing={2}>
      {menuItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>{item.name}</Typography>
            <Typography color="text.secondary" gutterBottom>
              {item.price.toLocaleString()} تومان
            </Typography>
            <Button 
              fullWidth
              variant="contained"
              onClick={() => addToCart(item)}
              sx={{ mt: 1 }}
            >
              افزودن به سبد
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;