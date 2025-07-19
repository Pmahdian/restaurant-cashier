import { useState } from 'react';
import { Grid, Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import MenuList from '../components/menu/MenuList';
import CartList from '../components/cart/CartList';
import { CartProvider } from '../context/CartContext';

const menuItems = [
  // ساندویچ‌ها
  { id: 1, name: "برگر", price: 80000, category: "ساندویچ" },
  { id: 2, name: " چبز برگر", price: 75000, category: "ساندویچ" },
  { id: 3, name: "کوکتل", price: 75000, category: "ساندویچ" },
  { id: 4, name: "کوکتل پنیری", price: 75000, category: "ساندویچ" },
  { id: 5, name: " ژامبون تنوری", price: 75000, category: "ساندویچ" },
  

];

const POSPage = () => {
  const [activeCategory, setActiveCategory] = useState('ساندویچ');
  const categories = ['ساندویچ', 'پیش غذا', 'نوشیدنی', 'اضافات'];
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <CartProvider>
      <Box sx={{
        p: 2,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography variant="h6" sx={{ 
          mb: 2,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          سیستم سفارش رستوران
        </Typography>

        <Grid container spacing={2} sx={{ flex: 1, overflow: 'hidden' }}>
          {/* بخش منو */}
          <Grid item xs={12} md={7} sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            <Paper elevation={1} sx={{ mb: 1, p: 1 }}>
              <Tabs
                value={activeCategory}
                onChange={(e, newValue) => setActiveCategory(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ minHeight: 40 }}
              >
                {categories.map(category => (
                  <Tab 
                    key={category}
                    label={category}
                    value={category}
                    sx={{ 
                      fontSize: '0.75rem',
                      minHeight: 40,
                      px: 1,
                      minWidth: 'unset'
                    }}
                  />
                ))}
              </Tabs>
            </Paper>

            <Box sx={{
              flex: 1,
              overflowY: 'auto',
              pr: 1
            }}>
              <MenuList menuItems={filteredItems} />
            </Box>
          </Grid>

          {/* بخش فاکتور */}
          <Grid item xs={12} md={7} sx={{
          height: 'calc(100vh - 120px)', // ارتفاع ثابت
          overflow: 'hidden',
           pr: 1
}}>
            <Paper elevation={1} sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 1.5
            }}>
              <CartList />
            </Paper>
          </Grid>
          
        </Grid>
      </Box>
    </CartProvider>
  );
};

export default POSPage;