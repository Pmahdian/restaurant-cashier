import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Tabs, Tab } from '@mui/material';
import MenuList from '../components/menu/MenuList';
import CartList from '../components/cart/CartList';

const POSPage = () => {
  const [activeCategory, setActiveCategory] = useState('ساندویچ');
  
  const menuItems = [
    { id: 1, name: "چیزبرگر", price: 80000, category: "ساندویچ" },
    { id: 2, name: "مرغ سوخاری", price: 75000, category: "ساندویچ" },
    { id: 3, name: "همبرگر ویژه", price: 90000, category: "ساندویچ" },
    { id: 4, name: "نوشابه", price: 15000, category: "نوشیدنی" },
  ];

  const categories = ['ساندویچ', 'نوشیدنی'];
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <Box sx={{ p: 1, height: '100vh' }}>
      <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
        سیستم سفارش رستوران
      </Typography>

      <Grid container spacing={1} sx={{ height: 'calc(100% - 40px)' }}>
        {/* بخش منو */}
        <Grid item xs={12} md={7}>
          <Paper elevation={1} sx={{ p: 1, height: '100%' }}>
            <Tabs value={activeCategory} onChange={(e, newValue) => setActiveCategory(newValue)}>
              {categories.map(category => (
                <Tab key={category} label={category} value={category} />
              ))}
            </Tabs>
            <MenuList menuItems={filteredItems} />
          </Paper>
        </Grid>

        {/* بخش فاکتور */}
        <Grid item xs={12} md={5}>
          <Paper elevation={1} sx={{ p: 1, height: '100%' }}>
            <CartList />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default POSPage;