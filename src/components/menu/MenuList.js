// src/components/menu/MenuList.js
import MenuItem from "./MenuItem";

const MenuList = ({ menuItems }) => {
  return (
    <div>
      <h3>منوی رستوران</h3>
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;