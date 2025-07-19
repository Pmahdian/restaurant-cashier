import { useCart } from '../../context/CartContext';
import { Box, Button, Typography, Paper } from '@mui/material';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Paper elevation={1} sx={{
      p: 0.5,
      m: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '6px',
      overflow: 'hidden'
    }}>
      <Typography variant="body2" noWrap sx={{ 
        fontWeight: 'bold',
        fontSize: '0.75rem',
        lineHeight: '1.1',
        textAlign: 'right'
      }}>
        {item.name}
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: '2px'
      }}>
        <Typography variant="caption" sx={{
          fontSize: '0.65rem',
          color: 'text.secondary',
          lineHeight: '1'
        }}>
          {item.price.toLocaleString()} تومان
        </Typography>
        <Button 
          variant="contained" 
          size="small"
          onClick={() => addToCart(item)}
          sx={{
            minWidth: '24px',
            width: '24px',
            height: '20px',
            fontSize: '0.6rem',
            p: 0
          }}
        >
          +
        </Button>
      </Box>
    </Paper>
  );
};

export default MenuItem;