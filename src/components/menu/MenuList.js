import { Grid } from '@mui/material';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems }) => {
  return (
    <Grid container spacing={1.5}>
      {menuItems.map((item) => (
        <Grid item xs={12} sm={6} key={item.id}>
          <MenuItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;