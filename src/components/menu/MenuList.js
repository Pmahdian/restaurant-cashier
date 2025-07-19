import React from 'react';
import { Grid } from '@mui/material';
import MenuItem from './MenuItem';

const MenuList = ({ items = [] }) => { // مقدار پیش‌فرض آرایه خالی
  return (
    <Grid container spacing={1}>
      {items.map((item) => (
        <Grid item xs={6} key={item.id}>
          <MenuItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;