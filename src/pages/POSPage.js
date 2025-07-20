import { useState } from 'react';
import { Tabs, Tab, Box, Paper } from '@mui/material';
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
  const categories = [...new Set(menuItems.map(item => item.category))];
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <CartProvider>
      <Box sx={{
        height: '100vh',
        display: 'flex',
        bgcolor: '#f5f5f5',
        p: 1,
        gap: 1
      }}>
        {/* بخش منو (30% عرض) */}
        <Box sx={{
          width: '30%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          {/* تب‌های دسته‌بندی */}
          <Paper elevation={3} sx={{ 
            p: 0.5,
            borderRadius: '12px',
            backgroundColor: '#fff'
          }}>
            <Tabs
              value={activeCategory}
              onChange={(e, newValue) => setActiveCategory(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  minWidth: 'unset',
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                },
                '& .Mui-selected': {
                  color: '#1976d2'
                }
              }}
            >
              {categories.map(category => (
                <Tab 
                  key={category}
                  label={category}
                  value={category}
                />
              ))}
            </Tabs>
          </Paper>
          
          {/* لیست منو */}
          <Paper elevation={3} sx={{ 
            flex: 1,
            p: 1,
            borderRadius: '12px',
            backgroundColor: '#fff',
            overflow: 'hidden'
          }}>
            <MenuList menuItems={filteredItems} />
          </Paper>
        </Box>

        {/* بخش سبد خرید (70% عرض) */}
        <Box sx={{
          width: '70%',
          height: '100%'
        }}>
          <CartList />
        </Box>
      </Box>
    </CartProvider>
  );
};

export default POSPage;