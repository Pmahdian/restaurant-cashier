// src/components/menu/MenuItem.js
import { Button } from "@mui/material";
import { useCart } from "../../context/CartContext";

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Button 
      variant="contained" 
      onClick={() => addToCart(item)}
      sx={{ margin: "5px", width: "200px" }}
    >
      {item.name} - {item.price.toLocaleString()} تومان
    </Button>
  );
};

export default MenuItem;