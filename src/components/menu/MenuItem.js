import { useCart } from '../../context/CartContext';
import { Button, Typography, Paper, Box } from '@mui/material';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Paper elevation={1} sx={{ 
      p: 1.5,
      borderRadius: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" sx={{ 
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>
          {item.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{
          fontSize: '0.7rem',
          display: 'block',
          mb: 0.5
        }}>
          {item.category}
        </Typography>
      </Box>
      
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" sx={{ 
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>
          {item.price.toLocaleString()} تومان
        </Typography>
        <Button 
          variant="contained" 
          size="small"
          onClick={() => addToCart(item)}
          sx={{
            fontSize: '0.7rem',
            px: 1,
            py: 0.5,
            minWidth: 60
          }}
        >
          افزودن
        </Button>
      </Box>
    </Paper>
  );
};

export default MenuItem;