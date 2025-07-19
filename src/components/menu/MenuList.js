import { Grid } from '@mui/material';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems }) => {
  return (
    <Grid container spacing={1} sx={{ padding: '8px' }}>
      {menuItems.map((item) => (
        <Grid item xs={4} key={item.id}> {/* تغییر به 3 ستون */}
          <MenuItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;