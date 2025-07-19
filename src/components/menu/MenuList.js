import { Grid } from '@mui/material';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems }) => {
  return (
    <Grid container spacing={0.5} sx={{ 
      padding: '4px',
      maxWidth: '100%',
      margin: '0 auto'
    }}>
      {menuItems.map((item) => (
        <Grid item xs={4} key={item.id} sx={{
          padding: '4px !important',
          minWidth: 0 // برای جلوگیری از overflow
        }}>
          <MenuItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;