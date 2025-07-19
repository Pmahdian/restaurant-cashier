import { Grid } from '@mui/material';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems }) => {
  return (
    <Grid container spacing={0.5} sx={{ 
      padding: '4px',
      maxWidth: '100%',
      margin: '0 auto'
    }}>
      {menuItems.map((item, index) => (
        <Grid key={`${item.id}-${index}`} sx={{
          width: '33.33%',
          padding: '4px !important',
          minWidth: 0
        }}>
          <MenuItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;