// src/pages/POSPage.js
import { Grid, Paper } from "@mui/material";
import MenuList from "../components/menu/MenuList";
import CartList from "../components/cart/CartList";

const POSPage = () => {
  // داده‌های نمونه منو (بعداً از Firebase می‌آوریم)
  const menuItems = [
    { id: 1, name: "قیمه", price: 50000 },
    { id: 2, name: "کباب", price: 80000 },
    { id: 3, name: "جوجه کباب", price: 60000 },
  ];

  return (
    <Paper sx={{ padding: "20px", margin: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <MenuList menuItems={menuItems} />
        </Grid>
        <Grid item xs={4}>
          <CartList />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default POSPage;