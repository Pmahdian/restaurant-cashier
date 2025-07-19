// src/components/cart/CartItem.js
import { Typography, Button } from "@mui/material";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item, index }) => {
  const { removeFromCart } = useCart();

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0" }}>
      <Typography>
        {item.name} - {item.price.toLocaleString()} تومان
      </Typography>
      <Button 
        variant="outlined" 
        color="error" 
        onClick={() => removeFromCart(index)}
      >
        حذف
      </Button>
    </div>
  );
};

export default CartItem;