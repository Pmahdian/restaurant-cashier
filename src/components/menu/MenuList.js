// src/components/menu/MenuList.js
import MenuItem from './MenuItem';

const MenuList = ({ menuItems }) => {
  return (
    <div>
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;