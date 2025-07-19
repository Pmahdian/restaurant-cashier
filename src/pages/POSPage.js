
import { useState } from 'react';
import { Grid, Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import MenuList from '../components/menu/MenuList';
import CartList from '../components/cart/CartList';
import { CartProvider } from '../context/CartContext';

// داده‌های منو
const menuItems = [
  // ساندویچ‌ها
  { id: 1, name: "چیزبرگر", price: 80000, category: "ساندویچ" },
  { id: 2, name: "مرغ سوخاری", price: 75000, category: "ساندویچ" },
  { id: 3, name: "همبرگر ویژه", price: 90000, category: "ساندویچ" },
  
  // پیش غذاها
  { id: 4, name: "سالاد سزار", price: 45000, category: "پیش غذا" },
  { id: 5, name: "سوپ قارچ", price: 35000, category: "پیش غذا" },
  { id: 6, name: "پنیر سوخاری", price: 40000, category: "پیش غذا" },
  
  // نوشیدنی‌ها
  { id: 7, name: "نوشابه", price: 15000, category: "نوشیدنی" },
  { id: 8, name: "آب معدنی", price: 10000, category: "نوشیدنی" },
  { id: 9, name: "دوغ", price: 12000, category: "نوشیدنی" },
  
  // اضافات
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
        p: 1.5,
        maxWidth: 1200,
        mx: 'auto'
      }}>
        {/* هدر */}
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold', 
          mb: 2,
          fontSize: '1.4rem',
          textAlign: 'center',
          color: 'primary.main'
        }}>
          منوی رستوران
        </Typography>
        
        {/* تب‌های دسته‌بندی */}
        <Paper elevation={0} sx={{ 
          mb: 2,
          borderRadius: 1,
          border: '1px solid #eee'
        }}>
          <Tabs 
            value={activeCategory}
            onChange={(e, newValue) => setActiveCategory(newValue)}
            variant="fullWidth"
            sx={{
              minHeight: 40
            }}
          >
            {categories.map(category => (
              <Tab 
                key={category} 
                label={category} 
                value={category} 
                sx={{ 
                  fontSize: '0.8rem',
                  py: 0.5,
                  minHeight: 40,
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 'bold'
                  }
                }}
              />
            ))}
          </Tabs>
        </Paper>
        
        {/* محتوای اصلی */}
        <Grid container spacing={2}>
          {/* لیست منو */}
          <Grid item xs={12} md={8}>
            <MenuList menuItems={filteredItems} />
          </Grid>
          
          {/* سبد خرید */}
          <Grid item xs={12} md={4}>
            <CartList />
          </Grid>
        </Grid>
      </Box>
    </CartProvider>
  );
};

export default POSPage;