import { useState } from 'react';
import { Grid, Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import MenuList from '../components/menu/MenuList';
import CartList from '../components/cart/CartList';
import { CartProvider } from '../context/CartContext';

const menuItems = [
  { id: 1, name: "چیزبرگر", price: 80000, category: "ساندویچ" },
  { id: 2, name: "مرغ سوخاری", price: 75000, category: "ساندویچ" },
  { id: 3, name: "همبرگر ویژه", price: 90000, category: "ساندویچ" },
  { id: 4, name: "سالاد سزار", price: 45000, category: "پیش غذا" },
  { id: 5, name: "سوپ قارچ", price: 35000, category: "پیش غذا" },
  { id: 6, name: "پنیر سوخاری", price: 40000, category: "پیش غذا" },
  { id: 7, name: "نوشابه", price: 15000, category: "نوشیدنی" },
  { id: 8, name: "آب معدنی", price: 10000, category: "نوشیدنی" },
  { id: 9, name: "دوغ", price: 12000, category: "نوشیدنی" },
  { id: 10, name: "سیب زمینی سرخ کرده", price: 30000, category: "اضافات" },
  { id: 11, name: "سس اضافه", price: 5000, category: "اضافات" },
  { id: 12, name: "ترشی", price: 8000, category: "اضافات" }
];

const POSPage = () => {
  const [activeCategory, setActiveCategory] = useState('ساندویچ');
  const categories = ['ساندویچ', 'پیش غذا', 'نوشیدنی', 'اضافات'];
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <CartProvider>
      <Box sx={{
        p: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f5f5f5'
      }}>
        <Typography variant="h6" sx={{ 
          mb: 1,
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'primary.main'
        }}>
          سیستم سفارش رستوران
        </Typography>

        <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
          {/* بخش منو */}
          <Grid item xs={12} md={7} sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            pr: 1
          }}>
            <Paper elevation={1} sx={{ mb: 1, p: 0.5 }}>
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
                      minHeight: 36,
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
              bgcolor: 'background.paper',
              borderRadius: 1,
              p: 0.5
            }}>
              <MenuList menuItems={filteredItems} />
            </Box>
          </Grid>

          {/* بخش فاکتور */}
          <Grid item xs={12} md={5} sx={{
            height: '100%',
            '@media print': {
              display: 'block !important',
              width: '100% !important',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 9999
            }
          }}>
            <Paper elevation={1} sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 1,
              bgcolor: 'background.paper'
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