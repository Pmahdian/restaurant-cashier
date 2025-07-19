import { useCart } from '../../context/CartContext';
import { Box, Button, Typography, Paper } from '@mui/material';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Paper elevation={1} sx={{ 
      p: 1,
      m: 0.5,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '8px'
    }}>
      <Typography variant="body2" sx={{ 
        fontWeight: 'bold',
        fontSize: '0.8rem',
        lineHeight: '1.2'
      }}>
        {item.name}
      </Typography>
      
      <Typography variant="caption" color="text.secondary" sx={{ 
        fontSize: '0.7rem',
        display: 'block',
        mb: '4px'
      }}>
        {item.category}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ 
          fontWeight: 'bold',
          fontSize: '0.8rem'
        }}>
          {item.price.toLocaleString()} تومان
        </Typography>
        <Button 
          variant="contained" 
          size="small"
          onClick={() => addToCart(item)}
          sx={{
            fontSize: '0.6rem',
            minWidth: '50px',
            padding: '2px 6px',
            borderRadius: '4px'
          }}
        >
          +
        </Button>
      </Box>
    </Paper>
  );
};

export default MenuItem;