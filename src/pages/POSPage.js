import React from 'react';
import { Grid, Paper, Tabs, Tab } from '@mui/material';
import MenuList from '../components/menu/MenuList';
import CartList from '../components/cart/CartList';

const POSPage = () => {
  const [category, setCategory] = React.useState('ساندویچ');
  
  // حتماً مقدار اولیه تعریف کنید
  const menuItems = [
    { id: 1, name: "چیزبرگر", price: 80000, category: "ساندویچ" },
    { id: 2, name: "نوشابه", price: 15000, category: "نوشیدنی" },
    // ... سایر آیتم‌ها
  ];

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} md={7}>
        <Paper sx={{ p: 2 }}>
          <Tabs value={category} onChange={(e, v) => setCategory(v)}>
            <Tab label="ساندویچ" value="ساندویچ" />
            <Tab label="نوشیدنی" value="نوشیدنی" />
          </Tabs>
          {/* اطمینان حاصل کنید items ارسال می‌شود */}
          <MenuList items={menuItems.filter(i => i.category === category)} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <CartList />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default POSPage;