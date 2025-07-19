// src/pages/POSPage.js
import { Grid } from '@mui/material';
import MenuList from '../components/menu/MenuList';
import CartList from '../components/cart/CartList';

const POSPage = () => {
  const menuItems = [
    { id: 1, name: "قیمه", price: 50000 },
    { id: 2, name: "کباب", price: 80000 }
  ];

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={8}>
        <MenuList menuItems={menuItems} />
      </Grid>
      <Grid item xs={4}>
        <CartList />
      </Grid>
    </Grid>
  );
};

export default POSPage;