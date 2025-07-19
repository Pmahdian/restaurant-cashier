import { useState } from 'react';
import { Grid, Tabs, Tab, Box } from '@mui/material';
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
        height: '100vh',
        display: 'flex',
        bgcolor: '#fafafa'
      }}>
        {/* بخش منو (70% عرض) */}
        <Grid item xs={8} sx={{
          height: '100%',
          p: 1,
          overflowY: 'auto'
        }}>
          {/* تب‌های دسته‌بندی */}
          <Tabs
            value={activeCategory}
            onChange={(e, newValue) => setActiveCategory(newValue)}
            variant="scrollable"
            sx={{ 
              bgcolor: 'background.paper',
              borderRadius: 1,
              mb: 1,
              px: 1
            }}
          >
            {categories.map(category => (
              <Tab 
                key={category}
                label={category}
                value={category}
                sx={{ 
                  minWidth: 'unset',
                  fontSize: '0.8rem',
                  py: 1
                }}
              />
            ))}
          </Tabs>

          {/* لیست منو */}
          <MenuList menuItems={filteredItems} />
        </Grid>

        {/* بخش سبد خرید (30% عرض) */}
        <Grid item xs={4} sx={{
          height: '100vh',
          borderLeft: '1px solid #eee',
          bgcolor: 'background.paper',
          p: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <CartList />
        </Grid>
      </Box>
    </CartProvider>
  );
};

export default POSPage;